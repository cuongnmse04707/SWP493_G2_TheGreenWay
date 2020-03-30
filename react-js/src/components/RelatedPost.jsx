import React, { Component } from 'react';
import '../css/related-product.css';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import LifeWayTypes from "../redux/life-way-redux";

class RelatedPost extends Component {
  state = {
    heart: false,
    introData: []
  }

  componentDidMount() {
    const params = {
      idCategory: 1,
      page: 1
    };
    this.props.getPostInfor(params);
  }
  render() {
    const { postInfor } = this.props;
    console.log(postInfor)
    return (
      <div>
        <div className="related-article">
          {postInfor.map((item, index) => {
            if (index < 3) {
              return (
                <div className="sub-item shadow bg-white rounded" key={index}>
                  <div className="hovereffect">
                    <img src={item.ImageDetail} alt="" />
                    <div className="overlayy">
                      <div className="heart-icon">
                        <img
                          style={{ height: "35px", width: "35px" }}
                          src={require("../images/svgIcon/like.svg")}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="related-article-sub-title">
                    <span>{item.Title}</span>
                  </div>
                  <div className="related-article-infor">
                    <div className="related-article-time">
                      <img src={require("../images/clock.png")} alt="" />
                      <span className="ml-2">{item.CreateDate}</span>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    postInfor: state.lifeWay.postInfor,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPostInfor: (params) => {
      dispatch(LifeWayTypes.getLifeWayRequest(params));
    },
  };
};

RelatedPost = withRouter(RelatedPost)
export default connect(mapStateToProps, mapDispatchToProps)(RelatedPost);