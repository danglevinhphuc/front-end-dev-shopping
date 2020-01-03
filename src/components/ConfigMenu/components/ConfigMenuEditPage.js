import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { atcGetConfigMenu,editConfigMenu } from "../ConfigMenuAction";
import SimpleReactValidator from "simple-react-validator";
import { changeTitleBar } from "../../HomePage/HomePageAction";
import { NotificationManager} from 'react-notifications';
import _ from "lodash";
import "./ConfigMenu.css";
class ConfigMenuEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: "",
      linkParent: "",
      position: 1,
      isActive: true,
      id: "",
      child: []
    };
    this.validator = new SimpleReactValidator();
  }

  async componentWillMount() {
    var { match } = this.props;
    if (match) {
      // update
      var id = match.params.id;
      if (id) {
        var response = await atcGetConfigMenu(id);
        if (response && response.data) {
            //edit
          var data = response.data;
          this.setState({
            parent: data.parent,
            linkParent: data.linkParent,
            position: data.position,
            isActive: data.isActive,
            id: data.id,
            child: data.child
          });
        }
      }else{
          // create
          this.setState({
            child: [{name: '',link : ''}]
          });
      }
      var titleBar = [
        { name: "Config Menu", isActive: false, link: "/config-menu" },
        {
          name: `${
            match.params.id
              ? `Update element config menu`
              : `Create element config menu`
          }`,
          isActive: true,
          link: `/config-menu/${
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
  onChangeChild = (event, i) => {
    var target = event.target;
    var name = target.name;
    var data = _.cloneDeep(this.state.child);
    data[i][name] = target.value;
    this.setState({
      child: data
    });
  };
  deleteChild = val => {
    var data = _.cloneDeep(this.state.child);
    if(data.length === 1){
        this.setState({
            child: [{name: '',link: ''}]
        });
    }else{
        data.splice(val, 1);
        this.setState({
            child: data
        });
    }
  };
  addChild  = () =>{
    var data = _.cloneDeep(this.state.child);
    data.push({name: '',link: ''});
    this.setState({
      child: data
    });
  }
  validateBeforeSubmit = async () => {
    var _this = this;
    if (this.validator.allValid()) {
      try {
        var data = _.cloneDeep(this.state);
        data.child = _.filter(data.child,(o) =>{return o.name !=''});
        await editConfigMenu(data);
        NotificationManager.success(`${this.state.id ? 'Update success' : 'Create success'}`);
        this.props.history.push(`/config-menu`);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  render() {
    const { parent, linkParent, position, isActive, child } = this.state;
    const listChild = child.map((o, i) => {
      return (
        <div className="col-sm-12 mb-2" key={i}>
          <div className="form-group">
            <div className="col-sm-4 pd-0">
              <input
                className="form-control"
                placeholder="Ex: blog-detail"
                type="text"
                name={`name`}
                value={child[i].name ? child[i].name : ""}
                onChange={e => {
                  this.onChangeChild(e, i);
                }}
              />
            </div>
            <div className="col-sm-4 ml-2 pd-0">
              <input
                className="form-control"
                placeholder="Ex: /home"
                type="text"
                name={`link`}
                value={child[i].link ? child[i].link : ""}
                onChange={e => {
                  this.onChangeChild(e, i);
                }}
              />
            </div>
            <div className="col-sm-2 ml-2 pd-0">
              <button
                type="button"
                className="fa fa-trash btn btn-danger"
                onClick={(e) => {
                  this.deleteChild(i);
                }}
                title="Delete"
              ></button>
            </div>
          </div>
        </div>
      );
    });
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
                  <label className="control-label">Parent *</label>
                  <input
                    className="form-control"
                    placeholder="Enter parent name"
                    type="text"
                    name="parent"
                    value={parent ? parent : ""}
                    onChange={this.onHandleChangeInput}
                  />
                </div>
                <span className="text-left red-text">
                  {this.validator.message("parent", parent, "required")}
                </span>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="control-label">Link Parent</label>
                  <input
                    className="form-control"
                    placeholder="Ex: /blog-detail"
                    type="text"
                    name="linkParent"
                    value={linkParent ? linkParent : ""}
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
                <label className="control-label">Child</label>
              </div>
              {listChild}

              <div className="col-sm-12">
                <a className="active-add pointer"  onClick={()=>{this.addChild()}}>Add child</a>
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
              to="/config-menu"
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
)(ConfigMenuEditPage);
