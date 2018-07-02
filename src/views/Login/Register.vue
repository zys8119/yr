<template>
    <div class="Register">
        <h2 class="title" v-if="show">{{airforce.layout.title}}</h2>
        <img class="logo" v-else :src="require('@/assets/logo.png')">
        <group class="login-group">
            <x-input placeholder="手机号" class="login-x-input" :value="airforce[fieldType].phone" @on-change="airforce.change.set($event,'phone',fieldType)"></x-input>
            <z-input placeholder="短信验证码" class="login-x-input" class-name="Register-z-input" :value="airforce[fieldType].code" @change="airforce.change.set($event,'code',fieldType)" @click="getCode" :disabled-btn="airforce[fieldType].disabledBtn" :field-name="fieldType"></z-input>
            <x-input placeholder="设置一个密码" class="login-x-input"  type="password" :value="airforce[fieldType].password" @on-change="airforce.change.set($event,'password',fieldType)"></x-input>
            <x-input placeholder="重复密码" class="login-x-input"  type="password" :value="airforce[fieldType].passwordCopy" @on-change="airforce.change.set($event,'passwordCopy',fieldType)"></x-input>
            <x-input v-if="fieldType != 'ForgetPwd'" placeholder="推荐人手机号" class="login-x-input" :value="airforce[fieldType].referee" @on-change="airforce.change.set($event,'referee',fieldType)"></x-input vif>
            <x-button class="login-x-button" @click.native="register">{{btnName}}</x-button>
            <x-button v-if="!show" class="login-x-button download" @click.native="register">下载APP</x-button>
        </group>
    </div>
</template>

