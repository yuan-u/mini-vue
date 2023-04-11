import { defineComponent, getCurrentInstance, h, unref } from "vue";

export default defineComponent({
    setup(){
        return () => {
            //获取组件实例
            const {proxy:{ $router}} = getCurrentInstance()
            // 1.获取想要渲染的组件
            // 1.1获取配置routes
            // 1.2 通过current地址找到匹配的项
            let component
            const route = $router.options.routes.find(
                 (route) => route.path === unref($router.current) 
            ) //路由表
            //找到匹配组件
            if (route) {
                component = route.component
                return h( component,'router-view')
            }else{
                console.warn("no match component");
                return h("div","")
            }
            
        }
    }
})