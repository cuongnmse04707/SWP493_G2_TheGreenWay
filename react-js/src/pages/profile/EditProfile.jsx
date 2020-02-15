import React, { Component } from 'react';
import '../../css/profile/edit-profile.css'
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import HomePageTypes from '../../redux/home-page-redux'
import EditTypes from '../../redux/edit-profile'
import ChangePassTypes from '../../redux/change-password-redux'
import { Form, Input, Button, DatePicker, Modal, Progress, message, Upload, Icon } from 'antd';
import { storage } from '../../firebase';
import moment from 'moment';
import { Redirect } from "react-router-dom";
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

const dateFormat = 'YYYY/MM/DD';
const phoneRegex = /(09|01[2|6|8|9])+([0-9]{8})\b/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;

class EditProfile extends Component {
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
    progressClass: 'ml-2 progress-bar',
    visiblePassModal: false,
    loading: false
  }

  componentDidMount() {
    this.props.getUserInfor()
  }

  componentDidUpdate(nextProps) {
    if (this.props.userInformation && nextProps.userInformation !== this.props.userInformation) {
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
      })
      if (this.state.DOB) {
        this.setState({
          DOB: this.state.DOB.slice(0, 10)
        })
      }
    }
    if (this.props.notifyPasswordMessage === 'Change Password Of User Is Success!') {
      this.props.updateNotify()
      this.setState({
        visiblePassModal: false
      })
      window.location.href = '/account'
    }

    if (this.props.notifyMessage === 'Save Information Of User Is Success!') {
      this.props.updateNotify()
      setTimeout(() => {
        this.props.history.push('/')
      }, 2000)
    }
  }

  showPasswordModal = () => {
    this.setState({
      visiblePassModal: true
    })
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

  handleChangePassCancel = e => {
    this.setState({
      visiblePassModal: false,
    });
  };


  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      console.log(image)
      // this.setState(() => ({ image }));
      // this.setState({
      //   url: image.name
      // })
      this.setState({
        progressClass: 'ml-2'
      })
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log(progress)
          this.setState({ progress });
        },
        (error) => {
          console.log(error);
        },
        () => {
          if (this.state.progress === 100) {
            setTimeout(() => {
              this.setState({
                progressClass: "ml-2 progress-bar"
              })
            }, 1000)
          }
          storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({ url });
          })
        });
    }

  }


  handleUpload = () => {
    // if (!this.state.image) {
    //   message.error('Please choose image to upload')
    // } else {
    //   this.setState({
    //     progressClass: 'ml-2'
    //   })
    //   const { image } = this.state;
    //   const uploadTask = storage.ref(`images/${image.name}`).put(image);
    //   uploadTask.on('state_changed',
    //     (snapshot) => {
    //       const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //       console.log(progress)
    //       this.setState({ progress });
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //     () => {
    //       if (this.state.progress === 100) {
    //         setTimeout(() => {
    //           this.setState({
    //             progressClass: "ml-2 progress-bar"
    //           })
    //         }, 1000)
    //       }
    //       storage.ref('images').child(image.name).getDownloadURL().then(url => {
    //         console.log(url);
    //         this.setState({ url });
    //       })
    //     });
    // }
    this.props.changeAvatar({
      urlAvatar: this.state.url
    })
  }

  handleUpdateAccountSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(['username', 'phone', 'email', 'DOB', 'city', 'address', 'country', 'password'], (err, values) => {
      if (!err) {
        if (values.DOB) {
          values.DOB = values.DOB.format('YYYY-MM-DD')
        }
        console.log(values)
        this.props.editUserProfile({
          email: values.email,
          username: values.username,
          phone: values.phone,
          DOB: values.DOB,
          city: values.city,
          address: values.address,
          country: values.country,
          // urlAvatar: this.state.url
        })
      }
    });
  };

  render() {
    const token = window.localStorage.getItem('x-access-token')
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

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      token ? (
        <div>
          <NavBar />
          <div className="edit-container">
            <div className="edit-form">
              <div className="edit-form-left">
                <div className="user-avatar">
                  <img className="user-avatar image" src={this.state.url || this.state.avartarUrl} alt="Uploaded images" />
                </div>
                <input type="file" onChange={this.handleChange} />
                <div className="button-container">
                  <button className="btn-sign-in" onClick={this.handleUpload}>Upload</button>
                </div>
                <br />
                <Progress style={{ width: '95%' }} className={this.state.progressClass} percent={this.state.progress} />
                <div className="user-information">
                  <p>{this.state.userName}</p>
                  <p>{this.state.email}</p>
                </div>
              </div>
              <div className="edit-form-right">
                <div className="information-form">
                  <Form {...formItemLayout} className="mt-4 mr-5" >
                    <Form.Item label="E-mail">
                      {getFieldDecorator('email', {
                        initialValue: this.state.email,
                      })(<Input readOnly />)}
                    </Form.Item>
                    <Form.Item label="UserName">
                      {getFieldDecorator('username', {
                        initialValue: this.state.userName,
                        rules: [
                          {
                            required: true,
                            message: 'Please input your userName',
                          },
                        ],
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Password">
                      {getFieldDecorator('password', {
                        initialValue: this.state.password,
                      })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                      <Button type="primary" onClick={this.showPasswordModal}>
                        Change Password
                    </Button>
                    </Form.Item>
                    <Form.Item label="Phone Number">
                      {getFieldDecorator('phone', {
                        initialValue: this.state.phone,
                        rules: [
                          { pattern: phoneRegex, message: 'Please input correct phone number type' },
                        ]
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
                        initialValue: moment(this.state.DOB, dateFormat)
                      })(<DatePicker style={{ width: '100%' }} disabledDate={d => !d || d.isAfter(new Date) || d.isSameOrBefore("1900-01-01")} format={dateFormat} />)}
                    </Form.Item>
                    <Button className="edit-button" type="primary" onClick={this.handleUpdateAccountSubmit}>
                      Edit profile
                    </Button>

                  </Form>
                </div>
              </div>
              <Modal
                title="Change Password"
                visible={this.state.visiblePassModal}
                onOk={this.handleChangePassSubmit}
                onCancel={this.handleChangePassCancel}
              >
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
                </Form>
              </Modal>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
          <Redirect to="/" />
        )
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInformation: state.homePage.userInformation,
    notifyMessage: state.editProfile.notifyMessage,
    notifyPasswordMessage: state.changePass.notifyMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfor: () => {
      dispatch(HomePageTypes.getInforRequest())
    },
    editUserProfile: (data) => {
      dispatch(EditTypes.editRequest(data))
    },
    changePass: (data) => {
      dispatch(ChangePassTypes.changeRequest(data))
    },
    changeAvatar: (data) => {
      dispatch(EditTypes.uploadRequest(data))
    },
    updateNotify: () => {
      dispatch(EditTypes.updateNotify())
    }
  }
}


const EditProfileScreen = Form.create()(EditProfile)
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)