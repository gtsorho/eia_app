<template>
    <footer class="d-flex flex-wrap justify-content-between align-items-center pb-2 my-5 border-top "  style="    background-image: linear-gradient(113deg, #0e140d, #4fab43);!important; height:70px" >
        <div class="col-md-4  d-flex mx-auto align-items-center">
            <!-- <a href="/" class="mb-3 me-2 mb-md-0 text-light text-decoration-none lh-1">
                <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"/></svg>
            </a> -->
            <span class="text-light"  style="font-size:12px">&copy; {{new Date(Date.now()).getFullYear()}} EiA-Hub</span>
        </div>

        <ul class="nav col-md-6  mx-auto  me-md-5  justify-content-end list-unstyled  d-flex">
            <li class="ms-3"><router-link to="/main/services" class="text-light">Advisories</router-link></li>
            <!-- <li class="ms-3"><router-link to="/main/dashboard" class="text-light">Dashboards</router-link></li> -->
            <li class="ms-3"><router-link to="/main/storyset" class="text-light">Assembled Knowledge</router-link></li>
        </ul>
    </footer>
</template>


<style scoped>
    footer{
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
    }
</style>