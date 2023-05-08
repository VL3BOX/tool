import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        name: "database",
        path: "/database",
        component: () => import("../views/Database.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: "/app",
    routes,
});

export default router;
