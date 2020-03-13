import React, { Component } from 'react';
import { withRouter } from "react-router";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import "../css/product-detail.css";
class ProductDetail extends Component {

  render() {
    return (
      <div>
        <NavBar/>
        <div className="product-container">
          <div className="product-detail">
            <div className="product-image">
              <img style={{ height: "100%" }} src={require('../images/product-1.jpg')} />
            </div>
            <div className="product-infor">
              <p className="product-name">Sen đádddd</p>
              <p className="content">Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
              ullamcorper sit amet ligula. Curabitur aliquet quam id dui posuere blandit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        <div></div>
        </div>
        <Footer/>
      </div>
    );
  }
}
ProductDetail = withRouter(ProductDetail)
export default ProductDetail;