<template>
    <div class="GuidePage">
        <swiper class="swiper">
            <swiper-item @click.native="swiperItem(index+1)" class="swiper-item" v-for="(item,index) in GuidePageImgs" :key="index">
               <img :src="item.img">
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import { Swiper, SwiperItem, XImg } from 'vux'
    export default {
        name: "guide-page",
        components:{ Swiper, SwiperItem, XImg },
        data(){
            return {
                img: "http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5"
            }
        },
        computed:{
            GuidePageImgs(){
                try {
                    if(this.airforce.configs_post.data){
                        const resData =  this.airforce.configs_post.data.filter(e=>{
                            return e.type == '13';
                        });
                        return resData;
                    }
                }catch (e){}
                return [];
            },
        },
        methods:{
            swiperItem(index){
                if(index == this.GuidePageImgs.length){
                    this.plus.then(plus=>{
                        plus.storage.setItem("launchFlag","true");
                    });
                    this.$router.back();

                }
            }
        },
        mounted(){
            this.plus.then(plus=>{
                plus.navigator.setFullscreen( true );
            });
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color";
.GuidePage{
    &/deep/ .swiper{
        height: 100%;
        width: 100%;
        position: absolute;
        .vux-swiper{
            overflow: auto;
            height: 100% !important;
            .swiper-item{
                height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                    border: none;
                    outline: medium;
                }
            }
        }
        .vux-indicator{
            width: 100%;
            text-align: center;
            a{
                float: initial;
                display: inline-block;
                .active{
                    background-color: @theme-color;
                }
            }
        }
        .vux-indicator-right{
            .vux-indicator;
        }
    }
}
</style>