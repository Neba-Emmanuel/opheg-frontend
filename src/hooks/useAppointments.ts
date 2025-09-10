import { Phone } from "lucide-react";
import { useApiQuery, useApiMutation } from "@/hooks/useApi";

export interface Appointment {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  location: string;
  reason: string;
  status: "pending" | "approved" | "cancelled" | "completed";
  createdAt: string;
}

export function useAppointments() {
  return useApiQuery<Appointment[]>(["appointments"], "/appointments");
}

export function useCreateAppointment() {
  return useApiMutation<Appointment, Partial<Appointment>>(
    "/appointments",
    "POST"
  );
}

export function useUpdateAppointment() {
  return useApiMutation<any, { id: number; status: string }>(
    ({ id }) => `/appointments/${id}`,
    "PATCH"
  );
}

export function useDeleteAppointment() {
  return useApiMutation<any, { id: number }>(
    ({ id }) => `/appointments/${id}`,
    "DELETE"
  );
}
