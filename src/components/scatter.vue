<template>
  <Scatter
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

import { Scatter } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Plugin
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)


export default {
    name: "ScatterChart",
    components: { 
        Scatter 
    },
    props: {
        chartId: {
            type: String,
            default: "scatter-chart",
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
            chartData : {
              datasets: [
                {
                  label: 'Scatter Dataset 1',
                  fill: false,
                  borderColor: '#f87979',
                  backgroundColor: '#f87979',
                  data: [
                    {
                      x: -2,
                      y: 4
                    },
                    {
                      x: -1,
                      y: 1
                    },
                    {
                      x: 0,
                      y: 0
                    },
                    {
                      x: 1,
                      y: 1
                    },
                    {
                      x: 2,
                      y: 4
                    }
                  ]
                },
                {
                  label: 'Scatter Dataset 2',
                  fill: false,
                  borderColor: '#7acbf9',
                  backgroundColor: '#7acbf9',
                  data: [
                    {
                      x: -2,
                      y: -4
                    },
                    {
                      x: -1,
                      y: -1
                    },
                    {
                      x: 0,
                      y: 1
                    },
                    {
                      x: 1,
                      y: -1
                    },
                    {
                      x: 2,
                      y: -4
                    }
                  ]
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