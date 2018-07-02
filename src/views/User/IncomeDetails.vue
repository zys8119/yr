<template>
    <div class="WithdrawalRecord">
        <group class="group">
            <cell :class="{up:(item.type == 'up')}" v-for="item,i in list" :key="i" :title="item.title" :value="item.value" :inlineDesc="item.time"></cell>
        </group>
    </div>
</template>

<script>
    import { Group, Cell } from 'vux'
    export default {
        name: "income-details",
        components:{ Group, Cell },
        data(){
            return {
                list:[]
            }
        },
        mounted(){
            try {
                this.action({
                    moduleName:"layout",
                    goods:{
                        title:this.airforce.selectIncomeDetails.docTitle,
                    }
                });
            }catch (e){}
            this.$vux.toast.text("没有更多数据了！")
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/color';
    .WithdrawalRecord{
        &/deep/ .group{
            .vux-no-group-title{
                margin: 0;
            }
            .up{
                .weui-cell__ft{
                    color: @theme-color;
                }
            }
        }
    }
</style>