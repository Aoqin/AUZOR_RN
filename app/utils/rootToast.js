import { Keyboard } from "react-native";

import Toast from "react-native-root-toast";

export function ToastShort(content, config = {}) {
  let _config = {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
      Keyboard.dismiss();
      // calls on toast\`s appear animation start
      if (typeof config.onShow === "function") {
        config.onShow.call();
      }
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
      if (typeof config.onShown === "function") {
        config.onShown.call();
      }
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
      if (typeof config.onHide === "function") {
        config.onHide.call();
      }
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
      if (typeof config.onHidden === "function") {
        config.onHidden.call();
      }
    }
  };

  _config = { ..._config, ...config };
  Toast.show(content, _config);
}

export function ToastLong(content, config = {}) {
  let _config = {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
      // calls on toast\`s appear animation start
      if (typeof config.onShow === "function") {
        config.onShow.call();
      }
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
      if (typeof config.onShown === "function") {
        config.onShown.call();
      }
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
      if (typeof config.onHide === "function") {
        config.onHide.call();
      }
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
      if (typeof config.onHidden === "function") {
        config.onHidden.call();
      }
    }
  };

  _config = { ..._config, ...config };
  Toast.show(content, _config);
}
