import { put, call } from 'redux-saga/effects'
import LoginActions from '../redux/login-redux'
import axios from 'axios'

const LoginSagas = {
  *loginUser(action) {
    console.log('ac',action)
    try {
      const userInfor = yield call(() => {
        return axios.post('http://localhost:3001/auth/login', action.data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      })
      console.log(userInfor)
      if (!userInfor.data.success) {
        yield put(LoginActions.loginFailed(userInfor.data.ErrorCode))
      } else {
        console.log(userInfor.data.accessToken)
        yield window.localStorage.setItem('x-access-token', userInfor.data.accessToken)
        yield put(LoginActions.loginSucceed())
      }
    } catch (error) {
      yield put(LoginActions.loginFailed(error))
    }
  },

  *signUpUser(action) {
    console.log('12312',action)
    try {
      const signUpUser = yield call(() => {
        return axios.post('http://localhost:3001/auth/register', action.data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      })
      console.log(signUpUser)
      if (!signUpUser.data.success) {
        yield put(LoginActions.signUpFailed(signUpUser.data.ErrorCode))
      } else {
        yield put(LoginActions.signUpSucceed())
      }
    } catch (error) {
      yield put(LoginActions.signUpFailed(error))
    }
  },

  *forgotEmail(action) {
    console.log('forgot',action)
    try {
      const forgotEmail = yield call(() => {
        return axios.post('http://localhost:3001/auth/forgotpassword', action.data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      })
      console.log(forgotEmail)
      if (!forgotEmail.data.success) {
        yield put(LoginActions.forgotFailed(forgotEmail.data.ErrorCode))
      } else {
        yield put(LoginActions.forgotSucceed(forgotEmail.data.message))
      }
    } catch (error) {
      yield put(LoginActions.forgotFailed(error))
    }
  }
}

export default LoginSagas