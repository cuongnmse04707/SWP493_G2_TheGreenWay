import { createReducer, createActions } from "reduxsauce"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
    editRequest: ['data'],
    editSucceed: ['data'],
    editFailed: ['error'],
    uploadRequest: ['data'],
    uploadSucceed: ['data'],
    uploadFailed: ['error'],
    updateNotify: [],
})

export const EditTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
    notifyMessage: ''
}

export const request = (state) => {
    return {
        ...state,
    }
}

export const editSucceed = (state, { data }) => {
    console.log(data)
    return {
        ...state,
        notifyMessage: data.message
    }
}

export const uploadSucceed = (state, { data }) => {
    console.log(data)
    return {
        ...state,
        notifyMessage: data.message
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
    [EditTypes.EDIT_REQUEST]: request,
    [EditTypes.EDIT_SUCCEED]: editSucceed,
    [EditTypes.EDIT_FAILED]: failed,
    [EditTypes.UPLOAD_REQUEST]: request,
    [EditTypes.UPLOAD_SUCCEED]: uploadSucceed,
    [EditTypes.UPLOAD_FAILED]: failed,
    [EditTypes.UPDATE_NOTIFY]: updateNotify,
})