import React, { Component } from "react";
import {
  Table,
  Icon,
  Button,
  Modal,
  Avatar,
  Input,
  Form,
  message,
  Pagination,
} from "antd";
import "../../../css/user-infor-list.css";
import { connect } from "react-redux";
import ModTypes from "../../../redux/mod-redux";
import { get } from "lodash";
let moment = require("moment");

class UserInforList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleRemove: false,
      visibleDrawerMemberSetting: false,
      idMemberRemove: "",
      keyFilterValue: "",
      keyFilterRole: "all",
    };
  }

  componentDidMount() {
    const { getUser } = this.props;
    getUser();
  }

  // showModal = (id) => {
  //   const { user } = this.props;
  //   const {
  //     location,
  //     projectNS: { project },
  //   } = this.props;
  //   const { list: dataList } = project;
  //   let dataObj =
  //     dataList[
  //       dataList.findIndex(
  //         (element) => element._id === location.query.projectid
  //       )
  //     ] || {};
  //   if (
  //     dataObj.members[
  //       dataObj.members.findIndex(
  //         (element) => element.employee._id === user.employee_id
  //       )
  //     ].role === "admin"
  //   ) {
  //     this.setState({
  //       visibleRemove: true,
  //       idMemberRemove: id,
  //     });
  //   } else {
  //     message.error("You have to access admin permission !");
  //   }
  // };

  // handleCancel = () => {
  //   this.setState({
  //     visibleRemove: false,
  //     idMemberRemove: "",
  //   });
  // };

  // handleOk = () => {
  //   // Remove deleteMember
  //   const { idMemberRemove } = this.state;
  //   const { location, dispatch } = this.props;
  //   dispatch({
  //     type: "projectNS/deleteMember",
  //     payload: {
  //       project: location.query.projectid,
  //       member: idMemberRemove,
  //     },
  //     callback: () => {
  //       this.setState({
  //         visibleRemove: false,
  //         idMemberRemove: "",
  //       });
  //     },
  //   });
  // };

  // onOpenDrawerMemberSetting = (event) => {
  //   event.preventDefault();
  //   const { user } = this.props;
  //   const {
  //     location,
  //     projectNS: { project },
  //   } = this.props;
  //   const { list: dataList } = project;
  //   let dataObj =
  //     dataList[
  //       dataList.findIndex(
  //         (element) => element._id === location.query.projectid
  //       )
  //     ] || {};
  //   if (
  //     dataObj.members[
  //       dataObj.members.findIndex(
  //         (element) => element.employee._id === user.employee_id
  //       )
  //     ].role === "admin"
  //   ) {
  //     this.setState({
  //       visibleDrawerMemberSetting: true,
  //     });
  //   } else {
  //     message.error("You have to access admin permission !");
  //   }
  // };

  // onCloseDrawerMemberSetting = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: "projectNS/getEmployee",
  //     payload: { page_size: -1 },
  //   });
  //   this.setState({
  //     visibleDrawerMemberSetting: false,
  //   });
  // };

  // onClickAddSelect = () => {
  //   const {
  //     form,
  //     dispatch,
  //     location,
  //     projectNS: { employees },
  //     projectNS: { project },
  //   } = this.props;
  //   form.validateFields(["inviteMember"], async (err, values) => {
  //     if (!err) {
  //       const memberList = Array.isArray(values.inviteMember)
  //         ? values.inviteMember
  //         : [values.inviteMember];
  //       const memberListDB = [];
  //       // eslint-disable-next-line array-callback-return
  //       memberList.map((element) => {
  //         memberListDB.push({
  //           employee:
  //             employees[employees.findIndex((item) => item._id === element)]
  //               ._id,
  //           photo_url:
  //             employees[employees.findIndex((item) => item._id === element)]
  //               .photo_url,
  //           display_name:
  //             employees[employees.findIndex((item) => item._id === element)]
  //               .display_name,
  //           email:
  //             employees[employees.findIndex((item) => item._id === element)]
  //               .email,
  //           role: "member",
  //         });
  //       });
  //       const { list: dataList } = project;
  //       let dataObj =
  //         dataList[
  //           dataList.findIndex(
  //             (element) => element._id === location.query.projectid
  //           )
  //         ] || {};
  //       form.resetFields();
  //       dispatch({
  //         type: "projectNS/updateEmptyProject",
  //         payload: {
  //           id: location.query.projectid,
  //           members: [...dataObj.members, ...memberListDB],
  //         },
  //       });
  //     }
  //   });
  // };

  // getDataTable = (list) => {
  //   const { keyFilterRole, keyFilterValue } = this.state;
  //   let data = [...list];

  //   if (keyFilterRole === "admin") {
  //     data = data.filter((element) => element.role === "admin");
  //   }

  //   if (keyFilterRole === "member") {
  //     data = data.filter((element) => element.role === "member");
  //   }

  //   if (keyFilterValue) {
  //     const rg = new RegExp(keyFilterValue, "i");
  //     data = data.filter(
  //       (element) =>
  //         rg.test(element.employee.display_name) ||
  //         rg.test(element.employee.email)
  //     );
  //   }

  //   return data;
  // };

  render() {
    const columns = [
      {
        title: (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>Nickname</span>
          </div>
        ),
        // dataIndex: 'display_name',
        key: "display_name",
        render: (text, record) => (
          <div>
            <Avatar
              shape="square"
              src={
                record.employee.photo_url ||
                `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${record.employee.display_name}`
              }
            />
            <span>{record.employee.display_name}</span>
          </div>
        ),
      },
      {
        title: <span>Email Address</span>,
        key: "email",
        render: (text, record) => <span>{record.employee.email}</span>,
      },
      {
        title: <span>Role</span>,
        dataIndex: "role",
        key: "role",
      },
      {
        title: <span>Joined on</span>,
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => <span>{moment(text).format("DD/MM/YYYY")}</span>,
      },
      {
        title: (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>Delete</span>
          </div>
        ),
        key: "action",
        render: (text, record) => (
          <Button
            icon="delete"
            // onClick={() => this.showModal(record.employee._id)}
            style={{ border: "none" }}
          />
        ),
      },
    ];
    const { visibleRemove, visibleDrawerMemberSetting } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
        className="contentComponent"
      >
        {/* Container of BreadcrumbComponent */}
        <Form>
          <div className="bodyContainer">
            <span className="textProjectMember">
              Project Members 11 members
            </span>
            <div>
              <span>Filter user</span>
              <div>
                <Icon type="search" />
                <Input
                  placeholder="Search in Nickname or Email address"
                  bordered="false"
                  onChange={(event) => {
                    // this.setState({
                    //   keyFilterValue: event.target.value,
                    // });
                  }}
                  // className={styles.inputCustomStyle}
                  allowClear
                />
              </div>
              {/* <div className={styles.selectBox}> */}
              {/* <SelectList
                  onChange={(val) => this.setState({ keyFilterRole: val })}
                /> */}
              {/* </div> */}
            </div>
            <Table
              // className={styles.stylesTable}
              columns={columns}
              dataSource={[]}
              style={{ background: "white" }}
              pagination={false}
            />
          </div>
        </Form>
      </div>
      // {/* <DrawerAddMemberSettingComponent
      //   visibleDrawerMemberSetting={visibleDrawerMemberSetting}
      //   onCloseDrawerMemberSetting={this.onCloseDrawerMemberSetting}
      // />
      // <Modal
      //   title={
      //     <div style={{ display: "flex", alignItems: "center" }}>
      //       <Icon
      //         type="info-circle"
      //         style={{ color: "red", marginRight: "5px", fontSize: "15px" }}
      //       />
      //       <span>Warning</span>
      //     </div>
      //   }
      //   visible={visibleRemove}
      //   onOk={this.handleOk}
      //   onCancel={this.handleCancel}
      // >
      //   <p>Are you want to remove this member ?</p>
      // </Modal> */}
    );
  }
}
const MemberFrom = Form.create()(UserInforList);

const mapStateToProps = (state) => {
  return {
    // orderInfor: state.userOrderHistory.orderDetail,
    // cartInfor: state.userOrderHistory.cartInfor,
    // guestCartInfor: state.userOrderHistory.guestCartInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (params) => {
      dispatch(ModTypes.getUserRequest(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberFrom);
