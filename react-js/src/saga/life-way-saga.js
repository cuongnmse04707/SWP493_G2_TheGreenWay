import { put, call } from "redux-saga/effects";
import LifeWayActions from "../redux/life-way-redux";
import { message } from "antd";
import axios from "axios";

const LifeWaySagas = {
  *getPostInfor(action) {
    console.log(action)
    try {
      const postInfor = yield call(() => {
        return axios.get(`http://localhost:3001/post/getListPost?page=${action.data.page}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      });
      console.log('post infor',postInfor);
      if (!postInfor.data.success) {
        yield put(LifeWayActions.getLifeWayRequestFailed(postInfor.data));
        message.error(postInfor.data.message, 3);
      } else {
        yield put(LifeWayActions.getLifeWaySucceed(postInfor.data));
      }
    } catch (error) {
      yield put(LifeWayActions.getLifeWayRequestFailed(error));
    }
  },

  *getPostDetailInfor(action) {
    console.log(action)
    try {
      const postDetailInfor = yield call(() => {
        return axios.get(`http://localhost:3001/post/getpostbyid?idPost=${action.data}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      });
      console.log('post infor',postDetailInfor);
      if (!postDetailInfor.data.success) {
        yield put(LifeWayActions.getLifeWayDetailRequestFailed(postDetailInfor.data));
        message.error(postDetailInfor.data.message, 3);
      } else {
        yield put(LifeWayActions.getLifeWayDetailSucceed(postDetailInfor.data));
      }
    } catch (error) {
      yield put(LifeWayActions.getLifeWayDetailRequestFailed(error));
    }
  },
};

export default LifeWaySagas;
