<template>
    <!-- offcanvas -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <!-- offcanvas header -->
        <div class="offcanvas-header">
                <h6 class="offcanvas-title fw-bolder text-capitalize" id="offcanvasExampleLabel">Dashboard</h6>
            
            <button class="btn btn-warning px-3 btn-sm rounded-pill" style="font-size:12px" @click="addPanel()">Add Panel</button>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <!-- offcanvas header end | offcanvas body start -->
        <div class="offcanvas-body">
            <!-- accordion -->
            <div class="accordion" id="accordionPanelsStayOpenExample">
                <!-- accordion item  -->
                <div class="accordion-item mb-3" v-for="(data, index) in datasets" :key="index" v-show=" index < 4">
                    <!-- accordion header -->
                    <div class="accordion-header " :id="`panelsStayOpen-heading${index}`">
                        <button class="btn  float-end text-danger trashbtn"  @click="datasets.splice(index, 1)"><i class="bi bi-trash3-fill"></i></button>
                        <button class="accordion-button text-light fw-normal" style="width:90% !important; background-color:#e76e83" type="button" data-bs-toggle="collapse"
                            :data-bs-target="`#panelsStayOpen-collapse${index}`" aria-expanded="true"
                            :aria-controls="`panelsStayOpen-collapse${index}`">
                            P {{index + 1}}
                            <select class="form-select form-select-sm w-50 mx-4" v-model="data.datasetVal" aria-label=".form-select-sm example">
                                <option value="default">Select Dataset</option>
                                <option value="1">IITA Dataset</option>
                                <!-- <option value="2">Two</option>
                                <option value="3">Three</option> -->
                            </select>
                        </button>
                    </div>
                    <!-- accordion header end -->
                    <div :id="`panelsStayOpen-collapse${index}`" class="accordion-collapse collapse show"
                        :aria-labelledby="`panelsStayOpen-heading${index}`">
                        <div class="accordion-body">
                            <!-- form item -->
                            <form class="border p-3 rounded-3 ">
                                <div class="text-start mb-1">
                                    <label for="exampleFormControlInput1" class="form-label mb-0"
                                        style="font-size:10px">Y-data</label>
                                    <select class="form-select form-select-sm"  v-model="datasets[index].y_data" aria-label=".form-select-sm example">
                                        <option value="choose data" disabled >Y-Data</option>
                                        <option :value="option" v-for="(option, i) in y_data" :key="i">{{option}}</option>
                                        {{datasets[index].xyKeys[1] = this.getKeyByValue(y_data, datasets[index].y_data) }}
                                    </select>
                                </div>
                                <div class="text-start mb-1">
                                    <label for="exampleFormControlInput1" class="form-label mb-0"
                                        style="font-size:10px">X-Data</label>
                                    <select class="form-select form-select-sm" @change="getFormValue(index)" v-model="datasets[index].x_data" aria-label=".form-select-sm example">
                                        <option value="choose data" disabled >X-Data</option>
                                        <option :value="option" v-for="(option, i) in x_data" :key="i">{{option}}</option>
                                        {{datasets[index].xyKeys[0] = this.getKeyByValue(x_data, datasets[index].x_data) }}
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
            <a class="text-warning float-end text-decoration-none fw-bolder "  href="#" @click="$emit('powerClick')">Go to PowerBi</a>
            <!-- accordion end -->
        </div>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: "dashboardform",
        emits:[
            "panelValues",
            'powerClick'
            ],
        data() {
            return {
                datasets: [
                    {
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
                        show:true
                    },
                ],

                // form data to send************************
                y_data: 
                    [
                        'Population',
                        
                    ]
                ,  

                x_data:
                    [

                    ],

                // datagroup:{
                //     'sex':['male', 'female'],
                //     'croptype':['maize', 'cowpea', 'groundnut']
                // },
            }
        },
        mounted(){
            axios.get('https://aghub.miphost.com/api/datalake/columns')
            .then(response =>  {
                response.data.forEach(table => {
                    this.y_data.push(table)
                    this.x_data.push(table)
                });
            }).catch(error => {
                console.log(error)
            })
        },
        methods: {
            getKeyByValue(object, value){
                return Object.keys(object).find(key => object[key] === value);
            },
            addPanel() {
                this.datasets.push(
                    {
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
                        show:false

                    }
                )
                console.log(this.datasets)
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
            // submit () {
            //     const data = {
            //         workExperiences: this.workExperiences
            //     }
            //     alert(JSON.stringify(data, null, 2))
            // }
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
    height: 40px;
}
.trashbtn{
    width: 10% !important;
    padding: 0rem 0.25rem;
    border-end-start-radius: 0px;
    border-end-end-radius: 0px;
    border-start-start-radius: 0px;
    border: 0px !important;
    height: 40px;
    background-color: #4fab43;
}
.form-select{
    background-color: #b3fca970;
}
.trashbtn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0%);
}
.bi-trash3-fill:hover{
    opacity: .5;
}
</style>