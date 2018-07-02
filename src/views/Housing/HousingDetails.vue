<template>
    <div class="HousingDetails">
        <swiper :list="imgs" :show-desc-mask="false"></swiper>
        <div class="HousingDetailsCard1">
            <h1 class="title">{{getData.title}}</h1>
            <div class="money">{{getData.pice}}<span> 元/月</span></div>
            <group class="Card1-group">
                <cell title="付款方式" :value="getData.payinfo | payinfo" class="Card1-cell">
                    <div slot="icon" class="iconfont">&#xe653;</div>
                </cell>
            </group>
        </div>
        <div class="HousingDetailsCard2">
            <card :header="{title:'基本信息'}">
                <div slot="content" class="card-content">
                    <flexbox :gutter="0" wrap="wrap">
                        <flexbox-item :span="1/2"><span class="textTitle">户型</span>{{getData.room | RHW}}室{{getData.hall | RHW}}厅{{getData.wc | RHW}}卫</flexbox-item>
                        <flexbox-item :span="1/2"><span class="textTitle">公寓</span>{{getData.projname}}</flexbox-item>
                        <flexbox-item :span="1/2"><span class="textTitle">面积</span>{{getData.area}}㎡</flexbox-item>
                        <flexbox-item :span="1/2"><span class="textTitle">朝向</span>{{getData.foward}}</flexbox-item>
                        <flexbox-item :span="1/2"><span class="textTitle">房间</span>{{getData.room_number}}号</flexbox-item>
                        <flexbox-item :span="1/2"><span class="textTitle">方式</span>{{getData.mode | HousingMode}}</flexbox-item>
                        <flexbox-item :span="11/12"><span class="textTitle">位置</span>{{getData | location}}</flexbox-item>
                    </flexbox>
                </div>
            </card>
        </div>
        <div class="HousingDetailsCard2">
            <card :header="{title:'房屋描述'}">
                <div slot="content" class="card-content">{{(getData.description && getData.description.length > 0) ? getData.description : '房东很懒'}}</div>
            </card>
        </div>
        <div class="HousingDetailsCard2">
            <card :header="{title:'房屋配置'}">
                <div slot="content" class="card-content">
                    <flexbox :gutter="0" wrap="wrap">
                        <flexbox-item :span="1/6" v-for="(item,index) in configs" :key="`configs${index}`" :class="`configs${index}`">
                            <div :class="{iconfont:true,select:item.select}" v-html="item.icon"></div>
                            <div :class="{text:true,select:item.bool}">{{item.text}}</div>
                        </flexbox-item>
                    </flexbox>
                </div>
            </card>
        </div>
        <div class="footerBtns" v-if="type == 0 && query.o_id != o_id">
            <flexbox class="footerBtns-flexbox">
                <flexbox-item class="left" @click.native="tel">电话预约</flexbox-item>
                <flexbox-item class="right" @click.native="yuyue">在线预约</flexbox-item>
            </flexbox>
        </div>
        <div class="footerBtns" v-if="type == 1">
            <flexbox class="footerBtns-flexbox">
                <flexbox-item class="left type1">不入驻</flexbox-item>
                <flexbox-item class="right" @click.native="go('/ApplyEntering')">申请入驻</flexbox-item>
            </flexbox>
        </div>
        <release-box v-model="releaseBoxShow" type="custom">
            <h2>预约信息表</h2>
            <group>
                <cell title="时间：" @click.native="selectTime" :class="{selectTime:(airforce.HousingDetails_yy && airforce.HousingDetails_yy.registerTime)}"  :value="(airforce.HousingDetails_yy && airforce.HousingDetails_yy.registerTime)? airforce.HousingDetails_yy.registerTime :'请选择时间'"></cell>
                <x-textarea :height="40" title="备注：" placeholder="想对房东说..." :value="(airforce.HousingDetails_yy) ? airforce.HousingDetails_yy.remarks : ''" @on-change="airforce.change.set($event,'remarks','HousingDetails_yy')"></x-textarea>
            </group>
            <div class="footerBtns" v-if="type == 0 && query.o_id != o_id">
                <flexbox class="footerBtns-flexbox">
                    <flexbox-item class="left" @click.native="close">取消</flexbox-item>
                    <flexbox-item class="right" @click.native="onConfirm">确定</flexbox-item>
                </flexbox>
            </div>
        </release-box>
        <release-box v-model="bid" type="custom" class="bidpop popup">
            <h2>竞价</h2>
            <div class="popcontant">
                <p>
                    <span>当前价格为：</span>
                    
                    <span>元/月</span>
                    <span>1480</span>
                </p>
                <p>
                    <span>你出的价为：</span>
                    
                    <span>元/月</span>
                    <span>0</span>
                </p>
                <hr>
                <p>
                    <span>起拍价为：</span>
                    
                    <span>元/月</span>
                    <span>1200</span>
                </p>
                <p>
                    <span>你至少需加：</span>
                    
                    <span>元/月</span>
                    <span>290</span>
                </p>
                <p><span>加价：</span><span class="explain">首次起拍必须高于当前价格</span></p>
                <div class="jjdata">
                    <p>
                        <span>元/月</span>
                        <input type="text" placeholder="请输入金额">
                    </p>
                    <div class="btn">
                        <button @click.prevent="jjcancel">取消</button>
                        <button @click.prevent="jjconfirm">出价</button>
                    </div>
                </div>
            </div>
        </release-box>
        <release-box type="custom" class="disposablepop popup" v-model="disposable">
            <h2>一口价</h2>
            <div class="popcontant">
                <p>
                    <span>当前价格为：</span>
                    
                    <span>元/月</span>
                    <span>1480</span>
                </p>
                <p>
                    <span>一口价为：</span>
                    
                    <span>元/月</span>
                    <span>2200</span>
                </p>
                <hr>
                <div class="dosposable-content">
                    <p>是否选用当前价格购买房源</p>
                    <div class="btn">
                        <button @click.prevent="disposcancel">取消</button>
                        <button @click.prevent="disposconfirm">一口价</button>
                    </div>
                </div>
            </div>
        </release-box>
    </div>
