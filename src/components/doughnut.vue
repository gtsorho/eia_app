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
            default: 400,
        },
        height: {
            type: Number,
            default: 250,
        },
        cssClasses: {
            default: "",
            type: String,
        },
    },
    data() {
        return {
            styles:{
                    height: '100%'
                },
            chartData :{
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                    datasets: [
                        {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [40, 20, 80, 10]
                        },
                        {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [10, 30, 70, 15]
                        }
                    ]
            },
            chartOptions : {
                responsive: true,
                maintainAspectRatio: false
            }
        };
    },
};
</script>    