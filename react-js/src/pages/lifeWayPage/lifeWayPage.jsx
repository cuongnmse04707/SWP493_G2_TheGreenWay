import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import '../../css/life-way.css';
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Input, DatePicker, Pagination } from 'antd';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import LifeWayTypes from "../../redux/life-way-redux";

class Lifeway extends Component {
  state = {
    current: 1,
    searchText: ''
  }

  componentDidMount() {
    const params = {
      page: 1
    };
    this.props.getPostInfor(params);
    this.props.getPostDetailInfor(1);
  }


  onChange(date, dateString) {
    console.log(date, dateString);
  }

  toPostDetail = (id) => {
    this.props.history.push(`/life-way-detail/${id}`);
  }

  onSelectPageChange = page => {
    this.setState({
      current: page,
    });
    const params = {
      idCategory: 1,
      page: page
    };
    this.props.getPostInfor(params);
  };

  handleSearchChange = (event) => {
    console.log(event.target.value)
  }

  searchPost = (event) => {
    console.log(event.target.value)
  }
  render() {
    const { postInfor, totalPage, postDetailInfor } = this.props
    console.log(postDetailInfor)
    return (
      <div>
        <NavBar />
        <div className="life-way-wrapper">
          <div className="post-header">
            <div className="post-header-image">
              <img src={postDetailInfor.ImageDetail} alt="" />
            </div>
            <div className="post-header-content">
              <div className="post-header-title">
                <span>{postDetailInfor.Title}</span>
              </div>
              <div className="post-header-descript">
                <span>{postDetailInfor.Content}</span>
              </div>
              <div className="post-header-time">
                <img src={require("../../images/clock.png")} alt="" />
                <span className="ml-2">{postDetailInfor.CreateDate}</span>
              </div>
              <div className="view-detail-btn" onClick={() => this.toPostDetail(postDetailInfor.PostID)}>
                <span>Xem chi tiết</span>
              </div>
            </div>
          </div>
          <div className="search-post-wrapper">
            <div className="search-post-title">
              <Input size="large" placeholder="Nhập tên ..." onChange={this.handleSearchChange} defaultValue={this.state.searchText} />
            </div>
            <div className="search-post-button" onClick={this.searchPost}>
              <p><img className="mr-2" src={require("../../images/search.png")} alt="" />Tìm kiếm</p>
            </div>
          </div>
          <div className="post-detail-wrapper">
            {postInfor ? (
              postInfor.map((item, index) => {
                return (
                  <div className="post-detail-container" key={index}>
                    <div className="post-detail-image">
                      <img src={item.ImageDetail} alt="" />
                    </div>
                    <div className="post-detail-content">
                      <div className="post-detail-title">
                        <span>{item.Title}</span>
                      </div>
                      <div className="post-detail-time">
                        <img src={require("../../images/clock.png")} alt="" />
                        <span className="ml-2">{item.CreateDate}</span>
                      </div>
                      <div className="post-detail-descript">
                        <span>{item.Content}</span>
                      </div>
                      <div className="post-detail-like">
                        <span>Lượt thích:</span>
                        <span>{item.NumberOfLikes}</span>
                      </div>
                      <div className="view-detail-btn" onClick={() => this.toPostDetail(item.PostID)}>
                        <span>Xem chi tiết</span>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
                <div></div>
              )}
          </div>
          <Pagination current={this.state.current}
            onChange={this.onSelectPageChange}
            total={this.props.totalPage * 10}
            style={{ display: "flex", justifyContent: "center" }}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state.lifeWay)
  return {
    postInfor: state.lifeWay.postInfor,
    totalPage: state.lifeWay.totalPostPage,
    postDetailInfor: state.lifeWay.postDetailInfor,
  };
};



const mapDispatchToProps = dispatch => {
  return {
    getPostInfor: (params) => {
      dispatch(LifeWayTypes.getLifeWayRequest(params));
    },
    getPostDetailInfor: (id) => {
      dispatch(LifeWayTypes.getLifeWayDetailRequest(id));
    },
  };
};
Lifeway = withRouter(Lifeway)
export default connect(mapStateToProps, mapDispatchToProps)(Lifeway);
