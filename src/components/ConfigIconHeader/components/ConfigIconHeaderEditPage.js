import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  atcGetConfigIconHeader,
  editConfigIconHeader
} from "../ConfigIconHeaderAction";
import SimpleReactValidator from "simple-react-validator";
import { changeTitleBar } from "../../HomePage/HomePageAction";
import { NotificationManager } from "react-notifications";
import _ from "lodash";
import "./ConfigIconHeader.css";
class ConfigIconHeaderEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      link: "",
      position: 1,
      isActive: true,
      id: ""
    };
    this.validator = new SimpleReactValidator();
  }

  async componentWillMount() {
    var { match } = this.props;
    if (match) {
      // update
      var id = match.params.id;
      if (id) {
        var response = await atcGetConfigIconHeader(id);
        if (response && response.data) {
          //edit
          var data = response.data;
          this.setState({
            name: data.name,
            link: data.link,
            position: data.position,
            isActive: data.isActive,
            id: data.id
          });
        }
      } else {
        // create
        this.setState({
          child: [{ name: "", link: "" }]
        });
      }
      var titleBar = [
        {
          name: "Config Icon Header",
          isActive: false,
          link: "/config-icon-header"
        },
        {
          name: `${
            match.params.id
              ? `Update element config icon header`
              : `Create element config icon header`
          }`,
          isActive: true,
          link: `/config-icon-header/${
            match.params.id ? `edit/${match.params.id}` : `edit`
          }`
        }
      ];
      this.props.changeTitleBar(titleBar);
    }
  }

  onHandleChangeInput = e => {
    var target = e.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  toggleChecked = event => {
    var target = event.target;
    var name = target.name;
    this.setState({
      [name]: !this.state[name]
    });
  };
  validateBeforeSubmit = async () => {
    if (this.validator.allValid()) {
      try {
        await editConfigIconHeader(this.state);
        NotificationManager.success(
          `${this.state.id ? "Update success" : "Create success"}`
        );
        this.props.history.push(`/config-icon-header`);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  render() {
    const { name, link, position, isActive } = this.state;
    return (
      <div className="panel">
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.state.id
              ? `Upadte element config menu`
              : `Create element config menu`}
          </h3>
        </div>
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="control-label">Name *</label>
                  <input
                    className="form-control"
                    placeholder="Enter parent name"
                    type="text"
                    name="name"
                    value={name ? name : ""}
                    onChange={this.onHandleChangeInput}
                  />
                </div>
                <span className="text-left red-text">
                  {this.validator.message("name", name, "required")}
                </span>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="control-label">Link</label>
                  <input
                    className="form-control"
                    placeholder="Ex: /blog-detail"
                    type="text"
                    name="link"
                    value={link ? link : ""}
                    onChange={this.onHandleChangeInput}
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="control-label">Position</label>
                  <input
                    className="form-control"
                    placeholder="Ex: /blog"
                    type="number"
                    name="position"
                    value={position ? position : 1}
                    onChange={this.onHandleChangeInput}
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <h4 className="demo-icon">
                  <i className={name}></i>
                  <span>{name}</span>
                </h4>
              </div>
              <div className="col-sm-12 mt-1">
                <div className="form-group">
                  <label className="control-label">Active</label>
                  <input
                    className="ml-2 pointer"
                    type="checkbox"
                    name="isActive"
                    checked={isActive ? isActive : false}
                    onChange={this.toggleChecked}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="panel-footer text-right">
            <Link
              to="/config-icon-header"
              className="btn btn-default mr-2"
              type="button"
            >
              Back
            </Link>
            <button
              onClick={this.validateBeforeSubmit}
              className="btn btn-success"
              type="button"
            >
              Save
            </button>
          </div>
        </form>
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
)(ConfigIconHeaderEditPage);
