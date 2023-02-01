<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useProgramElementStore } from "@/stores/programElements.store";

import { Department, ProgramElement } from "@/models/programElements.model";

const programElementStore = useProgramElementStore();
const { departments } = storeToRefs(programElementStore);

function getTypeCount(department: Department): number {
  return department.programTypes.length;
}

function getProgramCount(department: Department): number {
  return department.programs.length;
}

function getSpaceCount(department: Department): number {
  let spaceCount = 0;
  department.programs.forEach((program) => {
    spaceCount += program.spaces.length;
  });
  return spaceCount;
}

function getSpaceArea(department: Department): number {
  let spaceArea = 0;
  department.programs.forEach((program) => {
    program.spaces.forEach((space) => {
      spaceArea += space.area;
    });
  });
  return spaceArea;
}

function consoleLog(something: any) {
  console.log(something);
}

function setDepartmentColor(department: Department, color: string) {
  programElementStore.setElementColor(
    department.uuid,
    color,
    ProgramElement.Department
  );
}

function setDepartmentName(department: Department, name: string) {
  console.log("setting department name");
  programElementStore.setElementName(
    department.uuid,
    name,
    ProgramElement.Department
  );
}

function deleteDepartment(department: Department) {
  console.log("deleting department", department);
  programElementStore.deleteProgramElements(
    ProgramElement.Department,
    department.uuid
  );
}
</script>

<template>
  <div>
    <v-container class="mt-1">
      <v-row v-for="department in departments" :key="department.uuid">
        <!-- element that describes the graphics and data for the row -->

        <v-col class="department-data-row elevation-2 mb-5">
          <v-container fluid class="pa-0">
            <v-row class="pa-0 ma-n3">
              <v-menu :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                  <v-col
                    class="v-col-2 v-col-lg-1 color-swatch-element"
                    style=""
                    :style="{ backgroundColor: department.colorHex }"
                    v-bind="props"
                  >
                    <v-tooltip
                      activator="parent"
                      location="right"
                      class="ml-n5 pl-n6"
                      >Set Department Color</v-tooltip
                    >
                  </v-col>
                </template>

                <v-card min-width="300">
                  <v-color-picker
                    @update:model-value="setDepartmentColor(department, $event)"
                    v-bind:model-value="department.colorHex"
                    show-swatches
                  ></v-color-picker>
                </v-card>
              </v-menu>

              <v-col style="margin-right: 10px">
                <v-container class="ma-0 pa-0">
                  <v-row class="y-0 mb-n8 mt-n5">
                    <v-col>
                      <!-- <p class="text-h5">Name</p> -->
                      <v-text-field
                        variant="plain"
                        label="Department Name"
                        :model-value="department.name"
                        @update:model-value="
                          setDepartmentName(department, $event)
                        "
                      ></v-text-field>
                    </v-col>
                    <v-col class="v-col-1">
                      <v-btn
                        color="red-darken-4"
                        variant="plain"
                        @click="deleteDepartment(department)"
                      >
                        <v-icon>mdi-delete</v-icon>
                        <v-tooltip activator="parent" location="right">
                          Delete
                        </v-tooltip>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <!-- <v-divider></v-divider> -->
                  <v-row>
                    <v-col>
                      <v-text-field
                        :model-value="getTypeCount(department)"
                        readonly
                        label="type count"
                        class="mt-n2"
                        density="compact"
                        variant="plain"
                        color="blue"
                      />
                    </v-col>
                    <v-col
                      ><v-text-field
                        :model-value="getProgramCount(department)"
                        readonly
                        label="program count"
                        class="mt-n2"
                        density="compact"
                        variant="plain"
                        color="blue"
                    /></v-col>
                    <v-col
                      ><v-text-field
                        :model-value="getSpaceCount(department)"
                        readonly
                        label="space count"
                        class="mt-n2"
                        density="compact"
                        variant="plain"
                        color="blue"
                    /></v-col>
                    <v-col
                      ><v-text-field
                        :model-value="getSpaceArea(department)"
                        readonly
                        label="space area"
                        class="mt-n2"
                        density="compact"
                        variant="plain"
                        color="blue"
                    /></v-col>
                  </v-row>
                </v-container>
              </v-col>
              <div
                style="
                  background-color: white;
                  border: 1px solid darkgrey;
                  height: 90px;
                  width: 90px;
                  border-radius: 45px;
                  margin-top: 4px;
                  margin-right: 4px;
                "
              ></div>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            icon
            @click="
              programElementStore.createNewProgramElements(
                ProgramElement.Department,
                1
              )
            "
          >
            <v-icon color="black">mdi-plus</v-icon>
            <v-tooltip activator="parent" location="right"
              >Add New Department</v-tooltip
            >
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.color-swatch-element {
  cursor: pointer;
  height: 90px;
  margin-top: 3px;
  margin-left: 3px;
  border-radius: 6px;
  z-index: inherit;
}
.department-data-row {
  background-color: white;
  border: solid 1px darkgrey;
  border-radius: 6px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  margin-bottom: 10px;
  height: 100px;
}
.department-data-row:hover {
  background-color: #f8f8f8;
  border: solid 1px black;
  transition: 0.5s;
}
</style>
