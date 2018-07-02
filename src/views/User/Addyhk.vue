<template>
  <div class="Tjyhk">
      <cell-box class="tjitem">
          <label for="banknum">银行卡号</label>
          <input type="text" id="banknum" placeholder="请输入银行卡号" v-model="num">
      </cell-box>
      <cell-box class="tjitem">
          <label for="bankname">银行名称</label>
          <input type="text" id="bankname" placeholder="请输入银行名称" v-model="name">
      </cell-box>
      <cell-box class="tjitem">
          <label for="phonenum">手机号</label>
          <input type="text" id="phonenum" placeholder="请输入绑定的手机号" v-model="tel">
          <button class="send" @click="send">{{yzmvaule}}</button>
      </cell-box>
      <cell-box class="tjitem">
          <label for="yzm">验证码</label>
          <input type="text" id="yzm" placeholder="请输入收到的验证码" v-model="yzm">
      </cell-box>
      <button class="save" @click="save">保存</button>
  </div>
</template>
<script>
import {CellBox,Toast } from "vux"
import { mapActions,mapGetters } from "vuex";
import { setTimeout } from 'timers';
export default {
  name:"Addyhk",
  data(){
      return{
           msg: "添加银行卡",
           time:60,
           yzmvaule:"发送验证码",
           num:"",
           numyz:/^([1-9]{1})(\d{14}|\d{18})$/,
           name:"",
           tel:"",
           yzm:"",
           code:""
      }
  },
  components:{
      CellBox,
      Toast 
  },
  methods:{
      ...mapActions(["action"]),
      save(){//点击保存银行卡信息
         if(this.num==""){
             this.$vux.toast.text("请输入银行卡");
             return false;
         }
         if(!this.numyz.test(this.num)){
             this.$vux.toast.text("请输入正确的银行卡号");
             return false;
         }

         if(this.name==""){
             this.$vux.toast.text("请输入银行名称");
             return false;
         }

         if(this.tel==""){
             this.$vux.toast.text("请输入手机号");
             return false;
         }
         if(this.yzm==""){
             this.$vux.toast.text("请输入验证码");
             return false;
         }
        if(this.yzm==this.code){
            this.action({
                moduleName:"addbank",
                url:"adminapi/member/addbank",
                method:"post",
                data:{
                    token:this.airforce.login_post.data.token,
                    bank:this.num,
                    bank_name:this.name,
                    bank_phone:this.tel,
                    code:this.yzm
                }
            }).then((res)=>{
                if(res.code==200){
                    this.$vux.toast.text(res.message)
                     setTimeout(()=>{
                        this.$router.back();
                    },2000)
                }else{
                    this.$vux.toast.text(res.message)
                }
            }).catch((err)=>{
                this.$vux.toast.text(err)
            })
        }else{
            this.$vux.toast.text("请输入正确的验证码");
             return false;
        }

      },
      send(){//发送验证吗的方法
        if(this.yzmvaule=="发送验证码"){
            this.action({
                moduleName:"getcode",
                url:"adminapi/member/getcode",
                method:"post",
                data:{
                    phone:this.tel
                }
            }).then((res)=>{
                if(res.code==200){
                    let that=this;
                    let asd= setInterval(function bcv(){
                        that.time-=1;
                        that.yzmvaule=that.time+"s后再次发送";
                        if(that.time == 0){
                            that.yzmvaule="发送验证码";
                            that.time=60;
                            clearInterval(asd);
                        }
                    },1000)
                    this.code=res.data.code_name;
                    this.$vux.toast.text("验证码发送成功");
                }else{
                    this.$vux.toast.text(res.message)
                }
            }).catch((err)=>{
                this.$vux.toast.text(err)
            })
        } 
      }
  },
    computed:{
        ...mapGetters(["airforce"]),
    },
    created(){

    }
}
</script>
<style lang="less" scoped>
button:focus{
    outline:none;
}
.Tjyhk{
    position: relative;
    .tjitem{
        background: #fff;
        label{
            display: block;
            width: 25%;
        }
        input{
            width: 70%;
            padding-left: 5%;
            line-height: 42px;
            font-size: 14px;
            height:22px;
            border: none;
            background: transparent;
        }
        .send{
            position: absolute;
            right: 3%;
            border:none;
            background: transparent;
        }
    }
    .save{
        width: 70%;
        border-radius: 20px;
        line-height: 35px;
        display: block;
        margin: 30px auto;
        color:#fff;
        border:none;
        background: #d01716;
        font-size: 16px;
    }
}
</style>
