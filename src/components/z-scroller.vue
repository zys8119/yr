<template>
    <div :class="`z-scroller z-scroller-type${type}`" @click="onClick">
        <div :class="`z-scroller-title type${type}`" v-if="title">{{title}}</div>
        <scroller lock-y :scrollbar-x=false :class="`z-scroller-box ${(title) ? 'z-scroller-box-title':''}`" @on-scroll="onScroll">
            <ul class="list" :style="{height:newHeight+'px',width:listWidth+'px'}">
                <li class="list-li" v-for="item in list" :style="{height:newHeight+'px',width:width+'px',marginLeft: marginLeft+'px'}" @click="click(item)">
                    <div class="list-item" :style="{height:height+'px',backgroundColor:item.color}">
                        <img :src="item.img">
                        <div :class="`text ${(item.color && !item.img) ? 'text2' : ''}`" :style="{color:item.textColor}" v-if="item.text && (type == '1' || type == '2')">
                            <span v-if="type == '2'"># </span>{{item.text}}
                        </div>
                    </div>
                    <p v-if="type == '2'" class="inline-desc">{{item.minTitle}}</p>
                    <div class="list-item-bottom">
                        <flexbox class="list-item-bottom-flexbox">
                            <flexbox-item class="left">
                                <span>{{item.money}}</span>元/月
                            </flexbox-item>
                            <flexbox-item class="right">{{item.location}}</flexbox-item>
                        </flexbox>
                        <p class="list-item-bottom-inline-desc">{{item.name}}<span> • </span>{{item.type}}</p>
                    </div>
                </li>
            </ul>
        </scroller>
        <div class="coverDiv" v-if="bool"></div>
    </div>
</template>

<script>
    import { Scroller, Flexbox, FlexboxItem } from 'vux'
    export default {
        name: "z-scroller",
        components:{ Scroller, Flexbox, FlexboxItem },
        data(){
            return {
                bool:false,
            }
        },
        props:{
            title:{
                type:String,
                default:null,
            },
            type:{
                type:String,
                default:'1',
            },
            list:{
                type:Array,
                default:()=>[],
                /*
                {
                    img:'imgSrc',//img字段没有则显示背景颜色color
                    text:"sdas",
                    color:"#f00",//背景颜色
                    textColor:"#f00",
                    minTitle:"sdas",
                    money:1860,
                    location:'高新区',
                    name:'江南一品',
                    type:'四室一厅合租',
                }
                * */
            },
            width:{
                type:Number,
                default:200,
            },
            height:{
                type:Number,
                default:100,
            },
            marginLeft:{
                type:Number,
                default:15,
            }
        },
        computed:{
            newHeight(){
                if(this.type == '2'){
                    return this.height + 30;
                }
                if(this.type == '3'){
                    return this.height + 100;
                }
                return this.height;
            },
            listWidth(){
                return this.list.length * this.width + this.list.length * this.marginLeft;
            },
        },
        methods:{
            click(item){
                if(item.link){
                    this.$router.push(item.link);
                    return;
                }
                if(item.click && typeof item.click == "function"){
                    item.click(item);
                };
                this.$emit("item-click",item);
            },
            onClick(){
                this.$emit("on-click",this);
            },
            onScroll(e){
                // console.log(e.left)
            },
            getXY(){
                let supportPageOffset = window.pageXOffset !== undefined;
                let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

                let x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
                let y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
                return {x:x,y:y};
            }
        },
        mounted(){
            let evXstart = 0;
            let evX = 0;
            let evYstart = 0;
            let evY = 0;
            let max = 5;
            this.$el.addEventListener('touchstart',ev=>{
                evXstart = ev.touches[0].clientX;
                evYstart = ev.touches[0].clientY;
            },false);
            this.$el.addEventListener('touchmove',ev=>{
                evX = ev.touches[0].clientX - evXstart;
                evY = ev.touches[0].clientY - evYstart;
                if(Math.abs(evX) < max){
                    // ev.preventDefault();
                    this.bool = true;
                }else {
                    setTimeout(()=>{
                        this.bool = false;
                    },1500)
                }
            },false);
            this.$el.addEventListener('touchend',()=>{
                setTimeout(()=>{
                    this.bool = false;
                },1500)
            },false);
        }
    }
