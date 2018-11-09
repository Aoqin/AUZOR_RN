/* Base Color Definitions
============================================================================= */
const BASE_COLORS = {
    default: "#3478f6", // 主色
    defaultFont: "#000000", // 文字主色
    defaultBorder: "#DEDFDF", // 边框主色
    bottomBorder: "#DDDDDD", // 下边框色
  
    dangerTextColor: "#f95e5f",
    warningTextColor: "#f5c24d",
    goodTextColor: "#54c748",
  
    hintColorGood: "#44c45c", // 提示颜色- 状况良好
    hintColorWarning: "#f5c24d", // 提示颜色- 密切关注
    hintColorDanger: "#f24929", // 提示颜色- 急需处理
    hintBgGood: "#44c45c", // 提示颜色- 状况良好背景色
  
    blackRank0: "#333333", // 基本色 偏黑色
    blackRank1: "#666666", // 基本色 偏黑色1
    blackRank2: "#999999", // 基本色 偏黑色2
    blackRank3: "#b3b3b3", // 基本色 偏黑色3
    blackRank4: "#cccccc", // 基本色 偏黑色4
    blackRank5: "#f5f5f5", // 基本色 偏黑色5
    blackRank6: "#b6b6b6", // 基本色 偏黑色5
  
    sucessColor: "#3CB371", //部件正常色
    waringColor: "#eac112", //部件警告色
    dangerColor: "#ff5e5e", //部件危险色
    selectColor: "#1f4894", //部件选中
    tipsColor: "#e4ba0a", //提示字体颜色
    white: "#FFFFFF", // 基本色 白色
    greyBgColor: "#F5F5F5",
    redColor: "#FF0000",
    defaultBorderColor: "#DEDFDF",
    borderDefaultColor: "#f3f3f3", // 边框颜色1
    underlineColor: "#e5e5e5", // 边框颜色2
    borderColor3: "#dededf", //边框颜色3
    hintBackgroundColor: "#FAF3DF", // 遗留问题背景色
    primaryColor: "#3478f6", //按钮背景蓝色
    primaryFontColor: "#fff", //按钮文字色
    defaultFontColor: "#000000",
    grayFontColor: "#999999",
    secondaryGrayFontColor: "#666666",
    secondaryGrayFontColor2: "#757575",
    greenFontColor: "#64ae3c",
    bugColor: "#e7aa1e",
    secondaryBorderColor: "#eeeeee",
    borderGrayColor: "#d8d8d8",
    bgGrayColor: "#f2f2f2",
    bgGrayColor2: "#fafafa",
  
    tipsBgColor: "#e4ba0a",
    redBgColor: "#ff0000",
    whiteBgColor: "#ffffff",
    defaultBgColor: "#f5f5f5",
    blackBgColor: "#000000",
    blackTranBgColor: "rgba(0,0,0,0.5)",
    yellowColor: "#F27836", //图片编辑器画笔选择盘颜色
    greenColor: "#81F236", //图片编辑器画笔选择盘颜色
    whiteColor: "#ffffff", //图片编辑器画笔选择盘颜色
    blueColor: "#364FF2", //图片编辑器画笔选择盘颜色
    purpleColor: "#8B008B", //图片编辑器画笔选择盘颜色
    blackColor: "#000000", //图片编辑器画笔选择盘颜色
    primaryBgColor: "#3478f6",
    tagsDefault: "#70b0fd", //录入报告弹层，每一页过滤的默认色
    bgNavColor: "#ececec",
  
    moduleBoderRadius: 8, //模块圆角
    tagBorderRadius: 3, //tag圆角
    tagBorderRadius4: 4, //tag 圆角
    logBorderRadius: 30, //logo圆色
    btnBorderRadius: 2, //按钮圆角
    borderRadius34: 34, //圆角
    borderRadius6: 6, //圆角
    borderRadius23: 23,
    borderRadius5: 5, //确定按钮
  
    textAreaBorderColor: "#70B2FC",
    modalDefaultShadow: "rgba(0,0,0,0.6)", //弹层背景
    modalDoubleShadow: "rgba(0,0,0,0.2)" //双弹层背景
  };
  
  /* Base Component Definitions
  ============================================================================= */
  const COMPONENT_COLORS = {
    disabled: "#cccccc" // 功能色 禁止状态
  };
  
  /* Base FONT Definitions
  ============================================================================= */
  const BASE_FONT = {
    navTitle: "44", // 用于顶部导航栏文字
    h1Title: "32", // 用于标题文字
    paragraph: "28", // 用于正文文字
    explain: "24", // 用于解释性文字
    tip: "22" // 文章内容提示文字
  };
  
  /* other style Definitions
  ============================================================================= */
  const OTHER_STYLE = {
    padding: "20"
  };
  
  module.exports = {
    COLOR: {
      ...BASE_COLORS,
      ...COMPONENT_COLORS
    },
    FONT: {
      ...BASE_FONT
    },
    OTHER: {
      ...OTHER_STYLE
    }
  };
  