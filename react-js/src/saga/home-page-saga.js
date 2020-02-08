import { put, call } from 'redux-saga/effects'
import HomePageActions from '../redux/home-page-redux'
import { message } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios'

const HomePageSagas = {
  *userInformation() {
    try {
      const userInfor = yield call(async() => {
         return await axios.get('http://localhost:3001/user/information',{
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': window.localStorage.getItem("x-access-token"),
          },
        })
      })
      console.log(userInfor)
      if (!userInfor.data.success) {
        yield put(HomePageActions.getInforFailed(userInfor.data.message))
        message.error(userInfor.data.message, 3)
      } else {
        yield put(HomePageActions.getInforSucceed(userInfor.data.data))
      }
    } catch (error) {
      yield put(HomePageActions.getInforFailed(error))
    }
  },


}

export default HomePageSagas