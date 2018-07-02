<template>
    <div class="Friendster-card">
        <div class="card">
            <flexbox>
                <flexbox-item span="50" class="left">
                    <div>
                        <h1>04</h1>
                        <h2>/06</h2>
                        <h3>05:12</h3>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="slide"
                         :class="showContent?'animate':''"
                         @click="showContent = !showContent">
                        <p>朋友圈内容</p>
                    </div>
                    <div @click="showContent = !showContent" class="icon up" v-if="showContent">收起</div>
                    <div @click="showContent = !showContent" class="icon" v-else>展开</div>
                    <div>
                        <img :class="`img img_${_uid}`" v-for="(item, index) in list" :src="item.src" width="100" @click="show(index)"/>
                    </div>
                    <div v-transfer-dom>
                        <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
                    </div>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item class="b-left" :span="1/4">
                    下载4512
                </flexbox-item>
                <flexbox-item class="b-right">
                    <x-button>
                        <img src="http://placehold.it/10X10&text=banner1">
                        <span>保存图片</span>
                    </x-button>
                    <x-button>
                        <img src="http://placehold.it/10X10&text=banner1">
                        <span>复制文字</span>
                    </x-button>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, Cell, Group, Previewer, TransferDom, XButton } from 'vux'
    export default {
        name: "z-friendster-card",
        directives: {
            TransferDom
        },
        components: { Flexbox, FlexboxItem, Cell, Group, Previewer, XButton  },
        data(){
            return {
                showContent:false,
                list: [{
                    msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
                    src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
                    w: 800,
                    h: 400
                },
                    {
                        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
                        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
                        w: 1200,
                        h: 900
                    }, {
                        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
                        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
                    }],
                options: {
                    getThumbBoundsFn:(index)=>{
                        let thumbnail = document.querySelectorAll('.img_'+this._uid)[index]
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                        let rect = thumbnail.getBoundingClientRect();
                        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}

                    }
                }
            }
        },
        methods:{
            logIndexChange (arg) {
                console.log(arg)
            },
            show (index) {
                this.$refs.previewer.show(index)
            }
        },
        mounted(){
        }
    }
</script>


<style scoped lang="less">
    @import "../assets/css/color";
    .Friendster-card{
        .card{
            background-color: @cor_ffffff;
            padding: @maTop @paIndex;
            position: relative;
            margin-bottom: 1px;
            .left{
                *{
                    display: inline-block;
                    float: left;
                    font-size: 18px;
                    font-weight: initial;
                }
                div{
                    position: absolute;
                    left: @paIndex;
                    top: @maTop;
                    width: 50px;
                }
                h2{
                    font-size: 14px;
                    position: relative;
                    top: 5px;
                }
                h3{
                    font-size: 12px;
                    color: @cor_C8C8CD;
                }
            }
            .slide {
                overflow: hidden;
                max-height: 40px;
                transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
                margin-bottom: @maTop;
                font-size: 14px;
            }
            .animate {
                max-height: 9999px;
                transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
                transition-delay: 0s;
            }
            .img{
                display: inline-block;
                @index:80px;
                width: @index;
                height: @index;
            }
            .icon{
                .icon-up();
                width: 50px;
                font-size: 12px;
                color: @cor_C8C8CD;
                line-height: 30px;
                &.up{
                    .icon-down(@theme-color);
                    color: @theme-color;
                }
            }
            .b-left{
                color: @cor_C8C8CD;
                font-size: 12px;
                line-height: 40px;
            }
            .b-right{
                text-align: right;
                img{
                    display: inline-block;
                }
                button{
                    width: auto;
                    font-size: 12px;
                    @index:25px;
                    height:  @index;
                    line-height:  @index;
                    border-radius: @index;
                    display: inline-block;
                    color: @cor_a9a7ab;
                    border: 1px solid @cor_C8C8CD;
                    position: relative;
                    top: -5px;
                    &:after{
                        content: '';
                        width: 0;
                        height: 0;
                        opacity: 0;
                    }
                }
            }
        }
    }
</style>