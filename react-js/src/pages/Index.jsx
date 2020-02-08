import React, { Component } from 'react';
import Review from '../components/Review'
import { withRouter } from 'react-router'
import {  Icon,  Dropdown, Menu } from 'antd';
import 'antd/dist/antd.css';
class Index extends Component {
  state = {
    email: '',

  }
  toLogin = () => {
    this.props.history.push('/login')
  }
  componentDidMount() {
    const email = window.localStorage.getItem('email')
    this.setState({
      email: email
    })
  }

  clearStorage() {
    window.localStorage.clear()
    window.location.href = '/'
  }

  showModalAccount = () => {
    this.props.history.push('/account')
  };

  showModalPassword = () => {
    this.props.history.push('/changepassword')
  };
  render() {
    const token = window.localStorage.getItem('x-access-token')

    //menu dropdown
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a onClick={this.showModalAccount}>Account Information</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a onClick={this.showModalPassword}>Change Password</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
          <div className="container">
            <img style={{ width: '64px', height: '64px' }} src={require('../images/logo.png')} alt="" />
            <a className="navbar-brand js-scroll-trigger" href="#page-top" style={{ color: 'green' }}>The Green Way</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fa fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav text-uppercase ml-auto">
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#services">Dịch vụ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#portfolio">Cách sống</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#contact">Liên hệ</a>
                </li>
                {token ? (
                  <div className="header-left">
                    {/* <li className="nav-item">
                      <a className="nav-link js-scroll-trigger" href="#contact"> {this.state.email}</a>
                    </li> */}
                    <Dropdown style={{ width: '500px' }} overlay={menu} trigger={['click']}>
                      <a style={{ color: 'white !important' }} className="ant-dropdown-link" href="#">
                      {this.state.email} <Icon type="down" />
                      </a>
                    </Dropdown>

                    <li className="nav-item">
                      <a className="nav-link js-scroll-trigger" onClick={this.clearStorage}>Logout</a>
                    </li>
                  </div>
                   ) : (
                    <li className="nav-item">
                      <a className="nav-link js-scroll-trigger" onClick={this.toLogin}>Đăng nhập/Đăng ký</a>
                    </li>
                  )}
              </ul>
            </div>
          </div>
        </nav>

        <header className="masthead">
          <div className="container">
            <div className="intro-text">
              <div className="intro-lead-in">Save the Earth, Save Ourselves!</div>
              <div className="intro-heading text-uppercase">The Green Way</div>
              <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Tell Me More</a>
            </div>
          </div>
        </header>


        <section className="page-section" id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Our mission</h2>
                <h3 className="section-subheading text-muted">Change your thinking, change the world.</h3>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-md-4">
                <img style={{ width: '128px', height: '128px', borderRadius: '50%' }} src={require('../images/plant-1.jpg')} alt="" />
                <h4 className="service-heading">Cây văn phòng</h4>
                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
              </div>
              <div className="col-md-4">
                <img style={{ width: '128px', height: '128px', borderRadius: '50%' }} src={require('../images/recycle-1.jpg')} alt="" />
                <h4 className="service-heading">Đồ tái chế</h4>
                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
              </div>
              <div className="col-md-4">
                <img style={{ width: '128px', height: '128px', borderRadius: '50%' }} src={require('../images/plant-3.jpg')} alt="" />
                <h4 className="service-heading">Chia sẻ thông tin</h4>
                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
              </div>
            </div>
          </div>
        </section>

        <Review />

        <section className="page-section" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Cách Sống</h2>
                <h3 className="section-subheading text-muted">Hãy cùng xem những cách sống nào giúp thay đổi môi trường của chúng ta!</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <ul className="timeline">
                  <li>
                    <div className="timeline-image">
                      <img style={{ width: '100%', height: '100%', borderRadius: '50%' }} src={require('../images/plant-1.jpg')} alt="" />
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4>01/01/2020</h4>
                        <h4 className="subheading">28 Tips sống xanh cho người bận rộn</h4>
                      </div>
                      <div className="timeline-body">
                        <p className="text-muted">1. Tắm vòi hoa sen thay vì tắm bồn Độ khó: *Tại sao nên làm?
                          Cách tốt nhất để tiết kiệm nước chính là tắm vòi hoa sen thay vì tắm bồn.
                          Theo Cục Khảo sát Địa chất Hoa Kỳ (U.S. Geological Survey),
                          để làm đầy một bồn tắm, trung bình ta mất khoảng 36...</p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-inverted">
                    <div className="timeline-image">
                      <img style={{ width: '100%', height: '100%', borderRadius: '50%' }} src={require('../images/plant-2.jpg')} alt="" />
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4>14/01/2020</h4>
                        <h4 className="subheading">11 giải pháp "sống xanh, sống sạch"</h4>
                      </div>
                      <div className="timeline-body">
                        <p className="text-muted">1. Tập thói quen mang theo một chiếc túi cỡ bự
                        Bạn biết phần lớn nguồn rác nhựa thải ra mỗi ngày đến từ đâu không?
                        Chính là các loại túi nylon, túi nhựa bạn nhận được khi đi mua đồ -
                         bất kể là siêu thị hay cửa hàng tiện lợi...</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-image">
                      <img style={{ width: '100%', height: '100%', borderRadius: '50%' }} src={require('../images/plant-3.jpg')} alt="" />
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4>01/02/2020</h4>
                        <h4 className="subheading">4 CÁCH SỐNG XANH AI CŨNG LÀM ĐƯỢC!!!</h4>
                      </div>
                      <div className="timeline-body">
                        <p className="text-muted">Lối sống zero waste - hay còn gọi lối sống xanh đã trở thành
                         trào lưu của thế giới, nhằm hạn chế lượng rác thải nhựa và bảo vệ môi trường.
                          Vậy hội chị em VinMart+ đã làm gì giúp cuộc sống của mình xanh hơn?...</p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-inverted">
                    <div className="timeline-image">
                      <img style={{ width: '100%', height: '100%', borderRadius: '50%' }} src={require('../images/plant-4.jpg')} alt="" />
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4>14/02/2020</h4>
                        <h4 className="subheading">ECOXURY: 10 cách đơn giản để sống xanh</h4>
                      </div>
                      <div className="timeline-body">
                        <p className="text-muted">Với cuộc đấu tranh chống biến đổi khí hậu, một hành động nhỏ
                         cũng sẽ mang đến nhiều ý nghĩa lớn lao. Đó là lý do vì sao, Liên Hợp Quốc ủng hộ ý tưởng
                          “Hành động vi mô, tác động vĩ mô” trong phong trào lan tỏa lối sống xanh trên toàn thế giới... </p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-inverted">
                    <div className="timeline-image">
                      <h4>See More</h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-light page-section" id="team">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Hãy Cùng Nhau Hành Động</h2>
                <h3 className="section-subheading text-muted">Những người nổi tiếng, họ đang làm gì?</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <div className="team-member">
                  <img style={{ width: '128px', height: '128px', borderRadius: '50%' }} src={require('../images/bill-gates.jpg')} alt="" />
                  <h4>BillGates</h4>
                  <p className="text-muted">Quỹ từ thiện của tỷ phú BillGates kêu gọi bỏ dầu vì môi trường</p>
                  <ul className="list-inline social-buttons">
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="team-member">
                  <img style={{ width: '128px', height: '128px', borderRadius: '50%' }} src={require('../images/ronaldo.png')} alt="" />
                  <h4>Ronaldo</h4>
                  <p className="text-muted">C. Ronaldo và sao thể thao kêu gọi cứu rừng Amazon</p>
                  <ul className="list-inline social-buttons">
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="team-member">
                  <img style={{ width: '128px', height: '128px', borderRadius: '50%' }} src={require('../images/obama.jpg')} alt="" />
                  <h4>Obama</h4>
                  <p className="text-muted">Obama kêu gọi giới trẻ Việt Nam hành động vì môi trường</p>
                  <ul className="list-inline social-buttons">
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
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


        <section className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <a href="#">
                  <img className="img-fluid d-block mx-auto" src="img/logos/envato.jpg" alt="" />
                </a>
              </div>
              <div className="col-md-3 col-sm-6">
                <a href="#">
                  <img className="img-fluid d-block mx-auto" src="img/logos/designmodo.jpg" alt="" />
                </a>
              </div>
              <div className="col-md-3 col-sm-6">
                <a href="#">
                  <img className="img-fluid d-block mx-auto" src="img/logos/themeforest.jpg" alt="" />
                </a>
              </div>
              <div className="col-md-3 col-sm-6">
                <a href="#">
                  <img className="img-fluid d-block mx-auto" src="img/logos/creative-market.jpg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4">
                <span className="copyright">Copyright &copy; The Green Way</span>
              </div>
              <div className="col-md-4">
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <ul className="list-inline quicklinks">
                  <li className="list-inline-item">
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Terms of Use</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default withRouter(Index)