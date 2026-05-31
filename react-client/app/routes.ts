import {
    type RouteConfig,
    layout,
    route,
} from "@react-router/dev/routes";

export default [
    layout("./layout.tsx", [
        route("log-in", "./auth/login.tsx"),
        route("log-in/password", "./auth/password.tsx"),
        route("register", "./auth/register.tsx"),

        route("/", "./welcome/Welcome.tsx"),

        layout("./user/layout.tsx", [
            route("user-dashboard", "./user/user-dashboard.tsx"),
            route("user-profile", "./user/user-profile.tsx"),
            route("user-attendance", "./user/user-attendance.tsx"),
            route("leave", "./user/leave.jsx"),
            route("notify", "./user/notify.jsx"),
            route("timemock", "./user/timemock.jsx"),
            route("settings", "./user/settings.jsx"),
            route("checkinout", "./user/checkinout.jsx"),
        ]),

        layout("./admin/layout.tsx", [
            route("admin-dashboard", "./admin/admin-dashboard.tsx"),
            route("admin-profile", "./admin/admin-profile.tsx"),
            route("admin-attendance", "./admin/admin-attendance.tsx"),
            route("empmanage", "./admin/empmanage.jsx"),
            route("adminleaveint", "./admin/adminleaveint.jsx"),
            route("report", "./admin/report.jsx"),
        ]),
    ])

] satisfies RouteConfig;