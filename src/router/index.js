import { createRouter, createWebHistory } from 'vue-router'
import CroppingCalendar from '../views/CroppingCalendar.vue'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import StorySet from '../views/storyset.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
      {
        path: 'Croppingcalendar',
        name: 'CroppingCalendar',
        component: CroppingCalendar
      },
      {
        path: 'storyset',
        name: 'Storyset',
        component: StorySet
      },
      {
        path: 'dashboard',
        name: 'Dashbord',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
      }
    ]
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
