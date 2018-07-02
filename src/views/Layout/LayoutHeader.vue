<template>
    <div :class="`layout-header headerType${airforce.layout.type}`">
        <div :class="`layout-header-Box type${airforce.layout.type} ${scrollBool} layout-header-Box-white`">
            <flexbox class="box" v-if="airforce.layout.type != '5'">
                <flexbox-item class="left" :span="leftSpan" @click.native="clickLeft">
                    <span class="iconfont" v-if="airforce.layout.searchShow">取消</span>
                    <span class="iconfont" v-else v-html="airforce.layout.left"></span>
                </flexbox-item>
                <flexbox-item class="content" v-if="airforce.layout.type != '3'" @click.native="clickContent">
                    <span class="iconfont" v-html="airforce.layout.title" v-if="scrollBool.length != 0 && airforce.layout.titleShowType"></span>
                    <span class="iconfont" v-html="airforce.layout.title" v-if="!airforce.layout.titleShowType"></span>
                    <x-input placeholder="搜索优质房源" :value="airforce.layout.searchText" @on-change="airforce.change.set($event,'searchText','layout')" v-if="airforce.layout.searchShow && airforce.layout.type == '4'" class="search-x-input" @on-enter="search($event)"></x-input>
                </flexbox-item>
                <flexbox-item  class="right" v-if="airforce.layout.type != '3'" :span="rightSpan" @click.native="clickRight">
                    <span class="iconfont" v-if="airforce.layout.type != '4' && airforce.layout.right.length > 0" v-html="airforce.layout.right" :style="{fontSize:airforce.layout.rightFontSize+'px',transform: 'scale('+airforce.layout.rightFontScale+')'}"></span>
                    <div v-if="airforce.layout.type == '4'">
                        <span class="iconfont searchIcon" v-if="!airforce.layout.searchShow">&#xe61d;</span>
                        <span class="iconfont" v-else>确定</span>
                    </div>
                </flexbox-item>
            </flexbox>
            <flexbox class="box" v-if="airforce.layout.type == '5'">
                <flexbox-item @click.native="showSearchFun">
                    <div class="content" :showSearchInit="showSearchInit">
                        <span class="iconfont"> &#xe61d;</span>
                    </div>
                    <z-search v-model="showSearch" @on-enter="search" @on-close="onClose"></z-search>
                </flexbox-item>
                <flexbox-item class="left" :span="leftSpan" @click.native="clickLeft">
                    <span class="iconfont" v-if="airforce.layout.searchShow">取消</span>
                    <span class="iconfont" v-else v-html="airforce.layout.left"></span>
                </flexbox-item>
                <flexbox-item  class="right" v-if="airforce.layout.type != '3'" :span="rightSpan" @click.native="clickRight">
                    <span class="iconfont" v-if="airforce.layout.type != '4' && airforce.layout.right.length > 0" v-html="airforce.layout.right" :style="{fontSize:airforce.layout.rightFontSize+'px',transform: 'scale('+airforce.layout.rightFontScale+')'}"></span>
                    <div v-if="airforce.layout.type == '4'">
                        <span class="iconfont searchIcon" v-if="!airforce.layout.searchShow">&#xe61d;</span>
                        <span class="iconfont" v-else>确定</span>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>

    </div>

</template>

