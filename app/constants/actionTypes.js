const signInActionTypes = {
  SIGNIN_INIT: "SIGNIN_INIT",
  SIGNIN_SUCCESS: "SIGNIN_SUCCESS",
  SIGNIN_FAILED: "SIGNIN_FAILED"
};

const authLoadingActionTypes = {
  LOAD_LOCAL_USER_SUCCESS: "LOAD_LOCAL_USER_SUCCESS",
  LOAD_LOCAL_USER_FAILED: "LOAD_LOCAL_USER_FAILED",
  CLEAN_LOCAL_USER: "CLEAN_LOCAL_USER",
  CHECK_APP_UPDATE: "CHECK_APP_UPDATE"
};

const versionJsonActionTypes = {
  GET_JSON_INIT: "GET_JSON_INIT",
  GET_JSON_SUCCESS: "GET_JSON_SUCCESS",
  GET_JSON_FAILED: "GET_JSON_FAILED"
}


module.exports = {
  ...signInActionTypes,
  ...versionJsonActionTypes,
  ...authLoadingActionTypes
}