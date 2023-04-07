import { defineStore } from "pinia";

import {
  Department,
  ProgramType,
  Program,
  Space,
  ProgramElement,
} from "../models/programElements";

interface testJson {
  test: string;
}

export const useIoStore = defineStore({
  id: "ioStore",
  state: () => ({}),
  actions: {
    getSaveDataAsJson(): string {
      const test: testJson = { test: "some data" };
      return JSON.stringify(test);
    },
  },
});
