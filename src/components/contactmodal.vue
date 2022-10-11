<template>
        <!-- Modal -->
            <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content " style="background-color:#061704 !important">
                    <div class="modal-header text-light">
                        <h5 class="modal-title text-light" id="exampleModalLabel">{{extension.updateId ? 'Update Extention' : 'Add Extension'}}</h5>
                        <button type="button" ref="closeModal" class="btn-close btn-close-sm  btn-outline-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                        
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="sotckName" class="form-label float-start ">Name</label>
                            <input type="text" class="form-control" v-model="extension.name" style=" font-size: 0.75rem !important;"  placeholder="John Doe">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label float-start">Email</label>
                            <input type="email" class="form-control" v-model="extension.email" style=" font-size: 0.75rem !important;"  placeholder="eg.doe@gmail.com">
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="phone" class="form-label float-start">Phone</label>
                                <input type="text" placeholder="059 xxx xxxx" class="form-control" v-model="extension.phone" style=" font-size: 0.75rem !important;">                            
                            </div>
                            <select class="form-select form-select-sm col" aria-label=".form-select-sm example" v-model="extension.addressId" >
                                <option value="default">please select an Address</option>
                                <option  v-for="(location, i) in locations" :key="i" :value="location.id">{{location.location}}</option>
                            </select>
                        </div>
                    </div>
                     <p class="text-success text-center" style="font-size:10px">{{successMsg}}</p>
                    <p class="text-danger text-center " style="font-size:10px">{{errorMsg}}</p>
                    <div class="modal-footer">
                        <button type="button" class="btn  btn-outline-danger btn-sm" data-bs-dismiss="modal">Close</button>
                         <button type="button" class="btn btn-outline-primary  btn-sm" @click="!extension.updateId ? submit() : update()">{{extension.updateId ? 'Update' : 'Add '}}</button>
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
            location: 'default',
            locations:[],
            successMsg:'',
            errorMsg:'',
            extension : {
                name: '',
                phone: '',
                email: '',
                addressId: 'default',
                updateId:null
            }
        }
    },
    created(){
        
       
    },
    watch:{
        updatedata(newVal){
        this.extension.updateId = newVal.id
        this.extension.name = newVal.name
        this.extension.phone = newVal.phone
        this.extension.email = newVal.email
        this.extension.addressId = newVal.address.id
        }
    },
    methods: {
        submit(){
            console.log(this.extension)
            // return
            var token = this.getCookie('token') 
            axios.post('/api/broadcast/contact', this.extension,
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
            console.log(this.extension)
            axios.post('/api/broadcast/contact/update/' + this.extension.updateId, 
                    this.extension
                ,
                {headers:{'Authorization': `Bearer ${token}`}}
            ).then(response =>{
                this.successMsg = this.extension.name + ' has been updated'
                this.$emit('modalSubmit')
                 setTimeout(() => {
                    this.$refs.closeModal.click();
                }, 1000);
            }).catch(error =>{
                console.log(error.response)
                this.errorMsg = error.response

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

        axios.get('/api/weather/locations', 
            { headers:{'Authorization': `Bearer ${token}`}})
        .then(response =>  {
            response.data.forEach(element => {
                this.locations.push({id:element.id, location:element.location})
            });
            console.log(this.locations);
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
    background-color: #061704;
    border: none;
    border-bottom: 2px solid #ab3900;
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
    border-bottom: 2px solid #ab3900 !important ;
    outline: 0;
    background-color: #061704;
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
   border-color: #ab3900;
    color: #ab3900;
    border-radius: 0px;
    font-weight: normal;
    font-size: 0.8rem !important;
    letter-spacing: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.btn-outline-primary:hover {
    background-color: #ab3900;
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