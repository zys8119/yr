<template>
    <div class="AntPush">
        <div class="message-tab">
            <tab :line-width=2 v-model="index">
                <tab-item :selected="index == 0" v-for="(item,index) in tabs" :key="`message-tab${index}`">{{item.title}}</tab-item>
            </tab>
        </div>
        <swiper ref="swiper" v-model="index" :aspect-ratio="1/2" :show-dots="false" class="message-swiper">
            <swiper-item :class="(item.list.length == 0)? 'notData iconfont' : ''" v-for="(item, index) in tabs" :key="`message-swiper${index}`">
                <div class="message-swiper-item" :id="`message-swiper-item${index}`">
                    <div v-if="item.type == 1" v-for="(listItem,listItemIndex) in item.list" :key="`message-swiper-item${index}${listItemIndex}`">
                        <checker @on-change="checkerChange" class="checker-select" v-model="tabs[0].select" radio-required default-item-class="select-item" selected-item-class="select-item-selected">
                            <checker-item :class="`select-item${checkerItemIndex}`" :value="item2.value" v-for="item2,checkerItemIndex in tabs[0].checkerList" :key="item2.value"><span class="iconSelect"></span>{{item2.name}}</checker-item>
                        </checker>
                        <sticky

                                ref="sticky"
                                :scroll-box="`message-swiper-item${index}`"
                                :offset="0"
                                :check-sticky-support="false"
                                :disabled="disabled"
                                >
                            <img @click="go(banner,true)" class="img" :src="banner.img">
                        </sticky>
                        <z-pull-scroller :ref="`AntPush_ZPullScroller`" @change="change">
                            <ant-push-card @click.native="go(AntPushItem)" :data="AntPushItem" v-for="AntPushItem,AntPushItemindex in AntPushList" :key="AntPushItemindex"></ant-push-card>
                        </z-pull-scroller>
                        <div class="Agent" @click="Agent">一键代理</div>
                    </div>
                    <div v-if="item.type == 2">
                        <div class="CustomerBox" v-for="CustomerListItem in CustomerList">
                            <p>产品：{{CustomerListItem.title}}</p>
                            <p>申请人：{{CustomerListItem.name}}</p>
                            <p>联系方式：{{CustomerListItem.telephone}}</p>
                            <p>申请时间：{{CustomerListItem.create_at}}</p>
                            <p>结算时间：{{CustomerListItem.update_at}}</p>
                            <p>结算金额：{{CustomerListItem.amount}}</p>
                        </div>
                    </div>
                    <div v-if="item.type == 4">
                        <iframe class="FQASrc" v-if="FQASrc" :src="FQASrc.url"></iframe>
                        <!--<divider>快捷登录</divider>-->
                        <!--<group>-->
                            <!--<x-input title="手机号码" placeholder="请输入手机号码"></x-input>-->
                            <!--<z-input @click="getCode" class="z-input" title="验证码" placeholder="填写短信验证码"></z-input>-->
                        <!--</group>-->
                        <!--<p class="alert">请输入您曾在平台上预留的手机号码，获取验证码后即可登录</p>-->
                        <!--<box gap="15px">-->
                            <!--<x-button class="login-x-button" @click.native="login">登录</x-button>-->
                        <!--</box>-->
                    </div>
                    <div class="buttom"></div>
                </div>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import { TransferDom, Popup,  Tab, TabItem, Swiper, SwiperItem, Flexbox, FlexboxItem, Panel, Checker, CheckerItem, Sticky, Divider, Group, XInput, XButton, Box } from 'vux'
    import { AntPushCard, ZInput, ZPullScroller } from '@/components'
    export default {
        name: "ant-push",
        directives: {
            TransferDom
        },
        components: {
            ZPullScroller,
            Popup, Tab, TabItem, Swiper, SwiperItem, Flexbox, FlexboxItem, Panel, Checker, CheckerItem, Sticky, AntPushCard, Divider, Group, XInput, ZInput, XButton, Box },
        data(){
            return {
                disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
                tabs:[
                    {
                        title:'佣金产品',
                        type:1,
                        list:[
                            {
                                src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                                fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                                title: '张三',
                                desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                            }
                        ],
                        select:'All',
                        checkerList:[
                            { value:'All',name:'全部'},
                        ]
                    },
                    {
                        title:'客户列表',
                        type:2,
                        list:[{}]
                    },
                    {
                        title:'英雄排行榜',
                        type:3,
                        list:[{}]
                    },
                    {
                        title:'常见问题',
                        type:4,
                        list:[{}]
                    }
                ],
                index:0,
                list:{},
                show:true,
                CustomerList:[]
            }
        },
        methods:{
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
            getCode(next){
                next({

                });
            },
            login(){

            },
            go(item,bool){
                if(bool){
                    if(!this.$utils.is_S(item.route)){
                        this.$router.push(item.route+"?id="+item.id);
                    }
                    if(!this.$utils.is_S(item.url)){
                        this.$router.push({hash:item.re_img,path:"/DocDetails?docSee="+item.url});
                    }
                    return;
                }
                this.action({
                   moduleName:"AntPushSelect",
                    goods:null,
                });
                this.action({
                   moduleName:"AntPushSelect",
                    goods:item,
                });
                if(item.route && item.route.length > 0){
                    this.$router.push(item.route+"?id="+item.id);
                    return;
                }
                this.$router.push({hash:item.re_img,path:"/AntPushDetails?docSee="+item.url+"&docSeeTitle="+item.title+"&docSeeId="+item.id});
            },
            change(_vm){
                if(_vm.loadStart){
                    this.getDocList({p_id:this.airforce.AntPush_tabItem.select});
                    _vm.reset({top:0});
                }
            },
            checkerChange(value){
              this.docSortTabClick({p_id:value});
            },
            docSortTabClick(item){
                if(item == "All"){
                    item = {
                        p_id:item,
                    }
                }
                this.action({
                    moduleName:'AntPush_tabItem',
                    goods:_.set({select:item.p_id},item.p_id,[]),
                });
                this.$refs.AntPush_ZPullScroller[0].loadEnd = false;
                this.getDocList(item);
            },
            getRelationshipsList(cons = {},moduleName = "AntPush_List"){
                const  configs = {};
                for(let i in cons){
                    if(i != 'p_id' || cons[i] != "All"){
                        configs[i] = cons[i];
                    }
                }
                this.action({
                    moduleName:moduleName,
                    goods:null,
                });
                return this.action({
                    moduleName:moduleName,
                    url:'/header/push',
                    method:"post",
                    data:_.merge({
                        token:this.airforce.login_post.data.token,
                    },configs)
                })
            },
            getDocList(con){
                let config = _.merge({
                    page:1,
                    //默认每次20条
                    pagesize:20,
                },con);
                if(!this.airforce.AntPush_tabItem || !this.airforce.AntPush_tabItem[config.p_id+"config"]){
                    this.action({
                        moduleName:'AntPush_tabItem',
                        goods:_.set({},config.p_id+"config",config),
                    });
                }else {
                    config = _.merge(config,this.airforce.AntPush_tabItem[config.p_id+"config"]);
                }
                this.$refs.AntPush_ZPullScroller[0].loadStart = false;
                this.$refs.AntPush_ZPullScroller[0].load = true;
                this.getRelationshipsList(config).then(ress=>{
                    this.$refs.AntPush_ZPullScroller[0].load = false;
                    if(ress.code == 200){
                        if(this.airforce.AntPush_tabItem[config.p_id]){
                            this.action({
                                moduleName:'AntPush_tabItem',
                                goods:_.set({},config.p_id,this.airforce.AntPush_tabItem[config.p_id].concat(ress.data.data)),
                            });
                        }else {
                            this.action({
                                moduleName:'AntPush_tabItem',
                                goods:_.set({},config.p_id,ress.data.data),
                            });
                        }
                        this.action({
                            moduleName:'AntPush_tabItem',
                            goods:_.set({},config.p_id+"config.page",this.airforce.AntPush_tabItem[config.p_id+"config"].page + 1),
                        });
                        if(ress.data.count == this.airforce.AntPush_tabItem[config.p_id].length){
                            this.$refs.AntPush_ZPullScroller[0].loadEnd = true;
                            this.$refs.AntPush_ZPullScroller[0].loadStart = false;
                        }else{
                            this.$refs.AntPush_ZPullScroller[0].loadStart = true;
                            this.$refs.AntPush_ZPullScroller[0].loadEnd = false;
                        }
                    }else {
                        this.$refs.AntPush_ZPullScroller[0].loadEnd = false;
                        this.$refs.AntPush_ZPullScroller[0].loadStart = true;
                    };
                }).catch(err=>{
                    this.$refs.AntPush_ZPullScroller[0].load = false;
                    this.$refs.AntPush_ZPullScroller[0].loadEnd = false;
                    this.$refs.AntPush_ZPullScroller[0].loadStart = true;
                });
            },
            Agent(){
                this.$router.push({hash:"AntPushAll-"+this.AntPushAll.type,path:"/AntPushDetails?docSee="+this.AntPushAll.url+"&docSeeTitle="+this.AntPushAll.title+"&docSeeId="+this.AntPushAll.id});
            }
        },
        computed:{
            AntPushList(){
                try {
                    return this.airforce.AntPush_tabItem[this.airforce.AntPush_tabItem.select];
                }catch (e){}
                return [];
            },
            banner(){
                try {
                    if(this.airforce.configs_post.data){
                        return JSON.parse(JSON.stringify(_.find(this.airforce.configs_post.data,{type:'10'})));
                    }
                }catch (e){}
                return {img:"http://placeholder.qiniudn.com/375x80/e5e5e5/e5e5e5"};
            },
            AntPushAll(){
                try {
                    if(this.airforce.configs_post.data){
                        return JSON.parse(JSON.stringify(_.find(this.airforce.configs_post.data,{type:'10',id:"31"})));
                    }
                }catch (e){}
                return {};
            },
            FQASrc(){
                try {
                    if(this.airforce.configs_post.data){
                        return JSON.parse(JSON.stringify(_.find(this.airforce.configs_post.data,{type:'10',id:"32"})));
                    }
                }catch (e){}
            }
        },
        mounted(){
            this.$vuz.loading.show({theme:"transparent"});
            this.action({
                moduleName:"AntPush_checkerList",
                url:"/header/pushcate",
                method:"post",
                data:{
                    token:this.airforce.login_post.data.token
                }
            }).then(res=>{
                this.$vuz.loading.hide();
                if(res.code == 200){
                    this.tabs[0].checkerList = this.tabs[0].checkerList.concat(res.data.map(e=>{
                        e.value = e.id;
                        return e;
                    }))
                }
            }).catch(err=>{
                this.$vuz.loading.hide();
            });
            this.docSortTabClick("All");
            this.action({
                moduleName:"AntPush_pushuserList",
                url:"/header/pushuser",
                method:"post",
                data:{
                    token:this.airforce.login_post.data.token
                }
            }).then(res=>{
                if(res.code == 200){
                    this.CustomerList = res.data;
                }
            })
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/color.less";
    .AntPush{
        .img{
            width: 100%;
            height: 80px;
        }
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
                    position: relative;
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
                    .checker-select{
                        padding: 0 @paIndex;
                        text-align: justify;
                        .select-item{
                            background-color: @cor_C8C8CD;
                            border-radius: 5px;
                            font-size: 12px;
                            //padding: 0 @maTop/2;
                            line-height: 24px;
                            color: @cor_a9a7ab * 0.82;
                            width: (100 - 1.333333 * 4)/5%;
                            margin-right: 1.333333%;
                            margin-bottom: @maTop/2;
                            text-align: center;
                            .textNowrap();
                            &.select-item4,
                            &.select-item9
                            {
                                margin-right: 0;
                            }
                            &.select-item-selected{
                                background-color: @theme-color;
                                color: @cor_ffffff;
                            }
                        }
                    }
                    .Agent{
                        position: fixed;
                        left: 25%;
                        bottom:120px;
                        z-index: 10000;
                        background-color:@theme-color;
                        background-color: rgba(27,130,230,0.8);
                        color: @cor_ffffff;
                        font-size: 12px;
                        @w:60px;
                        width: @w;
                        height: @w;
                        border-radius: @w;
                        line-height: @w;
                        transform: translateX(@w);
                        .textNowrap;
                        text-align: center;
                        &:active{
                            background-color: @theme-color;
                        }
                    }
                    .z-input{
                        .line1();
                    }
                    .alert{
                        padding: @maTop @paIndex;
                        font-size: 14px;
                        color: @cor_a9a7ab;
                    }
                }
                .notData{
                    position: relative;
                    &:before{
                        content: '\e65b';
                        position: absolute;
                        left: 0;
                        top: 50px;
                        width: 100%;
                        font-size: 80px;
                        text-align: center;
                        color: @cor_d7e8f4;
                    }
                    &:after{
                        content: '暂无数据';
                        position: absolute;
                        left: 0;
                        top: 50px + 120px;
                        width: 100%;
                        font-size: 14px;
                        text-align: center;
                        color: @cor_91c8f2;
                    }
                }
            }
        }
        .CustomerBox{
            background-color: @cor_ffffff;
            border-bottom: 1px solid @cor_C8C8CD;
            padding: @maTop @paIndex;
            p{
                font-size: 12px;
            }
        }
        .FQASrc{
            position: absolute;
            width: 100%;
            height: 100%;
            border: none;
            .media-max-height-init(@h:(@header_hright + 54px));
        }
    }
</style>