<template lang="">

    <div class="container my-4 ">
                <select @change="selectAddress()" v-model="addressVal" class="form-select form-select-sm w-25"  aria-label=".form-select-sm example">
                <option value="default" selected>Select location from menu</option>
                <option style="font-size:12px"  v-for="(address, index) in locations" :key="index" :value="address" >{{address.location}}</option>
            </select>
               

        <div class="card my-3 shadow-lg">
            <h6 class="card-header text-start">Temperature (&#8451;) against Last 7days</h6>
            <div class="card-body" v-if="tempset.length > 0">
                <Line   :graphValues="tempset"></Line>
            </div>
        </div>
        <div class="card my-3 shadow-lg" >
            <h6 class="card-header text-start">Rain levels (&#13212;) against Last 7days</h6>
            <div class="card-body" v-if="tempset.length > 0">
                <Line  :graphValues="rainset"></Line>
            </div>
        </div>
    </div>
    <br><br><br>


</template>
<script>

import axios from 'axios'
import Line from "../components/lineChart.vue"

export default {
    components:{
        Line
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
        console.log(this.tempset)
        axios.get('http://127.0.0.1:8000/api/alladdress')
            .then(response =>  {
                this.locations = response.data
            }).catch(error => {
                console.log(error);
            })
    },
    methods: {
        selectAddress(){
            // console.log(this)

            axios.post('http://127.0.0.1:8000/api/weatherdata', 
            {
                'latitude':this.addressVal.latitude,
                'longitude': this.addressVal.longitude,
            })
            .then(response =>  {
                let datearr = [] 
                let tempNowArr = []
                let tempNextArr = []

                let rainNowArr = []
                let rainNextArr = []

                response.data.forEach(item => {
                    var temp_now =   item.current_temperature.slice(0, -1)
                    var temp_next = item.next_temperature.slice(0,-1)
                    let now_val = temp_now.split("-")
                    let next_val = temp_next.split("-")


                    var regex = /[.,\s]/g;
                    var currentresult = item.current_rain_level.replace(regex, '');
                    var nextresult = item.next_rain_level.replace(regex, '');


                    var rain_now =   currentresult.slice(0, -2)
                    var rain_next = nextresult.slice(0,-2)
                    let Rainnow_val = rain_now.split("-")
                    let Rainnext_val = rain_next.split("-")                    

                    let date = item.date
                    now_val = eval(now_val.join('+'))/now_val.length
                    next_val = eval(next_val.join('+'))/next_val.length

                    Rainnow_val = eval(Rainnow_val.join('+'))/Rainnow_val.length
                    Rainnext_val = eval(Rainnext_val.join('+'))/Rainnext_val.length
                   
                        datearr.push(date)
                        tempNowArr.push(now_val)
                        tempNextArr.push(next_val)
                        rainNowArr.push(Rainnow_val)
                        rainNextArr.push(Rainnext_val)
                });

                    this.tempset.push(
                        {
                            lables:datearr
                        },
                        ['Forcast','Present'],
                        tempNowArr,
                        tempNextArr
                    )   

                    this.rainset.push(
                        {
                            lables:datearr
                        },
                        ['Forcast','Present'],
                        rainNowArr,
                        rainNextArr
                    )   


            }).catch(error => {
                console.log(error);
            })
        }
    },
}
</script>
<style lang="">
    
</style>