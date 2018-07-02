<template>
    <div class="WithdrawalRecord">
        <z-pull-scroller ref="ZPullScroller" height="-40" @change="change">
        <group class="group">
            <cell v-for="item,i in list" :key="i" :title="item.flag | WithdrawalRecord" :value="-item.money" :inlineDesc="item.create_at"></cell>
        </group>
        </z-pull-scroller>
    </div>
</template>

<script>
    import { ZPullScroller } from '@/components'
    import { Group, Cell } from 'vux'
    export default {
        name: "withdrawal-record",
        components:{ Group, Cell, ZPullScroller },
        data(){
            return {}
        },
        methods:{
            docSortTabClick(item){
                this.action({
                    moduleName:'WithdrawalRecord',
                    goods:_.set({select:item.term_id},item.term_id,[]),
                });
                this.$refs.ZPullScroller.loadEnd = false;
                this.getDocList({term_id:item.term_id});
            },
            getRelationshipsList(cons = {},moduleName = "cashListList_post"){
                this.action({
                    moduleName:moduleName,
                    goods:null,
                });
                return this.action({
                    moduleName:moduleName,
                    url:'/header/cashList',
                    method:"post",
                    data:_.merge({
                        token:this.airforce.login_post.data.token,
                    },cons)
                })
            },
            getDocList(con){
                let config = _.merge({
                    page:1,
                    //默认每次20条
                    pagesize:20,
                },con);
                if(!this.airforce.WithdrawalRecord || !this.airforce.WithdrawalRecord[config.term_id+"config"]){
                    this.action({
                        moduleName:'WithdrawalRecord',
                        goods:_.set({},config.term_id+"config",config),
                    });
                }else {
                    config = _.merge(config,this.airforce.WithdrawalRecord[config.term_id+"config"]);
                }
                this.$refs.ZPullScroller.loadStart = false;
                this.$refs.ZPullScroller.load = true;
                this.getRelationshipsList(config).then(ress=>{
                    this.$refs.ZPullScroller.load = false;
                    if(ress.code == 200){
                        if(this.airforce.WithdrawalRecord[config.term_id]){
                            this.action({
                                moduleName:'WithdrawalRecord',
                                goods:_.set({},config.term_id,this.airforce.WithdrawalRecord[config.term_id].concat(ress.data.data)),
                            });
                        }else {
                            this.action({
                                moduleName:'WithdrawalRecord',
                                goods:_.set({},config.term_id,ress.data.data),
                            });
                        }
                        this.action({
                            moduleName:'WithdrawalRecord',
                            goods:_.set({},config.term_id+"config.page",this.airforce.WithdrawalRecord[config.term_id+"config"].page + 1),
                        });
                        if(ress.data.count == this.airforce.WithdrawalRecord[config.term_id].length){
                            this.$refs.ZPullScroller.loadEnd = true;
                            this.$refs.ZPullScroller.loadStart = false;
                        }else{
                            this.$refs.ZPullScroller.loadStart = true;
                            this.$refs.ZPullScroller.loadEnd = false;
                        }
                    }else {
                        this.$refs.ZPullScroller.load = false;
                        this.$refs.ZPullScroller.loadEnd = false;
                        this.$refs.ZPullScroller.loadStart = true;
                    };
                }).catch(err=>{
                    this.$refs.ZPullScroller.load = false;
                    this.$refs.ZPullScroller.loadEnd = false;
                    this.$refs.ZPullScroller.loadStart = true;
                });
            },
            change(_vm){
                if(_vm.loadStart){
                    this.getDocList({term_id:this.airforce.WithdrawalRecord.select});
                    _vm.reset({top:0});
                }
            },
        },
        computed:{
            list(){
                try {
                    const relationshipsList = JSON.parse(JSON.stringify(this.airforce.WithdrawalRecord[this.airforce.WithdrawalRecord.select]))
                    return relationshipsList;
                }catch (e){}
                return [];
            },
        },
        mounted(){
            this.docSortTabClick({term_id:1});
        }
    }
</script>

<style scoped lang="less">
.WithdrawalRecord{
    &/deep/ .group{
        .vux-no-group-title{
            margin: 0;
        }
    }
}
</style>