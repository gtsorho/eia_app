<template>
  <div id="mySidenav" class="sidenav" >
  <span style="font-size:30px;cursor:pointer"  class="text-secondary humburger text-center mx-2"  v-show="!sidebarVal" @click="sidebarVal = !sidebarVal; $emit('humburgerClick') ">&#9776;</span>
    <span class="text-start" v-show="sidebarVal">
      <!-- <img class="mx-5 w-50" src="../../assets/logo/logo.png"> -->
      <h1 class="text-center">ag</h1>
      <hr class="bg-light mx-2">  
      <a href="#" @click="$emit('currentTab', 'productReport')"><i class="bi bi-box-seam me-1" ></i>Dashboard</a>
      <a href="#" @click="$emit('currentTab', 'stockReport')"><i class="bi bi-box-seam me-1" ></i>Uploads</a>
    </span>
</div>
</template>
<script>
export default {
    name:'sidebar',
    props:[
      'sidebarVal'
    ],
    emits: [
      'humburgerClick',
      'currentTab'
      ],
    data() {
      return {  
        // sidebarbool:this.sidebarVal
      }
    },
    watch:{
      sidebarVal(newVal){
         if(newVal){
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";            
        }else{
            document.getElementById("mySidenav").style.width = "50px";
            document.getElementById("main").style.marginLeft= "50px";
        }
      }
    },
    methods: {
       
    },
}
</script>
<style scoped>
 /* card style */
    /* margin: 10px; */
    /* width: 80.5% !important;*********************** */
    /* height: 90%; */
    /* position: fixed !important;***************** */
    /* z-index: 1;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 10px; */



.humburger:hover{
  color: #d5d5d5 !important;
}
.accordion-button:focus {
    z-index: 3;
    border-color: rgba(7, 7, 7, 0) !important;
    outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0%) !important;
}
#flush-collapseOne a {
  padding-left: 20% !important;
  text-decoration: none;
  font-size: 13px !important;
  color: #818181;
  display: block;
  transition: 0.3s;

}
 #flush-collapseOne a:hover {
  color: #f1f1f1;
}

.sidenav {
  height: 100%;
  width: 250px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #1A2226;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 10px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 15px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>