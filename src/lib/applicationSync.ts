import type { SaveReceipt } from "./draftSaver";

/** Same-origin tabs serialize the entire request, not just button clicks. */
export async function withApplicationLock<T>(id: number, work: () => Promise<T>): Promise<T> {
  return navigator.locks
    ? await navigator.locks.request(`opheg-preop-${id}`, work)
    : work(); // Server preflight + PostgreSQL locking protect unsupported browsers.
}

/** Only version/status metadata is broadcast; never answers or credentials. */
export function watchApplication(id: number, observe: (state: SaveReceipt) => void) {
  const channel = typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel(`opheg-preop-${id}`);
  if (channel) channel.onmessage = ({ data }) => {
    if (data && Number.isInteger(data.version) && typeof data.status === "string") observe(data);
  };
  return {
    publish(state: SaveReceipt) { channel?.postMessage({ version: state.version, status: state.status }); },
    close() { channel?.close(); },
  };
}
