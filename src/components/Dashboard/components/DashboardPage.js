import React, { Component } from "react";
import { changeTitleBar } from "../../HomePage/HomePageAction";
import { connect } from "react-redux";
import { actFetchStatisticRequest, setFromToRequest } from "../DashboardAction";
import _ from "lodash";
class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: new Date(0),
      to: new Date()
    };
  }
  async componentWillMount() {
    var titleBar = [{ name: "Dashboard", isActive: true, link: "/dashboard" }];
    this.props.changeTitleBar(titleBar);
    this.props.getStatitis();
  }
  onHandleChangeInput = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };
  validateBeforeSubmit = _.debounce(async function() {
    try {
      const { from, to } = this.state;
      var data = {
        from: new Date(from).getTime(),
        to: new Date(to).getTime()
      };
      await this.props.setFromToRequest(data);
      await this.props.getStatitis();
    } catch (error) {
      console.log(error);
    }
  }, 200);
  render() {
    const { data } = this.props.dashboard;
    let { from, to } = this.state;
    return (
      <div className="row">
        <div className="col-lg-12 pd-0">
          <div className="col-sm-3 col-lg-3">
            <label>From :</label>
            <input
              type="date"
              onChange={this.onHandleChangeInput}
              name="from"
              className="form-control"
            />
          </div>
          <div className="col-sm-3 col-lg-3">
            <label>To :</label>
            <input
              type="date"
              onChange={this.onHandleChangeInput}
              name="to"
              className="form-control"
            />
          </div>
          <div className="col-sm-2 col-lg-2 mt-5">
            <button
              className="btn btn-purple"
              onClick={() => {
                this.validateBeforeSubmit();
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-lg-12 mt-4">
          <div className="row">
            <div className="col-sm-3 col-lg-3">
              <div className="panel panel-primary panel-colorful">
                <div className="pad-all text-center">
                  <span className="text-3x text-thin">
                    {data.conversation || 0}
                  </span>
                  <p>Conversation </p>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-lg-3">
              <div className="panel panel-info panel-colorful">
                <div className="pad-all text-center">
                  <span className="text-3x text-thin">
                    {data.menu || data.iconHeader
                      ? data.menu + data.iconHeader
                      : 0}
                  </span>
                  <p>Menu / Icon</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-lg-3">
              <div className="panel panel-success panel-colorful">
                <div className="pad-all text-center">
                  <span className="text-3x text-thin">
                    {data.productType || 0}
                  </span>
                  <p>Product Type</p>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-lg-3">
              <div className="panel panel-danger panel-colorful">
                <div className="pad-all text-center">
                  <span className="text-3x text-thin">{data.product || 0}</span>
                  <p>Product</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    changeTitleBar: val => {
      dispatch(changeTitleBar(val));
    },
    getStatitis: () => {
      dispatch(actFetchStatisticRequest());
    },
    setFromToRequest: val => {
      dispatch(setFromToRequest(val));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
