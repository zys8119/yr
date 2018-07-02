<template>
  <div class="Wxgl">
      <tab v-model="index" class="headtab" bar-active-color='#e19d3d' active-color='#e19d3d' default-color='#a9a7ab'>
            <tab-item :selected="index == 0" v-for="(item,index) in tabs" :key="index">{{item.title}}({{item.count}})</tab-item>
      </tab>
       <swiper v-model="index" class="tabcontent" :show-dots="false" :aspect-ratio="1/2">
           <swiper-item v-for="(item,index) in tabs" :key="index">
               
                    <div class="none" v-if="dslshow">
                            <img :src="require('@/assets/img/User/nocontent.png')">
                            <p>暂无信息</p>
                    </div>
                    <scroller v-else :use-pullup=true :bounce=true :lock-x=true :pullup-config=pullupConfig :scroll-bottom-offset=108 @on-scroll-bottom="getmore(index)">
                      <div class="tabcontent-item" v-for="(listItem,listIndex) in item.list" :key="listIndex">
                        <cell-box class="tabitem-info">
                            <router-link to="/HousingDetails">
                              <img :src="require('@/assets/img/User/d8a2f9d6fa3d3a57c8dfecb88726fa90434533402787e-pICqcq_fw658.jpg')" alt="">
                            </router-link>
                            <router-link to="/Wxxq">
                              <p>
                                申报人：{{listItem.name}},{{listItem.phone}}
                              </p>
                              <p>
                                报修原因：{{listItem.title}}
                              </p>
                              <p>
                                维修工：{{listItem.ro_name}},{{listItem.ro_phone}}
                              </p>
                            </router-link>
                            <div class="btn" v-if="item.btn">
                              <span @click.prevent="makesure(listItem.id)">确认完成</span>
                            </div>
                        </cell-box>
                      </div>
                    </scroller>
                
           </swiper-item>
        </swiper> 
        <div class="btnlist">
          <ul ref="btnul" :class="ulclass">
            <li>
              <router-link to="/Wxsq">
                <span class="iconfont">&#xe6c1;</span>
                <span class="btn-text">维修申请</span>
              </router-link>
            </li>
            <li>
              <router-link to="/Jsgl">
                <span class="iconfont">&#xe696;</span>
                <span class="btn-text">角色管理</span>
              </router-link>
            </li>
          </ul>
          <div :class="btnclass" @click.prevent="makebtn">
            <img :src="require('@/assets/img/User/btn.png')">
          </div>
        </div>
  </div>
