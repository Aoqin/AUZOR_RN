import CONFIG from "./env";

let domain = CONFIG.PRODUCT_DOMAIN;
let baseUrl = CONFIG.PRODUCT_BASE_URL;
if (process.env.NODE_ENV === "development") {
  domain = CONFIG.DEV_DOMAIN;
  baseUrl = CONFIG.DEV_BASE_URL;
}

/**
 *公共的请求地址,包含app.js中的请求
 */
const common_url = {
  BASE_URL: baseUrl,
  LOGIN: "/ccyBase/ccyBase/app/users/doLogin",
  GET_REMOTE_CONFIG: "/ccyBase/ccyBase/app/carType/carWithType/byLicence" // 检测更新配置
};

/**
 *按页面模块整理的请求地址
 */

// 我的模块
const person_center_url = {
  USER_EXIT: "/ccyBase/ccyBase/app/users/logout",
  RESET_PASSWORD: "/ccyBase/ccyBase/app/users/doChangePassword",
  USER_REPORT:
    "/ccyChekuangdashi/ccyChekuangdashi/app/reception/userReport/byStartDate/",
  FEEDBACK_SUBMIT: "/ccyBase/ccyBase/app/userFeedback/problemResult" //提交反馈信息
};

// 车辆模块
const cars_url = {
  GET_CAR_LIST:
    "/ccyChekuangdashi/ccyChekuangdashi/app/vc/getAllVcOfCurrentStore/ByPageNum/", //get 获取所有接车列表页的信息
  GET_CAR_DETAIL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/vc/getCarInfoByReceptionId/", //get 车辆详情页
  GET_CAR_REMAINS:
    "/ccyChekuangdashi/ccyChekuangdashi/app/vc/getRemainProblems/receptionId/", //GET  获取车辆遗留问题
  SEARCH_CARLIST_CAR_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/vc/searchVcsByKeyword", //根据根据车主名、车辆类型、车牌号（模糊）查询检测报告,按照由新到旧排序
  GET_CAR_CHECKID:
    "/ccyChekuangdashi/ccyChekuangdashi/app/work/getCheckId/ByReceptionId/" //根据ReceptionId,获取checkID
};

// 接车模块
const receive_url = {
  UPLOAD_CAR_LICENSE_IMAGE: "/ccyBase/ccyBase/app/carType/carType/byPicture", //上传车牌号的照片post,然后返回一个字符串是车型
  GET_CAR_INFO: "/ccyChekuangdashi/ccyChekuangdashi/app/reception/byId/", //获取车辆的基本信息
  GET_CAR_RECOMMEND:
    "/ccyChekuangdashi/ccyChekuangdashi/app/part/part/byCarTypeCode/", //获取车辆的保养推荐
  RECEIVE_CAR: "/ccyChekuangdashi/ccyChekuangdashi/app/reception/doReception", //完成接车
  START_RECEIVE_CAR: "/ccyChekuangdashi/ccyChekuangdashi/app/reception/create/", //开始接车
  MANUAL_QUERY_CAR_INFO:
    "/ccyChekuangdashi/ccyChekuangdashi/app/reception/car/byLicence/", //扫描页获取车辆是否有来过
  RECEIVE_MAHINE_OIL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/partProduct/part/id/", //接车机油推荐
  RECIVERCAR_UPLOADER_IMAGE: "/ccyBase/ccyBase/app/carType/byPicture", //上传图片
  VIN_REFRSH_QUERY: "/ccyBase/ccyBase/app/carType/byVin?vin=", //通过vin获取车型信息
  QUERY_UP_KEEP_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/part/upkeep/byCarTypeCode/" //通过车型查询是否有保养手册
};

//选择车型
const car_brand_url = {
  GET_CAR_BRAND: "/ccyBase/ccyBase/app/carBrand/all", //通过名称获取汽车品牌
  GET_CAR_TYPE: "/ccyBase/ccyBase/app/carType/bykey/", //通过名称获取汽车类型
  GET_CAR_BRAND_BY_ID: "/ccyBase/ccyBase/app/carType/byBrandId/" //通过品牌id获取所有车型
};

