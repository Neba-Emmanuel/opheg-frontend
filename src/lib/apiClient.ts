export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface ApiOptions extends RequestInit {
  auth?: boolean; // attach admin token automatically
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (options.auth) {
    const token = localStorage.getItem("opheg_admin_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errText: string;
    try {
      const json = await res.json();
      errText = json.message || JSON.stringify(json);
    } catch {
      errText = await res.text();
    }
    throw new Error(errText || `Request failed with ${res.status}`);
  }

  return res.json() as Promise<T>;
}
