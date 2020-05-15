<template>
  <div class="Operation_report">
      <el-dialog id="printBox" class="unit-report" :visible.sync="show" width="30%">
        <div class="dialog_content">
            <div class="title">柳州城市消防物联网运营数据报告</div>
            <div class="total_tip">
                <p>短信督促：<span>2000</span>次  电话督促：<span>2000</span>次</p>
                <el-button type="success">导出</el-button>
            </div>
            <el-table
            :data="tableData"
            stripe
            border
            header-row-class-name="header-row"
            style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
            </el-table>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
            show:false,
            tableData: [
                {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }
            ]
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