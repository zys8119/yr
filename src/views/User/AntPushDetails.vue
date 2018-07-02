<template>
    <div class="AntPushDetails">
        <iframe :class="{show:!!src}" :src="src" v-on:load="onload()"  v-on:error="error()" frameborder="0" allowfullscreen></iframe>
        <div :class="{hide:!!src}" class="warnBox">
            <icon type="warn" is-msg></icon>
            <div class="warn">页面有误！</div>
        </div>
        <div class="Agent" @click="Agent">立即推广</div>
    </div>
</template>

<script>
    import { Icon } from 'vux'
    export default {
        name: "ant-push-details",
        components:{ Icon },
        methods:{
            onload(){
                this.$vuz.loading.hide();
            },
            Agent(){
                if(this.$route.hash == "#AntPushAll-10"){
                    this.$router.push("/pushQrCode?AntPushAll=10");
                }else {
                    this.$router.push("/pushQrCode?id="+this.$route.query.docSeeId)
                };
            }
        },
        computed:{
            src(){
                if(this.$route.query.docSee){
                    let Url = this.$route.query.docSee.replace(/(^('|"))|(('|")$)|\s/g,'');
                    if(Url.length > 0){
                        for(let i in this.$route.query){
                            if(i != "docSee" && i != 'docSeeTitle' && i != 'docSeeId'){
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
            this.$vuz.loading.show({theme:"transparent"});
            if(!this.src){
                this.$vuz.loading.hide();
            };
            if(this.$route.query.title){
                this.action({
                    moduleName:'layout',
                    goods:{
                        title:this.$route.query.title
                    }
                })
            };
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/color";
    .AntPushDetails{
        text-align: center;
        iframe{
            width: 100%;
            height: 100%;

            border: none;
            position: fixed;
            left: 0;
            top: @header_hright;
            display: none;
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
        .Agent{
            position: fixed;
            left: 25%;
            bottom:20px;
            z-index: 10000;
            background-color:@theme-color;
            background-color: rgba(27,130,230,0.8);
            color: @cor_ffffff;
            font-size: 12px;
            @w:60px;
            width: @w;
            height: @w;
            border-radius: @w;
            line-height: @w;
            transform: translateX(@w);
            .textNowrap;
            text-align: center;
            &:active{
                background-color: @theme-color;
            }
        }
    }
</style>