import { createReducer, createActions } from "reduxsauce"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  getLifeWayRequest: ['data'],
  getLifeWayRequestFailed: ['error'],
  getLifeWaySucceed: ['data']
})

export const LifeWayTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
  postInfor: [],
  totalPostPage: 0
}

export const request = (state) => {
  return {
    ...state,
  }
}

export const getLifeWaySucceed = (state, {data}) => {
  console.log('response data',data)
  return {
    ...state,
    postInfor: data.data
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
  [LifeWayTypes.GET_LIFE_WAY_REQUEST]: request,
  [LifeWayTypes.GET_LIFE_WAY_SUCCEED]: getLifeWaySucceed,
  [LifeWayTypes.GET_LIFE_WAY_REQUEST_FAILED]: failed,
})