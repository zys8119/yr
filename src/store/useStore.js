import { mapActions, mapGetters } from 'vuex'
const plugin = {
    install (Vue) {
        Vue.mixin({
            methods:{
                ...mapActions(['action'])
            },
            computed:{
                ...mapGetters(['airforce']),
            }
        })
    }
}

export default plugin
export const install = plugin.install
