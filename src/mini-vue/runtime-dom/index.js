//runtime-dom 给浏览器平台写特有的操作

import { createRenderer } from "../runtime-core/index";

//每个平台只有一个渲染器，所以是单例
let renderer

//dom特有的节点操作
const rendererOptions = {
    querySelector(selector){
        return document.querySelector(selector)
    },
    insert(child,parent,anchor){
        parent.insertBefore(child,anchor || null)
    },
    //清除指定文本
    setElementText(el,text){
        el.textContent = text
    },

    createElement(tag){
        return document.createElement(tag)
    }
}

//确保render单例
function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions))
}

//创建app实例
export function createApp(rootComponent) {
    //接收根组件，返回app实例

    // const renderer = ensureRenderer()
    // return renderer.createApp(rootComponent)


    const app = ensureRenderer().createApp(rootComponent)
    const mount = app.mount()
    app.mount = function (selectorOrContainer) {
        const container = document.querySelector(selectorOrContainer)
        mount(container)
    }
    return app

    // {
        // mount(selector){
        //     // console.log('mount');
        //     //1.获取宿主
        //     const container = document.querySelector(selector)
        //     //2.渲染视图
        //     const el = rootComponent.render.call(rootComponent.data())
        //     //3.追加宿主
        //     container.appendChild(el)
        // }
    // }
}


