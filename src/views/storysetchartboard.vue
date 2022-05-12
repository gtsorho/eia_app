<template>
<div class="container-fluid p-4">
  <!-- <div class="container fw-bolder text-dark" style="margin-top: 23rem;" v-show=" chartdata == null || chartdata.length < 1">
    <p class="d-inline me-2"> No charts available Please select</p>
    <a disabled class="float2 align-middle" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
      <i class="bi bi-menu-button-wide fs-6 my-float2 "></i>
    </a>
    <p class="d-inline ms-2"> to add a chart</p>
  </div> -->

  <div class="container-fluid justify-content-center w-auto" style="margin-bottom:10%">
        <div class="card mx-0 mx-md-5">
          <span v-for="(story, index) in storydata" :key='index'>
            <div class="card-body row mb-5" v-if="index % 2 == 0">
            <div class="float-start h-100 col">
              <KeepAlive>
                <component :is="story.chart_type" :graphValues="story.datasets"></component>
              </KeepAlive>
              <!-- <Chart titles="My journey with Vue"/> -->
            </div>
            <div class="w-50 mx-3 my-5 col float-end text-start">
              <h4>{{story.title}}</h4>
              <hr class="w-25">
              <p class="">{{story.description}}</p>
              <small class="text-muted fw-bolder" style="font-size:11px">{{story.other}}</small>
            </div>
          </div>
          <div class="card-body row mb-5" v-else>
            <div class="w-50 mx-3 my-5 col float-start text-start">
              <h4>{{story.title}}</h4>
              <hr class="w-25">
              <p class="">{{story.description}}</p>
              <small class="text-muted">{{story.other}}</small>
            </div>
            <div class="float-end h-100 col">
              <KeepAlive>
                <component :is="story.chart_type" :graphValues="story.datasets"></component>
              </KeepAlive>
            </div>
          </div>
          </span>
        </div>
     
    </div>
    <br> <br>
</div>

<!-- <a  class="float align-middle" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
  <i class="bi bi-menu-button-wide fs-4 my-float "></i>
</a> -->

</template>

<script>
import Chart from "../components/barchart.vue"
import Line from "../components/lineChart.vue"
import Doughnut from"../components/doughnut.vue"
import Radar from "../components/radar.vue"
import Scatter from "../components/scatter.vue"
import Dashboardform from '../components/dashboardform.vue'



export default {
  name: "Storysetchartboard",
  props: ['data'],
  components:{
    Chart,
    Line,
    Doughnut,
    Radar,
    Scatter,
    Dashboardform
  },
  data() {
    return {
      storydata: JSON.parse(this.$route.params.data),
      chartdata:null,
      currentChart:{
        0:'Line',
        1:'Chart',
        2:'Doughnut',
        3:'Radar',
        4:'Scatter',
      }
    }
  },
  mounted(){
    console.log(this.storydata)
  },
  methods:{
    formValues(n){
      console.log(this.currentChart)
      this.chartdata = n
    }
  }
}
</script>

<style scoped>

@media only screen and (min-width: 992px) {
  .w-auto{
    width: 75% !important;
  }
}
/* .card{
  height: 281px;
}
.card-body{
  height: 90%;
} */

.float{
	position:fixed;
	width:41px;
	height:40px;
	bottom:48%;
	left:15px;
	background-color:#c2213d;
	color:#FFF;
	border-radius:50px;
  transition: transform .2s;
	text-align:center;
	box-shadow: 0px 0px 5px #c2213d;
}
.my-float{
    position: absolute;
    left: 22%;
    top: 9%;
}

.float2{
  font-weight: bolder;
  display: inline;
  padding-inline:9px;
  padding-bottom: 6.5px;
  padding-top: 8px;
  opacity: .9;
	left:15px;
	background-color:#c2213d;
	color:#FFF;
	border-radius:50px;
  transition: transform .2s;
	text-align:center;
	box-shadow: 0px 0px 5px #c2213d;
}
.float:hover{
  transform: scale(1.1); 
	background-color:#ff607a;

}
</style>