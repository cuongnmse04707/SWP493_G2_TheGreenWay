import React, { Component } from 'react';
import '../../css/profile/change-password.css'
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import HomePageTypes from '../../redux/home-page-redux'
import ChangePassTypes from '../../redux/change-password-redux'
import { Form, Input, Button} from 'antd';


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;

class ChangePassword extends Component {
  state = {
    email: '',
    visibleAccountInfor: false,
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
    image: null,
    url: '',
    roles: '',
    progress: 0,
    progressClass: 'ml-2 progress-bar'
  }

  componentDidMount() {
    this.props.getUserInfor()
  }

  componentDidUpdate(nextProps) {
    if(this.props.notifyMessage === 'Change Password Of User Is Success!') {
      setTimeout(() => {
        this.props.history.push("/home")
      },2000)
    }
  }
  handleChangePassSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['oldPassword', 'newPassword', 'confirmPassword'], (err, fieldsValues) => {
      if (!err) {
        console.log('Password Information', fieldsValues);
        this.props.changePass({
          oldpassword: fieldsValues.oldPassword,
          newpassword: fieldsValues.newPassword
        })
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

    return (
      <div className="edit-container">
        <div className="edit-form">
          <div className="edit-form-right">
            <div className="information-form mt-4">
              <Form {...formItemLayout} onSubmit={this.handleChangePassSubmit}>
                <Form.Item {...formItemLayout} label="Old Password" hasFeedback>
                  {getFieldDecorator('oldPassword', {
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
                <Button type="primary" className="change-btn" onClick={this.handleChangePassSubmit}>
                  Change
              </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInformation: state.homePage.userInformation,
    notifyMessage: state.changePass.notifyMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfor: () => {
      dispatch(HomePageTypes.getInforRequest())
    },
    changePass: (data) => {
      dispatch(ChangePassTypes.changeRequest(data))
    },
    updateNotify: () => {
      dispatch(ChangePassTypes.updateNotify())
    }
  }
}


const ChangePasswordScreen = Form.create()(ChangePassword)
export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen)