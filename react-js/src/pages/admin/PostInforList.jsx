import React, { Component } from "react";
import "../../css/admin-post-infor.css";
import { connect } from "react-redux";
import AdminPostTypes from "../../redux/admin-post-redux";
import CKEditor from "ckeditor4-react";
import { storage } from "../../firebase";
import { get } from "lodash";
import {
  Form,
  Input,
  Button,
  Upload,
  Icon,
  message,
  Modal,
  Row,
  Col,
  Table,
  Pagination,
} from "antd";

const { TextArea } = Input;
var moment = require("moment");
class PostInforList extends Component {
  state = {
    loading: false,
    current: 1,
    postId: "",
    avatarUrl: "",
  };

  componentDidMount() {
    const params = {
      page: 1,
    };
    this.props.getPostList(params);
  }

  onSelectPageChange = (page) => {
    this.setState({
      current: page,
    });
    const params = {
      page: page,
    };
    this.props.getPostList(params);
  };

  handleModalCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  viewPosttDetail = (id) => {
    this.props.form.resetFields();
    this.setState({
      visible: true,
      postId: id,
    });
    const params = {
      idPost: id,
    };
    this.props.getPostDetail(params);
  };

  onEditorChange = (evt) => {
    this.setState({
      data: evt.editor.getData(),
    });
  };

  updatePostInfor = () => {
    if (this.props.postDetail.ImageDetail = '') {
      message.error('Vui lòng chọn ảnh đại diện bài viết', 2)
    } else if (this.state.data == '') {
      message.error('Vui lòng nhập nội dung bài viết', 2)
    } else {
      this.setState({
        visible: false,
      });
      this.props.form.validateFieldsAndScroll(["title"], (err, values) => {
        if (!err) {
          const params = {
            idPost: this.state.postId,
            Title: values.title,
            Content: this.state.data
              ? this.state.data
              : this.props.postDetail.Content,
            CreateDate: this.props.postDetail.CreateDate,
            UpdateDate: new Date(),
            ImageDetail: this.props.postDetail.ImageDetail,
          };
          this.props.updatePost({
            params,
          });
        }
      });
    }
  };