</template>

<script>
    import { Swiper, Group, Cell, Card, Flexbox, FlexboxItem, Divider, XAddress, XInput, XTextarea } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    import { HousingConfigs } from  "@/data/index.json"
    import { ReleaseBox, AreaSelect } from  "@/components"
    export default {
        name: "housing-details",
        components:{ Swiper, Group, Cell, Card, Flexbox, FlexboxItem, Divider, XAddress, ReleaseBox, XInput, XTextarea, AreaSelect },
        data(){
            return {
                type:0,
                releaseBoxShow:false,
                bid:false,//控制竞价弹窗的显示
                disposable:true,//控制一口价的弹窗显示
            }
        },
        methods:{
            ...mapActions(['action']),
            jjcancel(){//竞价取消按钮的方法
                this.bid=false;
            },
            jjconfirm(){//竞价确定按钮的方法

            },
            disposcancel(){//一口价取消按钮的方法
                this.disposable=false;
            },
            disposconfirm(){//一口价确定按钮的方法

            },
            go(link){
                this.$router.push(link);
            },
            tel(){
                this.$vux.confirm.show({
                    title:"温馨提示",
                    content:`确定拨打【${this.getData.hs_phone}】吗？`,
                    onConfirm:()=>{
                        location.href = "tel:"+this.getData.hs_phone;
                    }
                });
            },
            yuyue(){
                this.releaseBoxShow = true;
            },
            selectTime(){
                let registerTime = null;
                try {
                    registerTime =this.airforce.HousingDetails_yy.registerTime;
                }catch (e){}
                this.$vux.datetime.show({
                    format:'YYYY-MM-DD HH:mm',
                    value:registerTime,
                    minYear:new Date().getFullYear(),
                    maxYear:new Date().getFullYear(),
                    cancelText:"取消",
                    confirmText:"确定",
                    onConfirm:(e) =>{
                        this.action({
                            moduleName:'HousingDetails_yy',
                            goods:{
                                registerTime:e,
                            }
                        });
                    }
                });
            },
            close(){
                this.releaseBoxShow = false;
            },
            onConfirm(){
                if(this.$utils.is_S(this.airforce.HousingDetails_yy)
                || this.$utils.is_S(this.airforce.HousingDetails_yy.registerTime)
                ){
                    this.$vux.toast.text("请选择预约时间");
                    return;
                }
                this.action({
                    moduleName:'HousingDetails_yy_post',
                    url:'/Adminapi/Bespeaks/create',
                    method:'post',
                    data:{
                        token:this.airforce.login_post.data.token,
                        r_id:this.getData.id,
                        remark:this.airforce.HousingDetails_yy.remarks,
                        room_time:this.airforce.HousingDetails_yy.registerTime,
                    }
                }).then(res=>{
                    if(res.code != 200 || res.code != "200"){
                        this.$vux.toast.text(res.message);
                        return;
                    };
                    this.close();
                }).catch(err=>{
                    this.$vux.toast.text(err);
                });
            }
        },
        computed:{
            ...mapGetters(['airforce']),
            getData(){
                try {
                    if(this.airforce.HousingDetailsSelect){
                        return this.airforce.HousingDetailsSelect;
                    };
                    if(this.airforce.HousingDetails_get && this.airforce.HousingDetails_get.code == 200){
                        return this.airforce.HousingDetails_get.data;
                    };
                }catch (e){}
                return {};
            },
            configs(){
                try {
                    const matchInit = JSON.parse(this.getData.match);
                    return HousingConfigs.map(e=>{
                        if(matchInit.indexOf(e.value) > -1){
                            e.select = true;
                        }
                        return e;
                    });
                }catch(e){}
                return HousingConfigs;
            },
            imgs(){
                try {
                    if(!this.getData.imgList){
                        this.getData.imgList = this.getData.img;
                    }
                    if(this.getData.imgList && typeof this.getData.imgList != 'string'){
                        const list = [];
                        for(let i in this.getData.imgList){
                            list.push({img:this.getData.imgList[i]});
                        }
                        return list;
                    }
                }catch (e){}
                return [{img: 'http://iph.href.lu/1000x500?text=%E6%88%BF%E4%B8%9C%E5%BE%88%E6%87%92',}];
            },
            query(){
                return this.$router.currentRoute.query;
            },
            o_id(){
                try {
                    return this.airforce.login_post.data.id;
                }catch (e){}
                return null;
            },
            name(){
                if(this.airforce.HousingDetails_yy &&
                    this.airforce.HousingDetails_yy.name){
                    return this.airforce.HousingDetails_yy.name;
                }
                try {
                    return this.airforce.login_post.data.name;
                }catch (e){}
                return '';
            },
            phone(){
                if(this.airforce.HousingDetails_yy &&
                    this.airforce.HousingDetails_yy.phone){
                    return this.airforce.HousingDetails_yy.phone;
                }
                try {
                    return this.airforce.login_post.data.phone;
                }catch (e){}
                return '';
            }
        },
        mounted(){
            if(!this.airforce.HousingDetailsSelect){
                this.action({
                    moduleName:'HousingDetails_get',
                    url:'/adminapi/Housesource/detail',
                    method:'post',
                    data:{
                        token:this.airforce.login_post.data.token,
                        id:this.query.id,
                    }
                });
            }
        },
        watch:{
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color.less";
.HousingDetails{
    .HousingDetailsCard1{
        background-color: @cor_ffffff;
        padding:@paIndex;
        .title{
            font-size: 16px;
            .textNowrap();
        }
        .money{
            font-size: 18px;
            font-weight: initial;
            color: @cor_ff0000;
            span{
                font-size: 12px;
            }
        }
        &/deep/ .Card1-group{
            .vux-no-group-title{
                margin-top: 0;
                &:before{
                    border: none;
                }
                &:after{
                    border: none;
                }
                .Card1-cell{
                    padding: 0;
                    line-height: 40px;
                    .iconfont{
                        margin-right: 5px;
                        font-size: 18px;
                    }
                }
            }
        }
    }
    .HousingDetailsCard2{
        margin-top: @maTop;
        .card-content{
            padding: @paIndex;
            line-height: 30px;
            .textTitle{
                color: @cor_a9a7ab;
                margin-right: 5px;
                .textNowrap();
            }
            .iconfont{
                text-align: center;
                font-size: 24px;
                color: @cor_D9D9D9;
                &.select{
                    color:@cor_1bd182;
                }
            }
            .text{
                text-align: center;
                color: @cor_a9a7ab;
                font-size: 12px;
                line-height: initial;
                .textNowrap();
                &.select{
                    color: @cor_1bd182;
                }
                margin-bottom: @maTop;
            }
            .configs1{
                .iconfont{
                    font-size: 35px;
                }
            }
        }
    }
    .footerBtns{
        @index:50px;
        height:  @index + @maTop;
        .footerBtns-flexbox{
            border-top: 1px solid @theme-color;
            background-color: @cor_ffffff;
            position: fixed;
            left: 0;
            bottom: 0;
            text-align: center;
            line-height:  @index;
            color: @theme-color;
            .left{
                &.type1{
                    color: @cor_ff0000;
                }
                &:active{
                    background-color: @cor_D9D9D9;
                }
            }
            .right{
                background-color: @theme-color;
                color: @cor_ffffff;
                margin: 0 !important;
                &:active{
                    background-color: @theme-color*0.9;
                }
            }
        }
    }
    &/deep/ .selectTime{
        .weui-cell__ft{
            color: @cor_000000;
        }
    }
    .popup,.bidpop{
        .popcontant{
            box-sizing: border-box;
            padding: 10px 15px;
            p{
                overflow: hidden;
                color: #a9a9ab;
                line-height: 30px;
                span:nth-child(1){
                    float: left;
                }
                span:nth-child(2){
                    float: right;
                }
                span:nth-child(3){
                    float: right;
                    color: #e91859;
                    padding-right: 3px;
                }
                .explain{
                    color: #e91859;
                }
            }
            hr{
                height: 1px;
                background: #1784d9;
                margin: 25px 0;
            }
            .dosposable-content{
                p{
                    line-height: 105px;
                    text-align: center;
                    color: #e91859;
                }
                 .btn{
                    display: flex;
                    justify-content: space-around;
                    margin-top: 20px;
                    button,button:focus{
                        border: none;
                        outline: none;
                        //background: #fff;
                        padding: 5px 15px;
                        font-size: 16px;
                        border-radius: 13px;
                    }
                    button:nth-child(2){
                        background: #2384c9;
                        color: #fff;
                    }
                }
            }
            .jjdata{
                p{  
                    line-height: 40px;
                    input,input:focus{
                        float: right;
                        line-height: 40px;
                        border:none;
                        outline:none;
                        font-size:16px;
                        text-align: right;
                        margin-right: 3px;
                    }
                    span{
                        float:right;
                    }
                }
                .btn{
                    display: flex;
                    justify-content: space-around;
                    margin-top: 20px;
                    button,button:focus{
                        border: none;
                        outline: none;
                        //background: #fff;
                        padding: 5px 15px;
                        font-size: 16px;
                        border-radius: 13px;
                    }
                    button:nth-child(2){
                        background: #2384c9;
                        color: #fff;
                    }
                }
            }
        }
    }
}
</style>