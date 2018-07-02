<template>
    <div class="rents">
        <div class="rents-top">
            <x-circle class="rents-circle" anticlockwise :percent="csbfb" :stroke-color="['#36D1DC', '#5B86E5']" trail-color="#e4e4e4" :stroke-width="4" :trail-width="4">
                <span class="circle-title">本月应收租金</span>
                <span class="zjnum">￥{{zjall}}</span>
            </x-circle>
            <div class="tx">
                <span>本月已收：￥850</span>
                <button @click.prevent="gotx">去提现</button>
            </div>
        </div>
        <div class="rents-bottom">
            <cell-box is-link link="/Wdyhk" class="rents-list">
                <span>我的银行卡</span>
            </cell-box>
             <cell-box is-link link="/Wdzj" class="rents-list">
                <span>我的租金</span>
            </cell-box>
        </div>
    </div>
</template>
<script>
import {XCircle ,CellBox} from "vux"
import { setTimeout } from 'timers';
export default {
    name:"Rents",
    data(){
        return{
            msg:"收租",
            csbfb:0,//圆饼图的初始百分比（0）
            bfb:81,//圆饼图的百分比
            zjall:1800,//本月应收租金
        }
    },
    components:{
        XCircle ,
        CellBox
    },
    methods:{
        gotx(){
            this.$router.push("/Tx")
        }
    },
    created(){
        let time=setInterval(()=>{
            if(this.csbfb==this.bfb){
                clearInterval(time);
             }else{
               this.csbfb+=1;
             }
        },10)
        
    }
}
</script>
<style lang="less" scoped>
.rents{
    .rents-top{
        padding-top: 25px;
        padding-bottom: 25px;
        background: #4981ac;
        text-align: center;
        .rents-circle{
            display: block;
            width: 200px;
            height: 200px;
            margin: 0 auto; 
            .circle-title{
                display: block;
                text-align: center;
                color:rgb(54, 209, 220);
                color: white;
            }
            .zjnum{
                display: block;
                text-align: center;
                font-size: 20px;
                color: white;
            }
        }
        .tx{
            padding: 0 15px;
            margin-top: 20px;
            color: #fff;
            font-size: 14px;
            button,button:focus{
                margin-left: 10px;
                background:transparent;
                padding: 2px 3px;
                border: 1px solid #fff;
                border-radius: 3px;
                color: #fff;
                outline: none;
            }
            
        }
    }
    .rents-bottom{
        .rents-list{
            background: #fff;
        }
    }
}
</style>
