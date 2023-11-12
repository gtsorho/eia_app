<template>

<div class="  d-lg-flex py-2 align-items-center justify-content-around shadow">
  <div class="border-start border-2 border-danger ps-1   mx-auto" style="width:fit-content">
    <select class="form-select  rounded-3 " style="width: 250px" @change="getVariety()" id="inputGroupSelect01" v-model="searchCrop">
      <option selected value="default">Select CropType</option>
      <option v-for="(res, i) in crops" :key="i" :value="res.crop_id"  >{{res.crop}}</option>
    </select>
    <select class="form-select rounded-3 mt-3" v-if="searchCrop != 'default'" style="width: 250px" id="inputGroupSelect01" v-model="searchVariety">
      <option selected value="default">Select a Variety</option>
      <option v-for="(res, i) in varieties" :key="i" :value="res.id">{{res.variety}}</option>
    </select>
  </div>

  <i class="bi  mx-5 bi-chevron-right"></i>

  <div>
    <select class="form-select mx-auto rounded-3 my-3" style="width: 250px" @change="getTowns()" id="inputGroupSelect01" v-model="searchRegion">
      <option  value="default">Choose Region</option>
      <option v-for="(res, i) in regions" :key="i" :value="res.region_id" >{{res.region}}</option>
    </select>

    <div class="form-check form-switch  d-flex justify-content-around ">
      <label class="form-check-label " for="flexSwitchCheckDefault"> Month Chart</label>
      <input class="form-check-input mx-0" v-model="chartSwitch" type="checkbox" role="switch" id="flexSwitchCheckDefault">
      <label class="form-check-label " for="flexSwitchCheckDefault"> Gnatt Chart</label>
    </div>
    <p class="text-danger" style="font-size:13px" v-if="errMsg"><i class="bi bi-exclamation-circle" ></i>  all fields required</p>

  </div>


  <i class="bi mx-5 bi-chevron-right"></i>

  <div class="mx-auto border-end border-2 pe-1 border-danger" style="width:fit-content"> 
    <select class="form-select  rounded-3 " style="width: 250px" id="inputGroupSelect01" @change="searchVariety == null || searchVariety == 'default' ?  errFx() : getCropData()" v-model="searchTown">
      <option selected value="default">Change District</option>
      <option v-for="(res, i) in towns" :key="i" :value="res.town_id">{{res.town}}</option>
    </select>
    <button style="font-size:12px" data-bs-toggle="offcanvas" data-bs-target="#resources" class="btn btn-danger btn-sm rounded-4 mt-1 w-100"><i class="bi me-1 bi-bootstrap-reboot"></i> Resources</button>
  </div>
</div>
    <p class="text-center fw-bold" style="margin-top: 9%;"  v-if="cropdata == null || cropdata.length == 0" >no result found</p>

