import { createReducer, createActions } from "reduxsauce"
import { actionChannel } from "redux-saga/effects"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  getListPostRequest: ['data'],
  getListPostSucceed: ['data'],
  getListPostFailed: ['error'],
})

export const AdminPostTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
  listPost: [],
  totalPage: 0
}

export const request = (state) => {
  return {
    ...state,
  }
}

export const getPostSucced = (state, {data}) => {
  console.log('post data',data)
  return {
    ...state,
    listPost: data.data,
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
  [AdminPostTypes.GET_LIST_POST_REQUEST]: request,
  [AdminPostTypes.GET_LIST_POST_SUCCEED]: getPostSucced,
  [AdminPostTypes.GET_LIST_POST_FAILED]: failed,
})