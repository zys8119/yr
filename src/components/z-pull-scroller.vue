<template>
    <div class="z-pull-scroller">
        <scroller ref="scrollerBottom" lock-x :height="height" :scroll-bottom-offst="bottom" @on-scroll-bottom="onScrollBottom">
            <div>
                <slot></slot>
                <load-more v-if="load" :tip="loadText"></load-more>
                <load-more v-if="loadEnd" :show-loading="false" :tip="loadEndText"></load-more>
                <load-more v-if="loadStart" :show-loading="false" :tip="loadStartText"></load-more>
            </div>
        </scroller>
    </div>
</template>

<script>
    import { Scroller, LoadMore} from 'vux'
    export default {
        name: "z-pull-scroller",
        components:{ Scroller, LoadMore},
        data(){
          return {
              load:false,
              loadText:"正在加载",
              loadEnd:false,
              loadEndText:"到底啦",
              loadStart:true,
              loadStartText:"下拉加载更多",

          }
        },
        props:{
            height:{
                type:String,
                default:'300px'
            },
            bottom:{
                type:Number,
                default:20
            }
        },
        methods:{
            reset(con = {}){
                this.$refs.scrollerBottom.reset(con);
            },
            onScrollBottom(){
                // if (this.onFetching) {
                //     // do nothing
                // } else {
                //     this.onFetching = true
                    this.$emit("change",this);
                // }
            },
        }
    }
</script>

<style scoped lang="less">
.z-pull-scroller{

}
</style>