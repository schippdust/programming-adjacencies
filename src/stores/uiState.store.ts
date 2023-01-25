import { defineStore, storeToRefs } from "pinia";
import { mainAppBarId, mainDrawerId } from "@/composables/resizeComposables";

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
