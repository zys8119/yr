<template>
    <div class="Layout">
        <layout-header v-if="airforce.layout.headerShow"></layout-header>
        <div :class="`layoutMain ${(airforce.layout.footerShow)? 'layoutMainType1' : ''}`">
            <router-view v-transition />
        </div>
        <layou-footer v-if="airforce.layout.footerShow"></layou-footer>
    </div>
</template>

<script>
    import LayoutHeader from './LayoutHeader.vue'
    import LayouFooter from './LayouFooter.vue'
    import { mapGetters } from "vuex"
    export default {
        name: "layout",
        components:{ LayoutHeader, LayouFooter },
        computed:{
            ...mapGetters(['airforce'])
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/color";
.layoutMain{
    &.layoutMainType1{
        padding-bottom: 53px;
    }
    .animated{
        &.fedeInLeft{
            height: 10000px;
        }
        &.fadeInRight{
           .fedeInLeft;
        }
        &.fadeInDown{
           .fedeInLeft;
        }
    }
}
</style>