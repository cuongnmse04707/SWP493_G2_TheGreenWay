import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../css/life-way.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Input, DatePicker, Pagination } from "antd";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import LifeWayTypes from "../../redux/life-way-redux";

var moment = require("moment");

class Lifeway extends Component {
  state = {
    current: 1,
    searchText: "",
    checkSearch: false
  };

  componentDidMount() {
    const params = {
      page: 1
    };
    this.props.getPostInfor(params);
    this.props.getPostLikeMuch();
  }

  onChange(date, dateString) {
    console.log(date, dateString);
  }

  toPostDetail = id => {
    this.props.history.push(`/life-way-detail/${id}`);
  };

  onSelectPageChange = page => {
    const { checkSearch, searchText } = this.state;
    if (checkSearch) {
      this.setState({
        current: page
      });
      this.setState({
        checkSearch: true
      });
      this.props.searchDefaultPost({
        value: searchText,
        page: page
      });
    } else {
      this.setState({
        current: page
      });
      const params = {
        page: page
      };
      this.props.getPostInfor(params);
    }
  };

  handleSearchChange = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  searchPost = event => {
    const { searchText } = this.state;
    this.setState({
      current: 1
    });
    if (searchText) {
      this.setState({
        checkSearch: true
      });
      this.props.searchDefaultPost({
        value: searchText,
        page: 1
      });
    } else {
      this.setState({
        checkSearch: false
      });
      const params = {
        page: 1
      };
      this.props.getPostInfor(params);
    }
  };

  changeHeart = (event, item) => {
    event.stopPropagation();
    this.props.setDataLikePost({
      method: item.like === "like" ? "unLike" : "like",
      idP: item.PostID
    });
  };

  render() {
    const { postInfor, totalPage, postLikeMuch, resultSearch } = this.props;

    return (
      <div>
        <NavBar />
        <div className="life-way-wrapper">
          <div className="post-header">
            <div className="post-header-image">
              <div className="hovereffect">
                <img src={(postLikeMuch || {}).ImageDetail} alt="" />
                <div className="overlayy">
                  <div className="heart-icon">
                    {(postLikeMuch || {}).like === "like" ? (
                      <img
                        onClick={event => this.changeHeart(event, postLikeMuch)}
                        style={{ height: "35px", width: "35px" }}
                        src={require("../../images/svgIcon/like.svg")}
                        alt=""
                      />
                    ) : (
                      <img
                        onClick={event => this.changeHeart(event, postLikeMuch)}
                        style={{ height: "35px", width: "35px" }}
                        src={require("../../images/svgIcon/unLike.svg")}
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="post-header-content">
              <div className="post-header-title">
                <span>{(postLikeMuch || {}).Title}</span>
              </div>
              <div className="post-header-descript">
                <span>{(postLikeMuch || {}).Content}</span>
              </div>
              <div className="post-header-time">
                <img src={require("../../images/clock.png")} alt="" />
                <span className="ml-2">
                  {moment((postLikeMuch || {}).CreateDate).fromNow()}
                </span>
              </div>
              <div className="post-detail-like">
                <span>Lượt thích : </span>
                <span>{(postLikeMuch || {}).NumberOfLikes}</span>
              </div>
              <div
                className="view-detail-btn"
                onClick={() => this.toPostDetail((postLikeMuch || {}).PostID)}
              >
                <span>Xem chi tiết</span>
              </div>
            </div>
          </div>
          <div className="search-post-wrapper">
            <div className="search-post-title">
              <Input
                size="large"
                placeholder="Nhập tên ..."
                onChange={this.handleSearchChange}
                defaultValue={this.state.searchText}
              />
            </div>
            <div className="search-post-button" onClick={this.searchPost}>
              <p>
                <img
                  className="mr-2"
                  src={require("../../images/search.png")}
                  alt=""
                />
                Tìm kiếm
              </p>
            </div>
          </div>
          {resultSearch ? <div>Có {resultSearch} kết quả tìm kiếm</div> : null}
          <div className="post-detail-wrapper">
            {postInfor ? (
              (postInfor || {}).map((item, index) => {
                return (
                  <div className="post-detail-container" key={index}>
                    <div className="post-detail-image">
                      <div className="hovereffect">
                        <img src={item.ImageDetail} alt="" />
                        <div className="overlayy">
                          <div className="heart-icon">
                            {(item || {}).like === "like" ? (
                              <img
                                onClick={event => this.changeHeart(event, item)}
                                style={{ height: "35px", width: "35px" }}
                                src={require("../../images/svgIcon/like.svg")}
                                alt=""
                              />
                            ) : (
                              <img
                                onClick={event => this.changeHeart(event, item)}
                                style={{ height: "35px", width: "35px" }}
                                src={require("../../images/svgIcon/unLike.svg")}
                                alt=""
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="post-detail-content">
                      <div className="post-detail-title">
                        <span>{item.Title}</span>
                      </div>
                      <div className="post-detail-time">
                        <img src={require("../../images/clock.png")} alt="" />
                        <span className="ml-2">
                          {moment(item.CreateDate).fromNow()}
                        </span>
                      </div>
                      <div className="post-detail-descript">
                        <span>{item.Content}</span>
                      </div>
                      <div className="post-detail-like">
                        <span>Lượt thích : </span>
                        <span>{item.NumberOfLikes}</span>
                      </div>
                      <div
                        className="view-detail-btn"
                        onClick={() => this.toPostDetail(item.PostID)}
                      >
                        <span>Xem chi tiết</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
          <Pagination
            current={this.state.current}
            onChange={this.onSelectPageChange}
            total={totalPage * 10}
            style={{ display: "flex", justifyContent: "center" }}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    postInfor: state.lifeWay.postInfor,
    totalPage: state.lifeWay.totalPostPage,
    postDetailInfor: state.lifeWay.postDetailInfor,
    resultSearch: state.lifeWay.resultSearch,
    postLikeMuch: state.lifeWay.postLikeMuch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPostInfor: params => {
      dispatch(LifeWayTypes.getLifeWayRequest(params));
    },
    getPostDetailInfor: id => {
      dispatch(LifeWayTypes.getLifeWayDetailRequest(id));
    },
    getPostLikeMuch: () => {
      dispatch(LifeWayTypes.getPostLikeMuch());
    },
    setDataLikePost: params => {
      dispatch(LifeWayTypes.getLifeWayLikeRequest(params));
    },
    searchDefaultPost: params => {
      dispatch(LifeWayTypes.getLifeWaySearchRequest(params));
    }
  };
};
Lifeway = withRouter(Lifeway);
export default connect(mapStateToProps, mapDispatchToProps)(Lifeway);
