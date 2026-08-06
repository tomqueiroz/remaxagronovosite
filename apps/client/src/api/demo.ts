import { apiFetch } from "@/lib/api";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

// GET request example through the project API helper
export const getUser = async (id: number): Promise<User> => {
  const response = await apiFetch(`/users/${id}`);
  return response.json() as Promise<User>;
};

// POST request example through the project API helper
export const createUser = async (data: CreateUserRequest): Promise<User> => {
  const response = await apiFetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json() as Promise<User>;
};

// supabase 请求示例
// export const getUserById = async (id: number): Promise<User | null> => {
//   const { data, error } = await supabase
//     .from("users")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) return null;
//   return data as User;
// };
