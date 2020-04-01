import React, { Component } from "react";
import "../css/confirm-payment.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import ConvensionTypes from "../redux/paper-conversion-redux";
import OrderCartTypes from "../redux/order-card-redux";
import queryString from "query-string";
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
  Select
} from "antd";
const { Option } = Select;
const { TextArea } = Input;

var moment = require("moment");

class ConfirmPayment extends Component {
  state = {
    totalCash: 0,
    paymentOption: "",
    remainingAmout: 0,
    QuantityPaper: 0
  };

  componentDidMount = () => {
    const dataId = queryString.parse(this.props.history.location.search);
    console.log("HH", dataId.token);
    console.log("HH", dataId.idOrder);
    this.props.getPaperConvension();
    const cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    let total = 0;
    cart.map(e => {
      total = total + e.ProductPrice * e.quatityBuy;
    });
    this.setState({
      totalCash: total,
      remainingAmout: total
    });
  };

  onPaperChange = value => {
    console.log(value);
    this.setState({
      QuantityPaper: value
    });
    console.log(this.props.convensionRate);
    const sotienthieu =
      this.state.totalCash - value * this.props.convensionRate;
    this.setState({
      remainingAmout: this.state.totalCash - value * this.props.convensionRate
    });
    console.log(this.state.totalCash - value * this.props.convensionRate);
  };

  handleSelectChange = value => {
    console.log(`selected ${value}`);
  };

  handleOptionChange = value => {
    this.setState({
      paymentOption: value
    });
  };

