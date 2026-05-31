import { useOutletContext } from "react-router";

export type User = {
  name: string;
  email: string;
  _id?: string;
  role: string;
};

export type UserContextType = {
  user: User | null;
};

export function useUser() {
  const context = useOutletContext<UserContextType>();
  return context?.user ?? null;
}