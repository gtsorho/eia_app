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
                <router-link class="btn rounded-pill btn-sm px-4" style="background-color:pink" :to="{name:'Storysetchartboard', params:{data:JSON.stringify(storyset[index].category)}}" >View </router-link>
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
                  icons:"pie-chart.png",
                  category:[
                    {
                      title:'Regional Statistics',
                      description:'Data used for this report was collected from 24 distinct communities across the Northern, Savanna and Upper East regions of Ghana. 47% of records came from the Northern region, 30% of the records were collected in the Savanna region and the remaining 23% came from the Upper East region. Details of records is shown to the left.',
                      chart_type:'Doughnut',
                      datasets: [
                        {
                          lables:['Northern', 'Savanna', 'Upper East']
                        },
                        [],
                        [47,30,23],
                      //  [21,48,13,18],
                      //  [84,14,0,2],
                      ]
                    },
                    // {
                    //   title:'this is a title 2',
                    //   description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias amet illo sit voluptatem at rerum, eos vitae maiores labore, autem ipsam deserunt. Quibusdam nihil corrupti quo neque odio reiciendis voluptatibus.',
                    //   chart_type:'Line',
                    //   datasets: [
                    //     {
                    //       lables:['18-22','23-27','28-32','33-37', '38 & up']
                    //     },
                    //     ['Male', 'Female', 'All'],
                    //     [4,25,42,77,224],
                    //     [2,21,26,38,127],
                    //     [6,46,68,155,391]
                    //   ]
                    // }
                  ]
                },
                {
                  title:'Youth & Gender Distribution of Respondents',
                  description:'A total of 373 farmers forming 59.5% of respondents were males and 254 respondents forming 40.5% were females. Over 62% of the respondents were in the maximum age bracket (above 38 years) with a little less than 1% being between the minimum age bracket of 18 to 22 years.',
                  dataset_id:'ss002',
                  icons:"line-graph (1).png",
                  category:[
                    {
                      title:'Age & Gender Distribution',
                      description:'Data distribution by age bracket show that female farmer population is slightly above male farmer population among the youth (from 18 – 27 years). Within this age bracket, female to male farmer ratio stands at 1 : 0.86. This ratio is becomes 1 : 1 for farmers above 28 years.',
                      chart_type:'Chart',
                      datasets: [
                        {
                          lables:['18-22','23-27','28-32','33-37', '38 & up']
                        },
                        ['Male', 'Female', 'All'],
                        [4,25,42,77,224],
                        [2,21,26,38,127],
                        [6,46,68,155,391]
                      ]
                      // chart_type:'Doughnut',
                      // datasets: [
                      //   {
                      //     lables:['1-4','5-10','6-15','above 16']
                      //   },
                      //   [],
                      //   [21,48,13,18],
                      //   [84,14,0,2],
                      // ]
                    },
                    {
                      title:'Farm size owned by Male and Female',
                      description:'84% of female respondents farm on a land size between 1 and 4 acres as compared to 21% of male respondents who farm on same size of land. On the other hand there are only 2% of female farmers farming on more than 5 acres of land whereas 31% of male farmers farm on more than same 5acres of land. Inner ring for female, outer ring for male',
                      chart_type:'Doughnut',
                      datasets: [
                        {
                          lables:['1-4','5-10','6-15','above 16']
                        },
                        [],
                        [21,48,13,18],
                        [84,14,0,2],
                      ]
                    },
                    {
                      title:'Farmer Dstribution by Farm Size & Age',
                      description:'majority of farmers are above 38 years old. Farm size between 1 to 4 acres dominate across age all groupings.',
                      chart_type:'Chart',
                      datasets: [
                        {
                          lables:['18-22','23-27','28-32','33-37', '38 & up']
                        },
                        ['16 and above', '11 to 15 Acres',' 5 to 10 Acres',' 1 to 4 Acres'],
                        [2,1,4,11,60],
                        [0,3,6,17,23],
                        [2,11,22,43,136],
                        [4,33,37,45,168]
                      ]
                    },
                  ]
                },
                {
                  title:'INSURANCE AFFINITY',
                  description:'10.7% of farmers indicated having no knowledge of crop insurance. Of the remaining 89.3% farmers who indicated having knowledge of farm insurance, 96%  indicated willingness to purchase insurance and only 18.1% of them had actually purchased insurance in the preceding farming season.',
                  dataset_id:'ss002',
                  icons:"scatter-graph.png",
                  category:[
                    {
                      title:'Insurance Affinity by Education',
                      description:'The likelihood of a farmer being informed about insurance irrespective of education level stands at 69.4%. However, farmers with a minimum of senior high education are shown to possibly have a 28.6% affinity towards insurance purchase as compared to 16.7% affinity for farmers with lower education level.',
                      chart_type:'Doughnut',
                      datasets: [
                        {
                          lables:['below SHS','minimal of SHS','No education']
                        },
                        [],
                        [28.8,16.7,54.5],
                      ]
                    },
                    {
                      title:'Educational Affinity',
                      description:'Maize is registered as the most insured crop leading with 77.2% of purchased insurance followed by groundnut forming 15.8% of purchased insurance. Only one farmer insured soyabean. While no specific mention is made of cowpea insurance, some 7% of farmers purchased insurance for other varieties of crops including rice.',
                      chart_type:'Radar',
                      datasets: [
                        {
                          lables:['Maize','Groundnut','Others']
                        },
                        ['Registed Crop'],
                        [77.2,15.8,7  ],
                      ]
                    }
                  ]
                },
                {
                  title:'Farm Stress',
                  description:'94% of the farmers are affected by one form of farm stress or another with delayed rainfall being the most reported stress. Strong storms and shortage of water for animals were the lest reported stress. A breakdown of the reported stress is depicted below.',
                  dataset_id:'ss003',
                  icons:"bar-chart.png",
                  category:[
                    {
                      title:'Reported Stress by Farm Size',
                      description:'Delayed rainfall recorded the highest stress impact on farmers within the three regions. A majority of the farmers under the various stress indices are the small holder farmers. Water shortages (for both animal and humans), erratic temperatures and strong storms recorded the least impact on farmers in the regions.',
                      chart_type:'Doughnut',
                      other: 'From inner Circle: First is Delayed Rainfall, Second is Drought, Third is Flood ',
                      datasets: [
                        {
                          lables:['1-4','5-10','6-15','above 16']
                        },
                        [],
                        [116,92,16,22],
                        [45,48,11,16],
                        [53,26],
                      ]
                    },
                    {
                      title:'Affected Farmers Against Farm Size',
                      description:'Its observed that pest, forage and fires also contribute to farm stress, 55%, 70%, 70% and 75% caused by pests; 42%, 9% and 11% by Forage; and 7%, 21%, 19%, 25% by fires. All against farm size respectively',
                      chart_type:'Chart',
                      other: '',
                      datasets: [
                        {
                          lables:['1-4','5-10','6-15','above 16']
                        },
                        ['Pest Outbreak', 'Forage Shortage', 'Bush fires'],
                        [27,26,7,6],
                        [19,3,1,0],
                        [4,8,2,2],
                      ]
                    },
                     {
                      title:'Affected Farmers Against Farm Size',
                      description:'The distribution of farmers affected by Disease Outbreak(Livestock), Erratic Temperature, Water Shortage (For Humans), Water Shortage (For Animals) and Strong Storm',
                      chart_type:'Line',
                      datasets: [
                        {
                          lables:['1-4','5-10','6-15','above 16']
                        },
                        ['Disease(Livestock)', 'Erratic Temperature', 'Water Shortage(Humans)', 'Water Shortage(Animals)','Strong Storm'],
                        [7,1,1,3],
                        [5,3,0,1],
                        [2,0,0,0],
                        [0,0,1,0],
                        [0,1,0,0]
                      ]
                    }                    
                  ]
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