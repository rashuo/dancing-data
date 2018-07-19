import React from 'react';
import { Menu, Icon } from 'antd';
import BaseComponent from '@/component/BaseComponent';
import { withRouter } from 'react-router-dom';

import './style.less';

const MenuItem = Menu.Item;

class NavBar extends BaseComponent {

  state = {
    current: 'index',
  }

  componentWillMount() {
    let path = window.location.pathname;
    path = path.substr(1, path.length);

    this.setState({
      current: path.length === 0 ? 'index' : path,
    })
  }

  handleClick = (event) => {
    this.setState({
      current: event.key,
    })
    if (event.key === 'index') {
      this.props.history.push('/');
      return;
    }
    this.props.history.push(`/${event.key}`);
  }

  render() {
    return (
      <div className="navbar-body">
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={[this.state.current]} onClick={this.handleClick}>
          <MenuItem key="index">
            <Icon type="area-chart" />
            <span>首页</span>
          </MenuItem>
          <MenuItem key="building">
            <Icon type="home" />
            <span>成都新盘</span>
          </MenuItem>
          <MenuItem key="property">
            <Icon type="pie-chart" />
            <span>资产负债</span>
          </MenuItem>
          <MenuItem key="treasure">
            <Icon type="appstore-o" />
            <span>百宝箱</span>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withRouter(NavBar);