//录入报告主页默认
const report_home_url = {
  GET_REPORT_HOME:
    "/ccyChekuangdashi/ccyChekuangdashi/app/categores/checkInit/byReceptionId/", //录入报告首页数据接口
  GET_REPORT_CHECKID:
    "/ccyChekuangdashi/ccyChekuangdashi/app/checks/checkId/byReceptionId/", //通过接车id，获取checkId
  GET_CAR_PART_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/partChecksResult/partChecksResult/byCheckId/", //通过partList里面的id与checkId来获取数据
  PUT_CAR_PART_URL: "/ccyChekuangdashi/ccyChekuangdashi/app/checks/doSaveCheck", //提交弹层内容的接口，参数是取弹层数据的所有字段，是一个对象
  //FORM_UPLOADER_IMAGE: "/uploadFile/uploadByBase64/", //上传图片
  FORM_UPLOADER_IMAGE: "/uploadFile/uploadByBase64notcondense/", //上传图片
  PUT_CAR_PART_FINISH_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/checks/doReportSubmit/", //点击完成，生成报告接口
  PUT_AUTO_COMPLETE_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/checks/AutoComple/", //点击一键设为良好，自动补全没有录入的部件
  PUT_ADD_PART_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/part/part/customFault" //自定义故障弹层提交接口
};

// 车间看板模块
const board_url = {
  GET_BOARD_DATA: "/ccyChekuangdashi/ccyChekuangdashi/app/reception/task?num=", //车间看板，分页，可搜索
  END_BOARD_Task:
    "/ccyChekuangdashi/ccyChekuangdashi/app/checks/doStopTask/byReception/", //车间看板，终止任务
  GET_JSON: "http://site.chekuangdashi.com/version.json" //获取json文件，对比版本
};
// 检测记录模块
const detection_url = {
  GET_BASIC_MAINTAIN_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/work/basicItem/byChecksId/", //确认施工页基础保养
  GET_BASIC_MORE_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/work/partDetails/byPartId/", //点击展开信息描述
  GET_GOOD_STATE_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/work/goodItem/byChecksId/", //确认施工页良好状态
  GET_ADVICE_ITEM_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/work/adviceItem/ByChecksId/", //确认施工页建议项目
  GET_DETECTION_SHOW_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/vc/getAllVcInStoreByCarId/carId/", //获取检测记录
  GET_DETECTION_DETAIL_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/vc/CheckRecord/ByReceptionId/"
};
// 维保记录
const opportunity_url = {
  GET_opportunity_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/vc/getAllWorkRecordsByCarId/carId/" //获取维保记录
};
//确认施工
const construction_url = {
  GET_CONSTRUCTION_LIST_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/work/allItemsTrans/byChecksId/", //确认施工所有检测项目
  PUT_BASIC_MAINTAIN_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/work/doConfirmWork/byChecksId/", //点击确认施工改后提交接口
  GET_TWO_CODE_CONTENT_URL: "/weixinMp/weixinMp/new/createQr/", //获取二维码的字符串
  GET_TWO_CODE_IMAGE_URL: "/uploadFile/createqr?content=", //获取二维码的图片
  PUSH_OWNER_REPORT_URL:
    "/ccyChekuangdashi/app/shareReport/checkReport/pushReport/byReceptionId/", //点推送给车主的接口
  GET_MANUAL_INFO_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/part/upkeep/byCarTypeCode/", //是否有保养手册
  GET_SENT_REPORT_STATIST_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/work/shareReport/addShareTimes/", //发送报告的统计
  GET_FINISH_REPORT_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/work/afterWorkCount/byCheckId/" //结束流程
};

//保养手册
const support_url = {
  GET_SUPPORT_MILEAGE:
    "/ccyChekuangdashi/ccyChekuangdashi/app/carMileage/bytypecode/", //获取里程数
  GET_SUPPORT_PROJECT: "/ccyBase/ccyBase/app/car/getMaintainInfoForCcy/", //获取保养项目
  GET_FACTORY_PART_CONFIG:
    "/ccyChekuangdashi/ccyChekuangdashi/app/part/bytypecode/" //获取出厂配件参数
};
//报告分享
const shareReport_url = {
  GET_SHARE_BINDUSER_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/shareReport/checkReport/judgeConnect/byReceptionId/", //查询该车辆绑定的用户
  GET_USER_BIND_CAR_URL:
    "/ccyChekuangdashi/ccyChekuangdashi/app/shareReport/checkReport/judgeConnect/byWeixinOpenId/" //报告分享-查询并判断是否该车辆绑定了该用户
};

module.exports = {
  ...common_url,
  ...person_center_url,
  ...cars_url,
  ...receive_url,
  ...board_url,
  ...car_brand_url,
  ...report_home_url,
  ...car_brand_url,
  ...support_url,
  ...detection_url,
  ...opportunity_url,
  ...construction_url,
  ...shareReport_url
};
