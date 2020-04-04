import { createReducer, createActions } from "reduxsauce"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  getProductRequest: ['data'],
  getProductRequestFailed: ['error'],
  getProductSucceed: ['data'],
  getProductDetailAdminRequest: ['data'],
  getProductDetailAdminRequestFailed: ['error'],
  getProductDetailAdminSucceed: ['data'],
  updateProductRequest: ['data'],
  updateProductRequestFailed: ['error'],
  updateProductSucceed: ['data'],
})

export const AdminProductTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
  productList: [],
  productDetail: '',
  imageDetail: []
}

export const request = (state) => {
  return {
    ...state,
  }
}

export const getProductSucceed = (state, {data}) => {
  console.log('data',data)
  return {
    ...state,
    productList: data.data,
  }
}

export const getProductDetailSucceed = (state, {data}) => {
  console.log('data',data)
  return {
    ...state,
    productDetail: data.data,
    imageDetail: data.images
  }
}

export const updateProductSucceed = (state, {data}) => {
  console.log('data',data)
  return {
    ...state,
    // productDetail: data.data,
    // imageDetail: data.images
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
  [AdminProductTypes.GET_PRODUCT_REQUEST]: request,
  [AdminProductTypes.GET_PRODUCT_SUCCEED]: getProductSucceed,
  [AdminProductTypes.GET_PRODUCT_REQUEST_FAILED]: failed,
  [AdminProductTypes.GET_PRODUCT_DETAIL_ADMIN_REQUEST]: request,
  [AdminProductTypes.GET_PRODUCT_DETAIL_ADMIN_SUCCEED]: getProductDetailSucceed,
  [AdminProductTypes.GET_PRODUCT_DETAIL_ADMIN_REQUEST_FAILED]: failed,
  [AdminProductTypes.UPDATE_PRODUCT_REQUEST]: request,
  [AdminProductTypes.UPDATE_PRODUCT_SUCCEED]: updateProductSucceed,
  [AdminProductTypes.UPDATE_PRODUCT_REQUEST_FAILED]: failed,
})