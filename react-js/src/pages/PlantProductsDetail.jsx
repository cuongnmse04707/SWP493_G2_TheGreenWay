import React, { Component } from 'react';
import '../css/product-list.css'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import PlantProductList from '../components/PlantProductList'
import RecycleProductList from '../components/RecycleProductList'
class PlantProductDetail extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="product-wrapper">
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
        </div>
        <Footer />
      </div>
    );
  }
}

export default PlantProductDetail;