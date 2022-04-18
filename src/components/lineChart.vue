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
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f879796e',
                        borderColor:'#f87979',
                        data: [40, 39, 10, 40, 39, 80, 40],
                        fill:true
                    },
                    {
                        label: 'Data two',
                        backgroundColor: '#0451a46e',
                        borderColor:'#0451a4',
                        data: [10, 34, 12, 50, 24, 18, 40],
                        fill:true
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

<style scoped>

</style>