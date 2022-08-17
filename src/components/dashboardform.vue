<template>
    <!-- offcanvas -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <!-- offcanvas header -->
        <div class="offcanvas-header">
            <u>
                <h6 class="offcanvas-title fw-bolder text-uppercase" id="offcanvasExampleLabel">Dashboard</h6>
            </u>
            
            <button class="btn btn-warning px-5 btn-sm" @click="addPanel()">Add Panel</button>
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
                            <select class="form-select form-select-sm w-50 mx-4" @change="getFormValue()" v-model="data.datasetVal" aria-label=".form-select-sm example">
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
                                    <select class="form-select form-select-sm" @change="getFormValue()" v-model="datasets[index].y_data" aria-label=".form-select-sm example">
                                        <option value="choose data" >Y-Data</option>
                                        <option :value="option" v-for="(option, i) in y_data" :key="i">{{i}}</option>
                                        {{datasets[index].xyKeys[1] = this.getKeyByValue(y_data, datasets[index].y_data) }}
                                    
                                        <!-- <option value="2">Two</option>
                                        <option value="3">Three</option> -->
                                    </select>
                                </div>
                                <div class="text-start mb-1">
                                    <label for="exampleFormControlInput1" class="form-label mb-0"
                                        style="font-size:10px">X-Data</label>
                                    <select class="form-select form-select-sm" @change="getFormValue()" v-model="datasets[index].x_data" aria-label=".form-select-sm example">
                                        <option :value="option" v-for="(option, i) in x_data" :key="i">{{i}}</option>
                                        <option value="choose data" >X-Data</option>
                                        {{datasets[index].xyKeys[0] = this.getKeyByValue(x_data, datasets[index].x_data) }}
                                        <!-- <option value="2">Two</option>
                                        <option value="3">Three</option> -->
                                    </select>
                                </div>
                                <!-- <div class="row">
                                    <div class="col text-start">
                                        <label for="exampleFormControlInput1" class="form-label mb-0"
                                            style="font-size:10px">Category</label>
                                        <select class="form-select form-select-sm" @change="getFormValue()" v-model="data.data3" aria-label=".form-select-sm example">
                                            <option >X-Data</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div class="col text-start">
                                        <label for="exampleFormControlInput1" class="form-label mb-0"
                                            style="font-size:10px">Properties</label>
                                        <select class="form-select form-select-sm" @change="getFormValue()" v-model="data.data4" aria-label=".form-select-sm example">
                                            <option >X-Data</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div> -->
                            </form>
                            <!-- form item end-->
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
                        xyKeys:['x data', ' y data']
                    },
                ],

                // form data to send************************
                y_data: {
                    'population': [6,46,68,155,391],
                    'farmer population':[6,36,68,74, 82],
                    'insurance perventables':[11, 8, 2, 21],
                    'stress affected Farmers':[6,46,27,101,71]
                },  

                x_data:{
                    'farm size': ['1-4', '5-10', '11-15', '16 up'],
                    'age group': ['18-22', '23-27', '28-32', '33-37', '38-up'],
                    
                    'sex':['male', 'female'],
                    'croptype':['maize', 'cowpea', 'groundnut']
                },

                datagroup:{
                    'sex':['male', 'female'],
                    'croptype':['maize', 'cowpea', 'groundnut']
                },
            }
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
                        xyKeys:['x data', ' y data']

                    }
                )
            },
            getFormValue(){
                this.$emit("panelValues", this.datasets)
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
    background-color: #e76e83;
}
.form-select{
    background-color: #fedbdb70;
}
.trashbtn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0%);
}
.bi-trash3-fill:hover{
    opacity: .5;
}
</style>