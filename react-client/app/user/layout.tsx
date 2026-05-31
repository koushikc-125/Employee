import { Outlet, Navigate, useLoaderData } from "react-router";
import { useUser } from "~/hook/useUser";

export async function loader() {
  return null;
}

export default function UserLayout() {
  const user = useUser()
  if (!user || user.role !== 'user') {
    console.log(user);

    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-full w-full flex-1 items-start lg:grid lg:gap-10 lg:grid-cols-[300px_minmax(0,1fr)]">

      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 flex-col lg:sticky lg:flex lg:self-start">

        <div className="h-full p-6 bg-[#162E1A] border-r border-green-900">

          <h1 className="text-3xl font-bold text-green-100 mb-10">
            Employee App
          </h1>

          <div className="flex flex-col gap-6 text-lg">

            <p
              className="cursor-pointer"
            >
              🏠 Dashboard
            </p>

            <p
              className="cursor-pointer"
            >
              👤 Profile
            </p>

            <p
              className="cursor-pointer"
            >
              🕒 Attendance
            </p>

          </div>

        </div>
      </aside>

      <Outlet context={{ user }} />

    </div>
  );
}