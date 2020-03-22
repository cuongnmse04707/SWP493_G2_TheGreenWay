import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/ForgotPassword";
import EditProfile from "../pages/profile/EditProfile";
import Index from "../pages/Index";
import ChangePassword from "../pages/profile/ChangePassword";
import LayoutProfile from "../layout/LayoutProfile";
import AboutUs from "../pages/AboutUs";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import ShoppingCart from "../pages/ShoppingCart";
import LifeWay from "../pages/lifeWayPage/lifeWayPage";
import PlantProductDetail from "../pages/PlantProductsDetail";
import { connect } from "react-redux";

class PageLayout extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/forgot" component={ForgotPassword} exact />
          <Route path="/" component={Index} exact></Route>
          <Route path="/about-us" component={AboutUs} exact></Route>
          <Route path="/product" component={ProductList} exact></Route>
          <Route path="/life-way" component={LifeWay} exact></Route>
          <Route
            path="/product-detail/:id"
            component={ProductDetail}
            exact
          ></Route>
          <Route path="/cart" component={ShoppingCart} exact></Route>
          <Route
            path="/plant-product"
            component={PlantProductDetail}
            exact
          ></Route>
          <LayoutProfile>
            <Route path="/account" component={EditProfile} exact />
            <Route path="/changepassword" component={ChangePassword} exact />
          </LayoutProfile>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect()(PageLayout);
