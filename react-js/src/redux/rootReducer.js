import { combineReducers } from "redux"
import { reducer as modal } from "redux-modal"

const rootReducer = combineReducers({
  modal,
  userLogin: require('./login-redux').reducer,
  forgotPassword: require('./forgot-password-redux').reducer,
  editProfile: require('./edit-profile').reducer,
  changePass: require('./change-password-redux').reducer,
  homePage: require('./home-page-redux').reducer
})

export default rootReducer