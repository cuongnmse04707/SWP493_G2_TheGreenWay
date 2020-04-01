import React, { Component } from 'react';
import "../css/order-history-detail.css";
import { connect } from "react-redux";
import NavBar from "../components/NavBar";
import { InputNumber, Modal, Select, Input, Table, Button } from "antd";
import UserLikeProductTypes from "../redux/user-product-like-redux";
import ProductDetailTypes from "../redux/product-detail-redux";

class OrderHistoryDetail extends Component {

  componentDidMount() {
    const params = {
      page: 1
    }
    this.props.getProductLike(params)
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
        title: 'Số lượng',
        dataIndex: 'address',
        render: (text, record) => (
          <div>
            <span>1</span>
          </div>
        )
      },
    ];

    const { likeProductInfor } = this.props
    console.log(likeProductInfor)
    return (
      <div>
        <NavBar />
        <div className="order-detail-wrapper">
            <div className="order-infor-container">
              <span style={{fontSize: "18px", fontWeight: "bold"}}>Thông tin giỏ hàng:</span>
              <div style={{display:"flex"}}>
                <span className="mr-4">Tổng số tiền:</span> <span>50000 VND</span>
              </div>
              <div style={{display:"flex"}}>
                <span className="mr-4">Địa chỉ giao hàng:</span> <span>Phú Cát Quốc Oai Hà Nội</span>
              </div>
            </div>
          <Table dataSource={likeProductInfor} columns={columns} pagination={false} rowkey="id">
          </Table>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryDetail);