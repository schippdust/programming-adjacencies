import { defineStore } from "pinia";

import {
  Department,
  ProgramType,
  Program,
  Space,
  ProgramElement,
} from "../models/programElements";



export const useIoStore = defineStore({
  id: "ioStore",
  state: () => ({}),
  actions: {
    getSaveDataAsJson(): string {
      return "returning data as json";
    },
  },
});
