<script setup lang="ts">
import { computed } from "vue";
import type { Ref, ComputedRef } from "vue";
import { storeToRefs } from "pinia";
import { useProgramElementStore } from "@/stores/programElementsStore";
import { Program, ProgramElement } from "@/models/programElements";

const programElementStore = useProgramElementStore();
const { programs, departments, programTypes } =
  storeToRefs(programElementStore);

function createNewProgram() {
  programElementStore.createNewProgramElements(ProgramElement.Program, 1);
}

function setProgramName(program: Program, name: string) {
  programElementStore.setElementName(
    program.uuid,
    name,
    ProgramElement.Program
  );
}

function setProgramArea(program: Program, area: string) {
  const areaNumber = Number(area);
  if (areaNumber != undefined) {
    programElementStore.setElementArea(
      program.uuid,
      areaNumber,
      ProgramElement.Program
    );
  }
}

function setTargetQuantity(program: Program, quantity: string) {
  const targetQuantity = Number(quantity);
  if (targetQuantity != undefined) {
    programElementStore.setElementQuantity(
      program.uuid,
      targetQuantity,
      ProgramElement.Program
    );
  }
}

interface VComboboxKeyValObject {
  title: string;
  value: string | undefined;
}

const departmentComboBoxItems: ComputedRef<VComboboxKeyValObject[]> = computed(
  () => {
    let items: VComboboxKeyValObject[] = [];
    items.push({ title: "", value: undefined });
    departments.value.forEach((dept) => {
      items.push({ title: dept.name, value: dept.uuid });
    });
    return items;
  }
);

const programTypesComboBoxItems: ComputedRef<VComboboxKeyValObject[]> =
  computed(() => {
    let items: VComboboxKeyValObject[] = [];
    items.push({ title: "", value: undefined });
    programTypes.value.forEach((ptype) => {
      items.push({ title: ptype.name, value: ptype.uuid });
    });
    return items;
  });

function setDepartment(program: Program, event: any) {
  let departmentuuid: string | undefined = event.value
    ? String(event.value)
    : undefined;
  programElementStore.setProgramAssociation(
    program.uuid,
    departmentuuid,
    ProgramElement.Department
  );
}

function setProgramType(program: Program, event: any) {
  let programtypeuuid: string | undefined = event.value
    ? String(event.value)
    : undefined;
  programElementStore.setProgramAssociation(
    program.uuid,
    programtypeuuid,
    ProgramElement.ProgramType
  );
}

// setProgram
</script>
<template>
  <div>
    <v-container
      class="mt-1"
      style="position: absolute; overflow-y: hidden"
      fluid
    >
      <v-row class="pl-12 pr-3">
        <v-col class="text-h5"> Program Definitions </v-col>
      </v-row>
      <v-row class="pl-12 pr-3">
        <v-col>
          <div>
            <table class="program-data-table">
              <tr>
                <th
                  class="program-table-header-cell text-body-1"
                  style="width: 10%"
                >
                  Name
                </th>
                <th
                  class="program-table-header-cell text-body-1"
                  style="width: 10%"
                >
                  Department
                </th>
                <th
                  class="program-table-header-cell text-body-1"
                  style="width: 10%"
                >
                  Type
                </th>
                <th
                  class="program-table-header-cell text-body-1"
                  style="width: 5%"
                >
                  Area
                </th>
                <th
                  class="program-table-header-cell text-body-1"
                  style="width: 5%"
                >
                  Qty
                </th>
                <th
                  class="program-table-header-cell text-body-1"
                  style="width: 5%"
                >
                  Total Area
                </th>
                <th
                  class="program-table-header-cell text-body-1"
                  style="width: 1%"
                />
              </tr>

              <tr
                v-for="program in programs"
                :key="program.uuid"
                :id="`row-${program.uuid}`"
                class="program-data-row"
              >
                <td :id="`0-${program.uuid}`" class="program-table-cell">
                  <v-text-field
                    class="mt-n3 mb-n5 ml-1"
                    variant="plain"
                    density="compact"
                    :model-value="program.name"
                    @update:model-value="setProgramName(program, $event)"
                  />
                </td>
                <td :id="`1-${program.uuid}`" class="program-table-cell">
                  <v-combobox
                    class="mt-n3 mb-n5 ml-1"
                    :model-value="
                      program.department ? program.department.name : ''
                    "
                    :items="departmentComboBoxItems"
                    variant="plain"
                    density="compact"
                    @update:model-value="
                      ($event) => setDepartment(program, $event)
                    "
                  />
                  <div
                    style="height: 3px"
                    :style="{
                      backgroundColor: program.department
                        ? program.department.colorHex
                        : undefined,
                    }"
                  />
                </td>
                <td :id="`2-${program.uuid}`" class="program-table-cell">
                  <v-combobox
                    class="mt-n3 mb-n5 ml-1 block"
                    :model-value="
                      program.programType ? program.programType.name : ''
                    "
                    :items="programTypesComboBoxItems"
                    variant="plain"
                    density="compact"
                    @update:model-value="
                      ($event) => setProgramType(program, $event)
                    "
                  >
                  </v-combobox>
                  <div
                    style="height: 3px"
                    :style="{
                      backgroundColor: program.programType
                        ? program.programType.colorHex
                        : undefined,
                    }"
                  />
                </td>
                <td :id="`3-${program.uuid}`" class="program-table-cell">
                  <v-text-field
                    class="mt-n3 mb-n5 ml-1"
                    variant="plain"
                    density="compact"
                    type="number"
                    :model-value="program.area"
                    @update:model-value="setProgramArea(program, $event)"
                  />
                </td>
                <td :id="`4-${program.uuid}`" class="program-table-cell">
                  <v-text-field
                    class="mt-n3 mb-n5 ml-1"
                    variant="plain"
                    density="compact"
                    type="number"
                    :model-value="program.targetQuantity"
                    @update:model-value="setTargetQuantity(program, $event)"
                  />
                </td>
                <td :id="`5-${program.uuid}`" class="program-table-cell">
                  {{ program.targetQuantity * program.area }}
                </td>
                <td
                  :id="`5-${program.uuid}`"
                  class="program-table-borderless-cell"
                  :items="['']"
                >
                  <v-btn size="xsmall" variant="plain"
                    ><v-icon>mdi-chevron-down</v-icon></v-btn
                  >
                </td>
              </tr>
            </table>
          </div>
        </v-col>
      </v-row>
      <v-row class="pl-12 pr-3">
        <v-col>
          <v-btn color="light-green" size="xsmall" @click="createNewProgram()"
            ><v-icon size="x-large" color="white">mdi-plus</v-icon>
            <v-tooltip activator="parent" location="right">
              Add New Program Definition
            </v-tooltip>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.program-data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 4px 8px;
}
.program-table-cell {
  border: 1px solid black;
  text-align: center;
}
.program-table-borderless-cell {
  border: none;
  text-align: center;
}
.program-table-header-cell {
  border-bottom: 1px solid black;
}
.program-data-row:hover {
  background-color: #f8f8f8;
  transition: 0.3s;
}
</style>
