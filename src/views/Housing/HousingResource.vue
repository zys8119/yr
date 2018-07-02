<template>
    <div class="HousingResource">
        <div class="message-tab">
            <tab :line-width=2 v-model="index">
                <tab-item :selected="index == 0" v-for="(item,index) in tabs" :key="`message-tab${index}`">{{item.title}}</tab-item>
            </tab>
        </div>
        <swiper ref="swiper" v-model="index" :aspect-ratio="1/2" :show-dots="false" class="message-swiper">
            <swiper-item :class="(item.list.length == 0)? 'notData iconfont' : ''" v-for="(item, index) in tabs" :key="`message-swiper${index}`">
                <div class="message-swiper-item">
                    <scroller :pullupConfig="pullupConfig" lock-x height="-100" :ref="`scroller${index}`"  :scroll-bottom-offst="200" :use-pullup="true" @on-pullup-loading="pullup('scroller' + index,index)">
                        <div>
                            <z-card v-for="(cardItem,i) in item.list" :data="cardItem" :key="`HousingResourceCard${i}`"></z-card>
                        </div>
                    </scroller>
                    <div class="buttom"></div>
                </div>
            </swiper-item>
        </swiper>
        <release-box v-model="ReleaseBoxShow"></release-box>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import { Swiper, SwiperItem, Tab, TabItem, Flexbox, FlexboxItem, Card, Scroller, LoadMore  } from 'vux'
    import { ReleaseBox, ZCard } from "@/components"
    export default {
        name: "housing-resource",
        components:{ ReleaseBox, ZCard, Swiper, SwiperItem, Tab, TabItem, Flexbox, FlexboxItem, Card, Scroller, LoadMore },
        data(){
            return {
                ReleaseBoxShow:false,
                index:0,
                page0:1,
                page1:1,
                page2:1,
                page3:1,
                tabs:[
                    {
                        title:'已出租',
                        list:[],
                    },
                    {
                        title:'未发布',
                        list:[],
                    },
                    {
                        title:'已发布',
                        list:[],
                    },
                    {
                        title:'即将/已到期',
                        list:[],
                    },
                ],
                pullupConfig:{
                    content: '上拉刷新',
                    // pullUpHeight: 60,
                    // height: 40,
                    autoRefresh: true,
                    downContent: '放开我',
                    upContent: '上拉刷新',
                    loadingContent: '加载中...',
                    clsPrefix: 'pullupConfig-',
                },
            }
        },
        methods:{
            ...mapActions(['action']),
            getList(conf = {}){
                let data = _.merge({
                    token:this.airforce.login_post.data.token,
                    o_id:this.airforce.login_post.data.id,
                    status:'0',
                },conf);
                return this.action({
                    moduleName:'getHousesourceLists_post_'+data.status,
                    method:'post',
                    url:'/adminapi/Housesource/lists',
                    data:data
                }).then(res=>{
                    if(res.code != 200){
                        this.$vux.toast.text(res.message);
                        return;
                    };
                    try {
                        var index = 0;
                        switch(data.status){
                            case '0':
                                index = 1;
                                break;
                            case '1':
                                index = 0;
                                break;
                            case '2':
                                index = 2;
                                break;
                            default:
                                index = 3;
                                break;
                        };
                        this['page'+index] += 1;
                        this.tabs[index].list = this.tabs[index].list.concat(res.data.data);
                    }catch (e){
                        this.tabs[index].list = [];
                    }
                    return res;
                }).catch(err=>{
                    this.$vux.toast.text(err);
                });
            },
            pullup(str,index){
                let status = '1';
                switch (index){
                    case 0:
                        status = '1';
                        break;
                    case 1:
                        status = '0';
                        break;
                    case 2:
                        status = '2';
                        break;
                    default:
                        status = '3';
                        break;
                };
                var obj = this.$refs[str][0];
                this.getList({
                    status:status,
                    page:this['page'+index],
                }).then(res=>{
                    this.$nextTick(() => {
                        try {
                            if(res.data.data.length == 0){
                                const pullup = obj.pullup;
                                pullup.userConfig.content = "到底啦";
                                pullup.userConfig.upContent = "到底啦";
                                pullup.xscroll.off("scrollend", pullup._scrollEndHandler, pullup);
                                pullup.xscroll.off("scroll", pullup._scrollHandler, pullup);
                                pullup.xscroll.off("pan", pullup._panHandler, pullup);
                                pullup.xscroll.boundry.resetBottom();
                                pullup.__isRender = false;
                                pullup._evtBinded = false;
                            };
                        }catch (e){}
                        obj.donePullup();
                    });
                }).catch(()=>{
                    try {
                        obj.donePullup();
                    }catch (e){}
                });

            }
        },
        computed:{
            ...mapGetters(['airforce']),
        },
        mounted(){
            this.action({
                moduleName:'layout',
                goods:{
                    clickRight:()=>{
                        this.ReleaseBoxShow = true;
                    }
                }
            });
           //已出租
            this.getList({status:'1'});
           //未发布
            this.getList();
            //已发布到期
            this.getList({status:'2'});
            //即将到期
            this.getList({status:'3'});
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color.less";
.HousingResource{
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
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                .buttom{
                    height: @index + @header_hright;
                    margin-top: @maTop*2;
                }
                .pullupConfig-container{
                    color: @cor_a9a7ab;
                    font-size: 12px;
                    line-height: 40px;
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
                    font-size: 70px;
                    text-align: center;
                    color: @cor_d7e8f4;
                }
                &:after{
                    content: '暂无数据';
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