<template>
  <el-dialog id="printBox" class="unit-report" :visible.sync="show" width="30%">
    <div id="diaBody">
        <div class="top display">
            <div class="top_left display">
                <span>防火单位：</span>
                <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
                ></el-autocomplete>
                <div>
                    <el-link @click="halfyear" type="primary">半年对比</el-link>
                    <el-link @click="oneyear" type="primary">一年对比</el-link>
                </div>
            </div>
            <el-button type="success">打印</el-button>
        </div>
        <div class="printBox_content">
            <p class="title">柳州丽笙酒店消防物联网运营数据对比分析</p>
            <el-collapse>
                <el-collapse-item>
                    <template slot="title">
                        火警联网未核
                    </template>
                    <div id="echarts"></div>
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
      state:'',


    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {

  },
  methods: {
      opendialog(){
        this.show = true;
        setTimeout(()=>{
             this.initEcharts();
        })
       
      },
      querySearchAsync(queryString, cb){
          console.log(queryString, cb)
      },
      handleSelect(){

      },
      //半年对比
      halfyear(){

      },
      //一年对比
      oneyear(){

      },
      initEcharts(){
            let echarts  = this.$echarts.init(document.getElementById('echarts'));
            echarts.setOption({
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    symbolSize:8,   //拐点圆的大小
                    itemStyle:{
                        normal:{
                            color:'orange',
                            borderColor:'orange',
                        }
                    },
                }]
            });

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
                #echarts{
                    width: 860px;
                    height: 400px;
                } 
                
            }
        }
    }
   
    
  }
   
        
}
</style>
