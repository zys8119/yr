<template>
    <div class="z-card">
        <card :header="{title:data.projname}">
            <div slot="content" class="HousingResource-card">
                <flexbox class="message-swiper-item-flexbox" @click.native="clickSelect">
                    <flexbox-item span="60" class="left">
                        <img class="touxiang" :src="defaultImg"/>
                    </flexbox-item>
                    <flexbox-item class="right">
                        <div class="right-top">
                            <flexbox>
                                <flexbox-item>
                                    <h2>第{{data.floor}}层{{data.room_number}}</h2>
                                    <p>{{data.status | rentStatus}}<i>{{data.pice | HousingCard_price('￥')}}</i></p>
                                </flexbox-item>
                                <flexbox-item span="50">
                                    <span class="iconfont" v-if="select">&#xe797;</span>
                                    <span class="iconfont" v-else>&#xe798;</span>
                                </flexbox-item>
                            </flexbox>
                        </div>
                    </flexbox-item>
                </flexbox>
                <div class="HousingResource-card-buttom select animated flipInX" v-if="select && data.status">
                    <flexbox :gutter="0" wrap="wrap" class="right-buttom-box">
                        <flexbox-item v-for="(item,index) in statusList" @click.native="item.click" :key="`z-card-right-buttom-item${data.status}${index}`" :span="1/5" class="right-buttom-item">
                            <div class="iconfont" v-html="item.icon"></div>
                            <div class="text">{{item.name}}</div>
                        </flexbox-item>
                    </flexbox>
                </div>
            </div>
        </card>
    </div>
</template>

<script>
    import { Card, Flexbox, FlexboxItem } from "vux"
    import { mapActions, mapGetters } from "vuex"
    export default {
        name: "z-card",
        components:{ Card, Flexbox, FlexboxItem },
        props:{
            data:{
                type:Object,
                default:()=>{},
            }
        },
        data(){
            return{
                select:false,
                img:require('@/assets/img/Login/touxiang.png')
            }
        },
        methods:{
            ...mapActions(['action']),
            clickSelect(){
                this.select = !this.select;
            },
            HousingEditor(conf = {}){
                this.action({
                    moduleName:'HousingEditor',
                    goods:null
                });
                this.action({
                    moduleName:'HousingEditor',
                    goods:_.merge(this.data,conf)
                });
                this.$router.push('/HousingEditor');
            },
            HousingOut(){
                this.action({
                    moduleName:'Housesource_Out_post',
                    url:'/adminapi/Housesource/changestatus',
                    method:'post',
                    data:{
                        token:this.airforce.login_post.data.token,
                        status:'0',
                        id:this.data.id,
                    }
                }).then(res=>{
                    if(res.code != 200){
                        this.$vux.toast.text(res.message);
                        return;
                    }
                    this.$vux.toast.text("下架成功");
                    try {
                        this.$root.$children[0].reload();
                    }catch (e){}
                }).catch(err=>{this.$vux.toast.text(err)})
            }
        },
        computed:{
            ...mapGetters(['airforce']),
            defaultImg(){
                if(this.data.img && this.data.img != 'null'){
                    try {
                        let imgnew = null;
                        for(let k in this.data.img){
                            imgnew = this.data.img[k];
                          break;
                        }
                        if(imgnew){
                            return imgnew;
                        }
                        return this.img;
                    }catch (e){
                        return this.img;
                    }
                }
                return this.img;
            },
            statusList(){
                switch(this.data.status){
                    //未发布
                    case '0':
                        return [
                            {
                                icon:'&#xe62a;',
                                name:"出售",
                                click:()=>{
                                    this.HousingEditor();
                                }
                            },
                            {
                                icon:'&#xe62a;',
                                name:"删除房源",
                                click:()=>{
                                    // this.$vux.alert.show("asd")
                                   this.$vux.confirm.show({
                                       title:"温馨提示",
                                       content:"确定删除该",
                                       onConfirm:()=>{
                                           this.action({
                                               moduleName:'getHousesourceLists_post',
                                               method:'post',
                                               url:'/adminapi/Housesource/delete',
                                               data:_.merge({
                                                   token:this.airforce.login_post.data.token,
                                                   // o_id:this.airforce.login_post.data.id,
                                                   status:'0',
                                               },{
                                                   id:this.data.id
                                               })
                                           }).then(res=>{
                                               if(res.code != 200){
                                                   this.$vux.toast.text(res.message);
                                                   return;
                                               }
                                               try {
                                                   const zCardParent = this.$parent.$parent.$parent.$parent;
                                                   const index = _.findIndex(zCardParent.tabs[zCardParent.index].list,{id:this.data.id});
                                                   this.select = false;
                                                   zCardParent.tabs[zCardParent.index].list.splice(index,1);
                                               }catch (e){}
                                               this.$vux.toast.text("删除成功");
                                           }).catch(err=>{
                                               this.$vux.toast.text(err);
                                           });
                                       }
                                   })
                                }
                            },
                        ];
                        break;
                    //已出租
                    case '1':
                        return [
                            {
                                icon:'&#xe62a;',
                                name:"房源信息",
                                click:()=>{

                                }
                            },
                        ];
                        break;
                    //已发布
                    case '2':
                        return [
                            {
                                icon:'&#xe62a;',
                                name:"房源信息",
                                click:()=>{
                                    this.$router.push("/HousingDetails?id="+this.data.id+'&o_id='+this.data.o_id);
                                }
                            },
                            {
                                icon:'&#xe62a;',
                                name:"修改房源",
                                click:()=>{
                                    this.HousingEditor({HousingEditorType:2});
                                }
                            },
                            {
                                icon:'&#xe62a;',
                                name:"房源下架",
                                click:()=>{
                                    this.HousingOut();
                                }
                            },
                        ];
                        break;
                    // 即将到期
                    default:
                        return [
                            {
                                icon:'&#xe62a;',
                                name:"房源信息",
                                click:()=>{

                                }
                            },
                            {
                                icon:'&#xe62a;',
                                name:"续约",
                                click:()=>{

                                }
                            },
                        ];
                        break;
                }
                return [];
            }
        }
    }
