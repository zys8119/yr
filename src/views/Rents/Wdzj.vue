<template>
    <div class="wdzj">
        <tab class="headtab" v-model="index" bar-active-color='#e19d3d' active-color='#e19d3d' default-color='#a9a7ab'>
            <tab-item :selected="index == 0"  v-for="(item,index) in tabs" :key="index">{{item.title}}</tab-item>
        </tab>
        <swiper v-model="index" class="tabcontent" :aspect-ratio="1/2" :show-dots="false" >
            <swiper-item v-for="(item,index) in tabs" :key="index"> 
                <div class="tabcontent-item">
                    <div class="none" v-if="dzhave">
                        <img :src="require('@/assets/img/User/nocontent.jpg')">
                        <p>暂无到账租金</p>
                    </div>
                    <cell-box class="list-item" v-else v-for="(listItem,listIndex) in item.list" :key="listIndex">
                        <p>{{listItem.dz}}</p>
                        <div class="item-top">
                            <span v-if="(listItem.bs=='dz')? true:false">{{listItem.person}}</span>
                            <span v-else-if="(listItem.bs=='tx')? true:false">{{listItem.bank}}</span>
                            <span v-if="(listItem.bs=='dz')? true:false">+{{listItem.money}}</span>
                            <span v-else-if="(listItem.bs=='tx')? true:false" :style="'color:'+listItem.color+';'">-{{listItem.money}}</span>
                        </div>
                        <div class="item-bottom">
                            <span>{{listItem.etime}}</span>
                            <span v-if="(listItem.bs=='dz')? true:false">租金已到账</span>
                            <span v-else-if="(listItem.bs=='tx')? true:false">{{listItem.state}}</span>
                        </div>
                            
                        
                    </cell-box>
                </div>
            </swiper-item>
        </swiper>
    </div>
</template>
<script>
import {Tab, TabItem,Swiper, SwiperItem,CellBox} from "vux"
export default {
    name:"Wdzj",
    data(){
        return{
            msg:"我的租金",
            index:0,
            dzhave:false,
            tabs:[
                {
                    title:"到账租金",
                    list:[{
                        dz:"宁波市鄞州区邱噶镇御景水岸花园99幢99楼9901室",
                        person:"租客1",
                        money:"1200",
                        etime:"2018-10-02 12:54:33",
                        bs:"dz"
                    },
                    {
                        dz:"宁波市鄞州区邱噶镇御景水岸花园99幢99楼9901室",
                        person:"租客1",
                        money:"1200",
                        etime:"2018-10-02 12:54:33",
                        bs:"dz"
                    },
                    {
                        dz:"宁波市鄞州区邱噶镇御景水岸花园99幢99楼9901室",
                        person:"租客1",
                        money:"1200",
                        etime:"2018-10-02 12:54:33",
                        bs:"dz"
                    }]
                },
                {
                    title:"租金提现",
                    list:[{
                        state:"已到账",
                        color:"#91c43d",
                        bank:"网商银行（尾号3268）",
                        money:"1200",
                        etime:"2018-10-02 12:54:33",
                        bs:"tx"
                    },
                    {
                        state:"处理中",
                        color:"#1b82d2",
                        bank:"网商银行（尾号3268）",
                        money:"1200",
                        etime:"2018-10-02 12:54:33",
                        bs:"tx"
                    },
                    {
                        state:"提现失败",
                        color:"#e53e1c",
                        bank:"网商银行（尾号3268）",
                        money:"1200",
                        etime:"2018-10-02 12:54:33",
                        bs:"tx"
                    }]
                }
            ]
        }
    },
    components:{
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        CellBox
    },
    methods:{

    }    
}
</script>
<style lang="less" scoped>
.none {
  position: relative;
  top: 100px;
  padding: 120px 0;
  margin: 0 auto;
  img {
    display: block;
    margin: 0 auto;
    width: 30%;
    padding-bottom: 15px;
  }
  p {
    text-align: center;
    font-size: 20px;
    color: #c5c5c5;
  }
}
.wdzj{
    .headtab {
        position: fixed;
        left: 0;
        top: 41px;
        width: 100%;
        z-index: 10;
    }
    &/deep/ .tabcontent,.vux-slider {
        margin-top: 44px;
        overflow: visible;
        display: block;
        .vux-swiper {
            height: auto!important;
            min-height: 100% !important;
            width: 100%;
            overflow: visible;
             .vux-swiper-item {
                 height: 100%;
                 .tabcontent-item {
                     .list-item{
                         display: block;
                         p{
                             font-size: 16px;
                             overflow : hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                         }
                         .item-top{
                             overflow: hidden;
                             line-height: 30px;
                             span:nth-child(1){
                                 display: block;
                                 float: left;
                             }
                             span:nth-child(2){
                                 display: block;
                                 float: right;
                                 color: #e53e1a;
                             }
                         }   
                         .item-bottom{
                             overflow: hidden;
                             line-height: 30px;
                             span:nth-child(1){
                                 display: block;
                                 float: left;
                                 color: #999999;
                                 font-size: 14px;
                             }
                             span:nth-child(2){
                                 display: block;
                                 float: right;
                                 
                             }
                         }
                     }
                 }
            }
       }
    }
}
</style>
