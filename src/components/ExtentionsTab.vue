<template>
        <div class="card bg-light shadow-lg p-3 mb-5">
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-3 col-lg-3">
                        <!-- <div class="input-group  input-group-sm mb-3" > -->
                            <div class="dropdown">
                            <input type="text" class="form-control-sm form-control fs-6 border-2  dropdown-toggle"
                                id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"
                                placeholder="&#xF52A;"  aria-describedby="basic-addon2" 
                                style=" font-family:'bootstrap-icons'"
                                v-model="searchText"
                                @keyup="searchcontacts()"
                                >
                                <ul class="dropdown-menu " style="width:100%; overflow-y:auto; max-height:5in; background-color:#061704" aria-labelledby="dropdownMenuButton2">
                                    <li><h6 class="dropdown-header text-light" style="font-size:13px">Search Results</h6></li>
                                    <hr>
                                    <li v-for="(item,i) in searchRes" :key="i" @click="getContact(item.id)">
                                        <a class="dropdown-item text-light" style="font-size:13px" href="#">&#9870; {{item.name}}</a>
                                        <hr>                                    
                                    </li>
                                </ul>
                            </div>
                    </div>
                    <div class="col-12 col-md-9 col-lg-9">
                        <div class="float-end">
                            <Transition>
                                <p style="font-size:11px" v-if="resMsg" class="text-warning text-capitalize d-inline fw-bold px-3">{{resMsg}}</p>
                            </Transition>

                            <div class="dropdown d-inline" >
                                <a href="#" class="dropdown-toggle text-decoration-none btn btn-sm btn-secondary rounded-pill"  data-bs-toggle="dropdown" aria-expanded="false">+<i class="bi bi-people"></i></a>
                                <div class="dropdown-menu px-4" style="width:3in" aria-labelledby="dropdownMenuButton1">
                                    <div class="mb-3">
                                        <label for="Label" class="form-label" style="font-size:15px !important">Label</label>
                                        <input type="text" class="form-control form-control-sm" required v-model="extGroup.label" id="label" placeholder="eg.Livestock Farmers">
                                    </div>
                                    <div class="mb-3">
                                        <label for="discription" class="form-label" style="font-size:15px !important">Description</label>
                                        <input type="text" class="form-control form-control-sm" id="description" required v-model="extGroup.description" placeholder="lorem ipsum init">
                                    </div>
                                    <button type="submit" class="btn btn-sm float-end rounded-pill text-light" style="font-size:15px !important; background-image: linear-gradient(198deg, #000000, #c2213d) !important;" @click="createGroup()">create group</button>
                                </div>
                            </div>
                            <i class="btn btn-sm btn-danger rounded-pill bi bi-trash3 mx-2" :class="delete_display" @click="deletedata"></i>
                            <div class="dropdown d-inline">
                                <i class="btn btn-sm rounded-pill btn-warning bi bi-share-fill mx-2dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false" :class="delete_display" @click="getUsers()" ></i>
                                <div class="dropdown-menu px-4 py-0" style="width:3.5in" aria-labelledby="dropdownMenuButton1">  
                                    <div class=" input-group"  style="font-size:13px !important">
                                        <select class="form-select form-select-sm "  aria-label=".form-select-sm example" v-model="officerId" >
                                            <option value="default">please select an Officer</option>
                                            <option  v-for="(officer, i) in officers" :key="i" :value="officer.id">{{officer.name}}</option>
                                        </select>   
                                        <i class="bi bi-arrow-right-circle-fill input-group-text" style="font-size:18px" @click="shareContact()"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="dropdown d-inline">
                                <i class="btn btn-sm bi bi-link-45deg mx-2 btn-success rounded-pill dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false" :class="delete_display" @click="getallgroups()"></i>
                                <div class="dropdown-menu px-4 py-0" style="width:3.5in" aria-labelledby="dropdownMenuButton1">  
                                    <div class=" input-group"  style="font-size:13px !important">
                                        <select class="form-select form-select-sm "  aria-label=".form-select-sm example" v-model="groupid" >
                                            <option value="default">please select a Group</option>
                                            <option  v-for="(group, i) in extgroups" :key="i" :value="group.id">{{group.label}}</option>
                                        </select>   
                                        <i class="bi bi-send-fill input-group-text" style="font-size:15px" @click="addtoGroup()"></i>
                                    </div>
                                </div>
                            </div>



                            <button type="button" style="background-color:#061704"  class="btn rounded-pill text-light mx-2 shadow-md btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">+ contact</button>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <Addcontent  @modalSubmit="reloadList()"  :updatedata="updateValues"/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <h5 class="card-title text-start fw-bolder" style="color:#061704">Farmers</h5>

                <div class="table-responsive">
                <table class="table table-striped table-sm table-hover table-sm" style="min-width: 7.5in" id="accordionExample">
                    <thead>
                        <tr>
                            <th scope="col"><input class="form-check-input" type="checkbox" v-model="selectAll"></th>
                            <th scope="col" >ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Location</th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr v-for="(contact , i) in contacts" :key="i"  :class="jwt['id'] + '.0' == contact.accessPemission ? 'bg-warning':''" >
                                <th><input class="form-check-input" type="checkbox" :value="contact.id" v-model="checkeddata" ></th>
                                <th scope="row">003{{contact.id}}</th>
                                <td>{{contact.name}}</td>
                                <td>{{contact.email}}</td>
                                <td>{{contact.phone}}</td>
                                <td>{{contact.address.location}}</td>
                                <td><i @click="updateValues = contact" data-bs-toggle="modal" data-bs-target="#exampleModal" class="bi bi-pencil-square mx-2 btn" ></i></td>
                            </tr>
                        </tbody>
                </table>
                </div>
            </div>
        </div>
