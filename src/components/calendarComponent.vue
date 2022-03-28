<template>
    <div class="container my-5">
        <div class="row text-muted text-center border-bottom fw-bold" style="font-size:10px">
            <div class="col fw-bold">Location</div>
            <div class="col">January</div>
            <div class="col">February</div>
            <div class="col">March</div>
            <div class="col">April</div>
            <div class="col">May</div>
            <div class="col">June</div>
            <div class="col">July</div>
            <div class="col">August</div>
            <div class="col">September</div>
            <div class="col">October</div>
            <div class="col">November</div>
            <div class="col">December</div>
        </div>
        <div class="row border-bottom " style="height:13px; background-color: #f0f0f0;">
            <div class="col fw-bold border-end border-2 text-capitalize" style="font-size:9px">{{calendar_data.town }}</div>
            <div class="col px-1" v-for="n in 12" :key="n">
                <div class="progress" style="height: 13px;">
                  <Popper hover arrow style="width:130%;"  v-for="item in calendar_data.Rain" :content="`${calendar_day(item)} - Rain`" :key="item" v-show="new Date(item).getMonth() == n-1">
                    <div class="progress-bar bg-info" role="progressbar" style="width: 130%; height:13px" aria-valuenow="30" aria-valuemin="0" aria-valuemax="130"></div>
                  </Popper>
                  <Popper :content="`${calendar_day(lp)} - Land Preparation`" hover arrow style="width:130%"  v-for="lp in calendar_data.landpreparation" :key="lp" v-show="new Date(lp).getMonth() == n-1">
                    <div class="progress-bar bg-brown" role="progressbar"  style="width: 130%; height:13px" aria-valuenow="30" aria-valuemin="0" aria-valuemax="130"></div>
                  </Popper>
                  <Popper :content="`${calendar_day(plant)} - Planting`" hover arrow style="width:130%"  v-for="plant in calendar_data.planting" :key="plant" v-show="new Date(plant).getMonth() == n-1">
                    <div class="progress-bar bg-success" role="progressbar"  style="width: 130%; height:13px" aria-valuenow="30" aria-valuemin="0" aria-valuemax="130"></div>
                  </Popper>
                  <Popper :content="`${calendar_day(weed)} - Weeding`" hover arrow style="width:130%"  v-for="weed in calendar_data.weeding" :key="weed" v-show="new Date(weed).getMonth() == n-1">
                    <div class="progress-bar bg-secondary" role="progressbar"  style="width: 130%; height:13px" aria-valuenow="30" aria-valuemin="0" aria-valuemax="130"></div>
                  </Popper>
                  <Popper :content="`${calendar_day(pest)} - Pesticide`" hover arrow style="width:130%"  v-for="pest in calendar_data.pesticide" :key="pest" v-show="new Date(pest).getMonth() == n-1">
                    <div class="progress-bar bg-danger" role="progressbar"  style="width: 130%; height:13px" aria-valuenow="30" aria-valuemin="0" aria-valuemax="130"></div>
                  </Popper>
                  <Popper :content="`${calendar_day(harvest)} - Harvesting`" hover arrow style="width:130%"  v-for="harvest in calendar_data.Harvesting" :key="harvest" v-show="new Date(harvest).getMonth() == n-1">
                    <div class="progress-bar bg-warning" role="progressbar"  style="width: 130%; height:13px" aria-valuenow="30" aria-valuemin="0" aria-valuemax="130"></div>
                  </Popper>
                  <Popper :content="`${calendar_day(firtilize)} - Fertilizer App.`" hover arrow style="width:130%"  v-for="firtilize in calendar_data.firtilizer" :key="firtilize" v-show="new Date(firtilize).getMonth() == n-1">
                    <div class="progress-bar bg-orange" role="progressbar"  style="width: 130%; height:13px" aria-valuenow="30" aria-valuemin="0" aria-valuemax="130"></div>
                  </Popper>
                </div>
            </div>
          </div>
    </div>
</template>


<script>
  import { defineComponent } from "vue";
  import Popper from "vue3-popper";

export default {
  name: 'calendar',
  components: {
    Popper,
  },
  props: [
    'calendar_data'
  ],
  data() {
    return {

    }
  },
  methods:{
    calendar_day(x){
      const event = new Date(x);
      return event.toDateString().split(' ').slice(1,3).join(' ')
    }
  },
  mounted() {
      console.log(this.calendar_data)
  },
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#arrow{
  left: -5px !important;
}
:root {
    --popper-theme-background-color: #333333;
    --popper-theme-background-color-hover: #333333;
    --popper-theme-text-color: #ffffff;
    --popper-theme-border-width: 0px;
    --popper-theme-border-style: solid;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 12px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
  }
</style>

<style scoped>

.bg-brown{
  background-color: rgb(155, 104, 37) !important;
}
.bg-orange{
  background-color: rgb(148, 45, 173) !important;
}
.bg-dark{
  background-color: rgb(32, 32, 32) !important;
}
.bg-success{
  background-color: rgb(74, 187, 108) !important;
}
.bg-warning{
  background-color: rgb(241, 186, 35) !important;
}
.bg-info{
  background-color: rgb(74, 174, 204) !important;
}
.bg-secondary{
  background-color: rgb(95, 95, 95) !important;
}
.bg-danger{
  background-color: rgb(255, 109, 73) !important;
}
</style>
