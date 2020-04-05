import { put, call } from 'redux-saga/effects'
import AdminPostActions from '../redux/admin-post-redux'
import { message } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios'

const AdminPostSagas = {
  *getListPost(action) {
    console.log(action)
    try {
      const postInfor = yield call(() => {
        return axios.get(
          `http://localhost:3001/post/getListPost?page=${
          action.data.page
          }&email=${window.localStorage.getItem("email") || ""}`,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      });
      console.log('postInfor', postInfor)
      if (!postInfor.data.success) {
        yield put(AdminPostActions.getListPostFailed(postInfor.data));
        message.error(postInfor.data.message, 3);
      } else {
        yield put(AdminPostActions.getListPostSucceed(postInfor.data));
      }
    } catch (error) {
      yield put(AdminPostActions.getListPostFailed(error));
    }
  },
}

export default AdminPostSagas