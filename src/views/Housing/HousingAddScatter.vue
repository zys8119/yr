<template>
    <div class="HousingAddScatter">
        <group class="HousingAddScatter-group">
            <z-select title="出租方式" :data="list1" type="select1" module-name="Housing" name="HousingRentWay"></z-select>
        </group>
        <group class="HousingAddScatter-group">
            <area-select title="地区" placeholder="详细地址" :is-link="true" module-name="Housing" fieldName="HousingArea"></area-select>
        </group>
        <group class="HousingAddScatter-group">
            <x-input :value="airforce.Housing.projname" @on-change="airforce.change.set($event,'projname','Housing')" title="房源名称" text-align="right" placeholder="如，幸福公寓"></x-input>
            <flexbox>
                <flexbox-item>
                    <x-input :show-clear="false" :value="airforce.Housing.build" @on-change="airforce.change.set($event,'build','Housing')" title="幢" text-align="right" placeholder="几幢"></x-input>
                </flexbox-item>
                <flexbox-item>
                    <x-input :show-clear="false" :value="airforce.Housing.unit" @on-change="airforce.change.set($event,'unit','Housing')" title="单元" text-align="right" placeholder="几单元"></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item>
                    <x-input :show-clear="false" :value="airforce.Housing.floor" @on-change="airforce.change.set($event,'floor','Housing')" title="楼层" text-align="right" placeholder="几楼"></x-input>
                </flexbox-item>
                <flexbox-item>
                    <x-input :show-clear="false" :value="airforce.Housing.room" @on-change="airforce.change.set($event,'room','Housing')" title="门牌号" text-align="right" placeholder="门牌号"></x-input>
                </flexbox-item>
            </flexbox>
            <!--<x-input :value="airforce.Housing.HousingIndex" @on-change="airforce.change.set($event,'HousingIndex','Housing')" v-if="airforce.Housing.HousingRentWay_SelectTxt == '合租'" type="number" title="可租房间" text-align="right" placeholder="可租房间数"></x-input>-->
            <x-input :value="airforce.Housing.comarea" @on-change="airforce.change.set($event,'comarea','Housing')" type="number" title="分组" text-align="right" placeholder="如：高新区、市区、商圈名"></x-input>
        </group>
        <group class="HousingAddFocus-group" title="其他信息">
            <x-input :value="airforce.Housing.name" @on-change="airforce.change.set($event,'name','Housing')" title="姓名" text-align="right" placeholder="房源人姓名"></x-input>
            <x-input :value="airforce.Housing.phone" @on-change="airforce.change.set($event,'phone','Housing')" title="联系方式" text-align="right" placeholder="房源人联系方式"></x-input>
            <x-address style="display: none" v-model="xAddressVal" title="title" @on-hide="hideArea" :show="showXAddress" :list="list"></x-address>
            <cell title="房源展现渠道" class="HousingAddFocus-cell-x-address " :value="airforce.Housing.channelShow" @click.native="onShowXaddres" :is-link="true"></cell>
        </group>
        <images-upload :alert="true" :isxhr="false" @imagechanged="imagechanged" :type="2" class="HousingAddScatter-upload"></images-upload>
        <div class="x-button-type1">
            <x-button @click.native="submit">提交</x-button>
        </div>
    </div>
</template>

