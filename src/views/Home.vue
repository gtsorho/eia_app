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
                <a class="nav-link" :class="{active:active === 'cropping'}" href="#" @click="$router.push('/main/services'), active = 'cropping'">Advisories</a>
                <!-- <a class="nav-link" :class="{active:active === 'Dashbords'}" href="#" @click="$router.push(''),  active = 'Dashbords'">Dashbords</a> -->
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
 

  <!-- <main class="px-3">
    <div class="row  row-cols-1  row-cols-md-2">
      <div class="col my-auto">
        <h1>{{displayParam.Title}}</h1>
        <hr class="mx-auto" style="width:90%; background-color:#4fab43">
        <p class="lead fs-6 px-5">{{displayParam.text}}</p>
        <p class="lead">
          <router-link :to="displayParam.link" style="font-size:14px !important; font-weight: 700" class="btn btn-md btn-secondary text-uppercase rounded-pill border-white bg-white">View More <i class="bi bi-arrow-right-short"></i></router-link>
        </p>
        <a  class="float align-middle" href="#offcanvasExample"  aria-controls="offcanvasExample" @click="previous(displayParam.id)">
          <i class="bi bi-chevron-left fs-4 my-float" style="left: 6.4px;"></i>
        </a>
        <a  class="float2 align-middle"  href="#offcanvasExample"  aria-controls="offcanvasExample"  @click="nextitem(displayParam.id)" >
          <i class="bi bi-chevron-right fs-4 my-float" style="left: 10.4px;"></i>
        </a>
      </div>
      <div class="col">
        <img class="w-75" :src="require('../assets/' + displayParam.img)" alt="">        
      </div>
    </div>
  </main> -->
<nav class="navbar footer text-light pt-5 pb-2" style="font-size:12px" >
    <div class="container text-center ">
    <div class="row row-cols-2 pb-4">
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
          <a class="list-group-item border-0 text-light"  style="background-color: #fff0 !important;"  href="#" @click="$router.push('/main/services')"> Advisories</a>
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

