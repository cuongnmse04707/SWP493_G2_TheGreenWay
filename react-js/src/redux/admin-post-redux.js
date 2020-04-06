import { createReducer, createActions } from "reduxsauce"
import { actionChannel } from "redux-saga/effects"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  //get list post
  getListPostRequest: ['data'],
  getListPostSucceed: ['data'],
  getListPostFailed: ['error'],

  //add new post
  addNewPostRequest: ['data'],
  addNewPostSucceed: ['data'],
  addNewPostFailed: ['error'],

  // get detail of post
  getPostDetailRequest: ['data'],
  getPostDetailSucceed: ['data'],
  getPostDetailFailed: ['error'],

  //update post
  updatePostRequest: ['data'],
  updatePostSucceed: ['data'],
  updatePostFailed: ['error'],

  //change avatar image of post
  changeAvatarImage: ['data'],
})

export const AdminPostTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
  listPost: [],
  totalPage: 0,
  postDetail: ''
}

export const request = (state) => {
  return {
    ...state,
  }
}

export const getPostSucceed = (state, { data }) => {
  console.log('post data', data)
  return {
    ...state,
    listPost: data.data,
    totalPage: data.totalPage
  }
}

export const addNewPostSucceed = (state, { data }) => {
  console.log('data', data)
  return {
    ...state,
  }
}


export const getPostDetailSucceed = (state, { data }) => {
  console.log('post data', data)
  return {
    ...state,
    postDetail: data.data
  }

}

export const updatePostSucceed = (state, { data }) => {
  console.log('post data', data)
  return {
    ...state,
    listPost: state.listPost.map((el) => {
      if (el.PostID === data.params.idPost) {
        return {
          ...el,
          Title: data.params.Title,
          Content: data.params.Content,
          ImageDetail: data.params.ImageDetail,
        };
      }
      return el;
    }),
  }
}

export const changeAvatarImage = (state, { data }) => {
  console.log(data)
  return {
    ...state,
    postDetail: {
      ...state.postDetail,
      ImageDetail: data
    }
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
  [AdminPostTypes.GET_LIST_POST_SUCCEED]: getPostSucceed,
  [AdminPostTypes.GET_LIST_POST_FAILED]: failed,
  [AdminPostTypes.ADD_NEW_POST_REQUEST]: request,
  [AdminPostTypes.ADD_NEW_POST_SUCCEED]: addNewPostSucceed,
  [AdminPostTypes.ADD_NEW_POST_FAILED]: failed,
  [AdminPostTypes.GET_POST_DETAIL_REQUEST]: request,
  [AdminPostTypes.GET_POST_DETAIL_SUCCEED]: getPostDetailSucceed,
  [AdminPostTypes.GET_POST_DETAIL_FAILED]: failed,
  [AdminPostTypes.UPDATE_POST_REQUEST]: request,
  [AdminPostTypes.UPDATE_POST_SUCCEED]: updatePostSucceed,
  [AdminPostTypes.UPDATE_POST_FAILED]: failed,
  [AdminPostTypes.CHANGE_AVATAR_IMAGE]: changeAvatarImage,
})