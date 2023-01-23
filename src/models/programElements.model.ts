// import { v4 as uuidv4 } from "uuid";

export interface Department {
  uuid: string;
  createdAt: Date;
  modifiedAt: Date;

  programTypes: ProgramType[];
  programs: Program[];
  spaces: Space[];

  name: string;
  colorHex: string;
}

export interface ProgramType {
  uuid: string;
  createdAt: Date;
  modifiedAt: Date;

  programs: Program[];
  spaces: Space[];

  name: string;
  colorHex: string;
}

export interface Program {
  uuid: string;
  createdAt: Date;
  modifiedAt: Date;

  department?: Department;
  programType?: ProgramType;
  spaces: Space[];

  name: string;
  typicalArea: number;
}

export interface Space {
  uuid: string;
  createdAt: Date;
  modifiedAt: Date;

  program?: Program;
  programType?: ProgramType;
  department?: Department;

  roomNumber?: string;
  areaOverride?: number;
  revitElementId?: number;
}
