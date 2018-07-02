<template>
    <div class="ZPopup">
        <cell :class="`z-popup-cell ${(value > 0)? 'select' : ''}`" :title="title" :value="value" :is-link="true" @click.native="onShow"></cell>
        <popup v-model="popupShow" class="HousingSelect">
            <div class="popupBox">
                <div class="title"><span>{{alert}}</span><x-button class="HousingSwlect-btn" @click.native="close">确定</x-button></div>
                <ul class="list">
                    <li class="list-item" v-for="listItem in list">
                        <z-popup-item :index="listItem" @on-change="onChange"></z-popup-item>
                    </li>
                </ul>
            </div>
        </popup>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import { Cell, XButton, Popup } from "vux"
    import ZPopupItem from './z-popup-item.vue'
    export default {
        name: "z-popup",
        components:{ Cell, XButton, Popup, ZPopupItem },
        props:{
            moduleName:{
                type:String,
                default:'zPopup'
            },
            fieldName:{
                type:String,
                default:'zPopup'
            },
            list:{
                type:Array,
                default:()=>[]
            },
            title:{
                type:String,
                default:''
            },
            placeholder:{
                type:String,
                default:''
            },
            alert:{
                type:String,
                default:''
            },
        },
        data(){
            return {
                popupShow:false,
                popupSelectData:{}
            }
        },
        methods:{
            ...mapActions(['action']),
            onShow(){
                this.popupShow = true;
            },
            close(){
                this.popupShow = false;
            },
            onChange(val,key){
                this.popupSelectData[key] = null;
                this.popupSelectData = _.merge(this.popupSelectData,val);
            },
            setData(){
                this.action({
                    moduleName:this.moduleName,
                    goods:_.set({},this.fieldName,null)
                });
                this.action({
                    moduleName:this.moduleName,
                    goods:_.set({},this.fieldName,this.popupSelectData)
                });
            }
        },
        computed:{
            ...mapGetters(['airforce']),
            value(){
                if(this.airforce[this.moduleName] && this.airforce[this.moduleName][this.fieldName]){
                    let data = this.airforce[this.moduleName][this.fieldName];
                    let index = 0;
                    for(let  k in data){
                        if(data[k].length > 0){
                            index += data[k].length;
                        };
                    };
                    if(index > 0){
                        return index;
                    }
                    return this.placeholder;
                }
                return this.placeholder;
            }
        },
        watch:{
            popupShow(val){
                if(!val){
                    this.setData();
                }
            },
            list(val){
                let keys = Object.keys(this.popupSelectData);
                keys.forEach(e=>{
                    if(val.indexOf(parseInt(e)) < 0 ){
                        delete this.popupSelectData[e];
                    }
                });
                this.setData();
            }
        }
    }
</script>

<style scoped lang="less">
@import "../assets/css/color.less";
.ZPopup{
    &/deep/ .z-popup-cell{
        position: relative;
        &:after{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            border-top: 1px solid #D9D9D9;
            color: #D9D9D9;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            left: 15px;
        }
        &.select{
            .weui-cell__ft{
                color: @cor_000000;
            }
        }
    }
    &/deep/ .HousingSelect{
        @r:20px;
        border-radius: @r @r 0 0;
        overflow: hidden;
        background-color: @themeBj-color;
        min-height: 80%;
        .popupBox{
            .title{
                @index:40px;
                line-height: @index;
                background-color: @theme-color;
                color: @cor_ffffff;
                padding:0 @paIndex;
                overflow: hidden;
                &:before{
                    content: '';
                    position: absolute;
                    line-height: 0;
                    top: @index/3;
                    height: @index/3;
                    width: 4px;
                    background-color: @cor_ffffff;
                }
                span{
                    margin-left: @maTop;
                }
                .HousingSwlect-btn{
                    @index2:14px;
                    width: auto;
                    line-height: @index - @index2;
                    font-size: 12px;
                    padding: 0 @maTop;
                    float: right;
                    margin-top: @index2/2;
                    color: @theme-color;
                }
            }
            .list{
                .list-item{
                    margin-bottom: 2px;
                }
            }
        }
    }
}
</style>