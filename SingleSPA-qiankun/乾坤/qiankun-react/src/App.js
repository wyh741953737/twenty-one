import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/react">
      <Link to="/">商铺</Link>
      <Link to="/about">关于</Link>
      <Route path="/" exact render={() => <div><h1>n你好你好</h1>你好，我是react</div>}></Route>
      <Route path="/about" render={()=><div><h1>n你好你好我是about</h1></div>}></Route>
    </BrowserRouter>
  );
}

export default App;
