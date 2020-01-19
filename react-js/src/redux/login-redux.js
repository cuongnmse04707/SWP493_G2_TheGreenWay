import { createReducer, createActions } from "reduxsauce"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  loginRequest: ['data'],
  loginSucceed: ['data'],
  loginFailed: ['error'],
  signUpRequest: ['data'],
  signUpSucceed: [],
  signUpFailed: ['error'],
  forgotRequest: ['data'],
  forgotSucceed: ['message'],
  forgotFailed: ['error'],
  logout: [],
})

export const LoginTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
  errorCode: '',
  processing: false,
  forgotMessage: '',
  forgotMessageError: '',
  loginSuccess: false
}

export const request = (state) => {
  return {
    ...state,
    processing: true
  }
}

export const loginSucceed = (state, {data}) => {
  return {
    ...state,
    processing: false,
    loginSuccess: data.success
  }
}

export const signUpSucceed = (state) => {
  return {
    ...state,
    processing: false
  }
}

export const forgotSucceed = (state, {message}) => {
  return {
    ...state,
    processing: false,
    forgotMessage: message
  }
}

export const logout = (state) => {
  return {
    ...state,
    processing: false
  }
}

export const failed = (state, { error }) => {
  console.log(error)
  return {
    ...state,
    processing: false,
    errorCode: error,
    forgotMessage: error,
    loginSuccess: error.success
  }
}

//TODO:Hookup Reducers To Types in Action
export const reducer = createReducer(INITIAL_STATE, {
  [LoginTypes.LOGIN_REQUEST]: request,
  [LoginTypes.LOGIN_SUCCEED]: loginSucceed,
  [LoginTypes.LOGIN_FAILED]: failed,
  [LoginTypes.SIGN_UP_REQUEST]: request,
  [LoginTypes.SIGN_UP_SUCCEED]: signUpSucceed,
  [LoginTypes.SIGN_UP_FAILED]: failed,
  [LoginTypes.FORGOT_REQUEST]: request,
  [LoginTypes.FORGOT_SUCCEED]: forgotSucceed,
  [LoginTypes.FORGOT_FAILED]: failed,
  [LoginTypes.LOGOUT]: logout
})