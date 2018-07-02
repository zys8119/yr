<template>
  <div class="Wdyy">
      <tab class="headtab" v-model="index" bar-active-color='#e19d3d' active-color='#e19d3d' default-color='#a9a7ab'>
            <tab-item :selected="index == 0"  v-for="(item,index) in tabs" :key="index">{{item.title}}</tab-item>
        </tab>
        <swiper v-model="index" class="tabcontent" :aspect-ratio="1/2" :show-dots="false" >
          <swiper-item v-for="(item,index) in tabs" :key="index">
            <div class="none" v-if="item.len">
              <img :src="require('@/assets/img/User/nocontent.png')">
              <p>暂无预约</p>
            </div>
            <scroller v-else :use-pullup=true :bounce=true :lock-x=true :pullup-config=pullupConfig :scroll-bottom-offset=108 @on-scroll-bottom="getmore(index)">
            <div class="tabcontent-item">
                <cell-box class="yyitem" v-for="(listItem,listIndex) in item.list" :key="listIndex">
                    <div class="content-itemtop">
                        <router-link class="headimg" to="/HousingDetails">
                            <img :src="listItem.img">
                        </router-link>
                        <router-link class="information" to="">
                            <p>预约人：{{listItem.name}}</p>
                            <p>预约时间：{{listItem.room_time}}</p>
                            <p>地址：{{listItem.address}}</p>
                            <p>{{listItem.forn}}{{listItem.remark}}</p>
                        </router-link>
                        <div class="more">
                            <span class="iconfont" @click="morebtn(listIndex,listItem)">&#xe630;</span>
                        </div>
                    </div>
                    <div :class="(listItem.bs=='djx')?'djxbtnlist yybtnlist' : 'yybtnlist'" v-if="listItem.bs=='djx'">
                        <ul>
                            <li>
                                <span class="iconfont">&#xe612;</span>
                                <span>联系预约</span>
                            </li>
                            <li @click="djxmake(listItem.b_id,listIndex)">
                                <span class="iconfont">&#xe6bc;</span>
                                <span>中断预约</span>
                            </li>
                             <li @click="qrwc(listItem.b_id,listIndex)">
                                <span class="iconfont">&#xe6bc;</span>
                                <span>完成预约</span>
                            </li>
                        </ul>
                    </div>
                    <div :class="(listItem.bs=='jxz')?'jxzbtnlist yybtnlist' : 'yybtnlist'" v-if="listItem.bs=='jxz'">
                        <ul>
                            <li>
                                <span class="iconfont">&#xe612;</span>
                                <span>联系预约</span>
                            </li>
                            <li @click="jxzmake(listItem.b_id,listIndex)">
                                <span class="iconfont">&#xe62e;</span>
                                <span>删除记录</span>
                            </li>
                        </ul>
                    </div>
                     <div :class="(listItem.bs=='ls')?'lsbtnlist yybtnlist' : 'yybtnlist'" v-if="listItem.bs=='ls'">
                        <ul>
                            <li @click="lsmake(listItem.b_id,listIndex)">
                                <span class="iconfont">&#xe6f2;</span>
                                <span>删除记录</span>
                            </li>
                        </ul>
                    </div>
                    <div :class="(listItem.bs=='sq')?'sqbtnlist yybtnlist' : 'yybtnlist'" v-if="listItem.bs=='sq'">
                        <ul>
                            <li>
                                <span class="iconfont" @click.prevent="sureyy(listItem.b_id,listIndex)">&#xe613;</span>
                                <span>确认预约</span>
                            </li>
                            <li>
                                <span class="iconfont" @click.prevent="refuseyy(listItem.b_id,listIndex)">&#xe614;</span>
                                <span>拒绝记录</span>
                            </li>
                        </ul>
                    </div>
              </cell-box>
            </div>
           </scroller>
          </swiper-item>
          
        </swiper>
        <confirm v-model="storage.show" title="确定完成吗？" @on-confirm="onConfirm"></confirm>
        <actionsheet v-model="djxshow" :menus="dslmenus"  @on-click-menu-ok="dslsure"></actionsheet>
        <actionsheet v-model="jxzshow" :menus="jxzmenus"  @on-click-menu-ok="jxzsure"></actionsheet>
        <actionsheet v-model="lsshow" :menus="lsmenus" @on-click-menu-ok="lssure"></actionsheet>
  </div>
