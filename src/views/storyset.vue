<template>
    <div class="container my-5">
<div class="row row-cols-md-2 justify-content-center row-cols-lg-3">
    <div  class="col-lg-4" v-for="(story, index) in storyset" :key="index">
        <div class="card card-margin">
            <div class="card-body pt-3" style="min-height:80%">
                <div class="widget-49">
                    <div class="widget-49-title-wrapper">
                        <div class="widget-49-date-primary">
                          <img  :src="require('../assets/icons/' + story.icons)">
                            <!-- bi bi-bar-chart-line fs-2 -->
                        </div>
                        <div class="widget-49-meeting-info mx-auto" style="width: 70%;">
                            <span class="widget-49-pro-title fw-bold text-uppercase">{{story.title}}</span>
                            <!-- <span class="widget-49-meeting-time">12:00 to 13.30 Hrs</span> -->
                        </div>
                    </div>
                    <p class="widget-49-meeting-points">{{story.description}}</p>
                </div>
            </div>
            <div class="widget-49-meeting-action card-footer border-0 bg-transparent text-end">
                <a href="#" class="btn rounded-pill btn-sm px-4" style="background-color:pink">View</a>
            </div>
        </div>
    </div>
</div>
<br><br>
</div>
</template>
<script>
export default {
    data() {
        return {
            storyset:[
                {
                  title:'Statistics of the Dataset',
                  description:'Data used for this report was collected from 24 distinct communities across the Northern, Savanna and Upper East regions of Ghana. 47% of records came from the Northern region, 30% of the records were collected in the Savanna region and the  remaining 23% came from the Upper East region. Details of records is shown to the left.',
                  dataset_id:'ss001',
                  icons:"pie-chart.png"
                },
                {
                  title:'Youth & Gender Distribution of Respondents',
                  description:'A total of 373 farmers forming 59.5% of respondents were males and 254 respondents forming 40.5% were females. Over 62% of the respondents were in the maximum age bracket (above 38 years) with a little less than 1% being between the minimum age bracket of 18 to 22 years.',
                  dataset_id:'ss002',
                  icons:"line-graph (1).png"
                },
                {
                  title:'INSURANCE AFFINITY',
                  description:'10.7% of farmers indicated having no knowledge of crop insurance. Of the remaining 89.3% farmers who indicated having knowledge of farm insurance, 96%  indicated willingness to purchase insurance and only 18.1% of them had actually purchased insurance in the preceding farming season.',
                  dataset_id:'ss002',
                  icons:"scatter-graph.png"
                },
                {
                  title:'Farm Stress',
                  description:'94% of the farmers are affected by one form of farm stress or another with delayed rainfall being the most reported stress. Strong storms and shortage of water for animals were the lest reported stress. A breakdown of the reported stress is depicted below.',
                  dataset_id:'ss003',
                  icons:"bar-chart.png"
                }
            ],
        }
    },  
}
</script>

<style scoped>

.card-margin {
    margin-bottom: 1.875rem;
}

.card-footer a:hover{
  background-color: rgb(250, 151, 167) !important;
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
  background-color: rgba(255, 192, 203, 0.447);
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
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