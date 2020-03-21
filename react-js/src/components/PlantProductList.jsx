import React, { Component } from 'react';
import '../css/product-list.css';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import IntroProductTypes from "../redux/get-intro-product-redux";
import ConvensionTypes from "../redux/paper-conversion-redux";

class PlantProductList extends Component {
  state = {
    heart: false,
    introData: [],
    convensionRate: 0
  }

  componentDidMount() {
    this.props.getPaperConvension()
    const params = {
      idCategory: 1,
      page: 1
    }
    this.props.getIntroProduct(params)
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


  handleClick = () => {
    console.log(this.props.history)
    this.props.history.push("/product-detail");
  }

  changeHeart = () => {
    this.setState({
      heart: !this.state.heart
    })
  }

  addToShoppingCart = () => {
    this.props.history.push("/cart")
  }

  render() {
    return (
      <div className="product-list-wrapper">
        <div className="product-container">
          {this.state.introData.map((item, index) => {
            return (
              <div className="sub-item shadow bg-white rounded" key={index}>
                <div className="hovereffect" >
                  <img src={item.ImageDetail} alt="" />
                  <div className="overlayy">
                    <h2>{item.ProductName}</h2>
                    <a className="info" onClick={this.addToShoppingCart}>
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
                  <p onClick={this.handleClick}>{item.ProductName}</p>
                </div>
                <div className="item-infor">
                  <div className="item-price">
                    <div className="item-coin"><img src={require("../images/coin.png")} alt="" /><span>{item.ProductPrice}</span></div>
                    <div className="item-coin"><img src={require("../images/paperr.png")} alt="" /><span>{Math.floor(item.ProductPrice / this.state.convensionRate)}</span></div>
                  </div>
                  <div className="item-like">
                    <div><img src={require("../images/heart.png")} alt="" /></div>
                    <div className="item-coin"><span>{item.NumberOfLikes}</span></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.convension)
  return {
    introProduct: state.introProduct.introProduct,
    convensionRate: state.convension.convensionRate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPaperConvension: () => {
      dispatch(ConvensionTypes.getConvensionRequest())
    },
    getIntroProduct: (params) => {
      dispatch(IntroProductTypes.getIntroProductRequest(params));
    },
  };
};


PlantProductList = withRouter(PlantProductList)
export default connect(mapStateToProps, mapDispatchToProps)(PlantProductList);