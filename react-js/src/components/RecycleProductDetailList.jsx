import React, { Component } from "react";
import { Typography, message, Pagination } from "antd";
import "../css/product-list.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import IntroProductTypes from "../redux/get-intro-product-redux";
import ConvensionTypes from "../redux/paper-conversion-redux";
import HomePageTypes from "../redux/home-page-redux";

class RecycleProductDetailList extends Component {
  state = {
    heart: false,
    introData: [],
    current: 1
  };

  componentDidMount() {
    this.props.getPaperConvension();
    const params = {
      idCategory: 2,
      page: 1
    };
    this.props.getIntroProduct(params);
  }

  componentDidUpdate(nextProps) {
    if (
      this.props.introProduct &&
      nextProps.introProduct !== this.props.introProduct
    ) {
      this.setState({
        introData: this.props.introProduct,
        convensionRate: this.props.convensionRate
      });
    }
  }

  onSelectPageChange = page => {
    console.log(page);
    this.setState({
      current: page,
    });
    const params = {
      idCategory: 2,
      page: page
    };
    this.props.getIntroProduct(params);
  };

  handleClick = (event, id) => {
    event.stopPropagation()
    this.props.history.push(`/product-detail/${id}`);
  };

  changeHeart = event => {
    event.stopPropagation();
    this.setState({
      heart: !this.state.heart
    });
  };

  addToShoppingCart = (event, item) => {
    event.stopPropagation();
    // console.log("item :", item);
    // const quatityBuy = 5;
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
    this.props.history.push("/cart");
  };

  render() {
    const { convensionRate } = this.props;
    return (
      <div className="product-list-wrapper">
        <div className="product-container">
          {this.state.introData.map((item, index) => {
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
        <Pagination current={this.state.current}
        onChange={this.onSelectPageChange}
        total={this.props.totalPage*10} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    introProduct: state.introProduct.introProduct,
    totalPage: state.introProduct.totalRecyclePage,
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
    setDataCart: params => {
      dispatch(HomePageTypes.updateStateCart(params));
    }
  };
};

RecycleProductDetailList = withRouter(RecycleProductDetailList);
export default connect(mapStateToProps, mapDispatchToProps)(RecycleProductDetailList);
