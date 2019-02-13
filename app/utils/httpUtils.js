import * as HOST from "../constants/urls";
import * as TYPES from "../constants/actionTypes";
import CONFIG from "../constants/env";
import { ToastShort } from "../components/toast";
//封装超时
function timeoutFetch(promise: Promise, timeout = CONFIG.REQUEST_TIMEOUT) {
  let timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ status: 600, message: "请求超时,请检查你的网络" });
    }, timeout);
  });
  return Promise.race([promise, timeoutPromise]);
}

function postRequest(
  dispatch: Promise,
  url: string,
  paramsMap: Object,
  token: string
) {
  url = HOST.BASE_URL + url;
  return new Promise(function(resolve, reject) {
    timeoutFetch(
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token
        },
        body: JSON.stringify(paramsMap)
      })
    )
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.text();
        } else {
          let ret = JSON.parse(response._bodyText);
          if (ret.message) {
            if (ret.message === "GENERAL") {
              ToastShort("连接服务器异常");
            } else {
              ToastShort(ret.message);
            }
          }
          reject(ret.message);
        }
      })
      .then(text => {
        try {
          return JSON.parse(text);
        } catch (e) {
          reject("json error");
        }
      })
      .then(responseJson => {
        if (responseJson.message && responseJson.code !== "200") {
          ToastShort(responseJson.message);
        }
        return resolve(responseJson);
      })
      .catch(error => {
        timeoutToastr(error);
        if (typeof error.message === "string") {
          error = error.message;
        }
        reject(error);
      });
  });
}

function getJsonData(dispatch: Promise, url: string) {
  return new Promise(function(resolve, reject) {
    timeoutFetch(fetch(url))
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.text();
        } else {
          let ret = JSON.parse(response._bodyText);
          if (ret.message) {
            if (ret.message === "GENERAL") {
              ToastShort("连接服务器异常");
            } else {
              ToastShort(ret.message);
            }
          }
          reject(ret.message);
        }
      })
      .then(text => {
        try {
          return JSON.parse(text);
        } catch (e) {
          reject("json error");
        }
      })
      .then(responseJson => {
        if (responseJson.message && responseJson.code !== "200") {
          ToastShort(responseJson.message);
        }
        return resolve(responseJson);
      })
      .catch(error => {
        timeoutToastr(error);
        if (typeof error.message === "string") {
          error = error.message;
        }
        reject(error);
      });
  });
}

function putRequest(
  dispatch: Promise,
  url: string,
  paramsMap: Object,
  token: string
) {
  url = HOST.BASE_URL + url;
  return new Promise(function(resolve, reject) {
    timeoutFetch(
      fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token
        },
        body: JSON.stringify(paramsMap)
      })
    )
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.text();
        } else {
          let ret = JSON.parse(response._bodyText);
          if (ret.message) {
            if (ret.message === "GENERAL") {
              ToastShort("连接服务器异常");
            } else {
              ToastShort(ret.message);
            }
          }
          reject(ret.message);
        }
      })
      .then(text => {
        try {
          return JSON.parse(text);
        } catch (e) {
          reject("json error");
        }
      })
      .then(responseJson => {
        if (responseJson.message && responseJson.code !== "200") {
          ToastShort(responseJson.message);
        }
        return resolve(responseJson);
      })
      .catch(error => {
        timeoutToastr(error);
        if (typeof error.message === "string") {
          error = error.message;
        }
        reject(error);
      });
  });
}

function getRequest(dispatch: Object, url: string, token: string) {
  url = HOST.BASE_URL + encodeURI(url);
  return new Promise(function(resolve, reject) {
    timeoutFetch(
      fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token
        }
      })
    )
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.text();
        } else {
          let ret = JSON.parse(response._bodyText);
          if (ret.message) {
            if (ret.message === "GENERAL") {
              ToastShort("连接服务器异常");
            } else {
              ToastShort(ret.message);
            }
          }
          reject(ret.message);
        }
      })
      .then(text => {
        try {
          return JSON.parse(text);
        } catch (e) {
          reject("json error");
        }
      })
      .then(responseJson => {
        if (responseJson.message && responseJson.code !== "200") {
          ToastShort(responseJson.message);
        }
        resolve(responseJson);
      })
      .catch(error => {
        timeoutToastr(error);
        if (typeof error.message === "string") {
          error = error.message;
        }
        reject(error);
      });
  });
}

