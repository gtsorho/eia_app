<template>
<div class="container my-5">
  <div class="my-4 text-start">
    <h3>Our Narrative</h3>
    <p >
      This Page details findings from exploratory to in-depth analysis (quantitative and qualitative) of a decade 
      of data gathered and stored by the Africa RISING Dataverse portal. This report’s focus is centered on the 
      cultivation of maize, soybean, cowpea and groundnut in the upper regions of Ghana. However, highlights are 
      thrown on other crops of interest where the data supports our objective. 
    </p>
    <a class="btn rounded-pill btn-sm px-4 text-light text-uppercase lmore border border-success border-2"  href="http://aghub.miphost.com/api/datalake/download/Assembled_Knowledge_V2.pdf">learn More <i class="bi bi-arrow-right-short"></i></a>
  </div>
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
                  <router-link class="btn rounded-pill btn-sm px-4 text-light text-uppercase" style="background-color:rgb(85 176 71); font-weight:700; font-size:14px !important " :to="{name:'Storysetchartboard', params:{data:JSON.stringify(storyset[index].category)}}" >View <i class="bi bi-arrow-right-short"></i> </router-link>
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
                  title:'EDUCATION LEVELS',
                  description:'Data used for this report was collected from 24 distinct communities across the Northern, Savanna and Upper East regions of Ghana. 47% of records came from the Northern region, 30% of the records were collected in the Savanna region and the  remaining 23% came from the Upper East region. Details of records is shown to the left.',
                  dataset_id:'ss003',
                  icons:"pie-chart.png",
                  category:[
                    {
                      title:'EDUCATION LEVEL OF FEMALE FARMERS WITH FARM SIZE BETWEEN 1 – 4 ACRES',
                      description:'Data used for this report was collected from 24 distinct communities across the Northern, Savanna and Upper East regions of Ghana. 47% of records came from the Northern region, 30% of the records were collected in the Savanna region and the remaining 23% came from the Upper East region. Details of records is shown to the left.',
                      chart_type:'Doughnut',
                      datasets: [
                        {
                          lables:['No Education', 'Basic Level', 'JHS', 'SHS', 'O-level', 'Tertiary level']
                        },
                        [],
                        [85,7,6,1,1,0],
                        [58,5,10,20,3,4]
                      ]
                    },
                    {
                      title:'EDUCATION LEVEL OF FEMALE FARMERS WITH FARM SIZE BETWEEN 5 – 10 ACRES',
                      description:'Data used for this report was collected from 24 distinct communities across the Northern, Savanna and Upper East regions of Ghana. 47% of records came from the Northern region, 30% of the records were collected in the Savanna region and the remaining 23% came from the Upper East region. Details of records is shown to the left.',
                      chart_type:'Chart',
                      datasets: [
                        {
                          lables:['No Education', 'Basic Level', 'JHS', 'SHS', 'O-level', 'Tertiary level']
                        },
                        ['Female', 'Male'],
                        [70,5,5,18,0,2],
                        [79,10,6,1,1,3]
                      ]
                    },
                    {
                      title:'EDUCATION LEVEL OF FEMALE FARMERS WITH FARM SIZE BETWEEN 11 – 15 ACRES',
                      description:'Data used for this report was collected from 24 distinct communities across the Northern, Savanna and Upper East regions of Ghana. 47% of records came from the Northern region, 30% of the records were collected in the Savanna region and the remaining 23% came from the Upper East region. Details of records is shown to the left.',
                      chart_type:'line',
                      datasets: [
                        {
                          lables:['No Education', 'Basic Level', 'JHS', 'SHS', 'O-level', 'Tertiary level']
                        },
                        ['Female', 'Male'],
                        [100],
                        [59,22,11,6,0,2]
                      ]
                    },
                                        {
                      title:'EDUCATION LEVEL OF FEMALE FARMERS WITH FARM SIZE OF 16 ACRES AND ABOVE',
                      description:'Data used for this report was collected from 24 distinct communities across the Northern, Savanna and Upper East regions of Ghana. 47% of records came from the Northern region, 30% of the records were collected in the Savanna region and the remaining 23% came from the Upper East region. Details of records is shown to the left.',
                      chart_type:'Doughnut',
                      datasets: [
                        {
                          lables:['No Education', 'Basic Level', 'JHS', 'SHS', 'O-level', 'Tertiary level']
                        },
                        ['Female', 'Male'],
                        [85,7,6,1,1,0],
                        [84,3,3,3,0,7]
                      ]
                    },
                  ] 
                },
                {
                  title:'FARM LAND OWNERSHIP',
                  description:'609 farmers forming 97.13% of the farmers own the lands they farm on leaving only 18 farmers forming 2.87% of the farmers who farm on lands obtained by other means.',
                  dataset_id:'ss004',
                  icons:"pie-chart.png",
                  category:[
                    {
                      title:'BREAKDOWN OF 609 FARMERS',
                      description:'56.36% of farmers with farm size between 1-4 acres own the lands individually or jointly with their spouse. 71.76% of farmers with farm size between 5-10 acres own the lands individually or jointly with their spouse. 78.72% of farmers with farm size above 16 acres own the lands individually or jointly with their spouse. 71.23% of farmers with farm size above 16 acres own the lands individually or jointly with their  spouse', 
                      chart_type:'Radar',
                      datasets: [
                        {
                          lables:['Personal', 'Family Land', 'Joint with Spouse', 'Comimunal Land', 'Others']
                        },
                        ['All Farmers'],
                        [321,260,87,10,9]
                      ]
                    },
                    {
                      title:'Use Of Family Lands for Farming',
                      description:'42.99% of farmers with farm size between 1-4 acres, 28.02% of farmers with farm size between 5-10 acres, 21.28% of farmers with farm size above between 11-15 acres, 28.77% of farmers with farm size above 16 acres make use of family lands',
                      chart_type:'Chart',
                      datasets: [
                        {
                          lables:['16 and above', '11 to 15 Acres',' 5 to 10 Acres',' 1 to 4 Acres']
                        },
                        ['Farmers'],
                        [28.77, 21.28, 28.02, 42.99]
                      ]
                    },
                    {
                      title:'OTHER LAND SOURCES (18 FARMERS)',
                      description:'Out of all farmers 18 farmers, land sources included renting, leasing, requesting from friend and from others sources, and Land sizes included 5-10 and 1-4 Acres. However, none of the farmers with farm size above 10 acres acquired their land on lease, rent or from a friend.',
                      chart_type:'Chart',
                      datasets: [
                        {
                          lables:['Leasing', 'Renting','Request From Friend','Others']
                        },
                        ['General','Other Land Sources (5 – 10 Acres)', 'Other Land Sources (1 – 4 Acres)'],
                        [15.79, 15.79,63.16,5.26 ],
                        [10.53, 0, 10.53, 0],
                        [5.26, 15.79, 52.63, 5.26]

                      ]
                    }
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
                      title:'Insurance Affinity by Crop',
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
                  title:'INSURANCE',
                  description:'Of a total of 144 farmers who insured their crops, six (6) of them are unwilling to continue mostly because of non-payment of payouts by insurance companies. Only one farmer would not continue because of the cost involved.',
                  dataset_id:'ss002',
                  icons:"pie-chart.png",
                  category:[
                    {
                      title:'FARMER OPINION ON INSURANCE COST',
                      description:'Out of all Farmers 86% found insuring their crops affordable, 8% very affordable, whereas 6% found insuring their crops as very expensive',
                      chart_type:'Doughnut',
                      datasets: [
                        {
                          lables:['Affordable','Very Affordable','Expensive']
                        },
                        [],
                        [86,8,6],
                      ]
                    },
                    {
                      title:'Willingness of farmer Purchase',
                      description:' 88.2 % of the farmers are willing to pay insurance e for improved fertilizer. whereas 66.7 % of the farmers can afford improved fertilizer. And e for improved fertilizer whareas •69.4 % of the farmers can afford improved seed',
                      chart_type:'Chart',
                      datasets: [
                        {
                          lables:['Willingness ot buy','Ability to buy']
                        },
                        ['Improved Crop', 'Improved Fertilizer'],
                        [84.8, 69.4],
                        [88.2,66.7],

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
                },
                {
                  title:'STATISTICS ON USAGE OF IMPROVED SEEDS',
                  description:'The data however shows that 49.76% of the farmers had actually purchased improved seeds at the time of investigation which is about 18.69% less than the average percentage of farmers who had indicated willingness to purchase improved seeds',
                  dataset_id:'ss002',
                  icons:"scatter-graph.png",
                  category:[
                    {
                      title:'LAND SIZE OF FARMERS USING IMPROVED SEEDS',
                      description:'Within the group of farmers who actually had improved seeds, inverse to the indication of interest in purchasing improved seeds, it is seen that 60.83% of farmers with farm size greater than 10 acres actually had improved seeds as compared to 46.94% of farmers with land size less than 10acres who actually had improved seeds.',
                      chart_type:'Chart',
                      datasets: [
                        {
                          lables:['less than 10 acres','more than 10 acres']
                        },
                        ['Land Size of farmers Vs Improved seeds'],
                        [60.83, 46.94],
                      ]
                    },
                    {
                      title:'Willingness of farmer Purchase',
                      description:'The survey shows that farmers are very interested in purchasing insurance and have also indicated high interest and ability to pay for improved seed and fertilizer',
                      chart_type:'Doughnut',
                      datasets: [
                        {
                          lables:['Farmer Affinity','Increased Affinity']
                        },
                        [],
                        [45.5, 86.1],
                        [45.5,87.2],

                      ]
                    }, 
                    {
                      title:'INPUT CREDIT - SEED',
                      description:'Farmers across all sizes of farm need some credit for seed input. The need reduces slightly for farmers with farm size above 15 acres.',
                      chart_type:'Chart',
                      datasets: [
                        {
                          lables:['1-4','5-10','6-15','above 15']
                        },
                        ['Require Input Credit', 'Does not Require Input Credit' ],
                        [84,87,87.2,68.5],
                        [10.6,13,12.8,31.5]
                      ]
                    },
                  ]
                },
                {
                  title:'Do Farmers work outside their farms?',
                  description:'In total, 52.7% of the farmers have other jobs aside farming. Of all the male respondents, there are 48.8% of the responding male farmers who are engaged in other jobs as compared with 57.8% of the female farmers engaged in other jobs beside their regular farming activities.',
                  dataset_id:'ss002',
                  icons:"line-graph (1).png",
                  category:[
                    {
                      title:'Do Farmers work outside?',
                      description:'Within the group of farmers who actually had improved seeds, inverse to the indication of interest in purchasing improved seeds, it is seen that 60.83% of farmers with farm size greater than 10 acres actually had improved seeds as compared to 46.94% of farmers with land size less than 10acres who actually had improved seeds.',
                      chart_type:'Chart',
                      datasets: [
                        {
                          lables:['All Survey']
                        },
                        ['Yes', 'No'],
                        [52.7, 47.3],
                      ]
                    },
                    {
                      title:'Percentage of male Vs Percentage of female farmers doing other jobs', 
                      description:'Of all the male respondents, there are 48.8% of the responding male farmers who are engaged in other jobs as compared with 57.8% of the female farmers engaged in other jobs beside their regular farming activities.',
                      chart_type:'Doughnut',
                      datasets: [
                        {
                          lables:['Male farmers do other jobs','Female farmers do other jobs']
                        },
                        [],
                        [57.8, 48.8],
                      ]
                    }, 
                    {
                      title:'LIVESTOCK',
                      description:'83.7% of the respondents have households that keep livestock. Of five kinds of livestock (Sheep, goat, cattle, chicken, guinea fowl and pigs) kept by these holds,',
                      chart_type:'Line',
                      datasets: [
                        {
                          lables:['Sheep', 'Goat', 'Cattle', 'Chicken', 'Guinea Fowl' , 'Pig']
                        },
                        ['Total Number Of Livestocks kept', 'No. Households Keeping Livestock' ],
                        [1487, 2519, 1420, 7573, 4287, 193],
                        [248, 370, 118, 458, 221, 32]
                      ]
                    },
                  ]
                },
                {
                  title:'TECHNOLOGY & FARMER HOUSEHOLDS',
                  description:'In total, 52.7% of the farmers have other jobs aside farming. Of all the male respondents, there are 48.8% of the responding male farmers who are engaged in other jobs as compared with 57.8% of the female farmers engaged in other jobs beside their regular farming activities.',
                  dataset_id:'ss002',
                  icons:"pie-chart.png",
                  category:[
                    {
                      title:'Do Farmers work outside?',
                      description:'All farmer who had either senior high, O/A level or tertiary education also owned a mobile phone. Of a total of the 78 farmers forming who did not have mobile phones.',
                      chart_type:'Doughnut',
                      datasets: [
                        {
                          lables:['Yes', 'No']
                        },
                        [],
                        [87.54, 12.48],
                      ]
                    },
                    {
                      title:'Percentage of male Vs Percentage of female farmers doing other jobs', 
                      description:'Of all the male respondents, there are 48.8% of the responding male farmers who are engaged in other jobs as compared with 57.8% of the female farmers engaged in other jobs beside their regular farming activities.',
                      chart_type:'Doughnut',
                      datasets: [
                        {
                          lables:['Male farmers do other jobs','Female farmers do other jobs']
                        },
                        [],
                        [57.8, 48.8],
                      ]
                    }, 
                    {
                      title:'Access to Climate Information Services',
                      description: 'This was a survey to acertain if farmers have access to Climate Information Service 91 farmers answered Yes whiles  7 answered No',
                      chart_type:'Chart',
                      datasets: [
                        {
                          lables:['Yes', 'No']
                        },
                        ['Do Farmers have access you Climate Info'],
                        [97,7],
                      ]
                    },
                    {
                      title:'Climate Information Source',
                      description: 'Farmers recieve Climate information from various sources thus radio, mobile phones, televion as well as word of mouth',
                      chart_type:'Doughnut',
                      datasets: [
                        {
                          lables:['Moblie Phones', 'Radio', 'Televion', 'Word of Mouth']
                        },
                        [],
                        [22,44,10,24],
                      ]
                    },
                  ]
                }
            ],
        }
    },  
}
</script>

<style scoped>
.lmore{
  background-color:#c3521f !important;
}

.lmore:hover{
  background-color: #452d22 !important;
}

.card-margin {
    margin-bottom: 1.875rem;
}

.card-footer a:hover{
  background-color: rgb(0 104 56)!important;
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
  background-color: #6aa06351;
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