<!-- month chart******************************************************** -->
  <div  class="row croppingPage  mx-0" v-if="!chartSwitch" >
    <div class="col p-4 ">
      <div class="row row-cols-1 row-cols-md-3  pb-3  g-3" style=" overflow-y: scroll;"  v-if="cropdata" :class="close ? 'row-cols-md-3 row-cols-lg-4' : 'row-cols-md-2 row-cols-lg-3'">
        <div class="col monthlyCard" ref="monthlyCard" id="" v-for="(data, i) in cropdata" :key="i" aria-controls="offcanvasExample" >
          <div class="card rounded-5 shadow border-0"    style="width: 100%; background-color:#d2d2d25c" @click="setCardHeight()" >
            <div class="card-body p-1 my-2 ">
              <p class="card-title rounded-3 px-2 ms-3 bg-pink text-light" style="font-size:12px;width:max-content">{{translateMonth(i)}}</p>
              <div v-if="data.length != 0" class="container d-flex align-items-center justify-content-around">
                <div class="w-100"  data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" >
                  <div class="progress my-2"  v-for="(activity, x) in data" :key="x" role="progressbar"  @click="activityDetails = activity"  aria-label="Example with label" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar overflow-visible text-light text-start rounded-pill"  :class="activityColor(activity.activity)" :style="'width:'+ Math.floor(Math.random() * (100 - 80) + 80)+'%'" ><p class="m-0 px-2 " ><span class="d-inline-block text-truncate mt-1" style="max-width: 100px;"> {{activity.activity }}</span> <b class="float-end mt-1">{{calendar_day(activity.activityStart)}} </b></p></div>
                  </div>
                </div>
              </div>
              <div v-else class="container d-flex align-items-center justify-content-around" >
                <div class="w-100">
                  <div class="progress my-5"  role="progressbar" aria-label="Example with label" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar overflow-visible   bg-secondary text-light text-center " style="width: 100%">No Activity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <hr class="shadow-lg">  
    <br>

    </div>
  </div>  

  <Gantt class="my-4" @activitySelected="ganttEvent" :cropData="cropdataActivity" v-else></Gantt>

  <a class="btn btn-primary" hidden ref="ganttCanvas" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
    Link with href
  </a>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="resources" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Resources</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body text-start">
        <div>
          <h5>Bundle Services</h5>
          <div class="card my-2" v-for="(bundle_service, i) in filteredArray" :key="i">
            <div class="card-body">
              <ul class="list-group list-group-flush" style="font-size:13px"  v-for="(service, key) in bundle_service" :key="key">
                <li class="list-group-item py-0 d-flex justify-content-between align-items-start" >
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">{{key.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}}</div>
                    <span class="text-muted">{{service}}</span>
                  </div>
                  <!-- <span class="badge bg-primary rounded-pill">14</span> -->
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="offcanvas offcanvas-end shadow border-0" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Comments</h5>
      <button type="button" style="height:10px" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
        <div class="text-start" style="font-size:14px" v-if="activityDetails != null">
          <div>
            <h4 for="" style="font-size:15px" class="fw-bold ps-2">{{findCrop.toUpperCase()}} {{findVariety.variety}}</h4>
          </div>
          <div>
            <div class=" d-flex justify-content-around">
              <div class="bg-success mt-2 me-1 rounded-pill " style="width:100px; height:1px"></div>
              <label class="fw-bolder text-center" >Fertilizer Recommendation </label>
              <div class="bg-success mt-2 me-1 rounded-pill " style="width:100px; height:1px"></div>
            </div>
            <p class="my-5 mx-auto text-center" style="font-size: 15px;" v-if="findVariety.fert_recom == '' || findVariety.fert_recom == null || findVariety.fert_recom.length <= 0 " >No fertilizers Found</p>
            <p class="text-center mx-auto" v-else>Download File <a :href="`https://aghub.miphost.com/api/cc/download/${findVariety.fert_recom}`" > {{findVariety.variety}} Fertilizer</a></p>

          </div>
        </div>
        <div class="offcanvas-body text-start" v-if="activityDetails != null" style="font-size:14px">
          <div>
            <h4 for="" style="font-size:15px" class="fw-bold">{{activityDetails.activity}}</h4>
          </div>
          <div>
            <div class=" d-flex justify-content-around">
              <div class="bg-success mt-2 me-1 rounded-pill " style="width:100px; height:1px"></div>
              <label class="fw-bolder text-center" >Risks Involved </label>
              <div class="bg-success mt-2 me-1 rounded-pill " style="width:100px; height:1px"></div>
            </div>
            <div class="accordion "  v-if="activityDetails.risk_advisory.risk.length > 0" id="accordionExample">
              <div class="accordion-item bg-transparent border-0" v-for="(risk, i) in activityDetails.risk_advisory.risk" :key="i">
                <h4 class="accordion-header" >
                  <button style="font-size: 14px" class="accordion-button py-2  bg-transparent text-black collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+ i" aria-expanded="false" :aria-controls="'collapse' + i">
                  {{i+1}}. {{risk.risk}}
                  </button>
                </h4>
                <div :id="'collapse'+ i" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div class="accordion-body ms-4 text-start">
                    - {{risk[`${findCrop}_risks_advisories_tbls`][0].advisory}}
                  </div>
                </div>
              </div>
            </div>
            <p class="my-5 mx-auto text-center" style="font-size: 15px;" v-else>No Risks(and Adviories) Found</p>

          </div>
        </div>
    </div>


</template>

<script>
// @ is an alias to /src
import Gantt from "../components/gantt.vue";

