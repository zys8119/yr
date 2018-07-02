<template>
  <div class="Wdyhk">
      <div class="none" v-if="have">
          <img :src="require('@/assets/img/User/nocontent.png')">
          <p>暂无银行卡信息</p>
      </div>
      <div class="yhklist" v-else @click="disappear">
          <div :class="`yhkitem ${colorcase[ran]}`" v-for="(item,index) in yhklist" :key="index" >
              <div class="left">
                  <img :src="require('@/assets/img/User/yhk.png')">
              </div>
              <div class="mid">
                  <p>{{item.bank_name}}</p>
                  <p>银行卡</p>
                  <p>{{item.bank}}</p>
              </div>
              <div class="bj" >
                <div class="szinfo">
                  <div class="delyhk szbtn" @click.stop="suredel(index,item.id)">
                     <span class="iconfont">&#xe6f2;</span>
                     <span>删除</span>
                 </div>
                 <div class="mryhk szbtn" @click.stop="mr(index,item.id)">
                     <span class="iconfont">&#xe886;</span>
                     <span>设为默认</span>
                 </div>
                </div>
                 
              </div>
              <span class="mr" v-if="item.status">默认</span>
              <span class="sz iconfont" @click.stop="sz(index)">&#xe6d6;</span>
          </div>
          <confirm v-model="whether" content="确定删除该银行卡？" @on-confirm="del()"></confirm>
      </div>
  </div>
</template>
<script>
import $ from "jquery";
import { CellBox, Confirm, Toast } from "vux";
import { mapActions,mapGetters } from 'vuex'

