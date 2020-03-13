import React, { Component } from 'react';
import { withRouter } from "react-router";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import "../css/product-detail.css";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";

const PhotoItem = ({ image, group }) => (
  <div style={{ maxWidth: "150px", width: "150px", height: "150px", padding: "5px" }}>
    <LightgalleryItem group={group} src={image}>
      <img src={image} style={{ width: "100%", height: "150px" }} />
    </LightgalleryItem>
  </div>
);

class ProductDetail extends Component {
  state = {
    image: [
      "https://images.unsplash.com/flagged/photo-1551706646-9c816bfbff8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
      "https://images.unsplash.com/photo-1551633550-64761da5342b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
      "https://images.unsplash.com/photo-1551803021-92431219e83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1551833726-deb5e781c68f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    ],
    quantity: 1
  }

  minus = () => {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1
      })
    }
  }

  plus = () => {
    this.setState({
      quantity: this.state.quantity + 1
    })
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="product-containerr">
          <div className="product-detail">
            <div className="product-image-detail">
              <img
                style={{ height: "500px", width: "100%", padding: "5px" }}
                src={"https://images.unsplash.com/photo-1551803021-92431219e83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"}
              />
              <LightgalleryProvider
                onAfterSlide={() => {
                  console.log("onAfterSlide");
                }}
              >
                <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
                  {this.state.image.map((p, idx) => (
                    <PhotoItem key={idx} image={p} group="group1" />
                  ))}
                </div>
              </LightgalleryProvider>
            </div>
            <div className="product-infor">
              <p className="product-name">Sen đá</p>
              <div className="item-detail-price">
                <div className="item-detail-coin"><img src={require("../images/coin.png")} alt="" /><span>3000</span></div>
                <div className="item-detail-coin"><img src={require("../images/paperr.png")} alt="" /><span>3000</span></div>
              </div>
              <div className="item-quantity">
                <span className="mr-4">Số lượng:</span>
                <div className="item-counter">
                  <span onClick={this.minus}>-</span>
                  <span>{this.state.quantity}</span>
                  <span onClick={this.plus}>+</span>
                </div>
              </div>
              <div className="item-short-decription mt-5">
                <p>Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,</p>
              </div>
              <div className="add-to-cart">
                <div>
                  <img style={{ height: "32px", width: "32px", marginRight: "10px" }} src={require("../images/supermarket.png")} alt="" /><span>Thêm vào giỏ hàng</span>
                </div>
              </div>
            </div>
          </div>
          <div className="product-detail-bottom">
            <div className="product-detail-description">
              <span style={{ fontSize: "28px", fontWeight: "bold" }}>Mô tả sản phẩm</span>
              <span>Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
              ullamcorper sit amet ligula. Curabitur aliquet quam id dui posuere blandit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
              ullamcorper sit amet ligula. Curabitur aliquet quam id dui posuere blandit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </div>
            <div style={{ height: "100px", width: "100%", background: "red" }}>
              San Pham gan day
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
ProductDetail = withRouter(ProductDetail)
export default ProductDetail;