import { createRouter, createWebHistory } from "vue-router";
import { getStorage } from "./common";
import { PROFILE_KEY } from "./common/constants";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: () => import("./pages/Home.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: "/login",
            component: () => import("./pages/Login.vue"),
            meta: { requiresAuth: false },
        },
        {
            path: "/register",
            component: () => import("./pages/Register.vue"),
            meta: { requiresAuth: false },
        },
        {
            path: "/withdraw",
            component: () => import("./pages/WithDraw.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: "/link-bank",
            component: () => import("./pages/LinkBank.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: "/profile",
            component: () => import("./pages/Profile.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: "/profile/transaction",
            component: () => import("./pages/Transaction.vue"),
            meta: { requiresAuth: true },
        },

        {
            path: "/profile/info",
            component: () => import("./pages/Info.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: "/profile/historybet",
            component: () => import("./pages/Historybet.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: "/game/:code",
            component: () => import("./pages/Game.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: "/admin",
            component: () => import("./pages/admin/Home.vue"),
            meta: { requiresAuth: true, isAdmin: true },
        },
        {
            path: "/admin/game",
            component: () => import("./pages/admin/Game.vue"),
            meta: { requiresAuth: true, isAdmin: true },
        },
        {
            path: "/admin/game/:code",
            component: () => import("./pages/admin/GameControll.vue"),
            meta: { requiresAuth: true, isAdmin: true },
        },
        {
            path: "/admin/setting",
            component: () => import("./pages/admin/SettingPage.vue"),
            meta: { requiresAuth: true, isAdmin: true },
        },
        {
            path: "/admin/request-money",
            component: () => import("./pages/admin/RequestMoney.vue"),
            meta: { requiresAuth: true, isAdmin: true },
        },
        {
            path: "/admin/profile",
            component: () => import("./pages/admin/Profile.vue"),
            meta: { requiresAuth: true, isAdmin: true },
        },
        // {
        //     path: "/admin/session/:code",
        //     component: () => import("./pages/admin/GameControll.vue"),
        //     meta: { requiresAuth: true, isAdmin: true },
        // },
        {
            path: "/:pathMatch(.*)*",
            component: () => import("./pages/404.vue"),
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    // instead of having to check every route record with
    // to.matched.some(record => record.meta.requiresAuth)
    const profile = getStorage(PROFILE_KEY);

    if (to.matched.some((record) => record.meta.requiresAuth) && !profile)
        next({ path: "/login" });

    if (to.matched.some((record) => record.meta.isAdmin) && profile.role !== "admin")
        next({ path: "/" });

    return next();
});

export default router;