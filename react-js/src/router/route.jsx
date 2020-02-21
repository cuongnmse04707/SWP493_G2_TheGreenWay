import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Login from "../pages/Login"
import ForgotPassword from '../pages/ForgotPassword'
import HomePage from '../pages/HomePage'
import EditProfile from '../pages/profile/EditProfile'
import Index from '../pages/Index'
import ChangePassword from '../pages/profile/ChangePassword'
import { connect } from "react-redux"

class PageLayout extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path='/login'
            component={Login}
            exact
          />
          <Route
            path='/forgot'
            component={ForgotPassword}
            exact
          />
          <Route
            path='/home'
            component={HomePage}
            exact
          />
          <Route
            path='/account'
            component={EditProfile}
            exact
          />
          <Route
            path='/changepassword'
            component={ChangePassword}
            exact
          />
          <Route
            path='/'
            component={Index}
            exact
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default connect()(PageLayout)