</script>

<style scoped lang="less">
@import "../assets/css/color.less";
.z-card{
    margin-bottom: @maTop;
    .HousingResource-card{
        padding: 0 @paIndex;
        margin-bottom: @maTop;
        .message-swiper-item-flexbox{
            padding: @maTop 0;
            background-color: @cor_ffffff;
            margin-bottom:2px;
            .left{
                @r:5px;
                -webkit-border-radius: @r;
                -moz-border-radius: @r;
                border-radius: @r;
                overflow: hidden;
                .touxiang{
                    width: 54px;
                    height: 54px;
                    border: none;
                    -webkit-border-radius: @r;
                    -moz-border-radius: @r;
                    border-radius: @r;
                    overflow: hidden;
                }

            }
            .right{
                .right-top{
                    overflow: hidden;
                    line-height: 30px;
                    h2{
                        font-size: 14px;
                    }
                    p{
                        font-size: 12px;
                        color: @theme-color;
                        i{
                            text-decoration: none;
                            color: @cor_ff0000;
                            font-size: 18px;
                            font-style: normal;
                            margin-left: @maTop;
                        }
                    }
                    span{
                        font-size: 24px;
                        float: right;
                        color: @cor_a9a7ab;
                    }
                }
            }
        }
        .HousingResource-card-buttom{
            overflow: hidden;
            .textNowrap();
            .right-buttom-box{
                .right-buttom-item{
                    text-align: center;
                    .iconfont{
                        font-size: 24px;
                    }
                    .text{
                        font-size: 12px;
                        color: @cor_a9a7ab;
                    }
                }
            }
            &.select{
                background-color: @cor_d7e8f4;
                border: 1px solid @theme-color;
                border-radius: 5px;
                .right-buttom-box{
                    .right-buttom-item{
                        .iconfont{
                            font-size: 24px;
                            color: @theme-color;
                        }
                        .text{
                            font-size: 12px;
                            color: @cor_000000;
                        }
                        &:active{
                            background-color:@cor_ffffff;
                        }
                    }
                }
            }
        }
    }
}
</style>