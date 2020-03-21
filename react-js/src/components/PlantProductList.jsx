import React, { Component } from "react";
import { Typography } from "antd";
import "../css/product-list.css";
import { withRouter } from "react-router";
class PlantProductList extends Component {
  state = {
    heart: false
  };

  handleClick = () => {
    this.props.history.push("/product-detail");
  };

  changeHeart = event => {
    event.stopPropagation();
    this.setState({
      heart: !this.state.heart
    });
  };

  addToShoppingCart = event => {
    event.stopPropagation();
    this.props.history.push("/cart");
  };

  render() {
    const { Text } = Typography;
    return (
      <div className="product-list-wrapper">
        <div className="product-container">
          <div
            className="sub-item shadow bg-white rounded"
            onClick={this.handleClick}
          >
            <div className="hovereffect">
              <img src={require("../images/product-5.jpg")} alt="" />
              <div className="overlayy">
                {/* <h2>Sen đá</h2> */}
                <a
                  className="info"
                  onClick={event => this.addToShoppingCart(event)}
                >
                  <div style={{ display: "flex" }}>
                    <img
                      style={{
                        height: "32px",
                        width: "32px",
                        marginRight: "10px"
                      }}
                      src={require("../images/svgIcon/cart.svg")}
                      alt=""
                    />
                    <span className="textAddToCart">Thêm vào giỏ hàng</span>
                  </div>
                </a>
                <div className="heart-icon">
                  {this.state.heart ? (
                    <img
                      onClick={event => this.changeHeart(event)}
                      style={{ height: "35px", width: "35px" }}
                      src={require("../images/svgIcon/like.svg")}
                      alt=""
                    />
                  ) : (
                    <img
                      onClick={event => this.changeHeart(event)}
                      style={{ height: "35px", width: "35px" }}
                      src={require("../images/svgIcon/unLike.svg")}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "320px",
                fontSize: "25px",
                fontStyle: "normal",
                fontWeight: "normal"
              }}
            >
              <span onClick={this.handleClick}>Sen đá</span>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin">
                  <img src={require("../images/svgIcon/money.svg")} alt="" />
                  <span>3.000 VNĐ</span>
                </div>
                <div className="item-coin" style={{ marginTop: "5px" }}>
                  <img src={require("../images/svgIcon/paper.svg")} alt="" />
                  <span>3 Kg</span>
                </div>
              </div>
              <div className="item-like">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: " center",
                    height: " 100%"
                  }}
                >
                  <img
                    style={{ height: "32px" }}
                    src={require("../images/svgIcon/nLike.svg")}
                    alt=""
                  />
                  <span className="textLike">30</span>
                </div>
              </div>
            </div>
          </div>
          <div className="sub-item shadow bg-white rounded">
            <div className="hovereffect">
              <img src={require("../images/product-g.jpg")} alt="" />
              <div className="overlayy">
                <h2>Sen đá</h2>
                <a className="info" onClick={this.addToShoppingCart}>
                  <div style={{ display: "flex" }}>
                    <img
                      style={{
                        height: "32px",
                        width: "32px",
                        marginRight: "10px"
                      }}
                      src={require("../images/svgIcon/cart.svg")}
                      alt=""
                    />
                    Thêm vào giỏ hàng
                  </div>
                </a>
                <div className="heart-icon">
                  {this.state.heart ? (
                    <img
                      onClick={this.changeHeart}
                      style={{ height: "16px", width: "16px" }}
                      src={require("../images/heart-full.png")}
                      alt=""
                    />
                  ) : (
                    <img
                      onClick={this.changeHeart}
                      style={{ height: "16px", width: "16px" }}
                      src={require("../images/heart-empty.png")}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="item-name">
              <p onClick={this.handleClick}>Sen đá</p>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin">
                  <img src={require("../images/coin.png")} alt="" />
                  <span>3000</span>
                </div>
                <div className="item-coin">
                  <img src={require("../images/paperr.png")} alt="" />
                  <span>3000</span>
                </div>
              </div>
              <div className="item-like">
                <div>
                  <img src={require("../images/heart.png")} alt="" />
                </div>
                <div className="item-coin">
                  <span>3000</span>
                </div>
              </div>
            </div>
          </div>
          <div className="sub-item shadow bg-white rounded">
            <div className="hovereffect">
              <img src={require("../images/product-f.jpg")} alt="" />
              <div className="overlayy">
                <h2>Sen đá</h2>
                <a className="info" onClick={this.addToShoppingCart}>
                  <div style={{ display: "flex" }}>
                    <img
                      style={{
                        height: "32px",
                        width: "32px",
                        marginRight: "10px"
                      }}
                      src={require("../images/cart-1.png")}
                      alt=""
                    />
                    Thêm vào giỏ hàng
                  </div>
                </a>
                <div className="heart-icon">
                  {this.state.heart ? (
                    <img
                      onClick={this.changeHeart}
                      style={{ height: "16px", width: "16px" }}
                      src={require("../images/heart-full.png")}
                      alt=""
                    />
                  ) : (
                    <img
                      onClick={this.changeHeart}
                      style={{ height: "16px", width: "16px" }}
                      src={require("../images/heart-empty.png")}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="item-name">
              <p onClick={this.handleClick}>Sen đá</p>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin">
                  <img src={require("../images/coin.png")} alt="" />
                  <span>3000</span>
                </div>
                <div className="item-coin">
                  <img src={require("../images/paperr.png")} alt="" />
                  <span>3000</span>
                </div>
              </div>
              <div className="item-like">
                <div>
                  <img src={require("../images/heart.png")} alt="" />
                </div>
                <div className="item-coin">
                  <span>3000</span>
                </div>
              </div>
            </div>
          </div>
          <div className="sub-item shadow bg-white rounded">
            <div className="hovereffect">
              <img src={require("../images/product-b.jpg")} alt="" />
              <div className="overlayy">
                <h2>Sen đá</h2>
                <a className="info" onClick={this.addToShoppingCart}>
                  <div style={{ display: "flex" }}>
                    <img
                      style={{
                        height: "32px",
                        width: "32px",
                        marginRight: "10px"
                      }}
                      src={require("../images/cart-1.png")}
                      alt=""
                    />
                    Thêm vào giỏ hàng
                  </div>
                </a>
                <div className="heart-icon">
                  {this.state.heart ? (
                    <img
                      onClick={this.changeHeart}
                      style={{ height: "16px", width: "16px" }}
                      src={require("../images/heart-full.png")}
                      alt=""
                    />
                  ) : (
                    <img
                      onClick={this.changeHeart}
                      style={{ height: "16px", width: "16px" }}
                      src={require("../images/heart-empty.png")}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="item-name">
              <p onClick={this.handleClick}>Sen đá</p>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin">
                  <img src={require("../images/coin.png")} alt="" />
                  <span>3000</span>
                </div>
                <div className="item-coin">
                  <img src={require("../images/paperr.png")} alt="" />
                  <span>3000</span>
                </div>
              </div>
              <div className="item-like">
                <div>
                  <img src={require("../images/heart.png")} alt="" />
                </div>
                <div className="item-coin">
                  <span>3000</span>
                </div>
              </div>
            </div>
          </div>
          <div className="sub-item shadow bg-white rounded">
            <div className="hovereffect">
              <img src={require("../images/product-c.jpg")} alt="" />
              <div className="overlayy">
                <h2>Sen đá</h2>
                <a className="info" onClick={this.addToShoppingCart}>
                  <div style={{ display: "flex" }}>
                    <img
                      style={{
                        height: "32px",
                        width: "32px",
                        marginRight: "10px"
                      }}
                      src={require("../images/cart-1.png")}
                      alt=""
                    />
                    Thêm vào giỏ hàng
                  </div>
                </a>
                <div className="heart-icon">
                  {this.state.heart ? (
                    <img
                      onClick={this.changeHeart}
                      style={{ height: "16px", width: "16px" }}
                      src={require("../images/heart-full.png")}
                      alt=""
                    />
                  ) : (
                    <img
                      onClick={this.changeHeart}
                      style={{ height: "16px", width: "16px" }}
                      src={require("../images/heart-empty.png")}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="item-name">
              <p onClick={this.handleClick}>Sen đá</p>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin">
                  <img src={require("../images/coin.png")} alt="" />
                  <span>3000</span>
                </div>
                <div className="item-coin">
                  <img src={require("../images/paperr.png")} alt="" />
                  <span>3000</span>
                </div>
              </div>
              <div className="item-like">
                <div>
                  <img src={require("../images/heart.png")} alt="" />
                </div>
                <div className="item-coin">
                  <span>3000</span>
                </div>
              </div>
            </div>
          </div>
          <div className="sub-item shadow bg-white rounded">
            <div className="hovereffect">
              <img src={require("../images/product-d.jpg")} alt="" />
              <div className="overlayy">
                <h2>Sen đá</h2>
                <a className="info" onClick={this.addToShoppingCart}>
                  <div style={{ display: "flex" }}>
                    <img
                      style={{
                        height: "32px",
                        width: "32px",
                        marginRight: "10px"
                      }}
                      src={require("../images/cart-1.png")}
                      alt=""
                    />
                    Thêm vào giỏ hàng
                  </div>
                </a>
                <div className="heart-icon">
                  {this.state.heart ? (
                    <img
                      onClick={this.changeHeart}
                      style={{ height: "16px", width: "16px" }}
                      src={require("../images/heart-full.png")}
                      alt=""
                    />
                  ) : (
                    <img
                      onClick={this.changeHeart}
                      style={{ height: "16px", width: "16px" }}
                      src={require("../images/heart-empty.png")}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="item-name">
              <p onClick={this.handleClick}>Sen đá</p>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin">
                  <img src={require("../images/coin.png")} alt="" />
                  <span>3000</span>
                </div>
                <div className="item-coin">
                  <img src={require("../images/paperr.png")} alt="" />
                  <span>3000</span>
                </div>
              </div>
              <div className="item-like">
                <div>
                  <img src={require("../images/heart.png")} alt="" />
                </div>
                <div className="item-coin">
                  <span>3000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
PlantProductList = withRouter(PlantProductList);
export default PlantProductList;
