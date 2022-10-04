<template>
        <!-- Modal -->
            <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content " style="background-color:#1A2226 !important">
                    <div class="modal-header text-light">
                        <h5 class="modal-title text-light" id="exampleModalLabel">{{updateId ? 'Update Stock' : 'Add Stock'}}</h5>
                        <button type="button" ref="closeModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="sotckName" class="form-label float-start ">Name</label>
                            <input type="text" class="form-control" v-model="stockData.name" style=" font-size: 0.75rem !important;"  placeholder="John Doe">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label float-start">Email</label>
                            <input type="email" class="form-control" v-model="stockData.location" style=" font-size: 0.75rem !important;"  placeholder="eg.doe@gmail.com">
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="phone" class="form-label float-start">Phone</label>
                                <input type="text" placeholder="059 xxx xxxx" class="form-control" v-model="stockData.expiryDate" style=" font-size: 0.75rem !important;">                            
                            </div>
                            <div class="col">
                                 <label for="quantity" class="form-label float-start">Location</label>
                                <input type="text" v-model="stockData.quantity" class="form-control" style=" font-size: 0.75rem !important;"  placeholder="Assin">
                            </div>
                        </div>
                        
                    </div>
                     <p class="text-success text-center" style="font-size:10px">{{successMsg}}</p>
                    <p class="text-danger text-center " style="font-size:10px">{{errorMsg}}</p>
                    <div class="modal-footer">
                        <button type="button" class="btn  btn-outline-danger btn-sm" data-bs-dismiss="modal">Close</button>
                         <button type="button" class="btn btn-outline-primary  btn-sm" @click="!updateId ? submit() : update()">{{updateId ? 'Update' : 'Add '}}</button>
                    </div>
                </div>
            </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Modal',
    props:[
        'updatedata'
    ],
    data() {
        return {
            products:[],
            successMsg:'',
            errorMsg:'',
            stockData : {
                name: '',
                productName: 'defualt',
                expiryDate: '',
                quantity: '',
                location: '',
                updateId:null
            }
        }
    },
    created(){
        // console.log(this.updatedata)
        
        // this.updateId = this.updatedata.stockId
        // this.stockData.name = this.updatedata.name
        // this.stockData.productName = this.updatedata.productName
        // this.stockData.expiryDate = this.updatedata.expiryDate
        // this.stockData.quantity = this.updatedata.quantity
        // this.stockData.location = this.updatedata.location
    },
    watch:{
        updatedata(newVal){
            if(newVal['productId'] == null){
                this.updateId = null
                this.name = ''
                this.description = ''
            }
        }
    },
    methods: {
        submit(){
            var token = this.getCookie('token')
            axios.post('/api/stock', this.stockData,
                {headers:{'Authorization': `Bearer ${token}`}}
            ).then(response =>{
                this.successMsg = response.data.name + ' has been added'
                this.$emit('modalSubmit')
                 setTimeout(() => {
                    this.$refs.closeModal.click();
                }, 1000);
            }).catch(error =>{
                this.errorMsg = error.response.data.message
            })
        },
        update(){
            var token = this.getCookie('token')

            axios.post('/api/stock/update/' + this.updateId, 
                    this.stockData
                ,
                {headers:{'Authorization': `Bearer ${token}`}}
            ).then(response =>{
                this.successMsg = this.stockData.name + ' has been updated'
                this.$emit('modalSubmit')
                 setTimeout(() => {
                    this.$refs.closeModal.click();
                }, 1000);
            }).catch(error =>{
                console.log(error.response.data.message)
                this.errorMsg = error.response.data.message

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
    mounted(){
        var token = this.getCookie('token')

        axios.get('/api/products', 
            { headers:{'Authorization': `Bearer ${token}`}})
        .then(response =>  {
            response.data.forEach(element => {
                this.products.push(element.name)
            });
            console.log(this.products);
        }).catch(error => {
            console.log(error);
        })
    }
}
</script>
<style scoped>
    
::-webkit-calendar-picker-indicator {
    filter: invert(1);
}

input, select {
    background-color: #1A2226;
    border: none;
    border-bottom: 2px solid #0DB8DE;
    border-top: 0px;
    border-radius: 0px;
    font-weight:100;
    outline: 0;
    margin-bottom: 20px;
    padding-left: 0px;
    color: #ECF0F5;
}
.form-control-sm{
    font-size: 0.75rem !important;
}
.form-control:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-bottom: 2px solid #0DB8DE !important ;
    outline: 0;
    background-color: #1A2226;
    color: #ECF0F5;
}

input:focus {
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

.btn-outline-primary {
   border-radius: 5px !important;
   border-color: #0DB8DE;
    color: #0DB8DE;
    border-radius: 0px;
    font-weight: normal;
    font-size: 0.8rem !important;
    letter-spacing: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.btn-outline-primary:hover {
    background-color: #0DB8DE;
    right: 0px;
}

.btn-outline-danger {
   border-radius: 5px !important;
   border-color: #de110d;
    color: #de290d;
    border-radius: 0px;
    font-weight: normal;
    font-size: 0.8rem !important;
    letter-spacing: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.btn-outline-danger:hover {
    background-color: #de0d0d;
    right: 0px;
}

</style>