</template>

    <script>
    import axios from 'axios'    
    import Addcontent from './contactmodal.vue'
    import jwt_decode from "jwt-decode";

    export default {
        components: { 
            Addcontent
        },
        data() {
            return {
                jwt:[],
                groupid:'default',
                officerId:'default',
                searchText:'',
                contacts:[],
                officers:[],
                searchRes:[],
                updateValues:null,
                checkeddata : [],
                extgroups:[],
                resMsg:'',
                extGroup:{
                    label:'',
                    description:''
                }

            }
        },
        beforeMount(){
           this.getall()
        },
        computed:{
            delete_display(){
                if(this.checkeddata.length == 0){
                    return 'd-none'
                }
            },
            selectAll: {
                get: function () {
                    return this.contacts ? this.checkeddata.length == this.contacts.length : false;
                },
                set: function (value) {
                    var checkeddata = [];
                    if (value) {
                        this.contacts.forEach(function (data) {
                            checkeddata.push(data.id);
                        });
                    }
                    this.checkeddata = checkeddata;
                }
            },
        },
        methods: {
            getUsers(){
                 var token = this.getCookie('token')
                axios.get('http://aghub.miphost.com/api/broadcast/', 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    this.officers = response.data
                }).catch(error => {
                    console.log(error);
                })
            },
            getallgroups(){
                 var token = this.getCookie('token')
                axios.get('http://aghub.miphost.com/api/broadcast/group/show', 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    this.extgroups = response.data
                }).catch(error => {
                    console.log(error);
                })
            },
        shareContact(){
            var token = this.getCookie('token')

            let arr = []
            let axiosarray = []
            let checkeddata2 = this.checkeddata
                checkeddata2.forEach(data => 
                {
                    var newpromise = axios.post('http://aghub.miphost.com/api/broadcast/share/', 
                        {
                            extId:data,
                            partnerId:this.officerId
                        },
                        { headers:{'Authorization': `Bearer ${token}`}}
                    )
                    axiosarray.push(newpromise)
                })
                axios.all(axiosarray)
                .then(axios.spread((...responses) =>{ 
                    responses.forEach(
                        res => arr.push(res.data)
                    )
                    if(arr.length == checkeddata2.length){
                        this.resMsg =  'contact(s) shared'
                        setTimeout(() => {
                                this.resMsg=''
                                this.checkeddata = []
                        }, 2000);
                    }                     
                })).catch(error => {
                    this.resMsg =  error.response.data
                }) 
            },
            addtoGroup(){
                var token = this.getCookie('token')

                let arr = []
                let axiosarray = []
                let checkeddata2 = this.checkeddata
                    checkeddata2.forEach(data => 
                    {
                        var newpromise = axios.post('http://aghub.miphost.com/api/broadcast/grouplink/', 
                            {
                                extensionId:data,
                                extGroupId:this.groupid
                            },
                            { headers:{'Authorization': `Bearer ${token}`}}
                        )
                        axiosarray.push(newpromise)
                    })
                    axios.all(axiosarray)
                    .then(axios.spread((...responses) =>{ 
                        responses.forEach(
                            res => arr.push(res.data)
                        )
                        if(arr.length == checkeddata2.length){
                            this.resMsg =  'contacts has been created'
                            setTimeout(() => {
                                    this.resMsg=''
                                    this.checkeddata = []
                            }, 2000);
                        }                     
                    })).catch(error => {
                        this.resMsg =  error.response.data
                    }) 
            },
            getall(){
                 var token = this.getCookie('token')

                axios.get('http://aghub.miphost.com/api/broadcast/contact/show', 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    this.contacts = response.data
                    axios.get('http://aghub.miphost.com/api/broadcast/share/', 
                    { headers:{'Authorization': `Bearer ${token}`}})
                    .then(response =>  {
                        this.jwt = jwt_decode(token);
                        console.log(response.data)
                        response.data.forEach(contact => {
                            this.contacts.push(contact)
                        });
                    }).catch(error => {
                        console.log(error);
                    })
                }).catch(error => {
                    console.log(error);
                })



            },
            onlySpaces(str) {
                return str.trim().length === 0;
            },
             searchcontacts(){
                var token = this.getCookie('token')
                if(this.searchText.length == 0 || this.onlySpaces(this.searchText)){
                    this.searchRes = null
                    this.getall()
                }else{
                    axios.get('http://aghub.miphost.com/api/broadcast/contact/'+ this.searchText, 
                        { headers:{'Authorization': `Bearer ${token}`}})
                    .then(response =>  {
                        this.searchRes = response.data
                    }).catch(error => {
                        console.log(error);
                    })
                }
                
            },
            createGroup(){
                var token = this.getCookie('token')
                axios.post('http://aghub.miphost.com/api/broadcast/group', this.extGroup,
                    {headers:{'Authorization': `Bearer ${token}`, 'Content-Type':'application/json'}}
                ).then(response =>{
                    this.resMsg = response.data.label + ' has been created'
                    this.extGroup.label=''
                    this.extGroup.description=''
                    setTimeout(() => {
                            this.resMsg=''
                    }, 2000);

                }).catch(error =>{
                    console.log(error)
                    this.resMsg = error.response.data
                    setTimeout(() => {
                        this.resMsg=''
                    }, 2000);
                })
            },
            deletedata() {
                var token = this.getCookie('token')

                let arr = []
                let axiosarray = []
                let checkeddata2 = this.checkeddata
                console.log(checkeddata2)
                if (confirm('All selection(s) will be deleted/distroyed(Permanently)')){
                    checkeddata2.forEach(data => 
                    {
                        var newpromise = axios.get('http://aghub.miphost.com/api/broadcast/contact/delete/'+ data, 
                            { headers:{'Authorization': `Bearer ${token}`}}
                        )
                        axiosarray.push(newpromise)
                    })
                    axios.all(axiosarray)
                    .then(axios.spread((...responses) =>{ 
                        responses.forEach(
                            res =>arr.push(res.data)
                        )
                        console.log(arr)

                        if(arr.length == checkeddata2.length){
                            console.log('success')
                            this.reloadList()
                        }                     
                    })).catch(error => {
                        console.log(error);
                    }) 
                }else{
                    console.log('cancelled')
                }
            },
            reloadList(){
                var token = this.getCookie('token')
                axios.get('http://aghub.miphost.com/api/broadcast/contact/show', 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    this.contacts = response.data
                }).catch(error => {
                    console.log(error);
                })
            },
           
            getContact(id){
                var token = this.getCookie('token')

                axios.get('http://aghub.miphost.com/api/broadcast/contact/show/'+ id, 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    console.log(response.data)
                    this.contacts = response.data 
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
        /* we will explain what these classes do next! */
        .v-enter-active,
        .v-leave-active {
        transition: opacity 2.5s ease;
        }

        .dropdown-item:focus, .dropdown-item:hover {
        background-color: #e9ecef33 !important;
        }
        .dropdown-item.active, .dropdown-item:active {
            background-color: #e9ecef33 !important;
        }
        .v-enter-from,
        .v-leave-to {
        opacity: 0;
        }
    .dropdown-toggle::after {
        display: none !important;
    }
    .input-group-text{
        background-color:#e9ecef00 !important;
        border: none !important;
        padding: 25px 5px !important;
    }
    .input-group-text:hover{
        color:#037205 !important;
        cursor: pointer;
    }
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

/* **************************** */

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
</style>