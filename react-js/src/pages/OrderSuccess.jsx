import React, { Component } from 'react';
import "../css/order-success.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

class OrderSuccess extends Component {

  componentDidMount() {
    window.localStorage.removeItem('cart')
  }

  toHomePage = () => {
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        <NavBar />
        <div className="order-success-wrapper">
          <div className="order-success-container shadow bg-white rounded">
            <div className="success-image">
              <img src={require('../images/product-a.png')} />
            </div>
            <div className="success-infor">
              <div className="success-logo">
                <img
                  style={{ width: "175px", height: "58px", cursor: "pointer" }}
                  src={require("../images/logo-1.png")}
                  alt=""
                />
              </div>
              <p className="thank-order">thank for your order</p>
              <div>
                <p>Cảm ơn bạn đã lựa chọn The Green Way để trải nghiệm cho mình phong cách sống xanh,
                lựa chọn những sản phẩm thân thiện với môi trường.
                   </p>
                <p>Đơn hàng đang được xử lí, chúng tôi sẽ giao đến quý khách trong thời gian sớm nhất.
                   </p>
              </div>
              <div className="button-check-out btn-continue" onClick={this.toHomePage}>
                <span>Tiếp tục mua hàng</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default OrderSuccess;