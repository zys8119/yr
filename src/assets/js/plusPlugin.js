const plugin = {
    install (vue) {
        vue.$$plus = new Promise((resolve, reject) => {
            document.addEventListener('plusready', ()=>{
                if(plus){
                    resolve(plus);
                }else {
                    reject();
                }
            }, false);
        })
        vue.mixin({
            created: function () {
                this.plus = vue.$$plus;
            }
        })
    }
}

export default plugin
export const install = plugin.install

