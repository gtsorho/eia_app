<template>
        <div class="card bg-light shadow-lg p-3 mb-5">
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-3 col-lg-3">
                        <!-- <div class="input-group  input-group-sm mb-3" > -->
                            <div class="dropdown">
                            <input type="text" class="form-control-sm form-control border-end-0 border-start-0 fs-6 border-3 border-dark rounded-pill dropdown-toggle"
                                id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"
                                placeholder="&#xF52A;"  aria-describedby="basic-addon2" 
                                style=" font-family:'bootstrap-icons'"
                                v-model="searchText"
                                @keydown="searchProducts()"
                                >
                                <ul class="dropdown-menu dropdown-menu-dark " style="width:100%; overflow-y:auto; max-height:5in" aria-labelledby="dropdownMenuButton2">
                                    <li><h6 class="dropdown-header" style="font-size:13px">Search Results</h6></li>
                                    <hr>
                                    <li v-for="(item,i) in searchRes" :key="i" @click="getProduct(item.productName)">
                                        <a class="dropdown-item" style="font-size:13px" href="#">&#9870; {{item.productName }}</a>
                                        <hr>                                    
                                    </li>
                                </ul>
                            </div>
                    </div>
                    <div class="col-12 col-md-9 col-lg-9">
                        <div class="float-end">
                            <button type="button"  class="btn btn-dark rounded-pill mx-2 shadow-md btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">+ contact</button>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <Addcontent  @modalSubmit="reloadList()"/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <h5 class="card-title fw-bolder">Contact List</h5>

                <div class="table-responsive">
                <table class="table table-striped table-sm table-hover table-sm" style="    min-width: 7.5in" id="accordionExample">
                    <thead>
                        <tr>
                            <th scope="col" >ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Location</th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr v-for="(product , i) in products" :key="i">
                                <th scope="row">{{product.productId}}</th>
                                <td>{{product.productName}}</td>
                                <td>{{product.totalDispatch}}</td>
                                <td>{{product.totalStock}}</td>
                                <td>
                                    <p class=" border border-danger border-3 rounded-pill text-center" style=" width:0.8in; font-size:12px; background-color: #dc354540;"  v-if="product.expiryBal <= 30">{{product.expiryBal}} days</p>
                                    <p class=" border border-warning border-3 rounded-pill text-center" style=" width:0.8in; backgroundColor:#ffce3961 !important; font-size:12px "  v-else-if="product.expiryBal <= 60">{{product.expiryBal}} days</p>
                                    <p class=" border border-success border-3 rounded-pill text-center" style=" width:0.8in; font-size:12px; background-color: #49fe245e;"  v-else>{{product.expiryBal}} days</p>
                                </td>
                            </tr>
                        </tbody>
                </table>
                </div>
            </div>
        </div>
</template>

    <script>
    import axios from 'axios'    
        import Addcontent from '../components/stockmodal.vue'


    export default {
        components: { 
            Addcontent
        },
        data() {
            return {
                searchText:'',
                products:[],
                searchRes:[]

            }
        },
        // beforeMount(){
        //     var token = this.getCookie('token')

        //     axios.get('/api/searchProductsReport/', 
        //         { headers:{'Authorization': `Bearer ${token}`}})
        //     .then(response =>  {
        //         console.log(response.data)
        //         this.products = response.data
        //     }).catch(error => {
        //         console.log(error);
        //     })
        // },
        methods: {
            reloadList(){
                var token = this.getCookie('token')

                axios.get('/api/products', 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    this.products = response.data
                }).catch(error => {
                    console.log(error);
                })
            },
            searchProducts(){
                var token = this.getCookie('token')

                axios.get('/api/searchProductsReport/'+this.searchText, 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    this.searchRes = response.data
                    console.log(this.searchRes)
                }).catch(error => {
                    console.log(error);
                })
            },
            getProduct(productName){
                var token = this.getCookie('token')

                axios.get('/api/searchProductsReport/'+ productName, 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    console.log(response.data)
                    this.products = response.data 
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
    .card{
        margin-top:4%;
        min-height: 90% !important;
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