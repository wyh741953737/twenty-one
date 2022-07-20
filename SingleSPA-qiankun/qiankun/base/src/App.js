
import {BrowserRouter as Router, Link} from 'react-router-dom'
import {
  AppstoreOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';

function getItem(label, key, icon, children, type) {
  return {key, icon, children, label, type};
}

const items = [
  getItem('Navigation One', '1', <MailOutlined />),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />)
];

const App = () => {
  const [current, setCurrent] = useState('1');

  const onClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu
        theme="dark"
        onClick={onClick}
        style={{ width: 256 }}
        defaultOpenKeys={['1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
      <Router>
        <Link to="/vue">vue应用</Link><br/>
        <Link to="/react">react应用</Link>
      </Router>
      <div id="container"></div>
    </div>
  );
};

export default App;