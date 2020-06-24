<template>
  <el-dialog id="printBox" class="unit-report" :visible.sync="show" width="30%">
    <div id="diaBody">
        <div class="top display">
            <div class="top_left display">
                <span>防火单位：</span>
                <el-autocomplete
                  v-model="fireUnitName"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  @select="handleSelect"
                ></el-autocomplete>
                <div>
                    <el-link @click="halfyear" type="primary">半年对比</el-link>
                    <el-link @click="oneyear" type="primary">一年对比</el-link>
                </div>
            </div>
            <el-button @click="print" type="success">打印</el-button>
        </div>
        <div v-if="OperateReport" class="printBox_content">
            <p class="title">{{OperateReport.fireUnitName}}消防物联网运营数据对比分析</p>
            <el-collapse v-model="activeNames">
                <el-collapse-item  
                v-for="(arr,index) in OperateReport.lstUrgeSnapshot " 
                :key="index"
                :name="index"
                >
                    <template slot="title">
                      <p v-if="arr.operateUrgeType == 1">火警联网未核</p>
                      <p v-if="arr.operateUrgeType == 2">消防设施故障</p>
                      <p v-if="arr.operateUrgeType == 3">电气火灾隐患</p>
                      <p v-if="arr.operateUrgeType == 4">消防通道堵塞</p>
                      <p v-if="arr.operateUrgeType == 5"> 消防管网液位及水压</p>
                      <p v-if="arr.operateUrgeType == 6">物联终端离线</p>
                    </template>
                    <div class="echarts" :id="index"></div>
                </el-collapse-item>
                 
            </el-collapse>
        </div>
         
        
    </div>
  </el-dialog>
</template>

<script>
/**
 *  作者：0          时间：2019/7/10 11:51
 *  1,常量从js文件引入，不要定义魔术变量
 */
