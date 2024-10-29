<template>
    <div class="main-div d-flex text-center text-dark bg-light">
         <div class="cover-container d-flex w-100 mx-auto flex-column">
  
    <nav class="navbar navbar-expand-lg fixed-top" >
      <div class="container">
        <a class="navbar-brand" href="#"><img class="float-start"   height="44" src="../assets/logo.png" > </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <!-- <span class="navbar-toggler-icon"></span> -->
          <i class="bi bi-list text-light"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav me-auto mb-2 mb-lg-0">
          </div>
          <div >
              <ul class="navbar-nav ">
                <a class="nav-link" :class="{active:active === 'CroppingCalendar'}" href="#" @click="$router.push('/main/CroppingCalendar'), active = 'CroppingCalendar'">Cropping Calendar</a>
                <a class="nav-link" :class="{active:active === 'tempRain'}" href="#" @click="$router.push('/main/tempRain'), active = 'tempRain'">Temp & Rain</a>
                <a class="nav-link" :class="{active:active === 'weather'}" href="#" @click="$router.push('/weather'), active = 'weather'">Weather</a>
                <a class="nav-link" :class="{active:active === 'dashboard'}" href="#" @click="$router.push('/main/services'), active = 'dashboard'">Dashboard</a>
                <a class="nav-link" :class="{active:active === 'Storyset'}" href="#" @click="$router.push('/main/storyset'), active = 'Storyset'"> Assembled Knowledge</a>
              </ul>       
          </div>
        </div>
      </div>
    </nav>

  <vueper-slides fade :touchable="true" autoplay fixed-height="700px" ref="myVueperSlides">
    <vueper-slide
      v-for="(slide, i) in slides"
      :key="i"
      :image="slide.image">
      <template #content  >
        <div class="d-flex align-items-center text-start" style="  background-color: rgba(0, 0, 0, 0.578);  width: 100%;  height: 100%;">
          <div class="jumb mx-auto rounded-3">
            <h1 style="color:#fff; font-family: 'Montserrat', sans-serif !important; font-weight:800" class="text-uppercase fw-bolder;">{{slide.title}}</h1>
            <hr class="bg-light w-75">
            <p style="color:#fff">{{slide.content}}</p>
            <router-link :to="slide.link" style="font-size:14px !important; font-weight: 700" class="btn btn-md  btn-secondary text-uppercase rounded-pill border-white bg-white">View More <i class="bi bi-arrow-right-short"></i></router-link>
          </div>
        </div>
      </template>
    </vueper-slide>
  </vueper-slides>

<div>
  <h2 class="fw-bolder mt-4">We Are <span style="color:rgb(195 82 31)">EIA-hub</span></h2>
  <hr class="w-50 mx-auto my-0">
  <p>Sourcing you with with data like no other, Ready?</p>
</div>


<div class="row container-fluid ">
  <div class="col-sm-12 col-lg-6">
      <p style="padding-inline:.2in; border-left: 5px rgb(195 82 31) solid; font-size: 15px; margin-left: 10px;" class="lh-lg my-5   text-start ">Excellence in Agronomy for Sustainable Intensification and Climate Change Adaptation is a CGIAR wide initiative that seeks to connect public and private sector partners with CGIAR centres to develop scalable agronomic solutions across 6 CGIAR regions. The solutions are developed within specific Use Cases, which are purpose driven and demand led partnerships that seek to package agronomy solutions as Minimum Viable Products, that can be validated and scaled in target geographies, cropping systems and within designated farmer communities The EiA Events platform convenes different conversations on agronomy happenning all over the world.</p>
      <a href="https://www.cgiar.org/initiative/11-excellence-in-agronomy-eia-solutions-for-agricultural-transformation/" class="btn rounded-pill float-start text-light mx-3 px-3 text-uppercase lmore" >learn more <i class="bi bi-arrow-right-short"></i></a>
  </div>
  <div class="col-sm-12 col-lg-6">
    <img  :src="require('../assets/Company-pana.svg')" alt="">  
  </div>
</div>

