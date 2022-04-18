<template>
    <!-- offcanvas -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <!-- offcanvas header -->
        <div class="offcanvas-header">
            <u>
                <h4 class="offcanvas-title fw-bolder text-uppercase" id="offcanvasExampleLabel">Dashboard</h4>
            </u>
            
            <button class="btn btn-warning px-5" @click="addPanel()">Add Panel</button>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <!-- offcanvas header end | offcanvas body start -->
        <div class="offcanvas-body">
            <!-- accordion -->
            <div class="accordion" id="accordionPanelsStayOpenExample">
                <!-- accordion item  -->
                <div class="accordion-item mb-3" v-for="(data, index) in formdata" :key="index" v-show=" index < 4">
                    <!-- accordion header -->
                    <div class="accordion-header " :id="`panelsStayOpen-heading${index}`">
                        <button class="btn  float-end text-danger trashbtn" @click="formdata.splice(index, 1)"><i class="bi bi-trash3-fill"></i></button>
                        <button class="accordion-button text-light fw-normal" style="width:90% !important;" type="button" data-bs-toggle="collapse"
                        :style="{'backgroundColor': '#'+Math.floor(Math.random()*16777215).toString(16)}"
                            :data-bs-target="`#panelsStayOpen-collapse${index}`" aria-expanded="true"
                            :aria-controls="`panelsStayOpen-collapse${index}`">
                            Panel {{index + 1}}
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
                                    <select class="form-select form-select-sm" @change="formvalue()" v-model="data.data1" aria-label=".form-select-sm example">
                                        <option selected>Y-Data</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div class="text-start mb-1">
                                    <label for="exampleFormControlInput1" class="form-label mb-0"
                                        style="font-size:10px">X-Data</label>
                                    <select class="form-select form-select-sm" @change="formvalue()" v-model="data.data2" aria-label=".form-select-sm example">
                                        <option selected>X-Data</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div class="row">
                                    <div class="col text-start">
                                        <label for="exampleFormControlInput1" class="form-label mb-0"
                                            style="font-size:10px">Category</label>
                                        <select class="form-select form-select-sm" @change="formvalue()" v-model="data.data3" aria-label=".form-select-sm example">
                                            <option selected>X-Data</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div class="col text-start">
                                        <label for="exampleFormControlInput1" class="form-label mb-0"
                                            style="font-size:10px">Properties</label>
                                        <select class="form-select form-select-sm" @change="formvalue()" v-model="data.data4" aria-label=".form-select-sm example">
                                            <option selected>X-Data</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                            <!-- form item end-->
                        </div>
                    </div>
                </div>
                <!-- accordion item end -->
            </div>
            <!-- accordion end -->
        </div>
    </div>
</template>
<script>
    export default {
        name: "dashboardform",
        emits:[
            "panelValues"
            ],
        data() {
            return {
                formdata: [
                {
                    data1: "Foxconn",
                    data2: "Engineer",
                    data3: "Foxconn",
                    data4: "Engineer",
                },
                ]
            }
        },
        methods: {
            addPanel() {
                this.formdata.push({
                    data1: '',
                    data2: '',
                    data3: '',
                    data4: ''
                })
            },
            formvalue(){
                // console.log(this.formdata) 
                this.$emit("panelValues", this.formdata)
            },
            submit () {
            const data = {
                workExperiences: this.workExperiences
            }
            alert(JSON.stringify(data, null, 2))
            }
        },
        computed:{
            jsColor(){
                return ;
            }
        }  
    }
</script>
<style scoped>
.trashbtn{
    width: 10% !important;
    padding: 1rem 0.25rem;
    border-end-start-radius: 0px;
    border-end-end-radius: 0px;
    border-start-start-radius: 0px;
    border: 0px !important;
    background-color: #e7f1ff;
}
.trashbtn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0%);
}
.bi-trash3-fill:hover{
    opacity: .5;
}
</style>