import { put, call } from "redux-saga/effects";
import LoginActions from "../redux/login-redux";
import { message } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

const LoginSagas = {
  *loginUser(action) {
    try {
      const userInfor = yield call(() => {
        return axios.post("http://localhost:3001/auth/login", action.data, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      });
      console.log(userInfor);
      if (!userInfor.data.success) {
        yield put(LoginActions.loginFailed(userInfor.data));
        message.error(userInfor.data.message, 3);
      } else {
        yield window.localStorage.setItem(
          "x-access-token",
          userInfor.data.accessToken
        );

        yield put(LoginActions.loginSucceed(userInfor.data));
      }
    } catch (error) {
      yield put(LoginActions.loginFailed(error));
    }
  },

  *signUpUser(action) {
    try {
      const signUpUser = yield call(() => {
        return axios.post("http://localhost:3001/auth/register", action.data, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      });
      console.log(signUpUser);
      if (!signUpUser.data.success) {
        yield put(LoginActions.signUpFailed(signUpUser.data));
        message.error(signUpUser.data.message, 3);
      } else {
        message.success(signUpUser.data.message, 3);
        yield put(LoginActions.signUpSucceed(signUpUser.data));
      }
    } catch (error) {
      yield put(LoginActions.signUpFailed(error));
    }
  },

  *forgotEmail(action) {
    console.log("forgotData", action);
    try {
      const forgotEmail = yield call(() => {
        return axios.post(
          "http://localhost:3001/auth/forgotpassword",
          action.data,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      });
      console.log("okeee", forgotEmail);
      if (!forgotEmail.data.success) {
        yield put(LoginActions.forgotFailed(forgotEmail.data));
        message.error(forgotEmail.data.message, 3);
      } else {
        yield put(LoginActions.forgotSucceed(forgotEmail.data));
        message.success(forgotEmail.data.message, 3);
      }
    } catch (error) {
      yield put(LoginActions.forgotFailed(error));
    }
  }
};

export default LoginSagas;
