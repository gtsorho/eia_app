<template>
  <div  class="position-relative rounded-5 ">
    <div
      id="searchbar"
      class="ui container bg-light  rounded-5 position-absolute w-auto p-1 mt-3"
    >
      <p class="text-danger px-3 m-0 fw-bolder" style="font-size:13px"><i class="bi bi-exclamation-triangle-fill"></i> Select Crop Type Above </p>
    </div>
    <l-map ref="map" style="height: 75vh; width: 100%;" class=" rounded-5" v-model:zoom="zoom" :center="center" >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-geo-json
        @click="onRegionClick"
        v-if="geojsonRegionData"
        :geojson="geojsonRegionData"
        :options-style="geoStyler"
        @tooltipopen="onToolTipOpen"
      >
      <l-tooltip class=" bg-light ">
        Region: {{msg.region}}
      </l-tooltip>
      </l-geo-json>
      <l-geo-json
        v-if="geojsonDistrictData"
        @click="onDistrictClick"
        :geojson="geojsonDistrictData"
        :options-style="geoStylerTwo"
        @tooltipopen="onToolTipOpen"
      >
        <l-tooltip class=" bg-light ">District: {{msg.district}}</l-tooltip>
      </l-geo-json>
      <l-marker v-if="marker" :lat-lng="marker.latlng" :ref="'marker'">
        <l-popup >
          <div v-if="crop">
            <span class="badge bg-secondary text-light" style="  text-wrap: auto;">{{ marker.address }}</span>          
            <div v-if="monthActivities">
              <div v-if="monthActivities[currentIndex]">
                <p style="text-wrap: auto;" >
                  <span  class="fw-bold">{{monthActivities[currentIndex].activity}}</span>
                  <span class="badge bg-danger text-light mx-2 cursor-pointer">{{ getMonthName(monthIndex) }}</span>
                </p>
                <span v-if="!fertilizerShow">
                  <p class="fw-normal d-inline">{{monthActivities[currentIndex].activityContent.shortTxt}}
                  </p> 
                </span>
                <span v-if="!checkFertilizer(monthActivities[currentIndex].activity) && fertilizerShow" >
                  <p class="fw-normal d-inline">{{monthActivities[currentIndex].activityContent.longTxt}}
                  </p>
                </span>
                <span class="badge bg-dark text-light mx-2 cursor-pointer" @click="fertilizerShow = !fertilizerShow">{{fertilizerShow ? 'less' : 'more'}}</span>

                <!-- <div v-if="checkFertilizer(monthActivities[currentIndex].activity) && fertilizerShow">
                  <ul class="list-group list-group-horizontal" v-for="(value, key) in filteredData" :key="key">
                    <li class="list-group-item" style="width: 300px;">{{ key }}</li>
                    <li class="list-group-item" style="width: 150px;">{{ parseFloat(value).toFixed(2) }}</li>
                  </ul>
                </div> -->

                <router-link 
                  :to="{ name: 'More', params: { index: monthActivities[currentIndex].activity } }" 
                  class="btn btn-success text-light my-2 py-0 w-100" style="font-size:14px">
                  View Advisory
                </router-link>
              </div>
              <p class="text-danger" v-else style="font-size: 13px;">No activity for this month</p>
                <div class="d-flex justify-content-between">
                    <i class="bi text-dark fs-5 bi-arrow-left-circle-fill" @click="prevCard()"></i>
                    <i class="bi text-dark fs-5 bi-arrow-right-circle-fill" @click="nextCard()"></i>
                </div>
                <div class="d-flex justify-content-end">
                  
                </div>
            </div>
          </div >
          <p v-else class="text-danger"><i class="bi bi-exclamation-triangle-fill"></i>Select Crop Type above</p>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTooltip,
  LTileLayer,
  LGeoJson,
  LPopup,
  LMarker,
} from "@vue-leaflet/vue-leaflet";
import { mapState, mapActions, mapGetters } from 'vuex';
import { center } from '@turf/turf'

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LPopup,
    LTooltip,
    LMarker,
  },
  props:{
    regions:Array,
    selectedRegion:String,
    selectedDistrict:String,
    allMonthActivities:Object,
    redirect_more: {
      type: Function,
    },
    districtWithFertilizer:Object
  },
  emits: ['selectLocation', 'redirect_more'],
  data() {
    return {
      fertilizerShow:false,
      currentIndex: 0,
      monthIndex:0,
      advisories: ["Card 1", "Card 2", "Card 3"],
      msg: [],
      jsonData: [],
      cachedIndex: localStorage.getItem("lunrIndex"),
      index: 0,
      districtData: {},
      searchInput: "",
      zoom: 6.2,
      center:[],
      localSelectedRegion: this.selectedRegion,
      localSelectedDistrict: this.selectedDistrict,
      selectedTown:'',
      geojson: null,
      marker: null,       
      filteredDistricts: null,
      geoStyler: (feature) => ({
        opacity: feature.properties.code / 100000,
        radius: 8,
        fillColor: "blue",
        color: "blue",
        weight: 2,
        fillOpacity: 0,
      }),
      geoStylerTwo: (feature) => ({
        opacity: feature.properties.code / 100000,
        radius: 8,
        fillColor: "#ffa700",
        color: "#ffa700",
        weight: 1,
        fillOpacity: 0.1, 
      }),
    };
  },
  async created() {
    this.center = [7.998338, -1.213402]
    this.monthIndex = this.getMonthOfYear()
  },
  mounted() {
    this.$store.commit('setMapComponentInstance', this); 
  },
  methods: {
    ...mapActions(['updateRegion', 'updateDistrict']),
    checkFertilizer(str){
      return str.toLowerCase().includes('fertilizer');
    },
    onToolTipOpen(data) {
      this.msg.region = data.layer.feature.properties.region
      this.msg.district = data.layer.feature.properties.district
    },   
    async reverseGeocode(lat, lng) {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const address = data.address;
        const town = address.town || address.city || address.village || 'Unknown location';
        return [data.display_name, town];
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    },

    onDistrictClick(event) {
      const layer = event.layer || event.target;
      if (layer.feature && layer.feature.properties) {
        const district = layer.feature.properties.district_id;
        this.updateDistrict(district);
        this.mapClickEvent(event)
      } else {
        console.error('Clicked layer does not contain feature properties.');
      }
    },
    onRegionClick(event) {
      const layer = event.layer || event.target;
      if (layer.feature && layer.feature.properties) {
        const region = layer.feature.properties.region_id;
        this.updateRegion(region);
      } else {
        console.error('Clicked layer does not contain feature properties.');
      }
    },
    async mapClickEvent(e) {
      const { lat, lng } = e.latlng;
      const data = await this.reverseGeocode(lat, lng);
      
      this.$refs.map.leafletObject.setView([lat, lng], 8);

      this.marker = {
        latlng: [lat, lng],
        address: `${data[0] ? `${data[0]}` : ""}`,
      };
      this.$nextTick(() => {
        if (this.$refs.marker) {
          this.$refs.marker.leafletObject.openPopup();
        }
      });
    },
    nextCard() {
      if (this.currentIndex < this.monthActivities.length - 1) {
        this.currentIndex++;
      } else {
        if (this.monthIndex < this.allMonthActivities.length - 1) {
          do {
            this.monthIndex++;
          } while (this.monthIndex < this.allMonthActivities.length - 1 && this.allMonthActivities[this.monthIndex].length == 0);

          this.currentIndex = 0;
        }
      }
    },
    prevCard() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        if (this.monthIndex > 0) {
          do {
            this.monthIndex--;
          } while (this.monthIndex > 0 && this.allMonthActivities[this.monthIndex].length == 0);

          this.currentIndex = 0;
        }
      }
    },
    regionToGeoJSON(region){
      return {
        type: "Feature",
        geometry: {
          type: region.geometry.type,
          coordinates: region.geometry.coordinates
        },
        properties: {
          region: region.region,
          capital: region.capital,
          region_id: region.region_id
        }
      };
    },
    districtToGeoJSON(region){
      return {
        type: "Feature",
        geometry: {
          type: region.geometry.type,
          coordinates: region.geometry.coordinates
        },
        properties: {
          district: region.district,
          district_id: region.district_id
        }
      };
    },
    getMonthOfYear() {
      const currentDate = new Date();
      const month = currentDate.getMonth();
      return month
    },
    getMonthName(monthIndex) {
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      // Check if the index is valid
      if (monthIndex >= 0 && monthIndex < months.length) {
        return months[monthIndex];
      } else {
        return "Invalid month index";  // Handle invalid index
      }
    }
  },
  computed:{
    ...mapGetters(['districts', 'district', 'crop']),

    filteredData() {
      let filtered = { ...this.district.fertilizer_recom[0] };
      delete filtered.fertilizer_id;
      delete filtered.district_id;
      return filtered;
    },
    monthActivitiesChange(){ 
      let allActivities = ''
      if(this.monthActivities){
        this.monthActivities.map(thisMonthActivities =>{
          allActivities = allActivities + ' '+ thisMonthActivities.activity
        })
        return allActivities
      }
    },
    geojsonRegionData() {
      return {
        type: "FeatureCollection",
        features: this.regions.map(region => this.regionToGeoJSON(region))
      };
    },
    geojsonDistrictData() {
      return {
        type: "FeatureCollection",
        features: this.districts.map(district => this.districtToGeoJSON(district))
      };
    },
    monthActivities(){
      return this.allMonthActivities[this.monthIndex]
    }
  },
};
</script>

<style scoped>
#sidebar {
  text-align: justify;
  width: 400px;
  height: 700px;
  background-color: #f0f0f0;
  padding: 20px;
  overflow-y: auto;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}
#searchbar {
  top: 5%;
  left: 20%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
@media (max-width: 575.98px) {
  .w-sm-50 {
    width: 50%;
  }
  #searchbar {
    top: 5%;
    left: 35%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
}

@media (min-width: 576px) {
  .w-lg-25 {
    width: 25%;
  }
}
.leaflet-popup-content{
  min-width: 210px !important
}
</style>
