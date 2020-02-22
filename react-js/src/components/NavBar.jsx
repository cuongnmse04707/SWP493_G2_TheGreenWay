import React, { Component } from "react";
import { Icon, Dropdown, Menu, Modal } from "antd";
import "antd/dist/antd.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import HomePageTypes from "../redux/home-page-redux";
class NavBar extends Component {
  state = {
    userName: "",
    urlAvatar: "",
    visibleLogout: false
  };

  componentDidMount() {
    const token = window.localStorage.getItem("x-access-token");
    if (token) {
      this.props.getUserInfor();
    }
  }

  componentDidUpdate(nextProps) {
    if (
      this.props.userInformation &&
      nextProps.userInformation !== this.props.userInformation
    ) {
      // console.log(this.props.userInformation);
      // console.log(this.props.userInformation.username);
      window.localStorage.setItem(
        "abc",
        JSON.stringify(this.props.userInformation)
      );
      this.setState({
        userName: this.props.userInformation.username,
        urlAvatar: this.props.userInformation.urlAvatar
      });
    }
  }

  toLogin = () => {
    this.props.history.push("/login");
  };

  handleLogoutCancel = e => {
    this.setState({
      visibleLogout: false
    });
  };

  handleLogoutOk = e => {
    window.localStorage.clear();
    window.location.href = "/";
  };

  showLogoutModal = () => {
    this.setState({
      visibleLogout: true
    });
  };

  showModalAccount = () => {
    this.props.history.push("/account");
  };

  toHomePage = () => {
    this.props.history.push("/");
  };

  render() {
    const token = window.localStorage.getItem("x-access-token");
    const abc = window.localStorage.getItem("abc");
    console.log("-----");
    console.log(abc);
    //menu dropdown
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a onClick={this.showModalAccount}>Thông tin tài khoản</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a onClick={this.showLogoutModal}>Đăng xuất</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-dark fixed-top"
          id="mainNav"
        >
          <div className="container navbar-container">
            <div onClick={this.toHomePage} className="nav-logo-container">
              <img
                style={{ width: "175px", height: "58px", cursor: "pointer" }}
                src={require("../images/logo-1.png")}
                alt=""
              />
              {/* <a
                className="navbar-brand js-scroll-trigger"
                style={{ color: "green" }}
              >
                The Green Way
              </a> */}
            </div>
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              Menu
              <i className="fa fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav text-uppercase ml-auto">
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#services">
                    Sản Phẩm
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#portfolio">
                    Cách sống
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#contact">
                    Liên hệ
                  </a>
                </li>
                {token ? (
                  <div className="header-left">
                    <li className="nav-item user-name">
                      <img
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%"
                        }}
                        src={this.props.userInformation.urlAvatar}
                        // alt=""
                      />
                      <Dropdown
                        style={{ width: "500px" }}
                        overlay={menu}
                        trigger={["click"]}
                      >
                        <a
                          style={{
                            color: "#000 !important",
                            fontSize: "16px",
                            marginLeft: "10px"
                          }}
                          className="ant-dropdown-link"
                          href="#"
                        >
                          {this.state.userName} <Icon type="down" />
                        </a>
                      </Dropdown>
                    </li>
                  </div>
                ) : (
                  <li className="nav-item">
                    <a
                      className="nav-link js-scroll-trigger"
                      onClick={this.toLogin}
                    >
                      Đăng nhập/Đăng ký
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <Modal
              visible={this.state.visibleLogout}
              onOk={this.handleLogoutOk}
              onCancel={this.handleLogoutCancel}
            >
              <p>Bạn có thực sự muốn đăng xuất không?</p>
            </Modal>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInformation: state.homePage.userInformation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserInfor: () => {
      dispatch(HomePageTypes.getInforRequest());
    }
  };
};

NavBar = withRouter(NavBar);
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