</script>

<style scoped lang="less">
@import "../assets/css/color.less";
.z-scroller{
    position: relative;
    margin-top: @maTop;
    .linear-gradient(@theme-color:@theme-color,@max:0.7){
        background-color: @theme-color;
        background: -webkit-linear-gradient(left, @theme-color , @theme-color * @max); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, @theme-color, @theme-color * @max); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, @theme-color, @theme-color * @max); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, @theme-color , @theme-color * @max); /* 标准的语法 */
    }
    .z-scroller-title{
        @h:30px;
        position: absolute;
        left: 0;
        top: 0;
        color: @cor_ffffff;
        z-index: 10;
        line-height: @h;
        padding: 0 @paIndex;
        border-radius: 0 @h @h 0;
        text-align: left;
        font-size: 16px;
        .linear-gradient(@cor_1bd182);
        &.type2{
            .linear-gradient();
        }
        &.type3{
            .linear-gradient(@cor_ff0000);
        }
        &.type4{
            .linear-gradient(@cor_c31bd2);
        }
    }
    .coverDiv{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        /*background-color: #0b6cbc;*/
    }
    .z-scroller-box{
        &.z-scroller-box-title{
            padding-top: @maTop*1.5;
        }
        .list{
            position: relative;
            width: 1490px;
            .list-li{
                width: 200px;
                display:inline-block;
                float: left;
                text-align: center;
                line-height: 100px;
                border-radius: 6px;
                position: relative;
                .list-item{
                    overflow: hidden;
                    border-radius: 6px;
                    position: relative;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    &:first-child {
                        margin-left: 0;
                    }
                    .text{
                        position: absolute;
                        left: 0;
                        top: 0;
                        background-color: @rgba_ffffff_5;
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        line-height: 80px;
                        font-size: 30px;
                        &.text2{
                            background-color: transparent;
                            color: @cor_ffffff;
                        }
                    }
                }
                .inline-desc{
                    width: 100%;
                    text-align: left;
                    line-height: 40px;
                    padding-left: @maTop;
                }
                .list-item-bottom{
                    line-height: initial;
                    text-align: left;
                    width: 100%;
                    white-space:nowrap;
                    text-overflow:ellipsis;
                    -o-text-overflow:ellipsis;
                    overflow: hidden;
                    .list-item-bottom-flexbox{
                       margin-top: 10px;
                        .left{
                            font-size: 12px;
                            color: @cor_ff3366;
                            span{
                                font-size: 20px;
                            }
                        }
                        .right{
                            text-align: right;
                            font-size: 14px;
                        }
                    }
                    .list-item-bottom-inline-desc{
                        margin-top: 5px;
                        color: @cor_a9a7ab;
                        font-size: 12px;
                    }
                }
            }
        }
    }
    &.z-scroller-type2{
        .z-scroller-box{
            .list{
                .list-li{
                    .list-item{
                        .text{
                            background-color: transparent;
                            height: 20px;
                            top: inherit;
                            bottom: 0;
                            line-height: 20px;
                            padding-bottom: 5px;
                            text-align: left;
                            padding-left: @maTop;
                            color: @cor_ffffff;
                            z-index: 2;
                            font-size: 12px;
                            &:before{
                                content: '';
                                position: absolute;
                                left: 0;
                                height: 1px;
                                width: 100%;
                                bottom: 0;
                                background-color: @cor_000000;
                                box-shadow: 0 0 20px 20px @rgba_000000_5;
                                z-index: -1;
                            }
                        }
                    }
                }
            }
        }
    }
    &.z-scroller-type3{
        .z-scroller-box {
            .list {
                .list-li {
                    .list-item {
                    }
                }
            }
        }
    }
}
</style>