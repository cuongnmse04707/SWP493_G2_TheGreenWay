import React, { Component } from 'react';
import '../../css/create-product.css'
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Icon,
  message,
  Modal,
  Select,
  Row,
  Col
} from 'antd';
import { connect } from "react-redux";
import AdminProductTypes from "../../redux/admin-product-redux";
import CKEditor from 'ckeditor4-react';
import { storage } from "../../firebase";

const { TextArea } = Input;
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

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


class CreateProduct extends Component {
  state = {
    loading: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    data: '',
    avatarUrl: '',
    newProductId: "",
  };

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

  handleImageDetailChange = ({ fileList }) => this.setState({ fileList });

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

  onEditorChange = (evt) => {
    this.setState({
      data: evt.editor.getData()
    });
  }

  addNewProduct = () => {

    this.props.form.validateFieldsAndScroll(
      ["productName", "productPrice", "productQuantity", "category"],
      (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          const params = {
            CategoryID: values.category,
            ProductName: values.productName,
            ProductPrice: values.productPrice,
            Description: this.state.data,
            Quantity: values.productQuantity,
            CreateDate: new Date(),
            ImageDetail: this.state.avatarUrl
          }
          console.log('params', params)
          this.props.addNewProduct({
            params,
            callback: (idProduct) => {
              console.log('chay vao callback')
              console.log(idProduct)
              this.state.fileList.map((item, index) => {
                const paramsAddImage = {
                  ProductID: idProduct,
                  urlImage: item.url
                }
                this.props.addNewProductImage(paramsAddImage)
              })

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
    return (
      <div className="create-product-wrapper">
        <p className="title">Tạo sản phẩm mới</p>
        <div className="admin-create-form-container">
          <div style={{width: "100%"}}>
            <Row>
              <Form {...formItemLayout} >
                <Col span={13}>
                  <Form.Item label="Tên sản phẩm">
                    {getFieldDecorator('productName', {
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
                        rules: [
                          {
                            required: true,
                            message: 'Vui lòng nhập số lượng sản phẩm',
                          },
                        ],
                      })(<InputNumber min={1} />)}
                    </Form.Item>
                    <Form.Item label="Loại sản phẩm">
                      {getFieldDecorator('category', {
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
                      rules: [
                        {
                          required: true,
                          message: 'Vui lòng nhập mô tả sản phẩm',
                        },
                      ],
                    })(
                      <CKEditor
                        data=""
                        onChange={this.onEditorChange}
                      />
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
                                console.log(url)
                                this.setState({
                                  avatarUrl: url
                                })
                              });
                          }
                        );
                      }}
                    // onChange={this.handleChange}
                    >
                      {this.state.avatarUrl ? <img src={this.state.avatarUrl} alt="avatar" style={{ width: '100%' }} /> : uploadAvatarButton}
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
                          fileList={fileList}
                          onPreview={this.handlePreview}
                          onRemove={(file) => {
                            // Xoa => Api XOa => Reducer tm
                            this.setState({
                              fileList: this.state.fileList.filter(el => el.uid !== file.uid)
                            })
                          }}
                          beforeUpload={(file) => {
                            // Xoa => Api XOa => Reducer tm
                            console.log('anh detail', file)
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
                                    console.log(url)
                                    this.setState({
                                      fileList: [...this.state.fileList, {
                                        uid: this.state.fileList.length,
                                        name: 'image.png',
                                        status: 'done',
                                        url: url
                                      }]
                                    })

                                  });
                              })
                          }}
                        >
                          {this.state.fileList.length >= 4 ? null : uploadImageDetailButton}
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
            <Row style={{ display: "flex", justifyContent: "center", margin: "15px 0px 30px 0px" }}>
              <Button onClick={this.addNewProduct} type="primary">Tạo sản phẩm mới</Button>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    idNewProduct: state.adminProduct.idNewProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewProduct: (params) => {
      dispatch(AdminProductTypes.addNewProductRequest(params));
    },
    addNewProductImage: (params) => {
      dispatch(AdminProductTypes.addNewImageDetailRequest(params));
    },
  };
};
const CreateProductScreen = Form.create()(CreateProduct);
export default connect(mapStateToProps, mapDispatchToProps)(CreateProductScreen);