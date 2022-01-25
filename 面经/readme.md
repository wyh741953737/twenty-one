### for, forEach, map区别
1：for：在复杂的循环中效率高，长度固定不用计算时for效率高于forEach，仅迭代自身可枚举属性
2：forEach：适合遍历数组和集合，长度不固定或需要计算时用forEach，forEach优势在于对稀疏数组的处理，会跳过数组中的空位, 如果是空数组，返回undefined, 不能break跳出循环（报错）return跳出本次循环，可以在forEach在使用return
3：map：返回新数组，不会对空数组检测（返回[])，不改变原始数组
forEach和map都不会改变原数组，
4： for...in 任意顺序遍历一个对象除symbol以外可枚举属性，可用break跳出循环，
代码中用return会报错，函数体中return可以跳出循环，返回数组下标
getOwnPropertyNames或hasOwnProperty确定某个属性是否是对象本身属性
5：for...of 可迭代对象（Map，Set，String， arguments不能return（报错），在函数体中会跳出循环
性能上：for < for...of < forEach < for..in < map
