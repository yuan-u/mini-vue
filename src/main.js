// import { createApp } from 'vue'
import { createApp } from './mini-vue'
import { createVNode } from './mini-vue/runtime-core/vnode'
import './style.css'
// import App from './App.vue'

createApp({
    data(){
        return {
            title:'hello, mini-vue'
        }
    },
    render(){
        // const h3 = document.createElement('h3')
        // h3.textContent = this.title
        // return h3
        return createVNode('h3',{}, this.title)
    },
    mounted(){
     setTimeout(()=>{
        console.log(111);
        this.title ="i change"
     },2000)   
    }

}).mount('#app')
