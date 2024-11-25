import {createRouter, createWebHistory} from 'vue-router'
// import store from './store'
const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            // meta: { requireAuth: true },
            redirect: '/Dashboard',
            component: () => import("../../components/home.vue"),
            children: [{
                path: '/Dashboard',
                name: 'Dashboard',
                // meta: { requireAuth: true },
                component: () => import("../../components/views/Dashboard.vue"),
            }, {
                path: '/Images',
                name: 'Images',
                // meta: { requireAuth: true },
                component: () => import("../../components/views/Images.vue"),
            }, {
                path: '/Apps',
                name: 'Apps',
                // meta: { requireAuth: true },
                component: () => import("../../components/views/Apps.vue"),
            }, {
                path: '/Volumes',
                name: 'Volumes',
                // meta: { requireAuth: true },
                component: () => import("../../components/views/Volumes.vue"),
            }, {
                path: '/Store',
                name: 'Store',
                // meta: { requireAuth: true },
                component: () => import("../../components/views/Store.vue"),
            }]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import("../../components/login.vue"),
        },
        {
            path: '/xterm_logs',
            name: 'xterm_logs',
            component: () => import("../../components/widgets/Terminal_log.vue"),
        },
        {
            path: '/xterm_exec',
            name: 'xterm_exec',
            component: () => import("../../components/widgets/Terminal_log.vue"),
        },
        {
            path: '/new',
            name: 'new',
            component: () => import("../../components/widgets/new_container.vue"),
        }
    ]
})


// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {//判断该路由是否需要登录权限
//         if (store.state.token) {//通过vuex的state获取当前的token是否存在
//             next()
//         } else {
//             next({
//                 path: "/login",
//                 query: { redirect: to.fullPath }//将跳转的路由path作为参数，登陆成功后跳转到该路由
//             })
//         }
//     } else {
//         next();
//     }
// })
export default router
