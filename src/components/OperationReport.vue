<template>
  <div class="Operation_report">
      <el-dialog id="printBox" class="unit-report" :visible.sync="show" width="30%">
        <div class="dialog_content">
            <div class="title">柳州城市消防物联网运营数据报告</div>
            <div class="total_tip">
                <p>短信督促：<span>{{messageTotalNum}}</span>次  电话督促：<span>{{phonecallTotalNum}}</span>次</p>
                <el-button @click="exportData" type="success">导出</el-button>
            </div>
            <el-table
            :data="tableData"
            stripe
            border
            header-row-class-name="header-row"
            style="width: 100%">
                <el-table-column
                prop="fireUnitName"
                label="防火单位"
                width="180">
                </el-table-column>
                <el-table-column
                prop="msgCount"
                label="短信次数"
                width="180">
                </el-table-column>
                <el-table-column
                prop="phoneCount"
                label="电话次数"
                width="180">
                </el-table-column>
                <el-table-column
                prop="lastUrge"
                label="上次督促">
                </el-table-column>
            </el-table>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { export2Excel } from '../common/js/utils'
export default {
    data(){
        return{
            show:false,
            messageTotalNum:'',
            phonecallTotalNum:'',
            columns:[
                {
                    title:'防火单位',
                    key:'fireUnitName'
                },
                {
                    title:'短信次数',
                    key:'msgCount'
                },
                {
                    title:'电话次数',
                    key:'phoneCount'
                },
                {
                    title:'上次督促',
                    key:'lastUrge'
                },
            ],
            tableData: []
        }
    },
    created(){
        this.GetUrgeChannelNum();
    },
    methods:{
        GetOperateReport(){
            this.show = true;
            this.$axios.get(this.$api.GetOperateReport,
            {params:{OperateCenterId:this.$store.state.userInfo.operateCenterId}}
            ).then(res=>{
            console.log("结果",res)
            this.tableData = res.result
            })
        },
        GetUrgeChannelNum(){
            this.$axios.get(this.$api.GetUrgeChannelNum,
                {params:{operateCenterId:this.$store.state.userInfo.operateCenterId}}
            ).then(res=>{
               
                this.messageTotalNum = res.result[0].totalNum
             
                this.phonecallTotalNum = res.result[1].totalNum
            })
        },
        exportData(){
            export2Excel(this.columns,this.tableData)
        }
    }
   
}
</script>

<style lang="less">
    .Operation_report{
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
        .dialog_content{
            padding: 20px;
            .title{
                text-align: center;
                font-size: 20px;
            }
            .total_tip{
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 16px;
                margin: 20px 0;
                span{
                    font-weight: bold;
                    margin: 0 6px;
                }
            }
            .el-table{
                .header-row{
                    th{
                       background: rgb(226, 225, 222);
                       color: #000;
                    }
                }
            }
           
        }
    }
</style>