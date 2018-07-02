<template>
    <div class="filters">
        <div class="filters-flexbox" v-if="filters.length > 0">
            <x-address class="filters-x-address" v-model="xAddressVal" title="title" @on-hide="hideArea" :show="showXAddress" :list="list" :raw-value="true"></x-address>
            <flexbox class="filters-flexbox-box">
                <flexbox-item @click.native="initList(item,index)" v-for="(item,index) in filtersMenu" :key="`filtersMenu${index}`">
                    <div :class="`iconfont ${(airforce[moduleName][item.field])? 'select' : ''}`"><span>{{item.name}}</span>&#xe629;</div>
                </flexbox-item>
            </flexbox>
        </div>
        <div :class="`filters-moreBox-bj filters-columnBox-bj ${(columnShow)? 'in' : 'out'}`" ref="filters_columnBox_bj" @click="columnBoxHide"></div>
        <div :class="`filters-moreBox filters_columnBox ${(columnShow)? 'in' : (columnShowBool)? 'out' : ''}`" ref="filters_columnBox">
            <group gutter=0>
                <radio :value="radioVal" :options="list" @on-change="hideArea"></radio>
            </group>
        </div>
        <div :class="`filters-moreBox-bj ${(moreShow)? 'in' : 'out'}`" ref="filters_moreBox_bj" @click="moreBoxHide"></div>
        <div :class="`filters-moreBox ${(moreShow)? 'in' : (moreShowBool)? 'out' : ''}`" ref="filters_moreBox">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XAddress, Group, Radio } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: "z-filters",
        components:{ Flexbox, FlexboxItem, XAddress, Group, Radio },
        props:{
            moduleName:{
                //vuex模块名
                type:String,
                default:'filters',
            },
            filters:{
                /*
                {
                    field:'rent2',//字段名
                    name:'租金2',//默认显示名
                    index:0,//显示数据的索引值
                    list:[{},....],//筛选的数据
                    type:1,//筛选数据的展示类型【1或2或不给值】
                    showText:false,//是否显示筛选数据,前提type字段为1
                }
                * */
                type:Array,
                default:()=>[]
            }
        },
        data(){
            return {
                list:[],
                showXAddress:false,
                xAddressVal:[],
                field:null,
                radioVal:null,
                showText:true,
                filtersMenuIndex:0,
                selectValIndex:0,
                moreShow:false,
                moreShowBool:false,
                columnShowBool:false,
                columnShow:false,
            }
        },
        methods:{
            ...mapActions(['action']),
            initList(item,index){
                if(this.columnShow){
                    this.columnShow = false;
                    return;
                };
                if(item.type == 1 && item.showText === false){
                    this.showText = false;
                }else {
                    this.showText = true;
                };
                switch (item.type){
                    case 1:
                        if(this.airforce[this.moduleName] && this.airforce[this.moduleName][item.field]){
                            this.radioVal = this.airforce[this.moduleName][item.field];
                        };
                        this.list = item.list.map(e=>{
                            e.key = e.key.split(item.field)[0] + item.field;
                            return e;
                        });
                        this.field = item.field;
                        this.columnShow = true;
                        this.filtersMenuIndex = index;
                        break;
                    case 2:
                        this.moreShow = true;
                        this.moreShowBool = true;
                        break;
                    default:
                        this.list = item.list;
                        this.showXAddress = true;
                        this.field = item.field;
                        this.filtersMenuIndex = index;
                        this.selectValIndex = item.index;
                        break;
                }
            },
            hideArea(value,label){
                if(label){
                    this.action({
                        moduleName:this.moduleName,
                        goods:_.set({},this.field,value)
                    });
                    this.action({
                        moduleName:this.moduleName,
                        goods:_.set({},this.field+"_select",{key:value,value:label})
                    });
                    if(this.showText){
                        this.filtersMenu[this.filtersMenuIndex].name = label;
                    };
                    this.$emit("on-change",this.airforce[this.moduleName]);
                    return;
                }
                this.showXAddress = false;
                if(this.xAddressVal.length > 0 && this.field){
                    this.action({
                        moduleName:this.moduleName,
                        goods:_.set({},this.field,this.xAddressVal)
                    });
                    this.action({
                        moduleName:this.moduleName,
                        goods:_.set({},this.field+"_select",_.find(this.list,{value:this.xAddressVal[this.selectValIndex]}))
                    });
                    if(this.airforce[this.moduleName][this.field+"_select"]){
                        this.filtersMenu[this.filtersMenuIndex].name = this.airforce[this.moduleName][this.field+"_select"].name;
                    }
                    this.$emit("on-change",this.airforce[this.moduleName]);
                }
            },
            moreBoxHide(){
                this.moreShow = false;
            },
            columnBoxHide(){
                this.columnShow = false;
            },
            init(refs = []){
                for(let i = 0 ; i < refs.length ; i++){
                    try{
                        this.$refs[`filters_${refs[i]}_bj`].addEventListener('touchmove',ev=>{
                            ev.preventDefault();
                        },false);
                        let evYstart = null;
                        let filters_Box = this.$refs[`filters_${refs[i]}`];
                        filters_Box.addEventListener('touchstart',event=>{
                            evYstart = event.touches[0].clientY;
                        },false);
                        filters_Box.addEventListener('touchmove',event=>{
                            var evY = event.touches[0].clientY - evYstart;
                            var scrollTop = filters_Box.scrollTop,
                                scrollHeight = filters_Box.scrollHeight,
                                height = filters_Box.clientHeight;
                            if(evY > 0){
                                //下
                                if(scrollTop <= 0){
                                    event.preventDefault();
                                }
                            }else {
                                //上
                                if(scrollHeight - height - scrollTop <= 0){
                                    event.preventDefault();
                                }
                            }
                        },false);
                    }catch (e){}
                }
            }
        },
        computed:{
            ...mapGetters(['airforce']),
            filtersMenu(){
                return this.filters;
            }
        },
        mounted(){
            this.init(['moreBox','columnBox']);
        }
    }
