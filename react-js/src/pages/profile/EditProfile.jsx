import React, { Component } from 'react';
import '../../css/profile/edit-profile.css'
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import HomePageTypes from '../../redux/home-page-redux'
import EditTypes from '../../redux/edit-profile'
import { Form, Input, Button, DatePicker, Progress,  message } from 'antd';
import { storage } from '../../firebase';
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';
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
    progressClass: 'ml-2 progress-bar'
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
      }, () => {
        console.log(this.state)
      })
      if(this.state.DOB) {
        this.setState({
          DOB: this.state.DOB.slice(0,10)
        })
      }
    }
    if(this.props.notifyMessage === 'Save Information Of User Is Success!') {
      this.props.updateNotify()
      setTimeout(() => {
        this.props.history.push('/')
      },2000)
    }
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      console.log(image)
      this.setState(() => ({ image }));
    }
  }
  handleUpload = () => {
    if (!this.state.image) {
      message.error('Please choose image to upload')
    } else {
      this.setState({
        progressClass: 'ml-2'
      })
      const { image } = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed',
        (snapshot) => {
          // progrss function ....
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log(progress)
          this.setState({ progress });
        },
        (error) => {
          // error function ....
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
          // complete function ....
          storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({ url });
          })
        });
    }
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
          urlAvatar: this.state.url
        })
      }
    });
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
          <div className="edit-form-left">
            <div className="user-avatar">
              {/* <img className="user-avatar image" src={require('../../images/edit-2.jpg')}></img> */}
              <img className="user-avatar image" src={this.state.url || this.state.avartarUrl} alt="Uploaded images" />
            </div>
            <input type="file" onChange={this.handleChange} />
            <div className="button-container">
              <button className="btn-sign-in" onClick={this.handleUpload}>Upload</button>
            </div>
            <br />
            <Progress style={{ width: '95%' }} className={this.state.progressClass} percent={this.state.progress} />
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
                <Form.Item label="Phone Number">
                  {getFieldDecorator('phone', {
                    initialValue: this.state.phone,
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
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInformation: state.homePage.userInformation,
    notifyMessage : state.editProfile.notifyMessage
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
    updateNotify: () => {
      dispatch(EditTypes.updateNotify())
    }
  }
}


const EditProfileScreen = Form.create()(EditProfile)
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)