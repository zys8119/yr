<template>
    <div class="AreaSelect">
        <cell :class="`${(value || valueSelect) ? 'cell-select' : ''}  ${(addressNew.length == 0)? 'address' : ''}`" :title="title" :inline-desc="addressNew" :value="valueNew" :is-link="isLink" @click.native="SelectBoxHind"></cell>
        <div class="SelectBox" v-if="showSelectBox" :style="{backgroundColor:airforce.layout.bodyColor}">
            <layout-header></layout-header>
            <area-select-item :value="provinces" :list="provincesData" @on-change="provincesChange" @on-hide="provincesHide"></area-select-item>
            <area-select-item :value="city" v-if="cityVal" :list="cityData" @on-change="cityChange" @on-hide="cityHide"></area-select-item>
            <area-select-item :value="area" v-if="areaVal" :list="areaData" @on-change="areaChange" @on-hide="areaHide"></area-select-item>
            <x-input v-if="addressShow" v-model="address" :class="{AreaSelectXIinput:true,select:addressClassBool}" :placeholder="areaPlaceholder"></x-input>
        </div>
    </div>
</template>

<script>
    import { Cell, ChinaAddressV4Data, XInput } from 'vux'
    import  LayoutHeader  from '@/views/Layout/LayoutHeader.vue'
    import { mapGetters, mapActions} from 'vuex'
    import AreaSelectItem from './AreaSelectItem'
    export default {
        name: "area-select",
        components:{ Cell, LayoutHeader, AreaSelectItem, XInput },
        data(){
            return {
                showSelectBox:false,
                pageHeaderData:{},
                cityVal:null,
                areaVal:null,
                addressShow:false,
                addressClassBool:false,
                provinces:null,
                city:null,
                area:null,
                address:'',
                valueSelect:null,
            }
        },
        props:{
            moduleName:{
                type:String,
                default:'AreaSelect'
            },
            fieldName:{
                type:String,
                default:'AreaSelect'
            },
            title:{
                type:String,
                default:''
            },
            placeholder:{
                type:String,
                default:''
            },
            areaPlaceholder:{
                type:String,
                default:'请输入详细地址,如：下应北路110号'
            },
            value:{
                type:String,
                default:null
            },
            isLink:{
                type:Boolean,
                default:false
            },
            isAddress:{
                type:Boolean,
                default:true
            }
        },
        methods:{
            ...mapActions(['action']),
            SelectBoxHind(){
                this.showSelectBox = true;
            },
            publicFun(){
                this.action({
                    moduleName:'layout',
                    goods:this.pageHeaderData
                });
                this.showSelectBox = false;
            },
            init(){
                try {
                    this.pageHeaderData = JSON.parse(JSON.stringify(this.airforce.layout));
                    const initData = {
                        cityVal:null,
                        areaVal:null,
                        addressShow:false,
                        addressClassBool:false,
                        provinces:null,
                        city:null,
                        area:null,
                        address:'',
                        valueSelect:null,
                    };
                    const moduleNameData = this.airforce[this.moduleName];
                    if(moduleNameData && moduleNameData[this.fieldName]){
                        const fieldName = moduleNameData[this.fieldName];
                        if(fieldName.address){
                            initData.address = fieldName.address;
                        }
                        if(fieldName.provinces){
                            initData.provinces = fieldName.provinces;
                        }
                        if(fieldName.city){
                            initData.city = fieldName.city;
                        }
                        if(fieldName.area){
                            initData.area = fieldName.area;
                        }
                        if(fieldName.provinces && fieldName.city && fieldName.area){
                            initData.valueSelect = `${fieldName.provinces.name}、${fieldName.city.name}、${fieldName.area.name}`;
                        }
                    }
                    for(let  k in initData){
                        this[k] = initData[k];
                    };
                    this.action({
                        moduleName:'layout',
                        goods:{
                            title:'地区选择',
                            right:'确定',
                            type:'1',
                            rightSpan:'100',
                            clickLeftBack:false,
                            clickLeft:()=>{
                                this.publicFun();
                            },
                            clickRight:()=>{
                                let AreaSelectData = {
                                    provinces:this.provinces,
                                    city:this.city,
                                    area:this.area,
                                    address:this.address,
                                };
                                if(!AreaSelectData.provinces){
                                    this.$vux.toast.text("请选择省份");
                                    return;
                                };
                                if(!AreaSelectData.city){
                                    this.$vux.toast.text("请选择市");
                                    return;
                                };
                                if(!AreaSelectData.area){
                                    this.$vux.toast.text("请选区");
                                    return;
                                };
                                if(this.$utils.is_S(AreaSelectData.address) && this.isAddress){
                                    this.$vux.toast.text("请输入详细地址");
                                    return;
                                };
                                this.valueSelect = `${this.provinces.name}、${this.city.name}、${this.area.name}`;
                                AreaSelectData.valueSelect = this.valueSelect;
                                this.action({
                                    moduleName:this.moduleName,
                                    goods:_.set({},this.fieldName,AreaSelectData)
                                });
                                this.publicFun();
                            }
                        }
                    })
                }catch (e){}
            },
            provincesChange(e){
                this.cityVal = e.value;
                this.provinces = e;
            },
            provincesHide(){
                this.cityVal = null;
                this.areaVal = null;
                this.addressShow = false;
                this.provinces = null;
                this.city = null;
                this.area = null;
                this.address = '';
            },
            cityChange(e){
                this.areaVal = e.value;
                this.city = e;
            },
            cityHide(){
                this.areaVal = null;
                this.addressShow = false;
                this.city = null;
                this.area = null;
                this.address = '';
            },
            areaChange(e){
                this.addressShow = true;
                this.area = e;
            },
            areaHide(){
                this.addressShow = false;
                this.area = null;
            },
        },
        computed:{
            ...mapGetters(['airforce']),
            provincesData(){
                return ChinaAddressV4Data.filter(e=>!e.parent);
            },
            cityData(){
                if(this.cityVal){
                    return ChinaAddressV4Data.filter(e=>e.parent == this.cityVal);
                }
                return [];
            },
            areaData(){
                if(this.areaVal){
                    return ChinaAddressV4Data.filter(e=>e.parent == this.areaVal);
                }
                return [];
            },
            valueNew(){
                if(this.valueSelect){
                    return this.valueSelect;
                };
                if(this.value){
                    return this.value;
                };
                try {
                    const moduleNameData = this.airforce[this.moduleName][this.fieldName];
                    if(moduleNameData.provinces && moduleNameData.city && moduleNameData.area){
                        this.valueSelect = `${moduleNameData.provinces.name}、${moduleNameData.city.name}、${moduleNameData.area.name}`;
                        return this.valueSelect;
                    }
                }catch (e){}
                return this.placeholder;
            },
            addressNew(){
                try {
                    if(this.airforce[this.moduleName][this.fieldName].address){
                        return this.airforce[this.moduleName][this.fieldName].address;
                    }
                }catch (e){}
                return this.address;
            }
        },
        watch:{
            showSelectBox(val){
                if(val){
                    this.init();
                }else {
                    this.publicFun();
                }
            },
            addressNew(val){
                if(val.length > 0){
                    this.addressClassBool = true;
                }else {
                    this.addressClassBool = false;
                }
            },
        },
        mounted(){
            // this.init();
        }
    }
</script>

<style scoped lang="less">
@import "../assets/css/color.less";
.AreaSelect{
    &/deep/ .cell-select{
        padding-bottom: 40px;
        position: relative;
        .weui-cell__ft{
            color: @cor_000000;
        }
        .vux-label-desc{
            position: absolute;
            right: @paIndex;
            bottom: 0;
            width: 90%;
            line-height: 40px;
            .textNowrap();
            text-align: right;
        }
        &.address{
            padding-bottom: @paIndex;
        }
    }
    .SelectBox{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 600;
        overflow-x: hidden;
        .AreaSelectXIinput{
            background-color: @cor_ffffff;
            padding: 0 @paIndex;
            line-height: 40px;
            margin-bottom: 2px;
            &.select{
                background-color: @cor_d7e8f4;
                color: @theme-color;
            }
        }
    }
}
</style>