<template>
    <div class="share">
        <div class="card" v-for="item in CardList">
            <flexbox @click.native="go(item)">
                <flexbox-item span="40">
                    <img :src="item.img">
                </flexbox-item>
                <flexbox-item>
                    <p class="text">{{item.title}}</p>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
    import { Cell, Flexbox, FlexboxItem } from 'vux'
    export default {
        name: "share",
        components: { Cell, Flexbox, FlexboxItem },
        methods:{
            go(item){
                if(!this.$utils.is_S(item.url)){
                    this.$router.push("DocDetails?docSee="+item.url+"&docSeeTitle="+item.title);
                    return;
                }
                if(!this.$utils.is_S(item.route)){
                    this.$router.push(item.route);
                    return;
                }
                this.$vux.toast.text("正在玩命开发...")
            }
        },
        computed:{
            CardList(){
                try {
                    return this.airforce.configs_post.data.filter(e=>e.type == '3')
                }catch (e){}
                return [
                    {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5",title:'',},
                    {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5",title:'',},
                    {img:"http://placeholder.qiniudn.com/60x60/e5e5e5/e5e5e5",title:'',},
                ];
            }
        },
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color";
.share{
    .card{
        padding: @maTop @paIndex;
        background-color: @cor_ffffff;
        border-radius: 5px;
        width: 80%;
        margin: auto;
        margin-top: 20px;
        border-bottom: 1px solid @cor_D9D9D9;
        &:active{
            background-color: @cor_ececec;
        }
        img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
        }
        p{
            .icon-right;
            .textNowrap;
        }
    }
}
</style>