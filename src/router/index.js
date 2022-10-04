import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import CroppingCalendar from '../views/CroppingCalendar.vue'
import Home from '../views/Home.vue'
import Weather from '../views/weatherHome.vue'
import Main from '../views/Main.vue'
import StorySet from '../views/storyset.vue'
import DataSets from '../views/datasets.vue'
import services from '../views/tools.vue'
import DatasetPreview from '../views/datasetpreview.vue'
import Storysetchartboard from '../views/storysetchartboard'
import tempRain from '../views/temprain'
import ControlCenter from '../views/controlCenter'
import weatherBg from "@/assets/pexels-pixabay-209831.jpg";





const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/weather',
    name: 'weather',
    component: Weather,
    meta: {  bgImage: weatherBg }
  },
  {
    path: "/technologies",
    beforeEnter(to, from, next) {
      window.location.href = "http://technologies.csirgh.com/views/map";
    }
  },
  {
    path: "/kuafo",
    beforeEnter(to, from, next) {
      window.location.href = "http://kuafo.csirgh.com/";
    }
  },
  {
    path: "/advisor",
    beforeEnter(to, from, next) {
      window.location.href = "https://play.google.com/store/apps/details?id=com.insti.kuafo_Advisor";
    }
  },
  {
    path: "/csirspace",
    beforeEnter(to, from, next) {
      window.location.href = "http://csirspace.csirgh.com/";
    }
  },
  {
    path: "/controlcenter",
    name: 'ControlCenter',
    component: ControlCenter
    
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
        path: 'temprain',
        name: 'TempRain',
        component: tempRain
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
        path: 'services',
        name: 'services',
        component: services
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
