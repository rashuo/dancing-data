import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

class Root extends React.PureComponent {
  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    return (
      <div>helloK</div>
    )
  }
}
