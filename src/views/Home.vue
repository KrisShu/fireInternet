<template>
  <el-container class="home">
    <el-header class="display" style="height:auto">
        <el-col :span="10">
          <div class="display header-left">
            <img class="logo_icon" src="../assets/images/home/logo.png" alt="">
            <div class="logo_tilte">
              <p class="logo_tilte_zn">城市消防物联网运营工作台</p>
              <p>Urban fire Internet of things operation workbench</p>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="display header-center">
            <img @click="unitAnalysis" src="../assets/images/home/one_icon.png" alt="">
            <img @click="operationReport" src="../assets/images/home/two_icon.png" alt="">
            <img @click="workset" src="../assets/images/home/three_icon.png" alt="">
          </div>
        </el-col>
        <el-col :span="7">
          <div class="header-right">
            <div class="header-right-set">
              <span>柳州</span>
              <img style="cursor: pointer;" @click="logout" src="../assets/images/home/top_img_04.png" alt="">
            </div>
            <p>{{mowtime}}</p>
          </div>
        </el-col>
    </el-header>
    <!--  -->
    <el-main>
      <el-row :gutter="20">
        <!-- 左侧 -->
        <el-col :span="10">
          <div class="grid-content bg-purple-left">
            <div class="bg-purple-left-top">
              <div @click="getName(arr.name,arr.type)" v-for="(arr,index) in lefttop" :key="index">
                <p>{{arr.name}}</p>
                <p><span>{{arr.num}}</span> <span class="unit">{{arr.unit}}</span></p>
              </div>
            </div>
            <div  class="bg-purple-left-map">
              <div id="mapBox"></div>
            </div>
          </div>
        </el-col>
        <!-- 中间 -->
        <el-col :span="7">
          <div class="grid-content bg-purple-cneter">
            <div class="bg-purple-top-title">
              {{center_title}}
            </div>
            <div class="bg-purple-top-content">
              <el-scrollbar v-if="UrgeList.length>0" style="overflow: hidden;height:100%">
                  <div class="bg-purple-top-content-item" v-for="(arr,index)  in UrgeList" :key="index">
                    <p>【防火单位】{{arr.fireUnitName}}</p>
                    <p>【单位地址】{{arr.fireUnitAddress}}</p>
                    <p>【联系人】{{arr.fireUnitContractUser}} <a v-if="center_title !== '物联终端离线'" @click="urge(arr.fireUnitId,arr.operateUrgeType)" style="margin-left:70px" href="#">督促处理</a></p>
                    <p class="total">{{arr.overdueRemark}}</p>
                  </div>
              </el-scrollbar>
              <div v-else>
                暂无数据
              </div>
               
            </div>
          </div>
        </el-col>
        <!--右侧  -->
        <el-col :span="7">
          <div class="grid-content bg-purple-right">
            <div class="bg-purple-top-title">
              督促处理
            </div>
            <div v-if="click" class="bg-purple-top-content">
              <div class="fireInfo">
                <div class="display fireInfo_top">
                  <el-image 
                    style="width: 120px; height: 120px"
                    :src="url" 
                    :preview-src-list="srcList">
                  </el-image>
                  <div class="fireInfo_top_right">
                    <p>【防火单位】</p>
                    <p>{{urgeDetail.fireUnitName}}</p>
                    <p>【单位地址】</p>
                    <p>{{urgeDetail.fireUnitAddress}}</p>
                  </div>
                </div>
                <div class="fireInfo_bottom">
                  <p><span>【联系人】</span>{{urgeDetail.contractUserName}} {{urgeDetail.contractPhone}}</p>
                  <p><span>【专/兼职消防员数量】</span>{{urgeDetail.firemanNum}}</p>
                  <p><span>【消防归口】</span>{{urgeDetail.fireDeptName}}</p>
                  <p><span>【上次督促】</span>{{urgeDetail.lastUrge}}</p>
                </div>
      
              </div>
              <div class="check_fireInfo">
                <el-form ref="form" :model="urgeDetail" label-width="120px">
                  <el-form-item label="【活动名称】">
                    <p>火警联网未核</p>
                  </el-form-item>
                  <el-form-item label="【督促方式】">
                    <el-radio-group @change="radiochange" v-model="urgeDetail.operateUrgeChannel">
                      <el-radio :label="1">短信</el-radio>
                      <el-radio :label="2">电话</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item v-if="messageBoxShow" label="【接收手机】">
                    <el-input v-model="urgeDetail.msgPhone"></el-input>
                  </el-form-item>
                  <el-input v-if="messageBoxShow"  rows="6" type="textarea" v-model="urgeDetail.msgContent"></el-input>

                 <div class="btnbox">
                   <el-button @click="send" type="success">发送</el-button>
                    <el-button type="info">取消</el-button>
                 </div>
                    
                </el-form>
              </div>
            </div>
            <!--  -->
            <div v-else class="bg-purple-top-content">
              <div class="protect_icon_box">
                <img src="../assets/images/home/protect.png" alt="">
              </div>
              <div class="urgeToalBox">
                <div class="message">
                  <p>短信督促</p>
                  <p>今日<span class="">{{UrgeChannelNum.messageTodayNum}}</span>次</p>
                   <p>总计<span>{{UrgeChannelNum.messageTotalNum}}</span>次</p>
                </div>
                 <div class="phonecall">
                  <p>电话督促</p>
                  <p>今日<span>{{UrgeChannelNum.phonecallTodayNum}}</span>次</p>
                   <p>总计<span>{{UrgeChannelNum.phonecallTotalNum}}</span>次</p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <UnitReport ref="unitReport"></UnitReport>
    <OperationReport ref="operationReport"></OperationReport>
    <WorkSet ref="workset"></WorkSet>
  </el-container>
