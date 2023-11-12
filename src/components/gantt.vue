<template>
<div >
  <g-gantt-chart :chart-start="startDateGantt" @mousedown-bar="onMousedownBar($event.bar, $event.e, $event.datetime)"  :chart-end="EndDateGantt"  precision="month" grid width="100%" bar-start="beginDate" bar-end="endDate" date-format="DD.MM.YYYY HH:mm" color-scheme="vue" font="Courier" push-on-overlap>
    <g-gantt-row v-for="(row, index) in cropData" :key="index" :label="row.label" :bars="row.barsList" highlight-on-hover/>
  </g-gantt-chart>
</div>

</template>

<script>
export default {
  props:{
    cropData:Array
  },
  emits: ['activitySelected'],
  data() {
    return {
      rows:[]
    }
  },
  created(){
    console.log(this.cropData)
  },
  methods:{
    onMousedownBar(a, b ,c){
      this.$emit('activitySelected',a)
    },
    formatDate(originalDate) {
      const date = new Date(originalDate);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');

      // Format the date in the desired string format
      const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
      return formattedDate;
    },
  },
  computed:{
    startDateGantt(){
      return this.formatDate(new Date(this.cropData[0].barsList[0].activityStart).setDate(new Date(this.cropData[0].barsList[0].activityStart).getDate() - 7))
    },
    EndDateGantt(){
      let filteredActivity = this.cropData.filter(obj => obj.label === 'HV')

      let lastdate =  this.formatDate(new Date(filteredActivity[0].barsList[0].activityEnd).setDate(new Date(filteredActivity[0].barsList[0].activityEnd).getDate() + 7))
      return lastdate
    }
  }

};
</script>

<style>
.g-gantt-bar{
  top: 8px !important;
  height: 21px !important;
}
</style>
