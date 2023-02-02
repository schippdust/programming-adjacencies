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

  name: string = "Department";
  colorHex: string = "#B0B0B0";

  colorMenuOpen: boolean = false;

  constructor() {
    this.uuid = uuidv4();
    this.createdAt = new Date();
    this.modifiedAt = new Date();
  }

  static fromText(text: string): Department {
    //not yet implemented
    return new Department();
  }

  toText(): string {
    return "not yet implemented";
  }

  addPrograms(programIds: string | string[]): void {
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

  removePrograms(programIds: string | string[]): void {
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
  colorHex: string = "#B0B0B0";

  constructor() {
    this.uuid = uuidv4();
    this.createdAt = new Date();
    this.modifiedAt = new Date();
  }

  static fromText(text: string): ProgramType {
    //not yet implemented
    return new ProgramType();
  }

  toText(): string {
    return "not yet implemented";
  }

  addPrograms(programIds: string | string[]): void {
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

  removePrograms(programIds: string | string[]): void {
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

  static fromText(text: string): Program {
    //not yet implemented
    return new Program();
  }

  toText(): string {
    return "not yet implemented";
  }

  setDepartment(departmentId: string): void {
    let departments: Department[];
    const store = useProgramElementStore();
    const queryResults = store.queryDepartmentsByIds(departmentId);

    if (queryResults == undefined) {
      return;
    } else {
      departments = queryResults;
    }

    if (this.department != departments[0]) {
      this.department = departments[0];
      this.modifiedAt = new Date();
    }

    if (!departments[0].programs.includes(this)) {
      departments[0].programs.push(this);
      departments[0].modifiedAt = new Date();
    }
  }

  setProgramType(programTypeId: string): void {
    let programTypes: ProgramType[];
    const store = useProgramElementStore();
    const queryResults = store.queryProgramTypesByIds(programTypeId);

    if (queryResults == undefined) {
      return;
    } else {
      programTypes = queryResults;
    }

    if (this.programType != programTypes[0]) {
      this.programType = programTypes[0];
      this.modifiedAt = new Date();
    }

    if (!programTypes[0].programs.includes(this)) {
      programTypes[0].programs.push(this);
      programTypes[0].modifiedAt = new Date();
    }
  }

  addSpaces(spaceIds: string | string[]): void {
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

  static fromText(text: string): Space {
    //not yet implemented
    return new Space();
  }

  toText(): string {
    return "not yet implemented";
  }

  getAreaTarget(): number {
    if (this.areaOverride == undefined) {
      return this.area;
    } else {
      return this.areaOverride;
    }
  }

  setAreaOverride(areaOverride: number | boolean): void {
    if (areaOverride > 0 && typeof areaOverride == "number") {
      this.areaOverride = areaOverride;
    } else {
      this.areaOverride = undefined;
    }
  }

  setProgram(programId: string): void {
    let programs: Program[];
    const store = useProgramElementStore();
    const queryResults = store.queryProgramsByIds(programId);

    if (queryResults == undefined) {
      return;
    } else {
      programs = queryResults;
    }

    if (this.program != programs[0]) {
      this.program = programs[0];
      this.modifiedAt = new Date();
    }

    if (!programs[0].spaces.includes(this)) {
      programs[0].spaces.push(this);
      programs[0].modifiedAt = new Date();
    }
  }
}