<div class="card card-margin text-light mx-4 my-4" style="height:fit-content !important; background-image: linear-gradient(67deg, #000000, #4fab43)!important;">
    <div class="card-body pt-3 login_body d-flex flex-column flex-md-row align-items-center justify-content-around">
        <div class="widget-49 col-6">
            <!-- <div class="widget-49-date-primary me-md-3 mb-3 mb-md-0" style="background-color: #ffffffe8;">
                <img style="width:70%;" class="ms-0" src="../assets/logo.png">
            </div> -->
            <div class=" py-1 rounded-pill text-center" style="background-color:#aeffa39a; width:fit-content">
                <span class="fw-bold text-uppercase px-3" style="font-size:14px">Ext. Portal</span>
            </div>
            <p class="widget-49-meeting-points mt-4 mt-md-3 text-md-start ms-md-0" style="font-size:14px">Our Extension Officers help manage farmers digitally. The Ext. Portal helps them add groups, send messages, and share information with farmers, aiming to grow a community of farmers and agronomists.</p>
        </div>
        <div class="login_section col-4 ms-md-3 d-flex justify-content-end mt-4 mt-md-0">
          <div>
            <div class="mb-3 ">
                <label for="username" class="form-label text-light float-start" style="font-size:13px">Username</label>
                <input type="email" v-model="username" class="form-control form-control-sm rounded-pill" id="username" placeholder="name@example.com">
            </div>
            <div class="mb-1 ">
                <label for="password" class="form-label text-light float-start" style="font-size:13px">Password</label>
                <div class="position-relative">
                    <input type="password" v-model="password" class="form-control form-control-sm rounded-pill" id="password" placeholder="Password">
                    <i class="bi bi-eye position-absolute text-secondary end-0 mt-1 me-2" id="togglePassword" @click="showpassword" style="cursor: pointer;   top: 25px;"></i>
                </div>
            </div>
            <div class="card-footer border-0 bg-transparent text-center text-md-end px-0">
                <a href="#" class="btn btn-sm login fw-bold btn-flash-border-primary border-2 rounded-pill" @click="centerLogin">Login <i class="bi bi-arrow-right-short"></i></a>
                <Transition>
                    <p v-if="resMsg" style="font-size:10px" class="text-danger">{{resMsg}}</p>
                </Transition>
            </div>
          </div>
        </div>
    </div>
</div>
<nav class="navbar footer text-light pt-5 pb-2" style="font-size:12px" >
    <div class="container text-center ">
    <div class="row row-cols-3 pb-4">
      <div class="col">
        <span class="d-flex flex-row mb-3">
          <img src="../assets/logo_white.png" class="mx-2" width="70">
          <img src="../assets/cgiar-logo-white.png" width="50">
        </span> 
        <p class="text-start " style="font-weight:400">
          CGIAR is a global research partnership for a food-secure future dedicated to transforming food, land, and water systems in a climate crisis.
        </p>
      </div>
      <div class="col text-start">
        <ul class="list-group " >
          <p class="fw-bold list-group-item border-0 text-light" style="font-size:20px;background-color: #fff0 !important;">Quick Links</p>
          <a class="list-group-item border-0 text-light" style="background-color: #fff0 !important;"  href="#" @click="$router.push('/') ">Home</a>
          <a class="list-group-item border-0 text-light"  style="background-color: #fff0 !important;"  href="#" @click="$router.push('/main/CroppingCalendar')"> Cropping Calendar</a>
          <a class="list-group-item border-0 text-light"  style="background-color: #fff0 !important;"  href="#" @click="$router.push('/main/tempRain')">Temp & Rain</a>
        </ul>
      </div>
            <div class="col text-start">
        <ul class="list-group pt-5" >
          <a class="list-group-item border-0 text-light"  style="background-color: #fff0 !important;"  href="#" @click="$router.push('/weather')"> Weather</a>
          <a class="list-group-item border-0 text-light"  style="background-color: #fff0 !important;"  href="#" @click="$router.push('/main/dashboard')"> Dashboard</a>
          <a class="list-group-item border-0 text-light"  style="background-color: #fff0 !important;"  href="#" @click="$router.push('/main/storyset')"> Assembled Knowledge</a>
        </ul>
      </div>
    </div>
  </div>
  <div class="container pt-4" style="border-top:1px solid rgba(255, 255, 255, 0.1)">
      <span class="text-light ">&copy; Copyright {{new Date(Date.now()).getFullYear()}} by Excellence in Agronomy</span>
      <a class="navbar-brand float-end" href="#"><img class=""  height="44" src="../assets/logo.png" > </a>
  </div>
</nav>
</div>
    </div>
</template>


<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import axios from 'axios'

export default {
  components: { VueperSlides, VueperSlide },
  name: "Home",
data() {
  return {
    active:null,
    resMsg:'',
    parallax: -1,
    parallaxFixedContent: false,
    pauseOnHover: true,
    autoPlaying: true,
    internalAutoPlaying: true,
    username:'',
    password:'',
    slides: [
      {
        title:'Advisories',
        content:'Utilize our Services created by our team of expects to assist you in your field of intrest, these are Applications created from the very data found here, these have been refined to develop Apps that suit you ',
        image: require('@/assets/andrew-horodnii-yPZ_kLs7koA-unsplash (1).jpg'),
        link:'/main/services'
      },
      {
        title:' Assembled Knowledge',
        content:'Exploratory & in-depth analysis (quantitative and qualitative) of data gathered and stored by the Africa RISING Dataverse portal over the past decade. ', 
        image: require('@/assets/daniel-de-lima-ofPW5f2WmHc-unsplash (1).jpg'),
        link:'/main/storyset'
      }
    ],

  }
},
beforeCreate(){
   document.getElementById('app').className = 'home';
},
methods:{
  changeTopic(param){
    this.displayParam = this.vectordetails[param]
    console.log(this.displayParam)
  },
  previous(id){
    if(id <= 0 ){
      id = this.vectordetails.length-1
      this.changeTopic(id)
    }else{
      this.changeTopic(id - 1)
    }
  },
  nextitem(id){
    if(id >= this.vectordetails.length - 1 ){
      id = 0
      this.changeTopic(id)
    }else{
      this.changeTopic(id + 1)
    } 
  },
  centerLogin(){
    axios.post('https://aghub.miphost.com/api/broadcast/login',{
      email:this.username,
      password:this.password
    })
    .then(response =>  {
      this.setCookie('token', response.data, 1)
      this.$router.push({name : 'ControlCenter'})
    }).catch(error => {
        this.resMsg = error.response.data
        setInterval(() => {
          this.resMsg = null
        }, 2000);
    })
  },
  getCookie(cname){
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
    document.cookie = cname + "=" + cvalue + ";"+ expires + ";path=/";
  },
}
}
</script>

