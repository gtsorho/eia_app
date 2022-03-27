<template>
    <Navbar/>
    <div class="bg-img">
      <form action="/action_page.php" class="container">
        <div class="input-group  input-group-sm">
          <span class="input-group-text"><img src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png" height="15px"></span>
          <select class="form-select" id="inputGroupSelect01">
            <option selected>Select CropType</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <span class="input-group-text"><img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" height="15px"></span>
          <select class="form-select" id="inputGroupSelect01">
            <option selected>Choose Region</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
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
      <input class="form-check-input bg-warning" disabled type="checkbox" >
      <label class="form-check-label">Harvesting</label>
    </div>
    <div class="form-check form-check-inline mt-4">
      <input class="form-check-input bg-success" disabled type="checkbox">
      <label class="form-check-label">Planting</label>
    </div>
    <div class="form-check form-check-inline mt-4">
      <input class="form-check-input bg-info" disabled type="checkbox">
      <label class="form-check-label">Rain</label>
    </div>
    <div class="form-check form-check-inline mt-4">
      <input class="form-check-input bg-brown" disabled type="checkbox" >
      <label class="form-check-label">Land Preparation</label>
    </div>
    <div class="form-check form-check-inline mt-4">
      <input class="form-check-input bg-secondary" disabled type="checkbox">
      <label class="form-check-label">Weeding</label>
    </div>
    <div class="form-check form-check-inline mt-4">
      <input class="form-check-input bg-orange" disabled type="checkbox">
      <label class="form-check-label">Fertilizer App.</label>
    </div>
    <div class="form-check form-check-inline mt-4">
      <input class="form-check-input bg-danger" disabled type="checkbox">
      <label class="form-check-label ">Pesticide</label>
    </div>
    <Calendar v-for="(item, index) in cropdata" :key="index"  :calendar_data="cropdata[index]" />

    <Footer/>
</template>

<script>
// @ is an alias to /src
import Calendar from '../components/calendarComponent.vue'
import Navbar from '../components/navbar.vue'
import Footer from '../components/footer.vue'



export default {
  name: 'Home',
  components: {   
    Calendar,
    Navbar,
    Footer
  },
  data() {
    return {
        cropdata:[
          {
          town:"accra",
          crop:"maize",
          landpreparation:["02-02","03-25","06-8"],
          weeding:["02-04","06-14","08-12"],
          Rain:["03-12","08-20","07-14"],
          planting:["06-30"],
          firtilizer:["10-08","07-12"],
          Harvesting:["08-27","12-03"],
          pesticide:["03-04", "05-14"]
        },
        {
          town:"Tema",
          crop:"maize",
          landpreparation:["01-02","02-25","08-8"],
          weeding:["02-04","06-14","10-12"],
          Rain:["03-12","08-20","06-14"],
          planting:["06-30"],
          firtilizer:["12-08","08-12"],
          Harvesting:["04-27","11-03"],
          pesticide:["04-04", "06-14"]
        },
        {
            town:"Amasan",
            crop:"maize",
            landpreparation:["03-02","07-25","12-8"],
            weeding:["03-04","07-14","12-12"],
            Rain:["02-12","08-20","06-14"],
            planting:["04-30","08-30"],
            firtilizer:["05-08","10-12"],
            Harvesting:["07-27","12-03"],
            pesticide:["12-04", "11-14"]
          }
        ]
    }
  },
}
</script>

<style scoped>

* {
  box-sizing: border-box;
}
.form-check-input:disabled {
    opacity: 1 !important;
}
.form-check-input {
   border:none;
}
.form-check-input:disabled~.form-check-label, .form-check-input[disabled]~.form-check-label {
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

.form-select{
  background-color: #ffffffb9;
  font-size: .8rem;
  color: rgb(43, 40, 40);
  font-weight: 500;
}
.form-select option{
  background-color: rgba(255, 255, 255, 0.521);
  border-radius: 2px;
  opacity: .5;
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
  left      : 50%;
  top       : 50%;
  transform : translate(-50%, -50%);
}

</style>

<style scoped>
.progress-bar{
      color: #efefef;
}
.bg-brown{
  background-color: rgb(155, 104, 37) !important;
}
.bg-orange{
  background-color: rgb(148, 45, 173) !important;
}
.bg-success{
  background-color: rgb(74, 187, 108) !important;
}
.bg-warning{
  background-color: rgb(241, 186, 35) !important;
}
.bg-info{
  background-color: rgb(74, 174, 204) !important;
}
.bg-secondary{
  background-color: rgb(95, 95, 95) !important;
}
.bg-danger{
  background-color: rgb(255, 109, 73) !important;
}
</style>
