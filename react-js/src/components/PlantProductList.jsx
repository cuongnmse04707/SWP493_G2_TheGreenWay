import React, { Component } from "react";
import { message } from "antd";
import "../css/product-list.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import IntroProductTypes from "../redux/get-intro-product-redux";
import ProductDetailTypes from "../redux/product-detail-redux";
import ConvensionTypes from "../redux/paper-conversion-redux";
import HomePageTypes from "../redux/home-page-redux";

class PlantProductList extends Component {
  componentDidMount() {
    this.props.getPaperConvension();
    const params = {
      idCategory: 1,
      page: 1
    };
    this.props.getIntroProduct(params);
  }


  handleClick = (event, id) => {
    event.stopPropagation();
    this.props.history.push(`/product-detail/${id}`);
    this.props.getProductDetail(id);
  };

  changeHeart = (event, item) => {
    event.stopPropagation();
    const token = window.localStorage.getItem("x-access-token")
    if (!token) {
      message.error('Vui lòng đăng nhập để thích sản phẩm', 2)
    } else {
      event.stopPropagation();
      this.props.setDataLike({
        method: item.like === "like" ? "unLike" : "like",
        idP: item.ProductID
      });
    }
  };

  addToShoppingCart = (event, item) => {
    event.stopPropagation();
    const product = {
      ...item,
      quatityBuy: 1
    };
    const cart = JSON.parse(window.localStorage.getItem("cart")) || [];
    const indexNumber = cart.findIndex(
      element => element.ProductID === product.ProductID
    );
    if (indexNumber >= 0) {
      if (product.Quantity < cart[indexNumber].quatityBuy + 1) {
        message.error("Opps. Xin lỗi bạn, sản phẩm này đã hết hàng !");
      } else {
        message.success("Thêm sản phẩm vào giỏ hàng thành công !");
        cart[indexNumber].quatityBuy = cart[indexNumber].quatityBuy + 1;
      }
    } else {
      if (product.Quantity === 0) {
        message.error("Opps. Xin lỗi bạn, sản phẩm này đã hết hàng");
      } else {
        message.success("Thêm sản phẩm vào giỏ hàng thành công !");
        cart.push(product);
      }
    }

    let numberOfTotal = 0;
    cart.map(e => (numberOfTotal = numberOfTotal + e.quatityBuy));
    this.props.setDataCart(numberOfTotal);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  render() {
    const { convensionRate, introProduct } = this.props;
    return (
      <div className="product-list-wrapper">
        <div className="product-container">
          {introProduct.map((item, index) => {
            return (
              <div
                className="sub-item shadow bg-white rounded"
                onClick={event => this.handleClick(event, item.ProductID)}
                key={index}
              >
                <div className="hovereffect">
                  <img src={item.ImageDetail} alt="" />
                  <div className="overlayy">
                    <a
                      className="info"
                      onClick={event => this.addToShoppingCart(event, item)}
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
                      {(item || {}).like === "like" ? (
                        <img
                          onClick={event => this.changeHeart(event, item)}
                          style={{ height: "35px", width: "35px" }}
                          src={require("../images/svgIcon/like.svg")}
                          alt=""
                        />
                      ) : (
                          <img
                            onClick={event => this.changeHeart(event, item)}
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
                    marginTop: "300px",
                    fontSize: "25px",
                    fontStyle: "normal",
                    fontWeight: "normal"
                  }}
                >
                  <span>{item.ProductName}</span>
                </div>
                <div className="item-infor">
                  <div className="item-price">
                    <div className="item-coin">
                      <img
                        src={require("../images/svgIcon/money.svg")}
                        alt=""
                      />
                      <span>{item.ProductPrice} VNĐ</span>
                    </div>
                    <div className="item-coin" style={{ marginTop: "5px" }}>
                      <img
                        src={require("../images/svgIcon/paper.svg")}
                        alt=""
                      />
                      <span>
                        {Math.floor(item.ProductPrice / convensionRate)} Kg
                      </span>
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
                      <span className="textLike">{item.NumberOfLikes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    introProduct: state.introProduct.introProduct,
    convensionRate: state.convension.convensionRate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPaperConvension: () => {
      dispatch(ConvensionTypes.getConvensionRequest());
    },
    getIntroProduct: params => {
      dispatch(IntroProductTypes.getIntroProductRequest(params));
    },
    getProductDetail: id => {
      dispatch(ProductDetailTypes.getProductDetailRequest(id));
    },
    setDataCart: params => {
      dispatch(HomePageTypes.updateStateCart(params));
    },
    setDataLike: params => {
      dispatch(IntroProductTypes.updateLikeProduct(params));
    }
  };
};

PlantProductList = withRouter(PlantProductList);
export default connect(mapStateToProps, mapDispatchToProps)(PlantProductList);
