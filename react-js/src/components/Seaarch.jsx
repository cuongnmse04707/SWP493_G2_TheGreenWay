import React, { Component } from "react";
import "../css/related-product.css";
import { Button, Radio, Input, Select, Avatar } from "antd";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import IntroProductTypes from "../redux/get-intro-product-redux";
import ConvensionTypes from "../redux/paper-conversion-redux";

class SearchComponent extends Component {
  state = {
    size: "default",
    textName: "",
    maxP: "",
    minP: "",
    checkData: true,
    textSearch: ""
  };

  handleSizeChange = e => {
    this.props.resetData();
    this.setState({ size: e.target.value });
  };

  onClick = () => {
    const { textSearch, maxP, minP } = this.state;
    const { onSearchHigh } = this.props;
    onSearchHigh({
      textName: textSearch,
      maxP,
      minP
    });
  };

  handleChange = value => {
    // console.log("object", value);
    this.setState({
      textSearch: value,
      checkData: false
    });
  };

  render() {
    const { Search } = Input;
    const { Option } = Select;
    const { size, checkData, textSearch } = this.state;
    const { onSearchFullText, listProductSearch } = this.props;
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          {size === "default" ? (
            <Search
              allowClear
              style={{ width: "50%" }}
              placeholder="Nhập từ khoá cần tìm kiếm ....."
              onSearch={value => this.props.onSearchFullText(value)}
              enterButton
            />
          ) : (
            <div
              style={{
                display: "flex",
                width: "auto",
                height: "100%"
              }}
            >
              <Select
                // Important
                showSearch
                allowClear
                optionFilterProp="children"
                placeholder="Nhập tên sản phẩm ..."
                optionLabelProp="label"
                value={textSearch}
                onFocus={() => {
                  this.setState({
                    checkData: true
                  });
                }}
                onSearch={value => {
                  // if (
                  //   listProductSearch.filter(
                  //     el =>
                  //       el.ProductName.toLowerCase().indexOf(
                  //         value.toLowerCase()
                  //       ) >= 0
                  //   ).length > 0 ||
                  //   value === ""
                  // ) {
                  //   this.setState({
                  //     checkData: false,
                  //     textSearch: value
                  //   });
                  // } else {
                  if (checkData) {
                    this.setState({
                      textSearch: value
                    });
                  }

                  // }
                }}
                onChange={this.handleChange}
                filterOption={(input, option) => {
                  // if (checkData) {
                  //   return 1;
                  // }
                  // console.log(option);
                  return (
                    option.props.children[1].props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  );
                }}
                style={{ width: "500px" }}
              >
                <Option
                  key={textSearch}
                  value={textSearch}
                  label={textSearch}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Avatar shape="square" style={{ marginRight: "10px" }} />
                  <span>{textSearch}</span>
                </Option>
                {false ? (
                  <Option
                    value={textSearch}
                    label={textSearch}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <Avatar shape="square" style={{ marginRight: "10px" }} />
                    <span>{textSearch}</span>
                  </Option>
                ) : (
                  listProductSearch.map(items => (
                    <Option
                      key={items.ProductID}
                      value={items.ProductName}
                      label={items.ProductName}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Avatar
                        shape="square"
                        src={items.ImageDetail}
                        style={{ marginRight: "10px" }}
                      />
                      <span>{items.ProductName}</span>
                    </Option>
                  ))
                )}
              </Select>
              {/* <Input
                allowClear
                placeholder="Nhập Tên Sản Phẩm  ..."
                onChange={event => {
                  this.setState({
                    textName: event.target.value
                  });
                }}
              /> */}
              <Input.Group compact>
                <Select defaultValue="1">
                  <Option value="1"> Giá </Option>
                </Select>
                <Input
                  type="number"
                  allowClear
                  style={{ width: 150, textAlign: "center" }}
                  placeholder="Minimum"
                  onChange={event => {
                    this.setState({
                      minP: event.target.value
                    });
                  }}
                />
                <Input
                  className="site-input-split"
                  style={{
                    width: 30,
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: "none"
                  }}
                  placeholder="~"
                  disabled
                />
                <Input
                  allowClear
                  type="number"
                  className="site-input-right"
                  style={{
                    width: 150,
                    textAlign: "center"
                  }}
                  placeholder="Maximum"
                  onChange={event => {
                    this.setState({
                      maxP: event.target.value
                    });
                  }}
                />
              </Input.Group>
              <Button
                type="primary"
                shape="circle"
                icon="search"
                onClick={this.onClick}
              />
            </div>
          )}
          <Radio.Group
            value={size}
            onChange={this.handleSizeChange}
            style={{ marginLeft: "10px" }}
          >
            <Radio.Button value="default">Seach Thông Thường</Radio.Button>
            <Radio.Button value="high">Seach Nâng Cao</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listProductSearch: state.introProduct.listProductSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchDefault: params => {
      dispatch(IntroProductTypes.searchDefault(params));
    },
    searchHigh: params => {
      dispatch(IntroProductTypes.searchHigh(params));
    },
    resetData: params => {
      dispatch(IntroProductTypes.resetData());
    }
  };
};

SearchComponent = withRouter(SearchComponent);
export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
