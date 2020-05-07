import React, { Component } from "react";
import "../css/not-found.css";

class LockAccount extends Component {
  render() {
    return (
      <div
        style={{
          background: "white",
          left: "0",
          height: "100vh",
          width: "100vw",
          position: "fixed",
        }}
        className="test-not-found"
      >
        <section className="page_404">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 ">
                <div className="col-sm-10 col-sm-offset-1  text-center">
                  <div className="four_zero_four_bg">
                    <h1 className="text-center ">404</h1>
                  </div>
                  <div className="contant_box_404">
                    <h3 className="h2">Tài khoản của bạn đã bị khoá</h3>
                    <p>Hãy liên hệ với admin để khắc phục tình trạng này!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default LockAccount;
