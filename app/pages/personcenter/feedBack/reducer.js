import * as ActionTypes from "../../../constants/actionTypes";

const initialState = {
  uploadImgStatus: "init",
  imgUrl: "",
  submitStatus: "init"
};

export default function FeedBackReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FEEDBACK_IMG_INIT:
      return Object.assign({}, state, {
        uploadImgStatus: "init"
      });
    case ActionTypes.FEEDBACK_IMG_SUCCESS:
      return Object.assign({}, state, {
        uploadImgStatus: "success",
        imgUrl: action.imgUrl
      });
    case ActionTypes.FEEDBACK_IMG_FAILED:
      return Object.assign({}, state, {
        uploadImgStatus: "failed"
      });
    case ActionTypes.FEEDBACK_SUBMIT_INIT:
      return Object.assign({}, state, {
        submitStatus: "init"
      });
    case ActionTypes.FEEDBACK_SUBMIT_SUCCESS:
      return Object.assign({}, state, {
        submitStatus: "success"
      });
    case ActionTypes.FEEDBACK_SUBMIT_FAILED:
      return Object.assign({}, state, {
        submitStatus: "failed"
      });
    default:
      return state;
  }
}