</script>

<style scoped lang="less">
@import "../assets/css/animate.min.less";
@import "../assets/css/color.less";
.filters{
    .filters-flexbox{
        height: @header_hright;
        .filters-x-address{
            display: none;
        }
        .filters-flexbox-box{
            background-color: @cor_ffffff;
            color:@cor_a9a7ab;
            text-align: center;
            line-height: 40px;
            position: fixed;
            left: 0;
            top:@header_hright;
            width: 100%;
            z-index: 400;
            font-size: 14px;
            border-bottom: 1px solid @cor_91c8f2;
            .select{
                color: @theme-color;
            }
        }
    }
    .filters-moreBox-bj{
        position: fixed;
        left: 0;
        top: @header_hright;
        width: 100%;
        height: 100%;
        z-index: 401;
        background-color: @rgba_000000_5;
        display: none;
        &.in{
            display: block;
        }
        &.out{
            display: none;
        }
        &.filters-columnBox-bj{
            z-index: 398;
        }
    }
    .filters-moreBox{
        position: fixed;
        right: 0;
        top: @header_hright;
        width: 50%;
        height: 80%;
        height: ~'calc(100% - @{header_hright} - @{footer_hright} - @{paIndex})';
        padding:@paIndex;
        border-bottom: 1000px solid @cor_ffffff;
        background-color: @cor_ffffff;
        z-index: 402;
        overflow-x: hidden;
        display: none;
        .animated;
        &.in{
            .fadeInRight;
            display: block;
        }
        &.out{
            .fadeOutRight;
            display: block;
        }
        &.filters_columnBox{
            z-index: 399;
            width: 100%;
            padding: 0;
            height: auto;
            border: none;
            top: @header_hright*2;
            background-color: transparent;
            max-height: 60%;
            &.in{
                .fadeInDown;
            }
            &.out{
                .fadeOutDown;
            }
            &/deep/ .weui-cell{
                padding: 5px @paIndex;
            }
        }
    }
}
</style>