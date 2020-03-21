import { createReducer, createActions } from "reduxsauce"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  getIntroProductRequest: ['data'],
  getIntroProductRequestFailed: ['error'],
  getIntroProductSucceed: ['data'],
  getRecycleProductRequest: ['data'],
  getRecycleProductRequestFailed: ['error'],
  getRecycleProductSucceed: ['data']
})

export const IntroProductTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
  introProduct: [],
  recycleProduct: [],
}

export const request = (state) => {
  return {
    ...state,
  }
}

export const getIntroProductSucceed = (state, {data}) => {
  console.log(data.data)
  return {
    ...state,
    introProduct: data.data
  }
}

export const getRecycleProductSucceed = (state, {data}) => {
  console.log(data.data)
  return {
    ...state,
    recycleProduct: data.data
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
  [IntroProductTypes.GET_INTRO_PRODUCT_REQUEST]: request,
  [IntroProductTypes.GET_INTRO_PRODUCT_SUCCEED]: getIntroProductSucceed,
  [IntroProductTypes.GET_INTRO_PRODUCT_REQUEST_FAILED]: failed,
  [IntroProductTypes.GET_RECYCLE_PRODUCT_REQUEST]: request,
  [IntroProductTypes.GET_RECYCLE_PRODUCT_SUCCEED]: getRecycleProductSucceed,
  [IntroProductTypes.GET_RECYCLE_PRODUCT_REQUEST_FAILED]: failed
})