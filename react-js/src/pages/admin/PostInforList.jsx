import React, { Component } from 'react';
import '../../css/admin-post-infor.css';
import { connect } from "react-redux";
import AdminPostTypes from "../../redux/admin-post-redux";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Upload,
  Icon,
  message,
  Modal,
  Select,
  Row,
  Col,
  Table,
  Pagination
} from 'antd';

var moment = require("moment");
class PostInforList extends Component {
  state = {
    current: 1,
  };

  componentDidMount() {
    const params = {
      page: 1
    };
    this.props.getProductList(params)
  }

  onSelectPageChange = page => {
    this.setState({
      current: page
    });
    const params = {
      page: page
    };
    this.props.getProductList(params)
  };

  render() {
    const { listPost, totalPage } = this.props

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        render: (text, record) => (
          <div>
            <span>{record.PostID}</span>
          </div>
        )
      },
      {
        title: 'Tiêu Đề',
        dataIndex: "Title",
        render: (text, record) => (
          <div>
            <img
              style={{ height: "80px", width: "80px", borderRadius: "5px" }}
              src={record.ImageDetail}
              alt=""
            />
            <span style={{ fontSize: "18px", marginLeft: "5%" }}>
              {record.Title}
            </span>
          </div>
        )
      },
      {
        title: "Lượt thích",
        dataIndex: "age",
        render: (text, record) => (
          <div>
            <span>{record.NumberOfLikes}</span>
          </div>
        )
      },
      {
        title: "Ngày tạo",
        dataIndex: "numLike",
        render: (text, record) => (
          <div>
            <span>{moment(record.CreateDate).format("DD/MM/YYYY")}</span>
          </div>
        )
      },
      {
        title: 'Tùy chọn',
        dataIndex: 'address',
        render: (text, record) => (
          <div>
            <Button type="primary" className="mr-3" onClick={() => { this.viewProductDetail(record.ProductID) }}>Chỉnh sửa</Button>
          </div>
        )
      },
    ];
    return (
      <div className="admin-post-wrapper">
        <p className="title">Thông tin bài viết</p>
        <div className="admin-product-table">
          <Table dataSource={listPost} columns={columns} pagination={false} rowkey="id" />
        </div>
        <Pagination
          current={this.state.current}
          onChange={this.onSelectPageChange}
          total={totalPage * 10}
          style={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    listPost: state.adminPost.listPost,
    totalPage: state.adminPost.totalPage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductList: (params) => {
      dispatch(AdminPostTypes.getListPostRequest(params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostInforList);