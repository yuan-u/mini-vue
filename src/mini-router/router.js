import  RouterLink  from "./RouterLink";
import  RouterView  from "./RouterView";
import { ref } from "vue";

export function createRouter(options) {
    //router 实例
    const router = {
        options, //保存配置
        current:ref(window.location.hash.slice(1) || '/'),
        install(app){
            const router = this
            //1.注册2个全局组件
            app.component('RouterLink',RouterLink)
            app.component('RouterView',RouterView)
            //2.全局注册￥router
            app.config.globalProperties.$router = router
        }
    }
    //监听事件
    window.addEventListener('hashchange', ()=> {
        router.current.value = window.location.hash.slice(1)
        console.log(router.current.value);
    })
    return router
}