import { put, call } from "redux-saga/effects";
import AdminProductActions from "../redux/admin-product-redux";
import { message } from "antd";
import axios from "axios";

const AdminProductSagas = {
  *getAdminProductInfor(action) {
    console.log(action)
    try {
      const productInfor = yield call(() => {
        return axios.get(`http://localhost:3001/product/getProducts`, {
          headers: {
            'Content-Type': 'application/json',
            // 'x-access-token': window.localStorage.getItem("x-access-token"),
          },
        });
      });
      console.log('infor',productInfor);
      if (!productInfor.data.success) {
        yield put(AdminProductActions.getProductRequestFailed(productInfor.data));
        message.error(productInfor.data.message, 3);
      } else {
        yield put(AdminProductActions.getProductSucceed(productInfor.data));
      }
    } catch (error) {
      yield put(AdminProductActions.getProductRequestFailed(error));
    }
  },

  *getProductDetailInfor(action) {
    console.log(action)
    try {
      const productInfor = yield call(() => {
        return axios.get(`http://localhost:3001/product/getinfobyid?idProduct=${action.data.idProduct}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': window.localStorage.getItem("x-access-token"),
          },
        });
      });
      console.log('infor',productInfor);
      if (!productInfor.data.success) {
        yield put(AdminProductActions.getProductDetailAminRequestFailed(productInfor.data));
        message.error(productInfor.data.message, 3);
      } else {
        yield put(AdminProductActions.getProductDetailAdminSucceed(productInfor.data));
      }
    } catch (error) {
      yield put(AdminProductActions.getProductDetailRequestAdminFailed(error));
    }
  },

  *updateProduct(action) {
    console.log(action)
    try {
      const productInfor = yield call(() => {
        return axios.put(`http://localhost:3001/product/updateProduct?idProduct=${action.data.params.idProduct}`, action.data.params,{
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': window.localStorage.getItem("x-access-token"),
          },
        });
      });
      console.log('infor',productInfor);
      if (!productInfor.data.success) {
        yield put(AdminProductActions.updateProductRequestFailed(productInfor.data));
        message.error(productInfor.data.message, 3);
      } else {
        action.data.callback();
        console.log(productInfor.data.message)
        yield put(AdminProductActions.updateProductSucceed(action.data));
        message.success(productInfor.data.message, 3);
        console.log(productInfor.data.message)
      }
    } catch (error) {
      yield put(AdminProductActions.updateProductRequestFailed(error));
    }
  },
};

export default AdminProductSagas;
