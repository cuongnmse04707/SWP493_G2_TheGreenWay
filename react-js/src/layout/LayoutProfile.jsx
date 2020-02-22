import React, { Component, Fragment } from "react";
import SideBar from "../components/SideBar";
import HeaderComp from "../components/HeaderComp";
import { Layout } from "antd";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Redirect } from "react-router-dom";

const { Content } = Layout;
class LayoutProfile extends Component {
  render() {
    console.log("1");
    const token = window.localStorage.getItem("x-access-token");
    return token ? (
      <Layout>
        <SideBar></SideBar>
        <Layout
          className="content-layout-left"
          style={
            this.props.collapsed
              ? { marginLeft: "100px", transition: "all 0.4s" }
              : { marginLeft: "200px", transition: "all 0.4s" }
          }
        >
          {/* <HeaderComp /> */}
          <Content style={{ height: "100vh" }}>{this.props.children}</Content>
        </Layout>
      </Layout>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = state => ({
  collapsed: state.sideBar.collapsed
});

export default connect(mapStateToProps, null)(LayoutProfile);
