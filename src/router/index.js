import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import CroppingCalendar from '../views/CroppingCalendar.vue'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import StorySet from '../views/storyset.vue'
import DataSets from '../views/datasets.vue'
import Tools from '../views/tools.vue'
import DatasetPreview from '../views/datasetpreview.vue'
import Storysetchartboard from '../views/storysetchartboard'





const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/weather",
    beforeEnter(to, from, next) {
      window.location.href = "http://ghmeteo.herokuapp.com/";
    }
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
        path: 'storysetchartboard/:data',
        name: 'Storysetchartboard',
        component: Storysetchartboard,
        props: (route) => ({
          data: route.params.data,
          ...route.params
        })
      },
      {
        path: 'tools',
        name: 'Tools',
        component: Tools
      },
      {
        path: 'datasets',
        name: 'Datasets',
        component: DataSets,
      },
      {
        path: 'datasetpreview',
        name: 'DatasetPreview',
        component: DatasetPreview
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
  history: createWebHashHistory(),
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