  render() {
    const { listPost, totalPage, postDetail } = this.props;

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 14 },
      },
      wrapperCol: {
        xs: { span: 22 },
        sm: { span: 22 },
        md: { span: 22 },
        lg: { span: 22 },
      },
    };

    const uploadAvatarButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        render: (text, record) => (
          <div>
            <span>{record.PostID}</span>
          </div>
        ),
      },
      {
        title: "Tiêu Đề",
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
        ),
      },
      {
        title: "Lượt thích",
        dataIndex: "age",
        render: (text, record) => (
          <div>
            <span>{record.NumberOfLikes}</span>
          </div>
        ),
      },
      {
        title: "Ngày tạo",
        dataIndex: "numLike",
        render: (text, record) => (
          <div>
            <span>{moment(record.CreateDate).format("DD/MM/YYYY")}</span>
          </div>
        ),
      },
      {
        title: "Tùy chọn",
        dataIndex: "address",
        render: (text, record) => (
          <div>
            <Button
              type="primary"
              className="mr-3"
              onClick={() => {
                this.viewPosttDetail(record.PostID);
              }}
            >
              Chỉnh sửa
            </Button>
          </div>
        ),
      },
    ];
    return (
      <div className="admin-post-wrapper">
        <p className="title">Thông tin bài viết</p>
        <div className="admin-product-table">
          <Table
            dataSource={listPost}
            columns={columns}
            pagination={false}
            rowkey="id"
          />
        </div>
        <Pagination
          current={this.state.current}
          onChange={this.onSelectPageChange}
          total={totalPage * 10}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "20px",
          }}
        />
        {postDetail.Content !== undefined ? (
          <Modal
            visible={this.state.visible}
            onOk={this.updatePostInfor}
            onCancel={this.handleModalCancel}
            width={"80%"}
          >
            <div style={{ width: "100%" }}>
              <Row>
                <Form {...formItemLayout}>
                  <Col span={13}>
                    <Form.Item label="Tiêu đề">
                      {getFieldDecorator("title", {
                        initialValue: postDetail.Title,
                        rules: [
                          {
                            required: true,
                            message: "Vui lòng nhập tiêu đề",
                          },
                        ],
                      })(<TextArea rows={4} />)}
                    </Form.Item>
                    <div className="post-image-container">
                      <div className="post-image-avatar">
                        <Form.Item label="Ảnh đại diện">
                          {getFieldDecorator("postAvatar", {
                            rules: [
                              {
                                required: true,
                                message: "Vui lòng nhập ảnh đại diện",
                              },
                            ],
                          })(
                            <Upload
                              name="avatar"
                              listType="picture-card"
                              className="avatar-uploader"
                              showUploadList={false}
                              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              beforeUpload={(file) => {
                                //Link Image
                                const uploadTask = storage
                                  .ref(`images/${file.name}`)
                                  .put(file);
                                // Set vao state
                                uploadTask.on(
                                  "state_changed",
                                  (snapshot) => { },
                                  (error) => {
                                  },
                                  () => {
                                    storage
                                      .ref("images")
                                      .child(file.name)
                                      .getDownloadURL()
                                      .then((url) => {
                                        this.props.changeAvatarImage(url);
                                      });
                                  }
                                );
                              }}
                            >
                              {postDetail.ImageDetail ? (
                                <img
                                  src={postDetail.ImageDetail}
                                  alt="avatar"
                                  style={{ width: "100%" }}
                                />
                              ) : (
                                  uploadAvatarButton
                                )}
                            </Upload>
                          )}
                        </Form.Item>
                      </div>
                      <div className="post-image-detail">
                        <Form.Item label="Ảnh bài viết">
                          {getFieldDecorator(
                            "postImageDetail",
                            {}
                          )(
                            <Upload
                              name="avatar"
                              listType="picture-card"
                              className="avatar-uploader"
                              showUploadList={false}
                              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              beforeUpload={(file) => {
                                //Link Image
                                const uploadTask = storage
                                  .ref(`images/${file.name}`)
                                  .put(file);
                                // Set vao state
                                uploadTask.on(
                                  "state_changed",
                                  (snapshot) => { },
                                  (error) => {
                                  },
                                  () => {
                                    storage
                                      .ref("images")
                                      .child(file.name)
                                      .getDownloadURL()
                                      .then((url) => {
                                        this.setState({
                                          postImageDetail: url,
                                        });
                                      });
                                  }
                                );
                              }}
                            >
                              {this.state.postImageDetail ? (
                                <img
                                  src={this.state.postImageDetail}
                                  alt="avatar"
                                  style={{ width: "100%" }}
                                />
                              ) : (
                                  uploadAvatarButton
                                )}
                            </Upload>
                          )}
                        </Form.Item>
                        <span>Link ảnh: </span>
                        <Input
                          placeholder="Basic usage"
                          value={this.state.postImageDetail}
                        />
                      </div>
                    </div>
                  </Col>

                  <Col span={11}>
                    <Form.Item label="Nội dung bài viết">
                      {getFieldDecorator("description", {
                        rules: [
                          {
                            required: true,
                            message: "Vui lòng nhập mô tả bài viết",
                          },
                        ],
                      })(
                        <CKEditor
                          data={get(postDetail, "Content")}
                          onChange={this.onEditorChange}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Form>
              </Row>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listPost: state.adminPost.listPost,
    totalPage: state.adminPost.totalPage,
    postDetail: state.adminPost.postDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostList: (params) => {
      dispatch(AdminPostTypes.getListPostRequest(params));
    },
    getPostDetail: (params) => {
      dispatch(AdminPostTypes.getPostDetailRequest(params));
    },
    changeAvatarImage: (params) => {
      dispatch(AdminPostTypes.changeAvatarImage(params));
    },
    updatePost: (params) => {
      dispatch(AdminPostTypes.updatePostRequest(params));
    },
  };
};
const PostInforListScreen = Form.create()(PostInforList);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostInforListScreen);
