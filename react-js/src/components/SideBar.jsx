import React, { Component } from "react";
import { Layout, Menu, Button, message } from "antd";
import { connect } from "react-redux";
import userImage from "../images/account.png";
import passImage from "../images/lock.png";
import cartImage from "../images/shopping-cart.png";
import likeProductImage from "../images/like.png";
import { withRouter } from "react-router";
import { storage } from "../firebase";
import HomePageTypes from "../redux/home-page-redux";
import EditTypes from "../redux/edit-profile";
import ChangePassTypes from "../redux/change-password-redux";

const { Sider } = Layout;

class SideBar extends Component {
  state = {
    email: "",
    visibleAccountInfor: false,
    userName: "abcxyz",
    password: "",
    newPassword: "",
    confirmPassword: "",
    phone: "",
    DOB: null,
    address: "",
    city: "",
    country: "",
    avartarUrl: "",
    dataTest: "",
    image: null,
    url: "",
    roles: "",
    progress: 0,
    progressClass: "ml-2 progress-bar",
    visiblePassModal: false,
    loading: false
  };

  componentDidMount() {
    this.props.getUserInfor();
  }

  componentDidUpdate(nextProps) {
    if (
      this.props.userInformation &&
      nextProps.userInformation !== this.props.userInformation
    ) {
      this.setState({
        userName: this.props.userInformation.username,
        address: this.props.userInformation.address,
        city: this.props.userInformation.city,
        country: this.props.userInformation.country,
        password: this.props.userInformation.password,
        avartarUrl: this.props.userInformation.urlAvatar,
        email: this.props.userInformation.email,
        roles: this.props.userInformation.roles,
        DOB: this.props.userInformation.DOB,
        phone: this.props.userInformation.phone
      });
      if (this.state.DOB) {
        this.setState({
          DOB: this.state.DOB.slice(0, 10)
        });
      }
    }
    if (
      this.props.notifyPasswordMessage === "Change Password Of User Is Success!"
    ) {
      this.props.updateNotify();
      this.setState({
        visiblePassModal: false
      });
      window.location.href = "/account";
    }

    if (this.props.notifyMessage === "Save Information Of User Is Success!") {
      this.props.updateNotify();
      // setTimeout(() => {
      //   this.props.history.push("/");
      // }, 2000);
    }
  }

  handleLogOut = () => {
    window.localStorage.removeItem("token");
    this.props.history.push("/");
  };
  clickImage(e) {
    document.querySelector("#profileImage").click();
  }
  changeImage = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      console.log(this.state);
      const reader = new FileReader();
      reader.onload = function(e) {
        document
          .querySelector("#profileDisplay")
          .setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files[0]);

      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              this.setState({ url });
            });
        }
      );
    }
  };

  handleUpload = () => {
    if (this.state.url) {
      this.props.changeAvatar({
        urlAvatar: this.state.url
      });
      console.log("da vao day");
      window.localStorage.setItem("abc", "a");
      window.localStorage.setItem("abc1", "a");
    } else {
      message.error("Vui lòng chọn ảnh");
    }
  };

  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        style={{ position: "fixed" }}
      >
        <div className="sideBar-container">
          <div className="logo" />
          <div
            // className="form-group text-center user-avatar"
            style={{ position: "relative", marginTop: "30px" }}
          >
            <span className="img-div">
              <div
                className="text-center img-placeholder"
                onClick={this.clickImage}
              >
                <p style={{ paddingTop: "85px" }}>
                  Ấn vào để thay đổi ảnh đại diện của bạn
                </p>
              </div>
              <img
                src={this.state.url || this.state.avartarUrl}
                onClick={this.clickImage}
                id="profileDisplay"
              />
            </span>
            <input
              type="file"
              name="profileImage"
              onChange={this.changeImage}
              id="profileImage"
              className="form-control"
              style={{ display: "none" }}
            />
          </div>
          <div className="user-information">
            <p>{this.state.userName}</p>
          </div>
          <div className="button-container">
            <button className="btn-upload" onClick={this.handleUpload}>
              Cập nhật ảnh đại diện
            </button>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[
              `/${this.props.location.pathname.split("/")[1]}`
            ]}
          >
            <Menu.Item
              key="/account"
              onClick={() => {
                this.props.history.push("/account");
              }}
            >
              <img
                src={require("../images/svgIcon/user.svg")}
                alt="aaa"
                style={{ height: "32px", width: "32px" }}
              />
              <span>Thông tin tài khoản</span>
            </Menu.Item>
            <Menu.Item
              key="/changepassword"
              onClick={() => {
                this.props.history.push("/changepassword");
              }}
            >
              <img
                src={require("../images/svgIcon/password.svg")}
                alt="aaa"
                style={{ height: "32px", width: "32px" }}
              />
              <span>Thay Đổi mật khẩu</span>
            </Menu.Item>
            <Menu.Item
              key="/changepassword1"
              onClick={() => {
                this.props.history.push("/changepassword");
              }}
            >
              <img
                src={require("../images/svgIcon/shopping-history.svg")}
                alt="aaa"
                style={{ height: "32px", width: "32px" }}
              />
              <span>Lịch sử mua hàng</span>
            </Menu.Item>
            <Menu.Item
              key="/changepassword2"
              onClick={() => {
                this.props.history.push("/changepassword");
              }}
            >
              <img
                src={require("../images/svgIcon/heart.svg")}
                alt="aaa"
                style={{ height: "32px", width: "32px" }}
              />
              <span>Sản phẩm đã thích</span>
            </Menu.Item>
          </Menu>
        </div>
      </Sider>
    );
  }
}

const mapStateToProps = state => ({
  collapsed: state.sideBar.collapsed,
  userInformation: state.homePage.userInformation,
  notifyMessage: state.editProfile.notifyMessage,
  notifyPasswordMessage: state.changePass.notifyMessage
});

const mapDispatchToProps = dispatch => {
  return {
    getUserInfor: () => {
      dispatch(HomePageTypes.getInforRequest());
    },
    editUserProfile: data => {
      dispatch(EditTypes.editRequest(data));
    },
    changePass: data => {
      dispatch(ChangePassTypes.changeRequest(data));
    },
    changeAvatar: data => {
      dispatch(EditTypes.uploadRequest(data));
    },
    updateNotify: () => {
      dispatch(EditTypes.updateNotify());
    }
  };
};
SideBar = withRouter(SideBar);

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
