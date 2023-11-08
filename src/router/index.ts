import {useAuthStore} from '@/stores/auth'
import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import {loadLayoutMiddleware} from '@/router/middleware/loadLayout.middleware'
import {RouteNamesEnum} from '@/router/router.types'
import {AppLayoutsEnum} from '@/layouts/layouts.types'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: RouteNamesEnum.home,
            component: HomeView,
            meta: {
                auth: true,
            },
        },
        {
            path: '/profile',
            name: RouteNamesEnum.profile,
            meta: {
                auth: true,
            },
            component: () => import('../views/ProfileView.vue'),
            children: [{
                path: 'edit',
                component: () => import('../components/profile/ProfileCardEdit.vue'),
            },]
        },
        {
            path: '/login',
            name: RouteNamesEnum.login,
            meta: {
                layout: AppLayoutsEnum.login,
            },
            component: () => import('../views/LoginView.vue'),
        },
        {
            path: '/signup',
            name: RouteNamesEnum.signup,
            meta: {
                layout: AppLayoutsEnum.login,
            },
            component: () => import('../views/SignUpView.vue'),
        },
        {
            path: '/resetpassword',
            name: RouteNamesEnum.resetpassword,
            meta: {
                layout: AppLayoutsEnum.login,
            },
            component: () => import('../views/ResetPasswordView.vue'),
        },
    ],
})
router.beforeEach(loadLayoutMiddleware)
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    if (to.meta.auth) {
        if (await authStore.authCheck()) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})
export default router
