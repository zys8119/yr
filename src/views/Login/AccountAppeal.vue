<template>
    <div class="AccountAppeal">
        <h2 class="title">{{airforce.layout.title}}</h2>
        <span class="msg">请认真填写以下问题，以便我们快速解决</span>
        <group class="login-group">
            <x-input class="AccountAppeal-x-input" title="申诉账号" placeholder="请填写登录账号" :value="airforce.AccountAppeal.name" @on-change="airforce.change.set($event,'name','AccountAppeal')"></x-input>
            <div @click="selectTime" class="disabledBox">
                <x-input class="AccountAppeal-x-input" title="注册时间" placeholder="请选择" :value="airforce.AccountAppeal.registerTime"></x-input>
                <div class="disabled"></div>
            </div>
            <x-input class="AccountAppeal-x-input" title="常用设备" placeholder="例如：iphone7、vivo X9" :value="airforce.AccountAppeal.device" @on-change="airforce.change.set($event,'device','AccountAppeal')"></x-input>
            <x-input class="AccountAppeal-x-input" title="联系方式" placeholder="便于我们联系您" :value="airforce.AccountAppeal.contact" @on-change="airforce.change.set($event,'contact','AccountAppeal')"></x-input>
            <x-input class="AccountAppeal-x-input" title="申诉原因" placeholder="请填写申诉原因" :value="airforce.AccountAppeal.contents" @on-change="airforce.change.set($event,'contents','AccountAppeal')"></x-input>
            <x-button class="login-x-button" @click.native="AccountAppeal">提交</x-button>
        </group>
    </div>
</template>

<script>
    import { Group, XInput, XButton } from 'vux'
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: "account-appeal",
        components:{ Group, XInput, XButton },
        methods:{
            ...mapActions(['action']),
            AccountAppeal(){
                if(!this.airforce.AccountAppeal.name || this.$utils.is_S(this.airforce.AccountAppeal.name)){
                    this.$vux.toast.text("【账号申诉】不能为空");
                    return;
                }else
                if(!this.airforce.AccountAppeal.contact || this.$utils.is_S(this.airforce.AccountAppeal.contact)){
                    this.$vux.toast.text("【联系方式】不能为空");
                    return;
                }else
                if(!this.airforce.AccountAppeal.name || this.$utils.is_S(this.airforce.AccountAppeal.contents)){
                    this.$vux.toast.text("【申诉原因】不能为空");
                    return;
                }
            },
            selectTime(){
                this.$vux.datetime.show({
                    value:this.airforce.AccountAppeal.registerTime,
                    minYear:1993,
                    maxYear:new Date().getFullYear(),
                    cancelText:"取消",
                    confirmText:"确定",
                    onConfirm:(e) =>{
                        this.action({
                            moduleName:'AccountAppeal',
                            goods:{
                                registerTime:e,
                            }
                        })
                        console.log(e)
                    }
                });
            }
        },
        computed:{
            ...mapGetters(['airforce']),
        },
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color.less";
.AccountAppeal{
    padding: 0 30px;
    .msg{
        color: @cor_a9a7ab;
        font-size: 12px;
        margin-bottom: 50px;
    }
    .title{
        font-family: "微软雅黑";
    }
    .login-group{
        &/deep/ .AccountAppeal-x-input{
            padding-left: 0;
            &:before{
                border: none;
            }
            .weui-cell__hd{
                border-bottom: 1px solid @cor_000000;
            }
            .weui-cell__bd{
                border-bottom: 1px solid @cor_D9D9D9;
            }
        }
        .disabledBox{
            position: relative;
            .disabled{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>