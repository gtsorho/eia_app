<template>
<Dashboardform @panelValues="formValues" @powerClick="powerBi = true; chartdata=[]" />


<div class="container-fluid p-4">
  <span v-if="!powerBi">
    <div class="container fw-bolder text-dark" style="margin-top: 23rem; font-size:12px" v-show="chartdata == null || chartdata.length < 1">
      <p class="d-inline me-2"> No charts available Please select</p>
        <a disabled class="float2 align-middle" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
          <i class="bi bi-menu-button-wide fs-6 my-float2 "></i>
        </a>
      <p class="d-inline ms-2" > to add a chart</p>
    </div>
  </span>
  
  <span v-if="chartdata == null || chartdata.length < 1"> 
    <iframe v-if="powerBi " title="IITA" style="width:100%; height:6.2in"  src="https://app.powerbi.com/view?r=eyJrIjoiYzM2MmIyNGItYTYwYy00MzEwLTliYjktMDljYjNhYTNlMjdiIiwidCI6IjA1Y2UxNTMyLWZjY2ItNDc2Mi04YjRkLTkxOWIxNzRmZDkxMSIsImMiOjh9&amp;pageName=ReportSection039b7f79d60b91083bf9" frameborder="0" allowfullscreen="true"></iframe>
  </span>
  <div class="row row-cols-sm-1 justify-content-center row-cols-md-2 mb-4">
    <div class="col mb-4" v-for="(data , i) in chartdata" :key="i" v-show="i < 4" >
        <div class="card">
          <div class="card-header text-start text-capitalize">
            <small class="fw-bold" v-if="!data.xyKeys[0] || !data.xyKeys[1] ">{{`plot of x data by y data`}}</small>
            <small v-else class="fw-bold" style="font-size:12px">{{`plot of ${data.y_data} against ${data.x_data}`}}</small>
            <select class="form-select form-select-sm w-25 float-end" v-model="currentChart[i]" aria-label=".form-select-sm example">
              <option value="type">Type</option>
              <option value="Chart">Bar Chart</option>
              <option value="Doughnut">Doughnut</option>
              <option value="Line">Line Chart</option>
            </select>
          </div>
          <div class="card-body">
              <component :is="currentChart[i]" v-if="data.show" :graphValues="
                [
                  {
                    lables:  data.chartVals[1]

                  },
                  data.chartVals[0].x_data
                ].concat(data.chartVals[0].y_data)
              "></component>
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
import Dashboardform from '../components/dashboardform.vue'



export default {
  name: "dashboard",
  components:{
    Chart,
    Line,
    Doughnut,
    Dashboardform
  },
  data() {
    return {
      powerBi:false,
      chartdata:[],
      newChartData:[],
      currentChart:{
        0:'Line',
        1:'Chart',
        2:'Doughnut',
        3:'Chart'
      }
    }
  },
  methods:{
    formValues(n){
      this.chartdata =  n
      console.log(this.chartdata)
    }
  },
    watch: {
    chartdata(newData, oldData) {
      this.newChartData = newData
    }
  },

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
	background-color:#4fab43;
	color:#FFF;
	border-radius:50px;
  transition: transform .2s;
	text-align:center;
	box-shadow: 0px 0px 5px #4fab43;
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
	background-color:#4fab43;
	color:#FFF;
	border-radius:50px;
  transition: transform .2s;
	text-align:center;
	box-shadow: 0px 0px 5px #4fab43;
}
.float:hover{
  transform: scale(1.1); 
	background-color:#1c7f0e;

}
</style>