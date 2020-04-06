import React, { Component } from "react";
import "../../css/life-way-detail.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Input, DatePicker, Pagination } from "antd";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import LifeWayTypes from "../../redux/life-way-redux";
import RelatedPost from "../../components/RelatedPost";

var moment = require("moment");

const { Search } = Input;
class lifeWayPageDetail extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getPostDetailInfor(window.location.pathname.split("/")[2]);
  }

  render() {
    const { postDetailInfor } = this.props;
    return (
      <div>
        <NavBar />
        <div className="article-wrapper">
          <div className="article-header">
            <div className="article-header-title">
              <p>{postDetailInfor.Title}</p>
            </div>
            <div className="article-header-time">
              <img src={require("../../images/clock.png")} alt="" />
              <span className="ml-2">
                {moment(postDetailInfor.CreateDate).fromNow()}
              </span>
              <span className="ml-2">
                Lượt thích: {postDetailInfor.NumberOfLikes}
              </span>
            </div>
            <div className="article-header-image">
              <img src={postDetailInfor.ImageDetail} alt="" />
            </div>
          </div>
          <div className="article-content">
            <span dangerouslySetInnerHTML={{ __html: postDetailInfor.Content }}/>

          </div>
          <div className="related-article-title">
            <span>Bài viết liên quan</span>
          </div>
          <RelatedPost filterPost={window.location.pathname.split("/")[2]} />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    postDetailInfor: state.lifeWay.postDetailInfor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPostDetailInfor: id => {
      dispatch(LifeWayTypes.getLifeWayDetailRequest(id));
    }
  };
};
lifeWayPageDetail = withRouter(lifeWayPageDetail);
export default connect(mapStateToProps, mapDispatchToProps)(lifeWayPageDetail);
