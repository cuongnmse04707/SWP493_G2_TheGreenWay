import { takeLatest, all } from 'redux-saga/effects'
import { LoginTypes } from '../redux/login-redux'
import { ForgotTypes } from '../redux/forgot-password-redux'
import LoginSagas from './login-saga'
import ResetPassword from './reset-password'
//import ErrorSagas from './error-saga'

export default function* root() {
  yield all([
    takeLatest(LoginTypes.LOGIN_REQUEST, LoginSagas.loginUser),
    //takeLatest(LoginTypes.LOGIN_FAILED, ErrorSagas.handleError),
    takeLatest(LoginTypes.SIGN_UP_REQUEST, LoginSagas.signUpUser),
    takeLatest(LoginTypes.FORGOT_REQUEST, LoginSagas.forgotEmail),
    takeLatest(ForgotTypes.RESET_REQUEST, ResetPassword.resetPassword),
  ])
}