<template>
    <div class="pushQrCode">
        <img class="img" :src="src" alt="" :AntPushAll="AntPushAll" :pushQrCode="pushQrCode">
    </div>
</template>

<script>
    import { ZQrcode } from '@/components'
    export default {
        name: "push-qr-code",
        components:{ ZQrcode },
        data(){
            return {
                src:null,
                test:''
            }
        },
        methods:{
            getCode(ress,cons={}){
                this.action({
                    moduleName:'MessageList_post',
                    url:'/header/heimg',
                    method:"post",
                    data:_.merge({
                        token:this.airforce.login_post.data.token,
                        data:$$docWww + "public/#/ApplicationDetails?id="+this.$route.query.id+"&phone="+this.airforce.login_post.data.phone,
                        phone:this.airforce.login_post.data.phone,
                        url:ress.data.re_img,
                    },cons)
                }).then(res=>{
                    if(res.code != 200){
                        this.$vux.toast.text(res.message);
                    }
                    this.src = res.data.data;
                    this.$vuz.loading.hide();
                    // this.action({
                    //     moduleName:'MessageList_post',
                    //     url:'/header/delimg',
                    //     method:"post",
                    //     data:{
                    //         img:res.data.delimg,
                    //     }
                    // });
                }).catch(err=>{
                    this.$vuz.loading.hide();
                    this.$vux.toast.text(err);
                })
            },
            save(){
                // window.open($$rootUrl + "/header/loadimg&url="+this.src+"&token="+this.airforce.login_post.data.token);
                if(window.$plus){
                    this.$vux.toast.text("保存中..");
                    const res = $plus.downloader.createDownload( this.src, {}, (d, status)=>{
                        if ( status == 200 ) {
                            this.dow = true;
                            $plus.gallery.save(d.filename,()=> {
                                this.$vux.toast.text("保存成功！");
                            },()=> {
                                this.$vux.toast.text("保存失败！");
                            });
                        } else {
                            this.$vux.toast.text("保存失败！");
                        }
                    }).start();
                }
            }
        },
        computed:{
            AntPushAll(){
                try {
                    if(this.airforce.configs_post.data){
                        const findObj = JSON.parse(JSON.stringify(_.find(this.airforce.configs_post.data,{type:this.$route.query.AntPushAll,id:"31"})));
                        this.getCode({
                            data:{
                                re_img: findObj.img
                            }
                        },{
                            data:$$docWww + "public/#/AntPushShop?id="+this.$route.query.AntPushAll+"&phone="+this.airforce.login_post.data.phone,
                        });
                        return findObj;
                    }
                }catch (e){}
                return {};
            },
            pushQrCode(){
                try {
                    if(this.airforce.configs_post.data &&  this.$route.query.pushQrCodeUrl){
                        this.getCode({
                            data:{
                                re_img: this.$route.query.pushQrCodeUrl
                            }
                        },{
                            data:$$docWww + "public/#/Register?type=2&phone="+this.airforce.login_post.data.phone,
                        });
                        return "";
                    }
                }catch (e){}
                return {};
            }
        },
        mounted(){
            this.$vuz.loading.show({theme:"transparent"});
            try {
                if(this.$route.query.id){
                    this.action({
                        moduleName:'pushDetail_post',
                        url:'/header/pushDetail',
                        method:"post",
                        data:{
                            token:this.airforce.login_post.data.token,
                            id:this.$route.query.id
                        }
                    }).then(res=>{
                        if(res.code != 200){
                            this.$vuz.loading.hide();
                            this.$vux.toast.text(res.message);
                        }
                        this.getCode(res);
                    }).catch(err=>{
                        this.$vuz.loading.hide();
                        this.$vux.toast.text(err);
                    });
                }
            }catch (e){
                this.$vuz.loading.hide();
                this.$vux.toast.text("参数错误");
            }
            this.action({
                moduleName:"layout",
                goods:{
                    clickRight:()=>{
                        this.save();
                    }
                }
            })
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color";
.pushQrCode{
    .qrcode{
        display: none;
    }
    .img{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        top:~"calc(40px)";
        height: ~"calc(100% - 40px)";
    }
}
</style>