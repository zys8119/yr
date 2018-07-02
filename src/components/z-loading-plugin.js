import ZLoading from './z-loading'

let $vm

const plugin = {
    install (vue) {
        const Loading = vue.extend(ZLoading)

        if (!$vm) {
            $vm = new Loading({
                el: document.createElement('div'),
            });
            document.body.appendChild($vm.$el)
        }
        const loading = {
            show (options = {}) {
                try {
                    switch (typeof options){
                        case 'string':
                            $vm.text = options;
                            break;
                        case 'object':
                            for(let i in options){
                                $vm.$props[i] = options[i];
                            }
                            break;
                    }
                }catch (e){}
                $vm.show = true;
            },
            hide () {
                $vm.show = false;
            }
        }
        if (!vue.$vuz) {
            vue.$vuz = {
                loading
            }
        } else {
            vue.$vuz.loading = loading
        }

        vue.mixin({
            created: function () {
                this.$vuz = vue.$vuz
            }
        })
    }
}

export default plugin
export const install = plugin.install

