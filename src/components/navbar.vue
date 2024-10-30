<template>
    <header>
        <div class="collapse text-dark" id="navbarHeader" style="background-color:rgb(185, 226, 180)!important; font-size:14px;">
            <div class="container">
                <div class="row">
                    <div class="col-sm-8 col-md-7 py-4">
                        <h4 class="text-dark">About</h4>
                        <p class="text-muted">
                            Add some information about the album below, the author, or any
                            other background context. Make it a few sentences long so folks
                            can pick up some informative tidbits. Then, link them off to some
                            social networking sites or contact information.
                        </p>
                    </div>
                    <div class="col-sm-4 offset-md-1 py-4">
                        <h4 class="text-dark">Menu</h4>
                        <hr style="color:#4fab43 !important">
                        <ul class="list-unstyled">
                            <li class="w-100 px-1 rounded-pill">
                                <router-link to="/main/CroppingCalendar" class="text-dark "  @click="collapseCloseOnclick()">Cropping Calendar
                                </router-link>
                            </li>
                            <li class="w-100 px-1 rounded-pill">
                                <router-link to="/main/tempRain" class="text-dark "  @click="collapseCloseOnclick()">Temp & Rain
                                </router-link>
                            </li>
                            <li class="w-100 px-1 rounded-pill">
                                <router-link to="/weather" class="text-dark "  @click="collapseCloseOnclick()">Weather
                                </router-link>
                            </li>
                            <li class="w-100 px-1 rounded-pill">
                                <router-link to="/main/dashboard" class="text-dark "  @click="collapseCloseOnclick()">Dashboard
                                </router-link>
                            </li>
                            <li class="w-100 px-1 rounded-pill">
                                <router-link to="/main/storyset" class="text-dark" @click="collapseCloseOnclick()">
                                    Assembled Knowledge</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="navbar navbar-dark shadow-sm" style="    background-image: linear-gradient(113deg, #0e140d, #4fab43)!important">
            <div class="container">
                <a href="#" class="navbar-brand d-flex align-items-center">
                    <router-link to="/" class=" text-decoration-none">
                            <span class="float-start text-start">
                                <img  style="width:15%;" class="ms-0" src="../assets/logo.png" > 
                                <hr style="width:60px; background-color:white; height:2px" class="my-0">
                                <h6 class=" fw-bold text-light mb-0 ms-2"  style="font-size:12px">
                                    {{ $route.name }}
                                </h6>
                            </span>
                    </router-link>
                </a>
                <button class="navbar-toggler" style="border-color:#ffffffa6!important" type="button"
                    ref="toggleCollapse" data-bs-toggle="collapse" data-bs-target="#navbarHeader"
                    aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                    <!-- <span class="navbar-toggler-icon"></span> -->
                    <i class="bi bi-list text-light"></i>
                </button>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    name: "Navbar",
    methods: {
        collapseCloseOnclick() {
            this.$refs.toggleCollapse.click()
        }
    }
};
</script>
<style scoped>
.nav-link:hover {
    opacity: 0.8;
}

li a {
    padding-inline-end: 0%;
}

li:hover {
    background-color: #4fab43 ;

}

.col-sm-8,
.col-sm-4 {
    text-align: start;
}

.navbar-toggler {
    padding: .1rem .4rem !important;
    font-size: 1rem !important;
}

li a {
    text-decoration: none;
}

li a:hover {
    opacity: .8;
    ;
}
</style>