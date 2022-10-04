<template>
   <Sidebar :sidebarVal="sidebarbool"  @humburgerClick="sidebarbool = true"  @currentTab="(data) => currentTab = data"/>
    <div id="main">
        <span style="font-size:20px;cursor:pointer" class="float-start" v-show="sidebarbool" @click="sidebarbool = !sidebarbool" >&#9776;</span>
            <div class="btn-group float-end">
                <button class="btn btn-light  btn-sm dropdown-toggle rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi fs-5 bi-person-circle text-dark"></i>
                </button>
                <ul class="dropdown-menu" style="width:2.5in">
                    <li><a class="dropdown-item" href="#">{{username}}</a></li>
                    <li><a class="dropdown-item" href="#" @click="toLogin()">Go to Signup Page</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" style="font-size:12px" href="#"  @click="logout()"><i class="bi bi-box-arrow-left"></i> Logout</a></li>
                </ul> 
            </div>
        <component :is='currentTab'></component>
        
    </div>
</template>
<script>
import axios from 'axios'
import Sidebar from '../components/sidebar.vue'
import productReport from '../components/productReportWindow.vue'
import stockReport from '../components/stockReportWindow.vue'

export default {
  components: { 
    Sidebar,
    productReport,
    stockReport,
  },
    data() {
        return {
            currentTab:'productReport',
            sidebarbool:true,
            username:'George Turkson'
        }
    },
    mounted() {
        this.currentReport = this.$route.params.currentReportTab

        var token = this.getCookie('token')
        if(token == ''){
            // this.$router.push('/main/services')
        }
    },
    methods: {
        gotoprint(n){
            recieptData = n 
            currentReport ='Pos'
        },
        logout(){
        var token = this.getCookie('token')

        axios.get('/api/logout', 
            { headers:{'Authorization': `Bearer ${token}`}})
        .then(response =>  {
            this.setCookie('token','', 1 )
            this.$router.push({name:'Login'})
        }).catch(error => {
            console.log(error);
        })      
        },
        toLogin(){
            this.$router.push({name:'Login'})
        },
        getCookie(cname) {
            let name = cname + "=";
            let ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
                }
            }
            return "";
        },
            setCookie(cname, cvalue, exdays) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
    },
}
</script>
<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro&family=Source+Sans+Pro:wght@300&display=swap');

    a, h1,h2,h3,h4,h5,h6,p,button,th, label, span,td,div,legend {
        font-family: 'Source Sans Pro', sans-serif !important;
        font-weight:600 !important;
    }

    body{
            min-height: 100vh;
        min-height: -webkit-fill-available;
        background-color: rgb(230, 230, 230) !important;
    }
    .dropdown-item{
        font-size: 12px;
    }
    .btn-light:focus{
    color: #000;
    background-color: #f9fafb;
    border-color: #f9fafb;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0%) !important;
    }
    #main {
        transition: margin-left .5s;
        padding: 16px;
        margin-left: 250px;
    }
</style>