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
                    <li><a class="dropdown-item" href="#" @click="toLogin()">Go to HomePage</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" style="font-size:12px" href="#"  @click="logout()"><i class="bi bi-box-arrow-left"></i> Logout</a></li>
                </ul> 
            </div>
        <component :is='currentTab'></component>
        
    </div>
</template>
<script>
import jwt_decode from "jwt-decode";

import Sidebar from '../components/sidebar.vue'
import ExtentionsTab from '../components/ExtentionsTab.vue'
import GroupsTab from '../components/GroupTab.vue'
import UploadTab from '../components/UploadTab.vue'

export default {
  components: { 
    Sidebar,
    ExtentionsTab,
    UploadTab,
    GroupsTab
  },
    data() {
        return {
            currentTab:'ExtentionsTab',
            sidebarbool:true,
            username:''
        }
    },
    mounted() {
        this.currentReport = this.$route.params.currentReportTab

        var token = this.getCookie('token')
        console.log(token)
        var decoded = jwt_decode(token);
        this.username = decoded.name
        if(token == ''|| token == null){
            this.$router.push('/main/services/')
        }
    },
    methods: {
        gotoprint(n){
            recieptData = n 
            currentReport ='Pos'
        },
        logout(){
            this.setCookie('token', null, 1 )
            this.$router.push('/main/services/')
        },
        toLogin(){
            this.$router.push({name:'Home'})
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