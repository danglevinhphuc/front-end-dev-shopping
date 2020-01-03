import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Headers from "../../Common/header";
import {
  actFetchProductsRequest,
  searchProductsRequest,
  pageSizeProductsRequest,
  changeCheckedProducts,
  actDeleteProducts
} from "../ProductListAction";
import _ from "lodash";
import Pagination from "react-js-pagination";
import moment from 'moment';
import { NotificationManager} from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert'; 
import {changeTitleBar} from "../../HomePage/HomePageAction";
class ProductsListPage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      headers: {},
      loadingSuccess: false,
      search: "",
      currentPage: 1,
      pageSize: 5,
      ids: []
    };
    this.onHandleChangeInput = this.onHandleChangeInput.bind(this);
    this.onKeyPressSearch = this.onKeyPressSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  async componentWillMount() {
    // Gọi trước khi component đc render lần đầu tiên
    var _this = this;
    _this._isMounted = true;
    if(_this._isMounted){
      await this.props.fetchAllProducts();   
      _this.setState({
        headers: _this.props.products.headers,
        loadingSuccess: true,
        currentPage: _this.props.products.searchRequest.currentPage,
        pageSize: _this.props.products.searchRequest.pageSize
      });
      var titleBar = [
        {name : "Products Manager",isActive : true,link : '/product'}
      ];
      this.props.changeTitleBar(titleBar); 
    }
  };
  componentWillUnmount(){
    this._isMounted = false;
  };
  componentWillReceiveProps(nextProps){
    if(this._isMounted  && nextProps && nextProps.products && nextProps.products.productData.length){
      
      var ids = _.filter(_.map(nextProps.products.productData, (o) =>{
        if(o.isChecked){return o._id};
      }),(o)=>{return o;});
      this.setState({
        ids
      })
    }
  }
  onHandleChangeInput = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };
  onKeyPressSearch = async event => {
    if (event.key === "Enter") {
      await this.props.searchProducts(this.state.search);
      await this.props.fetchAllProducts();
    }
  };
  handlePageChange = async pageNumber => {
    var _this = this;
    await _this.setState({ currentPage: pageNumber });
    await _this.props.pageSizeProducts(pageNumber);
    await _this.props.fetchAllProducts();
  };
  handleCheckChieldElement = (event,type) => {
    var _this = this;
    if(type== 'single'){
      _this.props.isCheckedProducts({type,id: event.target.value,isChecked:event.target.checked });
    }else{
      _this.props.isCheckedProducts({val :event,type });
    }
  };
  handleDeleteItem = async () =>{
    var _this = this;
    try {
      confirmAlert({
        title: `Delete ${_this.state.ids.length} product`,                        
        message: 'Do you want to delete ? ',               
        buttons: [
          {
            label: 'No'
          },
          {
            label: 'Yes',
            onClick: () => {
              this.props.deleteProducts({ids : _this.state.ids});
              NotificationManager.success(`Delete ${_this.state.ids.length} product success`);
            }
          }
        ],
      })
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { headers, loadingSuccess,ids,isMounted } = this.state;
    const { productData, loading, total } = this.props.products;
    var getData = _.map(productData, (o, i) => {
      return (
        <tr key={i}>
          <td>
            <span className="text-muted"> <input type="checkbox" onChange={(event)=>{this.handleCheckChieldElement(event,'single')}}  key={i} value={o._id || ''} checked={o.isChecked  || false}   /></span>
          </td>
          <td>
            <span className="text-muted"> {o._id  || ''}</span>
          </td>
          <td >
            <Link className="hyper-link red-text" to={`/product-manager/edit/${o._id  || ''}`} > {o.name  || ''}</Link>
          </td>
          <td>
            <span className="text-muted"> {o.price  || ''}</span>
          </td>
          <td>
            <span className="text-muted"> {o.isActive ? 'Active' : 'Inactive'}</span>
          </td>
          <td>
            <span className="text-muted">{moment(o.createdAt  || '').format('DD/MM/YYYY hh:mm a')} </span>
          </td>
          <td>
            <span className="text-muted"> {moment(o.updatedAt  || '').format('DD/MM/YYYY hh:mm a') }</span>
          </td>
        </tr>
      );
    });
    if (!loading ) {
      return <div>Loading...</div>;
    }
    return (
      <div className="panel">
        <div className="panel-heading">
          <h3 className="panel-title">Products Manager</h3>
        </div>
        <div className="panel-body">
          <div className="pad-btm form-inline">
            <div className="row">
              <div className="col-sm-6 table-toolbar-left">
                <div className="form-group">
                  <input
                    id="demo-input-search2"
                    className="form-control"
                    autoComplete="off"
                    type="text"
                    placeholder="Search"
                    name="search"
                    value={this.state.search}
                    onChange={this.onHandleChangeInput}
                    onKeyPress={this.onKeyPressSearch}
                  />
                </div>
              </div>
              <div className="col-sm-6 table-toolbar-right">
                {ids && ids.length ? <button type="button" onClick={this.handleDeleteItem} className="btn btn-default mr-2">Delete ({ids.length})</button> : '' }
                <Link id="demo-btn-addrow" to="/product-manager/edit" className="btn btn-purple">
                  Add
                </Link>
              </div>
              <div className="col-md-12">
                <span className="pull-right">Have {total} row (s)</span>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped  table-hover table-vcenter">
              <thead>
                <Headers headers={headers} checkAll={this.handleCheckChieldElement} />
              </thead>
              <tbody>{loadingSuccess ? getData : (<tr></tr>) }</tbody>
            </table>
            <Pagination
              activePage={this.state.currentPage}
              itemsCountPerPage={this.state.pageSize}
              totalItemsCount={total}
              onChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProducts: () => {
      dispatch(actFetchProductsRequest());
    },
    searchProducts: val => {
      dispatch(searchProductsRequest(val));
    },
    pageSizeProducts: val => {
      dispatch(pageSizeProductsRequest(val));
    },
    isCheckedProducts : val =>{
      dispatch(changeCheckedProducts(val));
    },
    deleteProducts : val =>{
      dispatch(actDeleteProducts(val));
    },
    changeTitleBar : val =>{
      dispatch(changeTitleBar(val));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsListPage);
