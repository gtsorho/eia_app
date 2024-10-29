<template>
    <div class="container my-4 text-start">
            <select @change="selectAddress()" v-model="addressVal" class="form-select form-select-sm w-25 d-inline"  aria-label=".form-select-sm example">
                <option value="default" selected>Select location from menu</option>
                <option style="font-size:12px"  v-for="(address, index) in locations" :key="index" :value="address" >{{address.location}}</option>
            </select>

            <span class="d-inline" v-if="isLoading" style="color:#f56a6a !important">   
                <small class="mx-1 fw-bolder">Loading...</small>
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </span>

        <div class="card my-3 shadow-lg">
            <h6 class="card-header text-start">Temperature (&#8451;) against Last 7days</h6>
            <div class="card-body" v-if="tempset.length > 0">
                <line-chart :graphValues="tempset"></line-chart>
            </div>
        </div>
        <div class="card my-3 shadow-lg" >
            <h6 class="card-header text-start">Rain levels (&#13212;) against Last 7days</h6>
            <div class="card-body" v-if="rainset.length > 0">
                <line-chart :graphValues="rainset"></line-chart>
            </div>
        </div>
         <div class="card my-3 shadow-lg" >
            <h6 class="card-header text-start">Temperature(&#8451;) &#38; Rain(&#13212;) Forcasts within this Week</h6>
            <div class="card-body" v-if="rainTempset.length > 0">
                <line-chart :graphValues="rainTempset"></line-chart>
            </div>
        </div>
    </div>
    <br><br><br>


</template>
<script>

import axios from 'axios'
import Linechart from "../components/lineChart.vue"

export default {
    name: 'temprainTool',
    components:{    
       'line-chart' : Linechart,
    },
    data() {
        return {
            addressVal:'default',
            locations:null,
            tempset: [],
            rainset: [],
            rainTempset: [],
            refCount: 0,
            isLoading: false
        }      
    },
    created(){
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

        axios.get('https://aghub.miphost.com/api/weather/locations')
            .then(response =>  {
                this.locations = response.data
                if(this.locations){                    
                    this.addressVal = {
                    "id": 1,
                    "longitude": "-2.5",
                    "latitude": "4.8",
                    "location": "Ghana",
                    "createdAt": "2022-08-09T02:00:39.000Z",
                    "updatedAt": "2022-08-09T02:00:39.000Z"
                    }
                    this.selectAddress()
                }
            }).catch(error => {
                console.log(error);
            })
            
    },
    methods: {
        setLoading(isLoading) {
            if (isLoading) {
                this.refCount++;
                this.isLoading = true;
            } else if (this.refCount > 0) {
                this.refCount--;
                this.isLoading = (this.refCount > 0);
            }
        },
        async selectAddress(){
            let datearr = [] 
            let dayArr = []
            let tempForcastArr = []
            let rainForcastArr = []
            var liveTempArr = []
            var liveRainArr = []
                        
            await axios.post('https://aghub.miphost.com/api/weather/livedata', 
            {
                'latitude':this.addressVal.latitude,
                'longitude': this.addressVal.longitude,
            })
            .then(response =>  {
                response.data.splice(-1,1)

                response.data.forEach(item => {  
                    liveTempArr.push(item.temperature)
                    liveRainArr.push(item.rain)
                });
            })
            .catch(error => {
                console.log(error);
            })  


            await axios({
                method: 'post',       
                url: 'https://aghub.miphost.com/api/weather/weatherdata',
                data: {
                    'latitude':this.addressVal.latitude,
                    'longitude': this.addressVal.longitude,
                }
            })
            .then(response =>  {
                let impactTemp = []
                let impactRain = []
                
                response.data.forEach(item => {

                    let forcastDate = new Date(item.date)
                    let tempForcast_val = item.temperature
                    let RainForcast_val =   item.rain
                    
                    datearr.push(new Date(forcastDate).toDateString().split(' ').slice(1,3).join(' '))
                    dayArr.push(new Date(forcastDate).toDateString().split(' ').slice(0,1).join(' '))
                    tempForcastArr.push(tempForcast_val)
                    rainForcastArr.push(RainForcast_val)

                    for (let i = 0; i < response.data.length; i++){
                        impactTemp[i] = tempForcast_val
                        impactRain[i] = RainForcast_val                          
                    }
                });

                
                this.rainTempset =
                [ 
                    {
                        lables: dayArr.reverse()
                    },
                    ['Temp Forcast', 'Rain Forcast'],
                    impactTemp.reverse(),
                    impactRain.reverse()
                ]

            }).catch(error => {
                console.log(error);
            })

            
            
                this.tempset = 
                [
                    {
                        lables:datearr
                    },
                    ['Actual','Forcast'],
                    liveTempArr,
                    tempForcastArr
                ]

                this.rainset =
                [ 
                    {
                        lables:datearr
                    },
                    ['Actual','Forcast'],
                    liveRainArr,
                    rainForcastArr
                ]

               
        }
    },
}
</script>