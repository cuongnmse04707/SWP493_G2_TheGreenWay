import { createReducer, createActions } from "reduxsauce"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  getOrderCartRequest: ['data'],
  getOrderCartRequestFailed: ['error'],
  getOrderCartSucceed: ['data']
})

export const OrderCartTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
}

export const request = (state) => {
  return {
    ...state,
  }
}

export const geOrderCartSucceed = (state, {data}) => {
  console.log(data)
  return {
    ...state,
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
  [OrderCartTypes.GET_ORDER_CART_REQUEST]: request,
  [OrderCartTypes.GET_ORDER_CART_SUCCEED]: geOrderCartSucceed,
  [OrderCartTypes.GET_ORDER_CART_REQUEST_FAILED]: failed
})