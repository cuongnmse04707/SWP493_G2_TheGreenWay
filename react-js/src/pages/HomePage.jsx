import React, { Component } from 'react';
import '../css/home.css';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import LoginTypes from '../redux/login-redux'
import { withRouter } from 'react-router'
import { Form, Input, Icon, Select, Button, Modal, DatePicker, Collapse, Dropdown, Menu, Avatar, message } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';
const phoneRegex = /(09|03|01[2|6|8|9])+([0-9]{8})\b/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;

class HomePage extends Component {
  state = {
    userEmail: '',
    visibleAccountInfor: false,
    visibleChangePass: false,
    changePass: false,
    userName: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    phone: '',
    DOB: null,
    address: '',
    city: '',
    country: '',
    avartarUrl: '',
    dataTest: '',
  }

  showModalAccount = () => {
    this.setState({
      visibleAccountInfor: true,
    });
  };

  showModalPassword = () => {
    this.setState({
      visibleChangePass: true,
    });
  };

  handleCancelAccount = e => {
    this.setState({
      visibleAccountInfor: false,
    });
  };

  handleCancelChangePass = () => {
    this.setState({
      visibleChangePass: false
    })
  }

  clearStorage() {
    window.localStorage.clear()
    window.location.href = '/'
  }

  getData = async (roomChat) => {
    try {
      const result = await fetch(`http://localhost:3001/demogetdata/friends`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': window.localStorage.getItem("x-access-token"),
        },
      }).then((res) => { return res.json(); })
      console.log(result); // data tra ve
      this.setState({
        dataTest: result
      })
      window.alert(result[1].name)
    } catch (error) {
      window.alert(error.message);
    }
  };

  handleUpdateAccountSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['username', 'phone', 'email', 'DOB', 'city', 'address', 'country', 'password'], (err, fieldsValues) => {
      if (!err) {
        if (fieldsValues.DOB) {
          fieldsValues.DOB = fieldsValues.DOB.format('YYYY-MM-DD')
        }
        console.log('Account Information', fieldsValues);
        message.success('Update Account Successfully', 2)
        setTimeout(() => {
          this.setState({
            visibleAccountInfor : false
          })
        },2000)
      }
    });
  };

  handleChangePassSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['oldPassword', 'newPassword', 'confirmPassword'], (err, fieldsValues) => {
      if (!err) {
        console.log('Password Information', fieldsValues);
        message.success('Change Password Successfully', 2)
        setTimeout(() => {
          this.setState({
            visibleChangePass: false
          })
        },2000)
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  render() {
    const email = window.localStorage.getItem('email')
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
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
      <div className="home-page">
        <div className="home-page-header">
          <div className="header-left">
            <Avatar size={32} icon="user" className="ml-2" />
            <p>
              Welcome {email}
            </p>
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                Edit Profile <Icon type="down" />
              </a>
            </Dropdown>
          </div>
          <div className="header-right">
            <button className="btn-sign-up" onClick={this.getData}>Get Data</button>
            <button className="btn-sign-up" onClick={this.clearStorage}>Logout</button>
          </div>
        </div>
        <Modal
          title="Account Information"
          okButtonProps={{ style: { display: 'none' } }}
          visible={this.state.visibleAccountInfor}
          onCancel={this.handleCancelAccount}
          className="modal-profile"
        >
          <Form {...formItemLayout} onSubmit={this.handleUpdateAccountSubmit}>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                initialValue: email,

              })(<Input readOnly />)}
            </Form.Item>
            <Form.Item label="UserName">
              {getFieldDecorator('username', {
                initialValue: this.state.username,
                rules: [
                  {
                    required: true,
                    message: 'Please input your userName',
                  },
                ],

              })(<Input />)}
            </Form.Item>
            <Form.Item label="Phone Number">
              {getFieldDecorator('phone', {
                initialValue: this.state.phone,
                rules: [
                  { pattern: phoneRegex, message: 'Please input correct phone type' },
                ],
              })(<Input style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item label="Address">
              {getFieldDecorator('address', {
                initialValue: this.state.address,
              })(<Input />)}
            </Form.Item>
            <Form.Item label="City">
              {getFieldDecorator('city', {
                initialValue: this.state.city,
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Country">
              {getFieldDecorator('country', {
                initialValue: this.state.country,
              })(<Input />)}
            </Form.Item>
            <Form.Item label="DoB">
              {getFieldDecorator('DOB', {
                initialValue: this.state.DOB
              })(<DatePicker style={{ width: '100%' }} disabledDate={d => !d || d.isAfter(new Date) || d.isSameOrBefore("1900-01-01")} initialValue={this.state.DOB} format={dateFormat} />)}
            </Form.Item>
            <Button type="primary" onClick={this.handleUpdateAccountSubmit}>
              Edit profile
            </Button>
          </Form>
        </Modal>

        <Modal
          title="Change Password"
          okButtonProps={{ style: { display: 'none' } }}
          visible={this.state.visibleChangePass}
          onCancel={this.handleCancelChangePass}
          className="modal-password">
          <Form {...formItemLayout} onSubmit={this.handleChangePassSubmit}>
            <Form.Item {...formItemLayout} label="Old Password" hasFeedback>
              {getFieldDecorator('oldPassword', {
                initialValue: this.state.password,
                rules: [
                  {
                    required: true,
                    message: 'Please input your old password!',
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="New Password" hasFeedback>
              {getFieldDecorator('newPassword', {
                initialValue: this.state.newPassword,
                rules: [
                  {
                    required: true,
                    message: 'Please input your new password!',
                  },
                  { pattern: passwordRegex, message: 'Please input correct passsword type' },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirmPassword', {
                initialValue: this.state.confirmPassword,
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Button type="primary" className="ml-2" onClick={this.handleChangePassSubmit}>
              Change
              </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

HomePage = withRouter(HomePage)
const HomePageScreen = Form.create()(HomePage)
export default connect(mapStateToProps, mapDispatchToProps)(HomePageScreen)