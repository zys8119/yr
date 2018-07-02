<template>
  <div class="Wdsc">
      <swipeout>
          <swipeout-item transition-mode="follow"  v-for="(item,index) in sclist" :key="index">
              <div slot="right-menu">
                  <swipeout-button type="default">取消</swipeout-button>
                  <swipeout-button @click.native="onButtonClick(index)" type="warn">删除</swipeout-button>
              </div>
              <div slot="content">
                  <router-link to="" class="sc-item" link="">
                        <div class="scitem-img">
                            <img :src="require('@/assets/img/User/14908591f889710a8bf026c71f0af0fc9c8a6b01d5c8-0SqGHA_fw658.jpg')" >
                        </div>
                        <div class="scitem-info">
                            <h1>鄞州区御景水岸花苑 <span>120㎡</span></h1>
                            <p>
                                <span>4室1厅1卫</span>
                                <span> | 82.00 ㎡</span>
                                <span> | 南</span>
                                <span> | 精装修</span>
                            </p>
                            <h2>1680 <span>元/月</span></h2>
                            <div>
                                <span class="cz">合租</span>
                                <span class="wz">鄞州区</span>
                            </div>
                        </div>
                    </router-link>
              </div>
          </swipeout-item>
      </swipeout>
      
  </div>
</template>
<script>
import {CellBox,Group,Swipeout, SwipeoutItem, SwipeoutButton} from "vux"
export default {
  name:"Wdsc",
  data(){
      return{
          msg:"我的收藏",
          sclist:[0,1,2,3,4]
      }
  },
  components:{
      CellBox,
      Group,
      Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  methods:{
      onButtonClick(t){
          console.log(t)
          
      }
  }
}
</script>
<style lang="less" scoped>
.Wdsc{
    .sc-item{
        background: #fff;
        display: block;
        overflow: hidden;
        box-sizing: border-box;
        padding: 10px 15px;
        .scitem-img{
            width: 30%;
            float: left;
            img{
                width: 100%;
                height: 100px;
                display: block;
            }
        }
        .scitem-info{
            width: 65%;
            float: right;
            h1{
                font-size: 16px;
                 text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-weight: 500;
            }
            p{
                font-size: 12px;
                color:#a9a7ab;
                 text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          
            }
            h2{
                margin-top: 7px;
                color:#ff0000;
                font-size: 18px;
                font-weight:initial;
                 text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            
                span{
                    font-size: 12px;
                }
            }
            div{
                overflow: hidden;
                .cz{
                    font-size: 12px;
                    float: left;
                    display: block;
                    color: #1b82d2;
                    padding: 0 4px;
                    border: 1px solid #1b82d2;
                    border-radius: 4px;
                }
                .wz{
                    font-size: 12px;
                    color: #a9a7ab;
                    float: right;
                }
            }
        }
    }
}
</style>
