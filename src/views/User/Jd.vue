<template>
    <div class="jd">
        <div class="jd-content">
            <p>可借的钱（元）</p>
            <p><span>{{now}}</span></p>
            <p>总额度</p>
            <p>{{all}}</p>
        </div>
        <group gutter="0" class="jd-group">
            <cell class="jd-cell">
                <marquee class="jd-marquee">
                        <marquee-item class="jd-marquee-item" v-for="i in 5" :key="i" ><span class="iconfont">&#xe657;</span>日利率万3.5（1千万用一天利息只需0.35元）</marquee-item>
                </marquee>
            </cell>
        </group>
        <button @click.prevent="takemoney">去借钱</button>
    </div>
</template>
<script>
import { Group, Cell, Marquee, MarqueeItem } from "vux";
import {mapActions} from "vuex"
export default {
  name: "Jd",
  data() {
    return {
      msg: "租房借贷",
      now: 20000,
      all: 20000
    };
  },
  components: {
    Group,
    Cell,
    Marquee,
    MarqueeItem
  },
  methods: {
      ...mapActions(["action"]),
    takemoney() {
      this.$router.push("/Jq");
    }
  },
  created() {
    this.now = parseFloat(this.now).toLocaleString();
    this.all = parseFloat(this.all).toLocaleString();
    console.log(this.now);
  },
  mounted(){
      this.action({
          moduleName:'layout',
          goods:{
              clickRight:()=>{
                  this.$router.push("/Edsz")
              }
          }       
      })
  }
};
</script>
<style lang="less" scoped>
button,
button:focus {
  border: none;
  outline: none;
}
.jd {
  .jd-content {
    background: #108ee9;
    box-sizing: border-box;
    padding: 20px 10%;
    p {
      color: #fff;
    }
    p:nth-child(1) {
      font-size: 14px;
      margin-bottom: 10px;
    }
    p:nth-child(2) {
      span {
        font-size: 60px;
        line-height: 60px;
        color: #fff;
        border-bottom: 1px dotted #fff;
        font-weight: 300;
      }
    }
    p:nth-child(3) {
      font-size: 14px;
      margin-top: 25px;
    }
    p:nth-child(4) {
      font-size: 18px;
      padding-bottom: 20px;
    }
  }
  .jd-group {
    .jd-cell {
      background: #26a4ff;
      &/deep/ .vux-cell-primary{
          flex:0;
      }
      &/deep/ .weui-cell__ft {
        text-align: left;
        .jd-marquee {
          .jd-marquee-item {
            color: #fff;
            line-height: 24px;
            font-size: 14px;
          }
        }
      }
    }
  }
  button {
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
