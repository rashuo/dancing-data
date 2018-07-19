import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'bundle-loader?lazy!./container/Home';
import Building from 'bundle-loader?lazy!./container/Building';
import Property from 'bundle-loader?lazy!./container/Property';
import Treasure from 'bundle-loader?lazy!./container/Treasure';
import LazyLoad from '@/component/LazyLoad';

const loadingComponent = () => {
  return (
    <div id="loading__wrap">
      <div id="loading">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
    </div>
  )
}
const createComponent = (component) => {
  return () => {
    const AsyncComponent = (
      <LazyLoad load={component}>
        {
          (PureComponent) => {
            return PureComponent ? <PureComponent /> : loadingComponent()
          }
        }
      </LazyLoad>
    )
    return AsyncComponent;
  }
}

export default (
  <Switch>
    <Route path="/" component={createComponent(Home)} exact />
    <Route path="/building" component={createComponent(Building)} />
    <Route path="/property" component={createComponent(Property)} />
    <Route path="/treasure" component={createComponent(Treasure)}  />
  </Switch>
);
