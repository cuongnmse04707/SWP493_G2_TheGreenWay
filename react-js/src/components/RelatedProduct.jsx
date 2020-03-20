import React, { Component } from 'react';
import '../css/related-product.css';
import { withRouter } from "react-router";
class RelatedProduct extends Component {
  state = {
    heart: false
  }

  handleClick = () => {
    console.log(this.props.history)
    this.props.history.push("/product-detail");
  }

  changeHeart = () => {
    this.setState({
      heart: !this.state.heart
    })
  }

  render() {
    return (
      <div className="related-wrapper">
        <div className="product-container">
          <div className="sub-item shadow bg-white rounded">
            <div className="hovereffect" >
              <img src={require("../images/product-5.jpg")} alt="" />
              <div className="overlayy">
                <h2>Sen đá</h2>
                <a className="info" href="#">
                  <div style={{ display: "flex" }}>
                    <img style={{ height: "32px", width: "32px", marginRight: "10px" }} src={require("../images/cart-1.png")} alt="" />Thêm vào giỏ hàng
                  </div>
                </a>
                <div className='heart-icon'>
                  {this.state.heart ? (<img onClick={this.changeHeart} style={{ height: "16px", width: "16px" }} src={require("../images/heart-full.png")} alt="" />) :
                    (<img onClick={this.changeHeart} style={{ height: "16px", width: "16px" }} src={require("../images/heart-empty.png")} alt="" />)}
                </div>
              </div>
            </div>
            <div className="item-name">
              <p onClick={this.handleClick}>Sen đá</p>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin"><img src={require("../images/coin.png")} alt="" /><span>3000</span></div>
                <div className="item-coin"><img src={require("../images/paperr.png")} alt="" /><span>3000</span></div>
              </div>
              <div className="item-like">
                <div><img src={require("../images/heart.png")} alt="" /></div>
                <div className="item-coin"><span>3000</span></div>
              </div>
            </div>
          </div>
          <div className="sub-item shadow bg-white rounded">
            <div className="hovereffect" >
              <img src={require("../images/product-g.jpg")} alt="" />
              <div className="overlayy">
                <h2>Sen đá</h2>
                <a className="info" href="#">
                  <div style={{ display: "flex" }}>
                    <img style={{ height: "32px", width: "32px", marginRight: "10px" }} src={require("../images/cart-1.png")} alt="" />Thêm vào giỏ hàng
                  </div>
                </a>
                <div className='heart-icon'>
                  {this.state.heart ? (<img onClick={this.changeHeart} style={{ height: "16px", width: "16px" }} src={require("../images/heart-full.png")} alt="" />) :
                    (<img onClick={this.changeHeart} style={{ height: "16px", width: "16px" }} src={require("../images/heart-empty.png")} alt="" />)}
                </div>
              </div>
            </div>
            <div className="item-name">
              <p onClick={this.handleClick}>Sen đá</p>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin"><img src={require("../images/coin.png")} alt="" /><span>3000</span></div>
                <div className="item-coin"><img src={require("../images/paperr.png")} alt="" /><span>3000</span></div>
              </div>
              <div className="item-like">
                <div><img src={require("../images/heart.png")} alt="" /></div>
                <div className="item-coin"><span>3000</span></div>
              </div>
            </div>
          </div>
          <div className="sub-item shadow bg-white rounded">
            <div className="hovereffect" >
              <img src={require("../images/product-f.jpg")} alt="" />
              <div className="overlayy">
                <h2>Sen đá</h2>
                <a className="info" href="#">
                  <div style={{ display: "flex" }}>
                    <img style={{ height: "32px", width: "32px", marginRight: "10px" }} src={require("../images/cart-1.png")} alt="" />Thêm vào giỏ hàng
                  </div>
                </a>
                <div className='heart-icon'>
                  {this.state.heart ? (<img onClick={this.changeHeart} style={{ height: "16px", width: "16px" }} src={require("../images/heart-full.png")} alt="" />) :
                    (<img onClick={this.changeHeart} style={{ height: "16px", width: "16px" }} src={require("../images/heart-empty.png")} alt="" />)}
                </div>
              </div>
            </div>
            <div className="item-name">
              <p onClick={this.handleClick}>Sen đá</p>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin"><img src={require("../images/coin.png")} alt="" /><span>3000</span></div>
                <div className="item-coin"><img src={require("../images/paperr.png")} alt="" /><span>3000</span></div>
              </div>
              <div className="item-like">
                <div><img src={require("../images/heart.png")} alt="" /></div>
                <div className="item-coin"><span>3000</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
RelatedProduct = withRouter(RelatedProduct)
export default RelatedProduct;