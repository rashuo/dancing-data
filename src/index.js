import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import PermissionGuard from './container/PermissionGuard';
import './style/global.less';

class Root extends React.PureComponent {
  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    return (
      <Router>
        <PermissionGuard />
      </Router>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('app')
);