export default {
  components: { VueperSlides, VueperSlide },
  name: "Home",
data() {
  return {
    active:null,

    parallax: -1,
    parallaxFixedContent: false,
    pauseOnHover: true,
    autoPlaying: true,
    internalAutoPlaying: true,


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











    // vectordetails:[
    //   {
    //     id: 0,
    //     img:'tools.svg',
    //     Title:'Advisories',
    //     text:'Utilize our Services created by our team of expects to assist you in your field of intrest, these are Applications created from the very data found here, these have been refined to develop Apps that suit you ',
    //     link:'/main/services'
    //   },
    //   // {
    //   //   id: 1,
    //   //   img:'dash.svg',
    //   //   Title:'Dashbords',
    //   //   text:'What of you could Select a dataset and choose a data field that intrests you, and we\ll populate graphs and charts that suit your selected data fields and if you are still not satisfied with the default charts you have options. This is an opportunity for you to tell your own story, be your own god.',
    //   //   link:'/main/dashboard'
    //   // },
    //   {
    //     id: 1,
    //     img:'story.svg',
    //     Title:' Assembled Knowledge',
    //     text:'This details findings from exploratory to in-depth analysis (quantitative and qualitative) of a decade of data gathered and stored by the Africa RISING Dataverse portal. This report’s focus is centered on the cultivation of maize, soybean, cowpea and groundnut in the upper regions of Ghana. However, highlights are thrown on other crops of interest where the data supports our objective.', 
    //     link:'/main/storyset'
    //   },
    // ],
    // displayParam:{
    //     id: 1,
    //     img:'story.svg',
    //     Title:' Assembled Knowledge',
    //     text:'This details findings from exploratory to in-depth analysis (quantitative and qualitative) of a decade of data gathered and stored by the Africa RISING Dataverse portal. This report’s focus is centered on the cultivation of maize, soybean, cowpea and groundnut in the upper regions of Ghana. However, highlights are thrown on other crops of interest where the data supports our objective.', 
    //     link:'/main/storyset'
    //   },

  }
},
beforeCreate(){
   document.getElementById('app').className = 'home';
   console.log([0.07,0.27,0.94,0.54,0.46,0.90,0.68,0.04,0.03,0.63,0.38,0.20,0.68,0.39,0.13,0.62,0.70,0.13,0.20,0.64,0.95,0.05,0.04,0.95,0.06,0.66,0.38,0.98,0.08,0.02,0.10,0.30,0.69,0.93,0.20,0.51,0.83,0.66,0.18,0.94,0.50,0.37,0.58,0.05,0.58,0.85,0.58,0.68,0.44,0.80,0.82,0.07,0.28,0.66,0.79,0.14,0.58,0.38,0.95,0.09,0.86,0.01,0.12,0.31,0.69,0.58,0.04,0.37,0.68,0.65,0.34,0.81,0.61,0.63,0.18,0.87,0.03,0.32,0.79,0.21,0.56,0.32,0.89,0.51,0.18,0.17,0.75,0.76,0.25,0.91,0.97,0.99,0.91,0.39,0.01,0.93,0.48,0.89,0.84,0.88,0.56,0.45,0.86,0.18,0.79,0.45,0.84,0.02,0.56,0.57,0.65,0.58,0.88,0.78,0.31,0.57,0.37,0.59,0.32,0.49,0.92,0.55,0.65,0.57,0.82,0.34,0.63,0.40,0.43,0.06,0.82,0.24,0.19,0.24,0.87,0.58,0.84,0.74,0.91,0.97,0.38,0.95,0.24,0.03,0.57,0.89,0.64,0.07,0.36,0.36,0.77,0.90,0.16,0.83,0.93,0.89,0.10,0.33,0.53,0.59,0.75,0.60,0.65,0.61,0.81,0.99,0.44,0.52,0.07,0.50,0.17,0.06,0.39,0.61,0.17,0.82,0.76,0.46,0.95,0.43,0.32,0.99,0.04,0.63,0.13,0.33,0.91,0.61,0.43,0.95,0.30,0.32,0.94,0.03,0.38,0.34,0.65,0.19,0.57,0.49,0.71,0.40,0.65,0.97,0.34,0.49,0.47,0.77,0.80,0.72,0.91,0.83,0.22,0.55,0.24,0.41,0.14,0.35,0.97,0.65,0.35,0.90,0.84,0.92,0.41,0.96,0.53,0.93,0.64,0.66,0.83,0.66,0.66,0.78,0.54,0.18,0.82,0.65,0.79,0.47,0.61,0.88,0.91,0.81,0.01,0.03,0.55,0.90,0.35,0.91,0.91,0.81,0.38,0.78,0.46,0.55,0.33,0.81,0.04,0.49,0.51,0.33,0.89,0.34,0.49,0.96,0.41,0.87,0.26,0.44,0.28,0.22,0.61,0.66,0.17,0.91,0.69,0.65,0.30,0.57,0.94,0.97,0.91,0.57,0.93,0.21,0.07,0.63,0.63,0.38,0.38,0.64,0.53,0.97,0.59,0.75,0.99,0.04,0.89,0.04,0.03,0.80,0.40,0.81,0.99,0.95,0.08,0.90,0.08,0.52,0.68,0.55,0.80,0.02,0.87,0.56,0.55,0.03,0.41,0.76,0.59,0.33,0.42,0.76,0.83,0.40,0.56,0.08,0.43,0.88,0.73,0.88,0.93,0.13,0.82,0.13,0.91,0.66,0.63,0.20,0.72,0.66,0.02,0.33,0.58,0.26,0.92,0.25,0.01,0.27,0.68,0.53,0.34,0.02,0.98,0.95,0.16,0.65,0.69,0.15,0.36,0.99,0.23,0.27,0.43,0.52,0.67,0.77,0.16,0.60,0.23,0.91,0.39,0.85,0.85,0.66,0.69,0.58,0.22,0.03,0.36,0.16,0.35,0.52,0.42,0.77,0.62,0.01,0.09,0.86,0.90,0.07,0.74,0.03,0.82,0.57,0.17,0.20,0.81,0.35,0.07,0.42,0.10,0.33,0.61,0.88,0.08,0.60,0.39,0.57,0.02,0.17,0.27,0.67,0.31,0.70,0.25,0.09,0.98,0.37,0.12,0.31,0.61,0.22,0.16,0.11,0.42,0.14,0.79,0.28,0.39,0.95,0.72,0.61,0.96,0.61,0.17,0.56,0.32,0.42,0.37,0.40,0.13,0.31,0.80,0.66,0.54,0.85,0.85,0.97,0.99,0.52,0.99,0.56,0.52,0.48,0.87,0.36,0.15,0.94,0.35,0.04,0.59,0.58,0.52,0.69,0.74,0.91,0.83,0.65,0.63,0.03,0.18,0.41,0.75,0.47,0.73,0.33,0.94,0.91,0.99,0.69,0.59,0.97,0.80,0.90,0.85,0.36,0.84,0.70,0.04,0.61,0.94,0.27,0.43,0.55,0.37,0.63,0.82,0.84,0.84,0.92,0.99,0.68,0.12,0.01,0.27,0.87,0.12,0.72,0.19,0.19,0.44,0.57,0.44,0.27,0.67,0.26,0.30,0.87,0.29,0.66,0.49,0.32,0.40,0.98,0.34,0.73,0.93,0.55,0.61,0.20,0.17,0.77,0.14,0.90,0.18,0.61,0.18,0.33,0.26,0.03,0.82,0.49,0.68,0.97,0.11,0.28,0.55,0.80,0.78,0.41,0.14,0.19,0.57,0.22,0.89,0.70,0.70,0.99,0.74,0.55,0.45,0.53,0.08,0.55,0.74,0.20,0.93,0.32,0.16,0.89,0.08,0.87,0.62,0.59,0.38,0.86,0.43,0.94,0.56,0.65,0.67,0.38,0.59,0.18,0.29,0.10,0.78,0.82,0.43,0.72,0.09,0.54,0.44,0.19,0.11,0.74,0.80,0.78,0.90,0.19,0.05,0.13,0.08,0.69,0.77,0.34,0.21,0.57,0.47,0.13,0.93,0.18,0.15,0.71,0.73,0.52,0.29,0.92,0.91,0.20,0.57,0.07,0.73,0.34,0.58,0.55,0.21,0.76,0.97,0.90,0.07,0.78,0.51,0.26,0.36,0.09,0.18,0.15,0.23,0.65,0.36,0.94,0.94,0.57,0.48,0.12,0.62,0.09,0.96,0.20,0.66,0.09,0.90,0.96,0.88,0.89,0.52,0.59,0.40,0.64,0.74,0.67,0.39,0.26,0.61,0.45,0.55,0.90,0.04,0.83,0.21,0.23,0.90,0.91,0.30,0.55,0.43,0.93,0.21,0.50,0.35,0.75,0.08,0.08,0.47,0.09,0.09,0.11,0.66,0.50,0.39,0.35,0.13,0.24,0.08,0.19,0.74,0.65,0.89,0.43,0.41,0.24,0.88,0.66,0.51,0.07,0.98,0.01,0.36,0.24,0.21,0.66,0.36,0.81,0.32,0.76,0.59,0.36,0.57,0.12,0.84,0.35,0.16,0.39,0.53,0.96,0.22,0.36,0.07,0.52,0.15,0.73,0.18,0.39,0.24,0.19,0.55,0.97,0.66,0.93,0.64,0.84,0.19,0.10,0.53,0.57,0.65,0.45,0.52,0.55,0.19,0.92,0.82,0.74,0.54,0.31,0.32,0.62,0.31,0.99,0.13,0.41,0.82,0.29,0.74,0.42,0.98,0.13,0.14,0.02,0.20,0.49,0.37,0.71,0.24,0.72,0.94,0.23,0.87,0.91,0.47,0.46,0.58,0.31,0.16,0.08,0.15,0.89,0.72,0.36,0.87,0.25,0.18,0.44,0.20,0.73,0.59,0.58,0.22,0.28,0.71,0.10,0.08,0.51,0.04,0.20,0.47,0.72,0.29,0.21,0.90,0.53,0.39,0.38,0.78,0.83,0.45,0.30,0.33,0.11,0.46,0.97,0.80,0.81,0.33,0.71,0.82,0.96,0.53,0.93,0.24,0.08,0.19,0.35,0.83,0.38,0.45,0.96,0.73,0.03,0.87,0.07,0.21,0.67,0.57,0.06,0.67,0.65,0.63,0.08,0.56,0.55,0.08,0.97,0.06,0.15,0.92,0.12,0.24,0.82,0.02,0.08,0.01,0.15,0.79,0.30,0.20,0.54,0.49,0.40,0.97,0.26,0.96,0.38,0.68,0.41,0.86,0.88,0.07,0.26,0.03,0.13,0.73,0.86,0.95,0.48,0.30,0.89,0.73,0.98,0.40,0.79,0.33,0.67,0.95,0.02,0.62,0.10,0.36,0.12,0.26,0.82,0.88,0.01,0.68,0.36,0.95,0.73,0.45,0.92,0.34,0.64,0.33,0.18,0.06,0.08,0.37,0.15,0.51,0.05,0.64,0.46,0.15,0.25,0.69,0.01,0.11,0.48,0.42,0.10,0.54,0.65,0.34,0.14,0.49,0.89,0.80,0.31,0.33,0.07,0.17,0.71,0.57,0.69,0.28,0.28,0.93,0.68,0.99,0.47,0.69,0.79,0.03,0.87,0.60,0.18,0.61,0.80,0.16,0.53,0.17,0.49,0.59,0.04,0.84,0.12,0.45,0.93,0.89,0.67,0.47,0.04,0.82,0.12,0.18,0.29,0.70,0.41,0.85,0.20,0.53,0.71,0.46,0.50,0.88,0.14,0.24,0.01,0.63,0.86,0.92,0.05,0.39,0.61,0.64,0.16,0.71,0.13].length)
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
  }
}
}
</script>

<style scoped>
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
}
.nav-link{
  color: #c7c7c7 !important;
  transition:  .5s;
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