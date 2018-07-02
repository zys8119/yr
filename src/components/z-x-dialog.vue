<template>
    <div class="z-x-dialog">
        <cell v-if="airforce[this.moduleName] && airforce[this.moduleName][this.fieldName] && airforce[this.moduleName][this.fieldName].length != 0" class="z-x-dialog-cell select" @click.native="showDialog" :title="title" :value="airforce[this.moduleName][this.fieldName].length" :is-link="true"></cell>
        <cell v-else class="z-x-dialog-cell" @click.native="showDialog" :title="title" :value="placeholder" :is-link="true"></cell>
        <x-dialog :show.sync="show" class="dialog-demo" :hide-on-blur="true">
            <div class="title">
                <span v-if="editorShow" class="editor closeEditor" @click="closeEditor">完成</span>
                <span v-else class="iconfont editor" @click="editor">&#xe627;</span>
                {{alert}}
                <span class="iconfont close" @click="close">&#xe7b7;</span>
            </div>
            <checker class="list" v-model="CheckboxMax" :max="1000" type="checkbox" default-item-class="list-item" selected-item-class="list-item-selected">
                <div v-if="editorShow" class="editor-item" :value="item" v-for="(item,index) in CheckboxList" :key="`z-x-dialog-checker-editor${index}`">
                    <x-input type="number" :show-clear="false" class="editor-item-x-input" :value="item" @on-change="change($event,index)"></x-input>
                </div>
                <checker-item v-if="!editorShow" :value="item" v-for="(item,index) in CheckboxList" :key="`z-x-dialog-checker${index}`">{{item | dialog_checker}}</checker-item>
                <checker-item v-if="!editorShow" class="iconfont add" @click.native="add" value="add">&#xe6d1;</checker-item>
            </checker>
        </x-dialog>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import { XDialog, Cell, Checker, CheckerItem, XInput } from "vux"
    export default {
        name: "z-x-dialog",
        components:{ XDialog, Cell, Checker, CheckerItem, XInput },
        props:{
            moduleName:{
                type:String,
                default:'zXDialog'
            },
            fieldName:{
                type:String,
                default:'zXDialog'
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
                show:false,
                editorShow:false,
                CheckboxList:[1,2,3],
                CheckboxMax:[]
            }
        },
        methods:{
            ...mapActions(['action']),
            close(){
                this.show = false;
            },
            editor(){
                this.editorShow = true;
            },
            closeEditor(){
                this.editorShow = false;
            },
            change(val,index){
                this.CheckboxList[index] = parseInt(val);
                this.CheckboxMax = this.CheckboxMax.filter(e=>{
                    if(this.CheckboxList.indexOf(e) > -1){
                        return e;
                    };
                });
            },
            showDialog(){
                this.show = true;
            },
            add(){
                this.CheckboxList.push(this.CheckboxList.length + 1);
            }
        },
        computed:{
            ...mapGetters(['airforce']),
        },
        watch:{
            show(val){
                if(!val){
                    this.action({
                        moduleName:this.moduleName,
                        goods:_.set({},this.fieldName,null)
                    });
                    this.action({
                        moduleName:this.moduleName,
                        goods:_.set({},this.fieldName,this.CheckboxMax.filter(e=>e != 'add'))
                    });
                    this.editorShow = false;
                }
            }
        }
    }
</script>

<style scoped lang="less">
@import "../assets/css/color.less";
.z-x-dialog{
    &/deep/ .z-x-dialog-cell{
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
    .dialog-demo{
        .title{
            background-color: @theme-color;
            color: @cor_ffffff;
            line-height: 40px;
            .close{
                @index:40px;
                position: absolute;
                right: 0;
                top: 0;
                color: @cor_ffffff;
                width: @index;
                height: @index;
                line-height: @index;
                text-align: center;
                border-radius: 100%;
                font-size: 18px;
            }
            .editor{
                .close;
                right: initial;
                left: 0;
                &.closeEditor{
                    font-size: 12px;
                    text-align: center;
                }
            }
        }
        .list{
            min-height: 150px;
            overflow: hidden;
            padding-bottom: 20px;
            @index:40px;
            .list-item{
                width: @index;
                height: @index;
                float: left;
                border-radius: 100%;
                border: 1px solid @cor_d7e8f4;
                line-height: @index;
                text-align: center;
                color: @cor_a9a7ab;
                margin: @maTop 0;
                margin-left: @maTop;
                background-color: transparent;
            }
            .list-item-selected {
                border: 1px solid @theme-color;
                background-color: @theme-color;
                color: @cor_ffffff;
            }
            .add{
                .list-item;
                &:active{
                    background-color: @cor_e5e5e5;
                }
            }
            &/deep/ .editor-item{
                .list-item;
                position: relative;
                overflow: hidden;
                 .editor-item-x-input{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    padding: 0;
                    line-height: @index;
                    color: @cor_000000;
                    text-align: center;
                    input{
                        line-height: @index;
                        height: @index;
                        text-align: center;
                    }
                }
            }
        }
    }

}
</style>