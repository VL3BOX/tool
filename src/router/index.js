import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const routes = [
    {
        name: "index",
        path: "/",
        component: () => import("@/views/Index.vue"),
        meta: {
            type: 'tool'
        }
    },
    {
        name: "jx3dat",
        path: "/jx3dat",
        component: () => import("@/views/Jx3Dat.vue"),
        meta: {
            type: 'jx3dat'
        }
    }
];

const router = new VueRouter({
    routes,
    mode: "history",
    base: "/tool"
});

export default router;
