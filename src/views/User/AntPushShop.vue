<template>
    <div class="AntPushShop">
        <swiper :list="bannerlist" :show-desc-mask="false" height="100px"></swiper>
        <swiper v-if="airforce.loanscroll.data"  auto height="70px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
            <swiper-item headlinesList v-for="item,index in airforce.loanscroll.data" :key="index">
                <div class="flexboxBox">
                    <flexbox class="flexbox">
                        <flexbox-item span="60">
                            <img class="img" @click="go(item)" :src="item.img" alt="">
                        </flexbox-item>
                        <flexbox-item>
                            <flexbox>
                                <flexbox-item class="title">{{item.title}}</flexbox-item>
                                <flexbox-item class="index">今日已有{{item.push_reg | push_reg}}人申请</flexbox-item>
                            </flexbox>
                            <p class="content">{{item.con}}</p>
                        </flexbox-item>
                    </flexbox>
                </div>
            </swiper-item>
        </swiper>
        <cell title="快速贷款" class="cellObj"><img class="celltitle" slot="icon" :src="icon.img"></cell>
        <flexbox class="banner2">
            <flexbox-item span="100">
                <img class="left" @click="itemClick(imgs1[0])" :src="imgs1[0].img" alt="">
            </flexbox-item>
            <flexbox-item>
                <img class="right_1" @click="itemClick(imgs1[1])" :src="imgs1[1].img" alt="">
                <img class="right_2" @click="itemClick(imgs1[2])" :src="imgs1[2].img" alt="">
            </flexbox-item>
        </flexbox>
        <div @click="go(item)" class="flexboxBox flexboxBoxCol" v-for="item in airforce.AntPushShop1.data.data" v-if="airforce.AntPushShop1.data && airforce.AntPushShop1.data.data">
            <flexbox class="flexbox">
                <flexbox-item span="60">
                    <img class="img" :src="item.img" alt="">
                </flexbox-item>
                <flexbox-item>
                    <img v-if="item.hot == '1'" class="icon" :src="hot.img" alt="">
                    <div class="title">{{item.title}}</div>
                    <p class="content">{{item.excerpt}}</p>
                    <flexbox>
                        <flexbox-item class="title">最高额度：{{item.quota}}</flexbox-item>
                        <flexbox-item class="index">月利率：{{item.rate | rate}}%</flexbox-item>
                    </flexbox>
                </flexbox-item>
            </flexbox>
        </div>
        <cell title="大额贷款" class="cellObj"><img class="celltitle" slot="icon" :src="icon.img"></cell>
        <z-scroller class="z-scroller" :list="imgs2" @item-click="itemClick"></z-scroller>
        <div @click="go(item)" class="flexboxBox flexboxBoxCol" v-for="item in airforce.AntPushShop2.data.data" v-if="airforce.AntPushShop2.data && airforce.AntPushShop2.data.data">
            <flexbox class="flexbox">
                <flexbox-item span="60">
                    <img class="img" :src="item.img" alt="">
                </flexbox-item>
                <flexbox-item>
                    <img v-if="item.hot == '1'" class="icon" :src="hot.img" alt="">
                    <div class="title">{{item.title}}</div>
                    <p class="content">{{item.excerpt}}</p>
                    <flexbox>
                        <flexbox-item class="title">最高额度：{{item.quota}}</flexbox-item>
                        <flexbox-item class="index">月利率：{{item.rate | rate}}%</flexbox-item>
                    </flexbox>
                </flexbox-item>
            </flexbox>
        </div>
        <cell title="快速办卡" class="cellObj"><img class="celltitle" slot="icon" :src="icon.img"></cell>
        <flexbox class="banner2">
            <flexbox-item span="100">
                <img class="left" @click="itemClick(imgs3[0])" :src="imgs3[0].img" alt="">
            </flexbox-item>
            <flexbox-item>
                <img class="right_1" @click="itemClick(imgs3[0])" :src="imgs3[1].img" alt="">
                <img class="right_2" @click="itemClick(imgs3[0])" :src="imgs3[2].img" alt="">
            </flexbox-item>
        </flexbox>
        <div @click="go(item)" class="flexboxBox flexboxBoxCol" v-for="item in airforce.AntPushShop3.data.data" v-if="airforce.AntPushShop3.data && airforce.AntPushShop3.data.data">
            <flexbox class="flexbox">
                <div class="icon btn">快速办卡</div>
                <flexbox-item span="60">
                    <img class="img" :src="item.img" alt="">
                </flexbox-item>
                <flexbox-item>
                    <div class="title">{{item.title}}</div>
                    <p class="content">{{item.excerpt}}</p>
                </flexbox-item>
            </flexbox>
        </div>
        <flexbox class="footerBox">
            <flexbox-item>
                <div class="iconfont">&#xe646;</div>
                <p>办卡进度查询</p>
            </flexbox-item>
            <flexbox-item>
                <div class="iconfont">&#xe643;</div>
                <p>办卡提额攻略</p>
            </flexbox-item>
        </flexbox>
        <div class="footerImg" v-if="footer && footer.img">
            <img :src="footer.img" alt="">
        </div>
    </div>
