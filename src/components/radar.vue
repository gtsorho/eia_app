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
        graphValues: Array,
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
                    backgroundColor: this.colors[i]  + '16',
                    borderColor: this.colors[i],
                    pointBackgroundColor: this.colors[i],
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: this.colors[i],
                    data: element
                }
            )
        });
    console.log(this.graphValues);
    }
};
</script>    