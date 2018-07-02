<template>
    <div class="BookingDetails">
        <div class="User-header">
            <div class="box">
                <img class="touxiang" :src="defaultImg"/>
            </div>
            <div class="title">张云山（房东用户）</div>
            <img class="touxiang_bj" :src="bj"/>
        </div>
        <card :header="{title:'对方信息'}">
            <div slot="content" class="BookingDetails-card-content">
                <flexbox :gutter="0" wrap="wrap">
                    <flexbox-item :span="1/2">
                        <span class="left">姓名：</span>
                        <span class="right">张云山</span>
                    </flexbox-item>
                    <flexbox-item :span="1/2">
                        <span class="left">角色：</span>
                        <span class="right">【包租婆】</span>
                    </flexbox-item>
                    <flexbox-item :span="1/2">
                        <span class="left">信誉：</span>
                        <span class="right cor1">80%</span>
                    </flexbox-item>
                    <flexbox-item :span="1/2">
                        <span class="left">电话：</span>
                        <span class="right cor2">187******7014</span>
                    </flexbox-item>
                    <flexbox-item :span="12" class="jieshao">
                        个人介绍
                    </flexbox-item>
                </flexbox>
            </div>
        </card>
        <card :header="{title:'预约信息'}">
            <div slot="content" class="BookingDetails-card-content">
                <flexbox :gutter="0" wrap="wrap">
                    <flexbox-item :span="12">
                        <span class="left">预约时间：</span>
                        <span class="right">2018-05-16 | 星期三 | 上午 | 9:00</span>
                    </flexbox-item>
                    <flexbox-item :span="12">
                        <span class="left">地点：</span>
                        <span class="right">高新区聚贤路与光华路路口</span>
                    </flexbox-item>
                    <flexbox-item :span="1/2">
                        <span class="left">备注：</span>
                    </flexbox-item>
                    <flexbox-item :span="12">
                        <div class="cor3">
                            个人介绍
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
        </card>
        <div class="footerBtns">
            <flexbox class="footerBtns-flexbox">
                <flexbox-item class="left type1">拒绝看房</flexbox-item>
                <flexbox-item class="right">同意看房</flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, Card } from 'vux'
    export default {
        name: "booking-details",
        components:{ Flexbox, FlexboxItem, Card },
        data(){
            return {
                defaultImg: require('@/assets/img/Login/touxiang.png'),
                bj: require('@/assets/img/Login/touxiang_bj.png'),
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color.less";
.BookingDetails{
    .User-header{
        background-color: @theme-color;
        text-align: center;
        padding-top: 55px;
        position: relative;
        padding-bottom: 10px;
        @zindex:120px;
        @index:15px;
        @s:3.5s;
        @animationOpt:bounce @s infinite ease-in-out;
        @keyframes bounce {
            0%{
                box-shadow:
                        0 0 0 0 @rgba_ffffff_05;
            }
            25%{
                box-shadow:
                        0 0 0 @index/2 @rgba_ffffff_05;
            }
            50%{
                box-shadow:
                        0 0 0 @index/2 @rgba_ffffff_05,
                        0 0 0 @index @rgba_ffffff_05;
            }
            100% {
                box-shadow:0 0 0 0 @rgba_ffffff_05;
            }
        }
        .box{
            color: @cor_ffffff;
            display: inline-block;
            width: @zindex;
            height: @zindex;
            line-height: @zindex;
            border-radius: 100%;
            background-color: @rgba_ffffff_18;
            white-space:nowrap;
            text-overflow:ellipsis;
            -o-text-overflow:ellipsis;
            overflow: hidden;
            animation: @animationOpt;
            -webkit-animation: @animationOpt;
            margin-bottom: @index;
            position: relative;
            z-index: 2;
            .touxiang{
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }
        .title{
            position: relative;
            z-index: 2;
            color: @cor_ffffff;
            font-size: 12px;
        }
        .touxiang_bj{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
    }
    .BookingDetails-card-content{
        padding: @paIndex;
        font-size: 14px;
        .cor1{
            color: @theme-color;
        }
        .cor2{
            color: @cor_ff0000;
        }
        .cor3{
            background-color: @cor_e5e5e5;
            border-radius: 5px;
            padding: 10px;
            margin-top: @maTop;
            border:1px solid @cor_D9D9D9;
        }
        .jieshao{
            color: @cor_a9a7ab;
            margin-top: @maTop;
            padding-top: @maTop;
            position: relative;
            border-top: 1px solid @cor_D9D9D9;
            max-height: 120px;
            overflow-x: hidden;
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
}
</style>