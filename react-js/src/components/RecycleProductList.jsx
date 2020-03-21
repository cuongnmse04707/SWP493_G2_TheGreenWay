import React, { Component } from "react";
import "../css/product-list.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import IntroProductTypes from "../redux/get-intro-product-redux";
import ConvensionTypes from "../redux/paper-conversion-redux";

class RecycleProductList extends Component {
  state = {
    heart: false,
    introData: [],
    convensionRate: 0
  };

  componentDidMount() {
    this.props.getPaperConvension();
    const params = {
      idCategory: 2,
      page: 1
    };
    this.props.getRecycleProduct(params);
  }

  componentDidUpdate(nextProps) {
    if (
      this.props.recycleProduct &&
      nextProps.recycleProduct !== this.props.recycleProduct
    ) {
      this.setState({
        introData: this.props.recycleProduct,
        convensionRate: this.props.convensionRate
      });
    }
  }

  handleClick = () => {
    console.log(this.props.history);
    this.props.history.push("/product-detail");
  };

  changeHeart = () => {
    this.setState({
      heart: !this.state.heart
    });
  };

  addToShoppingCart = () => {
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
                onClick={this.handleClick}
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
                  <span onClick={this.handleClick}>{item.ProductName}</span>
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
  console.log("state.convension :", state.convension);
  return {
    recycleProduct: state.introProduct.recycleProduct,
    convensionRate: state.convension.convensionRate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPaperConvension: () => {
      dispatch(ConvensionTypes.getConvensionRequest());
    },
    getRecycleProduct: params => {
      dispatch(IntroProductTypes.getRecycleProductRequest(params));
    }
  };
};

RecycleProductList = withRouter(RecycleProductList);
export default connect(mapStateToProps, mapDispatchToProps)(RecycleProductList);
