import React, { Component } from 'react';
import { Table, Button, Pagination } from "antd";
import '../../css/user-infor-list.css';

class UserInforList extends Component {
  render() {
    const dataSource = [
      {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
    ];

    const columns = [
      {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Mail',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Ngày đăng kí',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Vai trò',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Chi tiết',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    return (
      <div className="admin-user">
        <p className="title">Thông tin người dùng:</p>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default UserInforList;