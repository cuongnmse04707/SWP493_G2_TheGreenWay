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
      console.log(userInfor);
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
};

export default ModSagas;
