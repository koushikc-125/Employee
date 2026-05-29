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
    route("empmanage", "./admin/empmanage.jsx"),
    route("adminleaveint", "./admin/adminleaveint.jsx"),
    route("leave", "./user/leave.jsx"),
    route("notify", "./user/notify.jsx"),
    route("timemock", "./user/timemock.jsx"),
    route("settings", "./user/settings.jsx"),
    route("checkinout", "./user/checkinout.jsx"),
    route("report", "./admin/report.jsx"),
] satisfies RouteConfig;