  orderSuccess = () => {
    const token = window.localStorage.getItem("x-access-token");
    if (token) {
      this.props.form.validateFieldsAndScroll(
        ["address", "paymentOption"],
        (err, fieldsValues) => {
          if (!err) {
            var totalPaper = Math.floor(
              this.state.totalCash / this.props.convensionRate
            );
            var totalMoney = this.state.totalCash;
            var cash = 0;
            var check = this.state.paymentOption;
            const cart = JSON.parse(window.localStorage.getItem("cart"));
            if (check === "1") {
              totalPaper = 0;
              cash = totalMoney;
            }
            if (this.state.paymentOption === "2") {
            }
            if (this.state.paymentOption === "3") {
              totalPaper = this.state.QuantityPaper;
              cash = this.state.remainingAmout;
            }
            const params = {
              PaymentID: fieldsValues.paymentOption,
              ConversionID: this.props.convensionId,
              TotalPrice: totalMoney,
              ShipAddress: fieldsValues.address,
              CreateDate: moment().format("YYYY-MM-DD"),
              QuantityPaper: totalPaper,
              Cash: cash,
              cart: cart.map(ele => ({
                ProductName: ele.ProductName,
                id: ele.ProductID,
                quatity: ele.Quantity,
                price: ele.ProductPrice,
                quatityBuy: ele.quatityBuy
              }))
            };
            this.props.sendOrderCart({
              params,
              method: "user",
              callbackA: () => {
                window.localStorage.removeItem("cart");
                this.props.history.push("/order-success");
              }
            });
          }
        }
      );
    } else {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          var totalPaper = Math.floor(
            this.state.totalCash / this.props.convensionRate
          );
          var totalMoney = this.state.totalCash;
          var cash = 0;
          var check = this.state.paymentOption;
          const cart = JSON.parse(window.localStorage.getItem("cart"));
          if (check === "1") {
            totalPaper = 0;
            cash = totalMoney;
          }
          if (this.state.paymentOption === "2") {
          }
          if (this.state.paymentOption === "3") {
            totalPaper = this.state.QuantityPaper;
            cash = this.state.remainingAmout;
          }
          const params = {
            Name: values.fullname,
            Phone: values.phone,
            Email: values.email,
            PaymentID: values.paymentOption,
            ConversionID: this.props.convensionId,
            TotalPrice: totalMoney,
            ShipAddress: values.address,
            CreateDate: moment().format("YYYY-MM-DD"),
            QuantityPaper: totalPaper,
            Cash: cash,
            cart: cart.map(ele => ({
              ProductName: ele.ProductName,
              id: ele.ProductID,
              quatity: ele.Quantity,
              price: ele.ProductPrice,
              quatityBuy: ele.quatityBuy
            }))
          };
          this.props.sendOrderCart({
            params,
            method: "guest",
            callbackA: token => {
              //
              console.log(token);
              window.localStorage.removeItem("cart");
              this.props.history.push("/order-success");
            }
          });
        }
      });
    }
  };

  //http://localhost:3000/order-detail/order?idOrder=6
  //http://localhost:3000/order-detail/order?token=6
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
    const token = window.localStorage.getItem("x-access-token");
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    const { totalCash } = this.state;
    const { convensionRate } = this.props;
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
                      {getFieldDecorator("phone", {
                        initialValue: this.props.userInformation.phone
                      })(<Input />)}
                    </Form.Item>

                    <Form.Item label="Nhập địa chỉ giao hàng:">
                      {getFieldDecorator("address", {
                        initialValue: this.props.userInformation.address
                      })(<TextArea rows={4} />)}
                    </Form.Item>
                    <Form.Item label="Lựa chọn phương thức thanh toán">
                      {getFieldDecorator("paymentOption", {
                        initialValue: "1"
                      })(
                        <Select style={{ width: 200 }} {...this.props}>
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
                        rules: [
                          {
                            required: true,
                            message: "Vui lòng nhập tên người dùng"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Số điện thoại">
                      {getFieldDecorator("phone", {
                        rules: [
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại người dùng"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Email">
                      {getFieldDecorator("email", {
                        rules: [
                          {
                            required: true,
                            message:
                              "Vui lòng địa chỉ email của bạn muốn giao hàng"
                          }
                        ]
                      })(<Input style={{ width: "100%" }} />)}
                    </Form.Item>
                    <Form.Item label="Quận/Huyện/Thị xã">
                      {getFieldDecorator("city1", {})(<Input />)}
                    </Form.Item>
                    <Form.Item label="Xã">
                      {getFieldDecorator("city2", {})(<Input />)}
                    </Form.Item>
                    <Form.Item label="Địa chỉ">
                      {getFieldDecorator("address", {
                        rules: [
                          {
                            required: true,
                            message: "Vui lòng địa chỉ muốn giao hàng"
                          }
                        ]
                      })(<TextArea rows={4} />)}
                    </Form.Item>
                    <Form.Item label="Lựa chọn phương thức thanh toán">
                      {getFieldDecorator("paymentOption", {
                        initialValue: "1"
                      })(
                        <Select {...this.props} style={{ width: 200 }}>
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
                <div className="text-bill-detail-container">
                  {(cart || []).map((item, index) => {
                    return (
                      <div className="text-bill-detail" key={index}>
                        <span style={{ flex: "5", marginRight: "15px" }}>
                          {item.ProductName}
                        </span>
                        <span style={{ fontWeight: "bold", flex: "1" }}>
                          {item.quatityBuy}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="text-bill-total-money">
                  <span>Tổng số tiền</span>
                  <span style={{ fontWeight: "bold" }}>
                    {this.state.totalCash}VNĐ
                  </span>
                </div>
                <div className="text-bill-detail">
                  <span>Tổng số giấy</span>
                  <span style={{ fontWeight: "bold" }}>
                    {Math.floor(totalCash / convensionRate)} Kg
                  </span>
                </div>
                <div className="payment-option mt-3">
                  <span style={{ fontSize: "18px", marginBottom: "10px" }}>
                    Chọn hình thức thanh toán:
                  </span>
                  <Select
                    style={{ width: 200, marginBottom: "10px" }}
                    onChange={this.handleOptionChange}
                    defaultValue="1"
                  >
                    <Option value="1">Tiền</Option>
                    <Option value="2">Giấy</Option>
                    <Option value="3">Cả hai</Option>
                  </Select>
                  {this.state.paymentOption == 3 ? (
                    <div className="show-option-payment">
                      <div className="money-input mb-1">
                        <span>Nhập số kg giấy: </span>
                        <InputNumber
                          type="number"
                          min={0}
                          max={Math.floor(totalCash / convensionRate)}
                          // value={0}
                          placeholder="Nhập số kg giấy"
                          onChange={value => this.onPaperChange(value)}
                          style={{ width: "135px" }}
                        />
                      </div>
                      <div className="money-input">
                        <span>Số tiền còn thiếu: </span>
                        <InputNumber
                          readOnly
                          min={1}
                          value={this.state.remainingAmout}
                          disabled
                          style={{ width: "135px" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="show-option-payment"></div>
                  )}
                </div>
                <p className="change-shopping-cart">Thay đổi sản phẩm</p>
                <div className="button-check-out" onClick={this.orderSuccess}>
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
    convensionRate: state.convension.convensionRate,
    convensionId: state.convension.convensionId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPaperConvension: () => {
      dispatch(ConvensionTypes.getConvensionRequest());
    },
    sendOrderCart: params => {
      dispatch(OrderCartTypes.getOrderCartRequest(params));
    }
  };
};
const ConfirmPaymentScreen = Form.create()(ConfirmPayment);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmPaymentScreen);
