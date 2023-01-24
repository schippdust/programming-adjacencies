import { defineStore, storeToRefs } from "pinia";

// interface UiStateStore {
//   typicalIconFill: string;

//   //Program Creation UI Properties
//   programCreationSplitScreen: Boolean;
//   editingModeIconDims: number;
// }

export const useUiStateStore = defineStore({
  id: "uiStateStore",
  state: () => ({
    typicalIconFill: "#8a8a8a",

    //Main App Bar
    mainAppBarId: "main-app-bar",

    //Drawer
    mainDrawerId: "main-drawer",

    //Program Creation UI
    programCreationSplitScreen: true,
    editingModeIconDims: 25,
  }),
});
