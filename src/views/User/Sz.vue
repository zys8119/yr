<template>
  <div class="Sz">
      <group class="sz-group" gutter="0">
          <cell title="修改登陆密码" is-link link="/Xgmm"></cell>
          <cell title="关于" is-link link="/About"></cell>
      </group>
      <button @click.prevent="makeshow" class="exit">退出登陆</button>
      <actionsheet v-model="show" :menus="menus" show-cancel @on-click-menu="sureexit"></actionsheet>
  </div>
</template>
<script>
import {Group, Cell,Actionsheet} from "vux"
import { mapActions } from "vuex"
export default {
  name:"Sz",
  data(){
      return{
          msg:"设置",
          show:false,
          menus:[
                    {
                        label: "确定退出登陆吗？",
                        type: 'info'
                    }, {
                        label: '确定',
                        type: 'warn'
                    }
				]
      }
  },
  components:{
      Group,
      Cell,
      Actionsheet
  },
  methods:{
      ...mapActions(['action']),
      makeshow(){
          this.show=true;
      },
      sureexit(){//退出登陆的方法
        this.$utils.Logout(this);
      }
  }
}
</script>
<style lang="less" scoped>
.Sz{
    .sz-group{

    }
    .exit{
        display: block;
				width: 80%;
				margin: 0 auto;
				border-radius: 8px;
				background: #E64340;
				line-height: 30px;
				text-align: center;
				color: white;

				font-size: 17px;
				line-height: 40px;
				margin-top: 30px;
				border: none;
				outline: medium;
    }
}
</style>
