import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import Routes from '@/routes';
import NavBar from '@/container/NavBar';

const { Header, Footer, Sider, Content } = Layout;

class PermissionGuard extends React.PureComponent {

  renderContent = () => {
    return Routes;
  }

  render() {
    return (
      <Layout>
        <Sider style={{ background: '#3ba0e9', color: '#fff', padding: '20px' }}><NavBar /></Sider>
        <Layout>
          <Header style={{ background: '#7dbcea', color: '#fff' }}>Header</Header>
          <Content>
            <main style={{ padding: '20px' }}>
              {this.renderContent()}
            </main>
          </Content>
          <Footer style={{ background: '#7dbcea', color: '#fff' }}>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default PermissionGuard;
