<template>
    <div id="loginContainer">
        <div class="loginBox">
            <div class="loginFrom">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="80px">
                    <!-- 用户名 -->
                    <el-form-item  prop="account">
                        <el-input  placeholder="请输入您的用户名" v-model="ruleForm.account">
                             <i slot="prefix" class="el-input__icon el-icon-user"></i>
                        </el-input>
                        
                    </el-form-item>
                   <el-form-item prop="password">
                        <el-input  type="password" placeholder="请输入您的密码" v-model="ruleForm.password">
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                   <el-form-item class="login_code" prop="verifyCode">
                        <el-input  placeholder="请输入验证码" v-model="ruleForm.verifyCode">
                            <i slot="prefix" class="el-input__icon  el-icon-key"></i>
                        </el-input>
                        <img :src="codeimgUrl" alt="">
                        <a @click="getCode" href="#">换一张</a>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit(ruleForm)"></el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            ruleForm: {
                account: '',
                password: '',
                verifyCode:''
            },
            rules: {
                account: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                verifyCode: [{ required: true, message: "请输入验证码" }]
            
            },
            codeimgUrl:"",//验证码
        }
    },
    created(){

    },
    mounted(){
        this.getCode();
    },
    methods:{
        go(){
           
        },
        /* 用户登录 */
        onSubmit(){
             
            this.$refs.ruleForm.validate(valid => {
                if(valid){
                    this.$axios.post(this.$api.UserLogin,this.ruleForm).then(res=>{
                        localStorage.setItem('fireInterLogin',1)
                        localStorage.setItem('userinfo',JSON.stringify(res.result))
                        this.$store.commit("setUserInfo", res.result);
                        this.$router.push('/')
                        console.log("登录成功",res)
                    }).catch(err=>{
                        console.log("登录失败",err)
                    })
                }
            })
        },
        /* 获取验证码 */
        getCode(){
            this.$axios.get(this.$api.GetVerifyCode,{responseType: "blob"}).then(res=>{
                // console.log("获取验证码：",res)
                this.codeimgUrl = window.URL.createObjectURL(res);
            }).catch(err=>{

            })
        },
        /* 更换二维码 */
        changeCode(){
        }

    }
}
</script>
<style lang="less">
    #loginContainer{
        width: 100%;
        height: 100vh;
        background:url("../assets/images/login/load_img_bg.png")  no-repeat;
        background-size: 100% 100%;
        position: relative;
        .loginBox{
            width: 786px;
            height: 400px;
            background: url("../assets/images/login/load_img_bg01.png");
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            display: flex;
            justify-content: flex-end;
            .loginFrom{
                height: 100%;
                width: 314px;
                padding: 40px 20px;
                box-sizing: border-box;
                .el-form-item{
                    margin-bottom: 44px;
                }
                .el-form-item__content{
                    margin: 0px !important;
                    display: flex;
                    align-items: center;
                    .el-form-item__error{
                        color: #00b4ff;
                    }
                    .el-input{
                       border: none;
                       background-color: #1f3769;
                       .el-input__inner{
                            border: none;
                            background-color:  #1f3769;
                            color: white;
                       }
                     
                    }
                    .el-button{
                        width: 100%;
                        background: url('../assets/images/login/load_btn_load.png') no-repeat;
                        background-size: cover;
                        border: none;
                        height: 38px;
                    }
                }
                .login_code{
                    .el-form-item__content{
                       .el-input{
                           width: 130px;
                       }
                       a{
                           color: #fefefe;
                       }
                    }
                }
            }
        }
    }
</style>

