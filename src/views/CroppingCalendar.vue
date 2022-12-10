<template>
  <div class="bg-img">
    <form action="/action_page.php" class="container">
      <div class="input-group input-group-sm">
        <span class="input-group-text"
          ><img src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png" height="15"/></span>
        <select
          class="form-select"
          id="inputGroupSelect01"
          v-model="searchCrop"
          @change="selectionChange"
        >
          <option selected value="default">Select CropType</option>
          <option value="maize" selected>Maize</option>
          <option value="cowpea">Cowpea</option>
          <option value="soyabean">Soyabean</option>
          <option value="groundnut">GroundNuts</option>
          <option value="yam">Yam</option>
          <option value="beans">Beans</option>
        </select>
        <span class="input-group-text"
          ><img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" height="15"/></span>
        <select
          class="form-select"
          id="inputGroupSelect01"
          v-model="searchRegion"
        >
          <option selected value="default">Choose Region</option>
          <option value="northen" selected>Northen Region</option>
          <option value="uer">Upper East Region</option>
          <option value="uwr">Upper West Region</option>
        </select>
      </div>
    </form>
  </div>

  <!-- <div class="progress w-50 container fw-bolder my-4 px-0" style="height:15px">
      <div class="progress-bar border-end border-3 bg-transparent text-dark" role="progressbar" style="width: 35%" >Legend</div>
      <div class="progress-bar border-end border-3 bg-warning" role="progressbar" style="width: 35%" >Harvesting</div>
      <div class="progress-bar border-end border-3 bg-success" role="progressbar" style="width: 35%">Planting</div>
      <div class="progress-bar border-end border-3 bg-info" role="progressbar" style="width: 35%">Rain</div>
      <div class="progress-bar border-end border-3 bg-brown" role="progressbar" style="width: 35%">Land Preparation</div>
      <div class="progress-bar border-end border-3 bg-secondary" role="progressbar" style="width: 35%">Weeding</div>
      <div class="progress-bar border-end border-3 bg-orange" role="progressbar" style="width: 35%">Fertilizer App.</div>
      <div class="progress-bar  bg-danger" role="progressbar" style="width: 35%">Pesticide</div>
    </div> -->

  <div class="form-check form-check-inline mt-4">
    <input class="form-check-input bg-warning" disabled type="checkbox" />
    <label class="form-check-label">Land Preparation</label>
  </div>
  <div class="form-check form-check-inline mt-4">
    <input class="form-check-input bg-success" disabled type="checkbox" />
    <label class="form-check-label">Rain </label>
  </div>
  <div class="form-check form-check-inline mt-4">
    <input class="form-check-input bg-info" disabled type="checkbox" />
    <label class="form-check-label">Planting</label>
  </div>
  <div class="form-check form-check-inline mt-4">
    <input class="form-check-input bg-brown" disabled type="checkbox" />
    <label class="form-check-label">Fertilizer App(Basal)</label>
  </div>
  <div class="form-check form-check-inline mt-4">
    <input class="form-check-input bg-secondary" disabled type="checkbox" />
    <label class="form-check-label">Weeding</label>
  </div>
  <div class="form-check form-check-inline mt-4">
    <input class="form-check-input bg-wine" disabled type="checkbox" />
    <label class="form-check-label">Fertilizer App(Top Dressing)</label>
  </div>
    <div class="form-check form-check-inline mt-4">
    <input class="form-check-input bg-orange" disabled type="checkbox" />
    <label class="form-check-label">Pesticide App.</label>
  </div>
  <div class="form-check form-check-inline mt-4">
    <input class="form-check-input bg-danger" disabled type="checkbox" />
    <label class="form-check-label"> Harvesting </label>
  </div>
  <div class="calendar">
    <Calendar
      class="calendar_item"
      v-for="(item, index) in selectionChange"
      :key="index"
      :calendar_data="selectionChange[index]"
    />
    <p
      v-show="selectionChange.length == 0"
      class="fw-bolder fs-6 my-5 text-danger"
    >
      No result found, Please make your selections
    </p>
  </div>

</template>

<script>
// @ is an alias to /src
import Calendar from "../components/calendarComponent.vue";
import Navbar from "../components/navbar.vue";
import Footer from "../components/footer.vue";

