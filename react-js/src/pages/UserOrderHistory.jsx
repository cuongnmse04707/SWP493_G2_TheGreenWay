import React, { Component } from 'react';
import "../css/user-order-history.css";
import { Table, Button, Pagination } from "antd";
import UserOrderHistoryTypes from "../redux/user-order-history-redux";
import { connect } from "react-redux";

const { Column, ColumnGroup } = Table;
var moment = require("moment");
class UserOrderHistory extends Component {
  state = {
    current: 1,
  }

  componentDidMount() {
    const params = {
      page: 1
    }
    this.props.getOrderCart(params)
  }

  toDetailCart = (record) => {
    console.log(record)
  }

  onSelectPageChange = (page) => {
    console.log(page)
    this.setState({
      current: page
    });
    const params = {
      page: page
    }
    this.props.getOrderCart(params)
  }
  render() {
    const columns = [
      {
        title: 'OrderId',
        dataIndex: "index",
        render: (text, record) => (
          <div>
            <span style={{ fontSize: "18px", marginLeft: "5%" }}>
              {record.OrderID}
            </span>
          </div>
        )
      },
      {
        title: "Tổng số tiền",
        dataIndex: "totalMoney",
        render: (text, record) => (
          <div>
            <span>{record.TotalPrice} VNĐ</span>
          </div>
        )
      },
      {
        title: 'Tiền mặt',
        dataIndex: 'money',
        render: (text, record) => (
          <div>
            <span>{record.Cash} VNĐ</span>
          </div>
        )
      },
      {
        title: 'Giấy',
        dataIndex: 'paper',
        render: (text, record) => (
          <div>
            <span>{record.QuantityPaper} Kg</span>
          </div>
        )
      },
      {
        title: 'Ngày mua',
        dataIndex: 'date',
        render: (text, record) => (
          <div>
            <span>{record.CreateDate.split('T')[0]}</span>
          </div>
        )
      },
      {
        title: 'Ngày nhận hàng',
        dataIndex: 'endDate',
        render: (text, record) => (
          <div>
            <span>{record.EndDate}</span>
          </div>
        )
      },
      {
        title: 'Tình trạng',
        dataIndex: 'status',
        render: (text, record) => (
          <div>
            <span>{record.Description}</span>
          </div>
        )
      },
      {
        title: 'Tùy chọn',
        dataIndex: 'detail',
        render: (text, record) => (
          <Button type="primary" onClick={() => { this.toDetailCart(record) }}>Xem chi tiết</Button>
        )
      },
    ];
    const { orderHistoryInfor } = this.props
    console.log(orderHistoryInfor)
    return (
      <div className="user-order">
        <div className="user-order-wrapper">
          <Table dataSource={orderHistoryInfor} columns={columns} pagination={false} rowkey="id">
          </Table>
        </div>
        {orderHistoryInfor.length !== 0 ? (
          <Pagination
            current={this.state.current}
            onChange={this.onSelectPageChange}
            total={this.props.totalPage * 10}
            style={{ display: "flex", justifyContent: "center", marginTop: "3%" }}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orderHistoryInfor: state.userOrderHistory.orderCardList,
    totalPage: state.userOrderHistory.totalPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderCart: (params) => {
      dispatch(UserOrderHistoryTypes.getUserOrderRequest(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOrderHistory);