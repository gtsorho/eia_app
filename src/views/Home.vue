<template>
  <Navbar />
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
    <label class="form-check-label">Harvesting</label>
  </div>
  <div class="form-check form-check-inline mt-4">
    <input class="form-check-input bg-success" disabled type="checkbox" />
    <label class="form-check-label">Planting</label>
  </div>
  <div class="form-check form-check-inline mt-4">
    <input class="form-check-input bg-info" disabled type="checkbox" />
    <label class="form-check-label">Rain</label>
  </div>
  <div class="form-check form-check-inline mt-4">
    <input class="form-check-input bg-brown" disabled type="checkbox" />
    <label class="form-check-label">Land Preparation</label>
  </div>
  <div class="form-check form-check-inline mt-4">
    <input class="form-check-input bg-secondary" disabled type="checkbox" />
    <label class="form-check-label">Weeding</label>
  </div>
  <div class="form-check form-check-inline mt-4">
    <input class="form-check-input bg-orange" disabled type="checkbox" />
    <label class="form-check-label">Fertilizer App.</label>
  </div>
  <div class="form-check form-check-inline mt-4">
    <input class="form-check-input bg-danger" disabled type="checkbox" />
    <label class="form-check-label">Pesticide</label>
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
      class="fw-bolder fs-5 my-5 text-danger"
    >
      No result found, Please make your selections
    </p>
  </div>

  <Footer />
</template>

<script>
// @ is an alias to /src
import Calendar from "../components/calendarComponent.vue";
import Navbar from "../components/navbar.vue";
import Footer from "../components/footer.vue";

export default {
  name: "Home",
  components: {
    Calendar,
    Navbar,
    Footer,
  },
  data() {
    return {
      searchRegion: "default",
      searchCrop: "default",
      cropdata: [
        {
          // maize ####################################################
          // upper east region*****************
          town: "Sambolgo",
          crop: "maize",
          region: "uer",
          landpreparation: ["02-02", "03-25", "06-8"],
          weeding: ["02-04", "06-14", "08-12"],
          Rain: ["03-12", "08-20", "07-14"],
          planting: ["06-30"],
          firtilizer: ["10-08", "07-12"],
          Harvesting: ["08-27", "12-03"],
          pesticide: ["03-04", "05-14"],
        },
        {
          town: "Gia",
          crop: "maize",
          region: "uer",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Nyangua",
          crop: "maize",
          region: "uer",
          Rain: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          landpreparation: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          Harvesting: ["03-31", "07-12", "05-14"],
          firtilizer: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Boynia",
          crop: "maize",
          region: "uer",
          Rain: ["03-02", "04-25", "08-8"],
          firtilizer: ["04-04", "10-14", "12-12"],
          landpreparation: ["04-12", "05-20", "08-14", "10-14"],
          pesticide: ["03-30", "06-30"],
          Harvesting: ["03-31", "07-12", "05-14"],
          weeding: ["07-27", "12-03"],
          planting: ["12-04", "11-14"],
        },
        // upper west region***************************************
        {
          town: "Guo",
          crop: "maize",
          region: "uwr",
          landpreparation: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          Rain: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          firtilizer: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          pesticide: ["04-04", "06-14"],
        },
        {
          town: "zanko",
          crop: "maize",
          region: "uwr",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Goli",
          crop: "maize",
          region: "uwr",
          landpreparation: ["03-02", "04-25", "08-8"],
          Rain: ["04-04", "10-14", "12-12"],
          weeding: ["04-12", "05-20", "08-14", "10-14"],
          pesticide: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          planting: ["12-04", "11-14"],
        },
        {
          town: "Goriyiri",
          crop: "maize",
          region: "uwr",
          landpreparation: ["03-02", "04-25", "08-8"],
          Rain: ["04-04", "10-14", "12-12"],
          weeding: ["04-12", "05-20", "08-14", "10-14"],
          pesticide: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          planting: ["12-04", "11-14"],
        },
        // northen region ******************************************
        {
          town: "Duku",
          crop: "maize",
          region: "northen",
          landpreparation: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          planting: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Tibali",
          crop: "maize",
          region: "northen",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Tingoli",
          crop: "maize",
          region: "northen",
          landpreparation: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          Rain: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          firtilizer: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          pesticide: ["04-04", "06-14"],
        },
        {
          town: "Cheyohi",
          crop: "maize",
          region: "northen",
          pesticide: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          Harvesting: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          firtilizer: ["12-08", "08-12"],
          Rain: ["04-27", "11-03"],
          landpreparation: ["04-04", "06-14"],
        },
        // cowpea ####################################################
        // upper east region ****************************
        {
          town: "Sambolgo",
          crop: "cowpea",
          region: "uer",
          landpreparation: ["02-02", "03-25", "06-8"],
          weeding: ["02-04", "06-14", "08-12"],
          Rain: ["03-12", "08-20", "07-14"],
          planting: ["06-30"],
          firtilizer: ["10-08", "07-12"],
          Harvesting: ["08-27", "12-03"],
          pesticide: ["03-04", "05-14"],
        },
        {
          town: "Gia",
          crop: "cowpea",
          region: "uer",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Nyangua",
          crop: "cowpea",
          region: "uer",
          landpreparation: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          planting: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Bonyia",
          crop: "cowpea",
          region: "uer",
          Rain: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          landpreparation: ["02-12", "08-20", "06-14"],
          Harvesting: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          planting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        // northen region **********************
        {
          town: "Tibali",
          crop: "cowpea",
          region: "northen",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Tingoli",
          crop: "cowpea",
          region: "northen",
          landpreparation: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          Rain: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          firtilizer: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          pesticide: ["04-04", "06-14"],
        },
        {
          town: "Duku",
          crop: "cowpea",
          region: "northen",
          landpreparation: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          planting: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Cheyohi",
          crop: "cowpea",
          region: "northen",
          firtilizer: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          pesticide: ["03-30", "06-30"],
          landpreparation: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          planting: ["12-04", "11-14"],
        },
        // upper west region ****************************
        {
          town: "Guo",
          crop: "cowpea",
          region: "uwr",
          landpreparation: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          Rain: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          firtilizer: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          pesticide: ["04-04", "06-14"],
        },
                {
          town: "Goriyiri",
          crop: "cowpea",
          region: "uwr",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Zanko",
          crop: "cowpea",
          region: "uwr",
          landpreparation: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          Rain: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          firtilizer: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          pesticide: ["04-04", "06-14"],
        },
        {
          town: "Goli",
          crop: "cowpea",
          region: "uwr",
          landpreparation: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          planting: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        // beans ###############################################
        // upper east region*******************
        {
          town: "Sambolgo",
          crop: "beans",
          region: "uer",
          landpreparation: ["02-02", "03-25", "06-8"],
          weeding: ["02-04", "06-14", "08-12"],
          Rain: ["03-12", "08-20", "07-14"],
          planting: ["06-30"],
          firtilizer: ["10-08", "07-12"],
          Harvesting: ["08-27", "12-03"],
          pesticide: ["03-04", "05-14"],
        },
        {
          town: "Gia",
          crop: "beans",
          region: "uer",
          landpreparation: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          planting: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Nyangua",
          crop: "beans",
          region: "uer",
          landpreparation: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          planting: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Bonyia",
          crop: "beans",
          region: "uer",
          Rain: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          landpreparation: ["02-12", "08-20", "06-14"],
          Harvesting: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          planting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        // northen region***********************
        {
          town: "Tibali",
          crop: "beans",
          region: "northen",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Tingoli",
          crop: "beans",
          region: "northen",
          Rain: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          landpreparation: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          pesticide: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          firtilizer: ["04-04", "06-14"],
        },
        {
          town: "Doku",
          crop: "beans",
          region: "northen",
          Rain: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          landpreparation: ["04-12", "05-20", "08-14", "10-14"],
          Harvesting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          planting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Cheyohi",
          crop: "beans",
          region: "northen",
          Rain: ["01-02", "02-25", "08-8"],
          landpreparation: ["02-04", "06-14", "10-12"],
          weeding: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          pesticide: ["12-08", "08-12"],
          firtilizer: ["04-27", "11-03"],
          Harvesting: ["04-04", "06-14"],
        },
        //upper west region************************
        {
          town: "Goli",
          crop: "beans",
          region: "uwr",
          landpreparation: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          planting: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Guo",
          crop: "beans",
          region: "uwr",
          landpreparation: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          planting: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Zanko",
          crop: "beans",
          region: "uwr",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Goriyiri",
          crop: "beans",
          region: "uwr",
          landpreparation: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          Rain: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          firtilizer: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          pesticide: ["04-04", "06-14"],
        },
        // groundnut #######################################################
        // upper east region*****************
        {
          town: "Sambolgo",
          crop: "groundnut",
          region: "uer",
          landpreparation: ["02-02", "03-25", "06-8"],
          weeding: ["02-04", "06-14", "08-12"],
          Rain: ["03-12", "08-20", "07-14"],
          planting: ["06-30"],
          firtilizer: ["10-08", "07-12"],
          Harvesting: ["08-27", "12-03"],
          pesticide: ["03-04", "05-14"],
        },
        {
          town: "Gia",
          crop: "groundnut",
          region: "uer",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Nyangua",
          crop: "groundnut",
          region: "uer",
          pesticide: ["03-02", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          planting: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          Harvesting: ["07-27", "12-03"],
          landpreparation: ["12-04", "11-14" , "06-30"],
        },
        {
          town: "Bonyia",
          crop: "groundnut",
          region: "uer",
          pesticide: ["03-02", "07-25", "12-8"],
          firtilizer: ["03-04", "07-14", "12-12"],
          landpreparation: ["02-12", "08-20", "06-14"],
          Harvesting: ["04-30", "08-30"],
          weeding: ["05-08", "10-12"],
          planting: ["07-27", "12-03"],
          Rain: ["12-04", "11-14"],
        },
        // northen region **************************************
        {
          town: "Duko",
          crop: "groundnut",
          region: "northen",
          landpreparation: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          planting: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Tibali",
          crop: "groundnut",
          region: "northen",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Tingoli",
          crop: "groundnut",
          region: "northen",
          landpreparation: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          Rain: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          firtilizer: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          pesticide: ["04-04", "06-14"],
        },
        {
          town: "Cheyohi",
          crop: "groundnut",
          region: "northen",
          weeding: ["01-02", "02-25", "08-8"],
          landpreparation: ["02-04", "06-14", "10-12"],
          Rain: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          pesticide: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          firtilizer: ["04-04", "06-14"],
        },
        // upper west region ******************************
        {
          town: "Guo",
          crop: "groundnut",
          region: "uwr",
          landpreparation: ["03-02", "07-25", "12-8"],
          Harvesting: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          pesticide: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          weeding: ["07-27", "12-03"],
          planting: ["12-04", "11-14"],
        },
        {
          town: "Goli",
          crop: "groundnut",
          region: "uwr",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Zanko",
          crop: "groundnut",
          region: "uwr",
          Harvesting: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          Rain: ["03-12", "08-20", "06-14"],
          pesticide: ["06-30"],
          firtilizer: ["12-08", "08-12"],
          landpreparation: ["04-27", "11-03"],
          planting: ["04-04", "06-14"],
        },
        {
          town: "Goriyiri",
          crop: "groundnut",
          region: "uwr",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        // soyabean ####################################################
        // upper east region ***********************
        {
          town: "Sambolgo",
          crop: "soyabean",
          region: "uer",
          landpreparation: ["02-02", "03-25", "06-8"],
          weeding: ["02-04", "06-14", "08-12"],
          Rain: ["03-12", "08-20", "07-14"],
          planting: ["06-30"],
          firtilizer: ["10-08", "07-12"],
          Harvesting: ["08-27", "12-03"],
          pesticide: ["03-04", "05-14"],
        },
        {
          town: "Gia",
          crop: "soyabean",
          region: "uer",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Nyangua",
          crop: "soyabean",
          region: "uer",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Bonia",
          crop: "soyabean",
          region: "uer",
          Harvesting: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          pesticide: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          landpreparation: ["07-27", "12-03"],
          planting: ["12-04", "11-14"],
        },
        // northen region  ********************************************
        {
          town: "Tibali",
          crop: "soyabean",
          region: "northen",
          Rain: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          landpreparation: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          pesticide: ["07-27", "12-03"],
          Harvesting: ["12-04", "11-14"],
        },
        {
          town: "Tingoli",
          crop: "soyabean",
          region: "northen",
          landpreparation: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          Rain: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          firtilizer: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          pesticide: ["04-04", "06-14"],
        },
        {
          town: "Duko",
          crop: "soyabean",
          region: "northen",
          pesticide: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          firtilizer: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          Rain: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          landpreparation: ["12-04", "11-14"],
        },
        {
          town: "Cheyohi",
          crop: "soyabean",
          region: "northen",
          weeding: ["01-02", "02-25", "08-8"],
          Rain: ["02-04", "06-14", "10-12"],
          landpreparation: ["03-12", "08-20", "06-14"],
          firtilizer: ["06-30"],
          planting: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          pesticide: ["04-04", "06-14"],
        },
        // upper west region *************************
        {
          town: "Guo",
          crop: "soyabean",
          region: "uwr",
          landpreparation: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          planting: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Goli",
          crop: "soyabean",
          region: "uwr",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Zankp",
          crop: "soyabean",
          region: "uwr",
          landpreparation: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          Rain: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          firtilizer: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          pesticide: ["04-04", "06-14"],
        },
        {
          town: "Goriyiri",
          crop: "soyabean",
          region: "uwr",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        // yam ####################################################
        // upper east region *****************
        {
          town: "Sambolgo",
          crop: "yam",
          region: "uer",
          Harvesting: ["02-02", "03-25", "06-8"],
          Rain: ["02-04", "06-14", "08-12"],
          weeding: ["03-12", "08-20", "07-14"],
          planting: ["06-30"],
          firtilizer: ["10-08", "07-12"],
          landpreparation: ["08-27", "12-03"],
          pesticide: ["03-04", "05-14"],
        },
        {
          town: "Gia",
          crop: "yam",
          region: "uer",
          Harvesting: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          firtilizer: ["03-30", "06-30"],
          planting: ["03-31", "07-12", "05-14"],
          landpreparation: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Nyangua",
          crop: "yam",
          region: "uer",
          planting: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          firtilizer: ["03-30", "06-30"],
          landpreparation: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Bonia",
          crop: "yam",
          region: "uer",
          Harvesting: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          pesticide: ["04-30", "08-30"],
          landpreparation: ["05-08", "10-12"],
          planting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        // northen region *****************************
        {
          town: "Tibali",
          crop: "yam",
          region: "northen",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Tingoli",
          crop: "yam",
          region: "northen",
          landpreparation: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          Rain: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          firtilizer: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          pesticide: ["04-04", "06-14"],
        },
        {
          town: "Duko",
          crop: "yam",
          region: "northen",
          weeding: ["03-02", "04-25", "08-8"],
          landpreparation: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          pesticide: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          planting: ["12-04", "11-14"],
        },
        {
          town: "Cheyohi",
          crop: "yam",
          region: "northen",
          planting: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          Rain: ["03-12", "08-20", "06-14"],
          landpreparation: ["06-30"],
          pesticide: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          firtilizer: ["04-04", "06-14"],
        },
        // upper west region *****************************
        {
          town: "Guo",
          crop: "yam",
          region: "uwr",
          landpreparation: ["03-02", "07-25", "12-8"],
          weeding: ["03-04", "07-14", "12-12"],
          Rain: ["02-12", "08-20", "06-14"],
          planting: ["04-30", "08-30"],
          firtilizer: ["05-08", "10-12"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Goli",
          crop: "yam",
          region: "uwr",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
        {
          town: "Zanko",
          crop: "yam",
          region: "uwr",
          landpreparation: ["01-02", "02-25", "08-8"],
          weeding: ["02-04", "06-14", "10-12"],
          Rain: ["03-12", "08-20", "06-14"],
          planting: ["06-30"],
          firtilizer: ["12-08", "08-12"],
          Harvesting: ["04-27", "11-03"],
          pesticide: ["04-04", "06-14"],
        },
        {
          town: "Goriyiri",
          crop: "yam",
          region: "uwr",
          landpreparation: ["03-02", "04-25", "08-8"],
          weeding: ["04-04", "10-14", "12-12"],
          Rain: ["04-12", "05-20", "08-14", "10-14"],
          planting: ["03-30", "06-30"],
          firtilizer: ["03-31", "07-12", "05-14"],
          Harvesting: ["07-27", "12-03"],
          pesticide: ["12-04", "11-14"],
        },
      ],
    };
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
};
</script>

<style scoped>
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
</style>
