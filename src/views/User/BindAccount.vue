<template>
    <div class="MyWallet">
        <group class="User-group User-group-top">
            <x-input title="昵称" placeholder="请输入昵称" :value="airforce.BindAccount.nick_name" @on-change="airforce.change.set($event,'nick_name','BindAccount')"></x-input>
            <x-input title="微信号" placeholder="请输入微信号" :value="airforce.BindAccount.wx_number" @on-change="airforce.change.set($event,'wx_number','BindAccount')"></x-input>
            <x-input title="银行卡" placeholder="请输入银行卡号" :value="airforce.BindAccount.bank" @on-change="airforce.change.set($event,'bank','BindAccount')"></x-input>
            <x-input title="银行卡名称" placeholder="请输入银行卡名称" :value="airforce.BindAccount.bank_name" @on-change="airforce.change.set($event,'bank_name','BindAccount')"></x-input>
            <x-input title="支付宝" placeholder="请输入支付宝账号" :value="airforce.BindAccount.alipay" @on-change="airforce.change.set($event,'alipay','BindAccount')"></x-input>
            <x-input title="支付宝名称" placeholder="请输入支付宝姓名" :value="airforce.BindAccount.alipay_name" @on-change="airforce.change.set($event,'alipay_name','BindAccount')"></x-input>
        </group>
        <x-button class="login-x-button" @click.native="go">确认提交</x-button>
    </div>
</template>

<script>
    import { Group, Cell, XInput, Flexbox, FlexboxItem, XButton, XTextarea } from 'vux'
    import airforce from "../../store/airforce";
    export default {
        name: "bind-account",
        components:{ Group, Cell, XInput, Flexbox, FlexboxItem, XButton, XTextarea },
        created(){
            this.action({
                moduleName:'BindAccount',
                goods:{}
            });
        },
        methods:{
            go(){
                if(this.$utils.is_S(this.airforce.BindAccount.nick_name)){
                    this.$vux.toast.text("请输入昵称");
                    return;
                }
                if(this.$utils.is_S(this.airforce.BindAccount.wx_number)){
                    this.$vux.toast.text("请输入微信号");
                    return;
                }
                if(this.$utils.is_S(this.airforce.BindAccount.bank)){
                    this.$vux.toast.text("请输入银行卡");
                    return;
                }
                if(this.$utils.is_S(this.airforce.BindAccount.bank_name)){
                    this.$vux.toast.text("请输入银行卡名称");
                    return;
                }
                if(this.$utils.is_S(this.airforce.BindAccount.alipay)){
                    this.$vux.toast.text("请输入支付宝");
                    return;
                }
                if(this.$utils.is_S(this.airforce.BindAccount.alipay_name)){
                    this.$vux.toast.text("请输入支付宝名称");
                    return;
                }
                this.$vux.loading.show("提交中...");
                this.action({
                    moduleName:'cashbind_post',
                    url:"/header/cashbind",
                    method:"post",
                    data:_.merge(this.airforce.BindAccount,{
                        token:this.airforce.login_post.data.token,
                    })
                }).then(res=>{
                    this.$vux.loading.hide();
                    if(res.code != 200){
                        this.$vux.toast.text(res.message);
                        return;
                    }
                    this.action({
                        moduleName:'prefectInfo',
                        goods:this.airforce.BindAccount
                    });
                    this.$vux.toast.text("绑定成功");
                    this.$router.back();
                }).catch(err=>{
                    this.$vux.loading.hide();
                    this.$vux.toast.text(err);
                });
            }
        },
        mounted(){
            if(!this.airforce.memberdDetail_post || this.airforce.memberdDetail_post.code != 200){
                this.$vuz.loading.show({theme:"transparent"});
                this.action({
                    moduleName:'memberdDetail_post',
                    url:"/member/memberdDetail",
                    method:"post",
                    data:{
                        token:this.airforce.login_post.data.token,
                    }
                }).then(res=>{
                    this.$vuz.loading.hide();
                    if(res.code == 200){
                        try {
                            res.data.address_all = JSON.parse(res.data.address_all);
                        }catch (e){}
                        this.action({
                            moduleName:'prefectInfo',
                            goods:res.data
                        });
                        this.action({
                            moduleName:'BindAccount',
                            goods:res.data
                        });
                    }
                }).catch(err=>{
                    this.$vuz.loading.hide();
                })
            }else {
                this.action({
                    moduleName:'BindAccount',
                    goods:this.airforce.prefectInfo
                });
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color";
.MyWallet{
    .icon{
        margin-right: @maTop;
    }
    &/deep/ .vux-no-group-title{
        margin: 0;
    }
    .flexbox-item-bottom-box{
        background-color: @cor_ffffff;
        .flexbox-item-bottom{
            text-align: center;
            color: @theme-color;
            margin: @maTop 0;
            margin-top: @maTop !important;
            h1{
                font-size: 18px;
                font-weight: initial;
            }
            p{
                font-size: 12px;
            }
            &.right{
                border: none;
            }
        }
    }
    .alerts{
        padding: @maTop @paIndex;
        font-size: 12px;
        color: @cor_C8C8CD;
    }
    .login-x-button{
        width: 80%;
    }
}
</style>