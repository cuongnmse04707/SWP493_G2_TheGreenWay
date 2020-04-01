import { put, call } from "redux-saga/effects";
import UserOrderHistoryActions from "../redux/user-order-history-redux";
import { message } from "antd";
import axios from "axios";

const OrderHistorySagas = {
  *getOrderHistoryInfor(action) {
    console.log(action)
    try {
      const orderHistoryInfor = yield call(() => {
        return axios.get(`http://localhost:3001/userorder/showOrderListByEmail?page=${action.data.page}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': window.localStorage.getItem("x-access-token"),
          },
        });
      });
      console.log('order history infor',orderHistoryInfor);
      if (!orderHistoryInfor.data.success) {
        yield put(UserOrderHistoryActions.getUserOrderRequestFailed(orderHistoryInfor.data));
        message.error(orderHistoryInfor.data.message, 3);
      } else {
        yield put(UserOrderHistoryActions.getUserOrderSucceed(orderHistoryInfor.data));
      }
    } catch (error) {
      yield put(UserOrderHistoryActions.getUserOrderRequestFailed(error));
    }
  },
};

export default OrderHistorySagas;
