import React, { Component } from 'react';
import '../css/login.css';
import { Form, Icon, Input, Modal, message } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import LoginTypes from '../redux/login-redux'
import { withRouter } from 'react-router'


const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;

class Login extends Component {
  state = {
    className: 'container',
    visible: false,
    processing: true,
    show: true,
    username: '',
    reEmail: '',
    rePassword: '',
    logEmail: '',
    logPassword: ''
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
        this.props.form.resetFields()
      }
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentDidUpdate() {
    //if login succeed => redirect to homepage
    if (this.props.loginSuccess) {
      this.props.history.push('/home')
    }

    if(this.props.notifyMessage == 'Register is Success') {
      this.props.updateNotify()
      this.setState({
        className: 'container'
      })
    }

    if(this.props.notifyMessage == `We'll send instructions to this email if it's associated with a account.`) {
      this.props.updateNotify()
      this.setState({
        visible: false
      })
    }

  }

   handleSignUpSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(['username', 'reEmail', 'rePassword'], (err, values) => {
      if (!err) {
        this.props.userRegister({
          //username: values.username,
          email: values.reEmail,
          password: values.rePassword,
        })
        this.props.form.resetFields()
      }
    }).then(() => {
      console.log('123')
    })
  };

  handleSignInSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(['logEmail', 'logPassword'], (err, values) => {
      if (!err) {
        this.props.userLogin({
          email: values.logEmail,
          password: values.logPassword,
        })
        this.props.form.resetFields()
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
              <div className="logo-container">
                <img src={require('../images/search.png')}></img>
              </div>
              <div className="login-form-container">
                <Form className="login-form">
                  <Form.Item>
                    {getFieldDecorator('username', {
                      initialValue: this.state.username,
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
                      initialValue: this.state.reEmail,
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
                      initialValue: this.state.rePassword,
                      rules: [
                        { required: true, message: 'Please input your password!' },
                        // { pattern: passwordRegex, message: 'Please input correct password type' },
                      ],

                    })(
                      <Input.Password
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
              <div className="logo-container">
                <img src={require('../images/search.png')}></img>
              </div>
              <div className="login-form-container">
                <Form className="login-form">
                  <Form.Item>
                    {getFieldDecorator('logEmail', {
                      initialValue: this.state.logEmail,
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
                      initialValue: this.state.logPassword,
                      rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                      <Input.Password
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
                {/* <div className="forgot-message">
                  <p>{this.props.forgotMessage}</p>
                </div> */}
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
    forgotMessage: state.userLogin.forgotMessage,
    loginSuccess: state.userLogin.loginSuccess,
    registerSuccess: state.userLogin.registerSuccess,
    forgotSuccess: state.userLogin.forgotSuccess,
    notifyMessage : state.userLogin.notifyMessage
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
    },
    updateNotify: () => {
      dispatch(LoginTypes.updateNotify())
    }
  }
}

Login = withRouter(Login)
const LoginScreen = Form.create()(Login)
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)