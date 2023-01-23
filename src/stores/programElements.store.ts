import { defineStore, storeToRefs } from "pinia";

import {
  Department,
  ProgramType,
  Program,
  Space,
  ProgramElement,
} from "../models/programElements.model";

interface ProgramElementStoreRootState {
  departments: Department[];
  programTypes: ProgramType[];
  programs: Program[];
  spaces: Space[];
}

export const useProgramElementStore = defineStore({
  id: "programElementStore",

  state: () =>
    ({
      departments: [],
      programTypes: [],
      programs: [],
      spaces: [],
    } as ProgramElementStoreRootState),

  actions: {
    createNewProgramElements(
      typeOfElement: ProgramElement,
      quantity: number = 1
    ) {
      if (typeOfElement == ProgramElement.Department) {
        for (let i = 0; i < quantity; i++) {
          this.departments.push(new Department());
        }
      } else if (typeOfElement == ProgramElement.ProgramType) {
        for (let i = 0; i < quantity; i++) {
          this.programTypes.push(new ProgramType());
        }
      } else if (typeOfElement == ProgramElement.Program) {
        for (let i = 0; i < quantity; i++) {
          this.programs.push(new Program());
        }
      } else if (typeOfElement == ProgramElement.Space) {
        for (let i = 0; i < quantity; i++) {
          this.spaces.push(new Space());
        }
      }
    },
    queryDepartmentsByIds(ids: string | string[]) {
      if (!Array.isArray(ids)) {
        ids = [ids];
      }
      const filterResults = this.departments.filter((el) => {
        return ids.includes(el.uuid);
      });
      if (filterResults.length > 1) {
        return filterResults;
      }
      if (filterResults.length == 1) {
        return filterResults[0];
      } else {
        return undefined;
      }
    },
    queryProgramTypesByIds(ids: string | string[]) {
      if (!Array.isArray(ids)) {
        ids = [ids];
      }
      const filterResults = this.programTypes.filter((el) => {
        return ids.includes(el.uuid);
      });
      if (filterResults.length > 1) {
        return filterResults;
      }
      if (filterResults.length == 1) {
        return filterResults[0];
      } else {
        return undefined;
      }
    },
    queryProgramsByIds(ids: string | string[]) {
      if (!Array.isArray(ids)) {
        ids = [ids];
      }
      const filterResults = this.programs.filter((el) => {
        return ids.includes(el.uuid);
      });
      if (filterResults.length > 1) {
        return filterResults;
      }
      if (filterResults.length == 1) {
        return filterResults[0];
      } else {
        return undefined;
      }
    },
    querySpacesByIds(ids: string | string[]) {
      if (!Array.isArray(ids)) {
        ids = [ids];
      }
      const filterResults = this.spaces.filter((el) => {
        return ids.includes(el.uuid);
      });
      if (filterResults.length > 1) {
        return filterResults;
      }
      if (filterResults.length == 1) {
        return filterResults[0];
      } else {
        return undefined;
      }
    },
  },
});
