import { put, call } from "redux-saga/effects";
import ProductDetailActions from "../redux/product-detail-redux";
import { message } from "antd";
import axios from "axios";

const ProductDetailSagas = {
  *getProductDetail(action) {
    console.log(action)
    try {
      const productDetailInfor = yield call(() => {
        return axios.get(`http://localhost:3001/product/getinfobyid?idProduct=${action.data}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      });
      console.log(productDetailInfor);
      if (!productDetailInfor.data.success) {
        yield put(ProductDetailActions.getProductDetailRequestFailed(productDetailInfor.data));
        message.error(productDetailInfor.data.message, 3);
      } else {
        yield put(ProductDetailActions.getProductDetailSucceed(productDetailInfor.data));
      }
    } catch (error) {
      yield put(ProductDetailActions.getProductDetailRequestFailed(error));
    }
  },
};

export default ProductDetailSagas;
