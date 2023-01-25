import { defineStore, storeToRefs } from "pinia";

export const mainAppBarId = "main-app-bar";
export const mainDrawerId = "main-drawer";

export const useUiStateStore = defineStore({
  id: "uiStateStore",
  state: () => ({
    typicalIconFill: "#8a8a8a",

    //Main App Bar
    mainAppBarId: mainAppBarId,

    //Drawer
    mainDrawerId: mainDrawerId,

    //Program Creation UI
    programCreationSplitScreen: true,
    editingModeIconDims: 25,
  }),
});
