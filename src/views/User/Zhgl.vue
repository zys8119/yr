<template>
  <div class="Zhgl" >
      <div class="screen">
          <span class="screen-item iconfont" @click="makejz">
              交租状态 &#xe629;
          </span>
           <span class="screen-item iconfont" @click="makehy">
              合约状态 &#xe629;
          </span>
           <div class="jzscreen" style="display:none">
            <group gutter=0>
                <radio :options="jzscreen" value="全部" @on-change="jzchange"></radio>
            </group>
      </div>
      <div class="hyscreen" style="display:none">
            <group gutter=0>
                <radio :options="jzscreen" value="全部" @on-change="hychange"></radio>
            </group>
      </div>
      </div>
     
        <div class="none" v-if="have" @click.prevent="disappear">
            <img :src="require('@/assets/img/User/nocontent.jpg')">
            <p>暂无业主信息</p>
        </div>
       <div class="content" v-else @click.prevent="disappear">
           <cell-box class="content-item" v-for="(item,index) in zhlist" :key="index">
              <div class="content-itemtop">
                   <router-link class="headimg" to="/HousingDetails">
                        <img :src="require('@/assets/img/User/d8a2f9d6fa3d3a57c8dfecb88726fa90434533402787e-pICqcq_fw658.jpg')">
                    </router-link>
                   <router-link class="information" to="">
                   <div class="infor-top">
                       <span>小猪佩奇</span>
                       <div>
                           <span>1200</span>
                           元/月
                       </div>
                   </div>
                   <p>距合约到期还有73天</p>
                   <p>交租日：每月12日</p>
                   <p>宁波市鄞州区邱噶镇御景水岸花园99幢99楼9901室</p>
               </router-link>
               <div class="more">
                   <span class="iconfont" @click="morebtn(index)">&#xe630;</span>
               </div>
              </div>

               <div class="btnlist">
                    <ul >
                   <li>
                      <span class="iconfont">&#xe602;</span>
                      <span>催租</span>
                   </li>
                   <li>
                      <span class="iconfont">&#xe6e2;</span>
                      <span>续约</span>
                   </li>
                   <li @click="makeshow">
                      <span class="iconfont">&#xe6f2;</span>
                      <span>删除租约</span>
                   </li>    
               </ul>
               </div>
              
           </cell-box>
       </div>
       <actionsheet v-model="show" :menus="menus" show-cancel @on-click-menu="delzy"></actionsheet>
  </div>
</template> 

<script>
import $ from "jquery";
import { CellBox, Radio, Group, Actionsheet } from "vux";
export default {
  name: "Zhgl",
  data() {
    return {
      msg: "租户管理",
      jzscreen: ["全部", "今日到期", "三日到期", "七日到期"],
      have: false,
      zhlist: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      show: false,
      menus: [
        {
          label: "确定删除租约吗？",
          type: "info"
        },
        {
          label: "确定",
          type: "warn"
        }
      ],
      animates:true
    };
  },
  components: {
    CellBox,
    Radio,
    Group,
    Actionsheet
  },
  methods: {
    disappear(){//点击其他地方收起下拉框
    
    if(!$(".hyscreen").is(":hidden")){
       $(".hyscreen").slideUp();
       $(".jzscreen").slideUp();
    }
    if(!$(".jzscreen").is(":hidden")){
       $(".jzscreen").slideUp();
        $(".hyscreen").slideUp();
    }
    },
    jzchange(value, label) {
      //点击租金的筛选条件触发的事件
      $(".jzscreen").slideToggle();
    },
    hychange(value, label) {
      //点击合约的筛选条件触发的事件
      $(".hyscreen").slideToggle();
    },
    makejz() {
      $(".hyscreen").css("display", "none");
      $(".jzscreen").slideToggle();
      //   this.$refs.jz.slideToggle();
    },
    makehy() {
      $(".jzscreen").css("display", "none");
      $(".hyscreen").slideToggle();
    },
    morebtn(t) {
      //点击出现更多如续约等按钮
      if (
        $(".btnlist")
          .eq(t)
          .is(":hidden")
      ) {
        $(".btnlist").slideUp();
        $(".btnlist")
          .eq(t)
          .slideDown();
      } else {
        $(".btnlist")
          .eq(t)
          .slideUp();
      }
      if(this.animates==true){
        $(".more span").css({
           'animation': 'rotatefresh 5s infinite linear'
        });
        console.log(this.animates)
        this.animates=!this.animates;
      }else{
         $(".more span").css({
           'animation': 'rotatefresh 5s infinite linear'
        });
        this.animates=!this.animates;
      }
    },
    makeshow() {
      //点击删除租约弹出确认删除选项
      this.show = true;
    },
    delzy() {
      //删除租约的方法
      console.log("好了，这条已经被删除了");
    }
  }
};
</script>
 

<style scoped lang="less">
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
.Zhgl {
  position: relative;
  .screen {
    position: fixed;
    top: 41px;
    z-index: 400;
    width: 100%;
    background-color: #fff;
    .screen-item {
        display: inline-block;
      font-size: 16px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      width: 49%;
    }
  }
  .content {
    margin-top: 44px;
    .content-item {
      background: #fff;
      display: block;
      .content-itemtop {
        overflow: hidden;
        .headimg {
          width: 30%;
          display: block;
          padding-right: 3%;
          float: left;
          img {
            width: 100%;
            height: 88px;
            display: block;
          }
        }
        .information {
          width: 59%;
          display: block;
          float: left;
          .infor-top {
            overflow: hidden;
            font-size: 14px;
            span {
              float: left;
            }
            div {
              float: right;
              span {
                color: #d01716;
              }
            }
          }
          p {
            color: #c5c5c5;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 14px;
          }
        }
        .more {
          width: 8%;
          float: right;
          text-align: center;
          span {
            font-size: 18px;
            line-height: 88px;
          }
        }
      }
    }
    .btnlist {
      display: none;
      ul {
        width: 100%;
        padding-top: 10px;
        display: flex;
        justify-content: space-around;
        // display:none;

        li {
          display: inline-block;
          span {
            display: block;
            text-align: center;
            font-size: 14px;
          }
          span:nth-child(1) {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>