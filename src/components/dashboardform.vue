<template>
    <!-- offcanvas -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <!-- offcanvas header -->
        <div class="offcanvas-header">
                <h6 class="offcanvas-title fw-bolder text-capitalize" id="offcanvasExampleLabel">Dashboard</h6>
            
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <!-- offcanvas header end | offcanvas body start -->
        <div class="offcanvas-body">
            <!-- accordion -->
            <div class="accordion accordion-flush border-0" id="accordionPanelsStayOpenExample">
                <!-- accordion item  -->
                <div class="accordion-item shadow-lg border-0 border-bottom rounded-3 mb-3" v-for="(data, index) in datasets" :key="index" v-show="index < 6">
                    <!-- accordion header -->
                    <div class="accordion-header " :id="`panelsStayOpen-heading${index}`">
                        <button class="accordion-button text-dark fw-normal rounded-3 " style="width:100% !important;font-size:12px;background-image: linear-gradient(45deg, #80c976, transparent)"  data-bs-toggle="collapse"
                            :data-bs-target="`#panelsStayOpen-collapse${index}`" aria-expanded="true"
                            :aria-controls="`panelsStayOpen-collapse${index}` ">
                            <span class="d-flex justify-content-between w-100 pt-0">
                                <select class="form-select sourceBtn form-select-sm border-0" @change="getColumns(datasets[index].activeSrc, index)" style="background-color: transparent !important; border-bottom: 1px solid #aaaaaa75  !important;"  v-model="datasets[index].activeSrc" aria-label=".form-select-sm example">
                                    <!-- <option :value="source.dbref" v-for="(source, i) in dataSources" :key="i">{{source.dbname}}</option> -->
                                    <option value="datalake" >Africa Rising</option>
                                    <option value="" v-show="datasets[index].activeSrc == ''">No source selected</option>
                                </select>
                                <img src="../assets/trash.gif" style="width: 20px; height: 20px;" @click="datasets.splice(index, 1)">
                            </span>
                        </button>
                    </div>
                    <!-- accordion header end -->
                    <div :id="`panelsStayOpen-collapse${index}`" class="accordion-collapse collapse show"
                        :aria-labelledby="`panelsStayOpen-heading${index}`">
                        <div class="accordion-body p-0">
                            <!-- form item -->
                            <form class=" py-1 px-3 rounded-3 ">
                                <div class="text-start mb-1">
                                    <label for="exampleFormControlInput1" class="form-label mb-0"
                                        style="font-size:10px">Y-data</label>
                                    <select class="form-select rounded-pill form-select-sm"  v-model="datasets[index].y_data" aria-label=".form-select-sm example">
                                        <option value="choose data" disabled >Y-Data</option>
                                        <option :value="option" v-for="(option, i) in datasets[index].y_dataArr" :key="i">{{option}}</option>
                                        {{datasets[index].xyKeys[1] = this.getKeyByValue( datasets[index].y_dataArr, datasets[index].y_data) }}
                                    </select>
                                </div>
                                <div class="text-start mb-1">
                                    <label for="exampleFormControlInput1" class="form-label mb-0"
                                        style="font-size:10px">X-Data</label>
                                    <select class="form-select rounded-pill form-select-sm" @change="getFormValue(index)" v-model="datasets[index].x_data" aria-label=".form-select-sm example">
                                        <option value="choose data" disabled >X-Data</option>
                                        <option v-show="option != 'Population'" :value="option" v-for="(option, i) in datasets[index].x_dataArr" :key="i">{{option}}</option>
                                        {{datasets[index].xyKeys[0] = this.getKeyByValue(datasets[index].x_dataArr, datasets[index].x_data) }}
                                    </select>
                                </div>
                            </form>
                            <!-- form item end-->
                            <p class="text-danger mt-3" style="font-size:12px" v-show="datasets[index].errMsg != ''"> <i class="bi bi-exclamation-circle-fill"></i> {{datasets[index].errMsg}}</p>
                        </div>
                    </div>
                </div>
                <!-- accordion item end -->
            </div>
            <button class="btn btn-warning float-end btn-sm rounded-pill" style="font-size:12px" @click="addPanel()">Add Panel</button>

            <a class="text-warning float-start text-decoration-none fw-bolder " style="font-size:12px"  href="#" @click="$emit('powerClick')">Go to PowerBi</a>
            <!-- accordion end -->
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
import { reactive } from 'vue'

    export default {
        name: "dashboardform",
        emits:[
            "panelValues",
            'powerClick'
            ],
        data() {
            return {
                
                dataSources:[],
                datasets: [
                    {   
                        activeSrc:'',
                        datasetVal:'default',
                        x_data: "choose data",
                        y_data: "choose data",
                        errMsg:'',
                        chartVals:[
                            { 
                                x_data: ['xdump'],
                                y_data:[[0]]
                            },
                            ['legend']
                        ],
                        xyKeys:['x data', ' y data'],
                        show:true,
                        y_dataArr:[],
                        x_dataArr:[],
                    },
                ],

                // form data to send************************
                
            }
        },
        created(){
            
            this.getSources()
        },
        methods: {
            getColumns(db, index){
                axios.get(`https://aghub.miphost.com/api/datalake/columns/${db}`)
                .then(response =>  {
                    this.datasets[index].y_dataArr = response.data
                    this.datasets[index].x_dataArr = response.data
                    this.datasets[index].y_dataArr.unshift("Population"); 
                }).catch(error => {
                    console.log(error)
                })
            },
            getSources(){
                axios.get('https://aghub.miphost.com/api/datalake/sources')
                .then(response =>  {
                    this.dataSources = response.data
                }).catch(error => {
                    console.log(error)
                })
            },
            getKeyByValue(object, value){
                return Object.keys(object).find(key => object[key] === value);
            },
            addPanel() {
                this.datasets.push(
                    {
                        activeSrc:'',
                        datasetVal:'default',
                        x_data: "choose x data",
                        y_data: "choose y data",
                        errMsg:'',
                        xyKeys:['x data', ' y data'],
                        chartVals:[
                            { 
                                x_data: ['xdump'],
                                y_data:[[0]]
                            },
                            ['legend']
                        ],
                        show:false,
                        y_dataArr:[],
                        x_dataArr:[],
                    }
                )
            },
            getFormValue(i){
                console.log(i)
                let url
                    if(this.datasets[i].x_data == this.datasets[i].y_data){
                        this.datasets[i].errMsg= 'independent and dependent data must be of different fields'
                        return
                    }else{
                        this.datasets[i].errMsg= ''

                        if (this.datasets[i].y_data == 'Population' ){
                            url = 'https://aghub.miphost.com/api/datalake/ixd'
                        }else{
                            url= 'https://aghub.miphost.com/api/datalake/dxd'
                        }

                        axios.post(url,{
                        x:this.datasets[i].x_data,
                        y:this.datasets[i].y_data
                        })
                        .then(response =>  {
                            this.datasets[i].chartVals = response.data
                            this.datasets[i].show = true
                            if(this.datasets[i].chartVals){
                                this.$emit("panelValues", this.datasets)
                            }
                            console.log(this.datasets)
                        }).catch(error => {
                        console.log(error)
                        })
                    }
            },
        },
        computed:{
            jsColor(){
                return ;
            }
        }  
    }
