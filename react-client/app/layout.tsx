import { Outlet, redirect, useLoaderData} from "react-router";
import type { Route } from "./+types/layout";
import { authApi } from "./api/authApi";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const cookieHeader = request.headers.get("Cookie") || "";

  const isAuthPage = ["/log-in", "/log-in/password", "/register"].includes(pathname);
const hasToken = cookieHeader.includes("accessToken");

  if (isAuthPage && !hasToken) {
    return { user: null };
  }
  if (!hasToken && !isAuthPage) {
    throw redirect("/log-in");
  }

  try {
    const response = await authApi.getUserProfile(cookieHeader);
    const userData = response.data.data;

    if (userData && isAuthPage) {
      throw redirect("/");
    }

    const newCookies = (response.config as any)._newCookiesFromServer;
    if (newCookies) {
      return new Response(JSON.stringify({ user: userData }), {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": newCookies.join(", "),
        },
      });
    }

    return { user: userData };
  } catch (error: any) {
    if (error instanceof Response || error.status === 302) {
      throw error;
    }
    if (isAuthPage) {
      return { user: null };
    }

    throw redirect("/log-in");
  }
}

export default function AuthenticatedRootLayout() {
  const { user } = useLoaderData() as { user: any };
  return <Outlet context={{ user }} />;
}
