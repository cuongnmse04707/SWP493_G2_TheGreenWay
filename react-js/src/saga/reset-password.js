import { put, call } from 'redux-saga/effects'
import ForgotActions from '../redux/forgot-password-redux'
import axios from 'axios'

const ResetPassword = {
  *resetPassword(action) {
    console.log('ac',action)
    try {
      const resetInfor = yield call(() => {
        return axios.post('http://localhost:3001/auth/resetpassword', action.data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      })
      console.log(resetInfor)
      if (!resetInfor.data.success) {
        yield put(ForgotActions.resetFailed(resetInfor.data.message))
      } else {
        yield put(ForgotActions.resetSucceed())
      }
    } catch (error) {
      yield put(ForgotActions.resetFailed(error))
    }
  },
}

export default ResetPassword