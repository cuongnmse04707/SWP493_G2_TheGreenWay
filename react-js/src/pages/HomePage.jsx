import React, { Component } from "react";
import "../css/home.css";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import HomePageTypes from "../redux/home-page-redux";
import { withRouter, Router } from "react-router";
import {
  Form,
  Input,
  Icon,
  Button,
  Modal,
  DatePicker,
  Dropdown,
  Menu,
  Avatar,
  message
} from "antd";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import EditProfile from "./profile/EditProfile";

const dateFormat = "YYYY/MM/DD";
const phoneRegex = /(09|03|01[2|6|8|9])+([0-9]{8})\b/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;

class HomePage extends Component {
  state = {
    userEmail: "",
    visibleAccountInfor: false,
    visibleChangePass: false,
    changePass: false,
    userName: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    phone: "",
    DOB: null,
    address: "",
    city: "",
    country: "",
    avartarUrl: "",
    dataTest: ""
  };

  componentDidMount() {
    this.props.getUserInfor();
  }

  showModalAccount = () => {
    this.props.history.push("/account");
  };

  showModalPassword = () => {
    this.props.history.push("/changepassword");
  };

  handleCancelAccount = e => {
    this.setState({
      visibleAccountInfor: false
    });
  };

  handleCancelChangePass = () => {
    this.setState({
      visibleChangePass: false
    });
  };

  clearStorage() {
    window.localStorage.clear();
    window.location.href = "/";
  }

  handleUpdateAccountSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(
      [
        "username",
        "phone",
        "email",
        "DOB",
        "city",
        "address",
        "country",
        "password"
      ],
      (err, fieldsValues) => {
        if (!err) {
          if (fieldsValues.DOB) {
            fieldsValues.DOB = fieldsValues.DOB.format("YYYY-MM-DD");
          }
          console.log("Account Information", fieldsValues);
          message.success("Update Account Successfully", 2);
          setTimeout(() => {
            this.setState({
              visibleAccountInfor: false
            });
          }, 2000);
        }
      }
    );
  };

  handleChangePassSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(
      ["oldPassword", "newPassword", "confirmPassword"],
      (err, fieldsValues) => {
        if (!err) {
          console.log("Password Information", fieldsValues);
          message.success("Change Password Successfully", 2);
          setTimeout(() => {
            this.setState({
              visibleChangePass: false
            });
          }, 2000);
        }
      }
    );
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("newPassword")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    //menu dropdown
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a onClick={this.showModalAccount}>Account Information</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a onClick={this.showModalPassword}>Change Password</a>
        </Menu.Item>
      </Menu>
    );
    return (
      // <div>
      //   <EditProfile />

      //   {/* <Switch> */}
      //   {/* <Route exact path="/a" return/> */}
      //   <Route path="/about" component={EditProfile} />
      //   {/* </Switch> */}
      // </div>
      // <BrowserRouter>
      //   <Switch>
      <Router>
        <Route path="/account" component={EditProfile} exact />
      </Router>
      //   </Switch>
      // </BrowserRouter>
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

HomePage = withRouter(HomePage);
const HomePageScreen = Form.create()(HomePage);
export default connect(mapStateToProps, mapDispatchToProps)(HomePageScreen);
