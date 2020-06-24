const API = {
    UserLogin:"/api/services/app/OperateCenterUser/UserLogin",//用户登录
    GetVerifyCode:"/api/services/app/OperateCenterUser/GetVerifyCode",//获取验证码
    UserLogout:"/api/services/app/OperateCenterUser/UserLogout",//注销用户

    GetUrgeTypeNumList:'/api/services/app/OperateCenter/GetUrgeTypeNumList',//获取各督促处理类型的超期未处理数量
    GetFireUnitForMap:'/api/services/app/OperateCenter/GetFireUnitForMap',//获取地图上显示的防火单位列表
    GetFireUnitInfo:'/api/services/app/FireUnit/GetFireUnitInfo',//（单个防火单位）防火单位详情
    GetFireUnitReport:'/api/services/app/FireUnit/GetFireUnitReport',//获取防火单位的综合数据报告

    GetUrgeList:'/api/services/app/OperateCenter/GetUrgeList',//获取督促处理列表
    GetUrgeDetail:'/api/services/app/OperateCenter/GetUrgeDetail',//点击督促处理时，获取到详情
    SubmitUrge:'/api/services/app/OperateCenter/SubmitUrge',//提交督促处理

    GetOperateReport:'/api/services/app/OperateCenter/GetOperateReport',//运营报告
    
    GetFireUnitByName:'/api/services/app/OperateCenter/GetFireUnitByName',//
    GetFireUnitOperateReport:'/api/services/app/OperateCenter/GetFireUnitOperateReport',//获得单位分析报告


    GetSetting:'/api/services/app/OperateCenter/GetSetting',//获取工作设置列表
    UpdateSetting:'/api/services/app/OperateCenter/UpdateSetting',//提交工作设置修改


    GetUrgeChannelNum:'/api/services/app/OperateCenter/GetUrgeChannelNum',//获取督促方式的次数统计





}
export default API;