function uploadImage(dispatch, url, token, uri, uploadProgress) {
  let formData = new FormData();
  let timestamp = Date.parse(new Date());

  let image = { uri: uri, type: "image/jpeg", name: timestamp + ".jpg" };
  formData.append("file", image);
  return new Promise(function(resolve, reject) {
    try {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", HOST.BASE_URL + url);
      if (typeof uploadProgress === "function") {
        xhr.upload.onprogress = uploadProgress;
      }
      xhr.onload = function() {
        let responseJson = JSON.parse(xhr.response);
        if (
          responseJson.code === 20002 &&
          typeof token !== "undefined" &&
          token !== ""
        ) {
          dispatch({
            type: TYPES.CLEAN_LOCAL_USER,
            isSuccess: true
          });
        }
        resolve(responseJson);
      };
      xhr.onerror = function() {
        reject("网络请求错误");
      };
      xhr.setRequestHeader("Content-Type", "multipart/form-data");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("token", token);
      xhr.send(formData);
    } catch (error) {
      if (typeof error.message === "string") {
        const errorMessage = error.message;
        reject(errorMessage);
      } else {
        reject(error);
      }
    }
  });
}
/*图片上传函数*/
function uploadImageReport(
  dispatch: Promise,
  url: string,
  paramsMap: Object,
  token: string
) {
  let hostUrl = HOST.BASE_URL + url;
  return new Promise(function(resolve, reject) {
    timeoutFetch(
      fetch(hostUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token
        },
        body: JSON.stringify(paramsMap)
      })
    )
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(JSON.parse(response._bodyText));
        } else {
          let ret = JSON.parse(response._bodyText);
          if (ret.message) {
            if (ret.message === "GENERAL") {
              ToastShort("连接服务器异常");
            } else {
              ToastShort(ret.message);
            }
          }
          reject(ret.message);
        }
      })
      .catch(error => {
        timeoutToastr(error);
        if (typeof error.message === "string") {
          error = error.message;
        }
        reject(error);
      });
  });
}

function uploadVideo(dispatch, url, token, videoUri) {
  const URL = HOST.BASE_URL + url;
  let formData = new FormData();
  let timestamp = Date.parse(new Date());
  let video = { uri: videoUri, type: "video/mp4", name: timestamp + ".mp4" };
  formData.append("file", video);

  const promise = new Promise((resolve, reject) => {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        token: token
      },
      body: formData
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.text();
        } else {
          let ret = JSON.parse(response._bodyText);
          if (ret.message) {
            if (ret.message === "GENERAL") {
              ToastShort("连接服务器异常");
            } else {
              ToastShort(ret.message);
            }
          }
          reject(ret.message);
        }
      })
      .then(text => {
        resolve(JSON.parse(text));
      })
      .catch(err => {
        reject(err);
      });
  });
  return promise;
}

function getRequestNoTips(dispatch: Object, url: string, token: string) {
  url = HOST.BASE_URL + encodeURI(url);
  return new Promise(function(resolve, reject) {
    timeoutFetch(
      fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token
        }
      })
    )
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.text();
        } else if (response.status === 412) {
          let ret = JSON.parse(response._bodyText);
          // ToastShort(ret.message);
          reject(ret.message);
        } else {
          let ret = JSON.parse(response._bodyText);
          // ToastShort(ret.message);
          reject(ret.message);
        }
      })
      .then(text => {
        try {
          return JSON.parse(text);
        } catch (e) {
          reject("json error");
        }
      })
      .then(responseJson => {
        resolve(responseJson);
      })
      .catch(error => {
        timeoutToastr(error);
        if (typeof error.message === "string") {
          error = error.message;
        }
        reject(error);
      });
  });
}

function deleteRequest(
  dispatch: Promise,
  url: string,
  paramsMap: Object,
  token: string
) {
  url = HOST.BASE_URL + url;
  return new Promise(function(resolve, reject) {
    timeoutFetch(
      fetch(url, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token
        },
        body: JSON.stringify(paramsMap)
      })
    )
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.text();
        } else {
          let ret = JSON.parse(response._bodyText);
          if (ret.message) {
            if (ret.message === "GENERAL") {
              ToastShort("连接服务器异常");
            } else {
              ToastShort(ret.message);
            }
          }
          reject(ret.message);
        }
      })
      .then(text => {
        try {
          return JSON.parse(text);
        } catch (e) {
          reject("json error");
        }
      })
      .then(responseJson => {
        if (responseJson.message && responseJson.code !== "200") {
          ToastShort(responseJson.message);
        }
        return resolve(responseJson);
      })
      .catch(error => {
        if (typeof error.message === "string") {
          error = error.message;
        }
        reject(error);
      });
  });
}

// timeout toasta
function timeoutToastr(err) {
  if (err.status && err.status === 600) {
    ToastShort(err.message);
  }
}

module.exports = {
  getRequest,
  postRequest,
  uploadImage,
  putRequest,
  uploadImageReport,
  getRequestNoTips,
  getJsonData,
  deleteRequest,
  uploadVideo
};
