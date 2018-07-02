<template>
    <div class="releaseBox" v-if="show">
        <div class="bj"  @click="release"></div>
        <div class="releaseList" v-if="type != 'custom'">
            <div class="releaseListBox animated bounceInUp">
                <h1>发布方式</h1>
                <h2>请选择您要新增的房源类型</h2>
                <group class="releaseListBox-group">
                    <cell @click.native="addFocus" title="添加集中式房源" is-link
                          inline-desc="适合整栋楼房管理">
                        <span slot="icon" class="iconfont">&#xe68a;</span>
                    </cell>
                    <cell @click.native="addScatter" title="添加分散式房源" is-link
                          inline-desc="适用小区单套房间、分散式房源">
                        <span slot="icon" class="iconfont">&#xe67b;</span>
                    </cell>
                    <cell @click.native="batch" title="批量添加房源" is-link
                          inline-desc="适用excel表格文件，房源大数据快速导入">
                        <span slot="icon" class="iconfont">&#xe7b2;</span>
                    </cell>
                </group>
            </div>
            <div class="tabIcon animated bounceInUp">
                <img :src="require('@/assets/img/Login/tab.png')" alt="">
            </div>
        </div>
        <div :class="`releaseList ${(type == 'custom')? 'releaseListCustom' :''}`" v-else>
            <div class="releaseListBox animated bounceInUp">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import { Group, Cell } from 'vux'
    export default {
        name: "release-box",
        components:{ Group, Cell },
        props:{
            type:{
                type:String,
                default:null
            }
        },
        data(){
          return {
          }
        },
        methods:{
            release(){
                this.$vnode.data.model.callback(!this.$vnode.data.model.value);
            },
            batch(){
                this.$vux.toast.text("正在玩命开发中...");
            },
            addScatter(){
                this.$router.push('/HousingAddScatter');
            },
            addFocus(){
                this.$router.push('/HousingAddFocus');
            }
        },
        computed: {
            show(){
                try {
                    return this.$parent[this.$vnode.data.model.expression];
                }catch (e){
                    console.error(`[ReleaseBox warn] Error in render: "The v-model attribute is not defined"`)
                    return false;
                };
            }
        }

    }
</script>

<style scoped lang="less">
@import "../assets/css/color.less";
.releaseBox{
    .bj{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: @rgba_000000_5;
        z-index: 489;
    }
    .releaseList{
        .bj;
        background-color: transparent;
        height: auto;
        bottom:@footer_hright;
        width: 90%;
        left: 5%;
        .releaseListBox{
            background-color: @cor_ffffff;
            border-radius: 4px;
            position: relative;
            top: 5px;
            padding-top: 5px;
            padding-bottom: 7px;
            h1{
                color: @theme-color;
                font-size: 20px;
                text-align: center;
            }
            h2{
                font-weight: initial;
                color: @theme-color;
                font-size: 18px;
                text-align: center;
            }
            .releaseListBox-group{
                &/deep/ .vux-no-group-title{
                    &:after{
                        border: none;
                    }
                    .vux-label{
                        color: @cor_000000;
                    }
                    .vux-label-desc{
                        font-size: 12px;
                        color: @cor_a9a7ab;
                    }
                    .iconfont{
                        @index:50px;
                        display: inline-block;
                        width: @index;
                        height: @index;
                        background-color: @cor_91c8f2;
                        text-align: center;
                        line-height: @index;
                        border-radius: 100%;
                        margin-right: 10px;
                        font-size: 30px;
                        color: @cor_ffffff;
                    }
                }
            }
        }
        .tabIcon{
            text-align: center;
            img{
                display: inline-block;
                border: none;
                outline: medium;
                transform: rotate(180deg);
                width: 30px;
            }
        }
        &.releaseListCustom{
            bottom: 50%;
            max-height: 70%;
            transform: translateY(50%);
            overflow-x: hidden;
            -webkit-user-select: none;
            -webkit-overflow-scrolling: touch;
            user-select: none;
            -webkit-user-drag: none;
            -webkit-user-drag: none;
        }
    }
}
</style>