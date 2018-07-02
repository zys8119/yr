<template>
    <div class="Home">
        <swiper :list="bannerlist" :show-desc-mask="false"></swiper>
        <div class="iconsBox">
            <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span="1/4" v-for="(item,index) in configs" :key="`configs${index}`" :class="`configs${index}`" @click.native="go(item)">
                    <!--<div :class="{iconfont:true,select:item.select}" v-html="item.icon" :style="{color:item.color}"></div>-->
                    <img class="icon" :src="item.img">
                    <div :class="{text:true,select:item.bool}">{{item.title}}</div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="info">
            <flexbox>
                <flexbox-item span="60">
                    <img :src="headlines.img">
                </flexbox-item>
                <flexbox-item  class="right">
                    <div class="title">{{headlines.texts}}</div>
                    <swiper v-if="headlinesList.length > 0" auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
                        <swiper-item class="notable" headlinesList v-for="item,index in headlinesList" :key="index"><p>{{item.con}}</p></swiper-item>
                    </swiper>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="card">
            <div class="title">
                <flexbox>
                    <flexbox-item class="left" span="30">
                        <img :src="hots.img">
                    </flexbox-item>
                    <flexbox-item class="right">
                        <h2>{{hots.title}}</h2>
                        <p>{{hots.texts}}</p>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="content">
                <z-scroller :list="hotList" @item-click="go"></z-scroller>
            </div>
        </div>
        <div class="card">
            <div class="title">
                <flexbox>
                    <flexbox-item class="left" span="30">
                        <img :src="invite.img">
                    </flexbox-item>
                    <flexbox-item class="right">
                        <h2>{{invite.title}}</h2>
                        <p>{{invite.texts}}</p>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="content">
                <img class="img" @click="go(invite)" :src="invite.url">
            </div>
        </div>
        <div>
            <sticky
                    ref="sticky"
                    :offset="40"
                    :check-sticky-support="false"
                    :disabled="disabled">
                <tab :line-width="1">
                    <tab-item @on-item-click="docSortTabClick(item)" :selected="index == 0" v-for="item,index in docSortTab" :key="index">{{item.name}}</tab-item>
                </tab>
            </sticky>
            <div class="stickyList">
                <z-pull-scroller ref="ZPullScroller" :height="height" @change="change">
                    <panel class="stickyList-panel" :list="stickyList" type="5"></panel>
                </z-pull-scroller>
            </div>
        </div>
    </div>
</template>

