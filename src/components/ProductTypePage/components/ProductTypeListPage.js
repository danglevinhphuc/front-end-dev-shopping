import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Headers from "../../Common/header";
import {
  actFetchProductsTypeRequest,
  searchProductTypeRequest,
  pageSizeProductTypeRequest,
  changeCheckedProductType,
  actDeleteProductsType,
  exportProductType
} from "../ProductTypeAction";
import _ from "lodash";
import Pagination from "react-js-pagination";
import moment from 'moment';
import { NotificationManager} from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert'; // Import
import {changeTitleBar} from "../../HomePage/HomePageAction";
class ProductTypeListPage extends Component {
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
    await this.props.fetchAllProductsType();
    _this.setState({
      headers: _this.props.productType.headers,
      loadingSuccess: true,
      currentPage: _this.props.productType.searchRequest.currentPage,
      pageSize: _this.props.productType.searchRequest.pageSize
    });
    var titleBar = [
      {name : "Products Type Manager",isActive : true,link : '/product-type'}
    ];
    this.props.changeTitleBar(titleBar);
  };
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.productType && nextProps.productType.productTypeData.length){
      var ids = _.filter(_.map(nextProps.productType.productTypeData, (o) =>{
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
      await this.props.searchProductType(this.state.search);
      await this.props.fetchAllProductsType();
    }
  };
  handlePageChange = async pageNumber => {
    var _this = this;
    await _this.setState({ currentPage: pageNumber });
    await _this.props.pageSizeProductType(pageNumber);
    await _this.props.fetchAllProductsType();
  };
  handleCheckChieldElement = (event,type) => {
    var _this = this;
    if(type== 'single'){
      _this.props.isCheckedProductType({type,id: event.target.value,isChecked:event.target.checked });
    }else{
      _this.props.isCheckedProductType({val :event,type });
    }
  };
  handleDeleteItem = async () =>{
    var _this = this;
    try {
      confirmAlert({
        title: `Delete ${_this.state.ids.length} product type`,                        
        message: 'Do you want to delete ? ',               
        buttons: [
          {
            label: 'No'
          },
          {
            label: 'Yes',
            onClick: () => {
              this.props.deleteProductType({ids : _this.state.ids});
              NotificationManager.success(`Delete ${_this.state.ids.length} product type success`);
            }
          }
        ],
      })
    } catch (error) {
      console.log(error);
    }
  };
  exportExcel = async () =>{    
    try {
      var response =await this.props.exportExcelProductType();
      console.log(response);
    } catch (error) {
      
    }
  }
  render() {
    const { headers, loadingSuccess,ids } = this.state;
    const { productTypeData, loading, total } = this.props.productType;
    var getData = _.map(productTypeData, (o, i) => {
      return (
        <tr key={i}>
          <td>
            <span className="text-muted"> <input type="checkbox" onChange={(event)=>{this.handleCheckChieldElement(event,'single')}}  key={i} value={o._id} checked={o.isChecked}   /></span>
          </td>
          <td>
            <span className="text-muted"> {o._id || o.id}</span>
          </td>
          <td >
            <Link className="hyper-link red-text" to={`/product-type/edit/${o._id}`} > {o.name}</Link>
          </td>
          <td>
            <span className="text-muted"> {o.origin}</span>
          </td>
          <td>
            <span className="text-muted"> {o.isActive ? 'Active' : 'Inactive'}</span>
          </td>
          <td>
            <span className="text-muted">{moment(o.createdAt).format('DD/MM/YYYY hh:mm a')} </span>
          </td>
          <td>
            <span className="text-muted"> {moment(o.updatedAt ).format('DD/MM/YYYY hh:mm a') }</span>
          </td>
        </tr>
      );
    });
    if (!loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="panel">
        <div className="panel-heading">
          <h3 className="panel-title">Products Type Manager</h3>
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
                <button className="btn btn-default mr-1" onClick={this.exportExcel}>Export</button>
                <Link  to="/product-type/import" className="btn btn-default mr-1">
                  Import
                </Link>
                <Link id="demo-btn-addrow" to="/product-type/edit" className="btn btn-purple">
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
              <tbody>{loadingSuccess ? getData : <tr />}</tbody>
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
    productType: state.productType
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProductsType: () => {
      dispatch(actFetchProductsTypeRequest());
    },
    searchProductType: val => {
      dispatch(searchProductTypeRequest(val));
    },
    pageSizeProductType: val => {
      dispatch(pageSizeProductTypeRequest(val));
    },
    isCheckedProductType : val =>{
      dispatch(changeCheckedProductType(val));
    },
    deleteProductType : val =>{
      dispatch(actDeleteProductsType(val));
    },
    changeTitleBar : val =>{
      dispatch(changeTitleBar(val));
    },
    exportExcelProductType : () =>{
      dispatch(exportProductType());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTypeListPage);
