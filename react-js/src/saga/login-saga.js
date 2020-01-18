import { put, call } from 'redux-saga/effects'
import LoginActions from '../redux/login-redux'
import axios from 'axios'

const LoginSagas = {
  *loginUser(action) {
    try {
      const userInfor = yield call(() => {
        return axios.post('api', action.data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      })
      if (!userInfor.data.status) {
        yield put(LoginActions.loginFailed(userInfor.data.ErrorCode))
      } else {
        yield window.localStorage.setItem('x-access-token', userInfor.data.data.token)
        yield put(LoginActions.loginSucceed())
      }
    } catch (error) {
      yield put(LoginActions.loginFailed(error))
    }
  },

  *signUpUser(action) {
    try {
      const signUpUser = yield call(() => {
        return axios.post('api', action.data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      })
      if (!signUpUser.data.status) {
        yield put(LoginActions.signUpFailed(signUpUser.data.ErrorCode))
      } else {
        yield put(LoginActions.signUpSucceed())
      }
    } catch (error) {
      yield put(LoginActions.signUpFailed(error))
    }
  }
}

export default LoginSagas