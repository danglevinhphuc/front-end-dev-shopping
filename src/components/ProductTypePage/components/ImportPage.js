import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  actImportProductType,
  getTemplateImportProductType
} from "../ProductTypeAction";
import _ from "lodash";
import { NotificationManager } from "react-notifications";
import { confirmAlert } from "react-confirm-alert"; // Import
import { changeTitleBar } from "../../HomePage/HomePageAction";
class ImportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: null
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }
  async componentWillMount() {
    var titleBar = [
      { name: "Products Type Manager", isActive: false, link: "/product-type" },
      { name: `Import`, isActive: true, link: `/product-type/import` }
    ];
    this.props.changeTitleBar(titleBar);
  }
  handleFileUpload = event => {
    const file = event.target.files[0];
    var formData = new FormData();
    formData.append("file", file);
    this.setState({
      formData
    });
  };
  getTemplateExample = async () => {
    var _this = this;
    var response = await getTemplateImportProductType("product_type");
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "product_type_template.xlsx");
    document.body.appendChild(link);
    link.click();
  };
  uploadFile = async () => {
    var _this = this;
    if (this.state.formData) {
      await actImportProductType(this.state.formData);
      NotificationManager.success(`Upload success`);
      _this.props.history.push(`/product-type`);
    }
  };
  render() {
    return (
      <div className="panel">
        <div className="panel-heading">
          <h3 className="panel-title">Import products Type</h3>
        </div>
        <div className="panel-body">
          <div className="pad-btm form-inline">
            <div className="row">
              <div className="col-sm-6 table-toolbar-left">
                <input
                  type="file"
                  className="form-control width-100"
                  onChange={this.handleFileUpload}
                />
              </div>
              <div className="col-sm-6 table-toolbar-left">
                <button
                  onClick={this.getTemplateExample}
                  className="btn btn-default"
                >
                  <i className="demo-pli-download-from-cloud icon-lg" />
                </button>
              </div>
              <div className="col-md-12 table-toolbar-right">
                <Link
                  to="/product-type"
                  className="btn btn-default mr-2"
                  type="button"
                >
                  Back
                </Link>
                <button className="btn btn-success" onClick={this.uploadFile}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    changeTitleBar: val => {
      dispatch(changeTitleBar(val));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportPage);
