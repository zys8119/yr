<template>
    <div class="HousingAddScatter">
        <div class="HousingDetailsCard1 HousingDetailsCard2 HousingDetailsCard3">
            <h1 class="title">
                <x-input :value="airforce.HousingEditor.projname" @on-change="airforce.change.set($event,'projname','HousingEditor')" title="小区名称" placeholder="如，幸福公寓"></x-input>
            </h1>
            <div class="title">
                <x-input :value="airforce.HousingEditor.title" @on-change="airforce.change.set($event,'title','HousingEditor')" title="房源标题" placeholder="房源列表展示的标题，租房可见"></x-input>
            </div>
            <div class="money">
                <flexbox>
                    <flexbox-item>
                        <x-input type="number" :value="airforce.HousingEditor.pice" @on-change="airforce.change.set($event,'pice','HousingEditor')" title="租金" placeholder="房屋价格"></x-input>
                    </flexbox-item>
                    <flexbox-item span="80" align="right">
                        <span> 元/月</span>
                    </flexbox-item>
                </flexbox>
            </div>
            <z-select title="付款方式" :data="HousingPayinfo" type="select1" module-name="HousingEditor" name="Payinfo" class="Card1-cell">
                <div slot="icon" class="iconfont">&#xe653;</div>
            </z-select>
        </div>
        <group class="HousingAddScatter-group">
            <area-select title="地区" placeholder="详细地址" :is-link="true" module-name="HousingEditor" fieldName="HousingArea"></area-select>
            <z-select title="出租方式" :data="modeList" type="select1" module-name="HousingEditor" name="HousingRentWay"></z-select>
        </group>
        <group class="HousingAddScatter-group HousingDetailsCard4" title="房源信息">
            <flexbox>
                <flexbox-item>
                    <x-input :show-clear="false" :value="airforce.HousingEditor.build" @on-change="airforce.change.set($event,'build','HousingEditor')" title="幢" text-align="right" placeholder="几幢"></x-input>
                </flexbox-item>
                <flexbox-item>
                    <x-input :show-clear="false" :value="airforce.HousingEditor.unit" @on-change="airforce.change.set($event,'unit','HousingEditor')" title="单元" text-align="right" placeholder="几单元"></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item>
                    <x-input :show-clear="false" :value="airforce.HousingEditor.floor" @on-change="airforce.change.set($event,'floor','HousingEditor')" title="楼层" text-align="right" placeholder="几楼"></x-input>
                </flexbox-item>
                <flexbox-item>
                    <x-input :show-clear="false" :value="airforce.HousingEditor.foward" @on-change="airforce.change.set($event,'foward','HousingEditor')" title="朝向" text-align="right" placeholder="方位"></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item>
                    <x-input :show-clear="false" :value="airforce.HousingEditor.floorMax" @on-change="airforce.change.set($event,'floorMax','HousingEditor')" title="总楼层" text-align="right" placeholder="楼高"></x-input>
                </flexbox-item>
                <flexbox-item>
                    <x-input :show-clear="false" :value="airforce.HousingEditor.bedroom" @on-change="airforce.change.set($event,'bedroom','HousingEditor')" title="门牌号" text-align="right" placeholder="房间号"></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item>
                    <x-input :show-clear="false" :value="airforce.HousingEditor.room" @on-change="airforce.change.set($event,'room','HousingEditor')" title="房间" text-align="right" placeholder="几室"></x-input>
                </flexbox-item>
                <flexbox-item>
                    <x-input :show-clear="false" :value="airforce.HousingEditor.hall" @on-change="airforce.change.set($event,'hall','HousingEditor')" title="客厅" text-align="right" placeholder="几厅"></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item>
                    <x-input :show-clear="false" :value="airforce.HousingEditor.floor" @on-change="airforce.change.set($event,'floor','HousingEditor')" title="厨房" text-align="right" placeholder="几厨"></x-input>
                </flexbox-item>
                <flexbox-item>
                    <x-input :show-clear="false" :value="airforce.HousingEditor.wc" @on-change="airforce.change.set($event,'wc','HousingEditor')" title="卫生间" text-align="right" placeholder="几卫"></x-input>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item class="nb">
                    <x-input :show-clear="false" :value="airforce.HousingEditor.area" @on-change="airforce.change.set($event,'area','HousingEditor')" title="房屋面积" placeholder="面积㎡"></x-input>
                </flexbox-item>
            </flexbox>
            <z-select title="装修程度" :data="HousingFitment" type="select1" module-name="HousingEditor" name="fitment"></z-select>
            <!--<x-input :value="airforce.HousingEditor.HousingIndex" @on-change="airforce.change.set($event,'HousingIndex','HousingEditor')" v-if="airforce.Housing.HousingRentWay_SelectTxt == '合租'" type="number" title="可租房间" text-align="right" placeholder="可租房间数"></x-input>-->
            <x-input :value="airforce.HousingEditor.comarea" @on-change="airforce.change.set($event,'comarea','HousingEditor')" type="number" title="分组" text-align="right" placeholder="如，高新区、市区"></x-input>
        </group>
        <group class="HousingAddFocus-group" title="其他信息">
            <x-input :value="airforce.HousingEditor.hs_name" @on-change="airforce.change.set($event,'hs_name','HousingEditor')" title="姓名" text-align="right" placeholder="房源人姓名"></x-input>
            <x-input :value="airforce.HousingEditor.hs_phone" @on-change="airforce.change.set($event,'hs_phone','HousingEditor')" title="联系方式" text-align="right" placeholder="房源人联系方式"></x-input>
            <z-select title="房源展现渠道" :data="channelList" type="select1" module-name="HousingEditor" name="channelShow"></z-select>
        </group>
        <div class="HousingDetailsCard2">
            <card :header="{title:'房屋配置'}">
                <div slot="content" class="card-content">
                    <checker class="list" v-model="configsVal" :max="1000" type="checkbox" default-item-class="list-item" selected-item-class="list-item-selected">
                        <checker-item :value="item.value" class="iconfont add" v-for="(item,index) in configs" :key="`configs${index}`" :class="`configs${index}`">
                            <div :class="{iconfont:true}" v-html="item.icon"></div>
                            <div :class="{text:true}">{{item.text}}</div>
                        </checker-item>
                    </checker>
                </div>
            </card>
        </div>
        <div class="HousingDetailsCard2">
            <card :header="{title:'房屋描述'}">
                <div slot="content" class="card-content">
                    <x-textarea :value="airforce.HousingEditor.description" @on-change="airforce.change.set($event,'description','HousingEditor')" placeholder="介绍您的房子" :max="500"></x-textarea>
                </div>
            </card>
        </div>
        <images-upload :isxhr="false" :is-updata="true" ref="imagesUpload" @imagechanged="imagechanged" :type="2" class="HousingAddScatter-upload"></images-upload>
        <div class="footerBtns">
            <flexbox class="footerBtns-flexbox">
                <flexbox-item class="right"  @click.native="submit">
                    <span v-if="airforce.HousingEditor.HousingEditorType == 2">保存</span>
                    <span v-else>立即发布</span>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
    import { Group, Cell, XInput, XAddress, XButton, XDialog, Popup, Flexbox, FlexboxItem, Checker, CheckerItem, Card, Swiper, XTextarea, ChinaAddressV4Data } from 'vux'
    import { ImagesUpload, AreaSelect, ZXDialog, ZPopup, ZSelect } from '@/components'
    import { mapGetters, mapActions } from 'vuex'
    import { channelList, modeList, HousingConfigs, HousingPayinfo, HousingFitment } from '@/data/index.json'
    export default {
        name: "housing-add-scatter",
        components:{ Group, Cell, XInput, ImagesUpload, XAddress, AreaSelect, XButton, XDialog, ZXDialog, Popup, Flexbox, FlexboxItem, Checker, CheckerItem, ZPopup, ZSelect, Card, Swiper, XTextarea },
        data(){
            return {
                configsVal:[],
                configs:HousingConfigs,
                channelList,
                modeList,
                HousingPayinfo,
                HousingFitment,
                imgOldIndex:null,
            }
        },
        methods:{
            ...mapActions(['action']),
            setData(name,payinfoObj){
                try {
                    this.action({
                        moduleName:'HousingEditor',
                        goods:_.set({},`${name}_Select`,payinfoObj)
                    });
                    this.action({
                        moduleName:'HousingEditor',
                        goods:_.set({},`${name}_SelectVal`,[payinfoObj.value])
                    });
                    this.action({
                        moduleName:'HousingEditor',
                        goods:_.set({},`${name}_SelectTxt`,payinfoObj.name)
                    });
                }catch (e){}
            },
            imagechanged(e,bool,index){
                if(bool){
                    const imgData = this.airforce.HousingEditor.img;
                    if(imgData){
                        try {
                            const imgOld = e.filter(i=>{
                                return !!i.match(/^http/);
                            });
                            let newImgData = {};
                            for(let k in imgData){
                                if(imgOld.indexOf(imgData[k]) > -1){
                                    newImgData[k] = imgData[k];
                                }
                            };
                            this.action({
                                moduleName:'HousingEditor',
                                goods:{
                                    img:null
                                }
                            });
                            this.action({
                                moduleName:'HousingEditor',
                                goods:{
                                    img:newImgData
                                }
                            });
                            if(Object.keys(imgData).length == Object.keys(newImgData).length){
                                const  imgUpdata = this.airforce.HousingEditor.imgUpdata;
                                const  imgUpdataCopy = [];
                                imgUpdata.forEach(imgUpdataItem=>{
                                    imgUpdataCopy.push(imgUpdataItem);
                                });
                                imgUpdataCopy.splice(index - Object.keys(newImgData).length,1);
                                this.action({
                                    moduleName:'HousingEditor',
                                    goods:{
                                        imgUpdata:null,
                                    }
                                });this.action({
                                    moduleName:'HousingEditor',
                                    goods:{
                                        imgUpdata:imgUpdataCopy,
                                    }
                                });
                            }
                        }catch (e){}
                    }
                }else {
                    if(this.airforce.HousingEditor.imgUpdata){
                        this.action({
                            moduleName:'HousingEditor',
                            goods:{
                                imgUpdata:[...this.airforce.HousingEditor.imgUpdata,e],
                            }
                        });
                        return;
                    }
                    this.action({
                        moduleName:'HousingEditor',
                        goods:{
                            imgUpdata:[e],
                        }
                    });
                };

            },
            submit(){
                if(this.$utils.is_S(this.airforce.HousingEditor.projname)){
                    this.$vux.toast.text('【房源名称】不能为空');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.title)){
                    this.$vux.toast.text('【房源标题】不能为空');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.pice)){
                    this.$vux.toast.text('【租金】不能为空');
                    return;
                }
                if(!this.airforce.HousingEditor.Payinfo_Select){
                    this.$vux.toast.text('请选择【付款方式】');
                    return;
                }
                if(!this.airforce.HousingEditor.HousingArea){
                    this.$vux.toast.text('请选择【地区】');
                    return;
                }
                if(!this.airforce.HousingEditor.HousingRentWay_SelectTxt){
                    this.$vux.toast.text('请选择【出租方式】');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.build)){
                    this.$vux.toast.text('请输入房源【幢】数');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.unit)){
                    this.$vux.toast.text('请输入房源【单元】数');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.floor)){
                    this.$vux.toast.text('请输入房源【楼层】数');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.foward)){
                    this.$vux.toast.text('请输入房源【朝向】');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.bedroom)){
                    this.$vux.toast.text('请输入房源【门牌号】');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.room)){
                    this.$vux.toast.text('请输入房源【房间】数量');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.hall)){
                    this.$vux.toast.text('请输入房源【客厅】数量');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.wc)){
                    this.$vux.toast.text('请输入房源【卫生间】数量');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.area)){
                    this.$vux.toast.text('请输入房源【面积】');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.fitment_Select)){
                    this.$vux.toast.text('【装修程度】不能为空');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.hs_name)){
                    this.$vux.toast.text('【姓名】不能为空');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.hs_phone)){
                    this.$vux.toast.text('【联系方式】不能为空');
                    return;
                }
                if(!this.$utils.isPhone(this.airforce.HousingEditor.hs_phone)){
                    this.$vux.toast.text('【联系方式】手机号码错误');
                    return;
                }
                if(this.$utils.is_S(this.airforce.HousingEditor.channelShow_Select)){
                    this.$vux.toast.text('【房源展现渠道】不能为空');
                    return;
                }
                const fromData = JSON.parse(JSON.stringify(this.airforce.HousingEditor));
                fromData.mode = fromData.HousingRentWay_Select.value;
                fromData.payinfo = fromData.Payinfo_Select.value;
                fromData.fitment = fromData.fitment_Select.value;
                fromData.qudaoshow = fromData.channelShow_Select.value;
                fromData.match = JSON.stringify(this.configsVal);
                fromData.status = '2';
                fromData.citycode = fromData.HousingArea.provinces.value;
                fromData.district = fromData.HousingArea.city.value;
                fromData.areacode = fromData.HousingArea.area.value;
                fromData.img = JSON.stringify(fromData.img);
                fromData.isStr = true;
                if(this.airforce.HousingEditor.imgUpdata){
                    for(let i = 0 ; i < this.airforce.HousingEditor.imgUpdata.length ; i++){
                        fromData[`imgUpdata[${i}]`] = this.airforce.HousingEditor.imgUpdata[i];
                    }
                };
                if(this.imgOldIndex){
                    fromData.imgOldIndex =  this.imgOldIndex;
                };
                this.$vux.loading.show({text: '加载中..'});
                this.action({
                    moduleName:'Housesource_update_post',
                    url:'/adminapi/Housesource/update',
                    method:'post',
                    isFormData:true,
                    data:_.merge({
                        token:this.airforce.login_post.data.token,
                    },fromData)
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
                    if(this.airforce.HousingEditor.HousingEditorType == 2){
                        this.$vux.toast.text("保存成功");
                    }else {
                        this.$vux.toast.text("发布成功");
                    }
                    this.$router.back();
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
            try {
                if(this.airforce.HousingEditor.HousingEditorType != 2){
                    this.action({
                        moduleName:"layout",
                        goods:{
                            title:"房源发布"
                        }
                    })
                }
            }catch (e){}
            const { payinfo,mode,fitment,qudaoshow,match,address,
                areacode,citycode,district,img } = this.airforce.HousingEditor;
            try {
                this.action({
                    moduleName:'HousingEditor',
                    goods:{
                        imgUpdata:null,
                    }
                });
                if(img && img != 'null' && typeof img == "object"){
                    this.imgOldIndex = Object.keys(img).length;
                    const base64Url2 = [];
                    for (let  k in img){
                        base64Url2.push(img[k]);
                    };
                    this.$refs.imagesUpload.isImgs = true;
                    this.$refs.imagesUpload.base64Url2 = base64Url2;
                }
                this.action({
                    moduleName:'HousingEditor',
                    goods:{
                        HousingArea:{
                            address,
                            area:_.find(ChinaAddressV4Data,{value:areacode,parent:district}),
                            city:_.find(ChinaAddressV4Data,{value:district,parent:citycode}),
                            provinces:_.find(ChinaAddressV4Data,{value:citycode}),
                        }
                    }
                });
                this.setData(
                    'HousingRentWay',
                    _.find(modeList,{value:mode})
                );
                this.setData(
                    'Payinfo',
                    _.find(HousingPayinfo,{value:payinfo})
                );
                this.setData(
                    'fitment',
                    _.find(HousingFitment,{value:fitment})
                );
                this.setData(
                    'channelShow',
                    _.find(channelList,{value:qudaoshow})
                );
            }catch (e){}
            try {
                const configs = JSON.parse(match.replace(/&quot;/img,'"'));
                if(typeof configs == 'object'){
                    this.configsVal = configs;
                }
            }catch (e){}
        },
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
        .HousingDetailsCard1{
            background-color: @cor_ffffff;
            padding:@paIndex;
            margin-bottom: @maTop;
            .title{
                font-size: 16px;
                .textNowrap();
            }
            .money{
                font-size: 18px;
                font-weight: initial;
                color: @cor_ff0000;
                span{
                    font-size: 12px;
                }
            }
            &/deep/ .Card1-group{
                .vux-no-group-title{
                    margin-top: 0;
                    &:before{
                        border: none;
                    }
                    &:after{
                        border: none;
                    }
                }
            }
            &/deep/ .Card1-cell{
                padding: 0;
                line-height: 40px;
                .iconfont{
                    margin-right: 5px;
                    font-size: 18px;
                }
                .select-flexbox{
                    &:before{
                        border: none;
                    }
                    *{
                        padding: 0;
                    }
                    .left{
                        .vux-cell-bd{
                            width: auto !important;
                            flex: initial;
                            margin-right: @maTop;
                        }
                    }
                    .select-cell{
                        .weui-cell__ft{
                            padding-right: @paIndex;
                        }
                    }
                }
            }
        }
        .HousingDetailsCard2{
            margin-top: @maTop;
            .card-content{
                padding: @paIndex;
                line-height: 30px;
                .textTitle{
                    color: @cor_a9a7ab;
                    margin-right: 5px;
                    .textNowrap();
                }
                .list-item{
                    min-width: 20%;
                    .iconfont{
                        text-align: center;
                        font-size: 24px;
                        color: @cor_D9D9D9;
                    }
                    .text{
                        text-align: center;
                        color: @cor_a9a7ab;
                        font-size: 12px;
                        line-height: initial;
                        .textNowrap();
                    }
                }
                .list-item-selected{
                    .iconfont{
                        color:@cor_1bd182;
                    }
                    .text{
                        .iconfont;
                    }
                }
                .configs1{
                    .iconfont{
                        font-size: 35px;
                    }
                }
            }
        }
        .HousingDetailsCard3{
            .title{
                .vux-x-input{
                   padding:0;
                    margin-bottom: @maTop;
                }
            }
            .money{
                .title;
            }
        }
        .HousingDetailsCard4{
            .vux-flexbox-item{
                border-bottom: 1px solid @cor_D9D9D9;
                &.nb{
                    border: none;
                }
            }
        }
        .footerBtns{
            @index:50px;
            height:  @index + @maTop;
            .footerBtns-flexbox{
                border-top: 1px solid @theme-color;
                background-color: @cor_ffffff;
                position: fixed;
                left: 0;
                bottom: 0;
                text-align: center;
                line-height:  @index;
                color: @theme-color;
                .left{
                    &.type1{
                        color: @cor_ff0000;
                    }
                    &:active{
                        background-color: @cor_D9D9D9;
                    }
                }
                .right{
                    background-color: @theme-color;
                    color: @cor_ffffff;
                    margin: 0 !important;
                    &:active{
                        background-color: @theme-color*0.9;
                    }
                }
            }
        }
    }
</style>