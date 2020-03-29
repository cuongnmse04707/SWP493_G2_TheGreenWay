import { takeLatest, all } from "redux-saga/effects";
import { LoginTypes } from "../redux/login-redux";
import { ForgotTypes } from "../redux/forgot-password-redux";
import { HomePageTypes } from "../redux/home-page-redux";
import { EditTypes } from "../redux/edit-profile";
import { ChangePassTypes } from "../redux/change-password-redux";
import { IntroProductTypes } from "../redux/get-intro-product-redux";
import { ConvensionTypes } from "../redux/paper-conversion-redux";
import { ProductDetailTypes } from "../redux/product-detail-redux";
import { LifeWayTypes } from "../redux/life-way-redux";
import LoginSagas from "./login-saga";
import ResetPassword from "./reset-password";
import HomePageSagas from "./home-page-saga";
import EditProfileSagas from "./edit-profile-saga";
import ChangePassSagas from "./change-password-saga";
import IntroProductSagas from "./intro-product-saga";
import PaperConvensionSagas from "./paper-convension-saga";
import ProductDetailSagas from "./product-detail-saga";
import LifeWaySagas from "./life-way-saga";

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
    takeLatest(
      IntroProductTypes.GET_INTRO_PRODUCT_REQUEST,
      IntroProductSagas.getIntroProduct
    ),
    takeLatest(
      IntroProductTypes.GET_RECYCLE_PRODUCT_REQUEST,
      IntroProductSagas.getRecycleProduct
    ),
    takeLatest(
      ConvensionTypes.GET_CONVENSION_REQUEST,
      PaperConvensionSagas.getConvensionRate
    ),
    takeLatest(
      ProductDetailTypes.GET_PRODUCT_DETAIL_REQUEST,
      ProductDetailSagas.getProductDetail
    ),
    takeLatest(LifeWayTypes.GET_LIFE_WAY_REQUEST, LifeWaySagas.getPostInfor),
    takeLatest(
      IntroProductTypes.UPDATE_LIKE_PRODUCT,
      IntroProductSagas.updateLikeProduct
    ),
    takeLatest(
      IntroProductTypes.SEARCH_DEFAULT,
      IntroProductSagas.searchDefault
    ),
    takeLatest(IntroProductTypes.SEARCH_HIGH, IntroProductSagas.searchHigh),
    takeLatest(LifeWayTypes.GET_LIFE_WAY_REQUEST, LifeWaySagas.getPostInfor),
    takeLatest(
      LifeWayTypes.GET_LIFE_WAY_DETAIL_REQUEST,
      LifeWaySagas.getPostDetailInfor
    )
  ]);
}
//     yield all([
//         takeLatest(LoginTypes.LOGIN_REQUEST, LoginSagas.loginUser),
//         takeLatest(LoginTypes.SIGN_UP_REQUEST, LoginSagas.signUpUser),
//         takeLatest(LoginTypes.FORGOT_REQUEST, LoginSagas.forgotEmail),
//         takeLatest(ForgotTypes.RESET_REQUEST, ResetPassword.resetPassword),
//         takeLatest(HomePageTypes.GET_INFOR_REQUEST, HomePageSagas.userInformation),
//         takeLatest(EditTypes.EDIT_REQUEST, EditProfileSagas.editProfile),
//         takeLatest(EditTypes.UPLOAD_REQUEST, EditProfileSagas.changeAvatar),
//         takeLatest(ChangePassTypes.CHANGE_REQUEST, ChangePassSagas.changePass),
//         takeLatest(IntroProductTypes.GET_INTRO_PRODUCT_REQUEST, IntroProductSagas.getIntroProduct),
//         takeLatest(IntroProductTypes.GET_RECYCLE_PRODUCT_REQUEST, IntroProductSagas.getRecycleProduct),
//         takeLatest(ConvensionTypes.GET_CONVENSION_REQUEST, PaperConvensionSagas.getConvensionRate),
//         takeLatest(ProductDetailTypes.GET_PRODUCT_DETAIL_REQUEST, ProductDetailSagas.getProductDetail),
//         takeLatest(LifeWayTypes.GET_LIFE_WAY_REQUEST, LifeWaySagas.getPostInfor),
//         takeLatest(LifeWayTypes.GET_LIFE_WAY_DETAIL_REQUEST, LifeWaySagas.getPostDetailInfor),
//     ])
// }
