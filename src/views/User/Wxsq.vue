<template>
    <div class="wxsq">
        <scroller :use-pullup=true :bounce=true :lock-x=true :pullup-config=pullupConfig :scroll-bottom-offset=108 @on-scroll-bottom="getmore">
            <div class="none" v-if="dslshow">
                <img :src="require('@/assets/img/User/nocontent.png')">
                <p>暂无信息</p>
            </div>
            <div v-else class="content-item" v-for="(item,index) in list" :key="index">
                <cell-box class="tabitem-info">
                    <router-link to="/HousingDetails">
                        <img :src="require('@/assets/img/User/d8a2f9d6fa3d3a57c8dfecb88726fa90434533402787e-pICqcq_fw658.jpg')" alt="">
                    </router-link>
                    <router-link to="/Wxxq">
                        <p>
                            申报人：{{item.name}},{{item.phone}}
                        </p>
                        <p>
                            报修原因：{{item.title}}
                        </p>
                        <p>
                            地址：{{item.ro_dz}}
                        </p>
                    </router-link>
                </cell-box>
            </div>
        </scroller>
    </div>
</template>
<script>
import {Scroller,CellBox} from "vux"
export default {
    name:"Wxsq",
    data(){
        return{
             msg:"维修申请",
             pullupConfig:{
                content: '上拉刷新',
                autoRefresh: true,
                downContent: '够啦够啦',
                upContent: '上拉刷新',
                loadingContent: '加载中...',
                clsPrefix: 'pullupConfig-',
            },
            dslshow:false,
            list: [
            {
              name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_dz:"御景水岸花园9幢901室"
            },
            {
              name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_dz:"御景水岸花园9幢901室"
            },
            {
              name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_dz:"御景水岸花园9幢901室"
            }
          ]
        }
    },
    components:{
        Scroller,
        CellBox
    },
    methods:{
        getmore(){//下拉加载的方法

        }
    }
}
</script>
<style lang="less" scoped>

.wxsq{
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
    .content-item{
        background: #fff;
            a:nth-child(1){
              width: 35%;
              padding-right: 3%;
              img{
                width: 100%;
                height:88px;
              }
            }
            a:nth-child(2){
               text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              p {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              font-size:14px;
              color:#a9a7ab;
              line-height: 29px;
            }
            }
           
    }
}
</style>
