import { createReducer, createActions } from "reduxsauce"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  getUserOrderRequest: ['data'],
  getUserOrderRequestFailed: ['error'],
  getUserOrderSucceed: ['data'],
})

export const UserOrderHistoryTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
  orderCardList: [],
  totalPage : 0
}

export const request = (state) => {
  return {
    ...state,
  }
}

export const getUserOrderSucceed = (state, {data}) => {
  console.log('response data',data)
  return {
    ...state,
    orderCardList: data.data,
    totalPage: data.totalPage
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
  [UserOrderHistoryTypes.GET_USER_ORDER_REQUEST]: request,
  [UserOrderHistoryTypes.GET_USER_ORDER_SUCCEED]: getUserOrderSucceed,
  [UserOrderHistoryTypes.GET_USER_ORDER_REQUEST_FAILED]: failed
})