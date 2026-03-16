import {
    type RouteConfig,
    index,
    layout,
    route
} from "@react-router/dev/routes";

export default [
    route("/","./welcome/Welcome.tsx"),
    route("log-in", "./auth/login.tsx"),
    route("log-in/password", "./auth/password.tsx"),
    route("register", "./auth/register.tsx"),
] satisfies RouteConfig;
