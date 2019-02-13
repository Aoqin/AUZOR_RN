const initialState = {
  carBrandData: [],
  pages: 1,
  num: 1,
  loadingShow: true,
  status: "init",
  hasMore: true,
  updateData: {}
};

export default function BoardPageReducer(state = initState, action) {
  switch (action.type) {
    case ActionTypes.GET_BOARD_INIT:
      return Object.assign({}, state, {
        status: "init",
        loadingShow: true
      });
    case ActionTypes.GET_BOARD_SUCCESS:
      if (action.num === 1) {
        return Object.assign({}, state, {
          carBrandData: action.carBrandData,
          loadingShow: false,
          status: "success",
          pages: action.pages,
          num: action.num,
          hasMore: action.hasMore
        });
      } else {
        return Object.assign({}, state, {
          carBrandData: [...state.carBrandData, ...action.carBrandData],
          loadingShow: false,
          status: "success",
          pages: action.pages,
          num: action.num,
          hasMore: action.hasMore
        });
      }
    case ActionTypes.GET_BOARD_FAILED:
      return Object.assign({}, state, {
        carBrandData: [],
        pages: 1,
        num: 1,
        loadingShow: false,
        status: "failed"
      });

    case ActionTypes.END_BOARD_INIT:
      return Object.assign({}, state, {
        tipShow: "endInit"
      });
    case ActionTypes.END_BOARD_SUCCESS:
      return Object.assign({}, state, {
        tipShow: "endSuccess",
        updateData: action.updateData
      });
    case ActionTypes.END_BOARD_FAILED:
      return Object.assign({}, state, {
        tipShow: "endFailed"
      });
    default:
      return state;
  }
}