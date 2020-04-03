import React, { Component } from 'react';
import '../../css/create-product.css'
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Icon,
  message,
  Modal
} from 'antd';
import CKEditor from 'ckeditor4-react';

const { TextArea } = Input;


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
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 12 }
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
          <div className="admin-create-form-left">
            <Form {...formItemLayout} >
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
              <Form.Item label="Giá sản phẩm">
                {getFieldDecorator('productPrice', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập giá sản phẩm',
                    },
                  ],
                })(<InputNumber min={1} max={10} defaultValue={3} />)}
              </Form.Item>
              <Form.Item label="Mô tả sản phẩm">
                {getFieldDecorator('productDescription', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập mô tả sản phẩm',
                    },
                  ],
                })(
                  <CKEditor data="" />
                )}
              </Form.Item>
            </Form>
          </div>
          <div className="admin-create-form-right">
            <Form {...formItemLayout} >
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
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadAvatarButton}
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
                    onChange={this.handleImageDetailChange}
                  >
                    {fileList.length >= 4 ? null : uploadImageDetailButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
const CreateProductScreen = Form.create()(CreateProduct);
export default CreateProductScreen;