<template>
    <div class="AreaSelectItem">
        <div class="SelectBox-List" v-if="showProvincesNew">
            <div v-for="item in list"  @click="selectProvinces(item)" class="SelectBox-List-item">{{item.name}}<span class="iconfont">&#xe798;</span></div>
        </div>
        <div class="SelectBox-List-Select" v-else  @click="clearProvinces">{{showProvincesSelect}}<span class="iconfont">&#xe61e;</span></div>
    </div>
</template>

<script>
    export default {
        name: "area-select-item",
        data(){
            return {
                showProvinces:true,
                showProvincesSelect:'',
            }
        },
        props:{
            list:{
                type:Array,
                default:()=>[],
            },
            value:null
        },
        methods:{
            selectProvinces(e){
                this.showProvinces = false;
                this.showProvincesSelect = e.name;
                this.$emit("on-change",e);
            },
            clearProvinces(){
                this.showProvinces = true;
                this.showProvincesSelect = '';
                this.$emit("on-hide");
            }
        },
        computed:{
            showProvincesNew(val){
                if(this.value && _.find(this.list,this.value)){
                    this.showProvincesSelect = this.value.name;
                    this.$emit("on-change",this.value);
                    return false;
                };
                return this.showProvinces;
            }
        }
    }
</script>

<style scoped lang="less">
@import "../assets/css/color.less";
.AreaSelectItem{
    .SelectBox-List{
        .SelectBox-List-item{
            background-color: @cor_ffffff;
            line-height: 40px;
            padding: 0 @paIndex;
            margin-bottom: 2px;
            overflow: hidden;
            &:active{
                background-color: @cor_e5e5e5;
            }
            .iconfont{
                float: right;
            }
        }
    }
    .SelectBox-List-Select{
        .SelectBox-List.SelectBox-List-item;
        background-color: @cor_d7e8f4;
        color: @theme-color;
    }
}
</style>