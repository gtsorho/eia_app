<template>
        <div class="card bg-light shadow-lg p-3 mb-5">
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-6">
                        <!-- ********************************** -->
                        <div class="card border-0 mt-0" v-if="showupdate">
                            <div class="card-body p-0 text-start row">
                                <div class="col-4">
                                    <label for="Label" class="form-label" style="font-size:15px !important">Label</label>
                                    <input type="text" class="form-control form-control-sm mb-0" required v-model="extGroup.label" id="label" placeholder="eg.Livestock Farmers">
                                </div>
                                <div class="col-6">
                                    <label for="description" class="form-label" style="font-size:15px !important">Description</label>
                                    <input type="text" class="form-control form-control-sm mb-0" id="description" required v-model="extGroup.description" placeholder="lorem ipsum init">
                                </div>
                                <div class="col-2">
                                    <button type="submit" class="btn btn-sm float-end rounded-pill text-light d-inline mt-3 me-2" style="font-size:15px !important; background-image: linear-gradient(198deg, #000000, #1f6c15) !important;" @click="updateGroup()">Update</button>
                                </div>
                            </div>
                            <span style="font-size:12px !important" class="text-warning fw-bold">{{resMsg}}</span>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6">
                        <div class="float-end">
                            <Transition>
                                <p style="font-size:11px" v-if="resMsg" class="text-warning text-capitalize d-inline fw-bold px-3">{{resMsg}}</p>
                            </Transition>

                            <div class="dropdown d-inline" >
                                <a href="#" class="dropdown-toggle text-light fw-bold text-decoration-none btn btn-sm btn-secondary rounded-pill"  data-bs-toggle="dropdown" aria-expanded="false">+<i class="bi bi-people"></i></a>
                                <div class="dropdown-menu px-4" style="width:3in" aria-labelledby="dropdownMenuButton1">
                                    <div class="mb-3">
                                        <label for="Label" class="form-label" style="font-size:15px !important">Label</label>
                                        <input type="text" class="form-control form-control-sm" required v-model="extGroup.label" id="label" placeholder="eg.Livestock Farmers">
                                    </div>
                                    <div class="mb-3">
                                        <label for="description" class="form-label" style="font-size:15px !important">Description</label>
                                        <input type="text" class="form-control form-control-sm" id="description" required v-model="extGroup.description" placeholder="lorem ipsum init">
                                    </div>
                                    <button type="submit" class="btn btn-sm float-end rounded-pill text-light" style="font-size:15px !important; background-image: linear-gradient(198deg, #000000, #1f6c15) !important;" @click="createGroup()">create group</button>
                                </div>
                            </div>
                            <i class="btn bi bi-trash3 mx-2 rounded-pill" :class="delete_display" @click="deletedata" style="color:#fa0101; "></i>
                            <button type="button" style="background-color:#061704"  class="btn rounded-pill text-light mx-2 shadow-md btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">+ contact</button>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <Addcontent  @modalSubmit="reloadList()"  :updatedata="updateValues"/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <h5 class="card-title text-start fw-bolder" style="color:#061704">Groups and Messaging</h5>

                <div class="row">
                    <div class="col-lg-4">
                        <div class="card" style=" border:3px solid rgb(21 84 12) !important; background: #8aff7a52 !important">
                        <div class="card-body text-start">
                            <h5 class="card-title">Groups</h5>
                            <a href="#" class="text-decoration-none text-dark">
                                <div class="alert rounded-pill  shadow" v-for="(group ,i) in extgroups" :key="i" style="background-color: rgb(252 191 161)" @click="getallExt(group.id)" role="alert">
                                    <strong style="font-size:13px; max-width: 200px;" class="text-capitalize d-inline-block text-truncate">{{group.label}} </strong>
                                    <button type="button" class="btn-close btn-close-sm float-end"  data-bs-dismiss="alert" aria-label="Close" @click="deleteGroup(group.id)"></button>
                                    <a href="#"  style="font-size:13px" class="text-decoration-none text-body me-2 float-end" 
                                        @click="groupid = group.id, showupdate = !showupdate, extGroup.label= group.label, extGroup.description = group.description">
                                        <i class="bi bi-pencil-fill"></i>
                                    </a>
                                </div>
                            </a> 
                        </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card " style="border:3px solid rgb(197 81 24) !important; margin-top: 2rem!important; background: #ffb89652 !important">
                        <div class="card-body">
                            <h5 class="card-title text-start">Farmers</h5>
                            <p v-if="extensions.length == 0" class="mt-5" style="font-size:10px" >no farmers results found</p>
                            <div class="alert rounded-pill text-start shadow " v-for="(extension ,i) in extensions" :key="i" style="background-color: rgb(170 255 159)" role="alert">
                                <strong style="font-size:13px" class="text-capitalize">{{extension.extension.name}} </strong> <small  style="font-size:10px" >{{extension.extension.phone}}</small>
                                <button type="button" class="btn-close btn-close-sm float-end"  data-bs-dismiss="alert" aria-label="Close" @click="deleteGrouplink(extension.id, extension.extension.phone), groupid=extension.extGroupId"></button>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-4">
                        <div class="card mt-5" style="border: 3px solid rgb(42 42 42) !important;  background: #100e0e !important">
                            <div class="card-body">
                            <h5 class="card-title text-start  text-muted">Messaging</h5>
                                <div class=" input-group"  style="font-size:13px !important">
                                    <div class="dropdown  input-group-text d-inline" >
                                        <i class="bi bi-paperclip dropdown-toggle  text-muted"  data-bs-toggle="dropdown" aria-expanded="false" style="transform: rotate(45deg); font-size:20px;"></i>
                                        <div class="dropdown-menu px-2" style="width:3in" aria-labelledby="dropdownMenuButton1">
                                            <div class="list-group" style="font-size:12px; width:fit-content" >
                                            <a href="#" v-for="(podcast, i) in podcasts" :key="i" class="list-group-item py-1 ms-2  list-group-item-action"
                                                @click="links.push({link:podcast.webViewLink, name:podcast.name})">{{podcast.name}}
                                             </a>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea class="form-control form-control-sm" placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit."  aria-label=".form-control-sm example" v-model="smsMsg"></textarea>   
                                    <span v-if="!isLoading">
                                        <i v-if="smsMsg.length > 0" class="bi bi-send-fill input-group-text ms-2 text-muted" style="font-size:20px" @click="sendSms()"></i>
                                        <i v-else class="bi bi-chat-square-text-fill input-group-text ms-2 text-muted" style="font-size:20px"></i>
                                    </span>
                                </div>
                                                                   
                                    <div class="spinner-border mx-auto"  v-if="isLoading" role="status">
                                        <div class="spinner-grow spinner-grow-sm"  role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>

                                    <small style="font-size:13px" class="text-success">{{smsRes}}</small>     
                                    <a href="#" class="btn btn-sm btn-success overflow-hidden m-1 rounded-pill" v-for="(link, i) in links" :key="i" style="width:100px; height:30px">{{link.name}}</a>                           
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
</template>

    <script>
    import axios from 'axios'    
        import Addcontent from './contactmodal.vue'


    export default {
        components: { 
            Addcontent
        },
        data() {
            return {
                isLoading: false,
                refCount: 0,
                links:[],
                podcasts:'',
                smsRes:'',
                smsMsg:'',
                phoneNo:[],
                groupid:null,
                showupdate:false,
                searchText:'',
                extgroups:[],
                extensions:[],
                searchRes:[],
                updateValues:null,
                checkeddata : [],
                allSelected: false,
                resMsg:'',
                extGroup:{
                    label:'',
                    description:''
                }

            }
        },
        beforeMount(){
           this.getallgroups();
           this.getPodcasts()
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
            // groups*************************************************************************
            getallgroups(){
                 var token = this.getCookie('token')

                axios.get('http://aghub.miphost.com/api/broadcast/group/show', 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    console.log(response.data)
                    this.extgroups = response.data
                }).catch(error => {
                    console.log(error);
                })
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
             updateGroup(){
                 var token = this.getCookie('token')
                axios.post('http://aghub.miphost.com/api/broadcast/group/update/'+ this.groupid, 
                    this.extGroup,
                    {headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                     this.resMsg = response.data
                    setTimeout(() => {
                            this.extGroup.label=''
                            this.extGroup.description=''
                            this.resMsg=''
                            this.showupdate = !this.showupdate
                            this.getallgroups()
                    }, 2000);

                }).catch(error => {
                    console.log(error);
                })
            },
            deleteGroup(groupid){
                var token = this.getCookie('token')
                axios.get('http://aghub.miphost.com/api/broadcast/group/delete/'+ groupid, 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    console.log(response)
                    this.getallgroups()
                }).catch(error => {
                    console.log(error);
                })
            },

            //group links************************************************************************ 
            getallExt(groupid){
                var token = this.getCookie('token')
                axios.get('http://aghub.miphost.com/api/broadcast/grouplink/show/'+ groupid, 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    this.extensions = response.data
                    this.phoneNo = []
                    this.extensions.forEach(contact => {
                        this.phoneNo.push(contact.extension.phone)
                    });
                    console.log(this.phoneNo)

                }).catch(error => {
                    console.log(error);
                })
            },
            deleteGrouplink(extId, phoneNo){
                var token = this.getCookie('token')
                axios.get('http://aghub.miphost.com/api/broadcast/grouplink/delete/'+ extId, 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    const index = this.phoneNo.indexOf(phoneNo);
                    if (index > -1) { // only splice array when item is found
                        this.phoneNo.splice(index, 1); // 2nd parameter means remove one item only
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            setLoading(isLoading) {
            if (isLoading) {
                this.refCount++;
                this.isLoading = true;
            } else if (this.refCount > 0) {
                    this.refCount--;
                    this.isLoading = (this.refCount > 0);
                    setInterval(() => {      
                    }, 2000);
                }
            },

            sendSms(){
                axios.interceptors.request.use((config) => {
                    this.setLoading(true);
                    return config;
                    }, (error) => {
                    this.setLoading(false);
                    return Promise.reject(error);
                });

                axios.interceptors.response.use((response) => {
                    this.setLoading(false);
                    return response;
                    }, (error) => {
                    this.setLoading(false);
                    return Promise.reject(error);
                });



                var token = this.getCookie('token')
                let linkarr = []
                this.links.forEach(link => {
                    linkarr.push(link.link)
                });
                let links2send = linkarr.join('\n -------------------- \n')

                this.smsMsg = `${this.smsMsg} \n ${links2send}`
                axios.post('http://aghub.miphost.com/api/broadcast/contact/notify', 
                    {
                        recipients:this.phoneNo,
                        msg:this.smsMsg
                    },
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    console.log(response.data)
                    if(response.data.code == 2000){
                        this.smsRes = response.data.message
                        this.smsMsg=''
                        linkarr = []
                	    this.links = []
                    setTimeout(() => {
                            this.smsRes=''
                    }, 2000);
                    }
                }).catch(error => {
                    console.log(error);
                })
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
            getPodcasts(){
                var token = this.getCookie('token')

                axios.get('http://aghub.miphost.com/api/broadcast/podcast/', 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                   this.podcasts = response.data
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
    .input-group-text{
        background-color:#e9ecef00 !important;
        border: none !important;
        padding: 0px !important;
    }
    .input-group-text:hover{
        color:#037205 !important;
        cursor: pointer;
    }
    .btn-close{
        width: 3px !important;
        height: 3px !important;
        margin-top: 6px;
    }
    .alert a{
         margin-top: 3px !important;
         opacity: .6;

    }
    .alert a:hover{
         opacity: 1;
    }
    .alert{
        padding: 2px 14px !important;
        border-radius: 50rem!important;
    }
        /* we will explain what these classes do next! */
        .v-enter-active,
        .v-leave-active {
        transition: opacity 2.5s ease;
        }

        .v-enter-from,
        .v-leave-to {
        opacity: 0;
        }
    .dropdown-toggle::after {
        display: none !important;
    }
    .card{
        margin-top:4%;
        min-height: 90% !important;
        min-width: 80% !important;
        /* overflow-x: scroll; */
        border-radius: 1rem;
        transition: 0.5s;
        background-color: #ffffff !important;
    }

    .stockList:hover>* {
        --bs-table-accent-bg: rgb(0 0 0 / 0%) !important;
    }

    .table-sm>:not(caption)>*>* {
        padding: 0.6rem .25rem !important;
    }

/* **************************** */

.form-control-sm {
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
.form-control-sm{
    font-size: 0.75rem !important;
}
.form-control:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-bottom: 2px solid #01600a !important ;
    outline: 0;
    background-color: #31383b00;
    color: #1e1e1e;
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
</style>