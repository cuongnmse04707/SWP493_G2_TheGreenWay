import React, { Component } from 'react';
import { withRouter } from "react-router";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import "../css/product-detail.css";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import { InputNumber } from 'antd';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import Zoom from 'react-img-zoom'
import RelatedProduct from '../components/RelatedProduct'

const PhotoItem = ({ image, group }) => (
  <div style={{ maxWidth: "150px", width: "150px", height: "150px", padding: "5px" }}>
    <LightgalleryItem group={group} src={image}>
      <img src={image} style={{ width: "100%", height: "150px" }} />
    </LightgalleryItem>
  </div>
);

class ProductDetail extends Component {
  items = [
    "https://images.unsplash.com/flagged/photo-1551706646-9c816bfbff8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
    "https://images.unsplash.com/photo-1551633550-64761da5342b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
    "https://images.unsplash.com/photo-1551803021-92431219e83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1551833726-deb5e781c68f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  ]
  state = {
    image: [],
    quantity: 1,
    galleryItems: this.galleryItems(),
    backgroundPosition: '0% 0%'
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  slideTo = (i) => this.setState({ currentIndex: i })

  onSlideChanged = (e) => this.setState({ currentIndex: e.item })

  slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 })

  slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 })

  thumbItem = (item, i) => <span key={i} onClick={() => this.slideTo(i)}><img
    className="product-small-image"
    src={item}
  /></span>

  galleryItems() {
    return this.items.map((i) =>
      <img src={i} className="product-active-image" />
    )
  }

  getQuantity = (value) => {
    this.setState({
      quantity: value
    })
  }

  handleMouseMove = e => {
    console.log(123)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    this.setState({ backgroundPosition: `${x}% ${y}%` })
  }

  addToCart = () => {
    this.props.history.push('/cart')
  }

  responsive = {
    0: { items: 1 },
    1024: { items: 2 },
  }

  onSlideChange(e) {
    console.debug('Item`s position during a change: ', e.item)
    console.debug('Slide`s position during a change: ', e.slide)
  }

  onSlideChanged(e) {
    console.debug('Item`s position after changes: ', e.item)
    console.debug('Slide`s position after changes: ', e.slide)
  }

  render() {
    const { galleryItems, responsive, currentIndex } = this.state
    return (
      <div>
        <NavBar />
        <div className="product-containerr">
          <div className="product-detail">
            <div className="product-image-detail">
              <div>
                <AliceCarousel
                  dotsDisabled={true}
                  buttonsDisabled={true}
                  items={galleryItems}
                  responsive={responsive}
                  slideToIndex={currentIndex}
                  onSlideChanged={this.onSlideChanged}
                />
                <div className="list-small-image">{this.items.map(this.thumbItem)}</div>
              </div>
            </div>
            <div className="product-infor">
              <p className="product-name">Sen đá</p>
              <div className="item-detail-price">
                <div className="item-detail-coin"><img src={require("../images/coin.png")} alt="" /><span>3000</span></div>
                <div className="item-detail-coin"><img src={require("../images/paperr.png")} alt="" /><span>3000</span></div>
              </div>
              <div className="item-quantity">
                <span className="mr-4">Số lượng:</span>
                <InputNumber min={1} defaultValue={this.state.quantity} onChange={this.getQuantity} />
              </div>
              <div className="item-short-decription mt-5">
                <p>Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,</p>
              </div>
              <div className="add-to-cart">
                <div onClick= {this.addToCart}>
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
            <div style={{ height: "auto", width: "100%"}}>
              <div>
                <span style={{ fontSize: "28px", fontWeight: "bold" }}>Sản phẩm liên quan</span>
              </div>
              <RelatedProduct/>
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