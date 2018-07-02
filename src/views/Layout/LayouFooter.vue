<template>
    <div class="layou-footer">
        <div class="layou-footer-box">
            <flexbox class="layou-footer-flexbox">
                <flexbox-item v-for="(item,index) in menuList" :key="`menuItem${index}`"  :class="`layou-footer-flexbox-item ${(item.name == airforce.layout.menuName) ?  'select' : ''}`" @click.native="go(item)">
                    <div v-if="item.type == 1">
                        <div :class="`iconfont icon${index+1}`" v-html="item.icon"></div>
                        <div class="text">{{item.title}}</div>
                    </div>
                    <div v-else>
                        <div :class="`iconfont releaseIcon icon${index+1} ${(releaseIconSelect)? 'releaseIconSelect':''}`" @click="release" v-html="item.icon">&#xe648;</div>
                        <div class="text" @click="release">{{item.title}}</div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <release-box v-model="releaseIconSelect"></release-box>
    </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux'
import { mapGetters } from 'vuex'
import { ReleaseBox } from '@/components'
export default {
  name: 'layou-footer',
  components: { Flexbox, FlexboxItem, ReleaseBox },
  data () {
    return {
      releaseIconSelect: false,
      menuList: [
        {
          title: '首页',
          name: 'Home',
          icon: '&#xe655;',
          type: 1,
          link: '/Home'
        },
        {
          title: '分享',
          name: 'Share',
          icon: '&#xe6b2;',
          type: 1,
          link: '/Share'
        },
        // {
        //   title: '发布',
        //   name: '发布',
        //   icon: '&#xe648;',
        //   type: 2
        // },
        {
          title: '消息',
          name: 'Message',
          icon: '&#xe64c;',
          type: 1,
          link: '/Message'
        },
        {
          title: '个人中心',
          name: 'User',
          icon: '&#xe633;',
          type: 1,
          link: '/User'
        }
      ]
    }
  },
  methods: {
    release () {
      this.releaseIconSelect = !this.releaseIconSelect
    },
    go (item) {
      if (item.link) {
        this.$router.push(item.link)
      }
    }
  },
  computed: {
    ...mapGetters(['airforce'])
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/color.less";
.layou-footer{
    .layou-footer-box{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        padding-bottom: 2px;
        max-height: 50px;
        background-color: @cor_ffffff;
        z-index: 490;
        border-top: 1px solid @cor_D9D9D9;
        .layou-footer-flexbox{
            .layou-footer-flexbox-item{
                text-align: center;
                color: @cor_a9a7ab;
                .text{
                    font-size: 12px;
                    font-size: 0.8em;
                }
                .iconfont{
                    font-size: 20px;
                    &.icon1{
                        transform: scale(1.5);
                    }
                    &.icon3{
                        transform: scale(1.1);
                    }
                    &.icon4{
                        transform: scale(1.1);
                    }
                    @keyframes rotate0 {
                        0%{
                            transform: rotate(45deg);
                        }
                        100% {
                            transform: rotate(0deg);
                        }
                    }
                    &.releaseIcon{
                        position: relative;
                        font-size: 50px;
                        margin-bottom: -25px;
                        bottom: 30px;
                        line-height: 50px;
                        color: @cor_1bd182;
                        transform: rotate(0deg);
                        animation: rotate0 0.5s ease-in-out;
                        -webkit-animation: rotate0 0.5s ease-in-out;
                        &:before{
                            content: '';
                            background-color: @cor_ffffff;
                            width: 40px;
                            height: 40px;
                            display: inline-block;
                            position: absolute;
                            z-index: -1;
                            left: -15px;
                            top: 5px;
                            transform: translateX(30px);
                            border-radius: 100%;
                        }
                        @keyframes rotate45 {
                            0%{
                                transform: rotate(0deg);
                            }
                            100% {
                                transform: rotate(45deg);
                            }
                        }
                        &.releaseIconSelect{
                            color: @cor_a9a7ab;
                            transform: rotate(45deg);
                            animation: rotate45 0.5s ease-in-out;
                            -webkit-animation: rotate45 0.5s ease-in-out;
                        }
                    }
                }
                &.select{
                    color: @theme-color;
                }
            }
        }
    }
}
</style>
