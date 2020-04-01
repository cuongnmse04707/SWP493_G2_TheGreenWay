import { put, call } from "redux-saga/effects";
import OrderCartctions from "../redux/order-card-redux";
import { message } from "antd";
import axios from "axios";

const OrderCartSagas = {
  *orderCart(action) {
    console.log(action)
    try {
      const orderInfor = yield call(() => {
        return axios.post(`http://localhost:3001/userorder/addNewOrderByUser`,action.data, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': window.localStorage.getItem("x-access-token"),
          },
        });
      });
      console.log(orderInfor);
      if (!orderInfor.data.success) {
        yield put(OrderCartctions.getOrderCartRequestFailed(orderInfor.data));
        message.error(orderInfor.data.message, 3);
      } else {
        yield put(OrderCartctions.getOrderCartSucceed(orderInfor.data));
        message.success(orderInfor.data.message, 3);
      }
    } catch (error) {
      yield put(OrderCartctions.getOrderCartRequestFailed(error));
    }
  },
};

export default OrderCartSagas;
