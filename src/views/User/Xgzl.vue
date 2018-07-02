<template>
  <div class="Xgzl">
      <group class="zg-group" gutter=0>
          <x-input :value="airforce.prefectInfo.name" @on-change="airforce.change.set($event,'name','prefectInfo')" title="姓名" placeholder="请输入姓名" text-align="right" ></x-input>
          <x-input :value="airforce.prefectInfo.nick_name" @on-change="airforce.change.set($event,'nick_name','prefectInfo')"  title="昵称" text-align="right"  placeholder="请输入昵称"></x-input>
          <x-input :disabled="true" :value="airforce.prefectInfo.phone" @on-change="airforce.change.set($event,'phone','prefectInfo')"  title="电话" text-align="right"></x-input>
          <x-input :value="airforce.prefectInfo.wx_number" @on-change="airforce.change.set($event,'wx_number','prefectInfo')"  title="微信号" text-align="right"  placeholder="请输入微信号"></x-input>
          <area-select class="area-select" module-name="prefectInfo" field-name="address_all"  title="地址" placeholder="收货地址"></area-select>
      </group>
      <button @click.prevent='save'>保存</button>
  </div>
</template>
<script>
import {
  ButtonTab,
  ButtonTabItem,
  Group,
  XInput,
  Checker,
  CheckerItem,
  Toast,
  XTextarea
} from "vux";
import { setTimeout } from 'timers';
import { AreaSelect, ZInput } from "@/components"
export default {
  name: "User",
    components: {
        ButtonTab,
        ButtonTabItem,
        Group,
        XInput,
        Checker,
        CheckerItem,
        Toast,
        XTextarea,
        AreaSelect,
        ZInput,
    },
  data() {
    return {

    };
  },
  methods: {
    save(){
        if(this.$utils.is_S(this.airforce.prefectInfo.name)){
            this.$vux.toast.text("请输入姓名");
            return;
        }
        if(this.$utils.is_S(this.airforce.prefectInfo.nick_name)){
            this.$vux.toast.text("请输入昵称");
            return;
        }
        if(this.$utils.is_S(this.airforce.prefectInfo.wx_number)){
            this.$vux.toast.text("请输入微信号");
            return;
        }
        try {
            this.action({
                moduleName:'prefectInfo',
                goods:{
                    address: this.airforce.prefectInfo.address_all.valueSelect + '、' + this.airforce.prefectInfo.address_all.address
                }
            });
        }catch (e){}
        if(this.$utils.is_S(this.airforce.prefectInfo.address)){
            this.$vux.toast.text("请输入地址");
            return;
        };
        this.$vux.loading.show({text: '保存中..'});
        const formData = {
            token:this.airforce.login_post.data.token,
            name:this.airforce.prefectInfo.name,
            nick_name:this.airforce.prefectInfo.nick_name,
            wx_number:this.airforce.prefectInfo.wx_number,
            address:this.airforce.prefectInfo.address,
            address_all:JSON.stringify(this.airforce.prefectInfo.address_all),
        }
        this.action({
            moduleName:'prefect_post',
            method:'post',
            url:'/member/prefect',
            data:formData
        }).then(res=>{
            if(res.code != 200){
                this.$vux.toast.text(res.message);
                this.action({
                    moduleName:'prefectInfo',
                    goods:this.airforce.memberdDetail_post.data
                })
                return;
            }
            formData.address_all = this.airforce.prefectInfo.address_all;
            this.action({
                moduleName:'memberdDetail_post',
                goods:{
                    data:{
                        ...formData,
                    }
                }
            });
            this.$vux.toast.text("保存成功");
            this.$router.back();
        }).catch(err=>{
            this.$vux.toast.text(err);
            this.action({
                moduleName:'prefectInfo',
                goods:this.airforce.memberdDetail_post.data
            })
        });
    }
  },
  computed:{
  },
  mounted(){
      if(!this.airforce.memberdDetail_post || this.airforce.memberdDetail_post.code != 200){
          this.$vuz.loading.show({theme:"transparent"});
          this.action({
              moduleName:'memberdDetail_post',
              url:"/member/memberdDetail",
              method:"post",
              data:{
                  token:this.airforce.login_post.data.token,
              }
          }).then(res=>{
              this.$vuz.loading.hide();
              if(res.code == 200){
                  try {
                      res.data.address_all = JSON.parse(res.data.address_all);
                  }catch (e){}
                  this.action({
                      moduleName:'prefectInfo',
                      goods:res.data
                  })
              }
          }).catch(err=>{
              this.$vuz.loading.hide();
          })
      }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/color";
.Xgzl {
  .zg-group {
    position: relative;
    .area-select{
        .line1();
    }
    .xg-checker{
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      border-radius: 7px;
      overflow: hidden;
      line-height: 30px;
      .xg-checkeritem{
        display: block;
        float: left;
        width: 30px;
        text-align: center;
        padding: 0 5px;
      }
    }
    
    // &/deep/ .weui-cells {
    //   position: relative;
    //   .vux-checker-box {
    //     display: block;
    //     width: 30%;
    //     position: absolute;
    //     top: 0;
    //     right: 0;
    //   }
    // }
  }
  button {
    display: block;
    width: 70%;
    color: #fff;
    background: #d01716;
    text-align: center;
    margin: 10px auto;
    margin-top: 50px;
    border-radius: 20px;
    line-height: 35px;
  }
}
button,
button:focus {
  border: none;
  outline: none;
}
input[placeholder]{
  font-size: 14px!important;
}
.mr {
  color: black;
  font-size: 14px;
  background-color: rgb(242, 240, 245);
}
.xz {
  background: #1b82d2;
  font-size: 14px;
  color: #fff;
}
</style>
