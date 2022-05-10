<template>
<Dashboardform @panelValues="formValues" />


<div class="container-fluid p-4">
  <div class="container fw-bolder text-dark" style="margin-top: 23rem;" v-show=" chartdata == null || chartdata.length < 1">
    <p class="d-inline me-2"> No charts available Please select</p>
    <a disabled class="float2 align-middle" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
      <i class="bi bi-menu-button-wide fs-6 my-float2 "></i>
    </a>
    <p class="d-inline ms-2"> to add a chart</p>
  </div>

  <div class="row row-cols-sm-1 justify-content-center row-cols-md-2 mb-4">
    <div class="col mb-4" v-for="(data , i) in chartdata" :key="i" v-show="i < 4" >
        <div class="card">
          <div class="card-header text-start">
            Featured
            <select class="form-select form-select-sm w-25 float-end" v-model="currentChart[i]" aria-label=".form-select-sm example">
              <option value="type">Type</option>
              <option value="Chart">Bar Chart</option>
              <option value="Doughnut">Doughnut</option>
              <option value="Radar">Radar Chart</option>
              <option value="Scatter">Scatter Chart</option>
              <option value="Line">Line Chart</option>
              
            </select>
          </div>
          <div class="card-body">
            <KeepAlive>
              <component :is="currentChart[i]"></component>
            </KeepAlive>
          </div>
        </div>
    </div>
  </div>
</div>

<a  class="float align-middle" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
  <i class="bi bi-menu-button-wide fs-4 my-float "></i>
</a>

</template>

<script>
import Chart from "../components/barchart.vue"
import Line from "../components/lineChart.vue"
import Doughnut from"../components/doughnut.vue"
import Radar from "../components/radar.vue"
import Scatter from "../components/scatter.vue"
import Dashboardform from '../components/dashboardform.vue'



export default {
  name: "dashboard",
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
      chartdata:null,
      currentChart:{
        0:'Line',
        1:'Line',
        2:'Line',
        3:'Line',
        4:'Line',
      }
    }
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
.card{
  height: 281px;
}
.card-body{
  height: 90%;
}
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