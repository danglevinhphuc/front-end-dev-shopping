import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import SimpleReactValidator from "simple-react-validator";
import { actEditProductsRequest,actGetProductsById,actEditProduct,deleteImageProduct } from "../ProductListAction";
import {actFetchProductsTypeRequest} from '../../ProductTypePage/ProductTypeAction'
import { NotificationManager} from 'react-notifications';
import {changeTitleBar} from "../../HomePage/HomePageAction";
import Select from 'react-select';
import ImageUploader from 'react-images-upload';
import './ProductListPage.css';
import { confirmAlert } from 'react-confirm-alert'; 

class ProductsItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      price: "",
      type : null,
      isActive: true,
      productType: [],
      canSearch: false,
      images: [],
      imagesSaved : []
    };
    this.validateBeforeSubmit = this.validateBeforeSubmit.bind(this);
    this.validator = new SimpleReactValidator();
    this.onDrop = this.onDrop.bind(this);
  }
  async componentWillMount() {
    var { match } = this.props;
    if (match && match.params.id) { // update
        try {
          var Products = await actGetProductsById(match.params.id);
          this.setState({
              id : Products.id,
              name: Products.name,
              price:  Products.price,
              type:  Products.type,
              isActive: Products.isActive,
              imagesSaved : Products.images
          })
        } catch (error) {
          console.log(error)
        }
    } // else => add
    var titleBar = [
      {name : "Products Manager",isActive : false,link : '/product-manager'},
      {name : `${match.params.id ? `Update element product` : `Create element product`}`,isActive : true,link : `/product-manager/${match.params.id ? `edit/${match.params.id}` : `edit` }`}
    ];
    this.props.changeTitleBar(titleBar);
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
        let formData = new FormData();
        if(_this.state.id && _this.state.id != ''){
          formData.append('id',_this.state.id);
        }
        formData.append("name",_this.state.name);
        formData.append("price",_this.state.price);
        formData.append("type",JSON.stringify(_this.state.type));
        formData.append("isActive",_this.state.isActive);
        _this.state.images.forEach(image =>{
          formData.append('images',image);
        });
        await _this.props.editProduct(formData);
        NotificationManager.success(`${_this.state.id ? 'Update success' : 'Create success'}`);
        _this.props.history.push(`/product-manager`);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  handleChange = type => {
    this.setState({ type });
  };
  loadProductType= _.debounce((searchRequest) => {
    if(this.state.canSearch){
      var data = [{type: "name",script :{"$regex": `.*${searchRequest.trim()}.*`, "$options": "i"}}];
      this.props.loadProductType(data);
      if(this.props.productType && this.props.productType.productTypeData){
        var productTypeData = this.props.productType.productTypeData;
        this.setState({
          productType : _.map(productTypeData,(o) =>{return { value: o._id,label: o.name }})
        })
      }
    }
    this.setState({canSearch :true})
  }, 300);
  isTouchCapable = () =>{
    this.setState({canSearch :false})
  };
  async onDrop(images) {
      await this.setState({
        images,
      });
      this.renderImage();
  };
  renderImage(){
    var data = [];
    _.forEach(this.state.images, (o, key) => {
      var reader = new FileReader();
      reader.onload = function() {
        var output = document.getElementById(`image-key-${key}`);
        output.style.background = `url(${reader.result})`;
      };
      reader.readAsDataURL(o);
    });
  };
  deleteFileUpload = async(position) =>{
    var _this = this;
    var data = this.state.images;
    data.splice(position, 1);
    await this.setState({
      images: data,
    });
    _this.renderImage();
  };
  deleteFileUploadSaved = async(item) =>{
    var _this =this;
    try {
      confirmAlert({
        title: `Delete image product`,                        
        message: 'Do you want to delete ? ',               
        buttons: [
          {
            label: 'No'
          },
          {
            label: 'Yes',
            onClick: () => {
              var response = deleteImageProduct({
                id: _this.state.id,
                linkDelete :item
              });
              _this.setState({
                imagesSaved : _.filter(_this.state.imagesSaved,(o)=>{return o != item})
              })
              NotificationManager.success(`Delete image product success`);
            }
          }
        ],
      })
    } catch (error) {
      console.log(error)
    }
  };
  render() {
    const imagesRender = _.map(this.state.images,(o,key) =>{
      return (
        <span className="position-upload-images" key={key}>
          <div className="image-upload-fb mr-2 mb-3"  id={`image-key-${key}`}></div>
          <i onClick={() =>{this.deleteFileUpload(key)}}  className="icon-close2 pointer icon-image-upload">X</i>
        </span>
      )
    });
    const imagesRenderSaved = _.map(this.state.imagesSaved,(o,key) =>{
      return (
        <span className="position-upload-images" key={key}>
          <div className="image-upload-fb mr-2 mb-3" style={{background:`url(${o})`}} ></div>
          <i onClick={() =>{this.deleteFileUploadSaved(o)}}  className="icon-close2 pointer icon-image-upload">X</i>
        </span>
      )
    });
    return (
      <div className="panel">
        <div className="panel-heading">
          <h3 className="panel-title">{this.state.id ? `Upadte element product` : `Create element product`} </h3>
        </div>
        <form>
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="control-label">Name *</label>
                  <input
                    className="form-control"
                    placeholder="Enter name product"
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.onHandleChangeInput}
                  />
                </div>
                <span className="text-left red-text">
                  {this.validator.message("name", this.state.name, "required")}
                </span>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="control-label">Price</label>
                  <input
                    className="form-control"
                    placeholder="Enter price product"
                    type="text"
                    name="price"
                    value={this.state.price}
                    onChange={this.onHandleChangeInput}
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="control-label">Product Type</label>
                  <Select
                    placeholder="Select product type"
                    value={this.state.type}
                    onChange={this.handleChange}
                    options={this.state.productType}
                    onInputChange={this.loadProductType}
                    onBlur= {this.isTouchCapable}
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="control-label">Images</label>
                  <ImageUploader
                      withIcon={true}
                      buttonText='Choose images'
                      onChange={this.onDrop}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="control-label">Review Image</label>
                  <div className="col-md-12">
                    {imagesRenderSaved}
                    {imagesRender}
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <label className="control-label">Active</label>
                  <input
                    className="ml-2 pointer"
                    type="checkbox"
                    name="isActive"
                    checked={this.state.isActive}
                    onChange={this.toggleChecked}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="panel-footer text-right">
            <Link
              to="/product-manager"
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
  return {
    productType: state.productType
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    changeTitleBar : val =>{
      dispatch(changeTitleBar(val));
    },
    loadProductType: val =>{
      dispatch(actFetchProductsTypeRequest(val));
    },
    editProduct: async (val)=>{
      await dispatch(actEditProduct(val));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsItemPage);
