import { createReducer, createActions } from "reduxsauce"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  resetRequest: ['data'],
  resetSucceed: [],
  resetFailed: ['error'],
})

export const ForgotTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
  resetMessage: ''
}

export const request = (state) => {
  return {
    ...state,

  }
}

export const resetSucceed = (state) => {
  return {
    ...state,
  }
}

export const failed = (state, { error }) => {
  
  return {
    ...state,
    errorCode: error,
    resetMessage: error
  }
}

//TODO:Hookup Reducers To Types in Action
export const reducer = createReducer(INITIAL_STATE, {
  [ForgotTypes.RESET_REQUEST]: request,
  [ForgotTypes.RESET_SUCCEED]: resetSucceed,
  [ForgotTypes.RESET_FAILED]: failed,
})