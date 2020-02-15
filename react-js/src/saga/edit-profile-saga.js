import { put, call } from 'redux-saga/effects'
import EditActions from '../redux/edit-profile'
import { message } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios'

const EditProfileSagas = {
    * editProfile(action) {
        try {
            const editInfor = yield call(async() => {
                return await axios.post('http://localhost:3001/user/saveinformation', action.data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': window.localStorage.getItem("x-access-token"),
                    },
                })
            })
            console.log(editInfor)
            if (!editInfor.data.success) {
                yield put(EditActions.editFailed(editInfor.data))
                message.error(editInfor.data.message, 3)
            } else {
                yield put(EditActions.editSucceed(editInfor.data))
                message.success(editInfor.data.message, 2)
            }
        } catch (error) {
            yield put(EditActions.editFailed(error))
        }
    },

    * changeAvatar(action) {
        try {
            const changeAvatarInfor = yield call(async() => {
                return await axios.post('http://localhost:3001/user/changeavatar', action.data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': window.localStorage.getItem("x-access-token"),
                    },
                })
            })
            console.log(changeAvatarInfor)
            if (!changeAvatarInfor.data.success) {
                yield put(EditActions.uploadFailed(changeAvatarInfor.data))
                message.error(changeAvatarInfor.data.message, 3)
            } else {
                yield put(EditActions.uploadSucceed(changeAvatarInfor.data))
                message.success(changeAvatarInfor.data.message, 2)
            }
        } catch (error) {
            yield put(EditActions.uploadFailed(error))
        }
    }
}

export default EditProfileSagas