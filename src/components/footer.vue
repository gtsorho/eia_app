<template>
    <footer class="d-flex flex-wrap justify-content-between align-items-center pb-2 my-5 border-top "  style="background-color:#c2213d !important; height:70px" >
        <div class="col-md-4  d-flex mx-auto align-items-center">
            <!-- <a href="/" class="mb-3 me-2 mb-md-0 text-light text-decoration-none lh-1">
                <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"/></svg>
            </a> -->
            <span class="text-light fw-bolder">&copy; 2022 Ag-Datahub</span>
        </div>

        <ul class="nav col-md-6  mx-auto  me-md-5  justify-content-end list-unstyled  d-flex">
            <li class="ms-3"><router-link to="/main/tools" class="text-light">Tools</router-link></li>
            <li class="ms-3"><router-link to="/main/dashboard" class="text-light">Dashboards</router-link></li>
            <li class="ms-3"><router-link to="/main/storyset" class="text-light">StorySet</router-link></li>
            <li class="ms-3"><router-link to="/main/datasets" class="text-light">Dataset</router-link></li>
        </ul>
    </footer>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    footer{
        margin-bottom: 0% !important;
        margin-top:4.3rem !important;
        height: 50px;
        position:absolute;
        bottom:0;
        width:100%;
    }
    li .text-light{
        text-decoration: none;
    }
    li{
        transition:  .5s;
    }
    li:hover{
        background-color: rgb(253, 158, 174);
        border-radius: 50px;
        padding-inline: 15px;
    }
</style>