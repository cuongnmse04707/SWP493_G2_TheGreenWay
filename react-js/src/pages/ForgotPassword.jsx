import React, { Component } from 'react';
import '../css/forgot-password.css';
import Menu from '../components/Menu';
import { Form, Icon, Input, Modal } from 'antd';
import 'antd/dist/antd.css';
import Processing from '../components/Procressing'
import { connect } from 'react-redux'
import LoginTypes from '../redux/login-redux'
import { withRouter } from 'react-router'
import lottie from 'lottie-web';
import animationFile from '../components/jsonAnimation/process.json'


const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;

class Login extends Component {
  state = {
    className: 'container',
    visible: false,
    processing: true,
    show: true,
  }


  handleSignInClick = () => {

    if (this.state.className == 'container') {
      this.setState({
        className: 'container right-panel-active'
      })
    } else {
      this.setState({
        className: 'container'
      })
    }
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields(['resetEmail'], (err, values) => {
      if (!err) {
        this.props.forgotPassword({
          email: values.resetEmail
        })
      }
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  handleSignUpSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(['username', 'reEmail', 'rePassword'], (err, values) => {
      if (!err) {
        console.log('da vao day', values);
        this.setState({
          className: 'container'
        })
        this.props.userRegister({
          email: values.reEmail,
          password: values.rePassword
        })
      }
    });
  };

  handleSignInSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(['logEmail', 'logPassword'], (err, values) => {
      if (!err) {
        console.log(values);
        this.props.userLogin({
          logEmail: values.logEmail,
          logPassword: values.logPassword,
        })
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className="login-container">
        {/* <Menu/> */}
        {this.state.show ? (
          <div height="300" width="400" id="animationDOM" />
        ) : null}
        <div className={this.state.className} id="container">
          <div className="form-container sign-in-container">
            <div className="form-intro">
              <h1>Reset Password</h1>
              <div>
                <img src={require('../images/search.png')}></img>
              </div>
             <div className='forgot-form-container'>
             <Form className="login-form">
                <Form.Item {...formItemLayout} label="New Password">
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password',
                      },
                    ],
                  })(<Input placeholder="Please input password" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="Confirm Password">
                  {getFieldDecorator('nickname', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password',
                      },
                    ],
                  })(<Input placeholder="Please confirm password" />)}
                </Form.Item>
                <button className="btn-sign-in" >Reset</button>
              </Form>
             </div>
            </div>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <h1 className="intro-title-2">Hello, Friend!</h1>
                <p className="text-intro">Enter your personal details and start journey with us</p>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    errorCode: state.userLogin.errorCode,
    processing: state.userLogin.processing,
    forgotMessage: state.userLogin.forgotMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (userInfor) => {
      dispatch(LoginTypes.loginRequest(userInfor))
    },
    userRegister: (reInfor) => {
      dispatch(LoginTypes.signUpRequest(reInfor))
    },
    forgotPassword: (email) => {
      dispatch(LoginTypes.forgotRequest(email))
    }
  }
}

Login = withRouter(Login)
const LoginScreen = Form.create()(Login)
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)