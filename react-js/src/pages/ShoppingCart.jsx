import React, { Component } from "react";
import "../css/shopping-cart.css";
import { Table, Button } from "antd";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { InputNumber, Modal, Select, Input } from "antd";
import { connect } from "react-redux";
import ConvensionTypes from "../redux/paper-conversion-redux";
import HomePageTypes from "../redux/home-page-redux";

const { Option } = Select;

class ShoppingCart extends Component {
  state = {
    quantity: 1,
    visibleDelete: false,
    paymentOption: "",
    idRemove: "",
    totalCash: 0,
    remainingAmout: 0
  };

  componentDidMount = () => {
    const { convensionRate } = this.props;
    const cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    let total = 0;
    cart.map(e => {
      total = total + e.ProductPrice * e.quatityBuy;
    });
    this.setState({
      totalCash: total,
      remainingAmout: total
    });
    this.props.getPaperConvension();
    let numberOfTotal = 0;
    cart.map(e => (numberOfTotal = numberOfTotal + e.quatityBuy));
    this.props.setDataCart(numberOfTotal);
  };

  getQuantity = (elementItem, value) => {
    // Check san pham goi API o day
    const cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    const indexNumber = cart.findIndex(
      element => element.ProductID === elementItem.ProductID
    );
    cart[indexNumber].quatityBuy = value;
    localStorage.setItem("cart", JSON.stringify(cart));
    let total = 0;
    cart.map(e => {
      total = total + e.ProductPrice * e.quatityBuy;
    });
    let numberOfTotal = 0;
    cart.map(e => (numberOfTotal = numberOfTotal + e.quatityBuy));
    this.props.setDataCart(numberOfTotal);
    this.setState({
      quantity: value,
      totalCash: total
    });
  };

  showModal = ProductID => {
    this.setState({
      visible: true,
      idRemove: ProductID
    });
  };

  componentDidUpdate() {}

  handleOk = e => {
    // console.log(e);
    const { idRemove } = this.state;
    const cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    localStorage.setItem(
      "cart",
      JSON.stringify(cart.filter(element => element.ProductID !== idRemove))
    );
    let total = 0;
    cart
      .filter(element => element.ProductID !== idRemove)
      .map(e => {
        total = total + e.ProductPrice * e.quatityBuy;
      });
    let numberOfTotal = 0;
    cart
      .filter(element => element.ProductID !== idRemove)
      .map(e => (numberOfTotal = numberOfTotal + e.quatityBuy));
    this.props.setDataCart(numberOfTotal);
    this.setState({
      visible: false,
      idRemove: "",
      totalCash: total
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      idRemove: ""
    });
  };

  handleOptionChange = value => {
    this.setState({
      paymentOption: value
    });
  };

  onPaperChange = value => {
    const sotienthieu =
      this.state.totalCash - value * this.props.convensionRate;
    this.setState({
      remainingAmout: this.state.totalCash - value * this.props.convensionRate
    });
  };

  render() {
    const cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    const columns = [
      {
        title: "Tên Sản Phẩm",
        dataIndex: "ProductName",
        render: (text, record) => (
          <div>
            <img
              style={{ height: "80px", width: "80px", borderRadius: "5px" }}
              src={record.ImageDetail}
              alt=""
            />
            <span style={{ fontSize: "18px", marginLeft: "5%" }}>
              {record.ProductName}
            </span>
          </div>
        )
      },
      {
        title: "Giá Tiền | Số Lượng Giấy",
        dataIndex: "age",
        render: (text, record) => (
          <div>
            <span>{record.ProductPrice} VNĐ</span>
            <span className="mr-2 ml-2">|</span>
            <span>{record.ProductPrice}</span>
          </div>
        )
      },
      {
        title: "Số lượng",
        dataIndex: "address",
        render: (text, record) => (
          <InputNumber
            min={1}
            max={record.Quantity}
            value={record.quatityBuy}
            onChange={value => this.getQuantity(record, value)}
          />
        )
      },
      {
        title: "Action",
        key: "ProductName",
        render: (text, record) => (
          <img
            onClick={event => this.showModal(record.ProductID)}
            style={{ cursor: "pointer", width: "25px" }}
            src={require("../images/svgIcon/delete.svg")}
            alt=""
          />
        )
      }
    ];
    const { totalCash } = this.state;
    const { convensionRate } = this.props;
    return (
      <div>
        <NavBar />
        <div className="cart-wrapper">
          <div className="payment-infor">
            <div className="list-item-infor">
              <Table
                columns={columns}
                dataSource={JSON.parse(window.localStorage.getItem("cart"))}
                style={{ width: "100%" }}
                pagination={false}
              />
            </div>
            <div className="total-money">
              <div className="total-money-card">
                <p className="text-bill">Chi tiết hóa đơn:</p>
                {this.state.paymentOption == "2" ? (
                  <div className="text-total-money-disable">
                    <span>Tổng số tiền</span>
                    <span style={{ fontWeight: "bold" }}>{totalCash} VNĐ</span>
                  </div>
                ) : (
                  <div className="text-total-money">
                    <span>Tổng số tiền</span>
                    <span style={{ fontWeight: "bold" }}>{totalCash} VNĐ</span>
                  </div>
                )}
                {this.state.paymentOption == "1" ? (
                  <div className="text-total-money-disable">
                    <span>Tổng số giấy</span>
                    <span style={{ fontWeight: "bold" }}>
                      {Math.floor(totalCash / convensionRate)} kg
                    </span>
                  </div>
                ) : (
                  <div className="text-total-money">
                    <span>Tổng số giấy</span>
                    <span style={{ fontWeight: "bold" }}>
                      {Math.floor(totalCash / convensionRate)} kg
                    </span>
                  </div>
                )}
                <div className="payment-option mt-3">
                  <span style={{ fontSize: "18px", marginBottom: "10px" }}>
                    Chọn hình thức thanh toán:
                  </span>
                  <Select
                    style={{ width: 200, marginBottom: "10px" }}
                    onChange={this.handleOptionChange}
                    placeholder="Chọn phương thức"
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
                          min={0}
                          max={10}
                          defaultValue={0}
                          onChange={value => this.onPaperChange(value)}
                        />
                      </div>
                      <div className="money-input">
                        <span>Số tiền còn thiếu: </span>
                        <InputNumber
                          readOnly
                          min={1}
                          value={this.state.remainingAmout}
                          disabled
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="show-option-payment"></div>
                  )}
                </div>
                <div
                  className="button-check-out"
                  style={{ borderRadius: "5px" }}
                >
                  <span>Tiến hành thanh toán </span>
                </div>
              </div>
            </div>
          </div>
          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Xóa sản phẩm khỏi giỏ hàng?</p>
          </Modal>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    convensionRate: state.convension.convensionRate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPaperConvension: () => {
      dispatch(ConvensionTypes.getConvensionRequest());
    },
    setDataCart: param => {
      dispatch(HomePageTypes.updateStateCart(param));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
