<template>
<Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :css-classes="cssClasses"
    :width="width"
    :height="height"
    :styles="styles"

/>
</template>

<script>
import { defineComponent, h, PropType } from 'vue'

    import { Line } from 'vue-chartjs'
    import {
    Chart as ChartJS,
    Title,
    Filler,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    Plugin
    } from 'chart.js'

    ChartJS.register(
    Title,
    Filler,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
    )

export default {
    name: "LineChart",
    components: { 
        Line 
    },
    props: {
        graphValues: Array,
        chartId: {
            type: String,
            default: "Line-chart",
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
    },
    data() {
        return {
            colors:['#c2213d', '#0b0e6d' ,'#105d15','#806c11'],
            styles:{
                    height: '100%'
                },
            chartData :{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                   
                ]
            },
            chartOptions : {
                responsive: true,
                maintainAspectRatio: false
            }
        };
    },
    mounted(){
        this.chartData.labels = this.graphValues[0].lables
        var LegendArray = this.graphValues[1] 

        this.graphValues.splice(0 , 2)
        
        this.graphValues.forEach((element , i) => {

            this.chartData.datasets.push(
                {
                    label: LegendArray[i],
                    backgroundColor: this.colors[i] + '19',
                    borderColor: this.colors[i],
                    data: element,
                    fill:true
                }
            )
        });

        console.log(this.graphValues);
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
                            backgroundColor: this.colors[Math.floor(Math.random() * 3)] + '19',
                            borderColor: this.colors[Math.floor(Math.random() * 3)],
                            data: element
                        },
                    )
                });
            }
        }
};
</script>    

<style scoped>

</style>