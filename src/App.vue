<template>
  <!-- <Navbar/> -->
    <!-- <div id="nav"> -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <!-- </div> -->
    <router-view/>
  <!-- <Footer/> -->
</template>

<script>

import Navbar from "../src/components/navbar.vue";
import Footer from "../src/components/footer.vue";

export default {
  components: {
    Navbar,
    Footer
  },
  
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');

    /* html, body{
        background-image: url('assets/pexels-pixabay-209831.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        overflow-x: hidden;
        height: 100%;
    } */

p, h1,h2,h3,h4,h5, small, strong, a, li,option, form ,div{
  font-family: 'Raleway', sans-serif;
}
body{
      background-color: #f5f5ff !important;
}
 #app.home{
   height: 100% !important;
 }
html, body {
   margin:0;
   padding:0;
   height:100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height:100%;
  position:relative;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
  -webkit-overflow-scrolling: touch;
}

/* ::-webkit-scrollbar- {
  width: 10px;
  -webkit-overflow-scrolling: touch;
} */

/* Track */
::-webkit-scrollbar-track {
  background: #212529;
}
::-webkit-scrollbar-track:hover {
  background: #cfcfcf !important;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(33 37 41);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #212529;
}
html {
    overflow-y: scroll; 
}
</style>
