import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Headers from "../../Common/header";
import _ from "lodash";
import moment from 'moment';
import {changeTitleBar} from "../../HomePage/HomePageAction";
import {actFetchConfigIconHeaderRequest,searchConfigIconHeader} from '../ConfigIconHeaderAction';
class ConfigIconHeaderListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: {},
      loadingSuccess: false,
      search: "",
      ids: []
    };
  }
  async componentWillMount() {
    var _this  = this;
    await this.props.loadConfigIconHeader();
    _this.setState({
      headers: _this.props.ConfigIconHeader.headers,
      loadingSuccess: true
    });
    var titleBar = [
      {name : "Config Icon Header",isActive : true,link : '/config-icon-header'}
    ];
    this.props.changeTitleBar(titleBar);
  };
  componentWillReceiveProps(nextProps){
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
      await this.props.searchConfigIconHeader(this.state.search);
    }
  };  
  handleDeleteItem = async () =>{
    var _this = this;
    
  };
  render() {
    const { headers, loadingSuccess,search } = this.state;
    const { ConfigIconHeaderData, loading, total } = this.props.ConfigIconHeader;
    var getData = _.map(ConfigIconHeaderData, (o, i) => {
      var nameChild = _.flatMap(o.child,"name");
      return (
        <tr key={i}>
          <td>
            <span className="text-muted"> {o._id || o.id}</span>
          </td>
          <td >
            <Link className="hyper-link red-text" to={`/config-icon-header/edit/${o._id}`} ><i className={o.name}></i>  {o.name}</Link>
          </td>
          <td>
            <span className="text-muted"> {o.link || 'N/A'}</span>
          </td>
          <td>
            <span className="text-muted"> {o.position }</span>
          </td>
          <td>
            <span className="text-muted"> {o.isActive ? 'Active' :"InActive" }</span>
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
          <h3 className="panel-title">List Icon Header</h3>
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
                    value={search}
                    onChange={this.onHandleChangeInput}
                    onKeyPress={this.onKeyPressSearch}
                  />
                </div>
              </div>
              <div className="col-sm-6 table-toolbar-right">
                <Link id="demo-btn-addrow" to="/config-icon-header/edit" className="btn btn-purple">
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
                <Headers headers={headers}  isHideDeleteAll ={true} />
              </thead>
              <tbody>{loadingSuccess ? getData : (<tr></tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ConfigIconHeader: state.configIconHeader
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadConfigIconHeader : () =>{
      dispatch(actFetchConfigIconHeaderRequest());
    },
    changeTitleBar : val =>{
      dispatch(changeTitleBar(val));
    },
    searchConfigIconHeader : val =>{
      dispatch(searchConfigIconHeader(val));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigIconHeaderListPage);
