import React, { Component, Fragment } from 'react'
//import HeaderComp from "../components/HeaderComp"
import SideBar from "../components/ProfileSideBar"
//import FooterComp from "../components/FooterComp"

import { connect } from "react-redux"
import 'antd/dist/antd.css'
import { Redirect } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

class LayoutComponent extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const token = window.localStorage.getItem('token')
    return (
      <Layout className="profile-layout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>

      // token ? (
        // <Layout>
        //   <SideBar></SideBar>
        //   <Layout
        //     // style={
        //     //   this.props.collapsed ? { marginLeft: '100px', transition: 'all 0.4s' } : { marginLeft: '200px', transition: 'all 0.4s' }
        //     // }
        //   >
        //     {/* <HeaderComp /> */}
        //     <Content style={{ height: '100vh' }}>
        //       {this.props.children}
        //     </Content>
        //     {/* <FooterComp /> */}
        //   </Layout>
        // </Layout>
      // ) : (
      //     <Redirect to='/' />
      //   )
    )
  }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, null)(LayoutComponent)