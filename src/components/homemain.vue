<template>
    <div class="card rounded-pill m-auto">
    <div class="card-body">
        <div class="row" v-if="getdata">
            <div class="col-4 align-self-center text-center text-md-end">
                <h5 class="display-5 text-capitalize">{{getdata.main.temp}}°</h5>
            </div>
            <div class="col-4 text-center align-self-center">
                <h4 class="text-capitalize" style="font-size:25px;">{{address.split(' ')[0]}}</h4>
                <h5 class="fs-6 text-capitalize">{{getday}}</h5>
            </div>
            <div class="col-4  align-self-center text-center text-md-start">
                <img :src="'http://openweathermap.org/img/wn/'+ getdata.weather[0].icon +'@2x.png'" width="70">
                <h6 class="text-capitalize">{{getdata.weather[0].description}}</h6>
            </div>
        </div>
        <hr class="text-light mx-auto w-75" style="margin-block: 3px !important;">
        <div class="row justify-content-md-center">
            <div class="col text-center" v-for="data in maindatatwo" :key="data.id">
                <p class=" text-capitalize pb-0 text-success fw-bolder" style="font-size:13px; margin-bottom: 0px !important;">{{data.main.temp}}° {{data.weather[0].description}}</p>
                <p class="text-capitalize pb-0" style="font-size:10px">{{timeOfDay(data.dt)}} </p>
            </div>
        </div>
    </div>
</div>


</template>
<script>
export default { 
    data() {
        return {
            iconclass:null,
            address:'',
            maindatatwo:[]
        }
    },   
    props:[
        'maindata'
    ],
    methods:{
        timeOfDay(dt){
            var myDate = new Date(dt * 1000);

            var hrs = myDate.getHours();

            var greet;

            if (hrs < 12)
                greet = ' Morning';
            else if (hrs >= 12 && hrs <= 17)
                greet = ' Afternoon';
            else if (hrs >= 17 && hrs <= 24)
                greet = ' Evening';

            return greet
        }
    },
    computed:{
        getdata(){
            if(this.maindata){
                if(this.maindata[0].hasOwnProperty('length')){
                    //  this.maindatatwo = [this.maindata[0][1], this.maindata[0][2]]
                    var maindatatwoArr = []
                     this.maindata[0].forEach(element => {
                        maindatatwoArr.push(element)
                     });
                     this.maindatatwo = maindatatwoArr
                     console.log(maindatatwoArr.splice(0,1) )
                     return this.maindata[0][0]
                }
            }
            this.maindatatwo = null
            this.address = this.maindata[1]
            return this.maindata[0];

        },

        getday(){
            return  new Date(this.getdata.dt * 1000).toDateString()
        }
    }
    
}
</script>
<style scoped>  
.row div{
    color: rgb(197, 197, 197);
}
.card-body{
    padding: 0px !important;
}
.card{
    margin-top: 10rem !important;
    width: 80%;
    overflow-wrap: normal;
    background-color: rgb(0 0 0 / 50%) !important;
    border: 0px solid rgba(255, 255, 255, 0.125) !important;
}
/* If the screen size is 601px or more, set the font-size of <div> to 80px */
/* @media only screen and (min-width: 601px) {
  div.example {
    font-size: 80px;
  }
} */

/* If the screen size is 600px or less, set the font-size of <div> to 30px */
@media only screen and (max-width: 800px) {
    .card{
        width: inherit;
    }
    .display-3 {
        font-size: 1.75rem !important;
        font-weight: 300 !important;
        line-height: 1.0 !important;
    }
    .display-1 {
        font-size: 1.75rem !important;
        font-weight: 200 !important;
        line-height: .50 !important;
    }
    .fs-5 {
        font-size: 1rem !important;
        font-weight: 100 !important;
        line-height: .50 !important;
    }
    .fs-6 {
        font-size: .8rem !important;
        font-weight: 100 !important;
        line-height: 1.2 !important;
    }
}

</style>