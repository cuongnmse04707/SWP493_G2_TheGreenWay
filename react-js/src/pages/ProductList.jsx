import React, { Component } from 'react';
import '../css/product-list.css'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import PlantProductList from '../components/PlantProductList'
class ProductList extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="product-wrapper">
          <div className="product-header" data-aos='fade-up' data-aos-duration="2000">
            <div className="product-header-left">
              <div >
                <img className="product-image" src={require('../images/product-1.jpg')} />
              </div>
            </div>
            <div className="product-header-right">
              <p className="title">Sản phẩm của chúng tôi</p>
              <p className="content">Trồng, sử dụng cây xanh, sử dụng các dụng cụ, đồ dùng tái chế là những việc làm
              thiết thực nhất để hiện thực hóa những hành động giúp môi trường của chúng ta ngày càng
              trở nên tốt hơn.</p>
              <p className="content">Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
              ullamcorper sit amet ligula. Curabitur aliquet quam id dui posuere blandit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          <div className="plant-container">
            <div className="plant-intro">
              <div className="intro-left">
                <p className="title">Cây cảnh, cây để bàn</p>
                <p className="content">Trồng, sử dụng cây xanh, sử dụng các dụng cụ, đồ dùng tái chế là những việc làm
                thiết thực nhất để hiện thực hóa những hành động giúp môi trường của chúng ta ngày càng
              trở nên tốt hơn.</p>
                <div className="detail-btn">
                  <p >Xem chi tiết</p>
                </div>
              </div>
              <div>
                <img src={require('../images/product-a.png')} />
              </div>
            </div>
            <PlantProductList />
          </div>
          <div className="plant-container">
            <div className="plant-intro">
              <div >
                <img className="recycle-img" src={require('../images/reuse.png')} />
              </div>
              <div className="intro-left">
                <p className="title">Đồ tái chế</p>
                <p className="content">Trồng, sử dụng cây xanh, sử dụng các dụng cụ, đồ dùng tái chế là những việc làm
                thiết thực nhất để hiện thực hóa những hành động giúp môi trường của chúng ta ngày càng
              trở nên tốt hơn.</p>
                <div className="detail-btn">
                  <p >Xem chi tiết</p>
                </div>
              </div>
            </div>
            <PlantProductList />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ProductList;