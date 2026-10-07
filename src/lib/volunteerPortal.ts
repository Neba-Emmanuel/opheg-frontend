import { API_URL } from "./apiClient";
export const PORTAL_TOKEN_KEY = "opheg_volunteer_session";
export interface CommunityProfile { handle: string; bio: string; visible: boolean; sharePhoto: boolean; linkedin: string; instagram: string; facebook: string; x: string; website: string; }
export const emptyCommunityProfile: CommunityProfile = { handle: "", bio: "", visible: false, sharePhoto: false, linkedin: "", instagram: "", facebook: "", x: "", website: "" };
export const socialLabels = { linkedin: "LinkedIn", instagram: "Instagram", facebook: "Facebook", x: "X / Twitter", website: "Website" };
export interface PortalMe { id: number; email: string; volunteerId: string; details: Record<string,string | boolean>; profile: CommunityProfile; photoUrl: string | null; updatedAt: string; attachments: { id: string; name: string; kind: string; size: number }[]; }
export interface PortalMember { id: number; name: string; preferredName: string; city: string; country: string; department: string; role: string; occupation: string; skills: string; languages: string; programs: string; joined: string; handle: string; bio: string; linkedin: string; instagram: string; facebook: string; x: string; website: string; photoUrl: string | null; }
export class PortalApiError extends Error { constructor(message: string, public status: number) { super(message); } }
export async function portalRequest<T>(path: string, options: RequestInit = {}, authenticated = true): Promise<T> {
  const token = authenticated ? sessionStorage.getItem(PORTAL_TOKEN_KEY) : null;
  const response = await fetch(`${API_URL}/volunteer-portal/${path}`, { ...options, headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
  const data = await response.json().catch(() => ({ message: "The server could not respond. Please try again." }));
  if (!response.ok) {
    if (authenticated && response.status === 401) {
      sessionStorage.removeItem(PORTAL_TOKEN_KEY);
      window.dispatchEvent(new Event("volunteer-session-expired"));
    }
    throw new PortalApiError(data.message || "Unable to complete your request.", response.status);
  }
  return data;
}
export async function encodePortalPhoto(file: File) {
  if (!file.size || file.size > 1048576 || !/\.(png|jpe?g)$/i.test(file.name)) throw new Error("Choose a JPG or PNG photo no larger than 1 MB.");
  return new Promise<{ name: string; kind: string; base64: string }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, kind: "photo", base64: String(reader.result).split(",")[1] });
    reader.onerror = () => reject(new Error("Unable to read this photo."));
    reader.readAsDataURL(file);
  });
}
