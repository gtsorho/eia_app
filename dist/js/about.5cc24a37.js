"use strict";(self["webpackChunkEiA_Hub"]=self["webpackChunkEiA_Hub"]||[]).push([[443],{8878:function(a,t,e){e.r(t),e.d(t,{default:function(){return Z}});var l=e(6252),o=e(9963),r=e(3577);const s=a=>((0,l.dD)("data-v-77964f5a"),a=a(),(0,l.Cn)(),a),n={class:"container-fluid p-4"},i={key:0},c={class:"container fw-bolder text-dark",style:{"margin-top":"23rem"}},d=s((()=>(0,l._)("p",{class:"d-inline me-2"}," No charts available Please select",-1))),h=s((()=>(0,l._)("a",{disabled:"",class:"float2 align-middle","data-bs-toggle":"offcanvas",href:"#offcanvasExample",role:"button","aria-controls":"offcanvasExample"},[(0,l._)("i",{class:"bi bi-menu-button-wide fs-6 my-float2"})],-1))),u={class:"d-inline ms-2"},f=(0,l.Uk)(" to add a chart, go to "),w={key:1},m={key:0,title:"IITA",style:{width:"100%",height:"6.2in"},src:"https://app.powerbi.com/view?r=eyJrIjoiYzM2MmIyNGItYTYwYy00MzEwLTliYjktMDljYjNhYTNlMjdiIiwidCI6IjA1Y2UxNTMyLWZjY2ItNDc2Mi04YjRkLTkxOWIxNzRmZDkxMSIsImMiOjh9&pageName=ReportSection039b7f79d60b91083bf9",frameborder:"0",allowfullscreen:"true"},p={class:"row row-cols-sm-1 justify-content-center row-cols-md-2 mb-4"},b={class:"card"},y={class:"card-header text-start text-capitalize"},g={key:0,class:"fw-bold"},_={key:1,class:"fw-bold",style:{"font-size":"12px"}},v=["onUpdate:modelValue"],k=s((()=>(0,l._)("option",{value:"type"},"Type",-1))),x=s((()=>(0,l._)("option",{value:"Chart"},"Bar Chart",-1))),D=s((()=>(0,l._)("option",{value:"Doughnut"},"Doughnut",-1))),C=s((()=>(0,l._)("option",{value:"Line"},"Line Chart",-1))),I=[k,x,D,C],Y={class:"card-body"},j=s((()=>(0,l._)("a",{class:"float align-middle","data-bs-toggle":"offcanvas",href:"#offcanvasExample",role:"button","aria-controls":"offcanvasExample"},[(0,l._)("i",{class:"bi bi-menu-button-wide fs-4 my-float"})],-1)));function V(a,t,e,s,k,x){const D=(0,l.up)("Dashboardform");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(D,{onPanelValues:x.formValues,onPowerClick:t[0]||(t[0]=a=>{k.powerBi=!0,k.chartdata=[]})},null,8,["onPanelValues"]),(0,l._)("div",n,[k.powerBi?(0,l.kq)("",!0):((0,l.wg)(),(0,l.iD)("span",i,[(0,l.wy)((0,l._)("div",c,[d,h,(0,l._)("p",u,[f,(0,l._)("a",{href:"#",class:"text-decoration-none text-warning",onClick:t[1]||(t[1]=a=>k.powerBi=!0)},"PowerBi")])],512),[[o.F8,null==k.chartdata||k.chartdata.length<1]])])),null==k.chartdata||k.chartdata.length<1?((0,l.wg)(),(0,l.iD)("span",w,[k.powerBi?((0,l.wg)(),(0,l.iD)("iframe",m)):(0,l.kq)("",!0)])):(0,l.kq)("",!0),(0,l._)("div",p,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(k.chartdata,((a,t)=>(0,l.wy)(((0,l.wg)(),(0,l.iD)("div",{class:"col mb-4",key:t},[(0,l._)("div",b,[(0,l._)("div",y,[a.xyKeys[0]&&a.xyKeys[1]?((0,l.wg)(),(0,l.iD)("small",_,(0,r.zw)(`plot of ${a.y_data} against ${a.x_data}`),1)):((0,l.wg)(),(0,l.iD)("small",g,(0,r.zw)("plot of x data by y data"))),(0,l.wy)((0,l._)("select",{class:"form-select form-select-sm w-25 float-end","onUpdate:modelValue":a=>k.currentChart[t]=a,"aria-label":".form-select-sm example"},I,8,v),[[o.bM,k.currentChart[t]]])]),(0,l._)("div",Y,[a.show?((0,l.wg)(),(0,l.j4)((0,l.LL)(k.currentChart[t]),{key:0,graphValues:[{lables:a.chartVals[1]},a.chartVals[0].x_data].concat(a.chartVals[0].y_data)},null,8,["graphValues"])):(0,l.kq)("",!0)])])])),[[o.F8,t<4]]))),128))])]),j],64)}var M=e(3421),L=e(4436),N=e(1153),z=e(6059),B={name:"dashboard",components:{Chart:M.Z,Line:L.Z,Doughnut:N.Z,Dashboardform:z.Z},data(){return{powerBi:!1,chartdata:[],newChartData:[],currentChart:{0:"Line",1:"Chart",2:"Doughnut",3:"Chart"}}},methods:{formValues(a){this.chartdata=a,console.log(this.chartdata)}},watch:{chartdata(a,t){this.newChartData=a}}},E=e(3744);const T=(0,E.Z)(B,[["render",V],["__scopeId","data-v-77964f5a"]]);var Z=T}}]);
//# sourceMappingURL=about.5cc24a37.js.map