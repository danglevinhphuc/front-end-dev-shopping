import React, { Component } from "react";
import _ from "lodash";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { actFetchHistoryRequest,pageSizeHistoryRequest } from "../HistoryAction";
import { changeTitleBar } from "../../HomePage/HomePageAction";
class HistoryPage extends Component {
  state ={
    currentPage: 1,
    pageSize: 5,
  }
  async componentWillMount() {
    let titleBar = [{ name: "Logs History", isActive: true, link: "/history" }];
    this.props.changeTitleBar(titleBar);
    await this.props.loadHistory();
  }
  handlePageChange = async pageNumber => {
    var _this = this;
    await _this.setState({ currentPage: pageNumber });
    await _this.props.pageSizeHistoryRequest(pageNumber);
    await this.props.loadHistory();
  };
  render() {
    const { historyData, total } = this.props.history;
    let {currentPage,pageSize} = this.state;
    
    let generateHistory = _.map(historyData, (o, i) => {
      return (
        <div className="timeline-entry" key={i}>
          <div className="timeline-stat">
            <div className="timeline-icon"> </div>
            <div className="timeline-time">{o.createdAtConvert} </div>
          </div>
          <div className="timeline-label">
            <b>{o.objectType}</b> <br/> <a>{o.type ? o.type : '' }</a>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="timeline">
          <div className="timeline-header">
            <div className="timeline-header-title bg-primary">Now</div>
            <div className="pull-right">Total: {total}</div>
          </div>
          {generateHistory}
        </div>
        <div className="table-responsive">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={pageSize}
              totalItemsCount={total}
              onChange={this.handlePageChange}
            />
          </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    history: state.history
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadHistory: async () => {
      await dispatch(actFetchHistoryRequest());
    },
    changeTitleBar: val => {
      dispatch(changeTitleBar(val));
    },
    pageSizeHistoryRequest : val =>{
      dispatch(pageSizeHistoryRequest(val));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
