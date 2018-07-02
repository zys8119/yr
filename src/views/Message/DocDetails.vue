<template>
    <div class="DocDetails">
        <!--{{src}}-->
        <iframe :class="{show:!!src}" :src="src" v-on:load="onload()"  v-on:error="error()" frameborder="0" allowfullscreen></iframe>
        <div :class="{hide:!!src}" class="warnBox">
            <icon type="warn" is-msg></icon>
            <div class="warn">页面有误！</div>
        </div>
    </div>
</template>

<script>
    import { Icon } from 'vux'
    export default {
        name: "doc-details",
        data(){
            return {
                vuegConfig:{
                    forwardAnim:"fadeInDown",
                }
            }
        },
        components:{ Icon },
        methods:{
            onload(){
                this.$vuz.loading.hide();
            }
        },
        computed:{
            src(){
                if(this.$route.query.docSee){
                    let Url = this.$route.query.docSee.replace(/(^('|"))|(('|")$)|\s/g,'');
                    if(Url.length > 0){
                        for(let i in this.$route.query){
                            if(i != "docSee" && i != 'docSeeTitle'){
                                Url += ("&"+i+"="+this.$route.query[i]);
                            }
                        };
                        if(/\S*(http|https)\S*:\S*(\\\/\\\/|\/\/)/.test(this.$route.query.docSee)){
                            return Url;
                        }else {
                            return $$docWww+Url;
                        }
                    }else {
                        false
                    }
                }else {
                    return false;
                }
            }
        },
        mounted(){
            // this.$vuz.loading.show({theme:"transparent"});
            if(!this.src){
                // this.$vuz.loading.hide();
            };
            if(this.$route.query.docSeeTitle){
                this.action({
                    moduleName:'layout',
                    goods:{
                        title:this.$route.query.docSeeTitle
                    }
                })
            };

        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color";
.DocDetails{
    text-align: center;
    width: 100%;
    height: 100%;
    iframe{
        width: 100%;
        height: 100%;
        border: none;
        position: absolute;
        left: 0;
        top: @header_hright;
        display: none;
        overflow-x: hidden;
        -webkit-user-select: none;
        -webkit-overflow-scrolling: touch;
        user-select: none;
        -webkit-user-drag: none;
        -webkit-user-drag: none;
        &.show{
            display: block;
        }
        .media-max-height(@index){
            @media (max-height: unit(@index,px)) {
                height: 100% - 100% / @index * @header_hright;
            }
        }
        .media-max-height(1100);
        .media-max-height(1000);
        .media-max-height(912);
        .media-max-height(812);
        .media-max-height(736);
        .media-max-height(667);
        .media-max-height(568);
    }
    .warnBox{
        margin-top: 30%;
        &.hide{
            display: none;
        }
        .warn{
            color: @cor_C8C8CD;
            margin-top: @maTop;
        }
    }

}
</style>