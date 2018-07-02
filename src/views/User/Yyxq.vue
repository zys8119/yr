<template>
  <div class="Yyxq">
      <cell-box class="xqitem">
          <span>申请人：</span>
          <span>雷军</span>
      </cell-box>
      <cell-box class="xqitem">
          <span>预约时间：</span>
          <span>2018-06-30</span>
      </cell-box>
       <cell-box class="xqitem">
          <span>联系电话：</span>
          <span>15958123761</span>
      </cell-box>
      <cell-box class="bz xqitem">
          <span>备注：</span>
          <textarea disabled name="" id="" v-model="xqbz"></textarea>
      </cell-box>
      <span class="btn" @click="save">保存备注</span>
  </div>
</template>
<script>
import {CellBox,Toast } from "vux"
import { setTimeout } from 'timers';
export default {
  name: "Yyxq",
  data() {
    return {
      msg: "预约详情",
      xqbz:""
    };
  },
  components: {
      CellBox,
      Toast 
  },
  methods:{
      save(){
          console.log(this.xqbz)
          this.$vux.toast.show({
              type:"text",
              text:"保存成功"
          })
          setTimeout(()=>{
              this.$router.back();
          },2000)
      }
  }
}
</script>
<style lang="less" scoped>
.Yyxq{
    .xqitem{
        display: block;
        // font-size: 14px;
        span{
            display: inline-block;
        }
        span:nth-child(1){
            width: 25%;
        }
    }
    .bz{
        span{
            display: block;
        }
        textarea{
            width: 100%;
            height: 300px;
            box-sizing: border-box;
            padding: 5px;
            font-size: 14px;
            margin-top: 10px;
        }
    }
    .btn{
         display: block;
        width: 70%;
        color: #fff;
        background: #d01716;
        text-align: center;
        margin: 10px auto;
        border-radius: 20px;
        line-height: 35px;
    }
}
</style>