</template>

<script>
    import { Swiper, SwiperItem, Flexbox, FlexboxItem, Cell } from 'vux'
    import { ZScroller } from '@/components'
    export default {
        name: "ant-push-shop",
        components:{ Swiper, SwiperItem, Flexbox, FlexboxItem, Cell, ZScroller },
        data(){
            return {
                headlinesList: [
                    {
                        title:"你我贷",
                        img:"http://placeholder.qiniudn.com/50x50/e5e5e5/e5e5e5",
                        index:66,
                        content:"用户187******1570 金额借款87000元已到账",
                    },
                    {
                        title:"你我贷",
                        img:"http://placeholder.qiniudn.com/50x50/e5e5e5/e5e5e5",
                        index:66,
                        content:"用户187******1570 金额借款87000元已到账",
                    },
                ]
            }
        },
        computed:{
            bannerlist(){
                try {
                    if(this.airforce.configs_post.data){
                        const  resD = JSON.parse(JSON.stringify(this.airforce.configs_post.data)).filter(e=>{
                            e.url = "/ApplicationDetails?id="+e.url+"&phone="+this.$route.query.phone;
                            return e.type == '11' && e.texts == 'banner';
                        });
                        return resD;
                    }
                }catch (e){}
                return [
                    {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5"}
                ];
            },
            imgs1(){
                try {
                    if(this.airforce.configs_post.data){
                        const  resD = JSON.parse(JSON.stringify(this.airforce.configs_post.data)).filter(e=>{
                            return e.type == '11' && e.texts == '1';
                        });
                        return resD;
                    }
                }catch (e){}
                return [
                    {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5"},
                    {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5"},
                    {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5"},
                ];
            },
            imgs2(){
                try {
                    if(this.airforce.configs_post.data){
                        const  resD = JSON.parse(JSON.stringify(this.airforce.configs_post.data)).filter(e=>{
                            return e.type == '11' && e.texts == '2';
                        });
                        return resD;
                    }
                }catch (e){}
                return [];
            },
            imgs3(){
                try {
                    if(this.airforce.configs_post.data){
                        const  resD = JSON.parse(JSON.stringify(this.airforce.configs_post.data)).filter(e=>{
                            return e.type == '11' && e.texts == '3';
                        });
                        return resD;
                    }
                }catch (e){}
                return [
                    {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5"},
                    {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5"},
                    {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5"},
                ];
            },
            icon(){
                try {
                    if(this.airforce.configs_post.data){
                        const  resD = _.find(this.airforce.configs_post.data,{type:"11",texts:"icon"});
                        return resD;
                    }
                }catch (e){}
                return {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5"};
            },
            hot(){
                try {
                    if(this.airforce.configs_post.data){
                        const  resD = _.find(this.airforce.configs_post.data,{type:"11",texts:"hot"});
                        return resD;
                    }
                }catch (e){}
                return {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5"};
            },
            footer(){
                try {
                    if(this.airforce.configs_post.data){
                        const  resD = _.find(this.airforce.configs_post.data,{type:"11",texts:"footer"});
                        return resD;
                    }
                }catch (e){}
                return {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5"};
            }
        },
        created(){
            this.action({
                moduleName:"AntPushShop1",
                goods:{
                    data:{
                        data:undefined
                    }
                }
            });
            this.action({
                moduleName:"AntPushShop2",
                goods:{
                    data:{
                        data:undefined
                    }
                }
            });
            this.action({
                moduleName:"AntPushShop3",
                goods:{
                    data:{
                        data:undefined
                    }
                }
            });
            this.action({
                moduleName:"loanscroll",
                goods:{
                    data:undefined
                }
            });
        },
        methods:{
            getData(loan_type = 1){
                this.action({
                    moduleName:"AntPushShop"+loan_type,
                    url:'/header/push',
                    method:"post",
                    data:{
                        loan_type:loan_type,
                    }
                });
            },
            itemClick(item){
                this.go(_.merge(item,{id:item.url}));
            },
            go(item){
                try {
                    this.$router.push("/ApplicationDetails?id="+item.id+"&phone="+this.$route.query.phone);
                }catch(e){
                    this.$vux.toast.text("参数错误，地推失败");
                }
            }
        },
        mounted(){
            //极速贷款
            this.getData();
            //大额贷款
            this.getData(2);
            //快速办卡
            this.getData(3);
            this.action({
                moduleName:"loanscroll",
                url:'/header/loanscroll',
                method:"post",
            });
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/color";
    .AntPushShop{
        &/deep/ .flexboxBox{
            padding: @maTop @paIndex;
            background-color: @cor_ffffff;
            .flexbox{
                .img{
                    width: 50px;
                    height: 50px;
                }
                .title{
                    font-size: 14px;
                    .textNowrap;
                }
                .index{
                    font-size: 12px;
                    text-align: right;
                    .textNowrap;
                }
                .content{
                    .index;
                    text-align: left;
                }
            }
            &.flexboxBoxCol{
                margin: 1px 0;
                .flexbox{
                    position: relative;
                    .icon{
                        width: 30px;
                        height: 30px;
                        position: absolute;
                        top: 0;
                        right: 0;
                        &.btn{
                            width: auto;
                            color: @theme-color;
                            border: 1px solid @theme-color;
                            border-radius: 5px;
                            font-size: 12px;
                            height: auto;
                            padding: 0 5px;
                            top: 18px;
                        }
                    }
                }
            }
        }
        .cellObj{
            background-color: @cor_ffffff;
            margin-top:@maTop;
            &:before{
                border:none;
            }
            .celltitle{
                margin-right: @maTop;
                width: 30px;
                height: 30px;
            }
        }
        .banner2{
            @index:100px;
            background-color: @cor_ffffff;
            .left{
                width: 100%;
                height: @index;
            }
            .right_1{
                width: 100%;
                height: (@index - 6px) / 2;
                margin-bottom: 6px;
            }
            .right_2{
                .right_1;
                margin-bottom: 0;
            }
        }
        .z-scroller{
            margin-bottom: @maTop;
        }
        .footerBox{
            text-align: center;
            font-size: 12px;
            color: @cor_C8C8CD;
            background-color: @cor_ffffff;
            margin-top: 1px;
            margin-bottom: 1px;
            padding: @maTop 0;
            .iconfont{
                color: @theme-color;
                font-size: 20px;
                font-weight: bold;
            }
        }
        .footerImg{
            background-color: @cor_ffffff;
            text-align: center;
            height: auto;
            img{
                display: inline-block;
                max-width: 100%;
            }
        }

    }


</style>