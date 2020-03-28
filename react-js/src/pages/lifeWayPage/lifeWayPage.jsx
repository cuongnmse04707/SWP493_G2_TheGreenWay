import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import '../../css/life-way.css';
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Input, DatePicker } from 'antd';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import LifeWayTypes from "../../redux/life-way-redux";

class Lifeway extends Component {

  componentDidMount() {
    const params = {
      page: 1
    };
    this.props.getPostInfor(params);
  }


  onChange(date, dateString) {
    console.log(date, dateString);
  }

  toPostDetail = () => {
    this.props.history.push("/life-way-detail");
  }
  render() {
    const {postInfor} = this.props
    console.log(postInfor)
    return (
      <div>
        <NavBar />
        <div className="life-way-wrapper">
          <div className="post-header">
            <div className="post-header-image">
              <img src={require("../../images/edit-2.jpg")} alt="" />
            </div>
            <div className="post-header-content">
              <div className="post-header-title">
                <span>this is a title</span>
              </div>
              <div className="post-header-descript">
                <span>Proin eget tortor risus. Vivamus suscipit tortor
                eget felis porttitor volutpat. Donec sollicitudin
                molestie malesuada. Sed porttitor lectus nibh.
                Nulla quis lorem ut libero malesuada feugiat.
                Cras ultricies ligula sed magna dictum porta.
                aliquet quam id dui posuere blandit.
                    Nulla porttitor accumsan tincidunt.</span>
              </div>
              <div className="post-header-time">
                <img src={require("../../images/clock.png")} alt="" />
                <span className="ml-2">January 25, 2020</span>
              </div>
              <div className="view-detail-btn">
                <span>Xem chi tiết</span>
              </div>
            </div>
          </div>
          <div className="search-post-wrapper">
            <div className="search-post-date">
              <DatePicker size="large" onChange={this.onChange} placeholder="Chọn ngày" />
            </div>
            <div className="search-post-title">
              <Input size="large" placeholder="Nhập tên ..." />
            </div>
            <div className="search-post-button">
              <p><img className="mr-2" src={require("../../images/search.png")} alt="" />Tìm kiếm</p>
            </div>
          </div>
          <div className="post-detail-wrapper">
            <div className="post-detail-container">
              <div className="post-detail-image">
                <img src={require("../../images/edit-2.jpg")} alt="" />
              </div>
              <div className="post-detail-content">
                <div className="post-detail-title">
                  <span>This is a title</span>
                </div>
                <div className="post-detail-time">
                  <img src={require("../../images/clock.png")} alt="" />
                  <span className="ml-2">January 25, 2020</span>
                </div>
                <div className="post-detail-descript">
                  <span>Proin eget tortor risus. Vivamus suscipit tortor
                  eget felis porttitor volutpat. Donec sollicitudin
                  molestie malesuada. Sed porttitor lectus nibh.
                Nulla quis lorem ut libero malesuada feugiat</span>
                </div>
                <div>
                  <span>Lượt thích:</span>
                </div>
                <div className="view-detail-btn" onClick={this.toPostDetail}>
                  <span>Xem chi tiết</span>
                </div>
              </div>
            </div>
            <div className="post-detail-container">
              <div className="post-detail-image">
                <img src={require("../../images/edit-2.jpg")} alt="" />
              </div>
              <div className="post-detail-content">
                <div className="post-detail-title">
                  <span>This is a title</span>
                </div>
                <div className="post-detail-time">
                  <img src={require("../../images/clock.png")} alt="" />
                  <span className="ml-2">January 25, 2020</span>
                </div>
                <div className="post-detail-descript">
                  <span>Proin eget tortor risus. Vivamus suscipit tortor
                  eget felis porttitor volutpat. Donec sollicitudin
                  molestie malesuada. Sed porttitor lectus nibh.
                Nulla quis lorem ut libero malesuada feugiat</span>
                </div>
                <div className="view-detail-btn" onClick={this.toPostDetail}>
                  <span>Xem chi tiết</span>
                </div>
              </div>
            </div>
            <div className="post-detail-container">
              <div className="post-detail-image">
                <img src={require("../../images/edit-2.jpg")} alt="" />
              </div>
              <div className="post-detail-content">
                <div className="post-detail-title">
                  <span>This is a title</span>
                </div>
                <div className="post-detail-time">
                  <img src={require("../../images/clock.png")} alt="" />
                  <span className="ml-2">January 25, 2020</span>
                </div>
                <div className="post-detail-descript">
                  <span>Proin eget tortor risus. Vivamus suscipit tortor
                  eget felis porttitor volutpat. Donec sollicitudin
                  molestie malesuada. Sed porttitor lectus nibh.
                Nulla quis lorem ut libero malesuada feugiat</span>
                </div>
                <div className="view-detail-btn" onClick={this.toPostDetail}>
                  <span>Xem chi tiết</span>
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
const mapStateToProps = state => {
  return {
    postInfor: state.lifeWay.postInfor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPostInfor: (params) => {
      dispatch(LifeWayTypes.getLifeWayRequest(params));
    },
  };
};
Lifeway = withRouter(Lifeway)
export default connect(mapStateToProps, mapDispatchToProps)(Lifeway);
