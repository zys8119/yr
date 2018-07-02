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
                    <div class="message-swiper-item-card" v-for="(listItem,listItemIndex) in item.list" :key="`message-swiper-item${index}${listItemIndex}`">
                        <panel :list="item.list" type="5"></panel>
                    </div>
                    <div class="buttom"></div>
                </div>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import { Tab, TabItem, Swiper, SwiperItem, Flexbox, FlexboxItem, Panel } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: "my-contacts",
        components: { Tab, TabItem, Swiper, SwiperItem, Flexbox, FlexboxItem, Panel },
        data(){
            return {
                tabs:[
                    {
                        title:'亲密好友',
                        list:[
                            {
                                src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                                fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                                title: '张三',
                                desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                            }
                        ]
                    },
                    {
                        title:'我的好友',
                        list:[]
                    }
                ],
                index: 0,
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
            }
        },
        computed:{
            ...mapGetters(['airforce']),
        },
        mounted(){
            // 未读
            // this.getList();
            //已读
            // this.getList({status:2});
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
                        content: '\e6ea';
                        position: absolute;
                        left: 0;
                        top: 50px;
                        width: 100%;
                        font-size: 80px;
                        text-align: center;
                        color: @cor_d7e8f4;
                    }
                    &:after{
                        content: '暂无好友';
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