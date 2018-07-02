<template>
    <div class="jsgl">
        <div class="none" v-if="conshow">
            <img :src="require('@/assets/img/User/nocontent.png')">
            <p>暂无信息</p>
        </div>
        <cell-box class="conitem" v-else link="" v-for="(item,index) in porson" :key="index">
            <div class="left">
                <p>姓名：{{item.name}}</p>
                <p>类别：{{item.type}}</p>
                <p>联系方式：{{item.tel}}</p>
                <p>工作描述：{{item.der}}</p>
            </div>
            
            <span class="right" @click.prevent="del(item.id)">删除</span>
           
        </cell-box>
    </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
import {CellBox} from "vux"
export default {
    name:"Jsgl",
    data(){
        return{
            msg:"角色管理",
            conshow:false,
            porson:[{
                name:"王师傅",
                type:"电工",
                tel:"15958123761",
                der:"看江湖人副书记的核辐射的机会"
            },{
                name:"王师傅",
                type:"电工",
                tel:"15958123761",
                der:"看江湖人副书记的核辐射的机会"
            },{
                name:"王师傅",
                type:"电工",
                tel:"15958123761",
                der:"看江湖人副书记的核辐射的机会"
            },{
                name:"王师傅",
                type:"电工",
                tel:"15958123761",
                der:"看江湖人副书记的核辐射的机会"
            }]
        }
    },
    components:{
        CellBox
    },
    methods:{
      ...mapActions(['action']),
      del(t){
          this.$vux.confirm.show({
            title:"确认删除吗？",
            onConfirm (t) {//点击确定的方法
            console.log("2")
            }
        })
      }
    },
    computed:{

    },
    mounted(){
      this.action({
          moduleName:'layout',
          goods:{
              clickRight:()=>{
                  this.$router.push("/Addjs")
              }
          }
      })
    }
}
</script>
<style lang="less" scoped>
.jsgl{
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
    .conitem{
        background: #fff;
        display: block;
        overflow: hidden;
        .left{
            width: 80%;
            font-size: 14px;
            float:left;
            p{
            //   text-overflow: ellipsis;
            //   overflow: hidden;
            //   white-space: nowrap;
            }
        }
        .right{
            display: block;
            text-align: center;
            float: right;
            border: 1px solid #1b82d2;
            color: #1b82d2;
            padding: 1px 12px;
            border-radius: 21px;
            position: absolute;
            top: 50%;
            right: 15px;
            transform:translateY(-50%);
            line-height: 20px;
        }
    }
}
</style>
