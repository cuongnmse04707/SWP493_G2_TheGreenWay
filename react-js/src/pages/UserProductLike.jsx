import React, { Component } from 'react';
import "../css/user-product-like.css";
import { Table, Button, Pagination } from "antd";
import { connect } from "react-redux";
import UserLikeProductTypes from "../redux/user-product-like-redux";
import ProductDetailTypes from "../redux/product-detail-redux";

class UserProductLike extends Component {
  state = {
    current: 1,
  }

  componentDidMount() {
    const params = {
      page: 1
    }
    this.props.getProductLike(params)
  }

  onSelectPageChange = (page) => {
    this.setState({
      current: page
    });
    const params = {
      page: page
    }
    this.props.getProductLike(params)
  }

  toDetailProduct = (record) => {
    const params = {
      idCategory: record.CategoryID,
      id: record.ProductID
    }
    this.props.history.push(`/product-detail/${record.ProductID}`);
    this.props.getProductDetail(params)
  }
  render() {
    const columns = [
      {
        title: 'Tên Sản Phẩm',
        dataIndex: "ProductName",
        render: (text, record) => (
          <div>
            <img
              style={{ height: "80px", width: "80px", borderRadius: "5px" }}
              src={record.ImageDetail}
              alt=""
            />
            <span style={{ fontSize: "18px", marginLeft: "5%" }}>
              {record.ProductName}
            </span>
          </div>
        )
      },
      {
        title: "Giá Tiền | Số Lượng Giấy",
        dataIndex: "age",
        render: (text, record) => (
          <div>
            <span>{record.ProductPrice} VNĐ</span>
            <span className="mr-2 ml-2">|</span>
            <span>{record.ProductPrice}</span>
          </div>
        )
      },
      {
        title: 'Tùy chọn',
        dataIndex: 'address',
        render: (text, record) => (
          <Button type="primary" onClick={() => {this.toDetailProduct(record)}}>Xem chi tiết</Button>
        )
      },
    ];

    const { likeProductInfor } = this.props
    return (
      <div className="user-like">
        <div className="like-product-wrapper">
          <Table dataSource={likeProductInfor} columns={columns} pagination={false} rowkey="id">
          </Table>
        </div>
        {likeProductInfor.length !== 0 ? (
          <Pagination
            current={this.state.current}
            onChange={this.onSelectPageChange}
            total={this.props.totalPage * 10}
            style={{ display: "flex", justifyContent: "center", marginTop: "-13%" }}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    likeProductInfor: state.userProductLike.likeProductList,
    totalPage: state.userProductLike.totalPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductLike: (params) => {
      dispatch(UserLikeProductTypes.getProductLikeRequest(params));
    },
    getProductDetail: (params) => {
      dispatch(ProductDetailTypes.getProductDetailRequest(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProductLike);