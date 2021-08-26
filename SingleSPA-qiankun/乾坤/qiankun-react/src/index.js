import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
export async function bootstrap() { };
export async function mount(props) {
  render(props)
}; // porops是父应用传过来的，全局api通信用的
export async function unmount(props) {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
};