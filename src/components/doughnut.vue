<template>
<Doughnut
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

import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)


export default {
    name: "DoughnutChart",
    components: { 
        Doughnut 
    },
    props: {
        graphValues: Array,
        chartId: {
            type: String,
            default: "Doughnut-chart",
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
            colors:['#c2213d', '#0b0e6d' ,'#105d15','#806c11', '#78470b','#0b7678'],
            styles:{
                    height: '100%'
                },
            chartData :{
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
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
        this.graphValues.splice(0 , 2)
        
        this.graphValues.forEach((element , i) => {
            var elementColor = this.colors.slice(0, element.length)
            this.chartData.datasets.push(
                {
                    backgroundColor: elementColor,
                    data: element
                },
            )
        });
        console.log(this.graphValues);
    }
};
</script>    
<style scoped>

</style>