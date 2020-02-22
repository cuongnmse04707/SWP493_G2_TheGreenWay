import React, { Component } from "react";
import "./App.css";
import LoginScreen from "./pages/Login";
import Route from "./router/route";
import { Provider } from "react-redux";
import NavBar from "../src/components/NavBar";
import configureStore from "./redux/index";

class App extends Component {
  render() {
    // alert("{data} have been added!");
    return (
      <div>
        {/* <BrowserRouter>
          <Switch>
            <Route
              path='/login'
              exact={true}
              render={props => (
                <LoginScreen />
              )}
            ></Route>
          </Switch>
        </BrowserRouter> */}
        <Provider store={configureStore()}>
          <Route />
        </Provider>
      </div>
    );
  }
}

export default App;
