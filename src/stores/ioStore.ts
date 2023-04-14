import { defineStore } from "pinia";

import { useProgramElementStore } from "./programElementsStore";

import type {
  Department,
  ProgramType,
  Program,
  Space,
} from "../models/programElements";

interface TestJson {
  test: string;
}

interface ProgramSaveData {
  departments: Department[];
  programTypes: ProgramType[];
  programs: Program[];
  spaces: Space[];
}

interface SaveData {
  programSaveData: ProgramSaveData;
}

export const useIoStore = defineStore({
  id: "ioStore",
  state: () => ({}),
  actions: {
    getSaveDataAsJson(): string {
      const programStore = useProgramElementStore();
      const saveData: SaveData = {
        programSaveData: {
          departments: programStore.getAllDepartments,
          programTypes: programStore.getAllProgramTypes,
          programs: programStore.getAllPrograms,
          spaces: programStore.getAllSpaces,
        },
      };
      return JSON.stringify(saveData);
    },
    readSaveDataFromJson(json: JSON) {
      const programStore = useProgramElementStore();
      console.log("reading json data", json);
      const newDepartments: Department[] = [];
      if ("departments" in json) {
        programStore.setDepartments(json.departments as Department[]);
      }
      if ("programTypes" in json) {
        programStore.setProgramTypes(json.programTypes as ProgramType[]);
      }
      if ("programs" in json) {
        programStore.setPrograms(json.programs as Program[]);
      }
      if ("spaces" in json) {
        programStore.setSpaces(json.spaces as Space[]);
      }
    },
  },
});
