// src/hooks/usePosts.ts
import { useApiQuery, useApiMutation } from "@/hooks/useApi";

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  status: "draft" | "published";
  publishedAt?: string;
  createdAt: string;
}

export function usePosts() {
  return useApiQuery<Post[]>(["posts"], "/posts");
}

export function usePost(id: number) {
  return useApiQuery<Post>(["post", id.toString()], `/posts/${id}`);
}

export function useCreatePost() {
  return useApiMutation<Post, Partial<Post>>("/posts", "POST");
}

export function useUpdatePost() {
  return useApiMutation<
    Post,
    { id: number; title?: string; content?: string; status?: string }
  >("/posts/:id", "PATCH");
}

export function useDeletePost() {
  return useApiMutation<any, { id: number }>("/posts/:id", "DELETE");
}