<script>
    import { Group, Cell, XInput, XAddress, XButton, XDialog, Popup, Flexbox, FlexboxItem, Checker, CheckerItem } from 'vux'
    import { ImagesUpload, AreaSelect, ZXDialog, ZPopup, ZSelect } from '@/components'
    import { mapGetters, mapActions } from 'vuex'
    import { channelList, modeList } from '@/data/index.json'
    export default {
        name: "housing-add-scatter",
        components:{ Group, Cell, XInput, ImagesUpload, XAddress, AreaSelect, XButton, XDialog, ZXDialog, Popup, Flexbox, FlexboxItem, Checker, CheckerItem, ZPopup, ZSelect },
        data(){
            return {
                xAddressVal:['0'],
                showXAddress:false,
                list:channelList,
                xAddressVal1:['整租'],
                showXAddress1:false,
                list1:modeList,
            }
        },
        methods:{
            ...mapActions(['action']),
            AreaInit(){
                let xAddressVal = _.find(this.list,{value:this.xAddressVal[0]});
                if(xAddressVal){
                    this.action({
                        moduleName:'Housing',
                        goods:{
                            channelShow:xAddressVal.name,
                            channelSelect:xAddressVal,
                        }
                    });
                };
            },
            hideArea(){
                this.showXAddress = false;
                this.AreaInit();
            },
            onShowXaddres(){
                this.showXAddress = true;
            },
            hideArea1(){
                this.showXAddress1 = false;
            },
            onShowXaddres1(){
                this.showXAddress1 = true;
            },
            imagechanged(e){
                if(this.airforce.Housing.img){
                    this.action({
                        moduleName:'Housing',
                        goods:{
                            img:[...this.airforce.Housing.img,e],
                        }
                    });
                    return;
                }
                this.action({
                    moduleName:'Housing',
                    goods:{
                        img:[e],
                    }
                });
            },
            submit(){
                if(!this.airforce.Housing.HousingRentWay_SelectTxt){
                    this.$vux.toast.text('请选择【出租方式】');
                    return;
                }
                if(!this.airforce.Housing.HousingArea){
                    this.$vux.toast.text('请选择【地区】');
                    return;
                }
                if(this.$utils.is_S(this.airforce.Housing.projname)){
                    this.$vux.toast.text('【房源名称】不能为空');
                    return;
                }
                if(this.$utils.is_S(this.airforce.Housing.build)){
                    this.$vux.toast.text('请输入房源【幢】数');
                    return;
                }
                if(this.$utils.is_S(this.airforce.Housing.unit)){
                    this.$vux.toast.text('请输入房源【单元】数');
                    return;
                }
                if(this.$utils.is_S(this.airforce.Housing.floor)){
                    this.$vux.toast.text('请输入房源【楼层】数');
                    return;
                }
                if(this.$utils.is_S(this.airforce.Housing.room)){
                    this.$vux.toast.text('请输入房源【门牌号】');
                    return;
                }
                // if(this.airforce.Housing.HousingRentWay_SelectTxt == '合租' && this.$utils.is_S(this.airforce.Housing.HousingIndex)){
                //     this.$vux.toast.text('【可租房间】数不能为空');
                //     return;
                // }
                if(this.$utils.is_S(this.airforce.Housing.name)){
                    this.$vux.toast.text('【姓名】不能为空');
                    return;
                }
                if(this.$utils.is_S(this.airforce.Housing.phone)){
                    this.$vux.toast.text('【联系方式】不能为空');
                    return;
                }
                if(!this.$utils.isPhone(this.airforce.Housing.phone)){
                    this.$vux.toast.text('【联系方式】手机号码错误');
                    return;
                }
                if(this.$utils.is_S(this.airforce.Housing.channelShow)){
                    this.$vux.toast.text('【房源展现渠道】不能为空');
                    return;
                }
                let data = _.merge({
                    token:this.airforce.login_post.data.token,
                    o_id:this.airforce.login_post.data.id,
                },{
                    mode:this.airforce.Housing.HousingRentWay_Select.value,
                    citycode:this.airforce.Housing.HousingArea.provinces.value,
                    district:this.airforce.Housing.HousingArea.city.value,
                    areacode:this.airforce.Housing.HousingArea.area.value,
                    address:this.airforce.Housing.HousingArea.address,
                    projname:this.airforce.Housing.projname,
                    build:this.airforce.Housing.build,
                    unit:this.airforce.Housing.unit,
                    room_data:JSON.stringify(_.set({},this.airforce.Housing.floor,[this.airforce.Housing.room])),
                    isStr:true,
                    hs_name:this.airforce.Housing.name,
                    hs_phone:this.airforce.Housing.phone,
                    qudaoshow:this.airforce.Housing.channelSelect.value,
                    comarea:this.airforce.Housing.comarea || '',
                });
                if(this.airforce.Housing.img){
                    for(let i = 0 ; i < this.airforce.Housing.img.length ; i++){
                        data[`img[${i}]`] = this.airforce.Housing.img[i];
                    }
                };
                this.action({
                    moduleName:'Housesource_create_post',
                    url:'/adminapi/Housesource/create',
                    method:'post',
                    isFormData:true,
                    data:data
                }).then(res=>{
                    if(res.code != 200){
                        this.$vux.toast.text(res.message);
                        return;
                    }
                    this.action({
                        moduleName:'Housing',
                        goods:{
                            img:null
                        }
                    });
                    this.action({
                        moduleName:'Housing',
                        goods:{
                            img:[]
                        }
                    });
                    this.$vux.toast.text("新增成功");
                    this.$router.push("/HousingResource");
                }).catch(err=>{
                    this.action({
                        moduleName:'Housing',
                        goods:{
                            img:null
                        }
                    });
                    this.action({
                        moduleName:'Housing',
                        goods:{
                            img:[]
                        }
                    });
                    this.$vux.toast.text(err)})
            }
        },
        computed:{
            ...mapGetters(['airforce']),
        },
        mounted(){
            this.AreaInit();
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/color.less";
    .HousingAddScatter{
        &/deep/ .HousingAddScatter-group{
            .vux-no-group-title{
                margin: 0;
                margin-bottom: @maTop;
            }
        }
        &/deep/ .HousingAddScatter-upload{
            .imagesUpload{
                background-color: transparent;
                padding: 0 @paIndex;
            }
        }
        .x-button-type1{
            .weui-btn{
                border-radius: 50px;
            }
        }
        &/deep/ .HousingAddFocus-cell-x-address{
            .weui-cell__ft{
                color: @cor_000000;
            }
        }
    }
</style>