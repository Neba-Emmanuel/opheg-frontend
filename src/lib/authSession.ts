export type SessionKind = "admin" | "volunteer" | "preop";
export const sessionKeys = {
  admin: "opheg_admin_token",
  volunteer: "opheg_volunteer_session",
  preop: "opheg_preop_session",
};
const storageFor = (kind: SessionKind) =>
  kind === "admin" ? localStorage : sessionStorage;
export function expiryTime(kind: SessionKind, token: string): number {
  try {
    if (kind === "admin") {
      const encoded = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(encoded));
      return typeof payload.exp === "number" && Number.isFinite(payload.exp)
        ? payload.exp * 1000
        : 0;
    }
    const data = JSON.parse(
      storageFor(kind).getItem(sessionKeys[kind] + "_expiry") || "null",
    );
    return data?.token === token && Number.isFinite(Date.parse(data.expiresAt))
      ? Date.parse(data.expiresAt)
      : 0;
  } catch {
    return 0;
  }
}
export function storeSession(
  kind: SessionKind,
  token: string,
  expiresAt?: string,
) {
  const storage = storageFor(kind);
  storage.setItem(sessionKeys[kind], token);
  if (kind !== "admin")
    storage.setItem(
      sessionKeys[kind] + "_expiry",
      JSON.stringify({ token, expiresAt }),
    );
  window.dispatchEvent(new Event("opheg-session-change"));
}
export function expireSession(kind: SessionKind, expectedToken: string | null) {
  const storage = storageFor(kind);
  if (!expectedToken || storage.getItem(sessionKeys[kind]) !== expectedToken)
    return;
  storage.removeItem(sessionKeys[kind]);
  storage.removeItem(sessionKeys[kind] + "_expiry");
  window.dispatchEvent(new Event(`${kind}-session-expired`));
  const path = window.location.pathname;
  if (kind === "admin" && path.startsWith("/admin") && path !== "/admin/login")
    window.location.replace("/admin/login?expired=1");
  if (
    kind === "volunteer" &&
    path.startsWith("/volunteers") &&
    path !== "/volunteers/login"
  )
    window.location.replace("/volunteers/login?expired=1");
  if (kind === "preop" && path === "/preop")
    window.location.replace("/preop?expired=1");
}
export function watchSessions() {
  let timer: ReturnType<typeof setTimeout>;
  const check = () => {
    clearTimeout(timer);
    let next = 60000;
    for (const kind of Object.keys(sessionKeys) as SessionKind[]) {
      const token = storageFor(kind).getItem(sessionKeys[kind]);
      if (!token) continue;
      const remaining = expiryTime(kind, token) - Date.now();
      if (remaining <= 0) expireSession(kind, token);
      else next = Math.min(next, remaining);
    }
    timer = setTimeout(check, Math.max(1, next));
  };
  check();
  window.addEventListener("focus", check);
  window.addEventListener("storage", check);
  window.addEventListener("opheg-session-change", check);
  document.addEventListener("visibilitychange", check);
  return () => {
    clearTimeout(timer);
    window.removeEventListener("focus", check);
    window.removeEventListener("storage", check);
    window.removeEventListener("opheg-session-change", check);
    document.removeEventListener("visibilitychange", check);
  };
}
