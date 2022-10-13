<template>
        <div class="card bg-light shadow-lg p-3 mb-5">
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-3 col-lg-3">
                        <!-- <div class="input-group  input-group-sm mb-3" > -->
                            <div class="dropdown">
                            <input type="text" class="form-control-sm form-control border-end-0 border-start-0 fs-6 border-3   dropdown-toggle"
                                id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"
                                placeholder="&#xF52A;"  aria-describedby="basic-addon2" 
                                style=" font-family:'bootstrap-icons'"
                                v-model="searchText"
                                @keydown="searchProducts()"
                                >
                                <ul class="dropdown-menu dropdown-menu-dark"  style="width:100%; overflow-y:auto; max-height:5in" aria-labelledby="dropdownMenuButton2">
                                    <li><h6 class="dropdown-header" style="font-size:13px">Search Results</h6></li>
                                    <hr>
                                    <li v-for="(item,i) in searchRes" :key="i" @click="getProduct(item.name)">
                                        <a class="dropdown-item" style="font-size:13px" href="#">&#9870; {{item.name }}</a>
                                        <p>
                                            <small class="dropdown-item text-muted d-inline" style="font-size:11px">{{item.location}}  </small>
                                            <small class="dropdown-item text-muted d-inline" style="font-size:11px">{{item.updated_at.split('T')[0] }}</small>
                                        </p>
                                        <hr>                                    
                                    </li>
                                </ul>
                            </div>
                            
                            <!-- <i class="bi bi-search input-group-text bg-light border-3 border-start-0 border-dark" style="border-start-end-radius: 20px !important;border-end-end-radius: 20px;"></i> -->
                        <!-- </div> -->
                    </div>
                </div>
                <hr>
                <h5 class="card-title fw-bolder">Uploads</h5>
                <div class="row text-start row-cols-md-3 row-cols-sm-2 row-cols-lg-4" style="font-size:13px !important;">
                        <div class="col">
                            <div class="card mb-3" >
                                <div class="row g-0">
                                    <div class="col-lg-4 col-md-12">
                                        <img src="../assets/icons/music.png" class="img-fluid rounded-start" style="width:100%" alt="">
                                    </div>
                                    <div class="col-lg-8 col-md-12">
                                        <div class="card-body p-1">
                                            <p class="card-text mb-1">This is a wider card with supporting text below as a natural.</p>
                                            <p class="card-text mb-1"><small class="text-muted">Last updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card mb-3" >
                                <div class="row g-0">
                                    <div class="col-lg-4 col-md-12">
                                    <img src="../assets/icons/music.png" class="img-fluid rounded-start" style="width:100%" alt="">
                                    </div>
                                    <div class="col-lg-8 col-md-12">
                                    <div class="card-body p-1">
                                        <p class="card-text mb-1">This is a wider card with supporting text below as a natural.</p>
                                        <p class="card-text mb-1"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card mb-3" >
                                <div class="row g-0">
                                    <div class="col-lg-4 col-md-12">
                                    <img src="../assets/icons/video.png" class="img-fluid rounded-start" style="width:100%" alt="">
                                    </div>
                                    <div class="col-lg-8 col-md-12">
                                    <div class="card-body p-1">
                                        <p class="card-text mb-1">This is a wider card with supporting text below as a natural.</p>
                                        <p class="card-text mb-1"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card mb-3" >
                                <div class="row g-0">
                                    <div class="col-lg-4 col-md-12">
                                    <img src="../assets/icons/video.png" class="img-fluid rounded-start" style="width:100%" alt="">
                                    </div>
                                    <div class="col-lg-8 col-md-12">
                                    <div class="card-body p-1">
                                        <p class="card-text mb-1">This is a wider card with supporting text below as a natural.</p>
                                        <p class="card-text mb-1"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
</template>

    <script>
    import axios from 'axios'

    export default {
        components: {
        },
        data() {
            return {
                searchText:'',
                currentModal: 'Stock',
                stocks:[],
                searchRes:[]

            }
        },
        beforeMount(){
            var token = this.getCookie('token')

            axios.get('/api/searchStockReport', 
                { headers:{'Authorization': `Bearer ${token}`}})
            .then(response =>  {
                this.stocks = response.data
                console.log(this.stocks.length)

            }).catch(error => {
                console.log(error);
            })
        },
        methods: {
             callback (data) {
                console.debug(data)
            },
            // reloadList(){
            //     var token = this.getCookie('token')

            //     axios.get('/api/products', 
            //         { headers:{'Authorization': `Bearer ${token}`}})
            //     .then(response =>  {
            //         this.stocks = response.data
            //     }).catch(error => {
            //         console.log(error);
            //     })
            // },
            searchProducts(){
                var token = this.getCookie('token')

                axios.get('/api/searchStockReport/'+this.searchText, 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    this.searchRes = response.data
                    console.log(this.searchRes)
                }).catch(error => {
                    console.log(error);
                })
            },
            getProduct(name){
                var token = this.getCookie('token')

                axios.get('/api/searchStockReport/'+ name, 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    console.log(response.data)
                    this.stocks = response.data
                }).catch(error => {
                    console.log(error);
                })
            },
            getCookie(cname) {
                let name = cname + "=";
                let ca = document.cookie.split(';');
                for(let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                    }
                }
                return "";
            },
        },
    }
</script>
<style scoped>

    .form-control-sm, .form-select-sm {
        background-color: #1a222600;
        border: none;
        border-bottom: 2px solid #01600a;
        border-top: 0px;
        border-radius: 0px;
        font-weight:100;
        outline: 0;
        margin-bottom: 20px;
        padding-left: 10px;
        color: #1a1a1a;
    }
    .form-control-sm, .form-select-sm{
        font-size: 0.75rem !important;
    }
    .form-control:focus, .form-select-sm:focus {
        border-color: inherit;
        -webkit-box-shadow: none;
        box-shadow: none;
        border-bottom: 2px solid #01600a !important ;
        outline: 0;
        background-color: #31383b00;
        color: #1e1e1e;
    }

    input:focus, select:focus {
        outline: none;
        box-shadow: 0 0 0;
    }

    label {
        margin-bottom: 0px;
    }

    .form-label {
        font-size: 10px;
        color: #6C6C6C;
        font-weight:100;
        letter-spacing: 1px;
    }

    .card{
        margin-top:4%;
        /* min-height: 90% !important; */
        min-width: 80% !important;
        /* overflow-x: scroll; */
        transition: 0.5s;
        border:2px solid #82828228 !important;
        background-color: #ffffff !important;
    }

    .stockList:hover>* {
        --bs-table-accent-bg: rgb(0 0 0 / 0%) !important;
    }

    .table-sm>:not(caption)>*>* {
        padding: 0.6rem .25rem !important;
    }
    /* .dropdown-item:active {
    color: #fff;
    background-color: #0d6efd00;
    } */
</style>