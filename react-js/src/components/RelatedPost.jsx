import React, { Component } from 'react';
import '../css/related-product.css';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import IntroProductTypes from "../redux/get-intro-product-redux";
import ConvensionTypes from "../redux/paper-conversion-redux";

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
    // this.props.getIntroProduct(params);
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
  };
};

RelatedPost = withRouter(RelatedPost)
export default connect(mapStateToProps, mapDispatchToProps)(RelatedPost);