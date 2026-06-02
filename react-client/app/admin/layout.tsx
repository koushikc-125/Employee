import { Outlet, Navigate } from "react-router";
import { useNavigate } from "react-router";
import type { Route } from "./+types/layout";
import { useUser } from "~/hook/useUser";

export async function loader({ request }: Route.LoaderArgs) {
  return null;
}

export default function AdminProtectedLayout(){
  const user = useUser();
 const navigate = useNavigate();
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

return (
  <div className="flex flex-row">
    <div className="w-64 p-6 bg-[#182422] border-r border-[#5f7f7a]">

      <h1 className="text-3xl font-bold text-[#eef7f6] mb-10">
        Employee App
      </h1>

      <div className="flex flex-col gap-6 text-lg text-[#92beb9]">

        <p
          className="cursor-pointer"
          onClick={() => navigate("/admin-dashboard")}
        >
          🏠 Dashboard
        </p>

        <p
          className="cursor-pointer"
          onClick={() => navigate("/admin-profile")}
        >
          👤 Profile
        </p>

        <p
          className="cursor-pointer"
          onClick={() => navigate("/admin-attendance")}
        >
          🕒 Attendance
        </p>

        <p
          className="cursor-pointer"
          onClick={() => navigate("/admin-leaveint")}
        >
          📝 Leave
        </p>

        <p
          className="cursor-pointer"
          onClick={() => navigate("/admin-report")}
        >
          Report
        </p>

      </div>

    </div>

    <Outlet context={{ user }} />
  </div>
);
}
