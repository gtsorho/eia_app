<template>
    <!-- <footer class="d-flex flex-wrap justify-content-between align-items-center pb-2 my-5 border-top "  style="    background-image: linear-gradient(113deg, #0e140d, #4fab43);!important; height:70px" >
        <div class="col-md-4  d-flex mx-auto align-items-center">
            <span class="text-light"  style="font-size:12px">&copy; {{new Date(Date.now()).getFullYear()}} EiA-Hub</span>
        </div>

        <ul class="nav col-md-6  mx-auto  me-md-5  justify-content-end list-unstyled  d-flex">
            <li class="ms-3"><router-link to="/main/services" class="text-light">Advisories</router-link></li>
            <li class="ms-3"><router-link to="/main/storyset" class="text-light">Assembled Knowledge</router-link></li>
        </ul>
    </footer> -->
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
</template>


<style scoped>
.footer{
  background-image: url('../assets/footer_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
    /* footer{
        margin-bottom: 0% !important;
        margin-top:5.3rem !important;
        height: 50px;
        position:absolute;
        bottom: 0;
        width:100%;
    }
    li .text-light{
        text-decoration: none;
    }
    li{
        transition:  .5s;
    }
    li:hover{
        background-color: rgb(0 104 56);
        border-radius: 50px;
        padding-inline: 15px;
    } */
</style>