<script>
    import { Flexbox, FlexboxItem, XInput, Group, Popover } from  "vux"
    import { mapGetters, mapActions } from  "vuex"
    import ZSearch from '../../components/z-search'
    export default {
        name: "layout-header",
        components:{ Flexbox, FlexboxItem, XInput, Group, Popover, ZSearch },
        data(){
            return {
                scrollBool:'',
                Time:0,
                scrollY:0,
                showSearch:false,
            }
        },
        computed:{
            ...mapGetters(['airforce']),
            leftSpan(){
                if(this.airforce.layout.leftSpan){
                    return this.airforce.layout.leftSpan;
                }
                return '50';
            },
            rightSpan(){
                if(this.airforce.layout.rightSpan){
                    return this.airforce.layout.rightSpan;
                }
                return '50';
            },
            showSearchInit(){
                if(!this.airforce.showSearch){
                    this.showSearch = false;
                }
            }
        },
        methods:{
            ...mapActions(['action']),
            goback(){
                if(this.airforce.layout.left == '&#xe60a;'){
                    this.$router.back();
                }
            },
            clickLeft(){
                if(!this.airforce.layout.clickLeftBack){
                    this.airforce.layout.clickLeft();
                    return;
                }
                switch (this.airforce.layout.type){
                    case "1":
                        this.goback();
                        break;
                    case "2":
                        this.goback();
                        break;
                    case "3":
                        this.goback();
                        break;
                    case "4":
                        if(this.airforce.layout.searchShow){
                            this.action({
                                moduleName:'layout',
                                goods:{
                                    searchShow:false
                                }
                            });
                        }else {
                            this.goback();
                        }
                        break;
                    default:
                        this.airforce.layout.clickLeft();
                        break
                }
            },
            clickContent(){
                this.airforce.layout.clickContent();
            },
            clickRight(){
                if(this.airforce.layout.right == '&#xe668;' && this.airforce.layout.type != "4"){
                    this.$router.push('/Message');
                    return;
                }
                if(this.airforce.layout.type && this.airforce.layout.type == "4"){
                    if(this.airforce.layout.searchShow){
                        this.action({
                            moduleName:'layout',
                            goods:{
                                searchShow:false
                            }
                        });
                        this.search(this.airforce.layout.searchText);
                    }else {
                        this.action({
                            moduleName:'layout',
                            goods:{
                                searchShow:true
                            }
                        })
                    }
                }
                this.airforce.layout.clickRight();
            },
            search(val,_vm){
                this.airforce.layout.search(val,_vm);
            },
            onClose(val,select){
                this.airforce.layout.searchOnClose(val,select);
            },
            showSearchFun(){
                this.showSearch = true;
            },
            calc(){
                this.scrollY = window.scrollY;
                if(window.scrollY <= 5){
                    this.scrollBool = '';
                    return;
                }
                this.scrollBool = 'scrollBool';
            },
            init(){
                this.calc();
                window.addEventListener('touchstart',()=>{
                    this.calc();
                });
                window.addEventListener('touchmove',()=>{
                    this.calc();
                });
                window.addEventListener('touchend',()=>{
                    for(let i = 1 ; i < 100; i++){
                        setTimeout(()=>{
                            this.calc();
                        },30*i);
                    }
                });
            }
        },
        mounted(){
            this.init();
        },
        watch:{
            $route(){
                this.showSearch = false;
            },
            showSearch(val){
                this.action({
                    moduleName:"showSearch",
                    goods:val
                });
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color.less";
.layout-header{
    @h:@header_hright;
    @index:30px;
    @paIndex:15px;
    &.headerType1,
    &.headerType4,
    &.headerType3,
    &.headerType5{
        height: @h;
    }
    .layout-header-Box{
        background-color: @theme-color;
        color: @cor_ffffff;
        padding: 0 @paIndex;
        position: relative;
        z-index: 488;
        .box{
            line-height: @h;
            .left{
                span{
                    display: inline-block;
                    text-align: center;
                    font-size: 16px;
                }
            }
            .content{
                text-align: center;
                font-size: 18px;
                position: relative;
                .search-x-input{
                    position: absolute;
                    left: 0;
                    top: 5px;
                    height: @h - 10px;
                    line-height: @h - 10px;
                    font-size: 14px;
                    width: 100%;
                    background-color: @cor_ffffff;
                    padding: 0;
                    border-radius: @h;
                    padding: 0 5px;
                    margin: 0 -5px;
                    color: @cor_000000;
                    &:before{
                        border: none;
                        background-color: transparent;
                    }
                }
            }
            .right{
                .left;
                text-align: right;
                .searchIcon{
                    font-size: 20px;
                    transform: scale(1.4);
                }
            }
        }
        .init(){
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            padding: 0;
            z-index: 999;
            .box{
                .left{
                    .iconfont{
                        margin-left: @paIndex;
                    }
                }
                .right{
                    .iconfont{
                        margin-right: @paIndex;
                    }
                }
            }
        }
        &.type1,&.type4{
            .init;
        }
        &.type2{
            .init;
            background-color: transparent;
            margin-bottom: -@h;
            .box{
                .left{
                    span{
                        width: @index;
                        height: @index;
                        background-color: rgba(0,0,0,0.1);
                        line-height: @index;
                        border-radius: 100%;
                    }
                }
                .right{
                    .left;
                }
            }
        }
        &.type3{
            .init;
            background-color: transparent;
            color: @cor_000000;
        }
        &.scrollBool{
            background-color: @theme-color;
            color: @cor_ffffff;
        }
        &.type5{
            .init;
            background-color: @theme-color;
            padding: 0 @paIndex;
            .iconfont{
                color: @cor_ffffff;
            }
            .left{
                text-align: center !important;
            }
            .right{
                .left;
            }
            .content{
               background-color: @cor_ffffff;
                border-radius: 4px;
                height: @header_hright - 10px;
                text-align: left;
                .iconfont{
                    font-size: @header_hright - 10px;
                    line-height: @header_hright - 10px;
                    margin-left: @maTop;
                    color: @cor_a9a7ab;
                }
            }
        }
    }
}
</style>