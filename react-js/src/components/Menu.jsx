import React, { Component } from 'react';
import '../css/components/menu.css'

class Menu extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light navbar-expand-md navigation-clean-search" id="navbar">
          <div className="menu-container" ><a className="navbar-brand" href="#">Logo Nhom</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse"
              id="navcol-1">
              <ul className="nav navbar-nav">
                <li className="nav-item" role="presentation"><a className="nav-link active" href="#">Trang Chủ</a></li>
                <li className="nav-item" role="presentation"><a className="nav-link" href="#">Sản Phẩm</a></li>
                <li className="nav-item" role="presentation"><a className="nav-link" href="#">Liên Hệ</a></li>
              </ul>
            </div><form className="form-inline">
              <input type="search" className="form-control" />
              <input type="submit" className="form-group btn" />
            </form></div>
        </nav>
      </div>
    );
  }
}

export default Menu;