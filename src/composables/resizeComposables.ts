import throttle from "lodash.throttle";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { mainAppBarId, mainDrawerId } from "../stores/uiStateStore";

const throttleMs = 100;

export function useWindowWidth() {
  const windowWidth = ref(window.innerWidth);
  const calculateWindowWidth = () => {
    windowWidth.value = window.innerWidth;
  };
  const calculateWindowWidthThrottled = throttle(
    calculateWindowWidth,
    throttleMs
  );
  onMounted(() => {
    window.addEventListener("resize", calculateWindowWidthThrottled);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", calculateWindowWidthThrottled);
  });
  return { windowWidth };
}

export function useWindowHeight() {
  const windowHeight = ref(window.innerHeight);
  const calculaeWindowHeight = () => {
    windowHeight.value = window.innerHeight;
  };
  const calculatedWindowHeightThrottled = throttle(
    calculaeWindowHeight,
    throttleMs
  );
  onMounted(() => {
    window.addEventListener("reszie", calculatedWindowHeightThrottled);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", calculatedWindowHeightThrottled);
  });
  return { windowHeight };
}

export function useDrawerWidth() {
  let drawerWidthProp = document.getElementById(mainDrawerId)?.clientWidth;
  if (drawerWidthProp == undefined) {
    drawerWidthProp = 0;
  }
  const mainDrawerWidth = ref(drawerWidthProp);

  const calculateDrawerWidth = () => {
    drawerWidthProp = document.getElementById(mainDrawerId)?.clientWidth;
    if (drawerWidthProp == undefined) {
      drawerWidthProp = 0;
    }
    mainDrawerWidth.value = drawerWidthProp;
  };
  const calculateDrawerWidthThrottled = throttle(
    calculateDrawerWidth,
    throttleMs
  );
  onMounted(() => {
    window.addEventListener("resize", calculateDrawerWidthThrottled);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", calculateDrawerWidthThrottled);
  });
  return { mainDrawerWidth };
}

export function useMainAppBarHeight() {
  let heightProp = document.getElementById(mainAppBarId)?.clientHeight;
  if (heightProp == undefined) {
    heightProp = 0;
  }
  const mainAppBarHeight = ref(heightProp);

  const calculateAppBarHeight = () => {
    let heightProp = document.getElementById(mainAppBarId)?.clientHeight;
    if (heightProp == undefined) {
      heightProp = 0;
    }
    mainAppBarHeight.value = heightProp;
  };
  const calculateAppBarHeightThrottled = throttle(
    calculateAppBarHeight,
    throttleMs
  );
  onMounted(() => {
    window.addEventListener("resize", calculateAppBarHeightThrottled);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", calculateAppBarHeightThrottled);
  });
  return { mainAppBarHeight };
}
