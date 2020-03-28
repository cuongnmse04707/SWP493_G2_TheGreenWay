import React, { Component } from "react";
import Review from "../components/Review";
import { withRouter } from "react-router";
import { Icon, Dropdown, Menu } from "antd";
import "antd/dist/antd.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Carousel } from "react-bootstrap";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

class Index extends Component {
  state = {
    email: "",
    index: 0,
    direction: null
  };

  componentDidMount() { }

  handleSelect = (selectedIndex, e) => {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  };

  render() {
    return (
      <div className="home-page">
        <NavBar />
        <header className="masthead">
          <div className="container">
            <div className="intro-text">
              <div
                className="intro-heading text-uppercase"
                style={{ color: "#008000" }}
              >
                The Green Way
              </div>
              <div className="intro-lead-in">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingRight: "160px",
                    paddingLeft: "160px"
                  }}
                >
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      color: "#000000",
                      fontSize: "28px",
                      fontFamily: "none"
                    }}
                  >
                    Môi trường là khởi nguồn cho mọi sự sống của toàn nhân loại ...
                  </div>
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "28px",
                      color: "#000000",
                      fontFamily: "none"
                    }}
                  >
                    Mỗi chúng ta hãy cùng nhau chung tay vì một môi trường bền vững ...
                  </div>
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      justifyContent: "flex-end",
                      fontSize: "28px",
                      color: "#000000",
                      fontFamily: "none"
                    }}
                  >
                    ...Mỗi chúng ta hãy cùng nhau chung tay vì một môi trường bền vững.
                  </div>
                </div>
              </div>
              <a
                className="btn btn-primary btn-xl text-uppercase js-scroll-trigger"
                href="#services"
                style={{
                  marginTop: "50px"
                }}
              >
                Về chúng tôi
              </a>
            </div>
          </div>
        </header>

        <section className="page-section" id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">
                  Nhiệm vụ của chúng tôi
                </h2>
                <h3 className="section-subheading text-muted">
                  Hành động nhỏ vì một mục tiêu lớn
                </h3>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-md-4">
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%"
                  }}
                  src={require("../images/plant-1.jpg")}
                  alt=""
                />
                <h4 className="service-heading">Cây văn phòng</h4>
                <p className="text-muted">
                  Không gian làm việc nơi văn phòng sẽ thực sự mang một diện mạo mới khi được bày
                  trí một vài loại cây xanh . Sử dụng cây xanh trong thiết kế nội thất văn phòng
                  không chỉ giúp thanh lọc không khí, giảm thiếu các chất độc hại từ thiết bị điện tử
                  mà còn giúp tăng khả năng tập trung , kích thích sáng tạo trong công việc.
                </p>
              </div>
              <div className="col-md-4">
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%"
                  }}
                  src={require("../images/recycle-1.jpg")}
                  alt=""
                />
                <h4 className="service-heading">Đồ tái chế</h4>
                <p className="text-muted">
                  Tái chế là một hành động đơn giản gần gũi mà bất cứ ai cũng đều có thể làm được, việc
                  tái chế chính là tái sử dụng lại những vật liệu đã cũ , không còn sử dụng được nữa
                  nhằm giảm lượng chất thải thải ra môi trường hàng ngày và giải quyết được vắn đề
                  lãng phí tài nguyên hiện nay.

                </p>
              </div>
              <div className="col-md-4">
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%"
                  }}
                  src={require("../images/plant-3.jpg")}
                  alt=""
                />
                <h4 className="service-heading">Chia sẻ thông tin</h4>
                <p className="text-muted">
                  Ngay từ bây giờ mỗi người dân chúng ta hãy cùng nhau lan tỏa những hành động ý nghĩa ,
                   giúp ích gìn giữ và bảo vệ hành tinh xanh “lá phổi của nhân loại”.
                    Hãy cùng The Green Way chúng tôi chung tay tạo nên một thông điệp
                    vàng “Bảo vệ môi trường chính là bảo vệ cuộc sống của bạn”
                </p>
              </div>
            </div>
          </div>
        </section>
        <div style={{ backgroundColor: "#AFEEEE" }}>
          <section className="page-section" id="about">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h2 className="section-heading text-uppercase">Cách Sống</h2>
                  <h3 className="section-subheading text-muted">
                    Hãy cùng xem những cách sống nào giúp thay đổi môi trường
                    của chúng ta!
                  </h3>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <ul className="timeline">
                    <li>
                      <div className="timeline-image">
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%"
                          }}
                          src={require("../images/plant-1.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <h4>01/01/2020</h4>
                          <h4 className="subheading">
                            28 Tips sống xanh cho người bận rộn
                          </h4>
                        </div>
                        <div className="timeline-body">
                          <p className="text-muted">
                            1. Tắm vòi hoa sen thay vì tắm bồn Độ khó: *Tại sao
                            nên làm? Cách tốt nhất để tiết kiệm nước chính là
                            tắm vòi hoa sen thay vì tắm bồn. Theo Cục Khảo sát
                            Địa chất Hoa Kỳ (U.S. Geological Survey), để làm đầy
                            một bồn tắm, trung bình ta mất khoảng 36...
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-inverted">
                      <div className="timeline-image">
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%"
                          }}
                          src={require("../images/plant-2.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <h4>14/01/2020</h4>
                          <h4 className="subheading">
                            11 giải pháp "sống xanh, sống sạch"
                          </h4>
                        </div>
                        <div className="timeline-body">
                          <p
                            className="text-muted"
                            style={{ color: "black !important" }}
                          >
                            1. Tập thói quen mang theo một chiếc túi cỡ bự Bạn
                            biết phần lớn nguồn rác nhựa thải ra mỗi ngày đến từ
                            đâu không? Chính là các loại túi nylon, túi nhựa bạn
                            nhận được khi đi mua đồ - bất kể là siêu thị hay cửa
                            hàng tiện lợi...
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-image">
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%"
                          }}
                          src={require("../images/plant-3.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <h4>01/02/2020</h4>
                          <h4 className="subheading">
                            4 CÁCH SỐNG XANH AI CŨNG LÀM ĐƯỢC!!!
                          </h4>
                        </div>
                        <div className="timeline-body">
                          <p className="text-muted">
                            Lối sống zero waste - hay còn gọi lối sống xanh đã
                            trở thành trào lưu của thế giới, nhằm hạn chế lượng
                            rác thải nhựa và bảo vệ môi trường. Vậy hội chị em
                            VinMart+ đã làm gì giúp cuộc sống của mình xanh
                            hơn?...
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-inverted">
                      <div className="timeline-image">
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%"
                          }}
                          src={require("../images/plant-4.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <h4>14/02/2020</h4>
                          <h4 className="subheading">
                            ECOXURY: 10 cách đơn giản để sống xanh
                          </h4>
                        </div>
                        <div className="timeline-body">
                          <p className="text-muted">
                            Với cuộc đấu tranh chống biến đổi khí hậu, một hành
                            động nhỏ cũng sẽ mang đến nhiều ý nghĩa lớn lao. Đó
                            là lý do vì sao, Liên Hợp Quốc ủng hộ ý tưởng “Hành
                            động vi mô, tác động vĩ mô” trong phong trào lan tỏa
                            lối sống xanh trên toàn thế giới...{" "}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-inverted">
                      <div className="timeline-image">
                        <h4>Xem thêm</h4>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Review />
        <div style={{ backgroundColor: "#AFEEEE" }}>
          <section className=" page-section" id="team">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h2 className="section-heading text-uppercase">
                    Hãy Cùng Nhau Hành Động
                  </h2>
                  <h3 className="section-subheading text-muted">
                    Những người nổi tiếng, họ đang làm gì?
                  </h3>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <div className="team-member">
                    <img
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        borderColor: "black"
                      }}
                      src={require("../images/bill-gates.jpg")}
                      alt=""
                    />
                    <h4>BillGates</h4>
                    <p className="text-muted">
                      Quỹ từ thiện của tỷ phú BillGates kêu gọi bỏ dầu vì môi
                      trường
                    </p>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="team-member">
                    <img
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        borderColor: "black"
                      }}
                      src={require("../images/ronaldo.png")}
                      alt=""
                    />
                    <h4>Ronaldo</h4>
                    <p className="text-muted">
                      C. Ronaldo và sao thể thao kêu gọi cứu rừng Amazon
                    </p>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="team-member">
                    <img
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        borderColor: "black"
                      }}
                      src={require("../images/obama.jpg")}
                      alt=""
                    />
                    <h4>Obama</h4>
                    <p className="text-muted">
                      Obama kêu gọi giới trẻ Việt Nam hành động vì môi trường
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
              </div>
            </div> */}
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Index);
