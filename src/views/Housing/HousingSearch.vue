<template>
    <div class="HousingSearch">
        <z-filters ref="zFilters" :filters="filtersInit" @on-change="filtersChange">
            <x-button @click.native="clearFilters">清除筛选</x-button>
        </z-filters>
        <scroller :pullupConfig="pullupConfig" lock-x height="-140" ref="scroller"  :scroll-bottom-offst="200" :use-pullup="true" @on-pullup-loading="pullup()">
            <z-housing-card :list="cardList"></z-housing-card>
        </scroller>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XAddress, ChinaAddressV4Data, Divider, Scroller, XButton } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    import { ZFilters, ZHousingCard } from '@/components'
    import { HousingFitment } from '@/data/index.json'
    export default {
        name: "housing-search",
        components:{ ZFilters,ZHousingCard, Flexbox, FlexboxItem, XAddress, Divider, Scroller, XButton},
        data(){
            return {
                filtersInit:[
                    {
                        field:'area',
                        name:'地区',
                        index:2,
                        list:ChinaAddressV4Data,
                    },
                    {
                        field:'rent',
                        name:'租金',
                        index:0,
                        list:[
                            // parent
                            {value:'1000以下',key:'1'},
                            {value:'1000-2000',key:'2'},
                            {value:'2001-5000',key:'3'},
                            {value:'5001-8000',key:'4'},
                            {value:'8001-10000',key:'5'},
                            {value:'10000以上',key:'6'},
                        ],
                        type:1,
                        showText:false,
                    },
                    {
                        field:'sort',
                        name:'装修程度',
                        index:0,
                        list:HousingFitment,
                    },
                    {
                        field:'more',
                        name:"更多",
                        type:2
                    }
                ],
                pullupConfig:{
                    content: '上拉刷新',
                    // pullUpHeight: 60,
                    // height: 40,
                    autoRefresh: true,
                    downContent: '放开我',
                    upContent: '上拉刷新',
                    loadingContent: '加载中...',
                    clsPrefix: 'pullupConfig-',
                },
                pageIndex:1,
                HousesourceLists:[],
                cons:null,
            }
        },
        methods:{
            ...mapActions(['action']),
            search(val){
                this.clearFilters();
            },
            filtersChange(d){
              this.$refs.scroller.reset({
                  top:0
              });
              this.HousesourceLists  = [];
              this.pageIndex  = 1;
              this.cons = d;
              this.pullup();
            },
            clearFilters(){
                this.HousesourceLists  = [];
                this.cons  = null;
                this.pageIndex  = 1;
                this.$refs.zFilters.moreBoxHide();
                this.$refs.zFilters.xAddressVal = [];
                this.$root.$children[0].reload();
            },
            getList(cons = {}){
                return this.action({
                    moduleName:'getHousesourceLists_post',
                    method:'post',
                    url:'/adminapi/Housesource/lists',
                    data:_.merge({
                        token:this.airforce.login_post.data.token,
                        status:'2',
                        // size:1,
                        page:this.pageIndex,
                    },cons)
                }).then(res=>{
                    if(res.code == 200){
                        this.pageIndex += 1;
                    };
                    try {
                        this.HousesourceLists = this.HousesourceLists.concat(res.data.data);
                    }catch (e){}
                    return res;
                });
            },
            pullup(){
                let config = {};
                if(this.cons){
                    try {
                        config = {
                            citycode:this.cons.area[0],
                            district:this.cons.area[1],
                            areacode:this.cons.area[2],
                        };
                    }catch (e){};
                    try {
                        config.fitment = this.cons.sort[0];
                    }catch (e){};
                    try {
                        let rents = this.cons.rent_select.value.split('-');
                        if(rents[0] == "1000以下"){
                            rents = ['0.001','1000']
                        };
                        if(rents[0] == "10000以上"){
                            rents = ['10000']
                        };
                        config.rentMin = rents[0];
                        config.rentMax = rents[1];
                    }catch (e){};
                }
                var obj = this.$refs['scroller'];
                this.getList(config).then(res=>{
                    this.$nextTick(() => {
                        try {
                            if(res.data.data.length == 0){
                                const pullup = obj.pullup;
                                pullup.userConfig.content = "到底啦";
                                pullup.userConfig.upContent = "到底啦";
                                pullup.xscroll.off("scrollend", pullup._scrollEndHandler, pullup);
                                pullup.xscroll.off("scroll", pullup._scrollHandler, pullup);
                                pullup.xscroll.off("pan", pullup._panHandler, pullup);
                                pullup.xscroll.boundry.resetBottom();
                                pullup.__isRender = false;
                                pullup._evtBinded = false;
                            };
                        }catch (e){}
                        obj.donePullup();
                    });
                }).catch(()=>{
                    try {
                        obj.donePullup();
                    }catch (e){}
                });
            }
        },
        computed:{
            ...mapGetters(['airforce']),
            cardList(){
                try {
                    const list = JSON.parse(JSON.stringify(this.HousesourceLists));
                    return list.map(e=>{
                        try {
                            e.size = e.area;
                            e.MaxSize=e.area;
                            e.type=`${e.room}室${e.hall}厅${e.wc}卫`;
                            e.style=e.fitment;
                            e.price=e.pice;
                            e.direction=e.foward;
                            if(e.mode == "1"){
                                e.lable=["整租"];
                            }
                            if(e.mode == "2"){
                                e.lable=["合租"];
                            }
                        }catch (e){}
                        try {
                            e.location=_.find(ChinaAddressV4Data,{value:e.areacode}).name;
                            if(typeof e.img == 'object'){
                                e.imgList = e.img;
                                var img = null;
                                for(let  k in e.img){
                                    img = e.img[k];
                                    break;
                                }
                                e.img =img;
                            }
                        }catch (e){}
                        return e;
                    });
                }catch (e){}
                return [];
            }
        },
        mounted(){
            this.action({
                moduleName:'layout',
                goods:{
                    search:val=>{
                        this.search(val);
                    }
                }
            });
            this.getList();
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color.less";
.HousingSearch{

}
</style>