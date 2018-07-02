<template>
    <div class="ApplyEntering">
        <group>
            <x-input title="姓名"></x-input>
            <x-input title="手机"></x-input>
            <x-input title="租金"></x-input>
            <x-input title="押金"></x-input>
            <cell title="起租日期"></cell>
            <cell title="结束日期"></cell>
        </group>
        <group>
            <cell title="结束日期"></cell>
        </group>
        <group>
            <x-input title="身份证号"></x-input>
        </group>
        <div class="x-button-type1">
            <x-button @click.native="submit">提交</x-button>
        </div>
    </div>
</template>

<script>
    import { Group, XInput, Cell, XButton } from  'vux'
    export default {
        name: "apply-entering",
        components: { Group, XInput, Cell, XButton }
    }
</script>

<style scoped lang="less">
.ApplyEntering{

}
</style>