</template>

<script>
import AMap from 'AMap'
import UnitReport from '../components/UnitReport.vue'
import OperationReport from '../components/OperationReport.vue'
import WorkSet from '../components/WorkSet.vue'
// @ is an alias to /src

let moment = require('moment')
export default {
  name: 'Home',
  components:{
    UnitReport,
    OperationReport,
    WorkSet
  },
  data(){
    return{
      OperateCenterId:this.$store.state.userInfo.operateCenterId,
      mowtime:'',
      lefttop:[
        {
          name:'火警联网未核',
          unit:'件',
          num:0,
          type:1
        },
        {
          name:'消防设施故障',
          unit:'个',
          num:0,
          type:2
        },
        {
          name:'电气火灾隐患',
          unit:'件',
          num:0,
          type:3
        },
        {
          name:'消防通道堵塞',
          unit:'件',
          num:8,
          type:4
        },
        {
          name:'消防管网液位及水压',
          unit:'件',
          num:0,
          type:5
        },
        {
          name:'物联终端离线',
          unit:'件',
          num:0,
          type:6
        },
      ],
      center_title:'火警联网未核',//中间title文字
      mapObj:'',//地图对象
      UrgeList:[],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '短信',
          desc: ''
      },
      urgeDetail:{

      },//督促详情
      click:false,
      messageBoxShow:true,//发送短信的盒子是否显示，true显示，false隐藏
      UrgeChannelNum:{
        messageTodayNum:0,
        messageTotalNum:0,
        phonecallTodayNum:0,
        phonecallTotalNum:0,
      }
      
    }
  },
  created(){
    this.currentTime();
    this.GetUrgeTypeNumList();//获取类型及数量
    this.GetUrgeList(1);
    this.GetUrgeChannelNum();
  },
  mounted(){
    this.initMap();
  },
  methods:{
    getNowTime(){
      this.mowtime =  moment().format("YYYY-MM-DD HH:mm:ss")
    },
    currentTime(){
      setInterval(this.getNowTime,100)
    },
    //单位分析
    unitAnalysis(){
      this.$refs.unitReport.opendialog();
    },
    //运营报告
    operationReport(){
      this.$refs.operationReport.show = true
    },
    //工作设置
    workset(){
      this.$refs.workset.GetSetting();
    },
    //获取类型及数量
    GetUrgeTypeNumList(){
      this.$axios.get(this.$api.GetUrgeTypeNumList,
        {params:{operateCenterId:this.$store.state.userInfo.operateCenterId}}
      ).then(res=>{
        console.log("获取数据成功",res);
        for(let i in res.result){
          this.lefttop[i].num = res.result[i].overdueNum
        }
      })
    },
    //
    getName(name,type){
      console.log(name)
      this.center_title = name;
      this.GetUrgeList(type)
    },
    //获取督促处理列表
    GetUrgeList(type){
      this.$axios.get(this.$api.GetUrgeList,
        {params:{OperateUrgeType:type,OperateCenterId:this.OperateCenterId }}
      ).then(res=>{
        console.log("获取督促处理列表",res)
        this.UrgeList = res.result
      })
    },
    //初始化地图
    initMap(){
        this.mapObj = new AMap.Map('mapBox', {
            resizeEnable: true, //自适应大小
            zoom: 8,//初始视窗
            center:[this.$store.state.userInfo.lng,this.$store.state.userInfo.lat],
            layers: [
              // 卫星
              new AMap.TileLayer.Satellite(),
              // 路网
              new AMap.TileLayer.RoadNet()
            ],
        });
        setTimeout(() => {
                this.setarea();

                this.makeMark();
        });
    },
    //行政区规划
    setarea() {
        let that = this;
        AMap.plugin('AMap.DistrictSearch', function () {
            var districtSearch = new AMap.DistrictSearch({
                // 关键字对应的行政区级别
                level: 'city',
                //  显示下级行政区级数，1表示返回下一级行政区
                subdistrict: 1,
                // 返回行政区边界坐标等具体信息
                extensions: "all",
            })
            // 搜索所有省/直辖市信息 
            districtSearch.search('柳州', function(status, result) {
                // 查询成功时，result即为对应的行政区信息
                // console.log(result)
                // 获取相关区域的边界信息
                var bounds = result.districtList[0].boundaries
                var polygons = []
                if(bounds){
                    for (var i = 0, l = bounds.length; i < l; i++) {
                        //生成行政区划polygon
                        var polygon = new AMap.Polygon({
                            map: that.mapObj,
                            strokeWeight: 1,
                            path: bounds[i],
                            fillOpacity: 0.4,
                            fillColor: '#000000',
                            strokeColor: '#0000AA'
                        })
                        polygons.push(polygon)
                    }
                }
            })
        })
    },
    //地图标记点
    makeMark(){
            let that = this;
            this.$axios.get(this.$api.GetFireUnitForMap, 
                {params: { operateCenterId: this.operateCenterId }}
            ).then(res=>{
                console.log("获取的点位",res)
                //过滤要显示为红点的
                let redspotArray =[];
                // redspotArray = res.result.filter(item=>item.existTrueFireAlarm ==true)
                // //过滤不显示为红点的
                // this.spots =res.result.filter(item=>item.existTrueFireAlarm ==false)
                // // console.log("redspotArray", this.spots)
                // let spotArray = [],spotArrayRed=[];
                // for (let item of  this.spots) {
                //     spotArray.push({
                //     lnglat: [item.lng, item.lat], //点标记位置
                //     id: item.fireunitId
                //     });
                // }
                // for (let item2 of  redspotArray) {
                //     spotArrayRed.push({
                //         lnglat: [item2.lng, item2.lat], //点标记位置
                //         id: item2.fireunitId
                //     });
                // }

                // let style = [
                //     {
                //         url:require('../assets/blue_mark1.png'),
                //         anchor: new AMap.Pixel(16, 26),
                //         size: new AMap.Size(32, 36)
                //     }
                // ],
                // redstyle =[{
                //     url:require('../assets/red_mark.png'),
                //     anchor: new AMap.Pixel(16, 26),
                //     size: new AMap.Size(32, 36)
                // }];
                // let mass = new AMap.MassMarks(spotArray, {
                //     opacity: 0.8,
                //     zIndex: 111,
                //     cursor: "pointer",
                //     style: style
                // });
                // let massRed = new AMap.MassMarks(spotArrayRed, {
                //     opacity: 0.8,
                //     zIndex: 112,
                //     cursor: "pointer",
                //     style: redstyle
                // });
                // mass.on("click",this.getMapMarkInfo);
                // mass.setMap(that.map);
                // massRed.setMap(that.map);
                // massRed.on("click",this.getMapMarkInfo);
            })
      },

    //督促点击
    urge(id,type){
      this.click = true;
      this.$axios.get(this.$api.GetUrgeDetail,
        {params:{OperateCenterId:this.OperateCenterId,FireUnitId :id,OperateUrgeType :type}}
      ).then(res=>{
        console.log("获取详情",res)
        this.urgeDetail = res.result
      })
    },
    //
    radiochange(index){
      console.log("radiochange",index)
      if(index == '电话'){
        this.messageBoxShow = false;
      }else{
        this.messageBoxShow = true;
      }
    },
    //
    send(){
      this.click = false
    },
    //获取督促方式的次数统计
    GetUrgeChannelNum(){
      this.$axios.get(this.$api.GetUrgeChannelNum,
        {params:{operateCenterId:this.operateCenterId}}
      ).then(res=>{
        console.log("获取督促方式的次数统计",res)
        this.UrgeChannelNum.messageTodayNum = res.result[0].todayNum
        this.UrgeChannelNum.messageTotalNum = res.result[0].totalNum
        this.UrgeChannelNum.phonecallTodayNum = res.result[1].todayNum
        this.UrgeChannelNum.phonecallTotalNum = res.result[1].totalNum
      })
    },
    //退出登录
    logout(){
      this.$confirm('确定注销登录?', '注销登录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          
          this.$axios.post(this.$api.UserLogout).then(res=>{
            console.log("注销成功",res);
            localStorage.clear();
            this.$router.push('/login')
            this.$message({
              type: 'success',
              message: '注销成功!'
            });
          })
      }).catch(() => {       
      });
    }
  }
}
</script>

