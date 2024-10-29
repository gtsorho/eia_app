<!-- <template>
  <div style="height:600px; width:100%" v-if="!timeline">
    <l-map ref="map" v-model:zoom="zoom" :center="[7.998338, -1.213402]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
        <l-geo-json :geojson="geojson" :options-style="geoStyler" @popupopen="onPopupOpen">
          <l-popup ref="popup">
            <p>{{msg.REGION}}</p>
            <p>{{msg.DISTRICT}}</p>
            <button class="btn btn-primary text-white btn-sm" @click="timeline = true">view Details</button>
          </l-popup>
        </l-geo-json >
    </l-map>  
  </div>
    <timeline-vue v-if="timeline" @backClick="timeline = false"></timeline-vue>

</template>

<script>
import "leaflet/dist/leaflet.css";
import {  LMap, LTileLayer, LGeoJson, LPopup, LMarker} from "@vue-leaflet/vue-leaflet";
import TimelineVue from '../components/timeline.vue';

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LPopup,
    LMarker,
    TimelineVue
  },
  data() {
    return {
      timeline:false,
      msg:[],
      zoom: 7,
      geojson:null,
      geoStyler: (feature) => ({
        opacity: feature.properties.code / 100000,
        radius: 8,
        fillColor: 'blue',
        color: '#fff',
        weight: 1,
        fillOpacity: 0.5,
      }),
    };
  },
  async created() {
  try {
    const response = await fetch("/Ghana_Districts.geojson");
    if (!response.ok) {
      throw new Error(`Failed to fetch GeoJSON file: ${response.statusText}`);
    }
    this.geojson = await response.json();
    console.log(this.geojson);
  } catch (error) {
    console.error(error);
  }
},
methods:{
  onPopupOpen(data){
      const popup = this.$refs.popup;
      const content = data.layer.feature.properties;
      this.msg = content
      console.log(content)
  }
}

  // async created() {
  //   const response = await fetch('./assets/files/Ghana_Districts.json' )
  //   this.geojson = await response.json();
  //   console.log(this.geojson)
  // },
};
</script>

<style></style> -->