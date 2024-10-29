<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container">
      <router-link :to="{ name: 'CroppingCalendar' }" style="font-size:14px"
        class="navbar-brand bg-black px-4 py-0 rounded-pill text-light " href="#">
        <i class=" bi bi-arrow-left-circle-fill"></i>
        Go Back
      </router-link>
    </div>
  </nav>

  <div class="container">
    <div class="my-5 text-start">
      <h4 for="" style="font-size:20px" class="fw-bold">{{ district.district.toUpperCase() }},
        {{ region.region.toUpperCase() }} - {{ this.crop.crop.toUpperCase() }}</h4>

      <p> <span class="fw-bold" style="font-size:14px">{{ activity.activityContent.shortTxt }} </span> {{
        activity.activityContent.longTxt }} </p>
    </div>


    <div class="shadow-lg my-5" id="moreInfo">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">More Information</h5>
      </div>
      <div class="text-start" style="font-size:14px" v-if="activityDetails != null">
        <div class="ps-3 text-end pe-3">
          <h4 for="" style="font-size:14px" class="fw-bold">{{ district.district.toUpperCase() }},
            {{ region.region.toUpperCase() }} </h4>
          <!-- <h4 for="" style="font-size:13px" class="">{{findCrop.toUpperCase()}} ({{findVariety.variety}})</h4> -->
          <h4 for="" style="font-size:13px" class="">{{ activityDetails.activity }}</h4>
        </div>
      </div>
      <div class="offcanvas-body text-start" v-if="activityDetails != null" style="font-size:14px">
        <div>
          <div class=" d-flex justify-content-start">
            <label class="fw-bolder text-start">Advisories </label>
          </div>
          <div class="accordion" id="accordion">
            <div class="accordion-item bg-transparent border-0" v-for="(activity, i) in activityDetails.activityDetails"
              :key="i">
              <h2 class="accordion-header ">
                <button style="font-size: 14px" class="accordion-button collapsed bg-transparent text-black py-2"
                  type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseOne' + i" aria-expanded="false"
                  :aria-controls="'collapseOne' + i">
                  {{ i + 1 }}. {{ activity.detail }}
                </button>
              </h2>
              <div :id="'collapseOne' + i" class="accordion-collapse collapse " data-bs-parent="#accordion">
                <div class="accordion-body ms-4 text-start" v-if="activity.comments == '' || activity.comments == null">
                  - no further comments
                </div>
                <div class="accordion-body ms-4 text-start" v-else>
                  - {{ activity.comments }}
                </div>
              </div>
            </div>
          </div>
        </div>


        <div>
          <div class=" d-flex justify-content-start">
            <label class="fw-bolder text-center">Risks Involved</label>
          </div>
          <div class="accordion " v-if="activityDetails.risk_advisory.risk.length > 0" id="accordionExample">
            <div class="accordion-item bg-transparent border-0 " v-for="(risk, i) in activityDetails.risk_advisory.risk"
              :key="i">
              <h4 class="accordion-header">
                <button style="font-size: 14px" class="accordion-button py-2  bg-transparent text-black collapsed"
                  type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + i" aria-expanded="false"
                  :aria-controls="'collapse' + i">
                  {{ i + 1 }}. {{ risk.risk }}
                </button>
              </h4>
              <div :id="'collapse' + i" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body ms-4 text-start"
                  v-if="risk[`${this.crop.crop.toLowerCase()}_risks_advisories_tbls`].length > 0">
                  - {{ risk[`${this.crop.crop.toLowerCase()}_risks_advisories_tbls`][0].advisory }}
                </div>
              </div>
            </div>
          </div>
          <p class="my-5 mx-auto text-center" style="font-size: 15px;" v-else>No Risks(and Adviories) Found</p>
        </div>

        <div class="my-4">
          <div class=" d-flex justify-content-start">
            <label class="fw-bolder text-center">Fertilizer Recommendations </label>
          </div>
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item  bg-transparent">
              <h2 class="accordion-header">
                <button  style="font-size: 14px" class="accordion-button py-2  bg-transparent text-black collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  fertilizer Recommendation for {{ district.district }}
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <ol class="list-group list-group-numbered"
                    v-if="district.fertilizer_recommendations && district.fertilizer_recommendations.length > 0">
                    <li v-for="(fertilizer_recom, i) in district.fertilizer_recommendations" :key="i"
                      class="list-group-item d-flex justify-content-between align-items-start">
                      <div class="ms-2 me-auto">
                        <div class="fw-bold">{{ fertilizer_recom.fertilizer }}</div>
                        Apply {{ fertilizer_recom.kg_per_ha }} kg of {{ fertilizer_recom.fertilizer }} per each Hectare
                        for effective results
                      </div>
                      <span class="badge bg-success text-light rounded-pill">{{ fertilizer_recom.kg_per_ha
                        }}kg/ha</span>
                    </li>
                  </ol>
                  <p v-else>No fertilizer recommendations found for {{ district.district }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="my-4">
          <div class=" d-flex justify-content-start">
            <label class="fw-bolder text-center">Rate of Pest Infection In {{ district.district }} </label>
          </div>
          <div class="accordion accordion-flush" id="PestChartValues">
            <div class="accordion-item  bg-transparent">
              <h2 class="accordion-header">
                <button  style="font-size: 14px" class="accordion-button py-2  bg-transparent text-black collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#pestRiskLevels" aria-expanded="false" aria-controls="pestRiskLevels">
                  Pest Risk Levels
                </button>
              </h2>
              <div id="pestRiskLevels" class="accordion-collapse collapse" data-bs-parent="#PestChartValues">
                <div class="accordion-body">
                  <div style="height:1.5in">
                    <Chart :graphValues="getPestChartValues" :indexAxis="'y'"></Chart>
                  </div>
                  
                  <p class="alert alert-danger mt-5 py-1" role="alert" v-if="district.pest_risk_levels[0].high_risk_percentage > district.pest_risk_levels[0].moderate_risk_percentage">
                    The rate of infection is high, with {{ district.pest_risk_levels[0].high_risk_percentage }}% of the area at high risk.
                  </p>
                  <p class="alert alert-success mt-5 py-1" role="alert" v-else>
                    The District is more stable, with {{ district.pest_risk_levels[0].moderate_risk_percentage }}% of the area facing moderate risk.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
    <!-- month chart / gnatt chart******************************************************** -->
    <div>
      <div class="form-check form-switch py-3 w-25  px-0 d-flex justify-content-around ">
        <label class="form-check-label px-2 " for="flexSwitchCheckDefault"> Month Chart</label>
        <input class="form-check-input mx-0" v-model="chartSwitch" type="checkbox" role="switch"
          id="flexSwitchCheckDefault">
        <label class="form-check-label px-2" for="flexSwitchCheckDefault"> Gnatt Chart</label>
      </div>

      <div class="row croppingPage  mx-0" v-if="chartSwitch">
        <p class="text-center my-4 fw-bold" v-if="cropData == null">no result found</p>
        <div class="col p-4">
          <div class="row row-cols-1 row-cols-md-3  pb-3  g-3" style=" overflow-y: scroll;" v-if="cropData"
            :class="close ? 'row-cols-md-3 row-cols-lg-4' : 'row-cols-md-2 row-cols-lg-3'">
            <div class="col monthlyCard" ref="monthlyCard" id="" v-for="(data, i) in cropData" :key="i"
              aria-controls="offcanvasExample">
              <div class="card h-100 rounded-5 shadow-sm   border-0" style="width: 100%; background-color:#d2d2d25c"
                @click="setCardHeight()">
                <div class="card-body p-1 my-2 ">
                  <p class="card-title rounded-3 px-2 ms-3 bg-pink text-dark" style="font-size:12px;width:max-content">
                    {{ translateMonth(i) }}</p>
                  <div v-if="data.length != 0" class="container d-flex align-items-center justify-content-around">
                    <div class="w-100" role="button">
                      <div class="progress my-2" v-for="(activity, x) in data" :key="x" role="progressbar"
                        @click="activityDetails = activity" aria-label="Example with label" aria-valuenow="10"
                        aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar overflow-visible text-light text-start rounded-pill"
                          :class="activityColor(activity.activity)"
                          :style="'width:' + Math.floor(Math.random() * (100 - 80) + 80) + '%'">
                          <p class="m-0 px-2 "><span class="d-inline-block text-truncate mt-1"
                              style="max-width: 100px;"> {{ activity.activity }}</span> <b
                              class="float-end mt-1">{{ calendar_day(activity.activityStart) }} </b></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="container d-flex align-items-center justify-content-around">
                    <div class="w-100">
                      <div class="progress my-5" role="progressbar" aria-label="Example with label" aria-valuenow="10"
                        aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar overflow-visible   bg-secondary text-light text-center "
                          style="width: 100%">No Activity</div>
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
      <div v-if="!chartSwitch" style="  padding-bottom: 91px;" class="">
        <Gantt class="my-4 shadow-lg" @activitySelected="ganttEvent" v-if="cropDataActivity.length > 0"
          :cropData="cropDataActivity"></Gantt>
      </div>
    </div>
    <!-- ******************************************************** -->
    <div class="slider-container position-relative" v-if="visibleItems && visibleItems.length > 0">
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4  g-4" ref="slider">
        <div class="col mt-0" v-for="(item, i) in visibleItems" :key="i">
          <div :class="['card h-100', thisMonth(item.barsList[0].activityStart, item.barsList[0].activityEnd)]">

            <!-- Ribbon only shown when thisMonth returns 'box' -->
            <div v-if="thisMonth(item.barsList[0].activityStart, item.barsList[0].activityEnd) === 'box'"
              class="ribbon ribbon-top-left">
              <span class="activeSpan text-light" style="font-size:13px">THIS MONTH</span>
            </div>

            <img :src="require('../assets/croppingCalendarSlides/' + item.label + '.jpg')" height="200"
              class="card-img-top" style="object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title fw-bold" style="font-size:14px">{{ item.barsList[0].ganttBarConfig.label }}</h5>
            </div>
          </div>
        </div>
      </div>
      <i class=" float fs-3 bi bi-arrow-left-circle-fill" @click="prevSlide"></i>
      <i class=" float2 fs-3 bi bi-arrow-right-circle-fill" @click="nextSlide"></i>
    </div>
    <br><br> <br><br>
  </div>

  <!-- <a class="btn btn-primary" hidden ref="ganttCanvas" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
    Link with href
  </a> -->

</template>
<script>
import Gantt from "../components/gantt.vue";
import { mapState, mapActions, mapGetters } from 'vuex';
import Chart from "../components/barchart.vue"



export default {
  components: {
    Gantt,
    Chart,
  },
  data() {
    return {
      isMonth: false,
      activity: '',
      items: [],
      visibleItems: [],
      currentIndex: 0,
      chartSwitch: false,
      activityDetails: null,
      close: true,

    };
  },
  beforeRouteEnter(to, from, next) {
    if (!to.params.index) {
      next({ name: 'CroppingCalendar' });
    } else {
      next();
    }
  },
  mounted() {
    let item = this.items.find(
      (item) => item.barsList[0].ganttBarConfig.label === this.$route.params.index
    );
    this.ganttEvent(item.barsList[0])

    const currentDate = new Date();
    this.currentIndex = currentDate.getMonth()
    this.updateVisibleItems();
  },
  created() {
    this.items = this.$store.state.cropDataActivity
    this.getContent(this.$route.params.index)
  },
  methods: {
    nextSlide() {
      if (this.currentIndex < this.items.length - 4) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      this.updateVisibleItems();
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.items.length - 4;
      }
      this.updateVisibleItems();
    },
    updateVisibleItems() {
      const itemsLength = this.items.length;
      const remainingItems = itemsLength - this.currentIndex;

      if (remainingItems >= 4) {
        // If there are at least 4 items from currentIndex, take the next 4
        this.visibleItems = this.items.slice(this.currentIndex, this.currentIndex + 4);
      } else {
        // If there are less than 4 items remaining, take the remaining items and loop back to the start
        const firstPart = this.items.slice(this.currentIndex, itemsLength);
        const secondPart = this.items.slice(0, 4 - remainingItems);
        this.visibleItems = [...firstPart, ...secondPart];
      }


    },
    ganttEvent(data) {
      this.activityDetails = {
        activityDetails: data.activityDetails,
        activity: data.ganttBarConfig.label,
        risk_advisory: data.risk_advisories,
      }
      this.getContent(data.ganttBarConfig.label)
      this.scrollToTop()
    },
    getContent(index) {
      let content = this.cropData
        .flatMap((item) => item)
        .find((act) => act.activity === index);
      this.activity = content
    },
    translateMonth(monthIndex) {
      let months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      let monthName = months[monthIndex];
      return monthName
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    activityColor(activity) {
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
        card.children[0].style.height = newHeight + 'px';
      });

    },
    calendar_day(x) {
      const event = new Date(x);

      if (event.getFullYear() != new Date().getFullYear()) {
        event.setFullYear(new Date().getFullYear() - 1)
        return event.toDateString().split(' ').slice(1, 4).join(' ')
      } else {
        return event.toDateString().split(' ').slice(1, 3).join(' ')
      }
    },
    thisMonth(start, end) {
      const currentDate = new Date();
      const startDate = new Date(start);
      const endDate = new Date(end);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate.getFullYear() !== endDate.getFullYear()) {
        console.warn('Invalid start or end date, or dates are not in the same year.');
        return '';
      }

      const currentMonth = currentDate.getMonth();
      const startMonth = startDate.getMonth();
      const endMonth = endDate.getMonth();

      if ((startMonth <= endMonth && currentMonth >= startMonth && currentMonth <= endMonth) ||
        (startMonth > endMonth && (currentMonth >= startMonth || currentMonth <= endMonth))) {
        return 'box';
      } else {
        return '';
      }
    }

  },

  computed: {
    ...mapState(['cropData', 'cropDataActivity']),
    ...mapGetters([
      'district',
      'region',
      'crop',
    ]),
    getPestChartValues(){
    return [
        {
          lables:['High', 'Moderate']
        },
        ['Pest Risk Levels'],
        [this.district.pest_risk_levels[0].high_risk_percentage, this.district.pest_risk_levels[0].moderate_risk_percentage],
      ]
    }
  }
};
</script>

