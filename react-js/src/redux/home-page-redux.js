import { createReducer, createActions } from "reduxsauce"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  getInforRequest: [],
  getInforSucceed: ['data'],
  getInforFailed: ['error'],
  updateNotify: [],
})

export const HomePageTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
  notifyMessage: '',
  userInformation: ''
}

export const request = (state) => {
  return {
    ...state,
  }
}

export const getInforSucceed = (state, {data}) => {
  return {
    ...state,
    notifyMessage: data.message,
    userInformation: data
  }
}
export const updateNotify = (state) => {
  return {
    ...state,
    notifyMessage: '',
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
  [HomePageTypes.GET_INFOR_REQUEST]: request,
  [HomePageTypes.GET_INFOR_SUCCEED]: getInforSucceed,
  [HomePageTypes.GET_INFOR_FAILED]: failed,
  [HomePageTypes.UPDATE_NOTIFY]: updateNotify,
})