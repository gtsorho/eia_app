<template>
  <Navbar/>
    <router-view data-bs-toggle="collapse" data-bs-target="#navbarHeader.show"></router-view>
  <Footer/>
</template>

<script>
import Navbar from "../components/navbar.vue";
import Footer from "../components/footer.vue";

export default {
  components: {
    Navbar,
    Footer
  },
  methods:{

  }
}
</script>
