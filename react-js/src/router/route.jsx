import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Login from "../pages/Login"
import ForgotPassword from '../pages/ForgotPassword'
import HomePage from '../pages/HomePage'
import { connect } from "react-redux"

class PageLayout extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path='/'
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
        </Switch>
      </BrowserRouter>
    )
  }
}

export default connect()(PageLayout)
