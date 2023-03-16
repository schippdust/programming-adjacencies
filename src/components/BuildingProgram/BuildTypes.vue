<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useProgramElementStore } from "@/stores/programElementsStore";

import { ProgramType, ProgramElement } from "@/models/programElements";

const programElementStore = useProgramElementStore();
const { programTypes } = storeToRefs(programElementStore);

function getProgramCount(programType: ProgramType): number {
  return programType.programs.length;
}

function getSpaceCount(programType: ProgramType): number {
  let spaceCount = 0;
  programType.programs.forEach((program) => {
    spaceCount += program.spaces.length;
  });
  return spaceCount;
}

function getSpaceArea(programType: ProgramType): number {
  let spaceArea = 0;
  programType.programs.forEach((program) => {
    program.spaces.forEach((space) => {
      spaceArea += space.area;
    });
  });
  return spaceArea;
}

function consoleLog(something: any) {
  console.log(something);
}

function setProgramTypeColor(programType: ProgramType, color: string) {
  programElementStore.setElementColor(
    programType.uuid,
    color,
    ProgramElement.ProgramType
  );
}

function setProgramTypeName(programType: ProgramType, name: string) {
  programElementStore.setElementName(
    programType.uuid,
    name,
    ProgramElement.ProgramType
  );
}

function deleteProgramType(programType: ProgramType) {
  programElementStore.deleteProgramElements(
    ProgramElement.ProgramType,
    programType.uuid
  );
}
</script>

<template>
  <div>
    <v-container class="mt-1" style="position: absolute; overflow-y: hidden">
      <v-row class="pl-12 pr-3 mb-4">
        <v-col class="text-h5"> Program Types </v-col>
      </v-row>
      <v-row
        v-for="programType in programTypes"
        :key="programType.uuid"
        class="pl-12 pr-3"
      >
        <!-- element that describes the graphics and data for the row -->

        <v-col class="program-type-data-row elevation-2 mb-5">
          <v-container fluid class="pa-0">
            <v-row class="pa-0 ma-n3">
              <v-menu :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                  <v-col
                    class="v-col-2 v-col-lg-1 color-swatch-element"
                    style=""
                    :style="{ backgroundColor: programType.colorHex }"
                    v-bind="props"
                  >
                    <v-tooltip
                      activator="parent"
                      location="right"
                      class="ml-n5 pl-n6"
                      >Set Type Color</v-tooltip
                    >
                  </v-col>
                </template>

                <v-card min-width="300">
                  <v-color-picker
                    @update:model-value="
                      setProgramTypeColor(programType, $event)
                    "
                    v-bind:model-value="programType.colorHex"
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
                        label="Type Name"
                        :model-value="programType.name"
                        @update:model-value="
                          setProgramTypeName(programType, $event)
                        "
                      ></v-text-field>
                    </v-col>
                    <v-col class="v-col-1">
                      <v-btn
                        color="red-darken-4"
                        variant="plain"
                        @click="deleteProgramType(programType)"
                      >
                        <v-icon>mdi-delete</v-icon>
                        <v-tooltip activator="parent" location="right">
                          Delete
                        </v-tooltip>
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row>
                    <!-- <v-col>
                      <v-text-field
                        :model-value="getTypeCount(programType)"
                        readonly
                        label="type count"
                        class="mt-n2"
                        density="compact"
                        variant="plain"
                        color="blue"
                      />
                    </v-col> -->
                    <v-col
                      ><v-text-field
                        :model-value="getProgramCount(programType)"
                        readonly
                        label="program count"
                        class="mt-n2"
                        density="compact"
                        variant="plain"
                        color="blue"
                    /></v-col>
                    <v-col
                      ><v-text-field
                        :model-value="getSpaceCount(programType)"
                        readonly
                        label="space count"
                        class="mt-n2"
                        density="compact"
                        variant="plain"
                        color="blue"
                    /></v-col>
                    <v-col
                      ><v-text-field
                        :model-value="getSpaceArea(programType)"
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
      <v-row class="pl-9">
        <v-col>
          <v-btn
            color="light-green"
            size="xsmall"
            @click="
              programElementStore.createNewProgramElements(
                ProgramElement.ProgramType,
                1
              )
            "
          >
            <v-icon size="x-large" color="white">mdi-plus</v-icon>
            <v-tooltip activator="parent" location="right"
              >Add New Program Type</v-tooltip
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
.program-type-data-row {
  background-color: white;
  border: solid 1px darkgrey;
  border-radius: 6px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  margin-bottom: 10px;
  height: 100px;
}
.program-type-data-row:hover {
  background-color: #f8f8f8;
  border: solid 1px black;
  transition: 0.5s;
}
</style>
