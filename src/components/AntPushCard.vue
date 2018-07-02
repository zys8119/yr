<template>
    <div class="AntPushCard">
        <flexbox class="flexbox">
            <flexbox-item class="flexbox-item left" span="50">
                <img :src="data.img">
            </flexbox-item>
            <flexbox-item class="flexbox-item right">
                <h1>{{data.title}} <span>立即代理</span></h1>
                <h1 class="h2">最高额度 {{data.quota}}元 <span>{{data.push_reg}}人已申请</span></h1>
                <p>{{data.keywords}}</p>
            </flexbox-item>
        </flexbox>
        <div class="txt">{{data.excerpt}}</div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem } from 'vux'
    export default {
        name: "ant-push-card",
        props:{
          data:{
              type:Object,
              delete:()=>{}
          }
        },
        components:{ Flexbox, FlexboxItem }
    }
</script>

<style scoped lang="less">
@import "../assets/css/color";
.AntPushCard{
    background-color: @cor_ffffff;
    padding: @maTop @paIndex;
    box-shadow:inset 0 -30px 30px #f2f0f5;
    border-bottom: 2px solid #f2f0f5;
    border-radius: 6px 6px 0 0;
    &:active{
        background-color: @cor_ececec;
    }
    .flexbox{
        border-bottom: 1px solid @cor_C8C8CD;
        padding-bottom: @maTop;
        .flexbox-item{
            &.left{
                img{
                    width: 50px;
                    height: 50px;
                    border-radius: 5px;
                }
            }
            &.right{
                padding-left: @maTop;
                h1{
                    font-size: 16px;
                    font-weight: inherit;
                    color: @cor_a9a7ab;
                    line-height: 30px;
                    .textNowrap();
                    margin-bottom: @maTop;
                    span{
                        color: @theme-color;
                        border: 1px solid @theme-color;
                        padding:0 @maTop/2;
                        font-size: 16px;
                        float: right;
                    }
                    &.h2{
                        color: @cor_ff0000;
                        font-size: 14px;
                        line-height: inherit;
                        margin-bottom: @maTop/2;
                        span{
                            border: none;
                            color: @cor_C8C8CD;
                            font-size: 14px;
                            padding: 0;
                        }
                    }
                }
                p{
                    font-size: 12px;
                    color: @theme-color;
                }
            }
        }
    }
    .txt{
        .textNowrap;
        font-size: 12px;
        line-height: 30px;
    }
}
</style>