<template>
<header>
    <div class="collapse text-dark"  id="navbarHeader" style="background-color:#ffd6dd54 !important">
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
                <hr style="color:#ff3f60 !important">
                <ul class="list-unstyled">
                <li><router-link to="/main/tools" class="text-dark">Tools</router-link></li>
                <li><router-link to="/main/dashboard" class="text-dark">Dashboards</router-link></li>
                <li><router-link to="/main/storyset" class="text-dark">StorySet</router-link></li>
                <li><router-link to="/main/datasets" class="text-dark">Dataset</router-link></li>
                </ul>
            </div>
            </div>
        </div>
    </div>
    <div class="navbar navbar-dark shadow-sm" style="background-color:#c2213d !important">
        <div class="container">
            <a href="#" class="navbar-brand d-flex align-items-center">
            <!-- <img src="../assets/agronomy.png" height="30px"> -->
            <router-link to="/">
                <h5 class="float-md-start text-light mb-0 fw-bolder">AG-DATAHUB | <h6 class=" fw-bold">{{$route.name}}</h6></h5>
            </router-link>
            </a>
            <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarHeader"
            aria-controls="navbarHeader"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span class="navbar-toggler-icon"></span>
            </button>
        </div> 
    </div>
</header>
</template>
<script>
export default {
    name: "Navbar",
};
</script>
<style scoped>
.nav-link:hover {
opacity: 0.8;
}
.col-sm-8, .col-sm-4{
    text-align: start;
}
.navbar-toggler{
    padding: .1rem .4rem !important;
    font-size: 1rem !important;
}
li a{
    text-decoration: none;
}

li a:hover{
    opacity: .8;;
}
</style>