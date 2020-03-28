import React, { Component } from 'react';
import '../../css/life-way-detail.css';
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Input, DatePicker } from 'antd';


class lifeWayPageDetail extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="article-wrapper">
          <div className="article-header">
            <div className="article-header-title">
              <p>This is a title</p>
            </div>
            <div className="article-header-time">
              <img src={require("../../images/clock.png")} alt="" />
              <span className="ml-2">January 25, 2020</span>
            </div>
            <div className="article-header-image">
              <img src={require("../../images/edit-2.jpg")} alt="" />
            </div>
          </div>
          <div className="article-content">
            <span>
              Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
              Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum
              ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
              Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit
              amet ligula. Nulla quis lorem ut libero malesuada feugiat. Sed porttitor
              lectus nibh. Curabitur non nulla sit amet nisl tempus convallis quis ac
              lectus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
              dui. Pellentesque in ipsum id orci porta dapibus.
              Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus.
            </span>
          </div>
          <div className="related-article-title">
            <span>Bài viết liên quan</span>
          </div>
          <div className="related-article">
            <div className="sub-item shadow bg-white rounded">
              <div className="hovereffect">
                <img src={require("../../images/edit-2.jpg")} alt="" />
              </div>
              <div className="related-article-sub-title">
                <span>This is a title </span>
              </div>
              <div className="related-article-infor">
                <div className="related-article-time">
                  <img src={require("../../images/clock.png")} alt="" />
                  <span className="ml-2">January 25, 2020</span>
                </div>
              </div>
            </div>
            <div className="sub-item shadow bg-white rounded">
              <div className="hovereffect">
                <img src={require("../../images/edit-2.jpg")} alt="" />
              </div>
              <div className="related-article-sub-title">
                <span>This is a title </span>
              </div>
              <div className="related-article-infor">
                <div className="related-article-time">
                  <img src={require("../../images/clock.png")} alt="" />
                  <span className="ml-2">January 25, 2020</span>
                </div>
              </div>
            </div>
            <div className="sub-item shadow bg-white rounded">
              <div className="hovereffect">
                <img src={require("../../images/edit-2.jpg")} alt="" />
              </div>
              <div className="related-article-sub-title">
                <span>This is a title </span>
              </div>
              <div className="related-article-infor">
                <div className="related-article-time">
                  <img src={require("../../images/clock.png")} alt="" />
                  <span className="ml-2">January 25, 2020</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default lifeWayPageDetail;