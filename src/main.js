import { createApp } from 'vue'
// import { createApp } from './mini-vue'      //mini-vue 特有
// import { createVNode } from './mini-vue/runtime-core/vnode'     //mini-vue 特有
import './style.css'
import App from './App.vue'

//导入路由插件
import  router  from "./mini-router/index";

//mini-vue 特有
// createApp({
    
//     data(){
//         return {
//             title:'hello, mini-vue'
//         }
//     },
//     render(){
//         // const h3 = document.createElement('h3')
//         // h3.textContent = this.title
//         // return h3
//         return createVNode('h3',{}, this.title)
//     },
//     mounted(){
//      setTimeout(()=>{
//         console.log(111);
//         this.title ="i change"
//      },2000)   
//     }
// }).use(router).mount('#app') 


//mini-router
createApp(App).use(router).mount('#app') 
