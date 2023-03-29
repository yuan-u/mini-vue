//当前活动的副作用
let activeEffect;

export function effect(fn) {
    //未考虑副作用里兼容其它其它副作用
    activeEffect = fn
}

//输入目标对象，返回代理对象
export function reactive(obj) {
    return new Proxy(obj,{
        get(target,key){
            const value = Reflect.get(target,key)
            //跟踪依赖
            track(target,key)
            return value
        },
        set(target,key,value){
            const result =Reflect.set(target,key,value)
            //触发依赖
            trigger(target,key)
            return  result
        },
        deleteProperty(target,key){
            const result = Reflect.deleteProperty(target,key)
            trigger(target,key)
            return result 
        }
    })
}

//创建一个map保存依赖关系 {target:{key:[fn1,fn2]}}
const targetMap = new WeakMap()
function track(target,key){
    if (activeEffect) {
        let depsMap = targetMap.get(target)
        //如果首次depsMap是不存在的，需要创建
        if (!depsMap) {
            targetMap.set(target,( depsMap= new Map()))
        }
        //获取depsMap中target对应得set
        let deps = depsMap.get(key)
        //首次deps不存在，需要创建
        if (!deps) {
            depsMap.set(key,(deps= new Set()))
        }
        //添加当前激活得副作用
        deps.add(activeEffect)
    }
}


function trigger(target,key){
    //未做异步得更新机制
    const depsMap = targetMap.get(target)
    if (depsMap) {
        const deps = depsMap.get(key)
        if (deps) {
            deps.forEach(dep => dep());
        }
    }
}