import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Weather from '../views/weatherHome.vue'
import Main from '../views/Main.vue'
import StorySet from '../views/storyset.vue'
import Storysetchartboard from '../views/storysetchartboard'
import tempRain from '../views/temprain'
import ControlCenter from '../views/controlCenter'
import leaflet from '../views/leaflet'
import weatherBg from "@/assets/hero-sky-dramatic-lightning-weather-shutterstock_2200924189.jpg";
import CroppingCalendarNew from '../views/CroppingCalendarUpdating.vue'
import CalendarMore from '../views/calenderMore.vue'


// import services from '../views/tools.vue'
// import DataSets from '../views/datasets.vue'
// import DatasetPreview from '../views/datasetpreview.vue'



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
        path: 'croppingcalendar',
        name: 'CroppingCalendar',
        component: CroppingCalendarNew,
      },
      {
        path:'more',
        name:'More',
        component:CalendarMore
      },
      {
        path: 'temprain',
        name: 'TempRain',
        component: tempRain
      },
      {
        path: 'leaflet',
        name: 'leaflet',
        component: leaflet
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
      // {
      //   path: 'services',
      //   name: 'services',
      //   component: services
      // },
      // {
      //   path: 'datasets',
      //   name: 'Datasets',
      //   component: DataSets,
      // },
      // {
      //   path: 'datasetpreview',
      //   name: 'DatasetPreview',
      //   component: DatasetPreview
      // },
      {
        path: 'dashboard',
        name: 'Dashbord',
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
