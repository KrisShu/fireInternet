<template>
    <el-dialog
        title="工作设置"
        class="workset-dialog"
        center
        :fullscreen="false"
        :visible.sync="show"
        width="50%"
        @close="beforeClosed"
    >
        <div class="content">
            <el-scrollbar style="overflow: hidden;height:104%">
                <div class="content_item" v-for="(arr,index) in set_content" :key="index">
                    <p style="display:flex;align-items: center;"><img class="tip_icon" src="../assets/images/home/tip.png" alt="">{{arr.name}}</p>
                    <p class="padd-20">超期未处理时间：{{arr.overdueDuration}}小时</p>
                    <p class="padd-20">督促处理短信模板：</p>
                    <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="arr.msgModel"
                        class="padd-20"
                        rows="3"
                    >
                    </el-input>
                </div>
            </el-scrollbar>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="submit">确 定</el-button>
            <el-button type="info" @click="show = false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data(){
        return{
            show:false,
            textarea:'',
            content_item:[
                {
                    name:'火警联网未核',
                    dealTime:'1',
                    text:''
                },
                {
                    name:'消防设施故障',
                    dealTime:'1',
                    text:''
                },
                {
                    name:'电气火灾隐患',
                    dealTime:'1',
                    text:''
                },
                {
                    name:'消防通道堵塞',
                    dealTime:'1',
                    text:''
                },
                {
                    name:'消防管网液压及水压',
                    dealTime:'1',
                    text:''
                },
            ],
            set_content:[]
        }
    },
    methods:{
        GetSetting(){
            this.show = true;
            this.$axios.get(this.$api.GetSetting,
                {params:{operateCenterId:this.$store.state.userInfo.operateCenterId}}
            ).then(res=>{
                for(let i in res.result){
                    res.result[i].name = this.content_item[i].name
                }
                this.set_content = res.result
            })
        },
        submit(){
            this.$axios.put(this.$api.UpdateSetting,
                {operateCenterId:this.$store.state.userInfo.operateCenterId,settingList:this.set_content}
            ).then(res=>{
                console.log("修改",res)
            })
            this.show = false
        },
        beforeClosed(){

        }
    }
}
</script>

<style lang="less">
    .workset-dialog{
        .el-dialog__header {
            background-color:#333F50;
            border-bottom: 1px solid #47634D;
            .el-dialog__title {
                color: white;
                font-weight: bold;
                letter-spacing: 2px;
            }
            .el-dialog__headerbtn .el-dialog__close {
                color: white;
                font-size: 22px;
                font-weight: 600;
            }
        }
        .el-dialog--center .el-dialog__body{
            background: #333F50;
            .content{
                height: 500px;
                overflow: hidden;
                .content_item{
                    line-height: 2;
                    color: rgb(233, 230, 230);
                    font-size: 16px;
                    margin-bottom: 20px;
                    .el-textarea{
                        width: 90%;
                        .el-textarea__inner{
                            background: none;
                            border-color: rgb(175, 175, 175);
                            resize: none;
                            color: rgb(233, 230, 230);
                        }
                    }
                    .tip_icon{
                        width: 16px;
                        margin-right: 10px;
                    }
                    .padd-20{
                        padding-left: 60px;
                    }
                }
            }
        }
        .el-dialog--center .el-dialog__footer{
            border-top: 1px solid #47634D;
            background: #333F50;
            text-align: right;
            .el-button{
                width: 20%;
            }
        }
    }
    
</style>