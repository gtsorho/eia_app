<template>
<Radar
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

import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Filler,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement,
  Plugin
} from 'chart.js'

ChartJS.register(
    Filler,
    Title,
    Tooltip,
    Legend,
    PointElement,
    RadialLinearScale,
    LineElement
)

export default {
    name: "RadarChart",
    components: { 
        Radar 
    },
    props: {
        chartId: {
            type: String,
            default: "Radar-chart",
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
                labels: [
                    'Eating',
                    'Drinking',
                    'Sleeping',
                    'Designing',
                    'Coding',
                    'Cycling',
                    'Running'
                ],
                    datasets: [
                        {
                            label: 'My First dataset',
                            backgroundColor: 'rgba(179,181,198,0.2)',
                            borderColor: 'rgba(179,181,198,1)',
                            pointBackgroundColor: 'rgba(179,181,198,1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(179,181,198,1)',
                            data: [65, 59, 90, 81, 56, 55, 40]
                            },
                            {
                            label: 'My Second dataset',
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            pointBackgroundColor: 'rgba(255,99,132,1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(255,99,132,1)',
                            data: [28, 48, 40, 19, 96, 27, 100]
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