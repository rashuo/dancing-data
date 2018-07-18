
import React from 'react';
class BaseComponent extends React.Component {

  // 解决快速切换页面报setState错误的问题
  componentWillUnmount() {
    this.setState = (state, callback) => {
    }
  }
}

export default BaseComponent;
