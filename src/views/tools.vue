<template>
    <div class="container my-5">
<div class="row row-cols-md-2 row-cols-lg-3 justify-content-center">
    <div  class="col-lg-4" v-for="(story, index) in storyset" :key="index">
        <div class="card card-margin">
            <div class="card-body pt-3" style="height: 75%;">
                <div class="widget-49">
                    <div class="widget-49-title-wrapper">
                        <div class="widget-49-date-primary">
                            <i :class="icons[index]"></i>
                            <!-- bi bi-bar-chart-line fs-2 -->
                        </div>
                        <div class="widget-49-meeting-info mx-auto py-2 rounded-pill" style="width: 70%; background-color:#ffd2d6" >
                            <span class="widget-49-pro-title fw-bold text-uppercase">{{story.title}}</span>
                            <!-- <span class="widget-49-meeting-time">12:00 to 13.30 Hrs</span> -->
                        </div>
                    </div>
                    <p class="widget-49-meeting-points">{{story.description}}</p>
                </div>
            </div>
            <div class="widget-49-meeting-action card-footer border-0 bg-transparent">
                <a href="#" class="btn btn-sm float-end btn-flash-border-primary">View All</a>
            </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
export default {
    data() {
        return {
            searchbar:false,
            signin:true,
            authenticated:true,
            storyset:[
                {
                    title:'Cropping Calendar',
                    description:'Data used for this report was collected from 24 distinct communities across the Northern, Savanna and Upper East regions of Ghana. 47% of records came from the Northern region, 30% of the records were collected in the Savanna region and the  remaining 23% came from the Upper East region. Details of records is shown to the left.',
                    dataset_id:'ss001'
                },
                {
                    title:'Weather Api',
                    description:'A total of 373 farmers forming 59.5% of respondents were males and 254 respondents forming 40.5% were females. Over 62% of the respondents were in the maximum age bracket (above 38 years) with a little less than 1% being between the minimum age bracket of 18 to 22 years.',
                    dataset_id:'ss002'
                },
                
            ],
            icons:[
                'bi bi-calendar-week fs-2',
                'bi bi-cloud-sun-fill fs-2',
                'bi bi-pie-chart-fill fs-2',
                'bi bi-graph-up fs-2',
                'bi bi-pie-chart fs-2'
            ],
            widgetColors:[
                'widget-49-date-primary',
                'widget-49-date-secondary',
                'widget-49-date-dark',
                'widget-49-date-danger',
                'widget-49-date-success',
                'widget-49-date-warning',
                'widget-49-date-info',
            ]
        }
    },  
    mounted(){
      if(!this.authenticated){
        setTimeout(() => {
          this.$refs.modalclick.click();
        }, 3000);
      }
    },
    methods: {
      adddataset(){
        if(!this.authenticated){
          this.$refs.modalclick.click();
        }else{
          this.$refs.addDatasetTrig.click()
        }
      },
      fileupload(){
        console.log(document.getElementsByClassName('fileUpload'))
      },
      showpassword(){
        const password = document.getElementsByClassName('password');
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);

        // Toggle the eye and bi-eye icon
        
        if(type === 'password'){
          document.getElementById('togglePassword').classList.add('bi-eye');
          document.getElementById('togglePassword').classList.remove('bi-eye-slash');
        }else{
          document.getElementById('togglePassword').classList.add('bi-eye-slash');
          document.getElementById('togglePassword').classList.remove('bi-eye');
        }
      }
    },
    created(){
      
    }
}
</script>

<style scoped>
input[type=file]::file-selector-button {
  border: 2px solid #7567d900;
  padding: .2em .4em;
  border-radius: .2em;
  background-color: #5c5c5c;
  transition: 1s;
  
}
.form-control[data-v-6a57b8d6]:focus {
    
    background-color: rgb(176 176 176 / 0%) !important;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0%) !important;
}

input[type = file]{
    display: inline !important;
    width: auto !important;
    border: none !important;
    background-color:#d2691e00;
    margin-inline: 5px;
}
input[type=file]::file-selector-button:hover {
  background-color: #81ecec;
  border: 2px solid #00cec9;
}

.modal-header {
    border-bottom: 1px solid #dee2e634;
}

.modal-footer{
    border-top: 1px solid #dee2e634;
}