</template>
<script>
import $ from "jquery";
import { Tab, TabItem, CellBox, Actionsheet, Swiper, SwiperItem,Scroller,Confirm} from "vux";
import { mapActions,mapGetters } from "vuex";
import { error } from 'util';
import { setTimeout } from 'timers';
export default {
  name: "Wdyy",
  data() {
    return {
      msg: "我的预约",
      djxhave: false,
      jxzhave: false,
      lshave: false,
      sqhave: false,
      djxloadswitch:true,//加载开关
      yzdloadswitch:true,
      lsloadswitch:true,
      sqloadswitch:true,
      djxpage:1,//加载页码数
      yzdpage:1,
      lspage:1,
      sqpage:1,
      tabs: [
        {
          title: "待进行",
          list: [
            // {
            //   r_id:"2",
            //   name:"这条是假的",
            //   remark:"这里是备注",
            //   room_time:"2018-06-30",
            //   phone:"15958123761",
            //   img:"require('@/assets/img/User/12d6e7be4f6e93d0203424c05ce1e06c1153bbf41b111-8qN9p0_fw658.jpg",
            //   address:"这里是预约地址",
            //   forn: "备注：",
            //   bs: "djx"
            // }
          ],
          len:false,//这是控制每个swiper有无内容显示的
        },
        {
          title: "已中断",
          list: [
            // {
            //   r_id:"2",
            //   remark:"",
            //   room_time:"",
            //   phone:"",
            //   img:"require('@/assets/img/User/12d6e7be4f6e93d0203424c05ce1e06c1153bbf41b111-8qN9p0_fw658.jpg",
            //   address:"",
            //   forn: "备注：",
            //   bs: "jxz"
            // }
          ],
          len:false
        },
        {
          title: "已完成",
          list: [
            // {
            //   r_id:"2",
            //   remark:"",
            //   room_time:"",
            //   phone:"",
            //   img:"require('@/assets/img/User/12d6e7be4f6e93d0203424c05ce1e06c1153bbf41b111-8qN9p0_fw658.jpg",
            //   address:"",
            //   forn: "已完成",
            //   bs: "ls"
            // }
          ],
          len:false
        },
        {
          title: "预约申请",
          list: [
            // {
            //   r_id:"2",
            //   remark:"",
            //   room_time:"",
            //   phone:"",
            //   img:"require('@/assets/img/User/12d6e7be4f6e93d0203424c05ce1e06c1153bbf41b111-8qN9p0_fw658.jpg",
            //   address:"",
            //   forn: "已完成",
            //   bs: "ls"
            // }
          ],
          len:false
        }
      ],
      djxshow: false,
      jxzshow: false,
      lsshow: false,
      dslmenus: [
        { label: "确定中断预约吗？", type: "info" },
        { label: "确定啦", type: "warn", value: "ok" },
        { label: "再考虑考虑", type: "default" }
      ],
      jxzmenus: [
        { label: "确定删除记录吗？", type: "info" },
        { label: "确定啦", type: "warn", value: "ok" },
        { label: "再考虑考虑", type: "default" }
      ],
      lsmenus: [
        { label: "确定删除记录吗？", type: "info" },
        { label: "确定啦", type: "warn", value: "ok" },
        { label: "再考虑考虑", type: "default" }
      ],
      index: 0,
      pullupConfig:{
        content: '上拉刷新',
        autoRefresh: true,
        downContent: '够啦够啦',
        upContent: '上拉刷新',
        loadingContent: '加载中...',
        clsPrefix: 'pullupConfig-',
      },
      storage:{
        show:false,
        qryyid:"",
        qryyindex:0,
        yzddelid:"",
        yzddelindex:0,
        ywcdelid:"",
        ywcdelindex:0
      }
    };
  },
  components: {
    Tab,
    TabItem,
    CellBox,
    Actionsheet,
    Swiper,
    SwiperItem,
    Scroller ,
    Confirm
  },
  methods: {
    ...mapActions(["action"]),
    infiniteHandler($state){//懒加载的方法

    },
    morebtn(listIndex,listItem){//点击下拉按钮下拉
      if(listItem.bs=="djx"){
        if(!$(".djxbtnlist").eq(listIndex).is(":hidden")){
          $(".djxbtnlist").eq(listIndex).slideUp();
        }else{
          $(".djxbtnlist").slideUp();
          $(".djxbtnlist").eq(listIndex).slideDown();
        }
      }else if(listItem.bs=="jxz"){
        if(!$(".jxzbtnlist").eq(listIndex).is(":hidden")){
           $(".jxzbtnlist").eq(listIndex).slideUp();
        }else{
           $(".jxzbtnlist").slideUp();
           $(".jxzbtnlist").eq(listIndex).slideDown();
        }
      }else if(listItem.bs=="ls"){
        if(!$(".lsbtnlist").eq(listIndex).is(":hidden")){
           $(".lsbtnlist").eq(listIndex).slideUp();
        }else{
           $(".lsbtnlist").slideUp();
           $(".lsbtnlist").eq(listIndex).slideDown();
        }
      }else if(listItem.bs=="sq"){
        if(!$(".sqbtnlist").eq(listIndex).is(":hidden")){
           $(".sqbtnlist").eq(listIndex).slideUp();
        }else{
           $(".sqbtnlist").slideUp();
           $(".sqbtnlist").eq(listIndex).slideDown();
        }
      }

    },
    djxmake(id,index) {//点击待进行中断预约按钮调出弹窗
      this.djxshow = true;
      this.storage.zdyyid=id;
      this.storage.zdyyindex=index;
    },
    jxzmake(id,index) {//点击已中断删除记录按钮调出弹窗
      this.jxzshow = true;
      this.storage.yzddelid=id;
      this.storage.yzddelindex=index;
    },
    lsmake(id,index){
      this.lsshow = true;
      this.storage.ywcdelid=id;
      this.storage.ywcdelindex=index;
    },
    refuseyy(k,t){//点击预约申请中拒绝按钮的方法
      let that=this;
      this.$vux.confirm.show({
        title:"确定拒绝吗？",
        onConfirm (){
          that.action({
            moduleName:"Jjyy",
            url:"Bespeaks/reject",
            method:"post",
            data:{
              token:that.airforce.login_post.data.token,
              id:k.toString()
            }
          }).then((res)=>{
            if(res.code==200){
             that.$vux.toast.text(res.message)
             that.tabs[3].list.splice(t,1);
            }else{
              that.$vux.toast.text(res.message)
            }
          }).catch((err)=>{
            that.$vux.toast.text(err)
          })
        }
      })
    },
    sureyy(k,t){
      this.action({
        moduleName:"Jjyy",
        url:"Adminapi/Bespeaks/affirm",
        method:"post",
        data:{
          token:this.airforce.login_post.data.token,
          id:k.toString(),
        }
      }).then((res)=>{
        if(res.code==200){
             this.$vux.toast.text(res.message)
             this.sqlist.splice(t,1);
          }else{
            this.$vux.toast.text(res.message)
          }
      }).catch((err)=>{
         this.$vux.toast.text(err)
      })
    },
    dslsure(){ //点击待进行中断预约按钮的弹窗的确定按钮事件
      this.action({
        moduleName:"blackout",
        url:"Adminapi/Bespeaks/blackout",
        method:"post",
        data:
        {
          token:this.airforce.login_post.data.token,
          id:this.storage.zdyyid
        }
      }).then((res)=>{
        if(res.code==200){
          this.$vux.toast.text(res.message);
           this.tabs[0].list.splice(this.storage.zdyyindex,1);
        }else{
          this.$vux.toast.text(res.message)
        }
      }).catch((err)=>{
        this.$vux.toast.text(err)
      })
    },
    jxzsure() {//点击已中断删除记录按钮的弹窗的确定按钮事件
      this.action({
        moduleName:"delete",
        url:"Adminapi/Bespeaks/delete",
        method:"post",
        data:
        {
          token:this.airforce.login_post.data.token,
          id:this.storage.yzddelid
        }
      }).then((res)=>{
        if(res.code==200){
          this.$vux.toast.text(res.message)
          this.tabs[1].list.splice(this.storage.yzddelindex,1);
        }else{
          this.$vux.toast.text(res.message)
        }
      }).catch((err)=>{
        this.$vux.toast.text(err)
      })
    },
    lssure() {//点击已完成删除记录按钮的弹窗的确定按钮事件
      this.action({
        moduleName:"delete",
        url:"Adminapi/Bespeaks/delete",
        method:"post",
        data:
        {
          token:this.airforce.login_post.data.token,
          id:this.storage.ywcdelid
        }
      }).then((res)=>{
        if(res.code==200){
          this.$vux.toast.text(res.message)
          this.tabs[2].list.splice(this.storage.ywcdelindex,1);
        }else{
          this.$vux.toast.text(res.message)
        }
      }).catch((err)=>{
        this.$vux.toast.text(err)
      })
    },
    qrwc(id,index){//点击完成预约按钮调出弹窗
      this.storage.show=true;
      this.storage.qryyid=id;
      this.storage.qryyindex=index;
    },
    onConfirm(){//点击完成预约的弹窗的确定按钮事件
      this.action({
        moduleName:"affirm",
        url:"Adminapi/Bespeaks/affirm",
        method:"post",
        data:
        {
          token:this.airforce.login_post.data.token,
          id:this.storage.qryyid
        }
      }).then((res)=>{
        if(res.code==200){
          this.$vux.toast.text(res.message);
          this.tabs[0].list.splice(this.storage.qryyindex,1);
        }else{
          this.$vux.toast.text(res.message)
        }
      }).catch((err)=>{
        this.$vux.toast.text(err)
      })
    },
    getmore(i){//滚动到底部时触发
    // console.log("下拉被触发")
      if(i==0){//判断下拉触发的是待进行
       //console.log("已进入触发待进行下拉")
        if(this.djxloadswitch==true){
          console.log("已通过待进行下拉开关")
          this.djxloadswitch=false;
          this.action({
            moduleName:"Wdyyxl",
            url:"adminapi/Bespeaks/lists",
            method:"post",
            data:
            {
              token:this.airforce.login_post.data.token,
              type:"2",
              page:this.djxpage.toString(),
              pagesize:"9",
              status:"3"
            }
          }).then((res)=>{
            if(res.code==200){
              for(let i=0;i<res.data.lists.length;i++){
                res.data.lists[i].bs="djx";
                res.data.lists[i].forn="备注";
                this.tabs[0].list.push(res.data.lists[i]);
              }
              if(res.data.lists.length<9){
                this.djxloadswitch=false;
              }else{
                this.djxloadswitch=true;
              }
              console.log("页码",this.djxpage,"数据条数",this.tabs[0].list.length)
              this.djxpage++;
            }else{
              this.$vux.toast.text(res.message);
            }
          }).catch((err)=>{
              this.$vux.toast.text(err);
          })
        }else{
          return false;
        }
      }else if(i==1){//已中断的下拉申请
        if(this.yzdloadswitch==true){
          console.log("已通过已中断下拉开关")
          this.yzdloadswitch=false;
          this.action({
              moduleName:"Wdyyxl",
              url:"adminapi/Bespeaks/lists",
              method:"post",
              data:
              {
                token:this.airforce.login_post.data.token,
                type:"2",
                page:this.djxpage.toString(),
                pagesize:"9",
                status:"2"
              }
          }).then((res)=>{
            if(res.code==200){
              for(let i=0;i<res.data.lists.length;i++){
                res.data.lists[i].bs="jxz";
                res.data.lists[i].forn="备注";
                this.tabs[1].list.push(res.data.lists[i]);
              }
              if(res.data.lists.length<9){
                this.yzdloadswitch=false;
              }else{
                this.yzdloadswitch=true;
              }
              console.log("页码",this.yzdpage,"数据条数",this.tabs[1].list.length)
              this.yzdpage++;
            }else{
               this.$vux.toast.text(res.message);
            }
          }).catch((err)=>{
              this.$vux.toast.text(err);
          })
        }else{
          return false;
        }
      }else if(i==2){//已完成的下拉申请
        if(this.lsloadswitch==true){
          console.log("已通过已完成下拉开关")
          this.lsloadswitch=false;
          this.action({
              moduleName:"Wdyyxl",
              url:"adminapi/Bespeaks/lists",
              method:"post",
              data://{"token":"8c19b9067de5d86dcd9f57d2d378e496","order_sn":"2018052152985610","type":"1"}
              {
                token:this.airforce.login_post.data.token,
                type:"2",
                page:this.djxpage.toString(),
                pagesize:"9",
                status:"1"
              }
          }).then((res)=>{
            if(res.code==200){
              for(let i=0;i<res.data.lists.length;i++){
                res.data.lists[i].bs="ls";
                res.data.lists[i].forn="备注";
                this.tabs[2].list.push(res.data.lists[i]);
              }
              if(res.data.lists.length<9){
                this.lsloadswitch=false;
              }else{
                this.lsloadswitch=true;
              }
              console.log("页码",this.lspage,"数据条数",this.tabs[2].list.length)
              this.lspage++;
            }else{
               this.$vux.toast.text(res.message);
            }
          }).catch((err)=>{
            this.$vux.toast.text(err);
          })
        }else{
          return false;
        }
      }else if(i==3){
        if(this.sqloadswitch==true){
          this.sqloadswitch=false;
          this.action({
              moduleName:"Wdyyxl",
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
          }).then((res)=>{
            if(res.code==200){
              for(let i=0;i<res.data.lists.length;i++){
                res.data.lists[i].bs="sq";
                res.data.lists[i].forn="备注";
                this.tabs[3].list.push(res.data.lists[i]);
              }
              if(res.data.lists.length<9){
                this.sqloadswitch=false;
              }else{
                this.sqloadswitch=true;
              }
              console.log("页码",this.lspage,"数据条数",this.tabs[3].list.length)
              this.sqpage++;
            }else{
               this.$vux.toast.text(res.message);
            }
          }).catch((err)=>{

          })
        }
      }
    }
  },
  mounted() {
    this.action({
      moduleName: "layout",
      goods: {
        clickRight: () => {
          this.$router.push("/Yysq");
        }
      }
    });
  },
  computed:{
    ...mapGetters(["airforce"]),
  },
  created(){
    this.action({//页面进入初始渲染已完成列表
      moduleName:"Wdyy",
      //fullUrl:"https://www.easy-mock.com/mock/5ab89437ade6f916f6ce4661/Wdyy",
      url:"adminapi/Bespeaks/lists",
      method:"post",
      data:
      {
        token:this.airforce.login_post.data.token,
        type:"2",
        page:this.djxpage.toString(),
        pagesize:"9",
        status:"1"
      }
    }).then(res=>{
      if(res.code==200){
        for(let i=0;i<res.data.lists.length;i++){//把得到的数据循环添加属性后添加到对应的数组内
          res.data.lists[i].bs="ls";
          res.data.lists[i].forn="已完成";
          this.tabs[2].list.push(res.data.lists[i]);
        }
        if(this.tabs[2].list.length==0){//当获取完数据得到的数组长度为0时，显示没有数据
          this.tabs[2].len=true;
        }else if(res.data.lists.length<5){////当获取完数据得到的数组长度小于请求的长度时，关闭上拉加载开关
          this.lsloadswitch=false;
        }
        this.lspage++;
      }else{
        this.tabs[2].len=true;
        this.$vux.toast.text(res.message);
      }
    }).catch(err=>{
        this.tabs[2].len=true;
        this.$vux.toast.text(err);
    })

     this.action({//页面进入初始渲染已中断列表
      moduleName:"Wdyy",
      url:"adminapi/Bespeaks/lists",
      method:"post",
      data://{"token":"8c19b9067de5d86dcd9f57d2d378e496","order_sn":"2018052152985610","type":"1"}
      {
        token:this.airforce.login_post.data.token,
        type:"2",
        page:this.yzdpage.toString(),
        pagesize:"9",
        status:"2"
      }
    }).then(res=>{
      if(res.code==200){
        for(let i=0;i<res.data.lists.length;i++){
          res.data.lists[i].bs="jxz";
          res.data.lists[i].forn="备注:";
          this.tabs[1].list.push(res.data.lists[i]);
        }
        if(this.tabs[1].list.length==0){
          this.tabs[1].len=true;
        }else if(res.data.lists.length<5){
          this.yzdloadswitch=false;
        }
        this.yzdpage++;
      }else{
        this.tabs[1].len=true;
        this.$vux.toast.text(res.message);
      }
    }).catch(err=>{
        this.tabs[1].len=true;
        this.$vux.toast.text(err);
    })

     this.action({//页面进入初始渲染待进行列表
      moduleName:"Wdyy",
      url:"adminapi/Bespeaks/lists",
      method:"post",
      data://{"token":"8c19b9067de5d86dcd9f57d2d378e496","order_sn":"2018052152985610","type":"1"}
      {
        token:this.airforce.login_post.data.token,
        type:"2",
        page:this.lspage.toString(),
        pagesize:"9",
        status:"3"
      }
    }).then(res=>{
      if(res.code==200){  
        for(let i=0;i<res.data.lists.length;i++){
          res.data.lists[i].bs="djx";
          res.data.lists[i].forn="备注:";
          this.tabs[0].list.push(res.data.lists[i]);
        }
        //console.log(this.tabs[0])
        if(this.tabs[0].list.length==0){
          this.tabs[0].len=true;
        }else if(res.data.lists.length<5){
          this.djxloadswitch=true;
        }
        this.djxpage++;
      }else{
        this.tabs[0].len=true;
        this.$vux.toast.text(res.message);
      }
    }).catch(err=>{
      this.tabs[0].len=true;
        this.$vux.toast.text(err);
    })

    this.action({//页面进入初始渲染申请列表
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
      if(res.code==200){  
        for(let i=0;i<res.data.lists.length;i++){
          res.data.lists[i].bs="sq";
          res.data.lists[i].forn="备注:";
          this.tabs[3].list.push(res.data.lists[i]);
        }
        //console.log(this.tabs[0])
        if(this.tabs[3].list.length==0){
          this.tabs[3].len=true;
        }else if(res.data.lists.length<5){
          this.sqloadswitch=true;
        }
        this.sqpage++;
      }else{
        this.tabs[0].len=true;
        this.$vux.toast.text(res.message);
      }
    }).catch(err=>{
      this.tabs[0].len=true;
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
.Wdyy {
  .headtab {
    position: fixed;
    left: 0;
    top: 41px;
    width: 100%;
    z-index: 10;
  }
  &/deep/ .tabcontent,.vux-slider {
    margin-top: 44px;
    overflow: visible;
    display: block;
    .vux-swiper {
       height: auto!important;
       min-height: 100% !important;
       width: 100%;
       overflow: visible;
      .vux-swiper-item {
        height: 100%;

        .tabcontent-item {//在这里
          // display: none;
          .yyitem {
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
                  // color: #c5c5c5;

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
            .yybtnlist {
              display: none;
              ul {
                width: 100%;
                padding-top: 10px;
                display: flex;
                justify-content: space-around;
                // display:none;
                li {
                  display: inline-block;
                  a {
                    display: block;
                  }
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
      }
    }

    .djx {
      display: block;
    }
  }
}
</style>
