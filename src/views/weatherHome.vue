<template >
    <Navbar/>
    <Homemain :maindata="weatherdatamain"/>

    <Homefooter :weekdata="weatherdataweek" 
        @getLocationDatas="getLocationData($event)" 
        @populatemain="weatherdatamain = $event"
    />
    
</template>
<script>
import Navbar from "../components/navbar.vue";
import Homefooter from '../components/homefooter.vue'
import Homeheader from '../components/homeheader.vue'
import Homemain from '../components/homemain.vue'

export default {
    components:{
        Homefooter,
        Homeheader,
        Homemain,
        Navbar
    },
    data() {
        return {
            weatherdatamain: '',
            weatherdataweek: ''
        }
    },
    mounted() {

    },
    methods:{
        getLocationData(data){
            this.weatherdatamain = data
        }
    }
}
</script>
<style scoped>
</style>