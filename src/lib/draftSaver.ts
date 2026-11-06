/** Serialized, debounced writes. An uncertain result must never be replayed. */
export interface SaveReceipt { version: number; status: string }
export function createDraftSaver<T, R extends SaveReceipt>(options: {
  initial: T; version: number; status: string;
  write: (answers: T, version: number, submit: boolean) => Promise<R>;
  onSaved: (result: R) => void;
  onState: (state: string) => void;
  onError: (error: unknown) => void;
  delay?: number;
}) {
  let latest = options.initial, version = options.version, status = options.status;
  let revision = 0, savedRevision = 0, paused = false, disposed = false;
  let finalizing = false;
  let flight: Promise<void> | null = null;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const cancel = () => { clearTimeout(timer); timer = undefined; };
  const emit = (state: string) => { if (!disposed) options.onState(state); };
  async function write(submit: boolean) {
    const snapshot = latest, sentRevision = revision;
    emit(submit ? "Submitting…" : "Saving…");
    try {
      const result = await options.write(snapshot, version, submit);
      if (!Number.isInteger(result.version) || result.version !== version + 1 ||
          result.status !== (submit ? "submitted" : "draft")) {
        throw new Error("The saved version could not be confirmed. Review the saved application before continuing.");
      }
      version = result.version;
      status = result.status;
      savedRevision = sentRevision;
      if (!disposed) options.onSaved(result);
      emit(revision === savedRevision ? "All changes saved" : "Unsaved changes");
    } catch (error) {
      paused = true;
      cancel();
      emit("Changes not confirmed — review required");
      if (!disposed) options.onError(error);
      throw error;
    }
  }
  async function flush() {
    cancel();
    if (flight) { await flight; return flush(); }
    if (disposed || finalizing || status !== "draft") return;
    if (paused) throw new Error("Review the saved application before continuing.");
    if (revision === savedRevision) return;
    // One owner drains the latest snapshot, even when edits arrive during a write.
    const work = (async () => {
      while (!disposed && !paused && !finalizing && status === "draft" && revision !== savedRevision) {
        await write(false);
      }
    })();
    flight = work;
    try { await work; } finally { if (flight === work) flight = null; }
  }
  return {
    change(value: T) {
      if (disposed || finalizing || status !== "draft") return;
      latest = value; revision++;
      cancel();
      emit(paused ? "Unsaved changes — review required" : "Unsaved changes");
      if (!paused) timer = setTimeout(() => { void flush().catch(() => {}); }, options.delay ?? 1200);
    },
    flush,
    async submit() {
      if (disposed || finalizing || status !== "draft") return;
      finalizing = true;
      cancel();
      try {
        if (flight) await flight;
        if (disposed) return;
        if (paused) throw new Error("Review the saved application before continuing.");
        // Submission itself saves the latest answers; no redundant draft write.
        const work = write(true);
        flight = work;
        try { await work; } finally { if (flight === work) flight = null; }
      } finally { finalizing = false; }
    },
    get unsaved() { return revision !== savedRevision || !!flight || paused; },
    dispose() { disposed = true; cancel(); },
    activate() { disposed = false; },
  };
}
