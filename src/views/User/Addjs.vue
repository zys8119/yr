<template>
    <div class="addjs">
        <group gutter="0">
            <x-input type="text" title="姓名" placeholder="维修工姓名" placeholder-align="right" text-align="right"></x-input>
        </group>
        <group gutter="10">
          <popup-picker title="职能分类" :data="typelist" v-model="wxtype" ></popup-picker>
        </group>
        <group gutter="0">
            <x-input type="tel" title="联系方式" placeholder="维修工联系方式" placeholder-align="right" text-align="right"></x-input>
        </group>
        <group gutter="0" class="ms">
            <x-textarea title="职能描述" inline-desc="描述该维修工的业务范围等详细描述" :height=200 show-counter :max=200></x-textarea>
        </group>
        <button @click.prevent="addper">添加</button>
    </div>    
</template>
<script>
import { XInput,Group,PopupPicker,CellBox ,XTextarea } from "vux"
import { setTimeout } from 'timers';
export default {
    name:"Addjs",
    data(){
        return{
            msg:"添加角色",
            typelist:[["电工","管道工","木工","空调工"]],
            wxtype:["电工"],
            ms:""
        }
    },
    methods:{
        addper(){
            this.$vux.toast.text("添加成功")
            setTimeout(()=>{
                this.$router.back();
            },2000)
        }
    },
    components:{
        XInput,
        Group,
        PopupPicker,
        CellBox,
        XTextarea 
    }
}
</script>
<style lang="less" scoped>
.addjs{
    
    &/deep/ .ms{
        .weui-cells,.vux-no-group-title{
            .weui-cell,.vux-x-textarea{
                display: block;
            }
        }
    }
    
    button,button:focus{
        display: block;
        border:none;
        outline: none;
        width: 80%;
        margin: 0 auto;
        margin-top: 60px;
        background: #1b82d2;
        border-radius: 20px;
        color: #fff;
        line-height: 40px;
        font-size: 17px;
    }
}
</style>
