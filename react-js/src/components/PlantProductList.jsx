import React, { Component } from 'react';
import '../css/product-list.css';
import { withRouter } from "react-router";
class PlantProductList extends Component {

  handleClick = () => {
    console.log(this.props.history)
    this.props.history.push("/product-detail");
  }

  render() {
    return (
      <div className="product-list-wrapper">
        <div className="product-container">
          <div className="sub-item">
            <div className="hovereffect" >
              <img src={require("../images/about-us-1.jpg")} alt="" />
              <div className="overlayy">
                <h2 >Sen đá</h2>
                <a className="info" href="#">
                  <div style={{ display: "flex" }}>
                    <img style={{ height: "32px", width: "32px", marginRight: "10px" }} src={require("../images/cart-1.png")} alt="" />Thêm vào giỏ hàng
                  </div>
                </a>
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
          <div className="sub-item">
            <div className="hovereffect" >
              <img src={require("../images/about-us-2.jpg")} alt="" />
              <div className="overlayy">
                <h2>Sen đá</h2>
                <a className="info" href="#">
                  <div style={{ display: "flex" }}>
                    <img style={{ height: "32px", width: "32px", marginRight: "10px" }} src={require("../images/cart-1.png")} alt="" />Thêm vào giỏ hàng
                  </div>
                </a>
              </div>
            </div>
            <div className="item-name">
              <p>Sen đá</p>
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
          <div className="sub-item">
            <div className="hovereffect" >
              <img src={require("../images/about-us-3.jpg")} alt="" />
              <div className="overlayy">
                <h2>Sen đá</h2>
                <a className="info" href="#">
                  <div style={{ display: "flex" }}>
                    <img style={{ height: "32px", width: "32px", marginRight: "10px" }} src={require("../images/cart-1.png")} alt="" />Thêm vào giỏ hàng
                  </div>
                </a>
              </div>
            </div>
            <div className="item-name">
              <p>Sen đá</p>
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
          <div className="sub-item">
            <div className="hovereffect" >
              <img src={require("../images/about-us-4.jpg")} alt="" />
              <div className="overlayy">
                <h2>Sen đá</h2>
                <a className="info" href="#">
                  <div style={{ display: "flex" }}>
                    <img style={{ height: "32px", width: "32px", marginRight: "10px" }} src={require("../images/cart-1.png")} alt="" />Thêm vào giỏ hàng
                  </div>
                </a>
              </div>
            </div>
            <div className="item-name">
              <p>Sen đá</p>
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
          <div className="sub-item">
            <div className="hovereffect" >
              <img src={require("../images/about-us-5.jpg")} alt="" />
              <div className="overlayy">
                <h2>Sen đá</h2>
                <a className="info" href="#">
                  <div style={{ display: "flex" }}>
                    <img style={{ height: "32px", width: "32px", marginRight: "10px" }} src={require("../images/cart-1.png")} alt="" />Thêm vào giỏ hàng
                  </div>
                </a>
              </div>
            </div>
            <div className="item-name">
              <p>Sen đá</p>
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
          <div className="sub-item">
            <div className="hovereffect" >
              <img src={require("../images/about-us-9.jpg")} alt="" />
              <div className="overlayy">
                <h2>Sen đá</h2>
                <a className="info" href="#">
                  <div style={{ display: "flex" }}>
                    <img style={{ height: "32px", width: "32px", marginRight: "10px" }} src={require("../images/cart-1.png")} alt="" />Thêm vào giỏ hàng
                  </div>
                </a>
              </div>
            </div>
            <div className="item-name">
              <p>Sen đá</p>
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
PlantProductList = withRouter(PlantProductList)
export default PlantProductList;