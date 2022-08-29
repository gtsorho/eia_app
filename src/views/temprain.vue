<template lang="">

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
                <Line :graphValues="tempset"></Line>
            </div>
        </div>
        <div class="card my-3 shadow-lg" >
            <h6 class="card-header text-start">Rain levels (&#13212;) against Last 7days</h6>
            <div class="card-body" v-if="rainset.length > 0">
                <Line  :graphValues="rainset"></Line>
            </div>
        </div>
         <div class="card my-3 shadow-lg" >
            <h6 class="card-header text-start">Temperature(&#8451;) &#38; Rain(&#13212;) Forcasts within this Week</h6>
            <div class="card-body" v-if="rainTempset.length > 0">
                <Line  :graphValues="rainTempset"></Line>
            </div>
        </div>
    </div>
    <br><br><br>


</template>
<script>

import axios from 'axios'
import Chart from "../components/barchart.vue"
import Line from "../components/lineChart.vue"

export default {
    components:{
        Line,
        Chart
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

        // console.log(this.tempset)
        axios.get('https://impactgt.herokuapp.com/api/alladdress')
            .then(response =>  {
                this.locations = response.data
                // console.log(response.data)
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
                

           await axios.post('https://impactgt.herokuapp.com/api/weatherdata', 
            {
                'latitude':this.addressVal.latitude,
                'longitude': this.addressVal.longitude,
            })
            .then(response =>  {
                // console.log(response.data)
                let impactTemp = []
                let impactRain = []

                response.data.splice(0,2)
                response.data.splice(-1,1)

                response.data.forEach(item => {
                    var temp_Forcast =   item.current_temperature.slice(0, -1)
                    let tempForcast_val = temp_Forcast.split("-")


                    var regex = /[.,\s]/g;
                    var currentresult = item.current_rain_level.replace(regex, '');

                    var rain_Forcast =   currentresult.slice(0, -2)
                    let RainForcast_val = rain_Forcast.split("-")

                    let date = new Date(item.date)
                    let forcastDate = new Date(date).setDate(date.getDate() + 2); 
                    // let forcastDate = new Date(date).setDate(date.getDate() + 0); 

                    // console.log(date)

                    tempForcast_val = eval(tempForcast_val.join('+'))/tempForcast_val.length

                    RainForcast_val = eval(RainForcast_val.join('+'))/RainForcast_val.length
                   
                    datearr.push(new Date(forcastDate).toDateString().split(' ').slice(1,3).join(' '))
                    tempForcastArr.push(tempForcast_val)
                    rainForcastArr.push(RainForcast_val)

                    // *************************************************************************************************
                    var nextTemp = item.current_temperature.slice(0, -1)
                        nextTemp = temp_Forcast.split("-")
                        nextTemp = eval(nextTemp.join('+'))/nextTemp.length

                    var nextRain = item.current_rain_level.replace(regex, '');
                        nextRain =   nextRain.slice(0, -2)
                        nextRain = nextRain.split("-")
                        nextRain = eval(nextRain.join('+'))/nextRain.length


                    
            
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
                        
                    // console.log([date,new Date(beforeTempDate), new Date(afterTempDate),impactTemp ])
                     //*************************************************************************************************** */
                });

                // console.log(impactTemp, impactRain)
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
            await axios.post('https://impactgt.herokuapp.com/api/liveweather', 
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
                    // let date = item.date

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
                rainForcastArr]
            
        }
    },
}
</script>
<style lang="">
    
</style>