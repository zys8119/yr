<template>
    <div class="MyWallet">
        <group class="User-group User-group-top">
            <cell title="我的钱包"  :is-link="true" link="/Withdraw?flag=1" class="User-cell">
                <span slot="icon" class="icon iconfont">&#xe669;</span>
                <span>{{airforce.prefectInfo.member_wallet | member_wallet}}元</span>
            </cell>
            <cell title="贷款钱包"  :is-link="true" link="/Withdraw?flag=2" class="User-cell">
                <span slot="icon" class="icon iconfont">&#xe669;</span>
                <span>{{airforce.prefectInfo.loan_wallet | member_wallet}}元</span>
            </cell>
        </group>
    </div>
</template>

<script>
    import { Group, Cell } from 'vux'
    export default {
        name: "my-wallet",
        components:{ Group, Cell },
        mounted(){
            if(!this.airforce.memberdDetail_post || this.airforce.memberdDetail_post.code != 200){
                this.$vuz.loading.show({theme:"transparent"});
                this.action({
                    moduleName:'memberdDetail_post',
                    url:"/member/memberdDetail",
                    method:"post",
                    data:{
                        token:this.airforce.login_post.data.token,
                    }
                }).then(res=>{
                    this.$vuz.loading.hide();
                    if(res.code == 200){
                        try {
                            res.data.address_all = JSON.parse(res.data.address_all);
                        }catch (e){}
                        this.action({
                            moduleName:'prefectInfo',
                            goods:res.data
                        })
                    }
                }).catch(err=>{
                    this.$vuz.loading.hide();
                })
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color";
.MyWallet{
    .icon{
        margin-right: @maTop;
        font-size: 30px;
        color: @cor_009cff;
    }
    &/deep/ .vux-no-group-title{
        margin: 0;
    }
}
</style>