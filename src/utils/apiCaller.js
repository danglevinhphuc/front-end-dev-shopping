import axios from 'axios';
import * as Config from './../constants/Config';
import _ from 'lodash';
const filterMongo = (choosenFilter = null, search, request = null) => {
    var query = {
        "from": (search.currentPage - 1) * search.pageSize,
        "size": search.pageSize,
        "query": {
          "$or": [
            { "name": { "$regex": `.*${search.description.trim()}.*`, "$options": "i" } },
            { "message": { "$regex": `.*${search.description.trim()}.*`, "$options": "i" } },
            { "origin": { "$regex": `.*${search.description.trim()}.*`, "$options": "i" } },
            { "email": { "$regex": `.*${search.description.trim()}.*`, "$options": "i" } },
            { "objectType": { "$regex": `.*${search.description.trim()}.*`, "$options": "i" } },
            {
              "phones": {
                "$elemMatch": {
                  "$regex": `.*${search.description.trim()}.*`,
                  "$options": "i"
                }
              }
            }
          ]
        },
        "sort":{
        }
    }
    if(request){
      query.query[request.type] =request.data;
    }
    query.sort[search.sort.field]  = search.sort.sortOrder;
    _.forEach(choosenFilter, function (filter) {
        switch (filter.searchType) {
            case "text":
                query.query[filter.field] = { '$regex': filter.filterText ? filter.filterText.trim() : filter.filterText, "$options": "i"};
                break;
            case "textPhone":
                query.query[filter.field] = {
                  "$elemMatch": {
                    "$regex": filter.filterText ? filter.filterText.trim() : filter.filterText,
                    "$options": "i"
                  }
                };
                break;
            case "number":
                query.query[filter.field] = parseInt(filter.filterText ? filter.filterText.trim() : filter.filterText);
                break;
            case "checkbox":
                var data = [];
                _.forEach(filter.data, (o) => { if(_.isObject(o)){data.push(o.id)}else{data.push(o)} });
                query.query[filter.field] = {
                  "$in": data
                };
                break;
            case "date":
                query.query[filter.field] = {
                    "$gte": filter.date[0]/1,
                    "$lte": filter.date[1]/1
                };
                break;
            case "fromTo":
                query.query[filter.field] = {
                    "$gte": Number(filter.fromTo[0]) ? Number(filter.fromTo[0]) : 0,
                    "$lte": Number(filter.fromTo[1]) ? Number(filter.fromTo[1]) : 0
                };
                break;
            default:
                break;
        }
    });
    return query;
  }

const callApi = async (endpoint, method = 'GET', body) =>{
    return await axios({
        method,
        url: `${Config.API_URL}${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
};

const callUploadFile= (endpoint, body) => {
    return axios.post(`${Config.API_URL}${endpoint}`, body,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
}
const callApiFormData = async  (endpoint, body) => {
    return await axios.post(`${Config.API_URL}${endpoint}`, body,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).catch(err => {
      console.log(err);
    });
}

const callApiGetTemplate = (endpoint) => {
    return axios.get(`${Config.API_URL}${endpoint}`, {
        responseType: 'blob'
      });
}
const callApiExport = (endpoint,body) =>{
    return axios.post(`${Config.API_URL}${endpoint}`, body,
    {
        responseType: 'blob'
    });
}
const callApiNotToken= async (request) =>{
    var query ={};
    request.headers['Content-Type'] = 'application/json';
    switch(request.method){
        case "POST":
        case "PUT":
        query = {method: request.method,body: JSON.stringify(request.body),headers:request.headers}
        break;
        case "GET":
        case "DELETE":
        query = {method: request.method,headers: request.headers};
        break;
        default:
        break;
    }
    var response = await fetch(`${Config.API_URL}${request.url}`,query ).then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(e => {
            return e
        });
    return response;
};
const callApiSocket= async (request) =>{
  var query ={};
  request.headers['Content-Type'] = 'application/json';
  switch(request.method){
      case "POST":
      case "PUT":
      query = {method: request.method,body: JSON.stringify(request.body),headers:request.headers}
      break;
      case "GET":
      case "DELETE":
      query = {method: request.method,headers: request.headers};
      break;
      default:
      break;
  }
  var response = await fetch(`${Config.SOCKET_URL}${request.url}`,query ).then(response => response.json())
      .then(json => {
          return json;
      })
      .catch(e => {
          return e
      });
  return response;
};
export default {
    callApi,
    callUploadFile,
    filterMongo,
    callApiFormData,
    callApiGetTemplate,
    callApiExport,
    callApiNotToken,
    callApiSocket
}