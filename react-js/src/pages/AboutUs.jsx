import React, { Component } from "react";
import "../css/about-us.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CountUp from "react-countup";
import TeamMember from "../components/TeamMember";

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { isHover } = this.state;
    return (
      <div children="about-us">
        <NavBar />
        <div className="main-content">
          <div
            className="main-introduce "
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-anchor-placement="top-center"
          >
            <p className="introduce-title">THE GREEN WAY</p>
            <p
              className="btn btn-primary btn-xl text-uppercase js-scroll-trigger"
              href="#services"
              style={{ marginTop: "50px" }}
            >
              Về chúng tôi
            </p>
          </div>
        </div>
        <div className="our-mission">
          <div className="plant-office">
            <div className="content-introduce">
              <div data-aos="fade-right" data-aos-duration="1500">
                <h3>Cây để bàn, văn phòng</h3>
                <p>
                  Cây xanh không chỉ giúp không gian của chúng ta trở nên thân
                  thiện, đẹp đẽ hơn mà chúng còn giúp tái tạo không khí, tốt cho
                  sức khỏe...
                </p>
              </div>
            </div>
            <div data-aos="fade-left">
              <img
                className="fade-image"
                src={require("../images/about-us-2.jpg")}
              />
            </div>
          </div>
          <div className="plant-office">
            <div data-aos="fade-right">
              <img
                className="fade-image"
                src={require("../images/about-us-3.jpg")}
              />
            </div>
            <div
              className="content-introduce"
              data-aos="fade-left"
              data-aos-duration="1500"
            >
              <h3>Đồ dùng, sản phẩm làm từ đồ tái chế</h3>
              <p>
                Nulla quis lorem ut libero malesuada feugiat. Donec sollicitudin
                molestie malesuada. Curabitur arcu erat, accumsan id imperdiet
                et, porttitor at sem. Curabitur aliquet quam id dui posuere
                blandit. Praesent sapien massa, convallis a pellentesque nec,
                egestas non nisi. Donec rutrum congue leo eget malesuada.
                Vivamus suscipit tortor eget felis porttitor volutpat. Quisque
                velit nisi, pretium ut lacinia in, elementum id enim. Vivamus
                magna justo, lacinia eget consectetur sed, convallis at
                tellus...
              </p>
            </div>
          </div>
          <div className="plant-office">
            <div className="content-introduce">
              <div data-aos="fade-right" data-aos-duration="1500">
                <h3>Chia sẻ kiến thức về bảo vệ môi trường</h3>
                <p>
                  Nulla quis lorem ut libero malesuada feugiat. Donec
                  sollicitudin molestie malesuada. Curabitur arcu erat, accumsan
                  id imperdiet et, porttitor at sem. Curabitur aliquet quam id
                  dui posuere blandit....
                </p>
              </div>
            </div>
            <div data-aos="fade-left">
              <img
                className="fade-image"
                src={require("../images/about-us-5.jpg")}
              />
            </div>
          </div>
        </div>
        <div className="counter-wrapper">
          <div
            className="counter-number-container"
            onMouseEnter={event => this.setState({ isHover: true })}
          >
            <section className=" page-section" id="team">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <h2 className="counter-title" style={{ margin: "5% 0%" }}>
                      Thành quả đã đạt được của chúng tôi
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-sm-4"
                    data-aos="fade-right"
                    data-aos-duration="8000"
                  >
                    <div className="team-member">
                      <img
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                          borderColor: "#d1d1d1"
                        }}
                        src={require("../images/about-us-4.jpg")}
                        alt=""
                      />
                      <h4 className="counter-title">Số cây đã bán</h4>
                      <p className="counter-number">
                        {isHover ? (
                          <CountUp start={0} end={500} duration={3} />
                        ) : (
                          <CountUp start={500} />
                        )}
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-sm-4"
                    data-aos="fade-up"
                    data-aos-duration="5000"
                  >
                    <div className="team-member">
                      <img
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                          borderColor: "#d1d1d1"
                        }}
                        src={require("../images/about-us-6.jpg")}
                        alt=""
                      />
                      <h4 className="counter-title">Số kg giấy thu được</h4>
                      <p className="counter-number">
                        {isHover ? (
                          <CountUp start={0} end={500} duration={3} />
                        ) : (
                          <CountUp start={500} />
                        )}
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-sm-4"
                    data-aos="fade-left"
                    data-aos-duration="8000"
                  >
                    <div className="team-member">
                      <img
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                          borderColor: "#d1d1d1"
                        }}
                        src={require("../images/about-us-5.jpg")}
                        alt=""
                      />
                      <h4 className="counter-title">Số bài viết đã chia sẻ</h4>
                      <p className="counter-number">
                        {isHover ? (
                          <CountUp start={0} end={500} duration={3} />
                        ) : (
                          <CountUp start={500} />
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <TeamMember />
        <Footer />
      </div>
    );
  }
}

export default AboutUs;
