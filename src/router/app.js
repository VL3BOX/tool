import Vue from "vue";
import VueRouter from "vue-router";

const Database = () => import("../views/Database.vue");

Vue.use(VueRouter);

const routes = [
    {
        name: "database",
        path: "/database",
        component: Database,
    },
];

const router = new VueRouter({
    routes,
    mode: "history",
});

export default router;