</template>
<script>
import $ from "jquery";
import { Tab, TabItem, CellBox, Swiper, SwiperItem,Scroller } from "vux";
import { mapActions,mapGetters } from "vuex";
import { setTimeout } from 'timers';
export default {
  name: "Wxgl",
  data() {
    return {
      msg: "维修管理",
      dslshow: false, //决定待受理tab有没有内容显示，下两个同理
      jxzshow: false,
      llshow: false,
      pullupConfig:{
        content: '上拉刷新',
        autoRefresh: true,
        downContent: '够啦够啦',
        upContent: '上拉刷新',
        loadingContent: '加载中...',
        clsPrefix: 'pullupConfig-',
      },
      tabs: [
        {
          title: "待进行",
          count:"0",//信息条数
          btn:true,//控制按钮显示开关
          list: [
            {
              name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_phone: "15958123761",
              ro_name: "王师傅"
            },
            {
              name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_phone: "15958123761",
              ro_name: "王师傅"
            },
            {
              name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_phone: "15958123761",
              ro_name: "王师傅"
            }
          ]
        },
        {
          title: "已中断",
          count:"0",
          btn:false,
          list: [
            {
             name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_phone: "15958123761",
              ro_name: "王师傅"
            },
            {
              name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_phone: "15958123761",
              ro_name: "王师傅"
            },
            {
             name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_phone: "15958123761",
              ro_name: "王师傅"
            }
          ]
        },
        {
          title: "催修",
          count:"0",
          btn:false,
          list: [
            {
              name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_phone: "15958123761",
              ro_name: "王师傅"
            },
            {
              name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_phone: "15958123761",
              ro_name: "王师傅"
            },
            {
              name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_phone: "15958123761",
              ro_name: "王师傅"
            }
          ]
        },
        {
          title: "历史维修",
          count:"0",
          btn:false,
          list: [
            {
              name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_phone: "15958123761",
              ro_name: "王师傅"
            },
            {
              name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_phone: "15958123761",
              ro_name: "王师傅"
            },
            {
              name: "啦啦啦",
              phone: "15958123691",
              title: "水管破裂",
              ro_phone: "15958123761",
              ro_name: "王师傅"
            }
          ]
        }
      ],
      index: 0,
      btnclass:"",
      ulclass:""
    };
  },
  components: {
    Tab,
    TabItem,
    CellBox,
    Swiper,
    SwiperItem,
    Scroller
  },
  methods: {
    ...mapActions(["action"]),
    getmore(t){//下拉加载的方法

    },
    makebtn(){//点击色块显示或隐藏按钮

      if(this.$refs.btnul.style.left=="100%"){
        // this.$refs.btnul.style.display="block"
        this.btnclass="divstart";
        this.ulclass="ulblock";
        this.$refs.btnul.style.left="0"
      }else{
        this.btnclass="divend";
        this.ulclass="ulnone";
        this.$refs.btnul.style.left="100%"
        // setTimeout(()=>{
        //   this.$refs.btnul.style.display="none"
        // },1000)
        
      }
    },
    makesure(){
      this.$vux.confirm.show({
        title:"确认完成吗？",
        onConfirm (t) {//点击确定的方法
          console.log("2")
        }
      })
    }
  },
  computed:{
    ...mapGetters(["airforce"]),
  },
  mounted() {
    this.action({
      moduleName: "layout",
      goods: {
        clickRight: () => {
          this.$router.push("/Wxadd");
        }
      }
    });
  },
  created(){

  }
};
</script>
<style scoped lang="less">
@keyframes forwardxz{
  0%{
    transform:rotate(45deg);
  }
  100%{
    transform:rotate(225deg);
  }
}
@keyframes negxz {
   0%{
    transform:rotate(225deg);
  }
  100%{
    transform:rotate(45deg);
  }
}
@keyframes goright{
  0%{
    left: 0;
  }
  100%{
    left:100%;
  }
}
@keyframes goleft{
  0%{
    left: 100%;
  }
  100%{
    left:0;
  }
}
.divstart{
  animation:forwardxz 1s ease;
  animation-iteration-count:1;
}
.divend{
  animation:negxz 1s ease;
  animation-iteration-count:1;
}
.ulnone{
  animation:goright 1s ease;
  animation-iteration-count:1;
}
.ulblock{
  animation:goleft 1s ease;
  animation-iteration-count:1;
}
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
.Wxgl {
  position: relative;
  .btnlist{
    position: fixed;
    width: 100%;
    height:63px;
    bottom: 20px;
    text-align: center;
    height: 63px;
    border-radius: 32px;
    overflow: hidden;
    ul{
      width: 100%;
      position: absolute;
      left:0;
      box-sizing: content-box;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 32px;
      li:nth-child(1){
        padding: 0 6% 0 6%;
      }
      li:nth-child(2){
        padding: 0 6% 0 6%;
        margin-right: 25%;
      }
      li{
        display: inline-block;
        padding-bottom:5px;
        line-height: 63px;
        a{
          display: block;
          span{
          display: block;
          text-align: center;
          color:#fff;
        }
        .iconfont{
          font-size: 36px;
          line-height: 44px;
        }
        .btn-text{
          line-height: 15px;
          font-size:14px;
        }
        }
      }
    }
    div{
      width: 63px;
      height: 63px;
      position: absolute;
      right:0;
      transform:rotate(45deg);
      
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  &/deep/.tabcontent,.vux-slider  {
      overflow: visible;
    display: block;
    .vux-swiper {
      height: auto !important;
      min-height: 100% !important;
      width: 100%;
      overflow: visible;
      .vux-swiper-item {
        height: 100%;
        .tabcontent-item {
          //   display: none;
          .tabitem-info {
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
            .btn{
              width: 26%;
              span{
                font-size:14px; 
              }
            }
          }
        }
      }
    }
  }
}
</style>