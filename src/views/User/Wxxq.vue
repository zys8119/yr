<template>
  <div class="Wxadd">
    <group gutter="0">
      <x-input type="text" disabled title="申报人" text-align="right" v-model="name"></x-input>
    </group>
    <group gutter="0">
      <x-input type="tel" disabled title="联系方式" text-align="right" v-model="tel"></x-input>
    </group>
    <group gutter="0">
      <x-input type="text" disabled title="地址" text-align="right" v-model="dz"></x-input>
    </group>
     <group gutter=0>
        <popup-picker title="选择维修人员" :data="wxglist" v-model="wxg" ></popup-picker>
      </group>
      <group gutter="0" class="ms">
        <x-textarea title="职能描述" inline-desc="描述该维修工的业务范围等详细描述" :height=200 disabled v-model="ms"></x-textarea>
      </group>
      <span class="btn" @click="save">保存</span>
  </div>
</template>
<script>
import $ from "jquery";
import { Tab, TabItem, CellBox, Group, Popup, Radio,Toast ,PopupPicker,XInput,XTextarea} from "vux";
export default {
  name: "Wxxq",
  data() {
    return {
      msg: "维修详情",
      wxglist: [["王师傅 (电工) 15958123761", "陆师傅 (电工) 15958123761","季师傅 (电工) 15958123761","李师傅 (电工) 15958123761",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
      wxg:["王师傅 (电工) 15958123761"],
      name:"林祥柯",
      tel:"15958123761",
      dz:"御景水岸花园15幢901室",
      ms:"这是描述内容"
    };
  },
  components: {
    Tab,
    TabItem,
    CellBox,
    Radio,
    Group,
    Popup,
    PopupPicker ,
    XInput,
    XTextarea
  },
  methods: {
    save() {
      //保存并推送的方法
      this.$vux.toast.text("保存成功");
      setTimeout(()=>{
         this.$router.back();
      },2000)
    },
  }
};
</script>
<style lang="less" scoped>
.Wxadd {
   &/deep/ .ms{
        .weui-cells,.vux-no-group-title{
            .weui-cell,.vux-x-textarea{
              display: block;
              .weui-cell__bd{
                textarea{
                  background: #fff!important;
                }
              }
            }
        }
    }
  .btn {
    display: block;
    width: 70%;
    color: #fff;
    background: #d01716;
    text-align: center;
    margin: 30px auto;
    border-radius: 20px;
    line-height: 35px;
  }
}
</style>
