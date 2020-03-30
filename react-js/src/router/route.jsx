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
import LifeWay from "../pages/lifeWayPage/lifeWayPage.jsx";
import PlantProductDetail from "../pages/PlantProductsDetail";
import RecycleProducDetail from "../pages/RecycleProductDetail";
import LifeWayPageDetail from "../pages/lifeWayPage/lifeWayPageDetail";
import ConfirmPayment from "../pages/ConfirmPayment";
import UserProductLike from "../pages/UserProductLike";
import { connect } from "react-redux";
import OrderSuccess from "../pages/OrderSuccess"

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
          <Route path="/life-way-detail/:id" component={LifeWayPageDetail} exact></Route>
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
           <Route
            path="/recycle-product"
            component={RecycleProducDetail}
            exact
          ></Route>
          <Route path="/confirm-payment" component={ConfirmPayment} exact></Route>
          <Route path="/order-success" component={OrderSuccess} exact></Route>
          <LayoutProfile>
            <Route path="/account" component={EditProfile} exact />
            <Route path="/changepassword" component={ChangePassword} exact />
            <Route path="/user-product-like" component={UserProductLike} exact />
          </LayoutProfile>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect()(PageLayout);
