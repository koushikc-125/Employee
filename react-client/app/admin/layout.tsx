import { Outlet, Navigate } from "react-router";
import type { Route } from "./+types/layout";
import { useUser } from "~/hook/useUser";

export async function loader({ request }: Route.LoaderArgs) {
  return null;
}

export default function AdminProtectedLayout() {
  const user = useUser();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet context={{ user }} />;
}
