number，string，boolean，null，undefined，object，元组tuple和数组不一样的是元组中的每一项都指定类型，泛型，
数组泛型： const list:Array<number>=[1,2,3]
元组类型表示一个已知元素数量和类型的数组，const arr: [string,number],当访问越界元素，就是下标为2，会使用联合类型替代 arr[2] = 'word' word可是string或者number
枚举enum：enum Color {red，green， pink}
    const c:Color = Color.red
    默认情况下从0开始为元素编号，你也可以手动指定成员的数值，比如enum Color = {red=1, green, pink} 
    const c: Color = Color[1]
