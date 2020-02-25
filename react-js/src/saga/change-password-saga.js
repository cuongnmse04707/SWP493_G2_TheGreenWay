import { put, call } from 'redux-saga/effects'
import ChangeActions from '../redux/change-password-redux'
import { message } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios'

const ChangePassSagas = {
  *changePass(action) {
    console.log(action)
    try {
      const passInfor = yield call(async() => {
         return await axios.post('http://localhost:3001/user/changepassword', action.data, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': window.localStorage.getItem("x-access-token"),
          },
        })
      })
      console.log(passInfor)
      if (!passInfor.data.success) {
        yield put(ChangeActions.changeFailed(passInfor.data))
        message.error(passInfor.data.message, 3)
      } else {
        yield put(ChangeActions.changeSucceed(passInfor.data))
        message.success(passInfor.data.message,2)
        console.log(passInfor.data.message)
      }
    } catch (error) {
      yield put(ChangeActions.changeFailed(error))
    }
  },
}

export default ChangePassSagas