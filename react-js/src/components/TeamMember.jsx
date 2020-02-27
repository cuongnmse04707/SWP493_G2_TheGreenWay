import React, { Component } from 'react';

class TeamMember extends Component {
  render() {
    return (
      <div className="team-member-wrapper">
        <div className="member-heading">
          <p>Đội ngũ của chúng tôi</p>
        </div>
        <div className="team-member-container">
          <div className="sub-member">
            <img style={{ width: "200px", height: "200px", borderRadius: "50%" }} src={require("../images/plant-1.jpg")} alt="" />
            <div className="member-name">
              <p>Nguyễn Mạnh Cường</p>
            </div>
            <div className="member-position">Thành viên</div>
            <div className="member-description">
              <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, </p>
            </div>
            <div className="member-contact">
              <a><i className="fa fa-facebook"></i></a>
              <a><i className="fa fa-google-plus"></i></a>
              <a><i className="fa fa-twitter"></i></a>
            </div>
          </div>

          <div className="sub-member">
            <img style={{ width: "200px", height: "200px", borderRadius: "50%" }} src={require("../images/plant-1.jpg")} alt="" />
            <div className="member-name">
              <p>Lê Văn Đức</p>
            </div>
            <div className="member-position">Thành viên</div>
            <div className="member-description">
              <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, </p>
            </div>
            <div className="member-contact">
              <a><i className="fa fa-facebook"></i></a>
              <a><i className="fa fa-google-plus"></i></a>
              <a><i className="fa fa-twitter"></i></a>
            </div>
          </div>

          <div className="sub-member">
            <img src={require("../images/plant-1.jpg")} alt="" />
            <div className="member-name">
              <p>Trần Tuấn Nam</p>
            </div>
            <div className="member-position">Thành viên</div>
            <div className="member-description">
              <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, </p>
            </div>
            <div className="member-contact">
              <a><i className="fa fa-facebook"></i></a>
              <a><i className="fa fa-google-plus"></i></a>
              <a><i className="fa fa-twitter"></i></a>
            </div>
          </div>
          <div className="sub-member">
            <img src={require("../images/plant-1.jpg")} alt="" />
            <div className="member-name">
              <p>Đào Ngọc Duy</p>
            </div>
            <div className="member-position">Thành viên</div>
            <div className="member-description">
              <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, </p>
            </div>
            <div className="member-contact">
              <a><i className="fa fa-facebook"></i></a>
              <a><i className="fa fa-google-plus"></i></a>
              <a><i className="fa fa-twitter"></i></a>
            </div>
          </div>
          <div className="sub-member">
            <img src={require("../images/plant-1.jpg")} alt="" />
            <div className="member-name">
              <p>Bùi Phương Dung</p>
            </div>
            <div className="member-position">Thành viên</div>
            <div className="member-description">
              <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, </p>
            </div>
            <div className="member-contact">
              <a><i className="fa fa-facebook"></i></a>
              <a><i className="fa fa-google-plus"></i></a>
              <a><i className="fa fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamMember;