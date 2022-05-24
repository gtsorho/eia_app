<template>
  <Navbar/>
    <router-view ></router-view>
  <Footer/>
</template>

<script>
import Navbar from "../components/navbar.vue";
import Footer from "../components/footer.vue";

export default{
  components: {
    Navbar,
    Footer
  },
  methods:{

  },
  beforeCreate(){
  if (document.getElementById('app').classList.contains("home")) {
    console.log("home")
    document.getElementById('app').classList.remove("home");
  }

},
}
</script>
