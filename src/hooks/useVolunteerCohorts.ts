import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/apiClient";
export interface VolunteerCohort { number: number; name: string; }
export function useVolunteerCohorts() {
  return useQuery({queryKey:["volunteer-cohorts"],queryFn:()=>apiRequest<VolunteerCohort[]>("/cohorts"),staleTime:0});
}
