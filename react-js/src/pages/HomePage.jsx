import React, { Component } from 'react';
import '../css/login.css';
import Menu from '../components/Menu';
import { Form, Icon, Input, Modal, message } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router'

class HomePage extends Component {
  clearStorage() {
    window.localStorage.removeItem('x-access-token')
    window.location.href = '/'
  }

  getData = async (roomChat) => {
    try{
        const result = await fetch(`http://localhost:3001/demogetdata/friends`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'x-access-token': window.localStorage.getItem("x-access-token"),
            },

            // credentials:'include', Do cai cors ben server de trong nen ben nay ko can phai ghi vao
        }).then((res)=>{return res.json();})

         console.log(result); // data tra ve


    }catch(error){
        window.alert(error.message);
    }
};

  // componentDidMount() {
  //   const result =  fetch(`http://localhost:3001/datachat`,{
  //     method: 'POST',
  //     headers: {
  //     'Content-Type': 'application/json',
  //     'x-access-token': window.localStorage.getItem("x-access-token"),
  //     },
  //     // credentials:'include', Do cai cors ben server de trong nen ben nay ko can phai ghi vao
  //  })
  //  .then((res) => { return res.json(); })


  // }
render() {
  return (
    <div className="login-container">
      <button className="btn-sign-up" onClick={this.clearStorage}>Logout</button>
      <button className="btn-sign-up" onClick={this.getData}>Get</button>
    </div >
  );
}
}


HomePage = withRouter(HomePage)
export default (HomePage)