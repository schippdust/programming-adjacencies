import { v4 as uuidv4 } from "uuid";
import { useProgramElementStore } from "@/stores/programElements.store";

export enum ProgramElement {
  Department,
  ProgramType,
  Program,
  Space,
}

export class Department {
  uuid: string;
  elementType: ProgramElement = ProgramElement.Department;
  createdAt: Date;
  modifiedAt: Date;

  programTypes: ProgramType[] = []; //calculated
  programs: Program[] = [];
  spaces: Space[] = []; //calculated

  name: string = "";
  colorHex: string = "FFFFFF";

  constructor() {
    this.uuid = uuidv4();
    this.createdAt = new Date();
    this.modifiedAt = new Date();
  }

  addPrograms(programIds: string | string[]) {
    const store = useProgramElementStore();
    const queryResults = store.queryProgramsByIds(programIds);

    const queryPrograms: Program[] = [];
    if (queryResults == undefined) {
      return;
    } else if (Array.isArray(queryResults)) {
      queryPrograms.concat(queryResults);
    } else {
      queryPrograms.push(queryResults);
    }

    let modified: boolean = false;
    queryPrograms.forEach((program) => {
      if (!this.programs.includes(program)) {
        this.programs.push(program);
        program.department = this;
        program.modifiedAt = new Date();
        modified = true;
      }
    });

    if (modified) {
      this.modifiedAt = new Date();
    }
  }

  removePrograms(programIds: string | string[]) {
    const store = useProgramElementStore();
    const queryResults = store.queryProgramsByIds(programIds);

    const queryPrograms: Program[] = [];
    if (queryResults == undefined) {
      return;
    } else if (Array.isArray(queryResults)) {
      queryPrograms.concat(queryResults);
    } else {
      queryPrograms.push(queryResults);
    }

    let matchCount: number = 0;
    const filteredPrograms = this.programs.filter((program) => {
      if (queryPrograms.includes(program)) {
        program.department = undefined;
        program.modifiedAt = new Date();
        matchCount += 1;
        return false;
      } else {
        return true;
      }
    });

    this.programs = filteredPrograms;
    if (matchCount > 0) {
      this.modifiedAt = new Date();
    }
  }

  // recalculateAssociations() {
  //   this.spaces = [];
  //   this.programTypes = [];
  //   for (const program of this.programs) {
  //     this.spaces.concat(program.spaces);
  //     if (program.programType) {
  //       this.programTypes.push(program.programType);
  //     }
  //   }
  // }
}

export class ProgramType {
  uuid: string;
  elementType: ProgramElement = ProgramElement.ProgramType;
  createdAt: Date;
  modifiedAt: Date;

  programs: Program[] = [];
  spaces: Space[] = []; //calculated

  name: string = "";
  colorHex: string = "FFFFFF";

  constructor() {
    this.uuid = uuidv4();
    this.createdAt = new Date();
    this.modifiedAt = new Date();
  }

  addPrograms(programIds: string | string[]) {
    const store = useProgramElementStore();
    const queryResults = store.queryProgramsByIds(programIds);

    const queryPrograms: Program[] = [];
    if (queryResults == undefined) {
      return;
    } else if (Array.isArray(queryResults)) {
      queryPrograms.concat(queryResults);
    } else {
      queryPrograms.push(queryResults);
    }

    let modified: boolean = false;
    queryPrograms.forEach((program) => {
      if (!this.programs.includes(program)) {
        this.programs.push(program);
        program.programType = this;
        program.modifiedAt = new Date();
        modified = true;
      }
    });

    if (modified) {
      this.modifiedAt = new Date();
    }
  }

  removePrograms(programIds: string | string[]) {
    const store = useProgramElementStore();
    const queryResults = store.queryProgramsByIds(programIds);

    const queryPrograms: Program[] = [];
    if (queryResults == undefined) {
      return;
    } else if (Array.isArray(queryResults)) {
      queryPrograms.concat(queryResults);
    } else {
      queryPrograms.push(queryResults);
    }

    let matchCount: number = 0;
    const filteredPrograms = this.programs.filter((program) => {
      if (queryPrograms.includes(program)) {
        program.programType = undefined;
        program.modifiedAt = new Date();
        matchCount += 1;
        return false;
      } else {
        return true;
      }
    });

    this.programs = filteredPrograms;
    if (matchCount > 0) {
      this.modifiedAt = new Date();
    }
  }

