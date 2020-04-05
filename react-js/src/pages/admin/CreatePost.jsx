import React, { Component } from 'react';
import '../../css/create-post.css'
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


class CreatePost extends Component {
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

  addNewPost = () => {
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
      <div className="create-post-wrapper">
        <p className="title">Tạo bài đăng mới</p>
        <div className="admin-form-post-container">
          <div style={{ width: "100%" }}>
            <Row>
              <Form {...formItemLayout} >
                <Col span={13}>
                  <Form.Item label="Tiêu đề">
                    {getFieldDecorator('title', {
                      rules: [
                        {
                          required: true,
                          message: 'Vui lòng nhập tiêu đề',
                        },
                      ],
                    })(<TextArea rows={4} />)}
                  </Form.Item>
                  <div className="post-image-container">
                    <div className="post-image-avatar">
                    <Form.Item label="Ảnh đại diện">
                      {getFieldDecorator('productAvatar', {
                         rules: [
                          {
                            required: true,
                            message: 'Vui lòng nhập ảnh đại diện',
                          },
                        ],
                      })(<Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"

                      >
                        {this.state.avatarUrl ? <img src={this.state.avatarUrl} alt="avatar" style={{ width: '100%' }} /> : uploadAvatarButton}
                      </Upload>)}
                    </Form.Item>
                    </div>
                    <div className="post-image-detail">
                      <Form.Item label="Ảnh bài viết">
                        {getFieldDecorator('productAvatar', {
                        })(<Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        >
                          {this.state.avatarUrl ? <img src={this.state.avatarUrl} alt="avatar" style={{ width: '100%' }} /> : uploadAvatarButton}
                        </Upload>)}
                      </Form.Item>
                      <span>Link ảnh: </span>
                      <Input placeholder="Basic usage" />
                    </div>
                  </div>
                </Col>

                <Col span={11}>
                  <Form.Item label="Mô tả sản phẩm">
                    {getFieldDecorator('description', {
                      rules: [
                        {
                          required: true,
                          message: 'Vui lòng nhập mô tả bài viết',
                        },
                      ],
                    })(
                      <CKEditor
                        data=""
                        onChange={this.onEditorChange}
                      />
                    )}
                  </Form.Item>

                </Col>
              </Form>
            </Row>
            <Row style={{ display: "flex", justifyContent: "center", margin: "15px 0px 30px 0px" }}>
              <Button onClick={this.addNewPost} type="primary">Tạo bài đăng mới</Button>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
  };
};
const CreatePostScreen = Form.create()(CreatePost);
export default connect(mapStateToProps, mapDispatchToProps)(CreatePostScreen);