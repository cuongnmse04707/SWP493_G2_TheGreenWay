import { combineReducers } from "redux"
import { reducer as modal } from "redux-modal"

const rootReducer = combineReducers({
  modal,
  userLogin: require('./login-redux').reducer,
  forgotPassword: require('./forgot-password-redux').reducer
})

export default rootReducer