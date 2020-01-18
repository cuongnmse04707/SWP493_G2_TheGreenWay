import { createReducer, createActions } from "reduxsauce"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  loginRequest: ['data'],
  loginSucceed: [],
  loginFailed: ['error'],
  signUpRequest: [],
  signUpSucceed: [],
  signUpFailed: ['error'],
  logout: [],
})

export const LoginTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
  errorCode: '',
  processing: false
}

export const request = (state) => {
  return {
    ...state,
    processing: true
  }
}

export const loginSucceed = (state) => {
  return {
    ...state,
    processing: false
  }
}

export const signUpSucceed = (state) => {
  return {
    ...state,
    processing: false
  }
}

export const logout = (state) => {
  return {
    ...state,
    processing: false
  }
}

export const failed = (state, { error }) => {
  return {
    ...state,
    processing: false,
    errorCode: error
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
  [LoginTypes.LOGOUT]: logout
})