<template>
    <div class="ApplicationDetails">
        <flexbox class="flexbox">
            <flexbox-item>
                <p>最高额度</p>
                <p>{{airforce.ApplicationDetails.data.quota}}元</p>
            </flexbox-item>
            <flexbox-item>
                <p>期限范围</p>
                <p>{{airforce.ApplicationDetails.data.term | term}}期</p>
            </flexbox-item>
            <flexbox-item>
                <p>月利率</p>
                <p>{{airforce.ApplicationDetails.data.rate | rate}}%</p>
            </flexbox-item>
        </flexbox>
        <div class="card">
            <div class="cardBox">
                <flexbox class="top">
                    <flexbox-item span="60">
                        <img class="logo" :src="airforce.ApplicationDetails.data.img">
                    </flexbox-item>
                    <flexbox-item>
                        <div class="title">{{airforce.ApplicationDetails.data.title}}</div>
                    </flexbox-item>
                </flexbox>
                <flexbox class="top-1">
                    <flexbox-item>
                        <p class="title">{{money}}</p>
                        <div>月还款（元）</div>
                    </flexbox-item>
                    <flexbox-item span="1" class="line"></flexbox-item>
                    <flexbox-item>
                        <p class="title">{{interest}}</p>
                        <div>总利息（元）</div>
                    </flexbox-item>
                </flexbox>
                <group class="group">
                    <x-input ref="moneyInput" :value="airforce.AppLDetails.money" @on-change="inputChange" label-width="100" title="金额(元)" placeholder="请输入金额" class="input"></x-input>
                    <z-select @on-change="selectChange" title="期限" label-width="120" type="select" :data="list" name="select" module-name="AppLDetails"></z-select>
                </group>
                <div class="group-content"></div>
            </div>
        </div>
        <div class="bottomBox">
            <group class="group">
                <x-input title="姓名" placeholder="请输入姓名" :value="airforce.AppLDetails.name" @on-change="airforce.change.set($event,'name','AppLDetails')"></x-input>
                <x-input title="手机号" placeholder="请输入手机号" :value="airforce.AppLDetails.phone" @on-change="airforce.change.set($event,'phone','AppLDetails')"></x-input>
            </group>
            <div class="msg">已有0人申请</div>
            <div class="bottomBox-flexbox-box">
                <flexbox class="bottomBox-flexbox">
                    <flexbox-item><x-button class="login-x-button" @click.native="Application">立即申请</x-button></flexbox-item>
                    <flexbox-item><x-button class="login-x-button">申请攻略</x-button></flexbox-item>
                </flexbox>
            </div>
        </div>

    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, Group, XInput, XTextarea, XButton } from 'vux'
    import { ZSelect } from '@/components'
    export default {
        name: "index",
        components:{ Flexbox, FlexboxItem, Group, XInput, ZSelect, XTextarea, XButton },
        data(){
            return {
                money:0,
                interest:0,
            }
        },
        created(){
            this.action({
                moduleName:'ApplicationDetails',
                goods:{
                   data:{}
                },
            });
            this.action({
                moduleName:'AppLDetails',
                goods:{},
            });
        },
        methods:{
            calcMoney(){
                try {
                    this.action({
                        moduleName:'CalcRate',
                        url:'/header/rate',
                        method:"post",
                        data:{
                            amount:this.airforce.AppLDetails.money,
                            terms:this.airforce.AppLDetails.select_Select.value,
                            rate:this.airforce.ApplicationDetails.data.rate,
                        }
                    }).then(res=>{
                        if(res.code == 200){
                            this.interest = res.data.total_interest;
                            this.money = res.data.month_repaymemt;
                        }
                    })
                }catch (e){}
            },
            inputChange(val){
                if(/^(\d*|\d*\.{1}|\d*\.{1}\d{1,2})$/.test(val)){
                  this.airforce.change.set(val,'money','AppLDetails');
                }else {
                  this.$refs.moneyInput.currentValue = this.airforce.AppLDetails.money;
                };
                this.calcMoney();
            },
            selectChange(val){
                this.calcMoney();
            },
            Application(){
                if(this.$utils.is_S(this.airforce.AppLDetails.money)){
                    this.$vux.toast.text("请输入金额");
                    return;
                }
                if(this.$utils.is_S(this.airforce.AppLDetails.select_Select)){
                    this.$vux.toast.text("请选择期限");
                    return;
                }
                if(this.$utils.is_S(this.airforce.AppLDetails.name)){
                    this.$vux.toast.text("请输入姓名");
                    return;
                }
                if(this.$utils.is_S(this.airforce.AppLDetails.phone)){
                    this.$vux.toast.text("请输入手机号");
                    return;
                }
                if(!this.$utils.isPhone(this.airforce.AppLDetails.phone)){
                    this.$vux.toast.text("请输入正确的手机号");
                    return;
                }
                this.$vuz.loading.show({theme:"fff",text:"正在申请中，请稍等.."});
                try {
                    this.action({
                        moduleName:'pushLoan_post',
                        url:'/header/pushLoans',
                        method:"post",
                        data:{
                            amount:this.airforce.AppLDetails.money,
                            terms:this.airforce.AppLDetails.select_Select.value,
                            name:this.airforce.AppLDetails.name,
                            telephone:this.airforce.AppLDetails.phone,
                            total_interest:this.interest,
                            month_repayment:this.money,
                            p_id:this.$route.query.id,
                            promoter:this.$route.query.phone,
                        }
                    }).then(res=>{
                        this.$vuz.loading.hide();
                        this.$vux.toast.text(res.message);
                        if (res.code == 200) {
                            location.href = res.data.reg_url;
                        }
                    }).catch(err=>{
                        this.$vuz.loading.hide();
                        this.$vux.toast.text(err);
                    });
                }catch (e){
                    this.$vuz.loading.hide();
                    this.$vux.toast.text("参数错误");
                }
            }
        },
        mounted(){
            this.action({
                moduleName:'ApplicationDetails',
                goods:{
                    data:null
                },
            });
            this.action({
                moduleName:'ApplicationDetails',
                goods:{
                    data:{}
                },
            });
            // this.$vuz.loading.show({theme:"transparent"});
            try {
                this.action({
                    moduleName:'ApplicationDetails',
                    url:'/header/pushDetail',
                    method:"post",
                    data:{
                        id:this.$route.query.id
                    }
                }).then(res=> {
                    this.$vuz.loading.hide();
                    if (res.code != 200) {
                        this.$vux.toast.text(res.message);
                    }
                }).catch(err=>{
                    this.$vuz.loading.hide();
                    this.$vux.toast.text(err);
                })
            }catch (e){
                this.$vuz.loading.hide();
                this.$vux.toast.text("参数错误");
            }

        },
        computed:{
            list(){
                try {
                    const term = this.airforce.ApplicationDetails.data.term;
                    var termIndex = parseInt(term);
                    if(termIndex > 1){
                        const resd = [];
                        for(let i = 0 ; i < termIndex; i++){
                            resd.push({
                                name:i+1,
                                value:i+1
                            })
                        }
                        return resd;
                    }else {
                        return [{name:"1",value:"1"}]
                    }
                }catch (e){
                    return [];
                }
            },
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color";
    .ApplicationDetails{
        .flexbox{
            background-color: @theme-color;
            color: @cor_ffffff;
            text-align: center;
            font-size: 14px;
            padding-bottom: @paIndex * 2;
            padding-top: @paIndex;
        }
        .card{
            padding: 0 @maTop;
            .cardBox{
                background-color: @cor_ffffff;
                border-radius: 8px;
                position: relative;
                top: -(@paIndex + @maTop);
                padding: @maTop;
                overflow: hidden;
                color: @cor_a9a7ab;
                &/deep/ .input{
                    input{
                        color: @cor_000000;
                    }
                }
                .top{
                    .logo{
                        width: 60px;
                        height: 60px;
                    }
                    .title{
                        padding-left: @maTop;
                        .textNowrap;
                    }
                    border-bottom: 1px solid @cor_C8C8CD;
                    padding-bottom: @maTop;
                }
                .top-1{
                    text-align: center;
                    font-size: 12px;
                    padding: @maTop 0;
                    border-bottom: 1px solid @cor_C8C8CD;
                    .line{
                        background-color: @cor_C8C8CD;
                        height: 38px;
                        width: 1px !important;
                        min-width: auto;
                        flex: initial !important;
                    }
                    .title{
                        color: @cor_a9a7ab;
                        font-weight: bold;
                    }
                }
            }
        }
        &/deep/ .group{
            .vux-no-group-title{
                margin: 0;
                &:before{
                    border: none;
                }
            }
        }
        .group-content{
            padding-bottom: 200px;
        }
        .bottomBox{
            background-color: @cor_ffffff;
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            box-shadow: 0 0 2px #e5e5e5;
            &/deep/ .group{
                .vux-no-group-title {
                    &:after {
                        border: none;
                    }
                }
            }
            .msg{
                .line1;
                color: @cor_ff0000;
                font-size: 12px;
                padding: @maTop @paIndex;
            }
            .bottomBox-flexbox-box{
                padding: 0 @paIndex;
                padding-bottom: @maTop;
                &/deep/ .bottomBox-flexbox{
                    .login-x-button{
                        margin-top: 0 !important;
                    }
                }
            }
        }
    }
</style>