/* #formFileSm {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
#formFileSm + .formFilelable {
    font-weight: 700;
    color: rgb(216, 216, 216);
    border: 2px solid #98989882;
    display: inline-block;
    border-radius: 50px;
}

#formFileSm:focus + .formFilelable,
#formFileSm + .formFilelable:hover {
    background-color: rgba(141, 141, 141, 0.173);
} */

.float{
	position:fixed;
	width:41px;
	height:40px;
	bottom:70%;
	left:15px;
	background-color:rgb(60, 62, 62);
	color:#FFF;
	border-radius:50px;
  transition: transform .2s;
	text-align:center;
	box-shadow: 0px 0px 5px #999;
}
.my-float{
    position: absolute;
    top: 4%;
    left: 23%;
}
.float:hover{
  transform: scale(1.1); 
	background-color:rgb(75, 76, 76);

}

/* ********************** */
.float2{
	position:fixed;
	width:41px;
	height:40px;
	bottom:80%;
	left:15px;
	background-color:rgb(60, 62, 62);
	color:#FFF;
	border-radius:50px;
  transition: width 1s;
  transition-timing-function: ease-in-out;
	text-align:center;
	box-shadow: 0px 0px 5px #999;
}
.my-float2{
    position: absolute;
    top: 12%;
    left: 100%;
      transition: transform 1s;
  transition-timing-function: ease-in-out;
}
.float2:hover .my-float2{
    font-size: 15px !important;
    transform: translate(-4px,0px);
    margin-block: 5px;
}
.float2:hover{
  width:200px;
	background-color:rgb(75, 76, 76);

}

.search{
    width: 90%;
    display: block;
    min-height: 0% !important;
    background-color: #ffffff00;
    color: #e8e8e8;
    border: 2px solid #ced4da;
    max-height: 25px !important;
    border-radius: 50px;
    margin: .45rem!important;
    margin-inline: 0.6rem !important
}

form a{
  color: #72bcec;
}
.form-control:focus {
    color: #e8e8e8;
    background-color: rgb(176 176 176 / 17%);
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
}

.form-control {
    color: #e8e8e8;
    background-color: rgb(176 176 176 / 17%);
}

.search:focus {
    color: #e8e8e8;
    background-color: rgb(176 176 176 / 17%);
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
}

form i, .bi-search {
    margin-left: -30px;
    cursor: pointer;
  }

.modal-footer, .modal-header{
  padding: .5rem !important;
}

.card-margin {
    margin-bottom: 1.875rem;
}

.card {
    border: 0;
    box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -webkit-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -moz-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -ms-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #ffffff;
    background-clip: border-box;
    border: 1px solid #e6e4e9;
    border-radius: 8px;
    height: 90%;
}

.card .card-header.no-border {
    border: 0;
}
.card .card-header {
    background: none;
    padding: 0 0.9375rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    min-height: 50px;
}
.card-header:first-child {
    border-radius: calc(8px - 1px) calc(8px - 1px) 0 0;
}

.widget-49 .widget-49-title-wrapper {
  display: flex;
  align-items: center;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ffd2d6;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: #f7667f;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #e3e3e3;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: #616161;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}


.widget-49 .widget-49-title-wrapper .widget-49-date-success {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #e8faf8;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: #17d1bd;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ebf7ff;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
    color: #36afff;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-warning {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: floralwhite;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
   color: #FFC868;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-danger {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #feeeef;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
    color: #F95062;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}


.widget-49 .widget-49-title-wrapper .widget-49-date-light {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fefeff;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
    color: #f7f9fa;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}


.widget-49 .widget-49-title-wrapper .widget-49-date-dark {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ebedee;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
    color: #394856;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}


.widget-49 .widget-49-title-wrapper .widget-49-date-base {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f0fafb;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: #68CBD7;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-meeting-info {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
}

.widget-49 .widget-49-title-wrapper .widget-49-meeting-info .widget-49-pro-title {
  color: #3c4142;
  font-size: 14px;
}

.widget-49 .widget-49-title-wrapper .widget-49-meeting-info .widget-49-meeting-time {
  color: #B1BAC5;
  font-size: 13px;
}

.widget-49 .widget-49-meeting-points {
  font-weight: 400;
  font-size: 13px;
  margin-top: .5rem;
}


.widget-49 .widget-49-meeting-action {
  text-align: right;
}

.widget-49 .widget-49-meeting-action a {
  text-transform: uppercase;
}
</style>