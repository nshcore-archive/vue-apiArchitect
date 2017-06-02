import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login'
import Logout from '@/components/auth/Logout'
import Register from '@/components/auth/Register'
import PasswordReset from '@/components/auth/PasswordReset'
import UserProfile from '@/components/profile/UserProfile'
import UserProfileEdit from '@/components/profile/UserProfileEdit'

Vue.use(Router)

const routes = new Router({
  hashbang: false,
  history: true,
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/password/reset',
      name: 'PasswordReset',
      component: PasswordReset
    },
    {
      path: '/user/profile',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/user/profile/edit',
      name: 'UserProfileEdit',
      component: UserProfileEdit
    },
    {
      path: '/auth/oauth/{provider}/callback',
      component: {
        template: '<div class="auth-component"></div>'
      }
    }
  ]
})

routes.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!this.a.app.$auth.isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default routes