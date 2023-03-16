import { defineStore, storeToRefs } from "pinia";

//exported separately because these are used on composables
//the composables are defined before the store has been initialized
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

  actions: {
    toggleSplitScreen() {
      this.programCreationSplitScreen = !this.programCreationSplitScreen;
    },
  },
});
