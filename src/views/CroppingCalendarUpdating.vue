<template>
  <div class="  d-lg-flex py-2 align-items-center justify-content-around shadow">
    <!-- select a crop  -->
    <div class="border-start border-2 border-danger ps-1 " style="width:fit-content">
      <select class="form-select  rounded-3 " style="width: 250px;font-size:13px" id="inputGroupSelect01" v-model="onSelectedCrop"
        >
        <option selected value="default">Select CropType</option>
        <option v-for="(res, i) in crops" :key="i" :value="res.crop_id">{{ res.crop }}</option>
      </select>
    </div>
    <div v-if="crop">
      <div class=" border-end border-2 pe-1 mt-2 border-danger" style="width:fit-content">
        <!-- select a region -->
        <select class="form-select"  style="width: 250px;font-size:13px" v-model="onSelectedRegion" >
          <option value="default">Choose Region</option>
          <option v-for="(res, i) in regions" :key="i" :value="res.region_id">{{ res.region }}</option>
        </select>
        <!-- select a district -->
        <select v-if="region" class="form-select  rounded-3 mt-3" style="width: 250px;font-size:13px" id="inputGroupSelect01"
          v-model="onSelectedDistrict">
          <option selected value="default">Change District</option>
          <option v-for="(res, i) in districts" :key="i" :value="res.district_id">{{ res.district }}</option>
        </select>
      </div>
      <p class="text-danger" style="font-size:13px" v-if="errMsg"><i class="bi bi-exclamation-circle"></i> {{ errMsg }}
      </p>
    </div>
    

    <div>
      <button style="font-size:12px my-3" data-bs-toggle="offcanvas" v-if="region" data-bs-target="#resources"
        class="btn btn-danger btn-sm rounded-4 mt-1 w-100"><i class="bi me-1 bi-bootstrap-reboot"></i>
        Resources</button>
    </div>
  </div>

  <div class="mt-4 shadow">
    <div class="barLoader" v-if="isLoader"></div>
    <CroppingCalendarMapVue :regions="regions" :allMonthActivities="cropData"></CroppingCalendarMapVue>
  </div>

  <div class="offcanvas offcanvas-end" v-if="region" tabindex="-1" id="resources" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Resources</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body text-start">
      <div>
        <h5>Bundle Services</h5>
        <div class="card my-2" v-for="(bundle_service, i) in region.bundle_services" :key="i">
          <div class="card-body">
            <ul class="list-group list-group-flush" style="font-size:13px" v-for="(service, key) in bundle_service"
              :key="key">
              <li class="list-group-item py-0 d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">{{ key.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() +
                    word.slice(1)).join(' ') }}</div>
                  <span class="text-muted">{{ service }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>
  <br>
  <br>
</template>
<script>
// @ is an alias to /src
import CroppingCalendarMapVue from "../components/croppingCalendarMap.vue"
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: "CroppingCalendar",
  components: {
    CroppingCalendarMapVue,
  },
  data() {
    return {
    };
  },
  created() {
    this.fetchCrops()
    this.fetchRegions()
    this.setMapComponentInstance(this)
  },
  computed: {
    ...mapState(['crops', 'regions', 'districts', 'selectedRegion', 'selectedCrop', 'selectedDistrict', 'cropData', 'cropDataActivities']),
    ...mapGetters(['region','crop', 'isLoader']),
    onSelectedRegion: {
      get() {
        return this.selectedRegion;
      },
      set(value) {
        this.updateRegion(value);
      }
    },
    onSelectedDistrict: {
      get() {
        return this.selectedDistrict;
      },
      set(value) {
        this.updateDistrict(value);
      }
    },
    onSelectedCrop: {
      get() {
        return this.selectedCrop;
      },
      set(value) {
        this.updateCrop(value);
      }
    }
  },
  methods: {
    ...mapActions(['fetchCrops', 'fetchRegions', 'updateRegion', 'updateDistrict', 'updateCrop']),
    ...mapMutations(['setMapComponentInstance']),

  },
  watch: {

  }
};
</script>

<style scoped>
select.form-select::-ms-expand {
  display: none !important;
}

/* Style the Bootstrap icon that replaces the arrow */
.form-select::after {
  content: '\f157';
  /* Replace with the Bootstrap icon code you want */
  font-family: 'Font Awesome 5 Free';
  /* Make sure to include the Bootstrap icon font */
  position: absolute;
  top: 50%;
  right: 15px;
  /* Adjust the position as needed */
  transform: translateY(-50%);
  pointer-events: none;
}


.form-control,
.form-select {
  height: 30px !important;
  min-height: unset;
  font-size: 0.88rem !important;
  background-color: #cfcfcf !important;
  border: none;
}

.bg-pink {
  background-color: rgb(43, 82, 7) !important;
}

.col .activites {
  width: min-content !important;
}

label {
  font-weight: 400 !important;
  font-size: 13px !important;
  font-family: 'Open Sans', sans-serif !important;
}



.rounded-5 {
  border-radius: 15px !important;
}

.rounded-4 {
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

.form-check-input:disabled~.form-check-label,
.form-check-input[disabled]~.form-check-label {
  opacity: 1 !important;
}



.shadow {
  box-shadow: 0.3rem 0.2rem 0.5rem rgba(0, 0, 0, .15) !important;
}

.card:hover {
  box-shadow: 0.3rem 0.2rem 0.5rem rgba(0, 0, 0, 0.251) !important;
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


</style>
