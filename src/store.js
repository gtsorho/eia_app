import { createStore } from 'vuex';
import axios from 'axios'
import { center } from '@turf/turf'
import { compileScript } from '@vue/compiler-sfc';


const store = createStore({
  state: {
    crops:[],
    regions:[],
    districts:[],
    cropData: [],
    region:null,
    district:null,
    crop:null,
    isLoader:false,
    cropDataActivity: [],
    selectedCrop:'default',
    selectedRegion:'default',
    selectedDistrict:'default',
    mapComponentInstance :null
  },
  mutations: {
    setCrops(state, crops) {
      state.crops = crops;
    },
    setCrop(state, crop) {
      state.crop = crop;
    },
    setCropData(state, cropData){
      state.cropData = cropData
    },
    setRegions(state, regions) {
      state.regions = regions;
    },
    setDistrict(state, district) {
      state.district = district;
    },
    setRegion(state, region) {
      state.region = region;
    },
    setDistricts(state, districts) {
      state.districts = districts; 
    },
    setSelectedCrop(state, crop) {
      state.selectedCrop = crop;
    },
    setSelectedRegion(state, region) {
      state.selectedRegion = region; 
    },
    setSelectedDistrict(state, district) {
      state.selectedDistrict = district; 
    },
    setCropDataActivity(state, cropDataActivity){
      state.cropDataActivity = cropDataActivity
    },
    setMapComponentInstance(state, componentInstance) {
      state.mapComponentInstance = componentInstance;
    },
    setIsLoader(state, isLoader) {
      state.isLoader = isLoader;
    },

  },
  actions: {
    async fetchCrops({ commit }) {
      try {
        const response = await axios.get('https://aghub.miphost.com/api/cc/crops');
        commit('setCrops',  response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchRegions({ commit }) {
      commit('setIsLoader', true);
      try {
        const response = await axios.get('https://aghub.miphost.com/api/cc/regions');
        commit('setRegions', response.data);
        commit('setIsLoader', false);
      } catch (error) {
        console.log(error);
      }
    },
    async getDistricts({ commit }, regionId) {
      try {
        commit('setIsLoader', true);
        const response = await axios.get(`https://aghub.miphost.com/api/cc/districts/${regionId}`);
        commit('setDistricts', response.data);
        commit('setIsLoader', false);
      } catch (error) {
        console.log('Error fetching districts:', error);
      }
    },
    async getDistrictById({ commit },district_id) {
      try {
        const response = await axios.get('https://aghub.miphost.com/api/cc/district/'+ district_id);
        commit('setDistrict', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getRegionById({ commit },region_id) {
      try {
        const response = await axios.get('https://aghub.miphost.com/api/cc/region/'+ region_id);
        commit('setRegion', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getCropById({ commit }, crop_id) {
      try {
        const response = await axios.get('https://aghub.miphost.com/api/cc/crop/'+  crop_id);
        commit('setCrop', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getCropData({ commit, state }) {
      try {
        commit('setIsLoader', true);
        const response = await axios.post('https://aghub.miphost.com/api/cc/calculate', {
          crop: state.selectedCrop,
          district: state.selectedDistrict,
        });
        commit('setCropData', response.data[0]);
        const cropDataActivity = response.data[1].map(activity => ({
          label: activity.activity_code,
          barsList: [
            {
              beginDate: formatDate(checkYear(activity.activityStart)),
              endDate: formatDate(checkYear(activity.activityEnd)),
              activityDetails: activity.activityDetails,
              activityStart: activity.activityStart,
              activityEnd: activity.activityEnd,
              risk_advisories: activity.risk_Advisory,
              ganttBarConfig: {
                id: activity.activityId,
                label: activity.activity,
                hasHandles: false,
                immobile: true,
                bundle: "myBundle",
                style: {
                  background: activityColorHx(activity.activity),
                  color: "white",
                  borderRadius: "20px"
                }
              }
            }
          ],
        })).sort((a, b) => a.barsList[0].ganttBarConfig.id - b.barsList[0].ganttBarConfig.id);
        commit('setCropDataActivity', cropDataActivity);
        commit('setIsLoader', false);
      } catch (error) {
        console.log(error);
      }
    },
    async updateRegion({ commit, dispatch, state}, region) {
      commit('setSelectedRegion', region);  
      dispatch('getDistricts', region); 
      dispatch('getRegionById', region) 

      if(state.crop && state.district){
        await dispatch('getCropData');

        const center = calculateCenter(state.district);
        let event = {latlng:{lat:center[0], lng:center[1]}, layer:{feature:state.district}}

        dispatch('mapClickEvent', event); 
      }
    },
    async updateDistrict({ commit, dispatch , state}, district) {
      commit('setSelectedDistrict', district);  

      if(state.crop){
        await dispatch('getCropData');
      }

      await dispatch('getDistrictById', district)

      const center = calculateCenter(state.district);
      let event = {latlng:{lat:center[0], lng:center[1]}, layer:{feature:state.district}}

      dispatch('mapClickEvent', event);  
    },
    async updateCrop({ commit, dispatch, state }, crop) {
      commit('setSelectedCrop', crop);  
      dispatch('getCropById', crop)

      if(state.region && state.district){
        await dispatch('getCropData');

        const center = calculateCenter(state.district);
        let event = {latlng:{lat:center[0], lng:center[1]}, layer:{feature:state.district}}

        dispatch('mapClickEvent', event);
      }
    },
    async mapClickEvent({ state },e) {
      const componentInstance = state.mapComponentInstance;
    
      if (componentInstance && typeof componentInstance.mapClickEvent === 'function') {
        componentInstance.mapClickEvent(e); 
      } else {
        console.error('mapClickEvent is not a function or componentInstance is null');
      }
    }
  
  },
  getters: {
    crop: state => state.crop,
    crops: state => state.crops,
    district: state => state.district,
    districts: state => state.districts,
    getRegion: state => state.searchRegion,
    region: state => state.region,
    getDistrict: state => state.searchDistrict,
    getCrop: state => state.searchCrop,
    selectedRegion: state => state.selectedRegion,
    selectedDistrict: state => state.selectedDistrict,
    selectedCrop: state => state.selectedCrop,
    getCropData: state => state.cropData,
    getCropDataActivity: state => state.cropDataActivity,
    isLoader: state => state.isLoader,

  }  
});

export default store;

// Helper Functions
function calculateCenter(district) {
  if(district){
    const xPadding = 1; const yPadding = 1
    let geojsonData = {
      type: "Feature",
      geometry: {
        type: district.geometry.type,
        coordinates: district.geometry.coordinates
      },
      properties: {
        district: district.district,
        district_id: district.district_id
      }
    }
    const centerPoint = center(geojsonData);
    let [x, y] = centerPoint.geometry.coordinates;
    
    x = x * xPadding;
    y = y * yPadding;
  
    return [y,x];
  }
}

function formatDate(originalDate) {
  const date = new Date(originalDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function checkYear(date) {
  let newDate = new Date(date);
  let currentYear = new Date();
  return newDate.setFullYear(currentYear.getFullYear());
}

function activityColorHx(activity) {
  const words = activity.toLowerCase().split(/[ /]/);
  if (words.includes('site')) {
    return '#808080';
  } else if (words.includes('land')) {
    return '#9b6825';
  } else if (words.includes('planting')) {
    return '#0a9233';
  } else if (words.includes('rainonset')) {
    return '#1e98bd';
  } else if (words.includes('basal')) {
    return '#942dad';
  } else if (words.includes('fertilizer')) {
    return '#942dad';
  } else if (words.includes('top')) {
    return '#963a3a';
  } else if (words.includes('weed')) {
    return '#292929';
  } else if (words.includes('pest')) {
    return '#d71111';
  } else if (words.includes('harvesting')) {
    return '#d2be00';
  } else if (words.includes('test')) {
    return 'bg-lemon';
  } else if (words.includes('innoculation')) {
    return '#00177e';
  }
}