import { expect, test } from "vitest";
import { reactive } from "../index";

test('reactivity should work',()=>{
    const original = {foo:'foo'}
    const observed = reactive(original)
    //代理对象是全新对象
    expect(observed).not.toBe(original)
    //能够访问所代理对象的属性
    expect(observed.foo).toBe(original.foo)
    //能够修改所代理对象
    observed.foo = '1111'
    expect(original.foo).toBe('1111')
    //能够增加
    observed.bar = '666'
    expect(original.bar).toBe('666')
    //能够删除
    delete observed.bar
    expect(original.bar).toBe(undefined)

})