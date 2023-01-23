import { v4 as uuidv4 } from "uuid";

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

  programTypes: ProgramType[] = [];
  programs: Program[] = [];
  spaces: Space[] = [];

  name: string = "";
  colorHex: string = "FFFFFF";

  constructor() {
    this.uuid = uuidv4();
    this.createdAt = new Date();
    this.modifiedAt = new Date();
  }
}

export class ProgramType {
  uuid: string;
  elementType: ProgramElement = ProgramElement.ProgramType;
  createdAt: Date;
  modifiedAt: Date;

  programs: Program[] = [];
  spaces: Space[] = [];

  name: string = "";
  colorHex: string = "FFFFFF";

  constructor() {
    this.uuid = uuidv4();
    this.createdAt = new Date();
    this.modifiedAt = new Date();
  }
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

  constructor() {
    this.uuid = uuidv4();
    this.createdAt = new Date();
    this.modifiedAt = new Date();
  }
}

export class Space {
  uuid: string;
  elementType: ProgramElement = ProgramElement.Space;
  createdAt: Date;
  modifiedAt: Date;

  program?: Program;
  programType?: ProgramType;
  department?: Department;

  roomNumber?: string;
  areaOverride?: number;
  revitElementId?: number;

  constructor() {
    this.uuid = uuidv4();
    this.createdAt = new Date();
    this.modifiedAt = new Date();
  }
}
