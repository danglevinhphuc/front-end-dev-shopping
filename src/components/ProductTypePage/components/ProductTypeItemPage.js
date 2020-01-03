import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import SimpleReactValidator from "simple-react-validator";
import { actEditProductsTypeRequest,actGetProductsTypeById } from "../ProductTypeAction";
import { NotificationManager} from 'react-notifications';
import {changeTitleBar} from "../../HomePage/HomePageAction";
import {fireDb,firebaseApp} from '../../../configuration/fireAuth'
class ProductTypeItemPage extends Component {
  state = {
    id: "",
    name: "",
    origin: "",
    isActive: true
  };
  constructor(props) {
    super(props);
    this.validateBeforeSubmit = this.validateBeforeSubmit.bind(this);
    this.validator = new SimpleReactValidator();
  }
  async componentWillMount(){
    const { match } = this.props;
    if (match) { // update
        try {
          if(match.params.id){
            var productType = await actGetProductsTypeById(match.params.id);
            this.setState({
              id : productType.id,
              name: productType.name,
              origin:  productType.origin,
              isActive: productType.isActive
            })
          }
        } catch (error) {
          console.log(error)
        }
        var titleBar = [
          {name : "Products Type Manager",isActive : false,link : '/product-type'},
          {name : `${match.params.id ? `Update element product type` : `Create element product type`}`,isActive : true,link : `/product-type/${match.params.id ? `edit/${match.params.id}` : `edit` }`}
        ];
        this.props.changeTitleBar(titleBar);
    }
    return null;
  }
  onHandleChangeInput = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };
  toggleChecked = event => {
    var target = event.target;
    var name = target.name;
    this.setState({
      [name]: !this.state[name]
    });
  };
  validateBeforeSubmit = async () => {
    var _this = this;
    if (this.validator.allValid()) {
      try {
        await _this.props.editProductType(this.state);
        NotificationManager.success(`${this.state.id ? 'Update success' : 'Create success'}`);
        this.props.history.push(`/product-type`);
        // var userLocal = localStorage.getItem("FIREBASE_CURRENT_USER");
        // if(userLocal){
        //   var user = JSON.parse(userLocal);
        //   await fireDb.collection('productType').get().then((snapshot)=>{
        //     snapshot.docs.forEach(doc =>{
        //       console.log(doc.data())
        //     })
        //   });
        // }
      } catch (error) {
        console.log(error);
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  render() {
    const {name, origin, isActive} = this.state;
    return (
      <div className="panel">
        <div className="panel-heading">
          <h3 className="panel-title">{this.state.id ? `Upadte element product type` : `Create element product type`} </h3>
        </div>
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="control-label">Name *</label>
                  <input
                    className="form-control"
                    placeholder="Enter name product type"
                    type="text"
                    name="name"
                    value={name ? name: ""}
                    onChange={this.onHandleChangeInput}
                  />
                </div>
                <span className="text-left red-text">
                  {this.validator.message("name", name, "required")}
                </span>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="control-label">Origin</label>
                  <input
                    className="form-control"
                    placeholder="Enter origin product type"
                    type="text"
                    name="origin"
                    value={origin ? origin : ""}
                    onChange={this.onHandleChangeInput}
                  />
                </div>
              </div>
              <div className="col-sm-12">
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
              to="/product-type"
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

const mapDispatchToProps =  (dispatch, props) => {
  return {
    editProductType: async data => {
      await dispatch(actEditProductsTypeRequest(data));
    },
    changeTitleBar : val =>{
      dispatch(changeTitleBar(val));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTypeItemPage);
