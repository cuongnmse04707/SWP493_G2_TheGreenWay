import React, { Component } from 'react';
import { withRouter } from "react-router";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import "../css/product-detail.css";
import { InputNumber } from 'antd';
import 'react-alice-carousel/lib/alice-carousel.css'
import RelatedProduct from '../components/RelatedProduct'
import { connect } from "react-redux";
import ProductDetailTypes from "../redux/product-detail-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class ProductDetail extends Component {
  state = {
    image: [],
    quantity: 1,
    backgroundPosition: '0% 0%',
    productInfor: {},
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const productId = window.location.pathname.split('/')[2]
    this.props.getProductDetail(productId)
  }

  componentDidUpdate(nextProps) {
    if (
      this.props.productInfor &&
      nextProps.productInfor !== this.props.productInfor
    ) {
      this.setState({
        productInfor: this.props.productInfor,
      });
    }
  }

  getQuantity = (value) => {
    this.setState({
      quantity: value
    })
  }

  handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    this.setState({ backgroundPosition: `${x}% ${y}%` })
  }

  addToCart = () => {
    this.props.history.push('/cart')
  }

  render() {
    const { convensionRate, productInfor, productImages } = this.props
    let arrayImages = []
    if (productImages != 'No Images') {
      productImages.map((item) => {
        arrayImages.push(item.urlImage)
      })
    }
    return (
      <div>
        <NavBar />
        <div className="product-containerr">
          <div className="product-detail">
            <div className="product-image-detail">
              <Carousel autoPlay showStatus={false} showIndicators={false} swipeable={false}>
                {arrayImages.map((item,index) => {
                  return (
                    <div key={index}>
                      <img style={{ width: "100%", height: "450px" }} src={item} />
                    </div>
                  )
                })}
              </Carousel>
            </div>
            <div className="product-infor">
              <p className="product-name">{productInfor.ProductName}</p>
              <div className="item-detail-price">
                <div className="item-detail-coin"><img src={require("../images/coin.png")} alt="" /><span>{productInfor.ProductPrice}</span></div>
                <div className="item-detail-coin"><img src={require("../images/paperr.png")} alt="" /><span>{Math.floor(productInfor.ProductPrice / convensionRate)}</span></div>
              </div>
              <div className="item-quantity">
                <span className="mr-4">Số lượng:</span>
                <InputNumber min={1} defaultValue={this.state.quantity} onChange={this.getQuantity} />
              </div>
              <div className="item-short-decription mt-5">
                <p>{productInfor.Description}</p>
              </div>
              <div className="add-to-cart">
                <div onClick={this.addToCart}>
                  <img style={{ height: "32px", width: "32px", marginRight: "10px" }} src={require("../images/supermarket.png")} alt="" /><span>Thêm vào giỏ hàng</span>
                </div>
              </div>
            </div>
          </div>
          <div className="product-detail-bottom">
            <div className="product-detail-description">
              <span style={{ fontSize: "28px", fontWeight: "bold" }}>Mô tả sản phẩm</span>
              <span>{productInfor.Description}</span>
            </div>
            <div style={{ height: "auto", width: "100%" }}>
              <div>
                <span style={{ fontSize: "28px", fontWeight: "bold" }}>Sản phẩm liên quan</span>
              </div>
              <RelatedProduct />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.productDetail.productImages)
  return {
    productInfor: state.productDetail.productInfor,
    productImages: state.productDetail.productImages,
    convensionRate: state.convension.convensionRate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductDetail: (productId) => {
      dispatch(ProductDetailTypes.getProductDetailRequest(productId));
    },
  };
};

ProductDetail = withRouter(ProductDetail)
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);