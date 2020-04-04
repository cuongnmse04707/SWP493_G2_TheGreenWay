import { createReducer, createActions } from "reduxsauce";

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  getUserRequest: ["data"],
  getUserSucceed: ["data"],
  getUserFailed: ["error"],
});

export const ModTypes = Types;
export default Creators;

//TODO: Declare initial state
export const INITIAL_STATE = {
  listUser: [],
};

export const request = (state) => {
  return {
    ...state,
    notifyMessage: "",
  };
};

export const getUserSuccee = (state, { data }) => {
  console.log("data: ", data);
  //   return {
  //     ...state,
  //     loginSuccess: data.success,
  //     notifyMessage: data.success,
  //   };
};

export const updateNotify = (state) => {
  //   return {
  //     ...state,
  //     notifyMessage: "",
  //     registerSuccess: false,
  //     loginSucceess: false,
  //     forgotSuccess: false,
  //   };
};

export const failed = (state, { error }) => {
  //   return {
  //     ...state,
  //     forgotMessage: error,
  //     loginSuccess: error.success,
  //     registerSuccess: error.success,
  //   };
};

//TODO:Hookup Reducers To Types in Action
export const reducer = createReducer(INITIAL_STATE, {
  [ModTypes.GET_USER_REQUEST]: request,
  [ModTypes.GET_USER_SUCCEED]: getUserSuccee,
  [ModTypes.GET_USER_FAILED]: failed,
});
