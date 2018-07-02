<template>
    <div class="z-popup-item">
        <div class="list-item-top" @click="see">
            <flexbox class="list-item-top-flexbox">
                <flexbox-item span="30" :class="`iconfont left ${(CheckboxMaxNew.length > 0)? 'select' : ''}`">&#xe647;</flexbox-item>
                <flexbox-item>{{index}}楼</flexbox-item>
                <flexbox-item v-if="seelist" span="30" class="iconfont right">&#xe798;</flexbox-item>
                <flexbox-item v-else span="30" class="iconfont right">&#xe797;</flexbox-item>
            </flexbox>
        </div>
        <checker v-if="seelist" class="list-item-bottom-flexbox" v-model="CheckboxMax" :max="1000" type="checkbox" default-item-class="list-item-bottom-flexbox-item" selected-item-class="list-item-bottom-flexbox-item-selected">
            <checker-item :value="item" v-for="(item,index) in CheckboxList" :key="`z-x-dialog-checker${index}`">{{item | dialog_checker}}</checker-item>
            <checker-item class="list-item-bottom-flexbox-item iconfont add" @click.native="add" value="add">&#xe6d1;</checker-item>
        </checker>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, Checker, CheckerItem } from 'vux'
    export default {
        name: "z-popup-item",
        components: { Flexbox, FlexboxItem, Checker, CheckerItem },
        props:{
          index:''
        },
        data(){
            return {
                CheckboxMax:[],
                seelist:false,
                CheckboxList:[this.index+'01'],
            }
        },
        methods:{
            add(){
                let max = Math.max.apply([],this.CheckboxList.map(e=>parseInt(e))) + 1;
                this.CheckboxList.push(max.toString());
                this.$emit('add',this.CheckboxMax,max,this.CheckboxList)
            },
            see(){
                this.seelist = !this.seelist;
            },
        },
        computed:{
            CheckboxMaxNew(){
                return this.CheckboxMax.filter(e=>e != 'add');
            },
        },
        watch:{
            CheckboxMax(){
                let select = _.set({},this.index.toString(),this.CheckboxMax.filter(e=>e != 'add'));
                this.$emit('on-change',select,this.index,this.CheckboxList);
            },
            index(val){
                try {
                    let parent = this.$parent.$parent;
                    let CheckboxMax = parent.airforce[parent.moduleName][parent.fieldName][val];
                    if(CheckboxMax){
                        this.CheckboxMax = CheckboxMax;
                        let max = Math.max.apply([],this.CheckboxMax.map(e=>parseInt(e))) + 1;
                        if(typeof max == 'number'){
                           let len = parseInt(max.toString().slice(val.toString().length));
                           this.CheckboxList = [];
                           for(let i = 1 ; i < len; i++){
                               let  str = '';
                               if(i < 10){
                                   str = '0';
                               }
                               this.CheckboxList.push(val + str + i)
                           }
                        };
                    };
                }catch (e){ }
            }
        }
    }
</script>

<style scoped lang="less">
@import "../assets/css/color.less";
.z-popup-item{
    .list-item-top{
        background-color: @cor_ffffff;
        padding: 0 @paIndex;
        &:active{
            background-color: @cor_d7e8f4;
        }
        .list-item-top-flexbox{
            line-height: 40px;
            .left{
                font-size: 20px;
                color: @cor_d7e8f4;
                &.select{
                    color: @theme-color;
                }
            }
        }
    }
    &/deep/ .list-item-bottom-flexbox{
        padding-left: @paIndex;
        padding-top: @maTop;
        .list-item-bottom-flexbox-item{
            background-color: @cor_ffffff;
            color: @cor_000000;
            margin-right: @paIndex;
            margin-bottom: @maTop;
            text-align: center;
            border-radius: 6px;
            padding: 0 @paIndex;
        }
        .list-item-bottom-flexbox-item-selected{
            background-color: @theme-color;
            color: @cor_ffffff;
        }
        .add{
            .list-item-bottom-flexbox-item;
        }
    }
}
</style>