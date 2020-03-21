import React, { Component } from "react";
import "../css/shopping-cart.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { InputNumber, Modal, Select, Input } from "antd";

const { Option } = Select;

class ShoppingCart extends Component {
  state = {
    quantity: 1,
    visibleDelete: false,
    paymentOption: ""
  };

  getQuantity = value => {
    this.setState({
      quantity: value
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleOptionChange = value => {
    this.setState({
      paymentOption: value
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="cart-wrapper">
          <div className="payment-infor">
            <div className="list-item-infor">
              <table className="list-item-table">
                <thead className="table-header">
                  <tr>
                    <th>
                      <span className="ml-3">Tên sản phẩm</span>
                    </th>
                    <th>
                      <span>Giá tiền</span>
                    </th>
                    <th>
                      <span>Số lượng</span>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <tr>
                    <td>
                      <img
                        style={{ height: "128px", width: "128px" }}
                        src={require("../images/product-b.jpg")}
                        alt=""
                      />
                      <span style={{ fontSize: "18px", marginLeft: "5%" }}>
                        Sen đá
                      </span>
                    </td>
                    <td>
                      <span>$300</span>
                      <span className="mr-2 ml-2">|</span>
                      <span>4kg</span>
                    </td>
                    <td>
                      <InputNumber
                        min={1}
                        defaultValue={this.state.quantity}
                        onChange={this.getQuantity}
                      />
                    </td>
                    <td>
                      <img
                        onClick={this.showModal}
                        style={{ cursor: "pointer", width: "25px" }}
                        src={require("../images/svgIcon/delete.svg")}
                        alt=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        style={{ height: "128px", width: "128px" }}
                        src={require("../images/product-c.jpg")}
                        alt=""
                      />
                      <span style={{ fontSize: "18px", marginLeft: "5%" }}>
                        Sen đá
                      </span>
                    </td>
                    <td>
                      <span>$300</span>
                      <span className="mr-2 ml-2">|</span>
                      <span>4kg</span>
                    </td>
                    <td>
                      <InputNumber
                        min={1}
                        defaultValue={this.state.quantity}
                        onChange={this.getQuantity}
                      />
                    </td>
                    <td>
                      <img
                        onClick={this.showModal}
                        style={{ cursor: "pointer" }}
                        src={require("../images/delete.png")}
                        alt=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        style={{ height: "128px", width: "128px" }}
                        src={require("../images/product-5.jpg")}
                        alt=""
                      />
                      <span style={{ fontSize: "18px", marginLeft: "5%" }}>
                        Sen đá
                      </span>
                    </td>
                    <td>
                      <span>$300</span>
                      <span className="mr-2 ml-2">|</span>
                      <span>4kg</span>
                    </td>
                    <td>
                      <InputNumber
                        min={1}
                        defaultValue={this.state.quantity}
                        onChange={this.getQuantity}
                      />
                    </td>
                    <td>
                      <img
                        onClick={this.showModal}
                        style={{ cursor: "pointer" }}
                        src={require("../images/delete.png")}
                        alt=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        style={{ height: "128px", width: "128px" }}
                        src={require("../images/product-f.jpg")}
                        alt=""
                      />
                      <span style={{ fontSize: "18px", marginLeft: "5%" }}>
                        Sen đá
                      </span>
                    </td>
                    <td>
                      <span>$300</span>
                      <span className="mr-2 ml-2">|</span>
                      <span>4kg</span>
                    </td>
                    <td>
                      <InputNumber
                        min={1}
                        defaultValue={this.state.quantity}
                        onChange={this.getQuantity}
                      />
                    </td>
                    <td>
                      <img
                        onClick={this.showModal}
                        style={{ cursor: "pointer" }}
                        src={require("../images/delete.png")}
                        alt=""
                      />
                    </td>
                  </tr>
                  <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    <p>Xóa sản phẩm khỏi giỏ hàng?</p>
                  </Modal>
                </tbody>
              </table>
            </div>
            <div className="total-money">
              <div className="total-money-card">
                <p className="text-bill">Chi tiết hóa đơn:</p>
                {this.state.paymentOption == "2" ? (
                  <div className="text-total-money-disable">
                    <span>Tổng số tiền</span>
                    <span style={{ fontWeight: "bold" }}>3000đ</span>
                  </div>
                ) : (
                  <div className="text-total-money">
                    <span>Tổng số tiền</span>
                    <span style={{ fontWeight: "bold" }}>3000đ</span>
                  </div>
                )}
                {this.state.paymentOption == "1" ? (
                  <div className="text-total-money-disable">
                    <span>Tổng số giấy</span>
                    <span style={{ fontWeight: "bold" }}>5kg</span>
                  </div>
                ) : (
                  <div className="text-total-money">
                    <span>Tổng số giấy</span>
                    <span style={{ fontWeight: "bold" }}>5kg</span>
                  </div>
                )}
                <div className="payment-option mt-3">
                  <span style={{ fontSize: "18px", marginBottom: "10px" }}>
                    Chọn hình thức thanh toán:
                  </span>
                  <Select
                    style={{ width: 120, marginBottom: "10px" }}
                    onChange={this.handleOptionChange}
                  >
                    <Option value="1">Tiền</Option>
                    <Option value="2">Giấy</Option>
                    <Option value="3">Cả hai</Option>
                  </Select>
                  {this.state.paymentOption == 3 ? (
                    <div className="show-option-payment">
                      <div className="money-input mb-1">
                        <span>Nhập số kg giấy: </span>
                        <InputNumber min={1} max={10} defaultValue={3} />
                      </div>
                      <div className="money-input">
                        <span>Số tiền còn thiếu: </span>
                        <InputNumber
                          readOnly
                          min={1}
                          max={10}
                          defaultValue={3}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="show-option-payment"></div>
                  )}
                </div>
                <div className="button-check-out">
                  <span>Tiến hành thanh toán </span>
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

export default ShoppingCart;
