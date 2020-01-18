import React, { Component } from 'react';
import '../css/login.css';
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
    return (
      <div className="login-container">
        {/* <Menu/> */}
        {this.state.show ? (
          <div height="300" width="400" id="animationDOM" />
        ) : null}
        <div className={this.state.className} id="container">
          <div className="form-container sign-up-container">
            <div className="form-intro" >
              <h1>Create Account</h1>
              <div>
                <img src={require('../images/search.png')}></img>
              </div>
              <div className="login-form-container">
                <Form className="login-form">
                  <Form.Item>
                    {getFieldDecorator('username', {
                      rules: [
                        {
                          required: true, message: 'Please input your username!'
                        },
                        {
                          min: 6, message: 'Username must be more than 6 characters'
                        },
                        {
                          max: 32, message: 'Username must smaller than 32 characters'
                        }
                      ]
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('reEmail', {
                      rules: [
                        {
                          required: true, message: 'Please input your email!'
                        },
                        { pattern: emailRegex, message: 'Please input correct email type' },
                      ]
                    })(
                      <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('rePassword', {
                      rules: [
                        { required: true, message: 'Please input your password!' },
                        { pattern: passwordRegex, message: 'Please input correct password type' },
                      ],

                    })(
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                      />,
                    )}
                  </Form.Item>
                  <button className="btn-sign-up" onClick={this.handleSignUpSubmit}>Register</button>
                </Form>
              </div>
            </div>
          </div>
          <div className="form-container sign-in-container">
            <div className="form-intro">
              <h1>Sign in</h1>
              <div>
                <img src={require('../images/search.png')}></img>
              </div>
              <div className="login-form-container">
                <Form className="login-form">
                  <Form.Item>
                    {getFieldDecorator('logEmail', {
                      rules: [
                        {
                          required: true, message: 'Please input your username!'
                        },
                        {
                          min: 6, message: 'Username must be more than 6 characters'
                        },
                        {
                          max: 32, message: 'Username must smaller than 32 characters'
                        }
                      ],
                    })(
                      <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('logPassword', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <p className="login-form-forgot" href="" onClick={this.showModal}>
                      Forgot your email or password?
                  </p>
                  </Form.Item>
                  <button className="btn-sign-in" onClick={this.handleSignInSubmit}>Sign In</button>
                </Form>
              </div>
            </div>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="intro-title-1">Welcome Back!</h1>
                <p className="text-intro">To keep connected with us please login with your personal info</p>
                <button className="ghost btn-sign-up" id="signIn" onClick={this.handleSignInClick}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="intro-title-2">Hello, Friend!</h1>
                <p className="text-intro">Enter your personal details and start journey with us</p>
                <button className="ghost btn-sign-in" id="signUp" onClick={this.handleSignInClick} >Register</button>
              </div>
            </div>
          </div>
            <Modal
              title="Enter your email to get new password"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Form className="login-form">
                <Form.Item>
                  {getFieldDecorator('resetEmail', {
                    rules: [{ required: true, message: 'Please input your email!' }],
                  })(
                    <Input
                      prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="text"
                      placeholder="example abc@gmail.com"
                    />,
                  )}
                  <div className="forgot-message">
                    <p>{this.props.forgotMessage}</p>
                  </div>
                </Form.Item>
              </Form>
            </Modal>
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