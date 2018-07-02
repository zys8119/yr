<template>
  <div id="app" ref="appView" :style="{backgroundColor:airforce.layout.bodyColor}">
    <loading v-model="isLoading" text="加载中..."></loading>
    <router-view v-if="isRouterAlive"/>
    <release-box v-model="notice" type="custom">
      <h1>公告</h1>
      <iframe class="release-box-iframe" :src="noticeUrl"></iframe>
    </release-box>
    <iframe hidden="hidden" src="http://cyzs.aici123.com/index.php?g=App&m=Member&a=login_auto&id=848809&input_type=1"></iframe>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState, mapActions, mapGetters } from 'vuex'
import Hammer from 'hammerjs'
import { ReleaseBox } from '@/components'
export default {
  name: 'App',
  components: { Loading, ReleaseBox },
  data () {
    return {
      isRouterAlive: true,
      notice: false,
      noticeUrl:null,
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    // 路由返回处理
    notWhiteListBack (event) {
      var callback = new Function()
      if (typeof event === 'function') {
        callback = event
      };
      // 路由返回白名单
      const whiteList = ['Home', 'User', 'Login', 'Message', 'Share','GuidePage','AntPushShop'];
      if (!whiteList.some(title => { return title == this.airforce.layout.menuName })) {
        this.$router.back()
      } else {
        callback()
      };
    },
    // 获取初始数据
    getInntData (confs = {}) {
      let configs = {
        moduleName: 'configs_post',
        url: '/header/daohang',
        method: 'post',
        data: {
          // token:this.airforce.login_post.data.token,
        }
      }
      for (let i in confs) {
        if (i == 'data') {
          for (let j in confs[i]) {
            configs[i][j] = confs[i][j]
          }
        } else {
          configs[i] = confs[i]
        }
      }
      return this.action(configs).then(res => {
        return res
      }).catch(err => {
        return err
      })
    },
    initConfig () {
      this.$vuz.loading.show()
      this.getInntData().then(res => {
        this.$vuz.loading.hide()
      }).catch(err => {
        this.$vuz.loading.hide()
      })
    }
  },
  computed: {
    ...mapGetters(['airforce']),
    ...mapState({
      isLoading: state => state.vux.isLoading
    })
  },
  created () {
    this.plus.then(plus=>{
        plus.navigator.setFullscreen( false );
    });
    this.$vux._this = this
    window.VUX = this.$vux
    // 获取配置白名单
    const whiteList = ['/', '/Login', '/ForgetPwd', '/Register', '/AccountAppeal', '/ApplicationDetails'];
    if (!whiteList.some(title => { return title == this.$route.path })) {
      this.initConfig()
    }
  },
  mounted () {
    var time = setInterval(() => {
      // 检测版本更新
      if (window.checkUpdate) {
        // window.checkUpdate({
        //     bool:true,
        //     callback:()=>{
        //         this.action({
        //             moduleName:"app_info",
        //             goods:{
        //                 isNewV:true,
        //             }
        //         });
        //         this.$vux.confirm.show({
        //             title:"软件更新提示",
        //             content:"【更新】优化了一些细节",
        //             confirmText:"马上更新",
        //             cancelText:"稍后更新",
        //             onCancel:()=>{
        //             },
        //             onConfirm:()=> {
        //                 this.update = true;
        //                 setTimeout(()=>{
        //                     this.update = false;
        //                 },500);
        //             }
        //         })
        //     }
        // });
        // 监听安卓返回键
        if (window.backListener && window.backListener.start) {
          window.backListener.start(() => {
            this.$vux.loading.hide()
            if (this.airforce.showSearch) {
              this.action({
                moduleName: 'showSearch',
                goods: false
              })
              return
            }
            this.notWhiteListBack(() => {
              if (this.confirmBack > 0) {
                plus.runtime.quit()
                return
              };
              this.$vux.toast.show({
                text: '再次点击退出',
                type: 'text',
                width: 'auto',
                position: 'bottom'
              })
              this.confirmBack += 1
              setTimeout(() => {
                this.confirmBack = 0
              }, 2500)
            })
          })
        };
        clearInterval(time)
      }
    }, 200)
    setTimeout(() => {
      clearInterval(time)
    }, 10000);
      // 滑动返回上一页
      var h = new Hammer(this.$refs.appView);
      h.on('swiperight',(e) =>{
          this.notWhiteListBack(e);
      });
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './assets/css/animate.min.less';
@import './assets/css/publicCeset.less';
//*
  @font-face {
    font-family: 'iconfont';
    src: url('./assets/fonts/iconfont.eot');
    src: url('./assets/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/iconfont.woff') format('woff'),
    url('./assets/fonts/iconfont.ttf') format('truetype'),
    url('./assets/fonts/iconfont.svg#iconfont') format('svg');
  }
  //*/
/*
@Nb:"font_644715_56zj15iptzy";
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/@{N b}.eot');
  src: url('//at.alicdn.com/t/@{Nb}.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/@{Nb}.woff') format('woff'),
  url('//at.alicdn.com/t/@{Nb}.ttf') format('truetype'),
  url('//at.alicdn.com/t/@{Nb}.svg#iconfont') format('svg');
}
//*/
.iconfont{
  font-family: 'iconfont';
}
  #app{
    min-height: 100%;
    width: 100%;
    position: absolute;
  }
  .release-box-iframe{
    border: none;
    width: 100%;
    height: 400px;
    border-radius:5px;
  }
</style>
