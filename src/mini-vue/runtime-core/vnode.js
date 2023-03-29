//createVNode是给编译器生成的虚拟函数使用的，源码里还有一个 h函数，给用户使用的，更灵活
export function createVNode(type, props,children) {
    //虚拟dom就是一个js对象，返回一个js对象，不是dom，只是一个数据载体
    return {type, props,children}
}