let moment = require("moment");
export default {
  name: "UnitReport",
  components: {},
  props: {},
  data() {
    return {
      show: false,
      fireUnitName:'',
      activeNames:[],
      selectList:[],
      timeout:'',
      selectId:'',
      OperateReport:'',
      // groupListFireUnits:[]
      allfireUnitNamesArr:[],
      allfireUnitNames:[]

    };
  },
  computed: {},
  watch: {

    fireUnitName:{
      deep:true,
      handler:function(newval,oldval){
          this.allfireUnitNamesArr =[]//用于存放下拉提醒框中数据的数组
          var len = this.allfireUnitNames.length
          var arr =[]
          for(let x=0;x<len;x++){
            if(this.allfireUnitNames[x].fireUnitName.indexOf(this.fireUnitName) >=0){
              arr.push({
                value:this.allfireUnitNames[x].fireUnitName,
                id:this.allfireUnitNames[x].fireUnitId
              })
            }
          }
          this.allfireUnitNamesArr = arr
      }
    }
  },
  created() {},
  mounted() {
  },
  methods: {
      opendialog(){
        this.show = true;
       
      },
      //查询
      groupListFireUnits(val,fun){
          this.allfireUnitNamesArr =[]
          this.$axios.get(this.$api.GetFireUnitByName,
            {params:{OperateCenterId:this.$store.state.userInfo.operateCenterId,FireUnitName:val}}
          ).then(res=>{
            console.log("打印模糊查询的结果",res)
            if(res.success){
              this.allfireUnitNames =[]
              this.allfireUnitNames = res.result
              if(this.allfireUnitNames.length>0){
                for(let item of this.allfireUnitNames){
                  this.allfireUnitNamesArr.push({
                    value:item.fireUnitName,
                    id:item.fireUnitId
                  })
                }
              }else{
                this.allfireUnitNamesArr.push({
                  value:'无搜索结果',
                  id:'无搜索结果'
                })

              }
            fun(this.allfireUnitNamesArr)
         
            }
          }).catch(err=>{
            console.log("打印模糊查询的结果失败",err)
          })
      },
      //
      querySearchAsync(queryString,cb){
        if(queryString !=" "){
          this.groupListFireUnits(queryString,(data)=>{
            var allfireUnitNamesArr = ''
            if(queryString && data[0].id){
              allfireUnitNamesArr = this.allfireUnitNamesArr
            }else{
              allfireUnitNamesArr = data
            }
            cb(allfireUnitNamesArr)
          });
        }
      },
      //选择
      handleSelect(item){
        this.fireUnitName = item.value
        this.selectId = item.id;
      },
      //获取报告
      GetFireUnitOperateReport(ReportDuration){
        this.activeNames =[];
        this.$axios.get(this.$api.GetFireUnitOperateReport,
          {params:{FireUnitId:this.selectId,ReportDuration}}
        ).then(res=>{
          // console.log(res)
          this.OperateReport = res.result
          for(let i in res.result.lstUrgeSnapshot){
            this.activeNames.push(+i);
            this.$nextTick(()=>{
              this.initEcharts(+i,res.result.lstUrgeSnapshot[i].months,res.result.lstUrgeSnapshot[i].overDueNums)
            })
            
          }
        })
      },
      //半年对比
      halfyear(){
        this.GetFireUnitOperateReport(1)
      },
      //一年对比
      oneyear(){
         this.GetFireUnitOperateReport(2)
      },
      initEcharts(i,months,overDueNums){
        
            let echarts  = this.$echarts.init(document.getElementById(i));
            // console.log('echarts',echarts)
            echarts.setOption({
                xAxis: {
                    type: 'category',
                    data: months
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: overDueNums,
                    type: 'line',
                    symbolSize:8,   //拐点圆的大小
                    itemStyle:{
                        normal:{
                            color:'#5899D5',
                            borderColor:'#5899D5',
                        }
                    },
                }]
            });

      },
      print(){
          let diaBody =  document.getElementById('diaBody');
          let top = document.getElementsByClassName('top')[0];
            
          diaBody.removeChild(top);

         
          let nodeArr = [];//存放节点

          $('.echarts').each(function (letter, rows) { //将canvas节点转换为image对象
            let  image = new Image();
            let canvasnode  = rows.children[0].children[0]
            image.width = 800;
            image.src = canvasnode.toDataURL("image/png");
            nodeArr.push(image)
          })
         
          $('.echarts').each(function (letter, rows) { //删除之前的canvas节点
            let children = rows.children[0];
            rows.removeChild(children);//移除canvas节点
          })
          $('.echarts').each(function (letter, rows) { //将canvas节点转换为image对象拼接在节点里
              rows.appendChild(nodeArr[letter])
          })
          let printHtml = document.getElementById('diaBody').innerHTML
          window.document.body.innerHTML = printHtml;
          setTimeout(()=>{
            window.print();
            window.location.reload();
          })
          
      }
  }
}
</script>

<style lang="less">
.unit-report {
  .el-dialog {
    margin: 0 auto !important;
    min-height: 100vh;
    width: 915px !important;
    .el-dialog__body {
      flex: 2 0 auto;
      padding: 0 !important;
    }
    .el-dialog__header {
      display: none;
    }
    .el-form-item__label {
      color: #606266 !important;
    }
  }
  #diaBody{
    color: #232323;
    padding: 20px;
    .display{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .top{
            color: 232323;
            margin-bottom: 20px;
            .top_left{
                font-size: 18px;
            }
            a{
                // color: rgb(78, 189, 115);
                color:  #167fc1;
            }
            a:nth-of-type(1){
                margin: 0px 20px;
            }
            .el-date-editor{
              width: 250px;
              border: rgb(201, 197, 197) 1px solid !important;

              margin-right: 10px;
            }
            .el-input__inner {
                  background-color: #ffffff !important;
                  // border: 1px solid #ffffff !important;
            }
    }
    .printBox_content{
        .title{
            text-align: center;
            font-size: 20px;
            font-family:'Times New Roman', Times, serif;
            margin-bottom: 10px;
        }
        .el-collapse{
            .el-collapse-item__header{
                background: rgb(111, 187, 125);
                color: rgb(255, 255, 255);
                padding: 0 20px;
                font-size: 18px;
            }
            .el-collapse-item__content{
                padding-bottom: 0px;
                width: 100%;
                .echarts{
                    width: 860px;
                    height: 400px;
                } 
                
            }
        }
    }
   
    
  }
   
        
}
</style>
