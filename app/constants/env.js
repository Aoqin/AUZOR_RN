import VersionNumber from "react-native-version-number";

export default {
  buildVersion: parseInt(VersionNumber, 10),
  versionNumber: VersionNumber.appVersion ? VersionNumber.appVersion : "",
  REQUEST_TIMEOUT: 10000, //请求超时时间
  DEV_DOMAIN: "http://linuxccy.gudaomai.com:81", //开发环境domain http://linuxccy.gudaomai.com:81
  DEV_BASE_URL: "http://linuxccy.gudaomai.com:81", //开发环境baseUrl http://linuxccy.gudaomai.com:81或者测试机http://192.168.31.20:81
  PRODUCT_DOMAIN: "http://47.98.87.119:81", //真实环境domain http://47.98.87.119:81
  PRODUCT_BASE_URL: "http://47.98.87.119:81" //真实环境baseUrl
};
