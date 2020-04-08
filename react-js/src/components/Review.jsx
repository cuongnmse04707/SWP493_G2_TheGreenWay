import React, { Component } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

class Review extends Component {
  render() {
    return (
      <div>
        <section className="bg-light page-section" id="portfolio">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">
                  Sản phẩm chính
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-6 portfolio-item" >
                <a
                  className="portfolio-link"
                  data-toggle="modal"
                  href="#portfolioModal1"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "300px",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px"
                    }}
                    src={require("../images/plant-4.jpg")}
                    alt=""
                  />
                </a>
                <div className="portfolio-caption">
                  <h4>Cây Để Bàn</h4>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 portfolio-item">
                <a
                  className="portfolio-link"
                  data-toggle="modal"
                  href="#portfolioModal2"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "300px",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px"
                    }}
                    src={require("../images/plant-5.jpg")}
                    alt=""
                  />
                </a>
                <div className="portfolio-caption">
                  <h4>Cây Văn Phòng</h4>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 portfolio-item">
                <a
                  className="portfolio-link"
                  data-toggle="modal"
                  href="#portfolioModal3"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "300px",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px"
                    }}
                    src={require("../images/plant-6.jpg")}
                    alt=""
                  />
                </a>
                <div className="portfolio-caption">
                  <h4>Tiểu Cảnh</h4>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 portfolio-item">
                <a
                  className="portfolio-link"
                  data-toggle="modal"
                  href="#portfolioModal4"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "300px",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px"
                    }}
                    src={require("../images/plant-7.jpg")}
                    alt=""
                  />
                </a>
                <div className="portfolio-caption">
                  <h4>Ống hút tre</h4>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 portfolio-item">
                <a
                  className="portfolio-link"
                  data-toggle="modal"
                  href="#portfolioModal5"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "300px",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px"
                    }}
                    src={require("../images/plant-8.jpg")}
                    alt=""
                  />
                </a>
                <div className="portfolio-caption">
                  <h4>Đồ tái chế</h4>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 portfolio-item">
                <a
                  className="portfolio-link"
                  data-toggle="modal"
                  href="#portfolioModal6"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "300px",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px"
                    }}
                    src={require("../images/plant-9.jpg")}
                    alt=""
                  />
                </a>
                <div className="portfolio-caption">
                  <h4>Túi Giấy</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Review;
