<template>

            <footer class="row fixed-bottom mt-5">
                <div class="col-lg-4 col-sm-8 px-5 py-2 ">
                    <div class="input-group input-group-sm mb-3">
                        <input class="form-control d-inline" type="text" v-model="searchdata" @keyup="search(searchdata)" placeholder="Search">
                        <button type="button" style="background-color:#c2213d !important" class="btn d-inline text-light" @click="search()">All locations</button>
                    </div>

                    <div class="list-group mt-2 text-sm-center text-lg-start">
                        <a href="#" @click="getLocationData([locationData.latitude,locationData.longitude,locationData.location])" style="font-size:11px"  class="text-capitalize list-group-item ps-3 list-group-item-action"
                            v-for="locationData in searchdatares" 
                            :key="locationData.id"  >
                            {{locationData.location}}
                        </a>
                    </div>
                </div>
                
                
                
                <div class="col px-5 py-3 align-items-center" @click="$emit('populatemain',[daydata, addressVal])" v-for="(daydata, id) in reusltdata" :key="id">
                    <span class="badge rounded-pill  p-2 fw-light" :class="badgecolors()">{{getday(daydata[0].dt)}}</span>
                    <ul class="nav flex-column">
                        <li class="nav-item my-2"><h3>{{daydata[0].main.temp}}°</h3></li>
                        <li class="nav-item mb-2">
                            <img :src="'https://openweathermap.org/img/wn/'+daydata[0].weather[0].icon +'@2x.png'" width="65">
                            <h6 >{{daydata[0].weather[0].description}}</h6>
                        </li>
                    </ul>
                </div>
            </footer>
            
</template>
<script>
import axios from 'axios'

export default {
    props:[
        'weekdata'
    ],
    emits:[
        'getLocationDatas',
        'populatemain'
    ],
    data() {
        return {
            addressVal:'default',
            locations:null,
            reusltdata:null,
            searchdata:null,
            searchdatares:null,
        }
    },
    computed:{
            getdata:{
                get(){
                    if(this.reusltdata){
                    console.log(this.reusltdata) 
                        return this.reusltdata
                    }else{
                        return this.weekdata
                    }
                },
                set(newValue) {
                    this.reusltdata = newValue
                }
            },            
    },
    created(){
            
        this.search()
    
        navigator.geolocation.getCurrentPosition(this.success, this.error);

    },
    methods:{
        success(pos) {
            const crd = pos.coords;

            // crd.latitude
            // crd.longitude
            var url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${crd.latitude}&lon=${crd.longitude}`
            axios.get(url)
            .then(response =>  {
                 var onMountLocation = [crd.latitude,crd.longitude, response.data.display_name]
                 this.getLocationData(onMountLocation)
            }).catch(error => {
                console.log(error);
            })
        },

        error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        },
        badgecolors(){
                const colors = ["primary","success","warning","danger","dark","info"];
                var x = Math.floor(Math.random() * 5);
                let name = 'bg-' + colors[x];
                return name                
        },
        geticonclass(data){
            switch (data) {
                case 'cloudy':
                    return  'bi-clouds'
                
                case 'rainny':
                    return 'bi-cloud-rain'
                
                case 'sunny':
                    return 'bi-thermometer-sun'
                
                case 'partly coludy':
                    return 'bi-cloud-sun'
                default:
                    break;
            }
        },
        getday(date){
            console.log(date)
            const week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            const d = new Date(date * 1000);
            let name = week[d.getDay()];
            return name
        },

        search(location = null){
            var url = `https://aghub.miphost.com/api/weather/locations/${location}`
            if(!location){
                url = `https://aghub.miphost.com/api/weather/locations`
            }
            axios.get(url)
            .then(response =>  {
                 this.searchdatares = response.data
            }).catch(error => {
                console.log(error);
            })
           
        },
        getLocationData(location){
            let sixDayArr = []
            let daysArr = []

            axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location[0]}&lon=${location[1]}&appid=84e1433cb3c4fe512da5cc71b670f8fa&units=metric`)
                .then(response =>  {
                    response.data.list.forEach(element => {

                        var newDate = new Date(element.dt * 1000)
                        element['dtn'] = newDate.toDateString()
                        
                        if(!daysArr.includes(element.dtn)){
                            daysArr.push(element.dtn)
                        }
                    });
                    daysArr.forEach(daydate => {
                        var eachArr = []
                        response.data.list.forEach(value => {

                            if(value.dtn == daydate){
                                var getDate = new Date(value.dt * 1000);

                                var hrs = getDate.getHours();
                                if (hrs < 12 && eachArr.length <= 0)
                                    eachArr.push(value)
                                else if (hrs >= 12 && hrs <= 17 && eachArr.length == 1)
                                    eachArr.push(value)
                                else if (hrs >= 17 && hrs <= 24 && eachArr.length == 2)
                                    eachArr.push(value)     
                            }
                        });
                        sixDayArr.push(eachArr)
                        this.addressVal = location[2]
                    });
                    
                    sixDayArr.splice(0, 1);
                    this.reusltdata = sixDayArr

                    console.log(sixDayArr)
                    // ****************************************************************************

                    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=84e1433cb3c4fe512da5cc71b670f8fa&units=metric`)
                    .then(response =>  {
                        this.$emit('getLocationDatas', [response.data, location[2]]);
                    }).catch(error => {
                        console.log(error);
                    })

                  
                })
                .catch(error => {
                    console.log(error);
            })    

        }
    },
}
</script>
<style scoped>

    .col{
        transition: transform .4s linear; /* Animation */
    }
    .col:hover {
        /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
        transform: scale(1.1);
        opacity: 0.8;
        margin-top: 1%;
    }
    
    .fixed-bottom{
    background-size: cover;
    box-shadow: 0 15px 25px rgba(129, 124, 124, 0.2);
    height: 30%;
    border-radius: 5px;
    backdrop-filter: blur(14px);
    background-color: rgba(1, 0, 0, 0.767);
    text-align: center;
    color: aliceblue;
    } 
    .row>div{
        border-right: 1px solid rgba(90, 90, 90, 0.6);
    }
    .badge{
        letter-spacing: 1px;
    }
    input{
        background-color: #e9ecef00;
        border: none;
        border-radius: 0px;
        border-bottom:1px solid #f0f8ff75;
    }
    .form-control:focus {
        color: #ffffff;
        background-color: #ffffff12;
        border-color: #9595958c;
        outline: 0;
        border-radius: 5px 5px 0px 0px;
        box-shadow: none;
    }
    /* width */
        ::-webkit-scrollbar {
        width: 8px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
        background: #fff !important; 
        }
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
        background: #c2213d; 
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
        background: #7a091c; 
        }
    .list-group{  
    height: 1.8in;
    overflow-y: scroll;
    
    }
    .list-group-item {
    position: relative;
    display: block;
    padding: .5rem 1rem;
    color: #f8f9fa;
    text-decoration: none;
    background: none !important;
    border: none !important;
    }
    .list-group-item-action:focus, .list-group-item-action:hover {
    color: #f47d91 !important;
    border-radius: 51px;
    border: 10px !important;
    background-color: #6c757d29 !important;
    }
    /* If the screen size is 1000px or more, set the font-size of <div> to 80px */
    @media only screen and (max-width: 1000px) {
        .fixed-bottom {
            position: relative !important;
        }
    }
</style>

