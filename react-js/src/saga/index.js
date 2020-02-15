import { takeLatest, all } from 'redux-saga/effects'
import { LoginTypes } from '../redux/login-redux'
import { ForgotTypes } from '../redux/forgot-password-redux'
import { HomePageTypes } from '../redux/home-page-redux'
import { EditTypes } from '../redux/edit-profile'
import { ChangePassTypes } from '../redux/change-password-redux'
import LoginSagas from './login-saga'
import ResetPassword from './reset-password'
import HomePageSagas from './home-page-saga'
import EditProfileSagas from './edit-profile-saga'
import ChangePassSagas from './change-password-saga'

export default function* root() {
    yield all([
        takeLatest(LoginTypes.LOGIN_REQUEST, LoginSagas.loginUser),
        takeLatest(LoginTypes.SIGN_UP_REQUEST, LoginSagas.signUpUser),
        takeLatest(LoginTypes.FORGOT_REQUEST, LoginSagas.forgotEmail),
        takeLatest(ForgotTypes.RESET_REQUEST, ResetPassword.resetPassword),
        takeLatest(HomePageTypes.GET_INFOR_REQUEST, HomePageSagas.userInformation),
        takeLatest(EditTypes.EDIT_REQUEST, EditProfileSagas.editProfile),
        takeLatest(EditTypes.UPLOAD_REQUEST, EditProfileSagas.changeAvatar),
        takeLatest(ChangePassTypes.CHANGE_REQUEST, ChangePassSagas.changePass),
    ])
}