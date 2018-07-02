<template>
    <div class="qrCode">
        <img src="http://placehold.it/60X60&text=banner1"/>
    </div>
</template>

<script>
    export default {
        name: "qr-code",
        mounted(){
            this.action({
                moduleName:"layout",
                goods:{
                    clickRight:()=>{
                        this.$vux.toast.text("保存成功")
                    }
                }
            });
        },
    }
</script>

<style scoped lang="less">
img{
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>