<script>
    import { Group, XInput, XButton } from 'vux'
    import { mapGetters, mapActions } from 'vuex'
    import { ZInput } from "@/components"
    export default {
        name: "register",
        components:{ Group, XInput, ZInput, XButton },
        data(){
            return {
                show:true,
            }
        },
        props:{
            fieldType:{
                type:String,
                default:"register"
            },
            btnName:{
                type:String,
                default:"提交"
            },
        },
        computed:{
            ...mapGetters(['airforce']),
        },
        methods:{
            ...mapActions(['action']),
            getCode(next){
                if(!this.airforce[this.fieldType].phone || this.$utils.is_S(this.airforce[this.fieldType].phone)){
                    this.$vux.toast.text("【手机号】不能为空");
                    return;
                }
                if(!this.$utils.isPhone(this.airforce[this.fieldType].phone)){
                    this.$vux.toast.text("【手机号】格式错误");
                    return;
                }
                this.action({
                    moduleName:"getcode",
                    url:'/member/getcode',
                    method:'post',
                    isFormData:true,
                    data:{
                        phone:this.airforce[this.fieldType].phone
                    }
                }).then(res=>{
                    if(res.code != 200){
                        this.$vux.toast.text(res.message);
                        return;
                    }
                    this.action({
                        moduleName:this.fieldType,
                        goods:{
                            code:res.data.code_name
                        }
                    });
                }).catch(err=>{
                    this.$vux.toast.text(err);
                });
                next({
                    fieldName:this.fieldType
                });
            },
            register(){
                if(!this.airforce[this.fieldType].phone || this.$utils.is_S(this.airforce[this.fieldType].phone)){
                    this.$vux.toast.text("【手机号】不能为空");
                    return;
                }
                if(!this.$utils.isPhone(this.airforce[this.fieldType].phone)){
                    this.$vux.toast.text("【手机号】格式错误");
                    return;
                }
                if(!this.airforce[this.fieldType].code || this.$utils.is_S(this.airforce[this.fieldType].code)){
                    this.$vux.toast.text("【短信验证码】不能为空");
                    return;
                }
                if(!this.airforce[this.fieldType].password || this.$utils.is_S(this.airforce[this.fieldType].password)){
                    this.$vux.toast.text("【密码】不能为空");
                    return;
                }
                if(this.airforce[this.fieldType].password.length < 6){
                    this.$vux.toast.text("【密码】长度至少为6位及以上字符");
                    return;
                }
                if(!this.airforce[this.fieldType].passwordCopy || this.$utils.is_S(this.airforce[this.fieldType].passwordCopy)){
                    this.$vux.toast.text("请重复【密码】");
                    return;
                }
                if(this.airforce[this.fieldType].passwordCopy != this.airforce[this.fieldType].password){
                    this.$vux.toast.text("密码不一致");
                    return;
                }
                switch (this.fieldType){
                    case 'ForgetPwd':
                        this.$vux.loading.show({text: '加载中..'});
                        //忘记密码
                        this.action({
                            moduleName:'ForgetPwd_post',
                            url:'/member/forgetpwd',
                            isFormData:true,
                            method:'post',
                            data:this.airforce[this.fieldType]
                        }).then(res=>{
                            if(res.code != 200){
                                this.$vux.toast.text(res.message);
                                return;
                            }
                            this.action({
                                moduleName:this.fieldType,
                                goods:null,
                            });
                            this.action({
                                moduleName:this.fieldType,
                                goods:{},
                            });
                            this.$vux.toast.text("重置成功");
                            this.$router.push("/Login");
                        }).catch(err=>{
                            this.$vux.toast.text(err);
                        });
                        break;
                    default:
                        if(!this.airforce[this.fieldType].referee || this.$utils.is_S(this.airforce[this.fieldType].referee)){
                            this.$vux.toast.text("【推荐人手机】不能为空");
                            return;
                        }
                        if(!this.$utils.isPhone(this.airforce[this.fieldType].referee)){
                            this.$vux.toast.text("【推荐人手机】格式错误");
                            return;
                        }
                        this.$vux.loading.show({text: '加载中..'});
                        //新手注册
                        this.action({
                            moduleName:'login_post',
                            url:'/member/register',
                            isFormData:true,
                            method:'post',
                            data:this.airforce[this.fieldType]
                        }).then(res=>{
                            if(res.code != 200){
                                this.$vux.toast.text(res.message);
                                return;
                            }
                            if(this.$route.query.type == "2"){
                                this.$vux.toast.text("账号开通成功");
                                this.$router.back();
                                return;
                            }
                            this.action({
                                moduleName:this.fieldType,
                                goods:null,
                            });
                            this.action({
                                moduleName:this.fieldType,
                                goods:{},
                            });
                            this.$vux.toast.text("注册成功");
                            localStorage.login_post = JSON.stringify(res);
                            this.action({
                                moduleName:"prefectInfo",
                                goods:res.data
                            });
                            this.$utils.SearchParentKey(this.$parent,"initConfig").value()
                            this.$router.push("/Home");
                        }).catch(err=>{
                            this.$vux.toast.text(err);
                        });
                        break;
                }

            }
        },
        mounted(){
            if(this.fieldType == 'register' && this.$route.query.type && this.$route.query.type == '1'){
                this.action({
                    moduleName:"layout",
                    goods:{
                        headerShow:false,
                    }
                });
                this.show = false;
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color.less";
.Register{
    padding: 0 30px;
    .title{
        font-family: "微软雅黑";
        margin-bottom: 50px;
    }
    .logo{
        width: 60px;
        height: 60px;
        margin: auto;
        display: block;
        margin-top: 40px;
    }
    .login-group{
        &/deep/ .login-x-input{
            background-color: transparent !important;
            border-bottom: 1px solid @cor_e5e5e5;
            margin-bottom: 0 !important;
            padding-left: 0;
             .Register-z-input{
                padding-left: 0;
            }
            .z-input-x-button{
                top: 0;
                right: 0;
                height: 100%;
                border-left: 1px solid @cor_e5e5e5;
                color:  @theme-color;
            }
        }
    }
    .download{
        margin-top: @maTop !important;
    }
}
</style>