import { defineStore } from "pinia";

import {
  Department,
  ProgramType,
  Program,
  Space,
  ProgramElement,
} from "../models/programElements";

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

  getters: {
    getAllDepartments(state): Array<Department> {
      return state.departments;
    },
    getAllProgramTypes(state): Array<ProgramType> {
      return state.programTypes;
    },
    getAllPrograms(state): Array<Program> {
      return state.programs;
    },
    getAllSpaces(state): Array<Space> {
      return state.spaces;
    },
    getProgramAsJson(state): string {
      interface SaveState {
        departments: Department[];
        programTypes: ProgramType[];
        programs: Program[];
        spaces: Space[];
      }
      const saveState: SaveState = {
        departments: state.departments,
        programTypes: state.programTypes,
        programs: state.programs,
        spaces: state.spaces,
      };
      return JSON.stringify(saveState);
    },
  },

  actions: {
    readJson(json: string) {
      console.log(json);
    },
    setElementColor(
      uuid: string,
      color: string,
      elementType: ProgramElement
    ): void {
      if (elementType == ProgramElement.Department) {
        this.queryDepartmentsByIds(uuid)?.forEach((department) => {
          department.colorHex = color;
          department.modified();
        });
      } else if (elementType == ProgramElement.ProgramType) {
        this.queryProgramTypesByIds(uuid)?.forEach((programType) => {
          programType.colorHex = color;
          programType.modified();
        });
      }
    },
    setElementName(
      uuid: string,
      name: string,
      elementType: ProgramElement
    ): void {
      if (elementType == ProgramElement.Department) {
        this.queryDepartmentsByIds(uuid)?.forEach((department) => {
          department.name = name;
          department.modified();
        });
      } else if (elementType == ProgramElement.ProgramType) {
        this.queryProgramTypesByIds(uuid)?.forEach((programType) => {
          programType.name = name;
          programType.modified();
        });
      } else if (elementType == ProgramElement.Program) {
        this.queryProgramsByIds(uuid)?.forEach((program) => {
          program.name = name;
          program.modified();
        });
      }
    },
    setElementArea(
      uuid: string,
      area: number,
      elementType: ProgramElement
    ): void {
      if (elementType == ProgramElement.Program) {
        this.queryProgramsByIds(uuid)?.forEach((program) => {
          program.area = area;
          program.modified();
        });
      }
    },
    setElementQuantity(
      uuid: string,
      quantity: number,
      elementType: ProgramElement
    ): void {
      if (elementType == ProgramElement.Program) {
        this.queryProgramsByIds(uuid)?.forEach((program) => {
          program.targetQuantity = quantity;
          program.modified();
        });
      }
    },
    setProgramAssociation(
      uuid: string,
      otherUuid: string | undefined,
      associatedElementType: ProgramElement
    ): void {
      this.queryProgramsByIds(uuid)?.forEach((program) => {
        if (associatedElementType == ProgramElement.ProgramType) {
          program.setProgramType(otherUuid);
        } else if (associatedElementType == ProgramElement.Department) {
          program.setDepartment(otherUuid);
        }
      });
    },
    createNewProgramElements(
      typeOfElement: ProgramElement,
      quantity: number = 1
    ): Array<string> {
      const elementIds: Array<string> = [];
      if (typeOfElement == ProgramElement.Department) {
        for (let i = 0; i < quantity; i++) {
          const newDepartment = new Department();
          this.departments.push(newDepartment);
          elementIds.push(newDepartment.uuid);
        }
      } else if (typeOfElement == ProgramElement.ProgramType) {
        for (let i = 0; i < quantity; i++) {
          const newProgramType = new ProgramType();
          this.programTypes.push(newProgramType);
          elementIds.push(newProgramType.uuid);
        }
      } else if (typeOfElement == ProgramElement.Program) {
        for (let i = 0; i < quantity; i++) {
          const newProgram = new Program();
          this.programs.push(newProgram);
          elementIds.push(newProgram.uuid);
        }
      } else if (typeOfElement == ProgramElement.Space) {
        for (let i = 0; i < quantity; i++) {
          const newSpace = new Space();
          this.spaces.push(newSpace);
          elementIds.push(newSpace.uuid);
        }
      }
      return elementIds;
    },
    deleteProgramElements(
      typeOfElement: ProgramElement,
      elementIds: string | string[]
    ): void {
      if (typeOfElement == ProgramElement.Department) {
        const queryResults = this.queryDepartmentsByIds(elementIds);
        const queryIds: string[] = [];
        if (queryResults == undefined) {
          return;
        } else if (Array.isArray(queryResults)) {
          queryResults.forEach((element) => {
            queryIds.push(element.uuid);
          });
        }
        this.departments = this.departments.filter((department) => {
          if (queryIds.includes(department.uuid)) {
            department.programs.forEach((program) => {
              program.department = undefined;
              program.modifiedAt = new Date();
            });
            return false;
          } else {
            return true;
          }
        });
      } else if (typeOfElement == ProgramElement.ProgramType) {
        const queryResults = this.queryProgramTypesByIds(elementIds);
        const queryIds: string[] = [];
        if (queryResults == undefined) {
          return;
        } else if (Array.isArray(queryResults)) {
          queryResults.forEach((element) => {
            queryIds.push(element.uuid);
          });
        }
        this.programTypes = this.programTypes.filter((programType) => {
          if (queryIds.includes(programType.uuid)) {
            programType.programs.forEach((program) => {
              program.programType = undefined;
              program.modifiedAt = new Date();
            });
            return false;
          } else {
            return true;
          }
        });
      } else if (typeOfElement == ProgramElement.Program) {
        const queryResults = this.queryProgramsByIds(elementIds);
        const queryIds: string[] = [];
        if (queryResults == undefined) {
          return;
        } else if (Array.isArray(queryResults)) {
          queryResults.forEach((element) => {
            queryIds.push(element.uuid);
          });
        }

        this.programs = this.programs.filter((program) => {
          if (queryIds.includes(program.uuid)) {
            if (program.department) {
              const departmentPrograms = program.department.programs;
              const indexOfProgram = departmentPrograms.indexOf(program);
              if (indexOfProgram != -1) {
                departmentPrograms.splice(indexOfProgram, 1);
                program.department.modifiedAt = new Date();
              }
            }

            if (program.programType) {
              const programTypePrograms = program.programType.programs;
              const indexOfProgram = programTypePrograms.indexOf(program);
              if (indexOfProgram != -1) {
                programTypePrograms.splice(indexOfProgram, 1);
                program.programType.modifiedAt = new Date();
              }
            }

            program.spaces.forEach((space) => {
              space.program = undefined;
              space.modifiedAt = new Date();
            });

            return false;
          } else {
            return true;
          }
        });
      } else if (typeOfElement == ProgramElement.Space) {
        const queryResults = this.querySpacesByIds(elementIds);
        const queryIds: string[] = [];
        if (queryResults == undefined) {
          return;
        } else if (Array.isArray(queryResults)) {
          queryResults.forEach((element) => {
            queryIds.push(element.uuid);
          });
        }

        this.spaces = this.spaces.filter((space) => {
          if (queryIds.includes(space.uuid)) {
            if (space.program) {
              const programSpaces = space.program.spaces;
              const indexOfSpace = programSpaces.indexOf(space);
              if (indexOfSpace != -1) {
                programSpaces.splice(indexOfSpace, 1);
                space.program.modifiedAt = new Date();
              }
            }
            return false;
          } else {
            return true;
          }
        });
      }
    },
    queryDepartmentsByIds(
      uuids: string | string[]
    ): Array<Department> | undefined {
      if (!Array.isArray(uuids)) {
        uuids = [uuids];
      }
      const filterResults = this.departments.filter((el) => {
        return uuids.includes(el.uuid);
      });
      if (filterResults.length > 0) {
        return filterResults;
      } else {
        return undefined;
      }
    },
    queryProgramTypesByIds(
      uuids: string | string[]
    ): Array<ProgramType> | undefined {
      if (!Array.isArray(uuids)) {
        uuids = [uuids];
      }
      const filterResults = this.programTypes.filter((el) => {
        return uuids.includes(el.uuid);
      });
      if (filterResults.length > 0) {
        return filterResults;
      } else {
        return undefined;
      }
    },
    queryProgramsByIds(ids: string | string[]): Array<Program> | undefined {
      if (!Array.isArray(ids)) {
        ids = [ids];
      }
      const filterResults = this.programs.filter((el) => {
        return ids.includes(el.uuid);
      });
      if (filterResults.length > 0) {
        return filterResults;
      } else {
        return undefined;
      }
    },
    querySpacesByIds(ids: string | string[]): Array<Space> | undefined {
      if (!Array.isArray(ids)) {
        ids = [ids];
      }
      const filterResults = this.spaces.filter((el) => {
        return ids.includes(el.uuid);
      });
      if (filterResults.length > 1) {
        return filterResults;
      } else {
        return undefined;
      }
    },
  },
});
