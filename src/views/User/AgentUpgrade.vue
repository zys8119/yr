<template>
    <div class="message">
        <div class="message-tab">
            <tab :line-width=2 v-model="index">
                <tab-item :selected="index == 0" v-for="(item,index) in tabs" :key="`message-tab${index}`">{{item.title}}</tab-item>
            </tab>
        </div>
        <swiper ref="swiper" v-model="index" :aspect-ratio="1/2" :show-dots="false" class="message-swiper">
            <swiper-item :class="(item.list.length == 0)? 'notData iconfont' : ''" v-for="(item, index) in tabs" :key="`message-swiper${index}`">
                <div class="message-swiper-item">
                    <div class="iframe">
                        <iframe v-for="(item1, index1) in item.list" :src="item1.src"></iframe>
                    </div>
                    <div class="buttom"></div>
                </div>
            </swiper-item>
        </swiper>
        <div class="messageBottom">
            <checker class="checker-select" v-model="select" radio-required default-item-class="select-item" selected-item-class="select-item-selected">
                <checker-item :value="item.value" v-for="item in list" :key="item.value"><span class="iconSelect"></span>{{item.name}}</checker-item>
            </checker>
            <flexbox class="messageBottom-flexbox">
                <flexbox-item class="left">价格：{{money}}元</flexbox-item>
                <flexbox-item class="content" :span="5/13">
                    <div class="iconfont"><span>&#xe681;</span>我已阅读并同意</div>
                    <p>《金融协议》</p>
                </flexbox-item>
                <flexbox-item class="right" :span="4/12" @click.native="buy">立即购买</flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
    import { Tab, TabItem, Swiper, SwiperItem, Flexbox, FlexboxItem, Checker, CheckerItem } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: "agent-upgrade",
        components: { Tab, TabItem, Swiper, SwiperItem, Flexbox, FlexboxItem, Checker, CheckerItem },
        data(){
            return {
                tabs:[
                    {
                        title:'产品介绍',
                        list:[]
                    },
                    {
                        title:'购买须知',
                        list:[]
                    },
                    {
                        title:'常见问题',
                        list:[]
                    }
                ],
                index: 0,
                select:'3',
                list:[
                    { value:'1',name:'渠道经理',money:'128'},
                    { value:'2',name:'团队经理',money:'328'},
                    { value:'3',name:'城市经理',money:'598'},
                ]
            }
        },
        methods:{
            ...mapActions(['action']),
            seeMessage(item){
                switch (item.type){
                    case '2':
                        this.$router.push('/BookingDetails')
                        break;
                    default:
                        this.$router.push('/MessageDetails?id='+item.id)
                        break;
                }
            },
            getList(cons={}){
                let conInit = {
                    token:this.airforce.login_post.data.token,
                    status:1,
                };
                this.action({
                    moduleName:'MessageList_post',
                    url:'/adminapi/member/record',
                    method:"post",
                    data:_.merge(conInit,cons)
                }).then(res=>{
                    try {
                        this.tabs[conInit.status-1].list = res.data.data
                    }catch (e){}
                })
            },
            init(){
                try {
                    var docData = JSON.parse(_.find(this.airforce.configs_post.data,{id:this.$route.query.id}).url);
                    if(docData.introduce){
                        if(/^http/.test(docData.introduce)){
                            this.tabs[0].list.push({src:docData.introduce})
                        }else {
                            this.tabs[0].list.push({src:$$docWww + docData.introduce})
                        }
                    }
                    if(docData.Notes){
                        if(/^http/.test(docData.Notes)){
                            this.tabs[1].list.push({src:docData.Notes})
                        }else {
                            this.tabs[1].list.push({src:$$docWww + docData.Notes})
                        }
                    }
                    if(docData.problem){
                        if(/^http/.test(docData.problem)){
                            this.tabs[2].list.push({src:docData.problem})
                        }else {
                            this.tabs[2].list.push({src:$$docWww + docData.problem})
                        };
                    }
                }catch (e){}
            },
            buy(){
                this.$vux.loading.show("提交中..");
                try {
                    this.action({
                        moduleName:"buy_post",
                        method:'post',
                        url:"/pay/createOrder",
                        data:{
                            token:this.airforce.login_post.data.token,
                            type:this.select,
                        }
                    }).then(res=>{
                        if(res.code != 200){
                            this.$vux.toast.text(res.message);
                            return;
                        }
                        this.$vux.toast.text("下单成功，正在跳转支付");
                        this.plus.then(plus=>{
                            plus.runtime.openURL( res.data.url, ()=>{
                                this.$vux.toast.text("支付失败！")
                            });
                        });
                        // location.href = res.data.url;
                    }).catch(err=>{
                        this.$vux.toast.text(err);
                        this.$vux.loading.hide();
                    });
                }catch (e){
                    this.$vux.loading.hide();
                    this.$vux.toast.text("订单生产错误，请核对信息！");
                }
            }
        },
        computed:{
            ...mapGetters(['airforce']),
            money(){
                try {
                    return _.find(this.list,{value:this.select}).money;
                }catch (e){
                    return 0.00
                }
            },
            configs_post_data(){
                try {
                    return this.airforce.configs_post.data;
                }catch (e){}
            }
        },
        mounted(){
            if(this.configs_post_data){
                this.init();
            };
        },
        watch:{
            configs_post_data(){
                this.init();
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/color.less";
    .message{
        @index:44px;
        &/deep/ .message-tab{
            min-height: @index;
            margin-bottom: @maTop;
            .vux-tab-wrap{
                position: fixed;
                left: 0;
                top:@header_hright;
                width: 100%;
                .vux-tab{
                    .vux-tab-item{
                        &.vux-tab-selected{
                            color: @theme-color;
                            border-bottom: 3px solid @theme-color;
                        }
                    }
                    .vux-tab-ink-bar{
                        background-color: @theme-color;
                    }
                }
            }
        }
        &/deep/ .message-swiper{
            .vux-swiper{
                position: fixed;
                height: auto !important;
                min-height: 100% !important;
                width: 100%;
                overflow-x: hidden;
                .message-swiper-item{
                    overflow-x: hidden;
                    height: 100% !important;
                    .buttom{
                        height: @index + @header_hright;
                        margin-top: @maTop;
                    }
                    .message-swiper-item-flexbox{
                        padding: @maTop @paIndex;
                        background-color: @cor_ffffff;
                        margin-bottom:2px;
                        &:active{
                            background-color: @cor_e5e5e5;
                        }
                        .left{
                            .messageType1{
                                background-color: @cor_a9a7ab;
                                color: @cor_ffffff;
                                width: 50px;
                                height: 50px;
                                line-height: 50px;
                                border-radius: 100%;
                                display: inline-block;
                                text-align: center;
                            }
                            .messageType2{
                                .messageType1;
                                background-color: @cor_c31bd2;
                            }
                            .messageType3{
                                .messageType1;
                                background-color: @cor_1bd182;
                            }
                            .messageType4{
                                .messageType1;
                                background-color: @theme-color;
                            }
                        }
                        .right{
                            .right-top{
                                overflow: hidden;
                                line-height: 30px;
                                padding-right: @paIndex*2;
                                h2{
                                    font-size: 14px;
                                    font-weight: initial;
                                    color: @cor_a9a7ab;
                                    float: left;
                                }
                                span{
                                    font-size: 12px;
                                    float: right;
                                    color: @cor_a9a7ab;
                                }
                            }
                            .right-buttom{
                                overflow: hidden;
                                .textNowrap();
                                h2{
                                    font-size: 14px;
                                    .textNowrap();
                                }
                            }
                        }
                    }
                    .message-swiper-item-card{
                        background-color: @cor_ffffff;
                        padding: @maTop @paIndex;
                        .content{
                            .textNowrapIndex();
                            max-height: 50px;
                        }
                        .left{
                            *{
                                display: inline-block;
                                font-size: 12px;
                                color: @cor_C8C8CD;
                            }
                            img{
                                position: relative;
                                top: 2px;
                            }
                        }
                        .right{
                            font-size: 12px;
                            text-align: right;
                            color: @cor_C8C8CD;
                        }
                    }
                }
                .notData{
                    position: relative;
                    &:before{
                        content: '\e62a';
                        position: absolute;
                        left: 0;
                        top: 50px;
                        width: 100%;
                        font-size: 80px;
                        text-align: center;
                        color: @cor_d7e8f4;
                    }
                    &:after{
                        content: '暂无消息';
                        position: absolute;
                        left: 0;
                        top: 50px + 100px;
                        width: 100%;
                        font-size: 14px;
                        text-align: center;
                        color: @cor_91c8f2;
                    }
                }
            }
        }
        .iframe{
            border: none;
            width: 100%;
            /*height: 65%;*/
            overflow-x: hidden;
            -webkit-user-select: none;
            -webkit-overflow-scrolling: touch;
            user-select: none;
            -webkit-user-drag: none;
            -webkit-user-drag: none;
            /*@media (min-height: 570px) {*/
                /*height: 70%;*/
            /*}*/
            /*@media (min-height: 670px) {*/
                /*height: 73%;*/
            /*}*/
            /*@media (min-height: 740px) {*/
                /*height: 75.5%;*/
            /*}*/
            .media-max-height-init(220);
            iframe{
                width: 100%;
                height: 100%;
                border: none;
            }
        }
        .messageBottom{
            position: fixed;
            left: 0;
            bottom: 0;
            background-color: @cor_ececec;
            width: 100%;
            overflow: hidden;
            .checker-select{
                text-align: center;
                margin-top: @maTop;
                padding: 0 @paIndex;
                margin-bottom: @maTop;
                .select-item{
                    width: 30%;
                    background-color: @theme-color;
                    color: @cor_ffffff;
                    border-radius: 5px;
                    @index:30px;
                    line-height: @index;
                    text-align: center;
                    margin-right: 5%;
                    font-size: 12px;
                    @s:.2s;
                    &:last-child{
                        margin: 0;
                    }
                    span{
                        width: @index/2 - 2px;
                        height: @index/2 - 2px;
                        border-radius: @index/2 - 2px;
                        border:2px solid @cor_ffffff;
                        display: inline-block;
                        margin-right: 5px;
                        position: relative;
                        top: 4px;
                        transition: width @s, height @s, border @s;
                        transition-timing-function:inherit;
                    }
                    &.select-item-selected{
                        background-color: @cor_ff0000;
                        span{
                            position: relative;
                            &:before{
                                transition: width @s, height @s, border @s;
                                transition-timing-function:inherit;
                                content: '';
                                position: absolute;
                                background-color: @cor_ffffff;
                                @index1:10px;
                                width: @index1;
                                height: @index1;
                                border-radius:@index1;
                                left: (@index/2 - @index1) / 2;
                                top: 2px;
                            }
                            &.iconSelect{
                                width: @index/2;
                                height: @index/2;
                                border-radius: @index/2;
                            }
                        }
                    }
                }
            }
            .messageBottom-flexbox{
                padding: 0 @maTop;
                font-size: 14px;
                .content{
                    height: 50px;
                    text-align: center;
                    font-size: 12px;
                    .iconfont{
                        span{
                            color: @cor_ff0000;
                            font-size: 30px;
                            float: left;
                        }
                    }
                    p{
                        color: @theme-color;
                    }
                }
                .right{
                    background-color: @theme-color;
                    height: 50px;
                    line-height: 50px;
                    color: @cor_ffffff;
                    text-align: center;
                }
            }
        }
    }
</style>