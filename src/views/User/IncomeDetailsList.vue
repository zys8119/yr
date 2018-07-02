<template>
    <div class="IncomeDetails">
        <group class="group">
            <cell @click.native="go(item)" v-for="(item,i) in list" :key="i" :is-link="true" :title="item.title">
                <img class="img" slot="icon" src="http://placeholder.qiniudn.com/20x20/3cc51f/ffffff">
            </cell>
        </group>
    </div>
</template>

<script>
    import { Group, Cell } from 'vux'
    export default {
        name: "income-details-list",
        components:{ Group, Cell },
        data(){
            return {
                list:[
                    {title:'商城收入明细',id:"1",docTitle:"商城明细"},
                    {title:'推广收入明细',id:"2",docTitle:"佣金明细"},
                    {title:'贷款收入明细',id:"3",docTitle:"贷款收入明细"},
                    {title:'网贷能手明细',id:"4",docTitle:"网贷能手明细"},
                ]
            }
        },
        methods:{
            go(item){
                this.action({
                    moduleName:'selectIncomeDetails',
                    goods:item
                });
                this.$router.push("/IncomeDetails");
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/color";
    .IncomeDetails{
        &/deep/ .group{
            .vux-no-group-title{
                margin: 0;
            }
        }
        .img{
            margin-right: @maTop;
        }
    }
</style>