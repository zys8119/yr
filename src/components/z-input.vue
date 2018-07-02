<template>
    <div class="z-input">
        <x-input :title="title" :placeholder="placeholder" :class="className" :value="value"  @on-change="change($event)" @on-focus="focus($event)" @on-blur="blur($event)"></x-input>
        <x-button :disabled="disabledBtn" v-if="showBotton && slotType == '1'" class="z-input-x-button" @click.native="onClick">
            <slot>{{ z_input_text }}</slot>
        </x-button>
        <x-button :disabled="disabledBtn" v-if="slotType == '2'" class="z-input-x-button" @click.native="onClick">
            {{ z_input_text }}
        </x-button>
    </div>
</template>

<script>
    import { XInput, XButton } from "vux"
    import { mapGetters, mapActions } from "vuex"
    export default {
        name: "z-input",
        components:{ XInput, XButton },
        data(){
            return {
                initText:"获取验证码",
                varText:null
            }
        },
        props:{
            placeholder:{
                type:String,
                default:''
            },
            className:{
                type:String,
                default:''
            },
            text:{
                type:String,
                default:''
            },
            value:{
                type:String,
                default:''
            },
            disabledBtn:{
                type:Boolean,
                default:false
            },
            slotType:{
                type:String,
                default:"2"
            },
            fieldName:{
                type:String,
                default:"z_input_fieldName"
            },
            title:{
                type:String,
                default:""
            },
        },
        methods:{
            ...mapActions(['action']),
            change($event){
                this.$emit("change",$event);
            },
            getCode(opt = {}){
                let opts = {
                    max:60,//最大时间，单位秒
                    fieldName:this.fieldName,
                };
                for(let  k in opt){
                    opts[k] = opt[k];
                };
                if(!this.airforce[opts.fieldName]){
                    this.action({
                        moduleName:opts.fieldName,
                        goods:{}
                    });
                };
                if(this.airforce[opts.fieldName].timeIndex){
                    opts.max = this.airforce[opts.fieldName].timeIndex;
                };
                this.action({
                    moduleName:opts.fieldName,
                    goods:{
                        disabledBtn:true,
                    }
                });
                var time = setInterval(()=>{
                    var msg = this.z_input_text.substr(this.z_input_text.length - 5,5);
                    if(0 < opts.max){
                        opts.max -= 1;
                        this.varText = "(" + opts.max + "s)后" + msg;
                        this.action({
                            moduleName:opts.fieldName,
                            goods:{
                                timeIndex:opts.max,
                            }
                        });
                    }else {
                        this.action({
                            moduleName:opts.fieldName,
                            goods:{
                                disabledBtn:false,
                            }
                        });
                        this.varText = msg
                        this.action({
                            moduleName:opts.fieldName,
                            goods:{
                                timeIndex:null,
                            }
                        });
                        clearInterval(time);
                    }
                },1000);
            },
            onClick(){
                this.$emit("click",this.getCode);
            },
            focus($event){
                this.$emit("on-focus",$event);
            },
            blur($event){
                this.$emit("on-blur",$event);
            }
        },
        computed:{
          ...mapGetters(['airforce']),
          showBotton(){
              if(this.$slots.default){
                    return true;
              }
              return false;
          },
          z_input_text(){
              try {
                  if(this.varText){
                      return this.varText;
                  }
                  if(this.$slots.default[0].text){
                      return this.$slots.default[0].text;
                  }
              }catch (e){
                  return this.initText;
              }
              return this.initText;
          },
        },
        mounted(){
            if(this.airforce[this.fieldName] && this.airforce[this.fieldName].timeIndex){
                this.getCode();
            };
        }
    }
</script>

<style scoped lang="less">
.z-input{
    position: relative;
    .z-input-x-button{
        @index:46px;
        position: absolute;
        top: 8px;
        right: 8px;
        width: auto;
        height: @index - 16px;
        border: none;
        line-height: @index - 16px;
        font-size: 12px;
        &:after{
            border: none;
        }
    }
}
</style>