<template>
    <div class="MyWallet">
        <div class="flexbox-item-bottom-box">
            <flexbox class="bottom">
                <flexbox-item class="flexbox-item-bottom left">
                    <h1>{{airforce.prefectInfo.member_wallet | member_wallet}}</h1>
                    <p>金币余额</p>
                </flexbox-item>
                <flexbox-item class="flexbox-item-bottom content">
                    <h1>{{airforce.prefectInfo.maid_money}}</h1>
                    <p>待审核佣金</p>
                </flexbox-item>
                <flexbox-item class="flexbox-item-bottom right">
                    <h1>{{airforce.prefectInfo.cash | member_wallet}}</h1>
                    <p>已提金额</p>
                </flexbox-item>
            </flexbox>
        </div>
        <group class="User-group User-group-top">
            <x-input title="金额"  :value="airforce.Withdraw.money" @on-change="airforce.change.set($event,'money','Withdraw')" placeholder="请输入提现金额"></x-input>
            <cell title="支付宝" :inline-desc="inlineDesc">
                <span slot="icon" class="icon iconfont" :class="{not:!airforce.prefectInfo.alipay}">&#xe642;</span>
                <span v-if="airforce.prefectInfo.alipay">{{airforce.prefectInfo.alipay}}</span>
            </cell>
            <x-input title="手机号"  :value="airforce.Withdraw.telephone" @on-change="airforce.change.set($event,'telephone','Withdraw')" placeholder="输入手机号"></x-input>
        </group>
        <p class="alerts">
            温馨提示：提现时请确保您的支付宝账号及姓名的正确性，确保及时到账<br>
            提现时间：周一至周五，9:00-17:30<br>
            提现当天到账，感谢您的支持！
        </p>
        <x-button class="login-x-button" @click.native="go">立即提现</x-button>
    </div>
</template>

<script>
    import { Group, Cell, XInput, Flexbox, FlexboxItem, XButton } from 'vux'
    export default {
        name: "my-wallet",
        components:{ Group, Cell, XInput, Flexbox, FlexboxItem, XButton },
        data(){
            return {
              meg:"请先点击右上角绑定收款账号",
            }
        },
        created(){
          this.action({
              moduleName:"Withdraw",
              goods:{},
          })
        },
        methods:{
            go(){
                if(this.$utils.is_S(this.airforce.Withdraw.money)){
                    this.$vux.toast.text("请输入金额");
                    return;
                }
                if(!this.airforce.prefectInfo.alipay){
                    this.$vux.toast.text(this.meg);
                    return;
                }
                if(this.$utils.is_S(this.airforce.Withdraw.telephone)){
                    this.$vux.toast.text("请输入手机号");
                    return;
                }
                if(!this.$utils.isPhone(this.airforce.Withdraw.telephone)){
                    this.$vux.toast.text("手机号格式错误");
                    return;
                }
                this.$vux.loading.show("加载中...");
                this.action({
                    moduleName:'addcash_post',
                    url:"/header/addcash",
                    method:"post",
                    data:_.merge({
                        token:this.airforce.login_post.data.token,
                        type:'1',//1.支付宝，2.银行卡
                        flag:this.flag
                    },this.airforce.Withdraw)
                }).then(res=>{
                   this.$vux.loading.hide();
                   this.$vux.toast.text(res.message);
                   if(res.code == 200){
                       this.action({
                           moduleName:'prefectInfo',
                           goods:res.data
                       })
                       this.$router.back();
                   }
                }).catch(err=>{
                    this.$vux.loading.hide();
                    this.$vux.toast.text(err);
                });
            }
        },
        computed:{
            inlineDesc(){
                if(!this.airforce.prefectInfo.alipay){
                  return  this.meg;
                }
            },
            flag(){
                if(this.$route.query.flag){
                    return this.$route.query.flag;
                }
                return 1;
            }
        },
        mounted(){
            this.action({
                moduleName:'layout',
                goods:{
                    clickRight:()=>{
                        this.$router.push("/BindAccount")
                    }
                }
            });
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
                        })
                    }
                }).catch(err=>{
                    this.$vuz.loading.hide();
                })
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color";
.MyWallet{
    .icon{
        margin-right: @maTop;
        font-size: 30px;
        color: @cor_009cff;
        &.not{
            color: @cor_C8C8CD;
        }
    }
    &/deep/ .vux-no-group-title{
        margin: 0;
        margin-top: @maTop;
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