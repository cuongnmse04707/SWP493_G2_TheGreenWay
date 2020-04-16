import React, { Component } from "react";
import "../../css/profile/edit-profile.css";
import { connect } from "react-redux";
import HomePageTypes from "../../redux/home-page-redux";
import EditTypes from "../../redux/edit-profile";
import ChangePassTypes from "../../redux/change-password-redux";
import LayoutProfile from "../../layout/LayoutProfile";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Modal,
  Progress,
  message,
  Row,
  Col,
} from "antd";
import { storage } from "../../firebase";
import moment from "moment";
import { Redirect } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const dateFormat = "YYYY/MM/DD";
const phoneRegex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;
const userNameRegex = /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i;
const addressRegex = /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i;

class EditProfile extends Component {
  state = {
    email: "",
    visibleAccountInfor: false,
    userName: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    phone: "",
    DOB: moment(new Date()).format("YYYY/MM/DD"),
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
    loading: false,
  };

  componentDidMount() {
    this.props.getUserInfor();
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({
        progressClass: "ml-2",
      });
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        (error) => {},
        () => {
          if (this.state.progress === 100) {
            setTimeout(() => {
              this.setState({
                progressClass: "ml-2 progress-bar",
              });
            }, 1000);
          }
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              this.setState({ url });
            });
        }
      );
    }
  };

  handleUpload = () => {
    if (this.state.url) {
      this.props.changeAvatar({
        urlAvatar: this.state.url,
      });
    } else {
      message.error("Vui lòng chọn ảnh");
    }
  };

  handleUpdateAccountSubmit = (e) => {
    e.stopPropagation();
    this.props.form.validateFieldsAndScroll(
      [
        "username",
        "phone",
        "email",
        "DOB",
        "city",
        "address",
        "country",
        "password",
      ],
      (err, values) => {
        if (!err) {
          if (values.DOB) {
            values.DOB = values.DOB.format("YYYY-MM-DD");
          }
          this.props.editUserProfile({
            email: values.email,
            username: values.username.replace(/\s+/g, " ").trim(),
            phone: values.phone,
            DOB: values.DOB,
            city: values.city,
            address: values.address,
            country: values.country,
          });
        }
      }
    );
  };

  clickImage(e) {
    document.querySelector("#profileImage").click();
  }

  changeImage = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        document
          .querySelector("#profileDisplay")
          .setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              this.setState({ url });
            });
        }
      );
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userInformation } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 23 },
        sm: { span: 23 },
        md: { span: 23 },
        lg: { span: 14 },
      },
    };
    return (
      <div className="edit-profile-wrapper">
        <div className="edit-container">
          <div className="edit-form">
            <div className="edit-form-right">
              <div className="information-form" style={{ marginTop: "" }}>
                <Form {...formItemLayout} className="mt-4">
                  <Form.Item label="E-mail">
                    {getFieldDecorator("email", {
                      initialValue: userInformation.email,
                    })(<Input disabled={true} />)}
                  </Form.Item>
                  <Form.Item label="Tên Tài Khoản">
                    {getFieldDecorator("username", {
                      initialValue: userInformation.username,
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập tên người dùng",
                        },
                        {
                          min: 6,
                          message: "Tên người dùng phải dài ít nhất 6 kí tự",
                        },
                        {
                          max: 32,
                          message: "Tên người dùng không dài quá 32 kí tự",
                        },
                        {
                          pattern: userNameRegex,
                          message:
                            "Tên người dùng không được chưa kí tự đặc biệt và số",
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Số Điện Thoại">
                    {getFieldDecorator("phone", {
                      initialValue: userInformation.phone,
                      rules: [
                        {
                          pattern: phoneRegex,
                          message: "Nhập đúng định dạng số điện thoại",
                        },
                      ],
                    })(<Input style={{ width: "100%" }} />)}
                  </Form.Item>
                  <Form.Item label="Địa chỉ">
                    {getFieldDecorator("address", {
                      initialValue: userInformation.address,
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Thành Phố">
                    {getFieldDecorator("city", {
                      initialValue: userInformation.city,
                      rules: [
                        {
                          pattern: addressRegex,
                          message:
                            "Tên thành phố không chứa số hoặc kí tự đặc biệt",
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Quốc gia">
                    {getFieldDecorator("country", {
                      initialValue: userInformation.country,
                      rules: [
                        {
                          pattern: addressRegex,
                          message:
                            "Tên quốc gia không chứa số hoặc kí tự đặc biệt",
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Ngày sinh">
                    {getFieldDecorator("DOB", {
                      initialValue:
                        userInformation.DOB &&
                        userInformation.DOB !== "Invalid date"
                          ? moment(userInformation.DOB)
                          : null,
                    })(
                      <DatePicker
                        style={{ width: "100%" }}
                        disabledDate={(d) =>
                          !d ||
                          d.isAfter(new Date()) ||
                          d.isSameOrBefore("1900-01-01")
                        }
                        placeholder="Chọn ngày"
                        format={"DD/MM/YYYY"}
                      />
                    )}
                  </Form.Item>
                  <Row>
                    <Col span={6} offset={9}>
                      <Button
                        // className="edit-button"
                        type="primary"
                        onClick={this.handleUpdateAccountSubmit}
                        style={{ width: "100%", marginTop: "20px" }}
                      >
                        Cập nhật chỉnh sửa
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
        {/* </LayoutProfile> */}
        {/* <Footer /> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInformation: state.homePage.userInformation,
    notifyMessage: state.editProfile.notifyMessage,
    notifyPasswordMessage: state.changePass.notifyMessage,
    editMessage: state.editProfile.editMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfor: () => {
      dispatch(HomePageTypes.getInforRequest());
    },
    editUserProfile: (data) => {
      dispatch(EditTypes.editRequest(data));
    },
    changePass: (data) => {
      dispatch(ChangePassTypes.changeRequest(data));
    },
    changeAvatar: (data) => {
      dispatch(EditTypes.uploadRequest(data));
    },
    updateNotify: () => {
      dispatch(EditTypes.updateNotify());
    },
  };
};

const EditProfileScreen = Form.create()(EditProfile);
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
