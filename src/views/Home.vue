<template>
    <div class="main-div d-flex text-center text-dark bg-light">
         <div class="cover-container d-flex w-100 mx-auto flex-column">
  
    <nav class="navbar navbar-expand-lg fixed-top" >
      <div class="container">
        <a class="navbar-brand" href="#"><img class="float-start"   height="44" src="../assets/logo.png" > </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
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
  <div class="col-6 ">
      <p style="padding-inline:.2in; border-left: 5px rgb(195 82 31) solid; font-size: 15px; margin-left: 10px;" class="lh-lg my-5   text-start ">Excellence in Agronomy for Sustainable Intensification and Climate Change Adaptation is a CGIAR wide initiative that seeks to connect public and private sector partners with CGIAR centres to develop scalable agronomic solutions across 6 CGIAR regions. The solutions are developed within specific Use Cases, which are purpose driven and demand led partnerships that seek to package agronomy solutions as Minimum Viable Products, that can be validated and scaled in target geographies, cropping systems and within designated farmer communities The EiA Events platform convenes different conversations on agronomy happenning all over the world.</p>
      <a href="https://www.cgiar.org/initiative/11-excellence-in-agronomy-eia-solutions-for-agricultural-transformation/" class="btn rounded-pill float-start text-light mx-3 px-3 text-uppercase lmore" >learn more <i class="bi bi-arrow-right-short"></i></a>
  </div>
  <div class="col-6">
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
<nav class="navbar bg-light" style="font-size:12px">
  <div class="container">
      <span class="text-dark ">&copy; {{new Date(Date.now()).getFullYear()}} EiA-Hub</span>
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
      image: require('@/assets/andrew-horodnii-yPZ_kLs7koA-unsplash.jpg'),
      link:'/main/services'
    },
    {
      title:' Assembled Knowledge',
      content:'Exploratory & in-depth analysis (quantitative and qualitative) of data gathered and stored by the Africa RISING Dataverse portal over the past decade. ', 
      image: require('@/assets/daniel-de-lima-ofPW5f2WmHc-unsplash.jpg'),
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