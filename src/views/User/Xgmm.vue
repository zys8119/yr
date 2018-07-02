<template>
  <div class="Xgmm">
      <div>
          <input type="password" ref="ymm" v-model="oldpsd" placeholder="请输入您的原密码">
          <span class="eye iconfont" @click.prevent="mkshowold" v-if="showold">&#xe62c;</span>
          <span class="eye iconfont" @click.prevent="mkshowold" v-else>&#xe67c;</span>
      </div>
      <div>
          <input type="password" ref="xmm" v-model="newpsd" placeholder="请输入您的新密码">
          <span class="eye iconfont" @click.prevent="mkshownew" v-if="shownew">&#xe62c;</span>
          <span class="eye iconfont" @click.prevent="mkshownew" v-else>&#xe67c;</span>
      </div>
      <div>
          <input type="password" ref="zcmm" v-model="againpsd" placeholder="请再次输入新密码">
          <span class="eye iconfont" @click.prevent="mkshowagain" v-if="again">&#xe62c;</span>
          <span class="eye iconfont" @click.prevent="mkshowagain" v-else>&#xe67c;</span>
      </div>
      
      <button @click.prevent="modify">确定修改</button>
  </div>
</template>
<script>
import {Toast } from "vux"
import {mapGetters,mapActions} from "vuex"
import { hex_md5} from '@/assets/js/md5.js'
import { setTimeout } from 'timers';
export default {
  name: "Xgmm",
  data() {
    return {
      msg: "修改密码",
      airpsd:"5159,4144.",
      oldpsd: "",
      md5psd:"",
      newpsd: "",
      newpsdyz:/^[a-zA-Z\d_]{6,}$/,
      againpsd: "",
      showold: false,
      shownew:false,
      again:false
    };
  },
  components: {
      Toast 
  },
  methods: {
      ...mapActions(["action"]),
    modify() {//修改密码的方法
    if(this.oldpsd==""){
        this.$vux.toast.text("请输入原密码")
         return false
    }


    if(this.newpsd==""){
         this.$vux.toast.text("请输入新密码")
         return false
    }else if(!this.newpsdyz.test(this.newpsd)){
         this.$vux.toast.text("新密码需6位以上字母或数字")
         return false
    }else if(this.oldpsd==this.newpsd){
        this.$vux.toast.text("新密码应与原密码不一致")
         return false
    }
    if(this.againpsd==""){
         this.$vux.toast.text("请输入二次密码")
         return false
    }else if(this.againpsd!=this.newpsd){
         this.$vux.toast.text("两次密码不一致")
         return false
    }
    this.action({
        moduleName:"setpwd",
        url:"/member/updatepwd",
        method:'post',
        isFormData: true,
        data:{
            token:this.airforce.login_post.data.token,
            password:this.oldpsd,
            newpassword:this.againpsd
        }
    }).then(res=>{
        if(res.code==200){
            this.$vux.toast.text(res.message);
            setTimeout(()=>{
                this.$utils.Logout(this);
            },2000)
        }else{
            this.$vux.toast.text(res.message);
        }
    }).catch(err=>{
        this.$vux.toast.text(err);
    })
   
    },
    mkshowold(){
        this.showold=!this.showold;
        if(this.showold==false){
            this.$refs.ymm.type="password"
        }else{
            this.$refs.ymm.type="text"
        }
    },
    mkshownew(){
        this.shownew=!this.shownew;
        if(this.shownew==false){
            this.$refs.xmm.type="password"
        }else{
            this.$refs.xmm.type="text"
        }
    },
    mkshowagain(){
        this.again=!this.again;
        if(this.again==false){
            this.$refs.zcmm.type="password"
        }else{
            this.$refs.zcmm.type="text"
        }
    }
  },
  computed:{
      ...mapGetters(["airforce"]),
  },
  created(){
     
  }
};
</script>
<style lang="less" scoped>
button:focus{
    outline:none;
}
.Xgmm {
  div {
    position: relative;
    input {
      display: block;
      width: 100%;
      height: 42px;
      line-height: 42px;
      border: none;
      box-sizing: border-box;
      padding: 0 8% 0 5%;
      font-size: 14px;
    }
    .eye{
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 8%;
        line-height: 42px;
        text-align: center;
    }
  }

  button {
    display: block;
    width: 80%;
    margin: 0 auto;
    border: none;
    border-radius: 8px;
    background: #1b82d2;
    line-height: 30px;
    text-align: center;
    color: white;
    font-size: 17px;
    line-height: 40px;
    margin-top: 30px;
  }
}
</style>
