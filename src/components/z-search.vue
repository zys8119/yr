<template>
    <div class="z-search" :class="{up:upshow}" v-if="up">
        <div class="z-search-box">
            <div class="searchInputBox">
                <div class="searchInputBox2">
                    <div class="searchInputBox3">
                        <x-input v-model="values" @on-enter="enter" @on-change="change" @on-click-clear-icon="clear" class="searchInput" placeholder="请输入关键字">
                            <span slot="label" class="iconfont" @click="clickInput">
                                &#xe60a;
                            </span>
                        </x-input>
                    </div>
                </div>
            </div>
            <group>
                <cell @click.native="clickInput(item,'select')" v-for="item,i in list" :key="i" :title="item.post_title" class="iconfont z-search-cell">
                    <span class="iconfont">&#xe6a6;</span>
                </cell>
            </group>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XInput, Cell, Group } from 'vux'
    export default {
        name: "z-search",
        components:{ Flexbox, FlexboxItem, XInput, Cell, Group },
        data(){
            return {
                upshow:false,
                values:'',
            }
        },
        methods:{
            clickInput(item,type){
                setTimeout(()=>{
                    this.upshow = false;
                    setTimeout(()=>{
                        try {
                            this.$vnode.data.model.callback(false);
                        }catch (e){}
                        if(type == "select"){
                            this.$emit('on-close',this.values,item);
                        }else {
                            this.$emit('on-close',this.values,null);
                        }
                    },500);
                });
            },
            enter(val){
                this.$emit('on-enter',val,this);
            },
            change(val){
                this.$emit('on-change',val,this);
            },
            clear(){
                this.$emit('on-enter');
            }
        },
        computed:{
            up(){
                try {
                    let data = this.$utils.SearchParentKey(this.$parent,this.$vnode.data.model.expression);
                    if(data.parent){
                        setTimeout(()=>{
                            this.upshow = data.value;
                        });
                        return data.value;
                    }
                }catch (e){}
                return false;
            },
            list(){
                try {
                    return this.airforce.SearchData.data.data;
                }catch (e){}
                return [];
            }
        },
    }
</script>

<style scoped lang="less">
@import "../assets/css/color";
.z-search{
    position: fixed;
    left: 0;
    top: 80px;
    width: 100%;
    height: 100%;
    z-index: 1000;
    opacity: 0;
    background-color: @cor_ffffff;
    @s:0.3s;
    transition: top @s,opacity @s;
    transition-timing-function:ease-in;
    color: @cor_000000;
    overflow-x: hidden;
    &.up{
        top: 0;
        opacity:1;
    }
    .bottom{
        min-height: @footer_hright;
        width: 100%;
    }
    .z-search-box{
        padding: @maTop @paIndex;
        .searchInputBox{
            width: 100%;
            min-height: 40px;
            .searchInputBox2{
                position: fixed;
                left: 0;
                top: @maTop;
                width: 100%;
                z-index: 1000;
                .searchInputBox3{
                    padding: 0 @paIndex;
                    .searchInput{
                        background-color: @cor_D9D9D9;
                        padding-top: 0;
                        padding-bottom: 0;
                        border-radius: 10px;
                        &/deep/ .weui-cell__hd{
                            color: @theme-color;
                        }
                        .iconfont{
                            min-width: 30px;
                            display: inline-block;
                        }
                        &/deep/ input{
                            height: 40px;
                        }
                    }
                }
            }
        }

    }
    .z-search-cell{
        &:active{
            background-color: @cor_ececec;
        }
    }
}
</style>