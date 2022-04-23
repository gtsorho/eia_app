<template>
<header>
    <div class="collapse bg-dark" id="navbarHeader">
    <div class="container">
        <div class="row">
        <div class="col-sm-8 col-md-7 py-4">
            <h4 class="text-white">About</h4>
            <p class="text-muted">
            Add some information about the album below, the author, or any
            other background context. Make it a few sentences long so folks
            can pick up some informative tidbits. Then, link them off to some
            social networking sites or contact information.
            </p>
        </div>
        <div class="col-sm-4 offset-md-1 py-4">
            <h4 class="text-white">Menu</h4>
            <hr style="color:white">
            <ul class="list-unstyled">
            <li><router-link to="/main/Croppingcalendar" class="text-white">Cropping Calendar</router-link></li>
            <li><router-link to="/main/dashboard" class="text-white">Dashboards</router-link></li>
            <li><router-link to="/main/storyset" class="text-white">StorySet</router-link></li>
            <li><a href="#" class="text-white">Contacts</a></li>
            </ul>
        </div>
        </div>
    </div>
    </div>
    <div class="navbar navbar-dark bg-dark shadow-sm">
    <div class="container">
        <a href="#" class="navbar-brand d-flex align-items-center">
        <!-- <img src="../assets/agronomy.png" height="30px"> -->
        <router-link to="/">
            <h5 class="float-md-start mb-0 fw-bolder"><span class="me-1 text-success">I.</span><span class="me-1 text-light">I.</span> <span class="me-1 text-warning">T.</span><span class="me-1 text-primary">A</span></h5>
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