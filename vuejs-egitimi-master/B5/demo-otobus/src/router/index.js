import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SeferAra from "@/views/SeferAra";
import KoltukSecimi from "@/views/KoltukSecimi";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias : '/home',
    name: 'Home',
    component: Home,
    redirect : 'seferara'
  },
  {
    path: '/seferara',
    name: 'seferara',
    component: SeferAra
  },
  {
    path: '/koltuksecimi/:sefer_id?',
    name: 'koltuksecimi',
    component: KoltukSecimi
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
