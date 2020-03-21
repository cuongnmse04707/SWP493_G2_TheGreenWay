import { put, call } from "redux-saga/effects";
import IntroProductActions from "../redux/get-intro-product-redux";
import { message } from "antd";
import axios from "axios";

const IntroProductSagas = {
  *getIntroProduct(action) {
    console.log(action)
    try {
      const productInfor = yield call(() => {
        return axios.get(`http://localhost:3001/product/getProductsByCategory?idCategory=${action.data.idCategory}&page=${action.data.page}`, {
          headers: {
            'Content-Type': 'application/json',

          },
        });
      });
      console.log(productInfor);
      if (!productInfor.data.success) {
        yield put(IntroProductActions.getIntroProductRequestFailed(productInfor.data));
        message.error(productInfor.data.message, 3);
      } else {
        yield put(IntroProductActions.getIntroProductSucceed(productInfor.data));
      }
    } catch (error) {
      yield put(IntroProductActions.getIntroProductRequestFailed(error));
    }
  },

  *getRecycleProduct(action) {
    console.log(action)
    try {
      const productInfor = yield call(() => {
        return axios.get(`http://localhost:3001/product/getProductsByCategory?idCategory=${action.data.idCategory}&page=${action.data.page}`, {
          headers: {
            'Content-Type': 'application/json',

          },
        });
      });
      console.log(productInfor);
      if (!productInfor.data.success) {
        yield put(IntroProductActions.getRecycleProductRequestFailed(productInfor.data));
        message.error(productInfor.data.message, 3);
      } else {
        yield put(IntroProductActions.getRecycleProductSucceed(productInfor.data));
      }
    } catch (error) {
      yield put(IntroProductActions.getRecycleProductRequestFailed(error));
    }
  },
};

export default IntroProductSagas;
