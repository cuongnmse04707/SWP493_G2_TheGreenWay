import { createReducer, createActions } from "reduxsauce"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  getConvensionRequest: ['data'],
  getConvensionRequestFailed: ['error'],
  getConvensionSucceed: ['data']
})

export const ConvensionTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
  convensionRate: ''
}

export const request = (state) => {
  return {
    ...state,
  }
}

export const getConvensionSucceed = (state, {data}) => {
  return {
    ...state,
    convensionRate: data.ConversionWorking.PaperPrice
  }
}
export const failed = (state, { error }) => {
  console.log(error)
  return {
    ...state,
  }
}

//TODO:Hookup Reducers To Types in Action
export const reducer = createReducer(INITIAL_STATE, {
  [ConvensionTypes.GET_CONVENSION_REQUEST]: request,
  [ConvensionTypes.GET_CONVENSION_SUCCEED]: getConvensionSucceed,
  [ConvensionTypes.GET_CONVENSION_REQUEST_FAILED]: failed
})