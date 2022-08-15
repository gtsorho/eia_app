<template lang="">

    <div class="container my-4 ">
                <select @change="selectAddress()" v-model="addressVal" class="form-select form-select-sm w-25"  aria-label=".form-select-sm example">
                <option value="default" selected>Select location from menu</option>
                <option style="font-size:12px"  v-for="(address, index) in locations" :key="index" :value="address" >{{address.location}}</option>
            </select>
               

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
            rainset: []
        }      
    },
    created(){
        // console.log(this.tempset)
        axios.get('https://impactgt.herokuapp.com/api/alladdress')
            .then(response =>  {
                this.locations = response.data
                // console.log(response.data)
            }).catch(error => {
                console.log(error);
            })
    },
    computed:{

    },
    methods: {
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
                response.data.forEach(item => {
                    var temp_Forcast =   item.current_temperature.slice(0, -1)
                    let tempForcast_val = temp_Forcast.split("-")


                    var regex = /[.,\s]/g;
                    var currentresult = item.current_rain_level.replace(regex, '');

                    var rain_Forcast =   currentresult.slice(0, -2)
                    let RainForcast_val = rain_Forcast.split("-")

                    let date = new Date(item.date)
                    let forcastDate = new Date(date).setDate(date.getDate() + 2); 


                    tempForcast_val = eval(tempForcast_val.join('+'))/tempForcast_val.length

                    RainForcast_val = eval(RainForcast_val.join('+'))/RainForcast_val.length
                   
                    datearr.push(new Date(forcastDate).toDateString().split(' ').slice(1,3).join(' '))
                    tempForcastArr.push(tempForcast_val)
                    rainForcastArr.push(RainForcast_val)
                });
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