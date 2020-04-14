import { put, call } from 'redux-saga/effects'
import ForgotActions from '../redux/forgot-password-redux'
import { message } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios'
const Cryptr = require("cryptr");
const cryptr = new Cryptr("thegreenway");
const ResetPassword = {
  *resetPassword(action) {
    try {
      const resetInfor = yield call(async () => {
        return await axios.post(
          "http://localhost:3001/auth/resetpassword",
          {
            ...action.data,
            password: cryptr.encrypt(action.data.password),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      });
      if (!resetInfor.data.success) {
        yield put(ForgotActions.resetFailed(resetInfor.data));
        message.error(resetInfor.data.message, 3);
      } else {
        yield put(ForgotActions.resetSucceed(resetInfor.data))
        message.success("Đặt lại mật khẩu thành công", 3)
      }
    } catch (error) {
      yield put(ForgotActions.resetFailed(error));
    }
  },
};

export default ResetPassword;
