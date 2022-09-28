  ### 泛型约束
  通过extends为泛型（类型变量）添加约束
  function id<Type extends ILength>(value: Type): Type {return xxx}
  ### 多个类型变量约束
  function getProp<Type, key extends keyof Type>(obj: Type, key: Key) {return ojb[key]}
  ### 泛型接口
  类型变量对所有成员都可见，使用泛型接口时要显示声明类型
  interface IdFunc<Type> {
    id: (value:Type) => Type,
    ids: ()=>Type[]
  }
  let obj:IdFunc<number> = {
  }
  ### 泛型类
  interface IState {count:number}
  interface IsProps{n:number}
  class IPnput extends React.Component<IsProps, IState> {
    state: IState = {}
  }
  ### 泛型工具类：
  Partial<Type>:用来创建一个结构和Type相同的可选类型
    interface Type { id: string, name:string}
    type PatialType = Partial<Type> id和name变成可选属性
  Readonly<Type>：创建一个将Type所有属性变成只读属性
    type ReadonlyProps = Readonly<Type>
  Pick<Type, Keys>: 从Type选择一组属性来构造新类型
    type PickType = Pick<Type, 'id' | 'name'>
  Record<Keys, Type>: 创建属性为keys，；类型为Type的类型
    type RecordObj = Record<'a' | 'b' | 'c', string[]>
    let obj: RecordObj = {
        a: ['a'], 
        b: ['b'],
        c: ['c']
    }
    keys表示构建的对象有哪些属性，Type表示类型