  // recalculateAssociations() {
  //   this.spaces = [];
  //   for (const program of this.programs) {
  //     this.spaces.concat(program.spaces);
  //   }
  // }
}

export class Program {
  uuid: string;
  elementType: ProgramElement = ProgramElement.Program;
  createdAt: Date;
  modifiedAt: Date;

  department?: Department;
  programType?: ProgramType;
  spaces: Space[] = [];

  name: string = "";
  typicalArea: number = 100;
  targetQuantity: number = 1;

  autoManageGenericSpaces: boolean = true;
  //generic spaces are those for which roomNumber, areOverride and revitElementId are undefined
  //when typical area is changed, the spaces' areas will be updated if there isn't an override
  //when program has a space that starts with program name, will update to new name

  constructor() {
    this.uuid = uuidv4();
    this.createdAt = new Date();
    this.modifiedAt = new Date();
    this.spaces = [new Space()];
  }

  setDepartment(departmentId: string) {
    let department: Department;
    const store = useProgramElementStore();
    const queryResults = store.queryDepartmentsByIds(departmentId);

    if (queryResults == undefined) {
      return;
    } else if (Array.isArray(queryResults)) {
      return; //this shouldn't be possible would indicate an error
    } else {
      department = queryResults;
    }

    if (this.department != department) {
      this.department = department;
      this.modifiedAt = new Date();
    }

    if (!department.programs.includes(this)) {
      department.programs.push(this);
      department.modifiedAt = new Date();
    }
  }

  setProgramType(programTypeId: string) {
    let programType: ProgramType;
    const store = useProgramElementStore();
    const queryResults = store.queryProgramTypesByIds(programTypeId);

    if (queryResults == undefined) {
      return;
    } else if (Array.isArray(queryResults)) {
      return; //this shouldn't be possible and would indicate an error
    } else {
      programType = queryResults;
    }

    if (this.programType != programType) {
      this.programType = programType;
      this.modifiedAt = new Date();
    }

    if (!programType.programs.includes(this)) {
      programType.programs.push(this);
      programType.modifiedAt = new Date();
    }
  }

  addSpaces(spaceIds: string | string[]) {
    const store = useProgramElementStore();
    const queryResults = store.querySpacesByIds(spaceIds);

    const querySpaces: Space[] = [];
    if (queryResults == undefined) {
      return;
    } else if (Array.isArray(queryResults)) {
      querySpaces.concat(queryResults);
    } else {
      querySpaces.push(queryResults);
    }

    let modified: boolean = false;
    querySpaces.forEach((space) => {
      if (!this.spaces.includes(space)) {
        this.spaces.push(space);
        space.program = this;
        space.modifiedAt = new Date();
        modified = true;
      }
    });

    if (modified) {
      this.modifiedAt = new Date();
    }
  }
}

export class Space {
  uuid: string;
  elementType: ProgramElement = ProgramElement.Space;
  createdAt: Date;
  modifiedAt: Date;

  program?: Program;
  programType?: ProgramType; //calculated
  department?: Department; //calculated

  area: number;
  spaceNumber: string;

  areaOverride?: number;
  revitElementId?: number;

  constructor(area: number = 100, spaceNumber: string = "") {
    this.uuid = uuidv4();
    this.createdAt = new Date();
    this.modifiedAt = new Date();
    this.area = area;
    this.spaceNumber = spaceNumber;
  }

  setAreaTarget(area: number) {
    if (this.areaOverride == undefined) {
      this.area = area;
    }
  }

  setAreaOverride(areaOverride: number | boolean) {
    if (areaOverride > 0 && typeof areaOverride == "number") {
      this.areaOverride = areaOverride;
    } else {
      this.areaOverride = undefined;
    }
  }
}
