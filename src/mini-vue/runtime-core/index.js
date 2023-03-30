//runtime-core 写虚拟dom通用的操作

import { effect, reactive } from "../reactivity";
import { createVNode } from "./vnode";


// 自定义渲染器api
export function createRenderer(options) {
    //render负责渲染组件内容
    const {
        createElement:hostCreateElement,
        insert:hostInsert
    }= options;

    //无虚拟dom版本
    // const render = (rootComponent,selector) =>{
    //     //1.获取宿主
    //     // const container = document.querySelector(selector) document改为options后，这段代码就和平台无关了
    //     const container = options.querySelector(selector)
    //     //2.渲染视图
    //         //定义响应式数据
    //     const observed = reactive(rootComponent.data())
    //     //  2.5 为组件定义一个更新函数
    //     const componetUpdateFn = () =>{
    //         const el = rootComponent.render.call(observed)
    //         //清除原来的文本.真实源码中是找到原来的节点直接做更新
    //         options.setElementText(container,'')
    //         //3.追加宿主
    //         options.insert(el,container)
    //         // container.appendChild(el) //
    //     }
    //     //激活副作用
    //     effect(componetUpdateFn)

    //     //初始化执行一次
    //     componetUpdateFn()

    //     //挂载钩子是否存在
    //     if (rootComponent.mounted) {
    //         console.log(222);
    //         rootComponent.mounted.call(observed)
    //     }
    // }

    const render = (vnode,container)=>{
        if (vnode) {
            patch(container._vnode || null,vnode,container)
        }
        container._vnode = vnode
    }

    const patch = (n1,n2,container)=> {
        //判断n2是否是字符串，是为原生节点，直接处理，否则是组件
        const {type} = n2
        if (typeof type == 'string') {
            //element
            processElement(n1,n2,container)
        }else{
            processComponent(n1,n2,container)
        }
    }

    const processComponent = (n1,n2,container) =>{
        if (n1===null) {
            //走挂载流程 mount
            mountComponent(n2,container)
        }else{
            //patch流程
        }
    }

    const mountComponent = (initialVNode,container)=>{
        //创建组件实例
        const instance ={
            data:{},
            vnode:initialVNode,
            isMounted:false
        }
        //初始化组件状态
        const {data:dataOptions}= instance.vnode.type
        instance.data = reactive(dataOptions())
        //安装渲染副作用函数
        setupRenderEffect(instance,container)
    }

    const setupRenderEffect= (instance,container)=>{
        //声明组件更新函数
        const componetUpdateFn = ()=>{
            if (!instance.isMounted) {
                //创建阶段
                //执行组件渲染函数获取vnode
                const {render} = instance.vnode.type
                const vnode= render.call(instance.data)
                //递归patch嵌套节点
                patch(null,vnode,container)

                //挂载钩子
                if (instance.vnode.type.isMounted) {
                    instance.vnode.type.isMounted.call(instance.data)
                }else{
                    //更新阶段

                }
            }
        }
        //建立更新机制
        effect(componetUpdateFn)
        //首次执行组件更新函数
        componetUpdateFn()
    }

    const processElement = (n1,n2,container)=> {
        if (n1==null) {
            //创建阶段
            mountElement(n2,container)
        }else{

        }
    }

    const mountElement = (vnode,container)=>{
        const el = (vnode.el = hostCreateElement(vnode.type))

        //如果为文本
        if (typeof vnode.children === 'string') {
            el.textContent = vnode.children
        }else{
            vnode.children.forEach(child=> patch(null,child,el));
        }

        //插入元素
        hostInsert(el,container)
    }



    //返回一个渲染器实例
    return{
        render,
        createApp:createAppAPI(render)
    }

}

export function createAppAPI(render) {
    return function createApp(rootComponent) {
        const app = {
            mount(container){
                console.log('createAppAPI container',container);
                // render(rootComponent, selector) //无虚拟dom版
                const vnode = createVNode(rootComponent)
                //将vnode转为真实dom，并追加到宿主selector
                render(vnode,container)

            }
        }

        return app
    }
}