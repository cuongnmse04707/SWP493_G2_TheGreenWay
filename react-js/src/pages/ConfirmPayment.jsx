import React, { Component } from "react";
import "../css/confirm-payment.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import ConvensionTypes from "../redux/paper-conversion-redux";
import HomePageTypes from "../redux/home-page-redux";
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
  InputNumber,
  Select,
} from "antd";
const { Option } = Select;
const { TextArea } = Input;

class ConfirmPayment extends Component {
  state = {
  };

  handleSelectChange = (value) => {
    console.log(`selected ${value}`);
  }

  orderSuccess = () => {
    this.props.history.push('/order-success')
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 }
      },
      wrapperCol: {
        xs: { span: 23 },
        sm: { span: 23 },
        md: { span: 23 },
        lg: { span: 18 }
      }
    };
    const token = window.localStorage.getItem('x-access-token')
    console.log(this.props.userInformation)
    return (
      <div>
        <NavBar />
        <div className="cart-wrapper">
          <div className="payment-infor">
            <div className="customer-infor">
              <div className="confirm-title">
                <p>Cảm ơn quý khách đã mua sản phẩm của chúng tôi</p>
                <p>Vui lòng xác nhận các thông tin dưới đây:</p>
              </div>
              {token ? (
                <div>
                  <Form {...formItemLayout} className="mt-4">
                      <Form.Item label="Họ và tên">
                        {getFieldDecorator("fullname", {
                          initialValue: this.props.userInformation.username
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Số điện thoại">
                        {getFieldDecorator("username", {
                          initialValue: this.props.userInformation.phone
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Tỉnh/Thành Phố">
                        {getFieldDecorator("phone", {
                          initialValue: this.props.userInformation.address
                        })(<Input style={{ width: "100%" }} />)}
                      </Form.Item>
                      <Form.Item label="Quận/Huyện/Thị xã">
                        {getFieldDecorator("address", {
                          initialValue: this.props.userInformation.address
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Xã">
                        {getFieldDecorator("city", {
                          initialValue: this.props.userInformation.address
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Địa chỉ">
                        {getFieldDecorator("city", {
                          initialValue: this.props.userInformation.address
                        })(<TextArea rows={4} />)}
                      </Form.Item>
                      <Form.Item label="Lựa chọn phương thức thanh toán">
                        {getFieldDecorator("country", {
                          initialValue: this.state.country
                        })(
                          <Select defaultValue="lucy"
                            style={{ width: 200 }}
                            onChange={this.handleSelectChange}
                            placeholder="Chọn phương thức"
                          >
                            <Option value="1">Ship COD</Option>
                            <Option value="2">Chuyển Khoản</Option>
                          </Select>
                        )}
                      </Form.Item>
                    </Form>
                </div>
              ) : (
                  <div>
                    <Form {...formItemLayout} className="mt-4">
                      <Form.Item label="Họ và tên">
                        {getFieldDecorator("fullname", {
                          initialValue: this.state.email
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Số điện thoại">
                        {getFieldDecorator("username", {
                          initialValue: this.state.userName,
                          rules: [
                            {
                              required: true,
                              message: "Vui lòng nhập tên người dùng"
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Tỉnh/Thành Phố">
                        {getFieldDecorator("phone", {
                          initialValue: this.state.phone,
                        })(<Input style={{ width: "100%" }} />)}
                      </Form.Item>
                      <Form.Item label="Quận/Huyện/Thị xã">
                        {getFieldDecorator("address", {
                          initialValue: this.state.address
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Xã">
                        {getFieldDecorator("city", {
                          initialValue: this.state.city
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Địa chỉ">
                        {getFieldDecorator("city", {
                          initialValue: this.state.city
                        })(<TextArea rows={4} />)}
                      </Form.Item>
                      <Form.Item label="Lựa chọn phương thức thanh toán">
                        {getFieldDecorator("country", {
                          initialValue: this.state.country
                        })(
                          <Select defaultValue="lucy"
                            style={{ width: 200 }}
                            onChange={this.handleSelectChange}
                            placeholder="Chọn phương thức"
                          >
                            <Option value="1">Ship COD</Option>
                            <Option value="2">Chuyển Khoản</Option>
                          </Select>
                        )}
                      </Form.Item>
                    </Form>
                  </div>
                )}
            </div>
            <div className="bill-infor-wrapper">
              <div className="bill-infor-container">
                <p className="text-bill">Thông tin đơn hàng:</p>
                <div className="text-bill-detail-title">
                  <span>Sản phẩm</span>
                  <span>Số lượng</span>
                </div>
                <div className="text-bill-detail" >
                  <span style={{ flex: "5", marginRight: "15px" }}>Sen đá</span>
                  <span style={{ fontWeight: "bold", flex: "1" }}>
                    1
                    </span>
                </div>
                <div className="text-bill-detail" >
                  <span style={{ flex: "5", marginRight: "15px" }}>Xương rồng</span>
                  <span style={{ fontWeight: "bold", flex: "1" }}>
                    1
                    </span>
                </div>
                <div className="text-bill-detail" >
                  <span style={{ flex: "5", marginRight: "15px" }}>Cây vạn lộc</span>
                  <span style={{ fontWeight: "bold", flex: "1" }}>
                    1
                    </span>
                </div>
                <div className="text-bill-total-money">
                  <span>Tổng số tiền</span>
                  <span style={{ fontWeight: "bold" }}>10000VNĐ</span>
                </div>
                <div className="text-bill-detail">
                  <span>Tổng số giấy</span>
                  <span style={{ fontWeight: "bold" }}>50 Kg</span>
                </div>
                <p className="change-shopping-cart">Thay đổi sản phẩm</p>
                <div
                  className="button-check-out"
                  onClick= {this.orderSuccess}
                >
                  <span>Đặt hàng </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInformation: state.homePage.userInformation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};
const ConfirmPaymentScreen = Form.create()(ConfirmPayment);
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPaymentScreen);