</script>
<style scoped>
.accordion-button{
    height: 30px;
}

.sourceBtn{
    border-radius: 0%;
    padding-bottom: .1rem;
    font-size: .7rem;
    width: 200px;
    background: none;
}
.form-select:focus {
    border-color: #86b6fe00;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 109, 253, 0);
}
.trashbtn{

    width: 10% !important;
    padding: 0rem 0.25rem;
    border-end-start-radius: 0px;
    border-end-end-radius: 0px;
    border-start-start-radius: 0px;
    border: 0px !important;
    height: 32px;
    background-color: #4fab43;
}
.form-select{
    background-color: #c1ebbb8d;
    font-size: .75rem!important;
}
.trashbtn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0%);
}
.bi-trash3-fill:hover{
    opacity: .5;
}
.accordion-button:not(.collapsed)::after {
   display: none;
}
.accordion-button::after {
   display: none ;
}
.accordion-button:focus {
    z-index: 3;
    border-color: #86b6fe00;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 109, 253, 0);
}
.accordion-button:not(.collapsed) {
    
    background-color: #ffffff;
}

</style>
<style scoped>
/* .accordion-button{
    height: 30px;
}
.trashbtn{

    width: 10% !important;
    padding: 0rem 0.25rem;
    border-end-start-radius: 0px;
    border-end-end-radius: 0px;
    border-start-start-radius: 0px;
    border: 0px !important;
    height: 32px;
    background-color: #4fab43;
}
.form-select{
    background-color: #4fab431d;
}
.trashbtn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0%);
}
.bi-trash3-fill:hover{
    opacity: .5;
} */
</style>