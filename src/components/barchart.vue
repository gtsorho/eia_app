<template>
    <Bar
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
    />
</template>

<script>
    import { Bar } from "vue-chartjs";
    import {Chart as ChartJS, Title,Tooltip,Legend, BarElement, CategoryScale, LinearScale, } from "chart.js";

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale );

    export default {
        name: "BarChart",
        components: { Bar },
        props: {
            graphValues: Array,
            chartId: {
                type: String,
                default: "bar-chart",
            },
            datasetIdKey: {
                type: String,
                default: "label",
            },
            width: {
                type: Number,
                default: 500,
            },
            height: {
                type: Number,
                default: 350,
            },
            cssClasses: {
                default: "",
                type: String,
            },
            plugins: {
                type: Object,
                default: () => {},
            },
        },
        data() {
            return {
                colors:['#c2213d', '#0b0e6d' ,'#105d15','#806c11'],
                styles:{
                    height: '100%'
                },
                chartData :{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: []
                },
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false
                },
            };
        },
        mounted(){
            console.log(this.graphValues)
             this.chartData.labels = this.graphValues[0].lables
             var LegendArray = this.graphValues[1] 

             this.graphValues.splice(0 , 2)
             
             this.graphValues.forEach((element , i) => {

                 this.chartData.datasets.push(
                     {
                        label: LegendArray[i],
                        backgroundColor: this.colors[i],
                        data: element
                    },
                 )
             });
        },
        watch:{
            async graphValues(newval){
                console.log(newval)
                this.chartData.labels = newval[0].lables
                var LegendArray = newval[1] 

                newval.splice(0 , 2)
                
                newval.forEach((element , i) => {
                    this.chartData.datasets = []
                    this.chartData.datasets.push(
                        {
                            label: LegendArray[i],
                            backgroundColor: this.colors[Math.floor(Math.random() * 5)],
                            data: element
                        },
                    )
                });
            }
        }
    };



</script>

