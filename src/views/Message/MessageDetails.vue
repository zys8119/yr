<template>
    <div class="MessageDetails">
        <h1 class="title">{{MessageDetails.title}}</h1>
        <span class="time">{{MessageDetails.create_at}}</span>
        <hr>
        <div class="contents">
            {{MessageDetails.content}}
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: "message-details",
        data(){
            return {
                MessageDetails:{}
            }
        },
        methods:{
            ...mapActions(['action']),
        },
        computed:{
            ...mapGetters(['airforce']),
        },
        mounted(){
            this.$vuz.loading.show({theme:"transparent"});
            try {
                this.action({
                    moduleName:'MessageDetails_post',
                    url:'/header/letterDetail',
                    method:'post',
                    data:{
                        token:this.airforce.login_post.data.token,
                        id:this.$route.query.id,
                    }
                }).then(res=>{
                    this.$vuz.loading.hide();
                    if(res.code == 200){
                        try {
                            this.MessageDetails = res.data;
                        }catch (e){}
                    }
                }).catch(ree=>{
                    this.$vuz.loading.hide();
                });
            }catch (e){
                this.$vuz.loading.hide();
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color.less";
.MessageDetails{
    padding: @paIndex;
    .title{
        text-align: center;
        font-size: 18px;
    }
    .time{
        color: @cor_a9a7ab;
        font-size: 12px;
        text-align: right;
        display: block;
    }
    .contents{
        font-size: 14px;
        margin-top: @paIndex;
    }
}
</style>