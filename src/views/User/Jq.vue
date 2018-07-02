<template>
    <div class="Jq">
        <div class="Jq-content">
            <x-input class="jq-list" title="借多少" text-align="right" :placeholder="'最多可借'+ed+'元'"></x-input>
            
            <group class="jq-list" gutter="0">
                <x-address  v-model="zmy" title="怎么用" placeholder="请选择" :list="zmylist" ></x-address>
            </group>
            <group class="jq-list" gutter="0">
                <x-address  v-model="jdj" title="借多久" inline-desc="可提前还款，利息按天计算" placeholder="请选择" :list="jdjlist" ></x-address>
            </group>
            <group class="jq-list" gutter="0">
                <x-address  v-model="zmh" title="怎么还" placeholder="请选择" :list="zmhlist" ></x-address>
            </group>
            <group class="jq-list" gutter="10">
                <cell title="还款日" value="value">每月17日<span class="iconfont zs">&#xe64b;</span></cell>
            </group>
            <x-input class="jq-list" title="总利息" text-align="right" :placeholder="lx" disabled></x-input>
        </div>
        <button @click.prevent="gojq">确定</button>
    </div>
</template>
<script>
import {CellBox,XInput,Cell,XAddress,Group  } from "vux"
export default {
    name:"Jq",
    data(){
        return{
            msg:"借钱",
            lx:"0.00",
            ed:20000,
            zmy:['租房贷款'],
            zmylist:[
                    {name:"租房贷款",value:'0'},
                    {name:"助学基金",value:'1'},
                    {name:"我想怎么用就怎么用",value:'2'},
                ],
            jdj:['一个月'],
            jdjlist:[
                {name:"一个月",value:'0'},
                {name:"两个月",value:'1'},
                {name:"三个月   ",value:'2'},
            ],
            zmh:['3期'],
            zmhlist:[
                {name:"3期",value:'0'},
                {name:"6期",value:'1'},
                {name:"12期",value:'2'},
            ]
        }
    },
    components:{
        CellBox ,
        XInput ,
        Cell,
        XAddress,
        Group 
    },
    methods:{
        gojq(){//点击确定触发
            this.$router.back();
        }
    }
}
</script>
<style lang="less" scoped>
 input,input:focus{
     border:none;
     outline:none;
 }
button,
button:focus {
  border: none;
  outline: none;
}
.Jq{
    .Jq-content{
        .jq-list{
            background: #fff; 
            .zs{
                color: #1296db;
                margin-left: 5px;
            }  
        }
        
    }
    button{
        display: block;
    width: 90%;
    border-radius: 7px;
    background: #108ee9;
    color: #fff;
    margin: 0 auto;
    margin-top: 30px;
    line-height: 40px;
    font-size: 18px;
    }
}
</style>