<style lang="less">
@bgcolor:#181717;
.home{
  height: 100vh;
  width: 100%;
  background: @bgcolor;
  color: white;

  .display{
    display: flex;
    align-items: center;
  }
  .display_cloumn{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .el-header{
    padding: 10px 4px;
    .header-left{
      .logo_icon{
        width: 60px;
        margin-right: 20px;
      }
      .logo_tilte{
        font-size: 16px;
        line-height: 1.5;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        .logo_tilte_zn{
          font-size: 26px;
        }
      }
    }
    .header-center{
      justify-content: space-around;
      img{
        width: 80px;
        cursor: pointer;
      }
    }
    .header-right{
      text-align: right;
      line-height: 2;
      &-set{
        padding-right: 90px;
        img{
          margin-left: 10px;
        }
      }
    }

  }
  .el-main {
    flex: 2 0 auto;
    padding: 0px 4px 10px 4px;
    // overflow: hidden;
    overflow-x: hidden;
    // background: white;
    .el-row{
      height: 100%;
      .el-col{
        height: 100%;
        // background: palevioletred;
      }
    }
    .grid-content {
      border-top-width: 4px;
      border-top-style: solid;
      box-sizing: border-box;
    }
    //-------------------------------------------------
    .bg-purple-left{
      height: 100%;
      border-top-color: #60A4E2;
      display: flex;
      flex-direction: column;

      // background: darkcyan;
      .bg-purple-left-top{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 10px;
        div{
          width: 30%;
          height: 80px;
          background: #BA8E07;
          margin-top: 10px;
          box-sizing: border-box;
          padding: 10px;
          padding-left: 24px;
          font-size: 18px;
          line-height: 1.5;
          cursor: pointer;
          span{
            font-size: 28px;
            font-weight: bold;
            margin-right: 10px;
            &.unit{
              font-size: 14px;
              font-weight: normal;
            }
          }
          &:nth-child(odd){
            background: #AD5F29;
          }
        }
      }
      .bg-purple-left-map{
        flex: 2 auto 0 ;
        border-image: url("../assets/images/home/mapBoeder.png") 32 37 repeat stretch;
        border-style: solid;
        border-width: 10px 10px;
        // border-radius: 20px;
        height: 80%;
        #mapBox{
          height: 100%;
        }
        
      }
    }
    //--------------------------------------------------
    .bg-purple-cneter{
      height: 100%;
      overflow: hidden;
      border-top-color: #EC7C30;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      // display: flex;
      // flex-direction: column;
      .bg-purple-top-content-item{
        padding: 10px;
        font-size: 18px;
        line-height: 1.8;
        border-bottom: 1px solid #906B52;
        p{
          a{
            color: #6EA5DF;
          }
        }
        .total{
          background: #DAE3F3;
          color: #232323;
          padding-left: 10px;
          margin: 6px 0;
          border: 1px solid #878EA3;
        }
      }
      .bg-purple-top-content{
        height: 764px;
        /* 解决自定义滚动条 x 轴显示问题 */
        .el-scrollbar__wrap{
          overflow-x: hidden;
        }
      }
    }
    //--------------------------------------------------
    .bg-purple-right{
      height: 100%;
      border-top-color: #73B349;
      display: flex;
      flex-direction: column;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      .fireInfo{
        padding: 20px;
        font-size: 18px;
        border-bottom: 1px solid #906B52;
        .fireInfo_top{
          margin-bottom: 20px;
          .fireInfo_top_right{
            margin-left: 20px;
            line-height: 2;
          }
        }
        .fireInfo_bottom{
          line-height: 2;
        }
      }
      .check_fireInfo{
        padding: 20px;
        .el-form{
          .el-form-item{
            margin-bottom: 18px;
            &:nth-last-of-type(1){
              margin: 0;
              margin-top: 18px;
            }
            .el-form-item__label{
              font-size: 18px;
              color: white;
            }
            .el-form-item__content{
              font-size: 18px;
              color: white;
              &:nth-last-of-type{
                margin: 0 !important;
              }
              .el-radio{
                .el-radio__inner{
                  width: 18px;
                  height: 18px;
                }
                .el-radio__label{
                  font-size: 18px;
                  color: white;
                }
              }
              .el-input{
                .el-input__inner{
                  background: none;
                  border-color: #906B52;
                }
              }
            }
          }
          .el-textarea__inner{
                  background: none !important;
                  border-color: #906B52;
                  resize: none;
          }
          .btnbox{
            margin-top: 18px;
            .el-button{
              width: 49%;
            }
          }
          
        }
      }
      .protect_icon_box{
        border-bottom: 1px solid #906B52;
        height: 50%;
        text-align: center;
        img{
          height: 100%;
        }
      }
      .urgeToalBox{
        padding: 20px;
        display: flex;
        height: 50%;
        box-sizing: border-box;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        div{
          width: 80%;
          color: white;
          line-height: 1.5;
          padding: 10px;
          span{
            font-size: 28px;
            margin: 0 10px;
          }
          &.message{
            background: #0D8BBB;
            margin-bottom: 10px;
          }
          &.phonecall{
            background: #0D5E9A;
            margin-bottom: 10px;
          }
        }
      }
    }
    .bg-purple-top-title{
        background: #2B333F;
        margin: 10px 0px;
        line-height: 46px;
        border-radius: 2px;
        text-align: center;
        font-size: 22px;
        // background: darkorchid;
    }
    .bg-purple-top-content{
      height: 100%;
      background: #2B333F;
      overflow: hidden !important;
    }
   
  }

}
</style>
