<template>
    <div class="main-div d-flex text-center text-white bg-dark">
         <div class="cover-container d-flex w-100 p-3 mx-auto flex-column">
  <header class="mb-auto mx-5">
    <div>
      <h2 class="float-md-start mb-0" style="color:#e76e83">AG-DATAHUB</h2>
      <nav class="nav nav-masthead justify-content-center float-md-end">
        <a class="nav-link" :class="{active:active === 'cropping'}" href="#" @click="changeTopic(0), active = 'cropping'">Tools</a>
        <a class="nav-link" :class="{active:active === 'Dashbords'}" href="#" @click="changeTopic(1),  active = 'Dashbords'">Dashbords</a>
        <a class="nav-link" :class="{active:active === 'Storyset'}" href="#" @click="changeTopic(2), active = 'Storyset'">Storyset</a>
        <a class="nav-link" :class="{active:active === 'Dataset'}" href="#" @click="changeTopic(3), active = 'Dataset'">Dataset</a>
        <!-- <a class="nav-link" :class="{active:active === 'Storyset'}" href="#" @click="changeTopic(2), active = 'Storyset'">Storyset</a> -->

      </nav>
    </div>
  </header>

  <main class="px-3">
    <div class="row  row-cols-1  row-cols-md-2">
      <div class="col my-auto">
        <h1>{{displayParam.Title}}</h1>
        <hr class="mx-auto" style="width:90%">
        <p class="lead fs-6 px-5">{{displayParam.text}}</p>
        <p class="lead"  v-show="!displayParam.id == 0">
          <router-link :to="displayParam.link" class="btn btn-md btn-secondary fw-bold border-white bg-white">View More</router-link>
        </p>

            <div class="dropdown" v-show="displayParam.id == 0" >
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                See Tools
              </button>
              <ul class="dropdown-menu shadow-sm dropdown-menu-dark" style="" aria-labelledby="dropdownMenuButton2">
                <li><a class="nav-link"  href="#" @click="changeTopic(4)">Cropping Calendar</a></li>
                <li><a class="nav-link"  href="#" @click="changeTopic(5)">Weather Application</a></li>
                <!-- <li><a class="dropdown-item" href="#">Something else here</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Separated link</a></li> -->
              </ul>
          </div>
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
  <footer class="mt-auto text-white-50">
    <p>@Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam repellendus </p>
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
        Title:'Our Tools',
        text:'Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.',
        link:''
      },
      {
        id: 1,
        img:'dash.svg',
        Title:'Dashbords',
        text:'Cover is a one-page template for building simple and beautiful home pages. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet at Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet at nam doloribus ducimus repellendus ipsa adipisci alias dignissimos! Laudantium illum excepturi sunt odit nobis dolores est vero rem. Dicta, debitis. nam doloribus ducimus repellendus ipsa adipisci alias dignissimos! Laudantium illum excepturi sunt odit nobis dolores est vero rem. Dicta, debitis. Download, edit the text, and add your own fullscreen background photo to make it your own.',
        link:'/main/dashboard'
      },
      {
        id: 2,
        img:'story.svg',
        Title:'StorySet',
        text:'  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, temporibus. Sapiente rerum ipsa minima aut molestiae   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, temporibus. Sapiente rerum ipsa minima aut molestiae dolore fugiat molestias eos, autem dolorem, omnis ad magni maxime natus. Quis, blanditiis aliquid.dolore fugiat molestias eos, autem dolorem, omnis ad magni maxime natus. Quis, blanditiis aliquid.',
        link:'/main/storyset'
      },
      {
        id: 3,
        img:'dataset.svg',
        Title:'DataSets',
        text:'  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, temporibus. Sapiente rerum ipsa minima aut molestiae   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, temporibus. Sapiente rerum ipsa minima aut molestiae dolore fugiat molestias eos, autem dolorem, omnis ad magni maxime natus. Quis, blanditiis aliquid.dolore fugiat molestias eos, autem dolorem, omnis ad magni maxime natus. Quis, blanditiis aliquid.',
        link:'/main/datasets'
      },
      {
        id: 4,
        img:'story.svg',
        Title:'Cropping Calendar',
        text:'  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, temporibus. Sapiente rerum ipsa minima aut molestiae   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, temporibus. Sapiente rerum ipsa minima aut molestiae dolore fugiat molestias eos, autem dolorem, omnis ad magni maxime natus. Quis, blanditiis aliquid.dolore fugiat molestias eos, autem dolorem, omnis ad magni maxime natus. Quis, blanditiis aliquid.',
        link:'/main/Croppingcalendar'
      },
      {
        id: 5,
        img:'story.svg',
        Title:'Weather Widget',
        text:'  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, temporibus. Sapiente rerum ipsa minima aut molestiae   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, temporibus. Sapiente rerum ipsa minima aut molestiae dolore fugiat molestias eos, autem dolorem, omnis ad magni maxime natus. Quis, blanditiis aliquid.dolore fugiat molestias eos, autem dolorem, omnis ad magni maxime natus. Quis, blanditiis aliquid.',
        link:'/main/Croppingcalendar'
      },
    ],
    displayParam:{
        id: 2,
        img:'story.svg',
        Title:'Story Sets',
        text:'  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, temporibus. Sapiente rerum ipsa minima aut molestiae   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, temporibus. Sapiente rerum ipsa minima aut molestiae dolore fugiat molestias eos, autem dolorem, omnis ad magni maxime natus. Quis, blanditiis aliquid.dolore fugiat molestias eos, autem dolorem, omnis ad magni maxime natus. Quis, blanditiis aliquid.',
        link:'/main/storyset'
      },

  }
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
  color: rgb(230, 230, 230) !important;
}

.float{
	position:fixed;
	width:41px;
	height:40px;
	bottom:48%;
	left:15px;
	background-color:rgb(60, 62, 62);
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
	background-color:rgb(60, 62, 62);
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
	background-color:rgb(75, 76, 76);

}
.float2:hover{
  transform: scale(1.1); 
	background-color:rgb(75, 76, 76);

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
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333;
  text-shadow: none; /* Prevent inheritance from `body` */
}


/*
 * Base structure
 */



.cover-container {
  max-width: 100%;
}


/*
 * Header
 */

.nav-masthead .nav-link {
  padding: .25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, .5);
  background-color: transparent;
  border-bottom: .25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}
.main-div{
     height: 50em;
    text-shadow: 0 0.05rem 0.1rem rgb(0 0 0 / 50%);
    box-shadow: inset 0 0 5rem rgb(0 0 0 / 50%);
}
</style>