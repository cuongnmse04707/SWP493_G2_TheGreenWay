import React, { Component } from "react";
import "../css/related-product.css";
import { Button, Radio, Input, Select } from "antd";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import IntroProductTypes from "../redux/get-intro-product-redux";
import ConvensionTypes from "../redux/paper-conversion-redux";

class SearchComponent extends Component {
  state = {
    size: "default",
    textName: "",
    maxP: "",
    minP: ""
  };

  handleSizeChange = e => {
    this.props.resetData();
    this.setState({ size: e.target.value });
  };

  onClick = () => {
    const { textName, maxP, minP } = this.state;
    const { onSearchHigh } = this.props;
    onSearchHigh({
      textName,
      maxP,
      minP
    });
  };

  render() {
    const { Search } = Input;
    const { Option } = Select;
    const { size } = this.state;
    const { onSearchFullText } = this.props;
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
              style={{ width: "50%" }}
              placeholder="Nhập từ khoá cần tìm kiếm ....."
              onSearch={value => this.props.onSearchFullText(value)}
              enterButton
            />
          ) : (
            <div
              style={{
                display: "flex",
                width: "650px",
                height: "100%"
              }}
            >
              <Input
                placeholder="Nhập Tên Sản Phẩm  ..."
                onChange={event => {
                  this.setState({
                    textName: event.target.value
                  });
                }}
              />
              <Input.Group compact>
                <Select defaultValue="1">
                  <Option value="1"> Giá </Option>
                </Select>
                <Input
                  style={{ width: 100, textAlign: "center" }}
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
                  className="site-input-right"
                  style={{
                    width: 100,
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

const mapStateToProps = state => {};

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
