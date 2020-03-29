import React, { Component } from "react";
import "../css/related-product.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import IntroProductTypes from "../redux/get-intro-product-redux";
import ConvensionTypes from "../redux/paper-conversion-redux";

class RelatedProduct extends Component {
  state = {};

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
  };

  changeHeart = (event, item) => {
    event.stopPropagation();
    this.props.setDataLike({
      method: item.like === "like" ? "unLike" : "like",
      idP: item.ProductID
    });
  };

  render() {
    const {
      convensionRate,
      introProduct,
      idP,
      category,
      recycleProduct
    } = this.props;
    const listProduct = category === "1" ? introProduct : recycleProduct;
    return (
      <div className="related-wrapper">
        <div className="product-container">
          {listProduct
            .filter(el => el.ProductID !== Number(idP))
            .map((item, index) => {
              if (index < 3) {
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
                            <span className="textAddToCart">
                              Thêm vào giỏ hàng
                            </span>
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
              }
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    introProduct: state.introProduct.introProduct,
    recycleProduct: state.introProduct.recycleProduct,
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
    setDataLike: params => {
      dispatch(IntroProductTypes.updateLikeProduct(params));
    }
  };
};

RelatedProduct = withRouter(RelatedProduct);
export default connect(mapStateToProps, mapDispatchToProps)(RelatedProduct);