<style scoped>
.float {
  position: absolute;
  /* height:40px; */
  bottom: 50%;
  left: -15px;
  /* background-color:#f56a6a; */
  color: #e6b600;
  border-radius: 50px;
  transition: transform .2s;
  text-align: center;
  z-index: 1;
  /* width: 40px !important; */
  /* box-shadow: 0px 0px 5px #999; */
}

.float2 {
  position: absolute;
  /* height:40px; */
  bottom: 50%;
  /* width: 40px !important; */
  right: -15px;
  /* background-color:#f56a6a; */
  color: #e6b600;
  border-radius: 50px;
  z-index: 1;
  transition: transform .2s;
  text-align: center;
  /* box-shadow: 0px 0px 5px #999; */
}

.my-float {
  position: absolute;
  top: 3.5px;
}

.float:hover {
  transform: scale(1.1);
  color: #e6b600d8;

}

.float2:hover {
  transform: scale(1.1);
  color: #e6b600d8;
}

.accordion-button:hover {
  background: #e1e1e1 !important;
}
</style>

<style scoped>
.box {
  position: relative;
  max-width: 600px;
  width: 90%;
  height: 400px;
  background: #fff;
  box-shadow: 0 0 15px rgba(250, 0, 0, 0.68);
}

/* common */
.ribbon {
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: absolute;
}

.ribbon::before,
.ribbon::after {
  position: absolute;
  z-index: -1;
  content: '';
  display: block;
  border: 5px solid #b92929;
}

.ribbon span {
  position: absolute;
  display: block;
  width: 225px;
  padding: 15px 0;
  background-color: #b92929;
  box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
  color: #fff;
  font: 700 18px/1 'Lato', sans-serif;
  text-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  text-transform: uppercase;
  text-align: center;
}

/* top left*/
.ribbon-top-left {
  top: -10px;
  left: -10px;
}

.ribbon-top-left::before,
.ribbon-top-left::after {
  border-top-color: transparent;
  border-left-color: transparent;
}

.ribbon-top-left::before {
  top: 0;
  right: 0;
}

.ribbon-top-left::after {
  bottom: 0;
  left: 0;
}

.ribbon-top-left span {
  right: -25px;
  top: 30px;
  transform: rotate(-45deg);
}
</style>
