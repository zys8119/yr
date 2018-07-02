<template>
  <div class="Yysq">
      <div class="none" v-if="have">
          <img :src="require('@/assets/img/User/nocontent.png')">
          <p>暂无预约申请</p>
      </div>
      <scroller v-else :use-pullup=true :bounce=true :lock-x=true :pullup-config=pullupConfig :scroll-bottom-offset=110 @on-scroll-bottom="getmore">
        
        <div>
        <cell-box class="content-item" v-for="(item,index) in sqlist" :key="index">
            <div class="content-itemtop">
                  <router-link class="headimg" to="">
                      <img :src="item.img">
                  </router-link>
                  <router-link class="information" to="/Yyxq">
                  <p>申请人：{{item.l_name}}</p>
                  <p>预约时间：{{item.room_time}}</p>
                  <p>联系电话：{{item.phone}}</p>
              </router-link>
              <div class="more">
                  <span class="iconfont" @click="morebtn(index)">&#xe630;</span>
              </div>
            </div>
              <div class="btnlist">
                <ul >
                  <li @click="alertshow(item.b_id,index)">
                    <span class="iconfont">&#xe613;</span>
                    <span>确认预约</span>
                  </li>
                  <li @click="makeshow(item.b_id,index)">
                    <span class="iconfont">&#xe614;</span>
                    <span>拒绝预约</span>
                  </li>    
                </ul>
              </div>       
          </cell-box>
          </div>
      </scroller>
      <confirm v-model="show"
          :title="contitle"
          @on-confirm="onConfirm">
      </confirm>
  </div>
</template>
<script>
import $ from "jquery";
import { CellBox, Confirm,Toast,Scroller} from "vux";
import { mapActions,mapGetters } from "vuex";
export default {
  name: "Yysq",
  data() {
    return {
      msg: "预约申请",
      sqlist: [
      //   {
      //     name:"策士0",
      //     room_time:"2018-11-10",
      //     phone:"15958123761"
      // },
      // {
      //     name:"策士1",
      //     room_time:"2018-11-10",
      //     phone:"15958123761"
      // },
      // {
      //     name:"策士2",
      //     room_time:"2018-11-10",
      //     phone:"15958123761"
      // }
      ],
      have: false,
      show: false,
      contitle:"真的要拒绝吗？",
      pullupConfig:{
        content: '上拉刷新',
        autoRefresh: true,
        downContent: '够啦够啦',
        upContent: '上拉刷新',
        loadingContent: '加载中...',
        clsPrefix: 'pullupConfig-',
      },
      sqloadswitch:true,
      sqpage:1,
      jjbindex:"0",
      jjindex:0
    };
  },
  components: {
    CellBox,
    Confirm ,
    Toast,
    Scroller
  },
  methods: {
    ...mapActions(["action"]),
    morebtn(t) {
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
    },
    makeshow(t,k){
        this.show=true;
        this.jjbindex=t;
        this.jjindex=k;
    },

    alertshow(t,k){//接受预约的方法
      this.action({
          moduleName:"Jsyy",
          url:"Adminapi/Bespeaks/affirm",
          method:"post",
          data:{
            token:this.airforce.login_post.data.token,
            id:t
          }
      }).then((res)=>{
        if(res.code==200){
          this.$vux.toast.text(res.message)
          this.sqlist.splice(k,1);
        }else{
          this.$vux.toast.text(res.message)
        }
      }).catch((err)=>{
          this.$vux.toast.text(err)
      })
      
    },
    onConfirm(){//Confirm点击确定,拒绝预约的方法
      this.action({
        moduleName:"Jjyy",
        url:"Bespeaks/reject",
        method:"post",
        data:{
          token:this.airforce.login_post.data.token,
          id:this.jjbindex
        }
      }).then((res)=>{
          if(res.code==200){
             this.$vux.toast.text(res.message)
             this.sqlist.splice(this.jjindex,1);
          }else{
            this.$vux.toast.text(res.message)
          }
        }).catch((err)=>{
          this.$vux.toast.text(err)
        })
      
    },
    getmore(){//下拉加载的方法
      if(this.sqloadswitch==true){
        console.log("已通过申请下拉开关")
        this.sqloadswitch=false;
        this.action({
          moduleName:"Wdyy",
          url:"Adminapi/Bespeaks/lists",
          method:"post",
          data:
          {
            token:this.airforce.login_post.data.token,
            type:"2",
            page:this.sqpage.toString(),
            pagesize:"9",
            status:"0"
          }
        }).then((res)=>{
          if(res.code==200){
              this.sqlist=this.sqlist.concat(res.data.lists);
              if(res.data.lists.length<5){
                this.sqloadswitch=false;
              }else{
                this.sqloadswitch=true;
              }
              console.log("页码",this.sqpage,"数据条数",this.sqlist.length)
              this.sqpage++;
          }else{
            this.$vux.toast.text(res.message)
          }
        }).catch((err)=>{
          this.$vux.toast.text(err)
        })
      }else{
        return false;
      }
    }
  },
  computed:{
     ...mapGetters(["airforce"]),
  },
  created(){
     this.action({//页面进入初始渲染待进行列表
      moduleName:"Wdyy",
      url:"adminapi/Bespeaks/lists",
      method:"post",
      data:
      {
        token:this.airforce.login_post.data.token,
        type:"2",
        page:this.sqpage.toString(),
        pagesize:"9",
        status:"0"
      }
    }).then(res=>{
      console.log(res)
      if(res.code==200){
        this.sqlist=this.sqlist.concat(res.data.lists);
         if(this.sqlist.length==0){
            this.have=true;
          }else if(res.data.lists.length<9){
            this.sqloadswitch=false;
          }
          console.log(this.sqlist)
          this.sqpage++;
      }else{
        this.sqloadswitch=false;
        this.have=true;
        this.$vux.toast.text(res.message);
      }
      console.log(this.sqlist.length)
    }).catch(err=>{
        this.have=true;
        this.$vux.toast.text(err);
    })
  }
};
</script>
<style lang="less" scoped>
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
.Yysq {
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
        p {
            line-height: 30px;
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
        span{
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
          font-size:14px;
        }
         span:nth-child(1) {
            font-size: 16px;
          }
      }
    }
  }
}
</style>
