import { Outlet, Navigate } from "react-router";
import { Link } from "react-router";
import type { Route } from "./+types/layout";
import { useUser } from "~/hook/useUser";

export async function loader({ request }: Route.LoaderArgs) {
  return null;
}

export default function AdminProtectedLayout() {
  const user = useUser();
  if (!user || user.role !== 'user') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-row">
      <div className="w-64 p-6 bg-[#182422] border-r border-[#5f7f7a]">
        
        <h1 className="text-3xl font-bold text-[#eef7f6] mb-10">
          Employee App
        </h1>

        <div className="flex flex-col gap-6 text-lg text-[#92beb9]">
          <Link
            to={"/user-dashboard"}
            className="cursor-pointer"
          >
            🏠 Dashboard
          </Link >

          <Link
            to={"/user-profile"}
            className="cursor-pointer"
          >
            👤 Profile
          </Link>

          <Link
            to={"/user-checkinout"}
            className="cursor-pointer"
          >
            🕒 Attendance
          </Link>

          <Link
            to={"/user-leave"}
            className="cursor-pointer"
          >
            📝 Leave
          </Link>

          <Link
            to={"/user-notify"}
            className="cursor-pointer"
          >
            📢 Notifications
          </Link>

        </div>
      </div>

      <Outlet context={{ user }} />

    </div>
  );
}