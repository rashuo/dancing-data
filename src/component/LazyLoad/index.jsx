import React from 'react';
import PropTypes from 'prop-types';

export default class LazyLoad extends React.Component {
  
  static propTypes = {
    load: PropTypes.any,
    children: PropTypes.any,
  }

  state = {
    component: null,
  }

  componentWillMount() {
    this.lazyload(this.props.load);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.lazyload(nextProps.load);
    }
  }

  lazyload(load) {
    this.setState({
      component: null,
    })
    load((component) => {
      this.setState({
        component: component.default || component,
      })
    })
  }
  
  render() {
    return this.props.children(this.state.component);
  }
}