export default {
  name: "CroppingCalendar",
  components: {
    Calendar,
    Navbar,
    Footer,
  },
  data() {
    return {
      searchRegion: "default",
      searchCrop: "default",
      // verCropData:[
      //   {

      //     // maize #################################################### 
      //     // upper east region*****************
      //     town: "Sambolgo",
      //     crop: "maize",
      //     region: "uer",
      //     Rain: "2022-08-11",
      //   },
      //   {
      //     town: "Gia",
      //     crop: "maize",
      //     region: "uer",
      //     Rain: "2022-08-06",
      //   },
      //   {
      //     town: "Nyangua",
      //     crop: "maize",
      //     region: "uer",
      //     Rain: "2022-08-09",
      //   },
      //   {
      //     town: "Bonia",
      //     crop: "maize",
      //     region: "uer",
      //     Rain: "2022-08-15",
      //   },
      //   // upper west region***************************************
      //   {
      //     town: "Guo",
      //     crop: "maize",
      //     region: "uwr",
      //     Rain: "2022-06-20",
      //   },
      //   {
      //     town: "Zanko",
      //     crop: "maize",
      //     region: "uwr",
      //     Rain: "2022-06-20",
      //   },
      //   {
      //     town: "Goli",
      //     crop: "maize",
      //     region: "uwr",
      //     Rain: "2022-06-07",
      //   },
      //   {
      //     town: "Goriyiri",
      //     crop: "maize",
      //     region: "uwr",
      //     Rain: "2022-07-01",
      //   },
      //   // northen region ******************************************
      //   {
      //     town: "Duko",
      //     crop: "maize",
      //     region: "northen",
      //     Rain: "2022-07-28",
      //   },
      //   {
      //     town: "Tibali",
      //     crop: "maize",
      //     region: "northen",
      //     Rain: "2022-07-15",
      //   },
      //   {
      //     town: "Tingoli",
      //     crop: "maize",
      //     region: "northen",
      //     Rain: "2022-07-24",
      //   },
      //   {
      //     town: "Cheyohi",
      //     crop: "maize",
      //     region: "northen",
      //     Rain: "2022-07-24",
      //   },
      //   // cowpea ####################################################
      //   // upper east region ****************************
      //   {
      //     town: "Sambolgo",
      //     crop: "cowpea",
      //     region: "uer",
      //     Rain: "2022-08-11",
      //   },
      //   {
      //     town: "Gia",
      //     crop: "cowpea",
      //     region: "uer",
      //     Rain: "2022-08-06",
      //   },
      //   {
      //     town: "Nyangua",
      //     crop: "cowpea",
      //     region: "uer",
      //     Rain: "2022-08-09",
      //   },
      //   {
      //     town: "Bonia",
      //     crop: "cowpea",
      //     region: "uer",
      //     Rain: "2022-08-15",
      //   },
      //   // northen region **********************
      //   {
      //     town: "Tibali",
      //     crop: "cowpea",
      //     region: "northen",
      //     Rain: "2022-07-15",
      //   },
      //   {
      //     town: "Tingoli",
      //     crop: "cowpea",
      //     region: "northen",
      //     Rain: "2022-07-24",
      //   },
      //   {
      //     town: "Duko",
      //     crop: "cowpea",
      //     region: "northen",
      //     Rain: "2022-07-28",
      //   },
      //   {
      //     town: "Cheyohi",
      //     crop: "cowpea",
      //     region: "northen",
      //     Rain: "Cheyohi",
      //   },
      //   // upper west region ****************************
      //   {
      //     town: "Guo",
      //     crop: "cowpea",
      //     region: "uwr",
      //     Rain: "2022-06-20",
      //   },
      //           {
      //     town: "Goriyiri",
      //     crop: "cowpea",
      //     region: "uwr",
      //     Rain: "2022-07-01",
      //   },
      //   {
      //     town: "Zanko",
      //     crop: "cowpea",
      //     region: "uwr",
      //     Rain: "2022-06-20",
      //   },
      //   {
      //     town: "Goli",
      //     crop: "cowpea",
      //     region: "uwr",
      //     Rain: "2022-06-07",
      //   },
      //   // beans ###############################################
      //   // upper east region*******************
      //   {
      //     town: "Sambolgo",
      //     crop: "beans",
      //     region: "uer",
      //     Rain: "2022-08-11",
      //   },
      //   {
      //     town: "Gia",
      //     crop: "beans",
      //     region: "uer",
      //     Rain:  "2022-08-06",
      //   },
      //   {
      //     town: "Nyangua",
      //     crop: "beans",
      //     region: "uer",
      //     Rain: "2022-08-09",
      //   },
      //   {
      //     town: "Bonia",
      //     crop: "beans",
      //     region: "uer",
      //     Rain: "2022-08-15",
      //   },
      //   // northen region***********************
      //   {
      //     town: "Tibali",
      //     crop: "beans",
      //     region: "northen",
      //     Rain: "2022-07-15",
      //   },
      //   {
      //     town: "Tingoli",
      //     crop: "beans",
      //     region: "northen",
      //     Rain: "2022-07-24",
      //   },
      //   {
      //     town: "Duko",
      //     crop: "beans",
      //     region: "northen",
      //     Rain: "2022-07-28",
      //   },
      //   {
      //     town: "Cheyohi",
      //     crop: "beans",
      //     region: "northen",
      //     Rain: "2022-07-24",
      //   },
      //   //upper west region************************
      //   {
      //     town: "Goli",
      //     crop: "beans",
      //     region: "uwr",
      //     Rain: "2022-06-07",
      //   },
      //   {
      //     town: "Guo",
      //     crop: "beans",
      //     region: "uwr",
      //     Rain: "2022-06-20",
      //   },
      //   {
      //     town: "Zanko",
      //     crop: "beans",
      //     region: "uwr",
      //     Rain: "2022-06-20",
      //   },
      //   {
      //     town: "Goriyiri",
      //     crop: "beans",
      //     region: "uwr",
      //     Rain: "2022-07-01",
      //   },
      //   // groundnut #######################################################
      //   // upper east region*****************
      //   {
      //     town: "Sambolgo",
      //     crop: "groundnut",
      //     region: "uer",
      //     Rain: "2022-08-11",
      //   },
      //   {
      //     town: "Gia",
      //     crop: "groundnut",
      //     region: "uer",
      //     Rain: "2022-08-06",
      //   },
      //   {
      //     town: "Nyangua",
      //     crop: "groundnut",
      //     region: "uer",
      //     Rain: "2022-08-09",
      //   },
      //   {
      //     town: "Bonia",
      //     crop: "groundnut",
      //     region: "uer",
      //     Rain: "2022-08-15",
      //   },
      //   // northen region **************************************
      //   {
      //     town: "Duko",
      //     crop: "groundnut",
      //     region: "northen",
      //     Rain: "2022-07-28",
      //   },
      //   {
      //     town: "Tibali",
      //     crop: "groundnut",
      //     region: "northen",
      //     Rain: "2022-07-15",
      //   },
      //   {
      //     town: "Tingoli",
      //     crop: "groundnut",
      //     region: "northen",
      //     Rain: "2022-07-24",
      //   },
      //   {
      //     town: "Cheyohi",
      //     crop: "groundnut",
      //     region: "northen",
      //     Rain: "2022-07-24",
      //   },
      //   // upper west region ******************************
      //   {
      //     town: "Guo",
      //     crop: "groundnut",
      //     region: "uwr",
      //     Rain: "2022-06-20",
      //   },
      //   {
      //     town: "Goli",
      //     crop: "groundnut",
      //     region: "uwr",
      //     Rain: "2022-06-07",
      //   },
      //   {
      //     town: "Zanko",
      //     crop: "groundnut",
      //     region: "uwr",
      //     Rain: "2022-06-20",
      //   },
      //   {
      //     town: "Goriyiri",
      //     crop: "groundnut",
      //     region: "uwr",
      //     Rain: "2022-07-01",
      //   },
      //   // soyabean ####################################################
      //   // upper east region ***********************
      //   {
      //     town: "Sambolgo",
      //     crop: "soyabean",
      //     region: "uer",
      //     Rain: "2022-08-11",
      //   },
      //   {
      //     town: "Gia",
      //     crop: "soyabean",
      //     region: "uer",
      //     Rain: "2022-08-06",
      //   },
      //   {
      //     town: "Nyangua",
      //     crop: "soyabean",
      //     region: "uer",
      //     Rain: "2022-08-09",
      //   },
      //   {
      //     town: "Bonia",
      //     crop: "soyabean",
      //     region: "uer",
      //     Rain: "2022-08-15",
      //   },
      //   // northen region  ********************************************
      //   {
      //     town: "Tibali",
      //     crop: "soyabean",
      //     region: "northen",
      //     Rain: "2022-07-15",
      //   },
      //   {
      //     town: "Tingoli",
      //     crop: "soyabean",
      //     region: "northen",
      //     Rain: "2022-07-24",
      //   },
      //   {
      //     town: "Duko",
      //     crop: "soyabean",
      //     region: "northen",
      //     Rain: "2022-07-28",
      //   },
      //   {
      //     town: "Cheyohi",
      //     crop: "soyabean",
      //     region: "northen",
      //     Rain:  "2022-07-24",
      //   },
      //   // upper west region *************************
      //   {
      //     town: "Guo",
      //     crop: "soyabean",
      //     region: "uwr",
      //     Rain: "2022-06-20",
      //   },
      //   {
      //     town: "Goli",
      //     crop: "soyabean",
      //     region: "uwr",
      //     Rain: "2022-06-07",
      //   },
      //   {
      //     town: "Zanko",
      //     crop: "soyabean",
      //     region: "uwr",
      //     Rain: "2022-06-20",
      //   },
      //   {
      //     town: "Goriyiri",
      //     crop: "soyabean",
      //     region: "uwr",
      //     Rain: "2022-07-01",
      //   },
      //   // yam ####################################################
      //   // upper east region *****************
      //   {
      //     town: "Sambolgo",
      //     crop: "yam",
      //     region: "uer",
      //     Rain: "2022-08-11",
      //   },
      //   {
      //     town: "Gia",
      //     crop: "yam",
      //     region: "uer",
      //     Rain: "2022-08-06",
      //   },
      //   {
      //     town: "Nyangua",
      //     crop: "yam",
      //     region: "uer",
      //     Rain: "2022-08-09",
      //   },
      //   {
      //     town: "Bonia",
      //     crop: "yam",
      //     region: "uer",
      //     Rain: "2022-08-15",
      //   },
      //   // northen region *****************************
      //   {
      //     town: "Tibali",
      //     crop: "yam",
      //     region: "northen",
      //     Rain: "2022-07-15",
      //   },
      //   {
      //     town: "Tingoli",
      //     crop: "yam",
      //     region: "northen",
      //     Rain: "2022-07-24",
      //   },
      //   {
      //     town: "Duko",
      //     crop: "yam",
      //     region: "northen",
      //     Rain: "2022-07-28",
      //   },
      //   {
      //     town: "Cheyohi",
      //     crop: "yam",
      //     region: "northen",
      //     Rain: "2022-07-24",
      //   },
      //   // upper west region *****************************
      //   {
      //     town: "Guo",
      //     crop: "yam",
      //     region: "uwr",
      //     Rain: "2022-06-20",
      //   },
      //   {
      //     town: "Goli",
      //     crop: "yam",
      //     region: "uwr",
      //     Rain: "2022-06-07",
      //   },
      //   {
      //     town: "Zanko",
      //     crop: "yam",
      //     region: "uwr",
      //     Rain: "2022-06-20",
      //   },
      //   {
      //     town: "Goriyiri",
      //     crop: "yam",
      //     region: "uwr",
      //     Rain: "2022-07-01",
      //   },
      // ],
      cropdata: [
        {
          // maize #################################################### 
          // upper east region*****************
          town: "Sambolgo",
          crop: "maize",
          region: "uer",
          Rain: ["2022-08-11"],
        },
        {
          town: "Gia",
          crop: "maize",
          region: "uer",
          Rain: ["2022-08-06"],
        },
        {
          town: "Nyangua",
          crop: "maize",
          region: "uer",
          Rain: ["2022-08-09"],
        },
        {
          town: "Bonia",
          crop: "maize",
          region: "uer",
          Rain: ["2022-08-15"],
        },
        // upper west region***************************************
        {
          town: "Guo",
          crop: "maize",
          region: "uwr",
          Rain: ["2022-06-20"],
        },
        {
          town: "zanko",
          crop: "maize",
          region: "uwr",
          Rain: ["2022-06-20"],
        },
        {
          town: "Goli",
          crop: "maize",
          region: "uwr",
          Rain: ["2022-06-07"],
        },
        {
          town: "Goriyiri",
          crop: "maize",
          region: "uwr",
          Rain: ["2022-07-01"],
        },
        // northen region ******************************************
        {
          town: "Duko",
          crop: "maize",
          region: "northen",
          Rain: ["2022-07-28"],
        },
        {
          town: "Tibali",
          crop: "maize",
          region: "northen",
          Rain: ["2022-07-15"],
        },
        {
          town: "Tingoli",
          crop: "maize",
          region: "northen",
          Rain: ["2022-07-24"],
        },
        {
          town: "Cheyohi",
          crop: "maize",
          region: "northen",
          Rain: ["2022-07-24"],
        },
        // cowpea ####################################################
        // upper east region ****************************
        {
          town: "Sambolgo",
          crop: "cowpea",
          region: "uer",
          Rain: ["2022-08-11"],
        },
        {
          town: "Gia",
          crop: "cowpea",
          region: "uer",
          Rain: ["2022-08-06"],
        },
        {
          town: "Nyangua",
          crop: "cowpea",
          region: "uer",
          Rain: ["2022-08-09"],
        },
        {
          town: "Bonia",
          crop: "cowpea",
          region: "uer",
          Rain: ["2022-08-15"],
        },
        // northen region **********************
        {
          town: "Tibali",
          crop: "cowpea",
          region: "northen",
          Rain: ["2022-07-15"],
        },
        {
          town: "Tingoli",
          crop: "cowpea",
          region: "northen",
          Rain: ["2022-07-24"],
        },
        {
          town: "Duko",
          crop: "cowpea",
          region: "northen",
          Rain: ["2022-07-28"],
        },
        {
          town: "Cheyohi",
          crop: "cowpea",
          region: "northen",
          Rain: ["2022-07-24"],
        },
        // upper west region ****************************
        {
          town: "Guo",
          crop: "cowpea",
          region: "uwr",
          Rain: ["2022-06-20"],
        },
                {
          town: "Goriyiri",
          crop: "cowpea",
          region: "uwr",
          Rain: ["2022-07-01"],
        },
        {
          town: "Zanko",
          crop: "cowpea",
          region: "uwr",
          Rain: ["2022-06-20"],
        },
        {
          town: "Goli",
          crop: "cowpea",
          region: "uwr",
          Rain: ["2022-06-07"],
        },
        // beans ###############################################
        // upper east region*******************
        {
          town: "Sambolgo",
          crop: "beans",
          region: "uer",
          Rain: ["2022-08-11"],
        },
        {
          town: "Gia",
          crop: "beans",
          region: "uer",
          Rain: ["2022-08-06"],
        },
        {
          town: "Nyangua",
          crop: "beans",
          region: "uer",
          Rain: ["2022-08-09"],
        },
        {
          town: "Bonia",
          crop: "beans",
          region: "uer",
          Rain: ["2022-08-15"],
        },
        // northen region***********************
        {
          town: "Tibali",
          crop: "beans",
          region: "northen",
          Rain: ["2022-07-15"],
        },
        {
          town: "Tingoli",
          crop: "beans",
          region: "northen",
          Rain: ["2022-07-24"],
        },
        {
          town: "Duko",
          crop: "beans",
          region: "northen",
          Rain: ["2022-07-28"],
        },
        {
          town: "Cheyohi",
          crop: "beans",
          region: "northen",
          Rain: ["2022-07-24"],
        },
        //upper west region************************
        {
          town: "Goli",
          crop: "beans",
          region: "uwr",
          Rain: ["2022-06-07"],
        },
        {
          town: "Guo",
          crop: "beans",
          region: "uwr",
          Rain: ["2022-06-20"],
        },
        {
          town: "Zanko",
          crop: "beans",
          region: "uwr",
          Rain: ["2022-06-20"],
        },
        {
          town: "Goriyiri",
          crop: "beans",
          region: "uwr",
          Rain: ["2022-07-01"],
        },
        // groundnut #######################################################
        // upper east region*****************
        {
          town: "Sambolgo",
          crop: "groundnut",
          region: "uer",
          Rain: ["2022-08-11"],
        },
        {
          town: "Gia",
          crop: "groundnut",
          region: "uer",
          Rain: ["2022-08-06"],
        },
        {
          town: "Nyangua",
          crop: "groundnut",
          region: "uer",
          Rain: ["2022-08-09"],
        },
        {
          town: "Bonia",
          crop: "groundnut",
          region: "uer",
          Rain: ["2022-08-15"],
        },
        // northen region **************************************
        {
          town: "Duko",
          crop: "groundnut",
          region: "northen",
          Rain: ["2022-07-28"],
        },
        {
          town: "Tibali",
          crop: "groundnut",
          region: "northen",
          Rain: ["2022-07-15"],
        },
        {
          town: "Tingoli",
          crop: "groundnut",
          region: "northen",
          Rain: ["2022-07-24"],
        },
        {
          town: "Cheyohi",
          crop: "groundnut",
          region: "northen",
          Rain: ["2022-07-24"],
        },
        // upper west region ******************************
        {
          town: "Guo",
          crop: "groundnut",
          region: "uwr",
          Rain: ["2022-06-20"],
        },
        {
          town: "Goli",
          crop: "groundnut",
          region: "uwr",
          Rain: ["2022-06-07"],
        },
        {
          town: "Zanko",
          crop: "groundnut",
          region: "uwr",
          Rain: ["2022-06-20"],
        },
        {
          town: "Goriyiri",
          crop: "groundnut",
          region: "uwr",
          Rain: ["2022-07-01"],
        },
        // soyabean ####################################################
        // upper east region ***********************
        {
          town: "Sambolgo",
          crop: "soyabean",
          region: "uer",
          Rain: ["2022-08-11"],
        },
        {
          town: "Gia",
          crop: "soyabean",
          region: "uer",
          Rain: ["2022-08-06"],
        },
        {
          town: "Nyangua",
          crop: "soyabean",
          region: "uer",
          Rain: ["2022-08-09"],
        },
        {
          town: "Bonia",
          crop: "soyabean",
          region: "uer",
          Rain: ["2022-08-15"],
        },
        // northen region  ********************************************
        {
          town: "Tibali",
          crop: "soyabean",
          region: "northen",
          Rain: ["2022-07-15"],
        },
        {
          town: "Tingoli",
          crop: "soyabean",
          region: "northen",
          Rain: ["2022-07-24"],
        },
        {
          town: "Duko",
          crop: "soyabean",
          region: "northen",
          Rain: ["2022-07-28"],
        },
        {
          town: "Cheyohi",
          crop: "soyabean",
          region: "northen",
          Rain: ["2022-07-24"],
        },
        // upper west region *************************
        {
          town: "Guo",
          crop: "soyabean",
          region: "uwr",
          Rain: ["2022-06-20"],
        },
        {
          town: "Goli",
          crop: "soyabean",
          region: "uwr",
          Rain: ["2022-06-07"],
        },
        {
          town: "Zanko",
          crop: "soyabean",
          region: "uwr",
          Rain: ["2022-06-20"],
        },
        {
          town: "Goriyiri",
          crop: "soyabean",
          region: "uwr",
          Rain: ["2022-07-01"],
        },
        // yam ####################################################
        // upper east region *****************
        {
          town: "Sambolgo",
          crop: "yam",
          region: "uer",
          Rain: ["2022-08-11"],
        },
        {
          town: "Gia",
          crop: "yam",
          region: "uer",
          Rain: ["2022-08-06"],
        },
        {
          town: "Nyangua",
          crop: "yam",
          region: "uer",
          Rain: ["2022-08-09"],
        },
        {
          town: "Bonia",
          crop: "yam",
          region: "uer",
          Rain: ["2022-08-15"],
        },
        // northen region *****************************
        {
          town: "Tibali",
          crop: "yam",
          region: "northen",
          Rain: ["2022-07-15"],
        },
        {
          town: "Tingoli",
          crop: "yam",
          region: "northen",
          Rain: ["2022-07-24"],
        },
        {
          town: "Duko",
          crop: "yam",
          region: "northen",
          Rain: ["2022-07-28"],
        },
        {
          town: "Cheyohi",
          crop: "yam",
          region: "northen",
          Rain: ["2022-07-24"],
        },
        // upper west region *****************************
        {
          town: "Guo",
          crop: "yam",
          region: "uwr",
          Rain: ["2022-06-20"],
        },
        {
          town: "Goli",
          crop: "yam",
          region: "uwr",
          Rain: ["2022-06-07"],
        },
        {
          town: "Zanko",
          crop: "yam",
          region: "uwr",
          Rain: ["2022-06-20"],
        },
        {
          town: "Goriyiri",
          crop: "yam",
          region: "uwr",
          Rain: ["2022-07-01"],
        },
      ],
    };
  },
  mounted(){
    this.cropwithOnset();
  },
  computed: {
    selectionChange() {
      var results = [];
      for (var i = 0; i < this.cropdata.length; i++) {
        if (
          this.cropdata[i].crop == this.searchCrop &&
          this.cropdata[i].region == this.searchRegion
        ) {
          results.push(this.cropdata[i]);
        }
      }
      return results;
    },
  },
  methods:{
    cropwithOnset(){
    var landpreparation, planting, basalfertApp, rainOnset, topDressFertApp, weedingOne, weedingTwo, droughtStess, perstidideApp, cobForm, haverting


      for (var i = 0; i < this.cropdata.length; i++) {

        rainOnset = new Date(this.cropdata[i].Rain[0])
        landpreparation = new Date(rainOnset).setDate(rainOnset.getDate() - 30); 
        this.cropdata[i].landpreparation = [new Date(landpreparation)]

        planting = new Date(landpreparation).setDate(new Date(landpreparation).getDate() + 7);
        this.cropdata[i].planting = [new Date(planting)]

        basalfertApp = new Date(planting).setDate(new Date(planting).getDate() + 14); //*** */
        this.cropdata[i].firtilizerB = [new Date(basalfertApp)]

        topDressFertApp = new Date(basalfertApp).setDate(new Date(basalfertApp).getDate() + 21);//** */
        // this.cropdata[i].firtilizerT.push(new Date(topDressFertApp))
        this.cropdata[i].firtilizerT = [new Date(topDressFertApp)]


        weedingOne = new Date(planting).setDate(new Date(planting).getDate() + 30); 
        this.cropdata[i].weeding = [new Date(weedingOne)]

        weedingTwo = new Date(weedingOne).setDate(new Date(weedingOne).getDate() + 30); //** */
        this.cropdata[i].weeding.push(new Date(weedingTwo))

        // droughtStess = new Date(planting).setDate(new Date(planting).getDate() + 40);//** */
        perstidideApp = new Date(planting).setDate(new Date(planting).getDate() + 40);
        this.cropdata[i].pesticide = [new Date(perstidideApp)]
        
        // cobForm = new Date(planting).setDate(new Date(planting).getDate() + 42); 
        haverting = new Date(planting).setDate(new Date(planting).getDate() + 70);
        this.cropdata[i].Harvesting = [new Date(haverting)]
        

      }
    }
  }
};
</script>

<style scoped>
label{
  font-weight: 400 !important;
  font-size: 13px !important;
  font-family: 'Open Sans', sans-serif !important;
}
.calendar {
  padding: 10px;
  padding-bottom: 50px; /* Height of the footer */
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
  background-color: rgb(155, 104, 37) !important;
}
.bg-orange {
  background-color: rgb(148, 45, 173) !important;
}
.bg-success {
  background-color: rgb(74, 187, 108) !important;
}
.bg-warning {
  background-color: rgb(241, 186, 35) !important;
}
.bg-info {
  background-color: rgb(74, 174, 204) !important;
}
.bg-secondary {
  background-color: rgb(95, 95, 95) !important;
}
.bg-danger {
  background-color: rgb(255, 109, 73) !important;
}
.bg-wine{
  background-color: rgb(45, 173, 166) !important;
}
</style>
