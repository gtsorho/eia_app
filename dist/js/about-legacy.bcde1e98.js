"use strict";(self["webpackChunkEiA_Hub"]=self["webpackChunkEiA_Hub"]||[]).push([[443],{8878:function(a,t,e){e.r(t),e.d(t,{default:function(){return Z}});e(2222);var n=e(6252),r=e(9963),o=e(3577),l=function(a){return(0,n.dD)("data-v-77964f5a"),a=a(),(0,n.Cn)(),a},s={class:"container-fluid p-4"},i={key:0},c={class:"container fw-bolder text-dark",style:{"margin-top":"23rem"}},u=l((function(){return(0,n._)("p",{class:"d-inline me-2"}," No charts available Please select",-1)})),d=l((function(){return(0,n._)("a",{disabled:"",class:"float2 align-middle","data-bs-toggle":"offcanvas",href:"#offcanvasExample",role:"button","aria-controls":"offcanvasExample"},[(0,n._)("i",{class:"bi bi-menu-button-wide fs-6 my-float2"})],-1)})),f={class:"d-inline ms-2"},h=(0,n.Uk)(" to add a chart, go to "),w={key:1},m={key:0,title:"IITA",style:{width:"100%",height:"6.2in"},src:"https://app.powerbi.com/view?r=eyJrIjoiYzM2MmIyNGItYTYwYy00MzEwLTliYjktMDljYjNhYTNlMjdiIiwidCI6IjA1Y2UxNTMyLWZjY2ItNDc2Mi04YjRkLTkxOWIxNzRmZDkxMSIsImMiOjh9&pageName=ReportSection039b7f79d60b91083bf9",frameborder:"0",allowfullscreen:"true"},p={class:"row row-cols-sm-1 justify-content-center row-cols-md-2 mb-4"},b={class:"card"},y={class:"card-header text-start text-capitalize"},g={key:0,class:"fw-bold"},_={key:1,class:"fw-bold",style:{"font-size":"12px"}},v=["onUpdate:modelValue"],k=l((function(){return(0,n._)("option",{value:"type"},"Type",-1)})),x=l((function(){return(0,n._)("option",{value:"Chart"},"Bar Chart",-1)})),D=l((function(){return(0,n._)("option",{value:"Doughnut"},"Doughnut",-1)})),C=l((function(){return(0,n._)("option",{value:"Line"},"Line Chart",-1)})),I=[k,x,D,C],Y={class:"card-body"},j=l((function(){return(0,n._)("a",{class:"float align-middle","data-bs-toggle":"offcanvas",href:"#offcanvasExample",role:"button","aria-controls":"offcanvasExample"},[(0,n._)("i",{class:"bi bi-menu-button-wide fs-4 my-float"})],-1)}));function V(a,t,e,l,k,x){var D=(0,n.up)("Dashboardform");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(D,{onPanelValues:x.formValues,onPowerClick:t[0]||(t[0]=function(a){k.powerBi=!0,k.chartdata=[]})},null,8,["onPanelValues"]),(0,n._)("div",s,[k.powerBi?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("span",i,[(0,n.wy)((0,n._)("div",c,[u,d,(0,n._)("p",f,[h,(0,n._)("a",{href:"#",class:"text-decoration-none text-warning",onClick:t[1]||(t[1]=function(a){return k.powerBi=!0})},"PowerBi")])],512),[[r.F8,null==k.chartdata||k.chartdata.length<1]])])),null==k.chartdata||k.chartdata.length<1?((0,n.wg)(),(0,n.iD)("span",w,[k.powerBi?((0,n.wg)(),(0,n.iD)("iframe",m)):(0,n.kq)("",!0)])):(0,n.kq)("",!0),(0,n._)("div",p,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(k.chartdata,(function(a,t){return(0,n.wy)(((0,n.wg)(),(0,n.iD)("div",{class:"col mb-4",key:t},[(0,n._)("div",b,[(0,n._)("div",y,[a.xyKeys[0]&&a.xyKeys[1]?((0,n.wg)(),(0,n.iD)("small",_,(0,o.zw)("plot of ".concat(a.y_data," against ").concat(a.x_data)),1)):((0,n.wg)(),(0,n.iD)("small",g,(0,o.zw)("plot of x data by y data"))),(0,n.wy)((0,n._)("select",{class:"form-select form-select-sm w-25 float-end","onUpdate:modelValue":function(a){return k.currentChart[t]=a},"aria-label":".form-select-sm example"},I,8,v),[[r.bM,k.currentChart[t]]])]),(0,n._)("div",Y,[a.show?((0,n.wg)(),(0,n.j4)((0,n.LL)(k.currentChart[t]),{key:0,graphValues:[{lables:a.chartVals[1]},a.chartVals[0].x_data].concat(a.chartVals[0].y_data)},null,8,["graphValues"])):(0,n.kq)("",!0)])])])),[[r.F8,t<4]])})),128))])]),j],64)}var M=e(3421),L=e(4436),N=e(1153),z=e(6059),B={name:"dashboard",components:{Chart:M.Z,Line:L.Z,Doughnut:N.Z,Dashboardform:z.Z},data:function(){return{powerBi:!1,chartdata:[],newChartData:[],currentChart:{0:"Line",1:"Chart",2:"Doughnut",3:"Chart"}}},methods:{formValues:function(a){this.chartdata=a,console.log(this.chartdata)}},watch:{chartdata:function(a,t){this.newChartData=a}}},E=e(3744);const T=(0,E.Z)(B,[["render",V],["__scopeId","data-v-77964f5a"]]);var Z=T}}]);
//# sourceMappingURL=about-legacy.bcde1e98.js.map