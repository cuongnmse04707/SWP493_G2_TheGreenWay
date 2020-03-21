import { put, call } from "redux-saga/effects";
import PaperConventionActions from "../redux/paper-conversion-redux";
import { message } from "antd";
import axios from "axios";

const PaperConvensionSagas = {
  *getConvensionRate() {
    try {
      const convensionInfor = yield call(() => {
        return axios.get(`http://localhost:3001/conversion/getListConversion`, {
          headers: {
            'Content-Type': 'application/json',

          },
        });
      });
      console.log(convensionInfor);
      if (!convensionInfor.data.success) {
        yield put(PaperConventionActions.getConvensionRequestFailed(convensionInfor.data));
        message.error(convensionInfor.data.message, 3);
      } else {
        yield put(PaperConventionActions.getConvensionSucceed(convensionInfor.data));
      }
    } catch (error) {
      yield put(PaperConventionActions.getConvensionRequestFailed(error));
    }
  },
};

export default PaperConvensionSagas;
