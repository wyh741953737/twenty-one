// 按位操作，0b开头 binary 二进制，0xa 十六进制
const NoFlags = 0b000; //0
const HasEffect = 0b001; // 1
const Layout = 0b010; //2 React.useLayoutEffect
const Passive = 0b100; //4 React.useEffect

let layoutTag = HasEffect | Layout; // 0b001 0b010 = 0b011
if (layoutTag & Layout !== NoFlags) { //       0b011 0b010 = 0b010 !== 0b000
  console.log('useLayoutEffect')
}
