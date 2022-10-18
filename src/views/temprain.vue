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

        axios.get('http://aghub.miphost.com/api/weather/locations')
            .then(response =>  {
                this.locations = response.data
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
            let tempForcastArr = []
            let rainForcastArr = []
            let liveTempArr = []
            let liveRainArr = []
            
            console.log(this.addressVal.longitude, this.addressVal.latitude)

                        
            await axios({
                method: 'post',       
                url: 'http://aghub.miphost.com/api/weather/weatherdata',
                data: {
                    'latitude':this.addressVal.latitude,
                    'longitude': this.addressVal.longitude,
                }
            })
            .then(response =>  {
                let impactTemp = []
                let impactRain = []

                response.data.splice(0,2)
                response.data.splice(-1,1)

               
                
                response.data.forEach(item => {

                    let date = new Date(item.date)
                    let forcastDate = new Date(date).setDate(date.getDate() + 2);

                   let tempForcast_val = item.current_temperature

                   let RainForcast_val =   item.current_rain_level

                    
                    
                    datearr.push(new Date(forcastDate).toDateString().split(' ').slice(1,3).join(' '))
                    tempForcastArr.push(tempForcast_val)
                    rainForcastArr.push(RainForcast_val)

                    // *************************************************************************************************
                    var nextTemp = item.current_temperature

                    var nextRain = item.current_rain_level


                    
            
                    var beforeTempDate, afterTempDate, beforeRainDate, afterRainDate
                        beforeTempDate = new Date(date).setDate(date.getDate() + 2);
                        afterTempDate = new Date(date).setDate(date.getDate() + 4);
                        beforeRainDate = new Date(date).setDate(date.getDate() + 2);
                        afterRainDate = new Date(date).setDate(date.getDate() + 4);

                        console.log(date)

                    for (let i = 0; i <= 6; i++) {
                        if(new Date(beforeTempDate).getDay() == i){
                            impactTemp[i] = tempForcast_val
                        }else if(new Date(afterTempDate).getDay() == i){
                            impactTemp[i] = nextTemp
                        }

                        if(new Date(beforeRainDate).getDay() == i){
                            impactRain[i] = RainForcast_val
                        }else if(new Date(afterRainDate).getDay() == i){
                            impactRain[i] = nextRain
                        }                            
                    }
                    //*************************************************************************************************** */
                });

                this.rainTempset =
                [ 
                    {
                        lables: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
                    },
                    ['Temp Forcast', 'Rain Forcast'],
                    impactTemp,
                    impactRain
                ]
            }).catch(error => {
                console.log(error);
            })


            // ****************************************************************************************
            axios.post('http://aghub.miphost.com/api/weather/livedata', 
            {
                'latitude':this.addressVal.latitude,
                'longitude': this.addressVal.longitude,
            })
            .then(response =>  {
                response.data.splice(0,2)
                response.data.splice(-1,1)

                response.data.forEach(item => {
                    var temp_now =   item.temperature
                    var rain_now =   item.rain

                    liveTempArr.push(temp_now)
                    liveRainArr.push(rain_now)
                });
            })
            .catch(error => {
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