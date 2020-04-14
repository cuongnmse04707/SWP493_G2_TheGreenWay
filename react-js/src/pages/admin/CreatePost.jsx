import React, { Component } from 'react';
import '../../css/create-post.css'
import {
  Form,
  Input,
  Button,
  Upload,
  Icon,
  message,
  Select,
  Row,
  Col
} from 'antd';
import { connect } from "react-redux";
import AdminPostTypes from "../../redux/admin-post-redux";
import CKEditor from 'ckeditor4-react';
import { storage } from "../../firebase";

const { TextArea } = Input;

class CreatePost extends Component {
  state = {
    loading: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    data: '',
    avatarUrl: '',
    postImageDetail: '',
    imageDetailUrl: '',
    newProductId: "",
  };

  onEditorChange = (evt) => {
    this.setState({
      data: evt.editor.getData()
    });
  }

  toListPost = () => {
    this.props.parent('postInfor')
  }

  addNewPost = () => {
    if (this.state.avatarUrl == '') {
      message.error('Vui lòng nhập ảnh đại diện bài viết')
    } else if (this.state.data == '') {
      message.error('Vui lòng nhập nội dung bài viết')
    } else {
      this.props.form.validateFieldsAndScroll(
        ["title"],
        (err, values) => {
          if (!err) {
            const params = {
              Title: values.title,
              Content: this.state.data,
              CreateDate: new Date(),
              UpdateDate: new Date(),
              ImageDetail: this.state.avatarUrl
            }
            this.props.addNewPost({
              params,
              callback: () => {
                this.props.form.resetFields()
                this.setState({
                  avatarUrl: '',
                  data: ''
                })

                this.toListPost()
              }
            })
          }
        });
    }
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
                        {getFieldDecorator('postAvatar', {
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
                          beforeUpload={(file) => {
                            //Link Image
                            const uploadTask = storage.ref(`images/${file.name}`).put(file);
                            // Set vao state
                            uploadTask.on(
                              "state_changed",
                              snapshot => {
                              },
                              error => {
                              },
                              () => {
                                storage
                                  .ref("images")
                                  .child(file.name)
                                  .getDownloadURL()
                                  .then(url => {
                                    this.setState({
                                      avatarUrl: url
                                    })
                                  });
                              }
                            );
                          }}
                        >
                          {this.state.avatarUrl ? <img src={this.state.avatarUrl} alt="avatar" style={{ width: '100%' }} /> : uploadAvatarButton}
                        </Upload>)}
                      </Form.Item>
                    </div>
                    <div className="post-image-detail">
                      <Form.Item label="Ảnh bài viết">
                        {getFieldDecorator('postImageDetail', {
                        })(<Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          beforeUpload={(file) => {
                            //Link Image
                            const uploadTask = storage.ref(`images/${file.name}`).put(file);
                            // Set vao state
                            uploadTask.on(
                              "state_changed",
                              snapshot => {
                              },
                              error => {
                              },
                              () => {
                                storage
                                  .ref("images")
                                  .child(file.name)
                                  .getDownloadURL()
                                  .then(url => {
                                    this.setState({
                                      postImageDetail: url,
                                    })
                                  });
                              }
                            );
                          }}
                        >
                          {this.state.postImageDetail ? <img src={this.state.postImageDetail} alt="avatar" style={{ width: '100%' }} /> : uploadAvatarButton}
                        </Upload>)}
                      </Form.Item>
                      <span>Link ảnh: </span>
                      <Input value={this.state.postImageDetail} />
                    </div>
                  </div>
                </Col>

                <Col span={11}>
                  <Form.Item label="Nội dung bài viết">
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
    addNewPost: (params) => {
      dispatch(AdminPostTypes.addNewPostRequest(params));
    },
  };
};
const CreatePostScreen = Form.create()(CreatePost);
export default connect(mapStateToProps, mapDispatchToProps)(CreatePostScreen);