<style scoped>

.login{
  background-color:#c3521f !important;
  width:100%
}
.login:hover{
  background-color:#452d22!important;
}
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

/*  */
input[type=file]::file-selector-button {
  border: 2px solid #7567d900;
  padding: .2em .4em;
  border-radius: .2em;
  background-color: #5c5c5c;
  transition: 1s;
  
}
.card-footer a{
  background-color:rgb(0 104 56);
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px !important;
}

.card-footer a:hover{
  background-color: rgb(85 176 71);
}

.form-control[data-v-6a57b8d6]:focus {
    background-color: rgb(176 176 176 / 0%) !important;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0%) !important;
}

input[type = file]{
    display: inline !important;
    width: auto !important;
    border: none !important;
    background-color:#d2691e00;
    margin-inline: 5px;
}
input[type=file]::file-selector-button:hover {
  background-color: #81ecec;
  border: 2px solid #00cec9;
}

.modal-header {
    border-bottom: 1px solid #dee2e634;
}

.modal-footer{
    border-top: 1px solid #dee2e634;
}


.footer{
  background-image: url('../assets/footer_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.lmore{
  background-color: rgb(85 176 71);
}

.lmore:hover{
  background-color: rgb(0 104 56);
}

.navbar{
  background-color: rgba(0, 0, 0, 0.48);
}
.jumb{
  padding: 20px;
  /* background-color: rgba(0, 0, 0, 0.578); */
  width: 50%;
  /* border: 3px #c3521f solid; */
  /* border-radius: 2rem!important; */
}
.dropdown-menu{
  min-width: 20rem !important;
  inset: 5px auto auto -100px !important
}
.dropdown-menu .nav-link:hover{
  background-color: rgb(99, 99, 99);
  opacity: .8;
  font-size: 14px;
}
.nav-link{
  color: #c7c7c7 !important;
  transition:  .5s;
  font-size: 14px;
}
.navbar-nav{
    width: fit-content !important;
    float: right !important;
}
.nav-link:hover{
  background-color: #4fab43 !important;
  border-radius: 50px !important;
  padding-inline: 15px !important;
  color: rgba(246, 246, 246, 0.807) !important;
} 
.float{
	position:fixed;
	width:41px;
	height:40px;
	bottom:48%;
	left:15px;
	background-color:#4fab43;
	color:#FFF;
	border-radius:50px;
  transition: transform .2s;
	text-align:center;
	box-shadow: 0px 0px 5px #999;
}
.float2{
	position:fixed;
	width:41px;
	height:40px;
	bottom:48%;
	right:15px;
	background-color:#4fab43;
	color:#FFF;
	border-radius:50px;
  transition: transform .2s;
	text-align:center;
	box-shadow: 0px 0px 5px #999;
}
.my-float{
    position: absolute;
      top: 2.5px;
}
.float:hover{
  transform: scale(1.1); 
	background-color: rgb(0 104 56);

}
.float2:hover{
  transform: scale(1.1); 
	background-color: rgb(0 104 56);

}

      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
      /*
 * Globals
 */


/* Custom default button */
.btn-secondary,
.btn-secondary:focus {
  background-color: rgb(195 82 31) !important;
  text-shadow: none; /* Prevent inheritance from `body` */
}
.btn-secondary:hover{
  background-color: rgb(69 45 34) !important;
}


/*
 * Base structure
 */



.cover-container {
  max-width: 100%;
}

.navbar-nav {
    display: flex;
    /* padding-left: 60% !important; */
    margin-bottom: 0;
    text-align: end !important;
    list-style: none;
}
/*
 * Header
 */
.nav-link {
  padding: .02rem 0;
  font-weight: 500;
  color: rgba(50, 49, 49, 0.5);
  background-color: transparent;
  border-bottom: .25rem solid transparent;
}

 .nav-link:hover,
 .nav-link:focus {
      text-shadow: 0 0.05rem 0.05rem rgb(0 0 0 / 28%) !important;
}

 .nav-link + .nav-link {
  margin-left: 1rem;
} 

 .active {
  color: #fff;
  border-bottom-color: #fff;
}
.main-div{
     height: 100%;
     /* overflow-x: hidden !important; */
    /* text-shadow: 0 0.05rem 0.1rem rgb(0 0 0 / 50%); */
    /* box-shadow: inset 0 0 5rem rgb(0 0 0 / 50%); */
}
</style>