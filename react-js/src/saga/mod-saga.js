import { put, call } from "redux-saga/effects";
import ModActions from "../redux/mod-redux";
import { message } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

const ModSagas = {
  *getUser(action) {
    try {
      const userInfor = yield call(() => {
        return axios.get("http://localhost:3001/mod/getListUser?page=1", {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": window.localStorage.getItem("x-access-token"),
          },
        });
      });
      if (!userInfor.data.success) {
        yield put(ModActions.getUserFailed(userInfor.data));
        message.error(userInfor.data.message, 3);
      } else {
        yield put(ModActions.getUserSucceed(userInfor.data));
      }
    } catch (error) {
      yield put(ModActions.getUserFailed(error));
    }
  },

  *upRole(action) {
    try {
      const userInfor = yield call(() => {
        return axios.get(
          `http://localhost:3001/mod/upRow?email=${action.data.email}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": window.localStorage.getItem("x-access-token"),
            },
          }
        );
      });
      // console.log("variable: ", userInfor.data.success);
      if (!userInfor.data.success) {
        yield put(ModActions.upRoleFailed(userInfor.data));
        message.error("You don't have permission !");
      } else {
        action.data.callback("success");
        message.success("Update is Success !");
        yield put(ModActions.upRoleSucceed(action.data.email));
      }
    } catch (error) {
      yield put(ModActions.upRoleFailed(error));
      message.error("You don't have permission !");
    }
  },

  *downRole(action) {
    try {
      const userInfor = yield call(() => {
        return axios.get(
          `http://localhost:3001/mod/dowRow?email=${action.data.email}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": window.localStorage.getItem("x-access-token"),
            },
          }
        );
      });
      // console.log("variable: ", userInfor.data.success);
      if (!userInfor.data.success) {
        yield put(ModActions.downRoleFailed(userInfor.data));
        message.error("You don't have permission !");
      } else {
        message.success("Update is Success !");
        yield put(ModActions.downRoleSucceed(action.data.email));
      }
    } catch (error) {
      message.error("You don't have permission !");
      yield put(ModActions.downRoleFailed(error));
    }
  },
};

export default ModSagas;
