<template>
    <div class="main-div d-flex text-center text-dark bg-light">
         <div class="cover-container d-flex w-100 p-3 mx-auto flex-column">
  <header class="mb-auto mx-5">
    <!-- <div>
      <h2 class="float-md-start mb-0" style="color:#f56a6a">AG-DATAHUB</h2>
      <nav class="nav nav-masthead justify-content-center float-md-end text-dark">
        <a class="nav-link" :class="{active:active === 'cropping'}" href="#" @click="changeTopic(0), active = 'cropping'">Services</a>
        <a class="nav-link" :class="{active:active === 'Dashbords'}" href="#" @click="changeTopic(1),  active = 'Dashbords'">Dashbords</a>
        <a class="nav-link" :class="{active:active === 'Storyset'}" href="#" @click="changeTopic(2), active = 'Storyset'">Storyset</a>
        <a class="nav-link" :class="{active:active === 'Dataset'}" href="#" @click="changeTopic(3), active = 'Dataset'">Dataset</a>
      </nav>
    </div> -->
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><h2 class="float-md-start mb-0" style="color:#f56a6a">AG-DATAHUB</h2></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ">
        <a class="nav-link" :class="{active:active === 'cropping'}" href="#" @click="changeTopic(0), active = 'cropping'">Services</a>
        <a class="nav-link" :class="{active:active === 'Dashbords'}" href="#" @click="changeTopic(1),  active = 'Dashbords'">Dashbords</a>
        <a class="nav-link" :class="{active:active === 'Storyset'}" href="#" @click="changeTopic(2), active = 'Storyset'">Storyset</a>
        <a class="nav-link" :class="{active:active === 'Dataset'}" href="#" @click="changeTopic(3), active = 'Dataset'">Dataset</a>
      </div>
    </div>
  </div>
</nav>
  </header>

  

  <main class="px-3">
    <div class="row  row-cols-1  row-cols-md-2">
      <div class="col my-auto">
        <h1>{{displayParam.Title}}</h1>
        <hr class="mx-auto" style="width:90%; background-color:#f56a6a">
        <p class="lead fs-6 px-5">{{displayParam.text}}</p>
        <p class="lead">
          <router-link :to="displayParam.link" class="btn btn-md btn-secondary fw-bold border-white bg-white">View More</router-link>
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
  </main>
  <footer class="mt-auto text-dark-50">
    <small>Want to know more about us @ <a href="http://poc.miphost.com/" class=" text-decoration-none ">poc.miphost.com</a>   let's walk you through our Proof of Concepts</small>
  </footer>
</div>
    </div>
</template>
<script>
export default {
name: "Home",
data() {
  return {
    active:null,
    vectordetails:[
      {
        id: 0,
        img:'tools.svg',
        Title:'Our Services',
        text:'Utilize our Services created by our team of expects to assist you in your field of intrest, these are Applications created from the very data found here, these have been refined to develop Apps that suit you ',
        link:'/main/services'
      },
      {
        id: 1,
        img:'dash.svg',
        Title:'Dashbords',
        text:'What of you could Select a dataset and choose a data field that intrests you, and we\ll populate graphs and charts that suit your selected data fields and if you are still not satisfied with the default charts you have options. This is an opportunity for you to tell your own story, be your own god.',
        link:'/main/dashboard'
      },
      {
        id: 2,
        img:'story.svg',
        Title:'StorySet',
        text:'This details findings from exploratory to in-depth analysis (quantitative and qualitative) of a decade of data gathered and stored by the Africa RISING Dataverse portal. This report’s focus is centered on the cultivation of maize, soybean, cowpea and groundnut in the upper regions of Ghana. However, highlights are thrown on other crops of interest where the data supports our objective.', 
        link:'/main/storyset'
      },
      {
        id: 3,
        img:'dataset.svg',
        Title:'DataSets',
        text:' Inside AgData-hub you\'ll find all the data you need to workon your projects and research. So explore our datasets, these are collections of data of prefered all fields and backgrounds from stakeholders both public and private, this means you get to upload and share your datasets with the etire community, just sign up to upload',
        link:'/main/datasets'
      },
      // {
      //   id: 4,
      //   img:'story.svg',
      //   Title:'Cropping Calendar',
      //   text:'  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, temporibus. Sapiente rerum ipsa minima aut molestiae   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, temporibus. Sapiente rerum ipsa minima aut molestiae dolore fugiat molestias eos, autem dolorem, omnis ad magni maxime natus. Quis, blanditiis aliquid.dolore fugiat molestias eos, autem dolorem, omnis ad magni maxime natus. Quis, blanditiis aliquid.',
      //   link:'/main/Croppingcalendar'
      // },

      // {
      //   id: 5,
      //   img:'story.svg',
      //   Title:'Weather Widget',
      //   text:'  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, temporibus. Sapiente rerum ipsa minima aut molestiae   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, temporibus. Sapiente rerum ipsa minima aut molestiae dolore fugiat molestias eos, autem dolorem, omnis ad magni maxime natus. Quis, blanditiis aliquid.dolore fugiat molestias eos, autem dolorem, omnis ad magni maxime natus. Quis, blanditiis aliquid.',
      //   link:'/main/Croppingcalendar'
      // },
    ],
    displayParam:{
        id: 2,
        img:'story.svg',
        Title:'Story Sets',
        text:'This details findings from exploratory to in-depth analysis (quantitative and qualitative) of a decade of data gathered and stored by the Africa RISING Dataverse portal. This report’s focus is centered on the cultivation of maize, soybean, cowpea and groundnut in the upper regions of Ghana. However, highlights are thrown on other crops of interest where the data supports our objective.', 
        link:'/main/storyset'
      },

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

.dropdown-menu{
  min-width: 20rem !important;
  inset: 5px auto auto -100px !important
}
.dropdown-menu .nav-link:hover{
  background-color: rgb(99, 99, 99);
  opacity: .8;
}
.nav-link{
  color: #f56a6a !important;
  transition:  .5s;
}
.nav-link:hover{
  background-color: #f56a6a !important;
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
	background-color:#f56a6a;
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
	background-color:#f56a6a;
	color:#FFF;
	border-radius:50px;
  transition: transform .2s;
	text-align:center;
	box-shadow: 0px 0px 5px #999;
}
.my-float{
    position: absolute;
      top: 4.5px;
}
.float:hover{
  transform: scale(1.1); 
	background-color: #f56a6ad8;

}
.float2:hover{
  transform: scale(1.1); 
	background-color: #f56a6ad8;

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
  background-color: #f56a6a !important;
  text-shadow: none; /* Prevent inheritance from `body` */
}
.btn-secondary:hover{
  background-color: #f56a6ad8 !important;
}


/*
 * Base structure
 */



.cover-container {
  max-width: 100%;
}

.navbar-nav {
    display: flex;
    /* flex-direction: column; */
    padding-left: 60% !important;
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
    text-shadow: 0 0.05rem 0.1rem rgb(0 0 0 / 50%);
    /* box-shadow: inset 0 0 5rem rgb(0 0 0 / 50%); */
}
</style>