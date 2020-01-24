import React, { Component } from 'react';
import '../css/forgot-password.css';
import { Form, Icon, Input, Modal } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import ForgotTypes from '../redux/forgot-password-redux'
import { withRouter } from 'react-router'

class ForgotPassword extends Component {
  state = {
    className: 'container',
    show: true,
  }

  componentDidUpdate() {
    if (this.props.notifyMessage == 'Reset Password Success!' || this.props.notifyMessage == `Account don't need to reset password`) {
      this.props.updateNotify()
      this.props.history.push('/')
    }
  }


  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  handleConfirmSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(['password', 'confirm'], (err, values) => {
      if (!err) {
        console.log(values);
        console.log(window.location.search.split('?')[1])
        console.log(window.location.search.split('?')[2])
        this.props.resetPassword({
          password: values.password,
          token: window.location.search.split('?')[1],
          email: window.location.search.split('?')[2],
        })
        this.props.form.resetFields()
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
        {this.state.show ? (
          <div height="300" width="400" id="animationDOM" />
        ) : null}
        <div className={this.state.className} id="container">
          <div className="form-container sign-in-container">
            <div className="form-intro">
              <h1>Reset Password</h1>
              <div className="logo-container">
                <img src={require('../images/search.png')}></img>
              </div>
              <div className='forgot-form-container'>
                <Form className="login-form">
                  <Form.Item {...formItemLayout} label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ],
                    })(<Input.Password />)}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
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
                  <button className="btn-sign-in" onClick={this.handleConfirmSubmit}>Reset</button>
                </Form>
              </div>
            </div>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <h1 className="intro-title-forgot">Hello, Friend!</h1>
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
  return {
    notifyMessage: state.forgotPassword.notifyMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (newPass) => {
      dispatch(ForgotTypes.resetRequest(newPass))
    },
    updateNotify: () => {
      dispatch(ForgotTypes.updateNotify())
    }
  }
}

ForgotPassword = withRouter(ForgotPassword)
const ForgotPasswordScreen = Form.create()(ForgotPassword)
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)