import axios from 'axios';

export default {
  name: "CroppingCalendar",
  components: {
    Gantt
  },
  data() {
    return {
      chartSwitch: false,
      searchRegion: "default",
      searchCrop: "default",
      searchTown: "default",
      searchVariety: "default",
      activityDetails:null,
      close:true,
      cropdata:[],
      cropdataActivity:[],
      initHeight:0,
      crops:[],
      errMsg:false,
      towns:[],
      varieties:[],
      regions:[]
    };
  },
  mounted(){
    this.getCrops()
    this.getRegions()

    this.$nextTick(() => {
      window.addEventListener('resize', this.setCardHeight);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setCardHeight);
  },
  computed: {
    findVariety(){
      let found = this.varieties.find(variety => variety.id === this.searchVariety)
      return found
    },
    findCrop(){
      let found = this.crops.find(crop => crop.crop_id === this.searchCrop)
      return found.crop.toLowerCase()
    },
    filteredArray() {
      let newArray = this.regions.filter(region => region.region_id === this.searchRegion);
      if (newArray.length > 0) {
        return newArray[0].bundle_services
      }
    },
    selectionChange() {
      for (var i = 0; i < this.cropdata.length; i++) {
        if (
          this.cropdata[i].crop == this.searchCrop &&
          this.cropdata[i].region == this.searchRegion &&
          this.cropdata[i].town == this.searchTown 
        ) {
          return  this.cropdata[i];
        } 
      }
    },
  },
  methods:{
    errFx(){
      this.errMsg = true
      setInterval(() => {this.errMsg = false}, 3000);
    },
    ganttEvent(data){
      this.$refs.ganttCanvas.click()

      this.activityDetails = {
        activity : data.ganttBarConfig.label,
        risk_advisory : data.risk_advisories,
      }
    },
    activityColorHx(activity){

      const words = activity.toLowerCase().split(/[ /]/);
      if (words.includes('site')) {
        return '#808080'
      }

      if (words.includes('land')) {
          return '#9b6825'
      }

      if (words.includes('planting')) {
          return '#0a9233'
      }

      if (words.includes('rainonset')) {
          return '#1e98bd'
      }

      if (words.includes('basal')) {
          return '#942dad'
      }

      if (words.includes('fertilizer')) {
          return '#942dad'
      }

      if (words.includes('top')) {
          return '#963a3a'
      }

      if (words.includes('weed')) {
          return '#292929'
      }

      if (words.includes('pest')) {
          return '#d71111'
      }

      if (words.includes('harvesting')) {
          return '#d2be00'
      }
      if (words.includes('test')) {
          return 'bg-lemon'
      }

      if (words.includes('innoculation')) {
          return '#00177e'
      }
    },
    activityColor(activity){

      const words = activity.toLowerCase().split(/[ /]/);
      if (words.includes('site')) {
      }

      if (words.includes('land')) {
          return 'bg-brown'
      }

      if (words.includes('planting')) {
          return 'bg-success'
      }

      if (words.includes('rainonset')) {
          return 'bg-info'
      }

      if (words.includes('basal')) {
          return 'bg-orange'
      }

      if (words.includes('fertilizer')) {
          return 'bg-orange'
      }

      if (words.includes('top')) {
          return 'bg-wine'
      }

      if (words.includes('weed')) {
          return 'bg-dark'
      }

      if (words.includes('pest')) {
          return 'bg-orange'
      }

      if (words.includes('harvesting')) {
          return 'bg-warning'
      }
      if (words.includes('test')) {
          return 'bg-lemon'
      }

      if (words.includes('innoculation')) {
          return 'bg-warning'
      }
    },
    async setCardHeight() {
      await this.$nextTick();


      const cardElements = this.$refs.monthlyCard;
      const heights = Array.from(cardElements).map(card => card.children[0].clientHeight);
      const newHeight = Math.max(...heights);


        cardElements.forEach(card => {
          card.children[0].style.height = newHeight +'px';
        });

      // const cardElements = this.$refs.monthlyCard;
      // const screenWidth = window.innerWidth;
      // const activityEl = this.$refs.activityCard;

      // const activityHeights = Array.from(activityEl).map(el => el.clientHeight);
      // const heights = Array.from(cardElements).map(card => card.clientHeight);

      // const newActHeight = Math.max(...activityHeights);
      // const newHeight = Math.max(...heights);

      // var computedHeight = newHeight

      // if(newActHeight > newHeight) computedHeight = (newActHeight * 0.2) + newHeight 
      // if(this.close && this.initHeight == newHeight) computedHeight = newHeight

      // console.log(newActHeight, newHeight, computedHeight, this.initHeight)

      // this.initHeight = computedHeight

      //   cardElements.forEach(card => {
      //     card.style.height = computedHeight +'px';
      //   });
    },
    calendar_day(x){
      const event = new Date(x);
      if( new Date(x).getFullYear() != new Date().getFullYear()){
        return event.toDateString().split(' ').slice(1,4).join(' ')
      }else{
        return event.toDateString().split(' ').slice(1,3).join(' ')
      }
      
    },
    cropwithOnset(){
    var landpreparation, planting, basalfertApp, rainOnset, topDressFertApp, weedingOne, weedingTwo, droughtStess, perstidideApp, cobForm, haverting

      for (var i = 0; i < this.cropdata.length; i++) {

        rainOnset = new Date(this.cropdata[i].rain)
        this.cropdata[i].monthlyData = []

        for(var x = 0; x < 12; x++){
          this.cropdata[i].monthlyData.push([])
        }

        this.cropdata[i].monthlyData[new Date(this.cropdata[i].rain).getMonth()].push({'date' :  new Date(this.cropdata[i].rain), 'activity' : 'Rain Onset' })


        landpreparation = new Date(rainOnset).setDate(rainOnset.getDate() - 30);
        // this.cropdata[i].landpreparation = [new Date(landpreparation)]
        this.cropdata[i].monthlyData[new Date(landpreparation).getMonth()].push({'date' : new Date(landpreparation), 'activity' : 'Land Preparation' })

        planting = new Date(landpreparation).setDate(new Date(landpreparation).getDate() + 7);
        // this.cropdata[i].planting = [new Date(planting)]
        this.cropdata[i].monthlyData[new Date(planting).getMonth()].push({'date' : new Date(planting),'activity' : 'Planting' })

        basalfertApp = new Date(planting).setDate(new Date(planting).getDate() + 14); //*** */
        // this.cropdata[i].firtilizerB = [new Date(basalfertApp)]
        this.cropdata[i].monthlyData[new Date(basalfertApp).getMonth()].push({'date' :new Date(basalfertApp),'activity' : 'Fertilizer App(Basal)'})


        topDressFertApp = new Date(basalfertApp).setDate(new Date(basalfertApp).getDate() + 21);//** */
        // this.cropdata[i].firtilizerT = [new Date(topDressFertApp)]
         this.cropdata[i].monthlyData[new Date(topDressFertApp).getMonth()].push({'date' :new Date(topDressFertApp),'activity' : 'Fertilizer App(Top Dress)' })


        weedingOne = new Date(planting).setDate(new Date(planting).getDate() + 30); 
        // this.cropdata[i].weeding = [new Date(weedingOne)]
        this.cropdata[i].monthlyData[new Date(weedingOne).getMonth()].push({'date' :new Date(weedingOne),'activity' : 'Weeding' })

        weedingTwo = new Date(weedingOne).setDate(new Date(weedingOne).getDate() + 30); //** */
        // this.cropdata[i].weeding.push(new Date(weedingTwo))
        this.cropdata[i].monthlyData[new Date(weedingTwo).getMonth()].push({'date' :new Date(weedingTwo),'activity' : 'weeding' })

        perstidideApp = new Date(planting).setDate(new Date(planting).getDate() + 40);
        // this.cropdata[i].pesticide = [new Date(perstidideApp)]
        this.cropdata[i].monthlyData[new Date(perstidideApp).getMonth()].push({'date' :new Date(perstidideApp),'activity' : 'Pesticide App' })
        
        haverting = new Date(planting).setDate(new Date(planting).getDate() + 70);
        // this.cropdata[i].Harvesting = [new Date(haverting)]
        this.cropdata[i].monthlyData[new Date(haverting).getMonth()].push({'date' :new Date(haverting),'activity' : 'Haversting' })
      }

      // console.log(this.cropdata)
    },
    formatDate(originalDate) {
      const date = new Date(originalDate);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');

      // Format the date in the desired string format
      const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
      return formattedDate;
    },

    getCropData(){
      axios.post('https://aghub.miphost.com/api/cc/calculate',
      {
        crop: this.searchCrop,
        town: this.searchTown,
        variety: this.searchVariety
      })
      .then(response => {
        this.cropdata = response.data[0]
        this.cropdataActivity = []
        response.data[1].forEach(activity => {
         let createData = { 
            label:activity.activity_code,
            barsList : [
              {
                beginDate: this.formatDate(activity.activityStart),
                endDate: this.formatDate(activity.activityEnd),
                activityStart:activity.activityStart,
                activityEnd:activity.activityEnd,
                risk_advisories: activity.risk_Advisory,
                ganttBarConfig: {
                  id: activity.activityId,
                  label: activity.activity,
                  hasHandles: false,
                  immobile:true,
                  bundle: "myBundle",
                  style: {
                    background: this.activityColorHx(activity.activity),
                    color: "white",
                    borderRadius: "20px"
                  }
                }
              }
            ],
          }
          this.cropdataActivity.push(createData)
        });
        this.cropdataActivity.sort((a, b) => a.barsList[0].ganttBarConfig.id - b.barsList[0].ganttBarConfig.id);

        // const date1 = new Date(this.cropdataActivity[0].barsList[0].activityStart);
        // const date2 = new Date(this.cropdataActivity[this.cropdataActivity.length -1].barsList[0].activityEnd);

       
      })
      .catch(error =>{
        console.log(error)
      })
    },
    getCrops(){
      axios.get('https://aghub.miphost.com/api/cc/crops')
      .then(response => {
        this.crops = response.data
      })
      .catch(error =>{
        console.log(error)
      })
    },
    getVariety(){
      axios.get('https://aghub.miphost.com/api/cc/varieties/'+ this.searchCrop)
      .then(response => {
        this.varieties = response.data
      })
      .catch(error =>{
        console.log(error)
      })
    },
    getTowns(){
      axios.get('https://aghub.miphost.com/api/cc/towns/'+ this.searchRegion)
      .then(response => {
        this.towns = response.data
      })
      .catch(error =>{
        console.log(error)
      })
    },
    getRegions(){
      axios.get('https://aghub.miphost.com/api/cc/regions')
      .then(response => {
        this.regions = response.data
      })
      .catch(error =>{
        console.log(error)
      })
    },
    translateMonth(monthIndex){
      let months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      let monthName = months[monthIndex]; // Get the corresponding month name
      return monthName
    },
    getRegionFullName(shortHand) {
    let regionName = '';

    switch (shortHand.toLowerCase()) {
      case 'ah':
        regionName = 'Ashanti Region';
        break;
      case 'ba':
        regionName = 'Brong-Ahafo Region';
        break;
      case 'ce':
        regionName = 'Central Region';
        break;
      case 'ea':
        regionName = 'Eastern Region';
        break;
      case 'gr':
        regionName = 'Greater Accra Region';
        break;
      case 'nr':
        regionName = 'Northern Region';
        break;
      case 'oe':
        regionName = 'Oti Region';
        break;
      case 'sv':
        regionName = 'Savannah Region';
        break;
      case 'ue':
        regionName = 'Upper East Region';
        break;
      case 'uw':
        regionName = 'Upper West Region';
        break;
      case 'wr':
        regionName = 'Western Region';
        break;
      default:
        regionName = 'Invalid shorthand';
    }
    return regionName;
  },
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  },
  watch:{
    searchRegion(newData, OldData){
      if(newData != 'default' || newData != OldData) {
        this.getTowns(this.searchRegion)
      }
    },
    async selectionChange(newValue) {
      if (newValue) {
        this.setCardHeight()
        // const cardElements = this.$refs.monthlyCard;
        // const heights = Array.from(cardElements).map(card => card.clientHeight);
        // const newHeight = Math.max(...heights);

        // cardElements.forEach(card => {
        //   card.style.height = newHeight + 'px';
        // });
      }
    },
    // async selectionChange(newValue) {
    //   if (newValue) {
    //     const newHeight = await new Promise(resolve => {
    //       this.$nextTick(() => {
    //         const cardElements = this.$refs.monthlyCard;
    //         const heights = Array.from(cardElements).map(card => card.clientHeight);
    //         const calculatedHeight = Math.max(...heights);
    //         resolve(calculatedHeight);
    //       });
    //     });

    //     for (const card of cardElements) {
    //       card.style.height = newHeight + 'px';
    //     }
    //   }
    // }
  }
};
</script>

<style scoped>
select.form-select::-ms-expand {
    display: none !important;
}

/* Style the Bootstrap icon that replaces the arrow */
.form-select::after {
    content: '\f157'; /* Replace with the Bootstrap icon code you want */
    font-family: 'Font Awesome 5 Free'; /* Make sure to include the Bootstrap icon font */
    position: absolute;
    top: 50%;
    right: 15px; /* Adjust the position as needed */
    transform: translateY(-50%);
    pointer-events: none;
}


.form-control, .form-select{
    height: 25px !important;
    min-height: unset;
    font-size: 0.7rem !important;
    background-color: #cfcfcf !important;
    border: none;
}

.bg-pink{
  background-color: rgb(43, 82, 7) !important;
}

  .col .activites{
  width: min-content !important;
}

label{
  font-weight: 400 !important;
  font-size: 13px !important;
  font-family: 'Open Sans', sans-serif !important;
}
.calendar {
  padding: 10px;
  padding-bottom: 50px; /* Height of the footer */
}
.rounded-5{
  border-radius: 15px !important;
}
.rounded-4{
  border-radius: 10px !important;
}
* {
  box-sizing: border-box;
}
.form-check-input:disabled {
  opacity: 1 !important;
}
.form-check-input {
  border: none;
}
.form-check-input:disabled ~ .form-check-label,
.form-check-input[disabled] ~ .form-check-label {
  opacity: 1 !important;
}

.bg-img {
  /* The image used */
  background-image: url("https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80");

  /* Control the height of the image */
  min-height: 250px;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.shadow {
    box-shadow: 0.3rem 0.2rem 0.5rem rgba(0,0,0,.15)!important;
}
.card:hover{
    box-shadow: 0.3rem 0.2rem 0.5rem rgba(0, 0, 0, 0.251)!important;
}
.form-select {
  background-color: #ffffffb9;
  font-size: 0.8rem;
  color: rgb(43, 40, 40);
  font-weight: 500;
}
.form-select option {
  background-color: rgba(255, 255, 255, 0.521);
  border-radius: 2px;
  opacity: 0.5;
}
.form-select:focus {
  border-color: #86b7fe40;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 3%);
}
/* Add styles to the form container */
.bg-img .container {
  position: absolute;
  margin: 20px;
  max-width: 40%;
  padding: 12px;
  border-radius: 5px;
  background-color: rgba(85, 85, 85, 0.514);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

@media screen and (max-width: 530px) {
  .bg-img .container {
    max-width: 80%;
    left: 45%;
  }
}

@media screen and (max-width: 530px) {
  .calendar {
    margin-inline: auto;
    width: 80%;
    overflow-x: auto;
  }
  .calendar::after {
    content: "<ouPlease Scroll";
    font-size: 10px;
    /* margin-bottom: 20%; */
  }
  .calendar_item {
    width: 1000px;
  }
}
</style>

<style scoped>
.progress-bar {
  color: #efefef;
}
.bg-brown {
  background-color: #9b6825 !important;
}
.bg-orange {
  background-color: #942dad !important;
}
.bg-success {
  background-color: #0a9233 !important;
}
.bg-warning {
  background-color: #d2be00  !important;
}
.bg-info {
  background-color: #1e98bd !important;
}
.bg-dark {
  background-color: #292929 !important;
}
.bg-danger {
  background-color: #da421c !important;
}
.bg-wine{
  background-color: #963a3a !important;
}
.bg-volet{
  background-color: #ff04a3 !important;
}
.bg-lemon{
  background-color: #00177e !important;
}

.form-check-input:checked {
  background-color: #0a9233;
  border-color: #468d00;
}
</style>