export default {
  name: "Wdyhk",
  data() {
    return {
      msg: "我的银行卡",
      have: false, //是否有银行卡信息
      showmr: false, //显示该卡是否为默认的标志
      colorcase: ["a", "b", "c"],
      yhklist: [],
      ran: 0, //背景色的随机数
      styleObject: {},
      whether: false, //确认删除的弹窗
      delindex: 0 ,//删除银行卡的下标
      delitemindex:""
    };
  },
  components: {
    CellBox,
    Confirm,
    Toast
  },
  methods: {
    ...mapActions(['action']),
    disappear() {
      //点击所有遮罩层隐藏
      $(".bj").fadeOut();
      $(".sz").fadeIn();
    },
    suredel(t,k) {
      //点击出现确认删除
      this.delindex = t;
      this.delitemindex=k;
      this.whether = true;
    },
    del() {
      //删除银行卡的方法
      let k = this.delitemindex;
      let t = this.delindex;
      this.action({
        moduleName:"delBank",
        url:"adminapi/member/delBank",
        method:"post",
        data:{
            token:this.airforce.login_post.data.token,
            id:k
        }
      }).then((res)=>{
        if(res.code==200){
          this.$vux.toast.text(res.message);
          this.yhklist.splice(t,1);
          if(this.yhklist.length==0){
            this.have=true;
          }
        }else{
          this.$vux.toast.text(res.message)
        }
      }).catch((err)=>{
          this.$vux.toast.text(err)
      })
      $(".bj").eq(t) .fadeToggle();
      $(".sz").eq(t).fadeIn();
    },
    mr(t,k) {
      //设置默认银行卡的方法
      this.action({
        moduleName:"defaultBank",
        url:"adminapi/member/defaultBank",
        method:"post",
        data:{
            token:this.airforce.login_post.data.token,
            id:k
        }
      }).then((res)=>{
        if(res.code==200){
          this.$vux.toast.text(res.message);
          for(let l=0;l<this.yhklist.length;l++){//改变页面上默认的显示
            this.yhklist[l].status=false;
          }
          this.yhklist[t].status=true;
        }else{
          this.$vux.toast.text(res.message)
        }
      }).catch((err)=>{
        this.$vux.toast.text(err)
      })
      $(".bj").eq(t).fadeToggle();
      $(".sz") .eq(t).fadeIn();
    },
    sz(t) {//点击出现遮罩层
      if (
        $(".bj") .eq(t).is(":hidden")
      ) {
        $(".bj").fadeOut();
        $(".sz").fadeIn();
        $(".bj").eq(t).fadeIn();
        $(".sz").eq(t).fadeOut();
      } else {
        $(".bj").eq(t).fadeOut();
        $(".sz").eq(t).fadeIn();
      }
    }
  },
  created(){
    this.action({
      moduleName:"bankList",
      url:"adminapi/member/bankList",
      //fullUrl:"http://192.168.1.115/zf/adminapi/member/bankList",
      method:"post",
      data:{
          token:this.airforce.login_post.data.token,
      }
    }).then((res)=>{
      if(res.code==200){
        for(let i=0;i<res.data.length;i++){//循环改变银行卡号，只显示最后4位
          let len=res.data[i].bank.length;
          let str=res.data[i].bank.substring(len-4, len);
          res.data[i].bank="**** **** **** " + str;
          if(res.data[i].status=="2"){
            res.data[i].status=true;
          }else{
            res.data[i].status=false;
          }
          this.yhklist.push(res.data[i])
        }
        if(this.yhklist.length==0){
            this.have=true;
          }
      }else{
        this.have=true;
        this.$vux.toast.text(res.message)
      }
    }).catch((err)=>{
      this.have=true;
        this.$vux.toast.text(err)
    })
    
  },
  computed:{
     ...mapGetters(["airforce"]),
  },
  mounted(){
      this.action({
          moduleName:'layout',
          goods:{
              clickRight:()=>{
                  this.$router.push("/Addyhk")
              }
          }
      })
    }
};
</script>
<style lang="less" scoped>
.ani {
  animation: myfirst 1s ease-out;
}
.Wdyhk {
  // background: #363d47;
  padding: 10px 0;
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

  .yhklist {
    .yhkitem {
      padding: 20px 15px;
      border-radius: 6px;
      width: 80%;
      margin: 10px auto;
      display: flex;
      position: relative;
      .left {
        width: 15%;
        padding-top: 4px;
        padding-right: 4%;
        img {
          display: block;
          width: 100%;
        }
      }
      .mid {
        width: 80%;
        font-size: 16px;
        color: #fff;
        p:nth-child(1) {
          line-height: 15px;
          padding-top: 8px;
          font-size: 18px;
        }
        p:nth-child(2) {
          font-size: 14px;
          padding-bottom: 30px;
        }
        p:nth-child(3) {
          line-height: 30px;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 1px;
          text-shadow: -1px -1px 1px #8b8888;
        }
      }
      .bj {
        display: none;
        .szinfo {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 6px;
          display: flex;
          justify-content: space-around;
          align-items:center;
          .szbtn {
            width: 35%;
            height: 70%;
            
            box-sizing: border-box;
            padding: 10px;
            border-radius: 7px;
            border: 3px solid #bfbfbf;
            span {
              color: #fff;
              display: block;
              text-align: center;
            }
            span:nth-child(1) {
              font-size: 30px;
            }
            span:nth-child(2) {
              font-size: 14px;
            }
          }
        }
      }
      .setmr {
        display: none;
        position: absolute;
        top: 45px;
        right: -10px;
        width: 24px;
        height: 24px;
        color: #fff;
        background: #747474;
        line-height: 24px;
        text-align: center;
        border-radius: 50%;
      }
      .del {
        display: none;
        position: absolute;
        top: 10px;
        right: -10px;
        width: 23px;
        height: 23px;
        color: #ce3f3f;
        border-radius: 50%;
        background: rgba(255, 255, 255, 1);
        font-size: 24px;
        line-height: 24px;
      }
      .mr {
        display: block;
        width: 35px;
        height: 60px;
        background: url(../../assets/img/User/彩带2.png) no-repeat;
        background-position: top center;
        background-size: cover;
        position: absolute;
        top: -5px;
        right: 7%;
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
        text-align: center;
        line-height: 50px;
      }
      .sz {
        display: block;
        position: absolute;
        top: 50%;
        right: 9%;
        color: #fff;
        font-size: 20px;
        transform: translateY(-50%);
      }
    }
    .yhkitem:nth-child(5n + 1) {
      background: linear-gradient(to right, #65799b, #5e2563);
    }
    .yhkitem:nth-child(5n + 2) {
      background: linear-gradient(to right, #57ca85, #184e68);
    }
    .yhkitem:nth-child(5n + 3) {
      background: linear-gradient(to right, #f38f6b, #f5555f);
    }
    .yhkitem:nth-child(5n + 4) {
      background: linear-gradient(to right, #fce3ba, #f38181);
    }
    .yhkitem:nth-child(5n + 5) {
      background: linear-gradient(to right, #c53364, #622774);
    }
  }
}
</style>

