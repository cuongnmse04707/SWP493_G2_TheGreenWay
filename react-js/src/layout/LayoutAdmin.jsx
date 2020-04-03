import React, { Component } from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import 'antd/dist/antd.css';
import '../css/layout-admin.css'
import { withRouter } from "react-router";
import NavBar from "../components/NavBar";
import UserInforList from '../pages/admin/UserInforList'
import ProductInforList from '../pages/admin/ProductInforList'
import CreateProduct from '../pages/admin/CreateProduct'
import PostInforList from '../pages/admin/PostInforList'
import CartInforList from '../pages/admin/CartInforList'
import queryString from "query-string";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class LayoutAdmin extends Component {

  state = {
    collapsed: false,
    selectedKey: '',
    showUserInfor: false,
    showProductInfor: false,
    showPostInfor: false,
    showCartInfor: false,
    showCreateProduct: false
  };

  componentDidMount() {
    const page = queryString.parse(this.props.history.location.search).page;
    // console.log(page)
    if (page === 'user-infor') {
      this.setState({
        selectedKey: 'userInfor',
        showUserInfor: true,
        showProductInfor: false,
        showPostInfor: false,
        showCartInfor: false,
        showCreateProduct: false
      });
    } else if (page === 'product-infor') {
      this.setState({
        selectedKey: 'inforProduct',
        showUserInfor: false,
        showProductInfor: true,
        showPostInfor: false,
        showCartInfor: false,
        showCreateProduct: false
      });
    } else if (page === 'post-infor') {
      this.setState({
        selectedKey: 'postInfor',
        showUserInfor: false,
        showProductInfor: false,
        showPostInfor: true,
        showCartInfor: false,
        showCreateProduct: false
      });
    } else if (page === 'cart-infor') {
      this.setState({
        selectedKey: 'cartInfor',
        showUserInfor: false,
        showProductInfor: false,
        showPostInfor: false,
        showCartInfor: true,
        showCreateProduct: false
      });
    }
    else if (page === 'create-product') {
      this.setState({
        selectedKey: 'createProduct',
        showUserInfor: false,
        showProductInfor: false,
        showPostInfor: false,
        showCartInfor: false,
        showCreateProduct: true
      });
    }

  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  toUserInfor = () => {
    this.setState({
      selectedKey: 'userInfor',
      showUserInfor: true,
      showProductInfor: false,
      showPostInfor: false,
      showCartInfor: false,
      showCreateProduct: false
    })
    this.props.history.push('/admin?page=user-infor')
  }

  toProductInfor = () => {
    this.setState({
      selectedKey: 'inforProduct',
      showUserInfor: false,
      showProductInfor: true,
      showPostInfor: false,
      showCartInfor: false,
      showCreateProduct: false
    })
    this.props.history.push('/admin?page=product-infor')
  }

  toCreateInfor = () => {
    this.setState({
      selectedKey: 'createProduct',
      showUserInfor: false,
      showProductInfor: false,
      showPostInfor: false,
      showCartInfor: false,
      showCreateProduct: true
    })
    this.props.history.push('/admin?page=create-product')
  }

  toPostInfor = () => {
    this.setState({
      selectedKey: 'postInfor',
      showUserInfor: false,
      showProductInfor: false,
      showPostInfor: true,
      showCartInfor: false,
      showCreateProduct: false
    })
    this.props.history.push('/admin?page=post-infor')
  }

  toCartInfor = () => {
    this.setState({
      selectedKey: 'cartInfor',
      showUserInfor: false,
      showProductInfor: false,
      showPostInfor: false,
      showCartInfor: true,
      showCreateProduct: false
    })
    this.props.history.push('/admin?page=cart-infor')
  }
  render() {
    const { selectedKey } = this.state
    return (
      <div>
        <NavBar />
        <div style={{ width: "100%", height: "82vh", marginTop: "81px" }}>
          <div className="admin-content-container">
            <div>
              <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
              </Button>
              <Menu
                selectedKeys={[`${selectedKey}`]}
                mode="inline"
                inlineCollapsed={this.state.collapsed}
              >
                <Menu.Item key="userInfor"
                  onClick={this.toUserInfor}>
                  <Icon type="pie-chart" />
                  <span>Quản lí người dùng</span>
                </Menu.Item>
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="mail" />
                      <span>Quản lí sản phẩm</span>
                    </span>
                  }
                >
                  <Menu.Item key="inforProduct" onClick={this.toProductInfor}>Thông tin sản phẩm</Menu.Item>
                  <Menu.Item key="createProduct" onClick={this.toCreateInfor}>Đăng sản phẩm</Menu.Item>
                </SubMenu>
                <Menu.Item key="postInfor"
                  onClick={this.toPostInfor}>
                  <Icon type="inbox" />
                  <span>Quản lí bài viết</span>
                </Menu.Item>
                <Menu.Item key="cartInfor"
                  onClick={this.toCartInfor}>
                  <Icon type="inbox" />
                  <span>Quản lí đơn hàng</span>
                </Menu.Item>
              </Menu>
            </div>
            <div className="component-container">
              {this.state.showUserInfor ? <UserInforList /> : null}
              {this.state.showProductInfor ? <ProductInforList /> : null}
              {this.state.showCreateProduct ? <CreateProduct /> : null}
              {this.state.showPostInfor ? <PostInforList /> : null}
              {this.state.showCartInfor ? <CartInforList /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LayoutAdmin);