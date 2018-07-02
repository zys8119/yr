<template>
    <div class="message">
        <div class="message-tab">
            <tab :line-width=2 v-model="index">
                <tab-item :selected="index == 0" v-for="(item,index) in tabs" :key="`message-tab${index}`">{{item.title}}</tab-item>
            </tab>
        </div>
        <swiper ref="swiper" v-model="index" :aspect-ratio="1/2" :show-dots="false" class="message-swiper">
            <swiper-item :class="(item.list.length == 0)? 'notData iconfont' : ''" v-for="(item, itemIndex) in tabs" :key="`message-swiper${itemIndex}`">
                <div class="message-swiper-item">
                    <z-pull-scroller :ref="'ZPullScroller'+itemIndex" :height="height" @change="change">
                        <div @click="go(listItem)" class="message-swiper-item-card" v-for="(listItem,listItemIndex) in list" :key="`message-swiper-item${itemIndex}${listItemIndex}`">
                            <div  v-if="index == 0">
                                <p class="content">{{listItem.post_title}}</p>
                                <div class="card-bottom">
                                    <flexbox>
                                        <flexbox-item class="left">
                                            <span class="iconfont">&#xe67d; {{listItem.post_hits}}</span>

                                        </flexbox-item>
                                        <flexbox-item class="right">{{listItem.post_date}}</flexbox-item>
                                    </flexbox>
                                </div>
                            </div>
                            <div v-else>
                                <p class="content">{{listItem.content}}</p>
                                <div class="card-bottom">
                                    <flexbox>
                                        <flexbox-item class="left">
                                            <span class="iconfont">&#xe67d; </span>
                                            <span v-if="listItem.status == '1'" class="notMessage">未读</span>
                                            <span v-else>已读</span>
                                            <span>{{listItem.post_hits}}</span>
                                        </flexbox-item>
                                        <flexbox-item class="right">{{listItem.create_at}}</flexbox-item>
                                    </flexbox>
                                </div>
                            </div>
                        </div>
                    </z-pull-scroller>

                    <div class="buttom"></div>
                </div>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import { Tab, TabItem, Swiper, SwiperItem, Flexbox, FlexboxItem } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    import { ZPullScroller } from '@/components'
    export default {
        name: "message",
        components: { Tab, TabItem, Swiper, SwiperItem, Flexbox, FlexboxItem, ZPullScroller },
        data(){
            return {
                Win_innerHeight:window.innerHeight,
                tabs:[
                    {
                        title:'公告',
                        list:[{}]
                    },
                    {
                        title:'私信',
                        list:[{}]
                    }
                ],
                index: 0,
                vuegConfig:{
                    forwardAnim:"fadeInDown",
                }
            }
        },
        methods:{
            ...mapActions(['action']),
            go(item){
                if(this.index == 1){
                    this.$router.push("/MessageDetails?id="+item.id);
                    return;
                }
                if(item.route && item.route.length > 0){
                    this.$router.push(item.route+"?id="+item.id);
                    return;
                }
                if(!item.title){
                    item.title = item.post_title;
                }
                this.$router.push("/DocDetails?docSee="+item.url+"&docSeeTitle="+item.title);
            },
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
            docSortTabClick(item){
                const ZPullScroller = this.$refs['ZPullScroller'+this.index][0];
                this.action({
                    moduleName:'Message_tabItem',
                    goods:_.set({select:item.term_id},item.term_id,[]),
                });
                ZPullScroller.loadEnd = false;
                this.getDocList({term_id:item.term_id});
            },
            getRelationshipsList(cons = {},moduleName = "relationshipsList"){
                this.action({
                    moduleName:moduleName,
                    goods:null,
                });
                return this.action({
                    moduleName:moduleName,
                    url:'/header/'+cons.term_id,
                    method:"post",
                    data:_.merge({
                        token:this.airforce.login_post.data.token,
                    },cons)
                })
            },
            getDocList(con){
                const ZPullScroller = this.$refs['ZPullScroller'+this.index][0];
                let config = _.merge({
                    page:1,
                    //默认每次20条
                    pagesize:20,
                },con);
                if(!this.airforce.Message_tabItem || !this.airforce.Message_tabItem[config.term_id+"config"]){
                    this.action({
                        moduleName:'Message_tabItem',
                        goods:_.set({},config.term_id+"config",config),
                    });
                }else {
                    config = _.merge(config,this.airforce.Message_tabItem[config.term_id+"config"]);
                }
                ZPullScroller.loadStart = false;
                ZPullScroller.load = true;
                this.getRelationshipsList(config).then(ress=>{
                    ZPullScroller.load = false;
                    if(ress.code == 200){
                        if(this.airforce.Message_tabItem[config.term_id]){
                            this.action({
                                moduleName:'Message_tabItem',
                                goods:_.set({},config.term_id,this.airforce.Message_tabItem[config.term_id].concat(ress.data.data)),
                            });
                        }else {
                            this.action({
                                moduleName:'Message_tabItem',
                                goods:_.set({},config.term_id,ress.data.data),
                            });
                        }
                        this.action({
                            moduleName:'Message_tabItem',
                            goods:_.set({},config.term_id+"config.page",this.airforce.Message_tabItem[config.term_id+"config"].page + 1),
                        });
                        if(ress.data.count == this.airforce.Message_tabItem[config.term_id].length){
                            ZPullScroller.loadEnd = true;
                            ZPullScroller.loadStart = false;
                        }else{
                            ZPullScroller.loadStart = true;
                            ZPullScroller.loadEnd = false;
                        }
                    }else {
                        ZPullScroller.load = false;
                        ZPullScroller.loadEnd = false;
                        ZPullScroller.loadStart = true;
                    };
                }).catch(err=>{
                    ZPullScroller.load = false;
                    ZPullScroller.loadEnd = false;
                    ZPullScroller.loadStart = true;
                });
            },
            change(_vm){
                if(_vm.loadStart){
                    this.getDocList({term_id:this.airforce.Message_tabItem.select});
                    _vm.reset({top:0});
                }
            },
            onItemClick(index){
                switch (index){
                    case 0:
                        this.docSortTabClick({term_id:'notice'});
                        break;
                    default :
                        this.docSortTabClick({term_id:'letter'});
                        break;
                }
            }
        },
        computed:{
            ...mapGetters(['airforce']),
            height(){
                return this.Win_innerHeight - 84 - 53 + "px"
            },
            list(){
                try {
                    const relationshipsList = JSON.parse(JSON.stringify(this.airforce.Message_tabItem[this.airforce.Message_tabItem.select]))
                    return relationshipsList.map(e=>{
                        return e;
                    });
                }catch (e){}
                return [];
            },
        },
        mounted(){
            this.onItemClick(0);
        },
        watch:{
            index(v){
                this.onItemClick(v);
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
                    margin-bottom: 1px;
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
                        .notMessage{
                            color: @theme-color;
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
}
</style>