<template>
    <div class="HousingCard">
        <div class="HousingCardList">
            <flexbox class="HousingCardList-item" v-for="(item,index) in list" :key="`HousingCard${index}`" @click.native="onClick(item)">
                <flexbox-item span="100" class="HousingCardList-item-left">
                    <img v-if="item.img" :src="item.img" alt="">
                    <img v-else :src="defaultImg" alt="">
                </flexbox-item>
                <flexbox-item class="HousingCardList-item-right">
                    <h1>{{item.title}} <span v-if="item.MaxSize">{{item.MaxSize}}㎡</span></h1>
                    <p>
                        <span v-if="item.type">{{item.type}} </span>
                        <span v-if="item.size"> | {{item.size}} ㎡</span>
                        <span v-if="item.direction"> | {{item.direction}}</span>
                        <span v-if="item.style"> | {{item.style}}</span>
                    </p>
                    <h2>{{item.price | HousingCard_price}} <span>元/月</span></h2>
                    <flexbox class="bottom">
                        <flexbox-item class="left" v-if="item.lable">
                            <div class="label" v-for="(lableItem,index2) in item.lable" :key="`HousingCard_lable${index2}`"><span :class="lableItem | HousingCard_lable">{{lableItem}}</span></div>
                        </flexbox-item>
                        <flexbox-item class="right" v-if="item.location">{{item.location}}</flexbox-item>
                    </flexbox>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem } from 'vux'
    import { mapActions } from 'vuex'
    export default {
        name: "z-housing-card",
        components:{ Flexbox, FlexboxItem },
        props:{
            list:{
                type:Array,
                default:()=>[],
            }
        },
        data(){
            return {
                defaultImg:require('@/assets/img/Login/touxiang.png')
            }
        },
        methods:{
            ...mapActions(['action']),
            onClick(item){
                if(item.onClick){
                    item.onClick(item);
                    return;
                }
                if(item.link){
                    this.$router.push(item.link);
                    return;
                }
                this.action({
                    moduleName:'HousingDetailsSelect',
                    goods:item,
                });
                this.$router.push("/HousingDetails?id="+item.id+"&o_id="+item.o_id);
            }
        }
    }
</script>

<style scoped lang="less">
@import "../assets/css/color.less";
.HousingCard{
    .HousingCardList{
        margin-top:@maTop;
        .HousingCardList-item{
            background-color: @cor_ffffff;
            padding: @maTop 0;
            margin-bottom:@maTop;
            width: 100%;
            .HousingCardList-item-left{
                padding-left: @paIndex;
                img{
                    width: 100%;
                    height: 100px;
                }
            }
            .HousingCardList-item-right{
                padding-right: @paIndex;
                h1{
                    font-size: 16px;
                    .textNowrap();
                }
                p{
                    font-size: 12px;
                    color: @cor_a9a7ab;
                    .textNowrap();
                }
                h2{
                    font-size: 18px;
                    font-weight: initial;
                    color: @cor_ff0000;
                    span{
                        font-size: 12px;
                    }
                }
                .bottom{
                    .left{
                        overflow: hidden;
                        .label{
                            float: left;
                            font-size: 12px;
                            span{
                                padding:0 4px;
                                border-radius: 18px;
                                color: @theme-color;
                                border:1px solid @theme-color;
                                margin-right: 5px;
                                display: inline-block;
                                margin-bottom: 5px;
                                &.color1{
                                    @cor:@theme-color;
                                    color: @cor;
                                    border:1px solid @cor;
                                }
                                &.color2{
                                    @cor:@cor_1bd182;
                                    color: @cor;
                                    border:1px solid @cor;
                                }
                                &.default{
                                    @cor:@theme-color;
                                    color: @cor;
                                    border:1px solid @cor;
                                }
                            }
                        }
                    }
                    .right{
                        text-align: right;
                        .textNowrap();
                        color: @cor_a9a7ab;
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
</style>