<script>
import Public from '@/store/public.js'
import { ZScroller,ZPullScroller } from '@/components'
import { XAddress, ChinaAddressV4Data, Countup, Flexbox, FlexboxItem, XImg, Divider, Swiper, SwiperItem,Tab, TabItem, Sticky, Group, Panel, Scroller, LoadMore  } from 'vux'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'home',
  components: { XAddress, Countup, Flexbox, FlexboxItem, ZScroller, XImg, Divider, Swiper, SwiperItem,Tab, TabItem, Sticky, Group, Panel, Scroller, LoadMore, ZPullScroller  },
  data () {
    return {
        Win_innerHeight:window.innerHeight,
        disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
    }
  },
  methods: {
      go(item){
          if(item.route && item.route.length > 0){
              this.$router.push(item.route+"?id="+item.id);
              return;
          }
          if(!item.title){
              item.title = item.post_title;
          }
          this.$router.push("/DocDetails?docSee="+item.url+"&docSeeTitle="+item.title);
      },
      docSortTabClick(item){
          this.action({
              moduleName:'Home_tabItem',
              goods:_.set({select:item.term_id},item.term_id,[]),
          });
          this.$refs.ZPullScroller.loadEnd = false;
          this.getDocList({term_id:item.term_id});
      },
      getRelationshipsList(cons = {},moduleName = "relationshipsList"){
          this.action({
              moduleName:moduleName,
              goods:null,
          });
          return this.action({
              moduleName:moduleName,
              url:'/header/relationships',
              method:"post",
              data:_.merge({
                  token:this.airforce.login_post.data.token,
              },cons)
          })
      },
      getDocList(con){
          let config = _.merge({
              page:1,
              //默认每次20条
              pagesize:20,
          },con);
          if(!this.airforce.Home_tabItem || !this.airforce.Home_tabItem[config.term_id+"config"]){
              this.action({
                  moduleName:'Home_tabItem',
                  goods:_.set({},config.term_id+"config",config),
              });
          }else {
              config = _.merge(config,this.airforce.Home_tabItem[config.term_id+"config"]);
          }
          this.$refs.ZPullScroller.loadStart = false;
          this.$refs.ZPullScroller.load = true;
          this.getRelationshipsList(config).then(ress=>{
              this.$refs.ZPullScroller.load = false;
              if(ress.code == 200){
                  if(this.airforce.Home_tabItem[config.term_id]){
                      this.action({
                          moduleName:'Home_tabItem',
                          goods:_.set({},config.term_id,this.airforce.Home_tabItem[config.term_id].concat(ress.data.data)),
                      });
                  }else {
                      this.action({
                          moduleName:'Home_tabItem',
                          goods:_.set({},config.term_id,ress.data.data),
                      });
                  }
                  this.action({
                      moduleName:'Home_tabItem',
                      goods:_.set({},config.term_id+"config.page",this.airforce.Home_tabItem[config.term_id+"config"].page + 1),
                  });
                  if(ress.data.count == this.airforce.Home_tabItem[config.term_id].length){
                      this.$refs.ZPullScroller.loadEnd = true;
                      this.$refs.ZPullScroller.loadStart = false;
                  }else{
                      this.$refs.ZPullScroller.loadStart = true;
                      this.$refs.ZPullScroller.loadEnd = false;
                  }
              }else {
                  this.$refs.ZPullScroller.load = false;
                  this.$refs.ZPullScroller.loadEnd = false;
                  this.$refs.ZPullScroller.loadStart = true;
              };
          }).catch(err=>{
              this.$refs.ZPullScroller.load = false;
              this.$refs.ZPullScroller.loadEnd = false;
              this.$refs.ZPullScroller.loadStart = true;
          });
      },
      change(_vm){
          if(_vm.loadStart){
              this.getDocList({term_id:this.airforce.Home_tabItem.select});
              _vm.reset({top:0});
          }
      },
      search(val,_vm){
          if(val){
              this.$vuz.loading.show({theme:"transparent",text:"搜索中"});
              this.getRelationshipsList({search:val},"SearchData").then(res=>{
                  this.$vuz.loading.hide();
              }).catch(err=>{
                  this.$vuz.loading.hide();
              });
          }else {
              this.action({
                  moduleName:'SearchData',
                  goods:null
              });
              this.action({
                  moduleName:'SearchData',
                  goods:[]
              });
              if(typeof val != 'undefined' && this.$utils.is_S(val) && val.length == 0){
                  this.$vux.toast.text("请输入搜索内容");
                  return;
              }
          }
      },
      searchOnClose(val,Item){
          if(Item){
              this.go(Item);
          };
      }
  },
  computed: {
      configs(){
          try {
              if(this.airforce.configs_post.data){
                  return JSON.parse(JSON.stringify(this.airforce.configs_post.data)).filter(e=>{
                      return e.type == '1';
                  }).map(e=>{
                      if(e.icon){
                          try {
                              e.icon = this.$utils.escape2Html(e.icon);
                          }catch (e){}
                      }
                      return e;
                  });
              }
          }catch (e){}
          return [
              {icon:'&#xe63f;',title:"--"},
              {icon:'&#xe63f;',title:"--"},
              {icon:'&#xe63f;',title:"--"},
              {icon:'&#xe63f;',title:"--"},
              {icon:'&#xe63f;',title:"--"},
              {icon:'&#xe63f;',title:"--"},
              {icon:'&#xe63f;',title:"--"},
              {icon:'&#xe63f;',title:"--"},
          ]
      },
      bannerlist(){
          try {
              if(this.airforce.configs_post.data){
                  return JSON.parse(JSON.stringify(this.airforce.configs_post.data)).filter(e=>{
                      return e.type == '5';
                  }).map(e=>{
                      if(typeof e.url != 'string' || e.url.replace(/\s/g,'').length == 0){
                          e.url = "javascript:"
                      }else {
                          e.url = "/#/DocDetails?docSee="+e.url+"&docSeeTitle="+e.title;
                      };
                      return e;
                  });
              }
          }catch (e){}
          return [
              {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5"}
          ];
      },
      headlines(){
          try {
              if(this.airforce.configs_post.data){
                  return _.find(this.airforce.configs_post.data,{type:'6'});
              }
          }catch (e){}
          return [
              {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5",texts:''}
          ];
      },
      headlinesList(){
          try {
              if(this.airforce.headlinesList.code == 200){
                  return this.airforce.headlinesList.data;
              }
          }catch (e){}
        return [];
      },
      hots(){
          try {
              if(this.airforce.configs_post.data){
                  return _.find(this.airforce.configs_post.data,{type:'7'});
              }
          }catch (e){}
          return [
              {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5",title:'',texts:''}
          ];
      },
      invite(){
          try {
              if(this.airforce.configs_post.data){
                  return _.find(this.airforce.configs_post.data,{type:'8'});
              }
          }catch (e){}
          return [
              {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5",title:'',texts:''}
          ];
      },
      docSortTab(){
          try {
              if(this.airforce.docSortTab.code == 200){
                  return this.airforce.docSortTab.data;
              }
          }catch (e){}
          return [];
      },
      stickyList(){
          try {
              const relationshipsList = JSON.parse(JSON.stringify(this.airforce.Home_tabItem[this.airforce.Home_tabItem.select]))
              return relationshipsList.map(e=>{
                  e.title = e.post_title;
                  e.src = e.img;
                  e.desc = e.post_excerpt;
                  e.url = {
                      path: "/DocDetails?docSee="+e.url+"&docSeeTitle="+e.title
                  };
                  e.meta = {
                      source: e.post_date,
                      date:e.post_hits +  '已读 ' ,
                      other:'vip可见 '
                  };
                  return e;
              });
          }catch (e){}
          return [];
      },
      hotList(){
          try {
              if(this.airforce.hotList.code == 200){
                  const relationshipsList = JSON.parse(JSON.stringify(this.airforce.hotList))
                  return relationshipsList.data.data
              }
          }catch (e){}
          return [];
      },
      height(){
          return this.Win_innerHeight - 84 - 53 + "px"
      }
  },
  created(){
      if(!this.airforce.noticeAlert){
          this.action({
              moduleName:"AppNotice",
              url:'/header/notice',
              method:"post",
              data:{
                  token:this.airforce.login_post.data.token,
                  page:1,
                  pagesize:20
              }
          }).then(res=>{
              try {
                  if(res.code == 200 && res.data.count &&  parseInt(res.data.count) > 0){
                      const data = res.data.data[0];
                      this.$root.$children[0].notice = true;
                      this.$root.$children[0].noticeUrl = data.url;
                      this.action({
                          moduleName:"noticeAlert",
                          goods:true,
                      });
                      this.plus.then(plus=>{
                          plus.push.addEventListener( "click", ( msg ) =>{
                              this.go(msg.payload);
                          });
                          plus.push.createMessage('【公告】'+data.post_title, "",{cover:true});
                      })
                  }
              }catch (e){}
          });
      }
  },
  mounted () {
      window.onresize = ()=>{
          this.Win_innerHeight = window.innerHeight;
      };
      this.action({
          moduleName: 'layout',
          goods: {
              clickLeft: () => {
                  location.href = "tel:400-123456"
              },
              search:this.search,
              searchOnClose:this.searchOnClose,
          }
      });
      //头条数据
      this.action({
          moduleName:"headlinesList",
          url:'/header/promoter',
          method:"post",
          data:{
              token:this.airforce.login_post.data.token,
          }
      });
      //热点文章
      this.getRelationshipsList({
          page:1,
          pagesize:100,
          istop:1,
      },"hotList");
      // 文章分类
      this.action({
          moduleName:"docSortTab",
          url:'/header/term',
          method:"post",
          data:{
              token:this.airforce.login_post.data.token,
          }
      }).then(res=>{
          if(res.code == 200 && res.data.length > 0){
              //获取对应分类的数据
              try {
                  this.docSortTabClick(res.data[0]);
              }catch (e){}
          }
      });
  },
}
</script>

<style scoped lang="less">
@import "../../assets/css/color.less";
.Home{
    .iconsBox{
        background-color: @cor_ffffff;
        padding: @maTop @paIndex;
        text-align: center;
        font-size: 12px;
        *{
            text-align:center;
        }
        .icon{
            @index:20px;
            width: @index;
            height: @index;
            display: block;
            border: none;
            margin: auto;
        }
        .text{
            margin-bottom: @maTop;
        }
    }
    .info{
        background-color: @cor_ffffff;
        margin-top: @maTop;
        padding: @maTop @paIndex;
        img{
            width: 100%;
            height: 100%;
        }
        .right{
            position: relative;
            &:before{
                content: '';
                width: 1px;
                height: 100%;
                position: absolute;
                left: @maTop;
                top: 0;
                background-color: @cor_D9D9D9;
            }
            .title{
                padding-left: @maTop;
                margin-left: @maTop;
                font-size: 14px;
                .textNowrap();
            }
            .notable{
              .title;
              p{
                  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
                  font-size: 12px;
              }
            }
        }
    }
    .card{
        background-color: @cor_ffffff;
        margin-top: @maTop;
        padding: @maTop @paIndex;
        .title{
            border-bottom: 1px solid #d9d9d9;
            .left{
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .right{
                h2{
                    float: left;
                    display: inline-block;
                    line-height: 40px;
                    font-size: 16px;
                    margin-right: @maTop;
                }
                p{
                    float: left;
                    max-width: 70%;
                    line-height: 40px;
                    display: inline-block;
                    font-size: 12px;
                    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
                };
            }
        }
        .content{
            .img{
                width: 100%;
                height: 100px;
                margin-top: @maTop;
            }
        }
    }
    &/deep/ .stickyList{
        .stickyList-panel{
            img{
                width: 60px;
                height: 60px;
            }
        }
    }
}
</style>
