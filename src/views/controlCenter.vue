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
            <div class="btn-group float-end">
                <button class="btn btn-light  btn-sm dropdown rounded-pill " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi fs-5 bi-bell-fill text-dark position-relative">
                        <span style="font-size: 9px;" class="position-absolute top-0  start-100 translate-middle  badge rounded-pill bg-danger">
                        {{notifications.length}} 
                        <span class="visually-hidden">unread messages</span>
                    </span>
                    </i>
                </button>
                <ol class="dropdown-menu" >
                    <li style="font-size:12px" class="px-2" v-if="notifications.length == 0">No Notifications</li>
                    <li v-for="(notification, i) in notifications" :key="i">
                        <div class="alert alert-warning alert-dismissible fade show dropdown-item py-1  text-capitalize" role="alert">
                            <a href="#" class="text-decoration-none text-dark" v-html="i+1+'. '+notification.message" @click="unshareContact(notification.notification, i)"></a>
                            <button type="button" class="btn-close py-2" data-bs-dismiss="alert" aria-label="Close" @click="seenNotification(notification.notification.id, i)"></button>
                        </div>
                    </li>
                </ol> 
            </div>
        <component :is='currentTab' @notification="getNotifications"></component>
        
    </div>
</template>
<script>
import jwt_decode from "jwt-decode";
import axios from 'axios'    

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
            notifications:[],
            currentTab:'ExtentionsTab',
            sidebarbool:true,
            username:''
        }
    },
    mounted() {

        this.currentReport = this.$route.params.currentReportTab

        var token = this.getCookie('token')
        var decoded = jwt_decode(token);
        this.username = decoded.name
        if(token == ''|| token == null){
            this.$router.push('/')
        }
    },
    methods: {
        getNotifications(data){
            var token = this.getCookie('token')
            data.forEach(notification => {
                axios.get('https://aghub.miphost.com/api/broadcast/show/'+ notification.partnerId, 
                { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    var username = response.data.name
                    var notificationDescrip = notification.description.slice(0,-1).split(' ')
                    if(notificationDescrip[notificationDescrip.length - 1] == 'ext'){
                        axios.get('https://aghub.miphost.com/api/broadcast/contact/show/' + notification.extId, 
                        { headers:{'Authorization': `Bearer ${token}`}})
                        .then(response =>  {
                           var extentionName =  response.data[0].name
                           this.notifications.push({
                                'notification': notification,
                                'message': `${notification.description} <span class="badge bg-secondary"> ${extentionName}</span> form <span class="badge bg-secondary"> ${username}</span>`      
                            })
                        }).catch(error => {
                            console.log(error);
                        })
                    }else if(notificationDescrip[notificationDescrip.length - 1] == 'podcast'){
                       axios.get('https://aghub.miphost.com/api/broadcast/podcasts/show/'+ notification.podcastId, 
                        { headers:{'Authorization': `Bearer ${token}`}})
                        .then(response =>  {
                            var podcastName = response.data[0].name
                            this.notifications.push({
                                'notification': notification,
                                'message': `${notification.description}  <span class="badge bg-secondary"> ${podcastName}</span> form <span class="badge bg-secondary"> ${username}</span>`
                           })
                        }).catch(error => {
                            console.log(error);
                        }) 
                    }
                }).catch(error => {
                    console.log(error);
                })
            });
        },
        unshareContact(data, index){
            var token = this.getCookie('token')
            var notificationDescrip = data.description.slice(0,-1).split(' ')
            if(notificationDescrip[notificationDescrip.length - 1] == 'ext'){
                axios.post('https://aghub.miphost.com/api/broadcast/unshare/', 
                {
                    extId:data.extId,
                    partnerId:data.partnerId
                },
                { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    this.seenNotification(data.id, index)
                }).catch(error => {
                    console.log(error);
                }) 
            }else if(notificationDescrip[notificationDescrip.length - 1] == 'podcast'){
                axios.post('https://aghub.miphost.com/api/broadcast/podcasts/unshare/', 
                {
                    podcastId:data.podcastId,
                    partnerId:data.partnerId
                },
                { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    this.seenNotification(data.id, index)
                }).catch(error => {
                    console.log(error);
                }) 
            }
        },
        seenNotification(id, index){
            var token = this.getCookie('token')
            axios.post('https://aghub.miphost.com/api/broadcast/notification/update/' + id, 
            {
                seen: true,
            },
            { headers:{'Authorization': `Bearer ${token}`}})
            .then(response =>  {
                this.notifications.splice(index,1)
            }).catch(error => {
                console.log(error);
            }) 
        },
        gotoprint(n){
            recieptData = n 
            currentReport ='Pos'
        },
        logout(){
            this.setCookie('token', null, 1 )
            this.$router.push('/')
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