###
1：mustach将标签字符串转化成tokens
2：然后tokens转化成嵌套tokens
3：将tokens和数据结合转化成标签字符串

snabbdom

虚拟dom如何被渲染函数（h函数）产生
将html 转化成{sel: 'div', text: '', elm: undefined. key:undefined, children:[], data: {props:{}}}  
再调用h('div',{props: {}}, [h('span', props:{}, '你好')])产生虚拟节点
  1: vNode函数返回{sel,data,children,text, elm}
  2: h函数判断类型：字符串调用vnode，数组的话遍历每个收集children，对象就收集到children，调用vnode
最后通过patch函数上树patch(container, vdom)
  1：判断老节点是真实dom还是虚拟节点，是真实的调用vNode生成虚拟节点
  2：对比新旧节点，判断节点是不是同一个节点(key和sel相同),是同一个节点，判断属性和子节点是否相同，不是同一个节点之间暴力插入(createElement生成真实dom）删除
dom的diff
虚拟dom如何通过diff变成真正dom