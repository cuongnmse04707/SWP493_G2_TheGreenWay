import React, { Component } from 'react';
import '../css/product-list.css';
import { withRouter } from "react-router";
class RecycleProductList extends Component {

  state = {
    heart: false
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
        <div className="sub-item shadow bg-white rounded">
            <div className="hovereffect" >
              <img src={require("../images/product-7.png")} alt="" />
              <div className="overlayy">
                <h2>Ống hút tre</h2>
                <a className="info" onClick ={this.addToShoppingCart}>
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
              <p onClick={this.handleClick}>Ống hút tre</p>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin"><img src={require("../images/coin.png")} alt="" /><span>3000</span></div>
                <div className="item-coin"><img src={require("../images/paperr.png")} alt="" /><span>3000</span></div>
              </div>
              <div className="item-like">
                <div><img src={require("../images/heart.png")} alt="" /></div>
                <div className="item-coin"><span>3000</span></div>
              </div>
            </div>
          </div>
          <div className="sub-item shadow bg-white rounded">
            <div className="hovereffect" >
              <img src={require("../images/product-10.jpg")} alt="" />
              <div className="overlayy">
                <h2>Ống hút tre</h2>
                <a className="info" onClick ={this.addToShoppingCart}>
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
              <p onClick={this.handleClick}>Ống hút tre</p>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin"><img src={require("../images/coin.png")} alt="" /><span>3000</span></div>
                <div className="item-coin"><img src={require("../images/paperr.png")} alt="" /><span>3000</span></div>
              </div>
              <div className="item-like">
                <div><img src={require("../images/heart.png")} alt="" /></div>
                <div className="item-coin"><span>3000</span></div>
              </div>
            </div>
          </div>
          <div className="sub-item shadow bg-white rounded">
            <div className="hovereffect" >
              <img src={require("../images/product-14.jpg")} alt="" />
              <div className="overlayy">
                <h2>Ống hút tre</h2>
                <a className="info" onClick ={this.addToShoppingCart}>
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
              <p onClick={this.handleClick}>Ống hút tre</p>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin"><img src={require("../images/coin.png")} alt="" /><span>3000</span></div>
                <div className="item-coin"><img src={require("../images/paperr.png")} alt="" /><span>3000</span></div>
              </div>
              <div className="item-like">
                <div><img src={require("../images/heart.png")} alt="" /></div>
                <div className="item-coin"><span>3000</span></div>
              </div>
            </div>
          </div>
          <div className="sub-item shadow bg-white rounded">
            <div className="hovereffect" >
              <img src={require("../images/product-8.jpg")} alt="" />
              <div className="overlayy">
                <h2>Ống hút tre</h2>
                <a className="info" onClick ={this.addToShoppingCart}>
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
              <p onClick={this.handleClick}>Ống hút tre</p>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin"><img src={require("../images/coin.png")} alt="" /><span>3000</span></div>
                <div className="item-coin"><img src={require("../images/paperr.png")} alt="" /><span>3000</span></div>
              </div>
              <div className="item-like">
                <div><img src={require("../images/heart.png")} alt="" /></div>
                <div className="item-coin"><span>3000</span></div>
              </div>
            </div>
          </div>
          <div className="sub-item shadow bg-white rounded">
            <div className="hovereffect" >
              <img src={require("../images/product-13.jpg")} alt="" />
              <div className="overlayy">
                <h2>Ống hút tre</h2>
                <a className="info" onClick ={this.addToShoppingCart}>
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
              <p onClick={this.handleClick}>Ống hút tre</p>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin"><img src={require("../images/coin.png")} alt="" /><span>3000</span></div>
                <div className="item-coin"><img src={require("../images/paperr.png")} alt="" /><span>3000</span></div>
              </div>
              <div className="item-like">
                <div><img src={require("../images/heart.png")} alt="" /></div>
                <div className="item-coin"><span>3000</span></div>
              </div>
            </div>
          </div>
          <div className="sub-item shadow bg-white rounded">
            <div className="hovereffect" >
              <img src={require("../images/product-16.jpg")} alt="" />
              <div className="overlayy">
                <h2>Ống hút tre</h2>
                <a className="info" onClick ={this.addToShoppingCart}>
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
              <p onClick={this.handleClick}>Ống hút tre</p>
            </div>
            <div className="item-infor">
              <div className="item-price">
                <div className="item-coin"><img src={require("../images/coin.png")} alt="" /><span>3000</span></div>
                <div className="item-coin"><img src={require("../images/paperr.png")} alt="" /><span>3000</span></div>
              </div>
              <div className="item-like">
                <div><img src={require("../images/heart.png")} alt="" /></div>
                <div className="item-coin"><span>3000</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
RecycleProductList = withRouter(RecycleProductList)
export default RecycleProductList;