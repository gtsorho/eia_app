<template>
        <div class="card bg-light shadow-lg p-3 mb-5">
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-3 col-lg-3">
                                <input type="text" class="form-control-sm form-control border-end-0 border-start-0 fs-6 border-3"
                                    id="dropdownMenuButton2" aria-expanded="false"
                                    placeholder="&#xF52A;"  aria-describedby="basic-addon2" 
                                    style=" font-family:'bootstrap-icons'"
                                    v-model="searchText"
                                    @keyup="searchPodcasts()"
                                >
                    </div>
                    <div class="col">
                        <p style="font-size:11px" v-if="resMsg" class="text-warning text-capitalize d-inline fw-bold px-3">{{resMsg}}</p>

                        <i class="btn btn-sm btn-danger rounded-pill bi bi-trash3 mx-2" v-if="checkeddata.length > 0" @click="deletePodcast"></i>
                        
                            <div class="dropdown d-inline">
                                <i class="btn btn-sm rounded-pill btn-danger bi  bi-x-circle-fill  mx-2 dropdown"  data-bs-toggle="dropdown" aria-expanded="false" v-if="checkeddata.length > 0" @click="getSharedUsers()" ><i class="bi  mx-1 bi-share-fill"></i></i>
                                <div class="dropdown-menu px-4 py-0" style="width:3.5in" aria-labelledby="dropdownMenuButton1">  
                                    <div class=" input-group"  style="font-size:13px !important">
                                        <select class="form-select form-select-sm "  aria-label=".form-select-sm example" v-model="officerId" @change="unsharePodcast()" >
                                            <option value="default">Select an Officer</option>
                                            <option  v-for="(sharedUser, i) in sharedUsers" :key="i" :value="sharedUser.id">{{sharedUser.name}}</option>
                                        </select>   
                                    </div>
                                </div>
                            </div>
                            <div class="dropdown d-inline" >
                                <i class="btn btn-sm rounded-pill btn-warning bi bi-share-fill mx-2dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false"  v-if="checkeddata.length > 0" @click="getUsers()" ></i>
                                <div class="dropdown-menu px-4 py-0" style="width:3.5in" aria-labelledby="dropdownMenuButton1">  
                                    <div class=" input-group"  style="font-size:13px !important">
                                        <select class="form-select form-select-sm "  aria-label=".form-select-sm example" v-model="officerId" >
                                            <option value="default">please select an Officer</option>
                                            <option  v-for="(officer, i) in officers" :key="i" :value="officer.id">{{officer.name}}</option>
                                        </select>   
                                        <i class="bi bi-arrow-right-circle-fill input-group-text" style="font-size:18px" @click="sharePodcast()"></i>
                                    </div>
                                </div>
                            </div>
                    </div>
                    
                    <div class="col-12 col-md-4 col-lg-4">
                           <div>
                                <input class="form-control mb-0 form-control-sm  float-start fileUpload" @change="onFileChange" id="formFileSm"   ref="importfile"  type="file">
                                
                                
                                <div class="input-group mb-3">
                                    <input type="text" v-model="filename"  class="d-block form-control-sm form-control mb-2 text-secondary" placeholder="Name or Description (less than 40 letters)" id="">
                                    <button class="btn btn-sm rounded-pill px-3 mx-2 text-light input-group-text"  @click="uploadfile()" v-if="!isLoading && !uploadDone" style="background-color:#006d0bea;height: fit-content; ">Add</button>
                                    <button class="btn btn-sm rounded-pill px-3 mx-2 text-light input-group-text"  v-if="uploadDone" style="background-color:#006d0bea;height: fit-content;"><i class="bi bi-file-earmark-check"></i></button>

                                </div>


                                <div class="spinner-border "  v-if="isLoading" role="status">
                                    <div class="spinner-grow spinner-grow-sm"  role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                           </div>
                    </div>
                </div>
                <hr>
                <h5 class="card-title fw-bolder text-start">Uploads

                    <span class="float-end">
                        <input type="checkbox" class="btn-check btn-check-sm rounded-pill" v-model="selectAll" id="btn-check-2-outlined" autocomplete="off">
                        <label class="btn btn-sm rounded-pill btn-outline-warning " for="btn-check-2-outlined" @click="select">{{ checkeddata.length != podcasts.length ? 'Select All': 'Unselect'}}</label><br>
                    </span>
                </h5>
                    

                <div class="row text-start justify-content-md-center" style="font-size:13px !important;">
                        <div class="col-md-auto" v-for="(podcast, i) in podcasts" :key="i" >
                            <a :href="podcast.webViewLink" class="text-decoration-none text-dark">
                                <div class="card mb-3"   >
                                    <div class="row g-0">
                                        <div class="col-4">
                                            <img :src="require('../assets/icons/' + imgURL(podcast.gName))" class="img-fluid rounded-start" style="width: 60px;" alt="">
                                        </div>
                                        <div class="col position-relative">
                                            <div class="form-check form-check-reverse position-absolute top-0 end-0">                         
                                            <input class="form-check-input" type="checkbox"  id="reverseCheck1" :value="podcast.id" v-model="checkeddata" >
                                            </div>
                                            <div class="card-body p-1">
                                                <p class="card-text mb-1 fw-bold text-capitalize">{{podcast.name}} <i class="bi bi-share-fill mx-3" v-show="jwt['id'] + '.0' === podcast.accessPemission"></i></p>
                                                <p class="card-text mb-1"><small class="text-muted">Last updated {{new Date(podcast.updatedAt).toGMTString()}}</small></p>
                                            </div>

                                            <div class="float-end px-2" v-if="podcast.accessPemission != null && podcast.accessPemission.includes(jwt['id'] + '.0')">
                                                <a href="#" @mouseover="brokenlink = true" @mouseleave="brokenlink = false" @click="unshareRequest(podcast.id, podcast.extensionsOfficerId)">
                                                    <img src="https://cdn-icons-png.flaticon.com/512/8111/8111361.png"  height="15" v-show="brokenlink"> 
                                                    <img src="https://cdn-icons-png.flaticon.com/512/154/154843.png"  height="15" v-show="!brokenlink">
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
</template>

    <script>
    import axios from 'axios'
    import jwt_decode from "jwt-decode";
    
    export default {
        components: {
        },
        data() {
            return {
                sharedUsers: [],
                brokenlink:false,
                resMsg:'',
                jwt:[],
                officerId:'default',
                officers:[],
                checkeddata : [],
                filename:'',
                FormData: new FormData(),
                searchText:'',
                currentModal: 'Stock',
                podcasts:[],
                searchRes:[],
                refCount: 0,
                isLoading: false,
                uploadDone:false
            }
        },
       
        beforeMount(){
            this.getPodcasts()
        },
        methods: {
            setLoading(isLoading) {
            if (isLoading) {
                this.refCount++;
                this.isLoading = true;
            } else if (this.refCount > 0) {
            this.refCount--;
            this.isLoading = (this.refCount > 0);
            this.uploadDone = true
            setInterval(() => {
                this.uploadDone = false              
            }, 2000);
            
            }
            },
            getUsers(){
                 var token = this.getCookie('token')
                axios.get('https://aghub.miphost.com/api/broadcast/', 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    this.officers = response.data
                }).catch(error => {
                    console.log(error);
                })
            },
            getSharedUsers(){
            var token = this.getCookie('token')
            
            this.sharedUsers = []
            let axiosarray = []
            let checkeddata2 = this.checkeddata
                checkeddata2.forEach(data => 
                {
                    var newpromise = axios.get('https://aghub.miphost.com/api/broadcast/podcasts/show/'+ data, 
                        { headers:{'Authorization': `Bearer ${token}`}}
                    )
                    axiosarray.push(newpromise)
                })
                let user
                axios.all(axiosarray)
                .then(axios.spread((...responses) =>{ 
                    responses.forEach(res => {

                            console.log(res.data[0].accessPemission)
                        res.data[0].accessPemission.split(',').forEach(user=>{
                            user.slice(0,-2)
                            axios.get('https://aghub.miphost.com/api/broadcast/show/'+ user.slice(0,-2), 
                            { headers:{'Authorization': `Bearer ${token}`}})
                            .then(response =>  {
                                this.sharedUsers.push(response.data)
                            }).catch(error => {
                                console.log(error);
                            })
                        })
                    })                   
                })).catch(error => {
                    console.log(error)
                }) 
            },
            unsharePodcast(){
                var token = this.getCookie('token')

                let arr = []
                let axiosarray = []
                let checkeddata2 = this.checkeddata
                checkeddata2.forEach(data => 
                {
                    var newpromise = axios.post('https://aghub.miphost.com/api/broadcast/podcasts/unshare/', 
                        {
                            podcastId:data,
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
                        this.resMsg =  'contact(s) unshared'
                        setTimeout(() => {
                                this.resMsg=''
                                this.checkeddata = []
                        }, 2000);
                    }                     
                })).catch(error => {
                    this.resMsg =  error.response.data
                }) 
            },
            unshareRequest(id,OfficerId){
             var token = this.getCookie('token')
             axios.post('https://aghub.miphost.com/api/broadcast/podcasts/unshare/request/', 
             {
                ownerId:OfficerId,
                sharedUserId:this.jwt.id,
                podcastId:id,
                description:'unshare farmer podcast.'
            },
            { headers:{'Authorization': `Bearer ${token}`}})
            .then(response =>  {
                // this.sharedUsers.push(response.data)
            }).catch(error => {
                console.log(error);
            })
        },
            sharePodcast(){
            var token = this.getCookie('token')

            let arr = []
            let axiosarray = []
            let checkeddata2 = this.checkeddata
                checkeddata2.forEach(data => 
                {
                    var newpromise = axios.post('https://aghub.miphost.com/api/broadcast/podcasts/share/', 
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
            onFileChange(e) {
                const file = e.target.files;
                this.FormData = new FormData()
                this.FormData.append('file',file[0]);
            },
             uploadfile () {
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
                this.FormData.append('fileName', this.filename)

                var contentType = {
                    headers: {
                        'content-type':'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
                axios.post(`https://aghub.miphost.com/api/broadcast/podcast/upload`, 
                this.FormData, 
                contentType 
                )
                .then( response =>{
                    console.log(response)

                    this.filename = ''
                    this.$refs.importfile.type = 'text'
                    this.$refs.importfile.type = 'file'
                    this.FormData = new FormData()
                    this.getPodcasts()
                })
                .catch( error => {
                    console.log(error);
                })
            },
            getPodcasts(){
                var token = this.getCookie('token')

                axios.get('https://aghub.miphost.com/api/broadcast/podcast/', 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                   this.podcasts = response.data
                    axios.get('https://aghub.miphost.com/api/broadcast/podcasts/share', 
                        { headers:{'Authorization': `Bearer ${token}`}})
                    .then(response =>  {
                        this.jwt = jwt_decode(token);
                        response.data.forEach(podcast => {
                            this.podcasts.push(podcast)
                        });
                        console.log(response.data)
                    }).catch(error => {
                        console.log(error);
                    })
                }).catch(error => {
                    console.log(error);
                })

            },

            imgURL(name){
                if(name.endsWith('.pdf')) return 'pdf.png'
                else if(name.endsWith('.mp3')) return 'music.png'
                else if(name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png')) return 'image.png'
                else if(name.endsWith('.mp4') || name.endsWith('.mkv')) return 'video.png'
                else if(name.endsWith('.docx') || name.endsWith('.xlsx') || name.endsWith('.txt')) return 'doc.png'
                else return 'unknown.png'
                
            },
            searchPodcasts(){
                var token = this.getCookie('token')

                if(this.searchText.length <= 0) return this.getPodcasts()

                // console.log(this.searchText)
                axios.get('https://aghub.miphost.com/api/broadcast/podcast/' +  this.searchText, 
                    { headers:{'Authorization': `Bearer ${token}`}})
                .then(response =>  {
                    this.podcasts = response.data
                    console.log(response.data)
                }).catch(error => {
                    console.log(error);
                })
            },
            // getProduct(name){
            //     var token = this.getCookie('token')

            //     axios.get('/api/searchStockReport/'+ name, 
            //         { headers:{'Authorization': `Bearer ${token}`}})
            //     .then(response =>  {
            //         console.log(response.data)
            //         this.stocks = response.data
            //     }).catch(error => {
            //         console.log(error);
            //     })
            // },
            deletePodcast() {
                var token = this.getCookie('token')

                let arr = []
                let axiosarray = []
                let checkeddata2 = this.checkeddata
                console.log(checkeddata2)
                if (confirm('All selection(s) will be deleted/distroyed(Permanently)')){
                    checkeddata2.forEach(data => 
                    {
                        var newpromise = axios.get('https://aghub.miphost.com/api/broadcast/podcast/delete/'+ data, 
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
                            this.getPodcasts()
                        }                     
                    })).catch(error => {
                        console.log(error);
                    }) 
                }else{
                    console.log('cancelled')
                }
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
        computed:{            
            selectAll: {
                get: function () {
                    return this.podcasts ? this.checkeddata.length == this.podcasts.length : false;
                },
                set: function (value) {
                    var checkeddata = [];
                    if (value) {
                        this.podcasts.forEach(function (data) {
                            checkeddata.push(data.id);
                        });
                    }
                    this.checkeddata = checkeddata;
                }
            },
        }    
    }
</script>
<style scoped>
    .spinner-border {
        width: 1rem;
        height: 1rem;
        color: #dc3545;
        border: .2em solid currentColor;
        border-right-color: transparent !important;
    }
    .spinner-grow-sm {
        width: .45rem;
        height: .45rem;
        vertical-align: 0.576em !important;
        color: #f68888;
    }
    input[type=file]::file-selector-button {
    border: 2px solid #7567d900;
    padding: .2em .4em;
    border-radius: .2em;
    color: rgb(209, 209, 209);
    background-color: #2b9f1b;
    transition: .3s;
    }

    input[type=file]::file-selector-button:hover{
    background-color: #2b9f1b !important;
    }

    .form-control[data-v-6a57b8d6]:focus {
        background-color: rgb(176 176 176 / 0%) !important;
        box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0%) !important;
    }

    input[type = file]:focus{
        display: inline !important;
        width: auto !important;
        border: none !important;
        background-color:#d2691e00;
        margin-inline: 5px;
    }
    input[type = file]{
        display: inline !important;
        width: auto !important;
        border: none !important;
        background-color:#d2691e00;
        margin-inline: 5px;
    }

    .btn-check:active+.btn-outline-warning:focus, .btn-check:checked+.btn-outline-warning:focus, .btn-outline-warning.active:focus, .btn-outline-warning.dropdown-toggle.show:focus, .btn-outline-warning:active:focus {
        box-shadow: 0 0 0 0.25rem rgb(108 117 125 / 0%) !important;
    }
    .btn-check:focus+.btn-outline-warning, .btn-outline-warning:focus {
        box-shadow: 0 0 0 0.25rem rgb(108 117 125 / 0%) !important;
    }

    .form-control-sm, .form-select-sm {
        background-color: #1a222600;
        border: none;
        border-bottom: 2px solid #2b9f1b;
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
        border-bottom: 2px solid #2b9f1b !important ;
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
    .form-check-input:checked{
        background-color: #2b9f1b;
    }
    .card{
        margin-top:4%;
        min-width: 80% !important;
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