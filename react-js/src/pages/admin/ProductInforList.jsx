import React, { Component } from 'react';
import '../../css/admin-product-infor.css';
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
} from 'antd';
import { connect } from "react-redux";
import AdminProductTypes from "../../redux/admin-product-redux";
import CKEditor from 'ckeditor4-react';
import { storage } from "../../firebase";

const { Option } = Select;

function getBase64Avatar(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const beforeUpload = (file) => {
  console.log('File moi up', file)

  // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  // if (!isJpgOrPng) {
  //   message.error('You can only upload JPG/PNG file!');
  // }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  // }
  // return isJpgOrPng && isLt2M;
}

class ProductInforList extends Component {
  state = {
    visible: false,
    loading: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    productId: ''
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64Avatar(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  handleImageDetailChange = ({ fileList }) => {
    console.log(fileList)
    console.log(this.props.imageDetail)
    this.setState({ fileList })
  };

  //image detail
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleCategoryChange(value) {
    console.log(`selected ${value}`);
  }

  componentDidMount() {
    this.props.getProductList()
  }

  handleModalCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    })
  }

  viewProductDetail = (id) => {
    this.setState({
      visible: true,
      productId: id
    });
    const params = {
      idProduct: id
    }
    this.props.getProductDetail(params)
  }

  updateProductInfor = () => {
    this.setState({
      visible: false,
    });
    this.props.form.validateFieldsAndScroll(
      ["productName", "productPrice", "productQuantity", "category", "productDescription"],
      (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          //console.log(this.props.productDetail)
          const params = {

            idProduct: this.state.productId,
            CategoryID: values.category,
            ProductName: values.productName,
            ProductPrice: values.productPrice,
            Description: values.productDescription,
            Quantity: values.productQuantity,
            ImageDetail: this.props.productDetail.ImageDetail,
            CreateDate: this.props.productDetail.CreateDate

          }
          this.props.updateProduct({
            params,
            callback: () => {
              console.log(this.props)
              // this.props.productDetail.CategoryID = values.category
              // this.props.productDetail.ProductName = values.productName
              // this.props.productDetail.ProductPrice = values.productPrice
              // this.props.productDetail.Description = values.productDescription
              // this.props.productDetail.Quantity = values.productQuantity
              // console.log(this.props.productDetail)
              // this.props.history.push("/admin?page=product-infor");
            }
          })
        }
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 14 }
      },
      wrapperCol: {
        xs: { span: 22 },
        sm: { span: 22 },
        md: { span: 22 },
        lg: { span: 22 }
      }
    };
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        render: (text, record) => (
          <div>
            <span>{record.ProductID}</span>
          </div>
        )
      },
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
        title: "Giá Tiền",
        dataIndex: "age",
        render: (text, record) => (
          <div>
            <span>{record.ProductPrice} VNĐ</span>
          </div>
        )
      },
      {
        title: "Lượt thích",
        dataIndex: "numLike",
        render: (text, record) => (
          <div>
            <span>{record.NumberOfLikes}</span>
          </div>
        )
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        render: (text, record) => (
          <div>
            <span>{record.Quantity}</span>
          </div>
        )
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        render: (text, record) => (
          <div>
            <span>{record.Quantity}</span>
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
    const uploadAvatarButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadImageDetailButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    const { productList, productDetail, imageDetail } = this.props
    return (
      <div className="admin-product-wrapper">
        <p className="title">Thông tin sản phẩm</p>
        <div className="admin-product-table">
          <Table dataSource={productList} columns={columns} pagination={{ pageSize: 5 }} rowkey="id" />
        </div>
        <Modal
          visible={this.state.visible}
          onOk={this.updateProductInfor}
          onCancel={this.handleModalCancel}
          width={"80%"}
        >
          <Row>
            <Form {...formItemLayout} >
              <Col span={13}>
                <Form.Item label="Tên sản phẩm">
                  {getFieldDecorator('productName', {
                    initialValue: productDetail.ProductName,
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng nhập tên sản phẩm',
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Form.Item label="Giá sản phẩm">
                    {getFieldDecorator('productPrice', {
                      initialValue: productDetail.ProductPrice,
                      rules: [
                        {
                          required: true,
                          message: 'Vui lòng nhập giá sản phẩm',
                        },
                      ],
                    })(<InputNumber min={1} />)}
                  </Form.Item>
                  <Form.Item label="Số lượng">
                    {getFieldDecorator('productQuantity', {
                      initialValue: productDetail.Quantity,
                      rules: [
                        {
                          required: true,
                          message: 'Vui lòng nhập số lượng sản phẩm',
                        },
                      ],
                    })(<InputNumber min={1} max={10} />)}
                  </Form.Item>
                  <Form.Item label="Loại sản phẩm">
                    {getFieldDecorator('category', {
                      initialValue: productDetail.CategoryID,
                      rules: [
                        {
                          required: true,
                          message: 'Vui lòng nhập loại sản phẩm',
                        },
                      ],
                    })(
                      <Select {...this.props} style={{ width: 160 }} onChange={this.handleCategoryChange}>
                        <Option value="1">Cây văn phòng</Option>
                        <Option value="2">Đồ tái chế</Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>
                <Form.Item label="Mô tả sản phẩm">
                  {getFieldDecorator('productDescription', {
                    initialValue: productDetail.Description,
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng nhập mô tả sản phẩm',
                      },
                    ],
                  })(
                    <CKEditor data={productDetail.Description} />
                  )}
                </Form.Item></Col>
              {/* </Form>
          </div>
          <div className="admin-create-form-right">
            <Form {...formItemLayout} > */}
              <Col span={11}>
                <Form.Item label="Ảnh đại diện">
                  {getFieldDecorator('productAvatar', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng nhập tên sản phẩm',
                      },
                    ],
                  })(<Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={(file) => {
                      //Upload File Base
                      console.log('File moi up', file)
                      //Link Image
                      const uploadTask = storage.ref(`images/${file.name}`).put(file);
                      // Set vao state
                      uploadTask.on(
                        "state_changed",
                        snapshot => {
                        },
                        error => {
                          console.log(error);
                        },
                        () => {
                          storage
                            .ref("images")
                            .child(file.name)
                            .getDownloadURL()
                            .then(url => {
                              this.props.changeAvatarImage(url)
                            });
                        }
                      );
                    }}
                  >
                    {productDetail.ImageDetail ? <img src={productDetail.ImageDetail} alt="avatar" style={{ width: '100%' }} /> : uploadAvatarButton}
                  </Upload>)}
                </Form.Item>

                <Form.Item label="Ảnh chi tiết">
                  {getFieldDecorator('imageDetail', {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng nhập mô tả sản phẩm',
                      },
                    ],
                  })(
                    <div className="clearfix">
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={
                          (imageDetail || []).map((item, index) => {
                            return ({
                              uid: item.ImageID,
                              name: 'image.png',
                              status: 'done',
                              url: item.urlImage
                            })
                          })
                        }
                        onPreview={this.handlePreview}
                        onRemove={(file) => {
                          // Xoa => Api XOa => Reducer tm
                          console.log('2', file)
                          this.props.deleteDetailImage({
                            idImage: file.uid
                          })

                        }}
                        beforeUpload={(file) => {
                          // Xoa => Api XOa => Reducer tm
                          console.log('taimoi', file)
                          //Link Image
                          const uploadTask = storage.ref(`images/${file.name}`).put(file);
                          // Set vao state
                          uploadTask.on(
                            "state_changed",
                            snapshot => {
                            },
                            error => {
                              console.log(error);
                            },
                            () => {
                              storage
                                .ref("images")
                                .child(file.name)
                                .getDownloadURL()
                                .then(url => {
                                  this.props.addDetailImage({
                                    ProductID: this.props.productDetail.ProductID,
                                    urlImage: url,
                                  })
                                });
                            })
                        }}
                      >
                        {(imageDetail || []).length >= 4 ? null : uploadImageDetailButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                  )}
                </Form.Item>
              </Col>
            </Form>
          </Row>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    productList: state.adminProduct.productList,
    productDetail: state.adminProduct.productDetail,
    imageDetail: state.adminProduct.imageDetail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductList: () => {
      dispatch(AdminProductTypes.getProductRequest());
    },
    getProductDetail: (params) => {
      dispatch(AdminProductTypes.getProductDetailAdminRequest(params));
    },
    updateProduct: (params) => {
      dispatch(AdminProductTypes.updateProductRequest(params));
    },
    changeAvatarImage: (params) => {
      dispatch(AdminProductTypes.changeAvatarImage(params));
    },
    deleteDetailImage: (params) => {
      dispatch(AdminProductTypes.deleteImageDetailRequest(params));
    },
    addDetailImage: (params) => {
      dispatch(AdminProductTypes.addImageDetailRequest(params));
    },
  };
};
const ProductInforListScreen = Form.create()(ProductInforList);
export default connect(mapStateToProps, mapDispatchToProps)(ProductInforListScreen);