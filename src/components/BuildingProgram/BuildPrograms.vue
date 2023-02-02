<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProgramElementStore } from "@/stores/programElements.store";
import { Program, ProgramElement } from "@/models/programElements.model";

const programElementStore = useProgramElementStore();
const { programs } = storeToRefs(programElementStore);
</script>
<template>
  <div>
    <v-container class="mt-1" style="position: absolute; overflow-y: hidden">
      <v-row class="pl-12 pr-3">
        <v-col>
          <div>
            <table class="program-data-table">
              <tr class="program-table-header-row">
                <th>Name</th>
                <th>Target Area</th>
                <th>Quantity</th>
                <th>Projected Total Area</th>
              </tr>

              <tr
                v-for="program in programs"
                :key="program.uuid"
                class="program-table-row"
                :id="`row-${program.uuid}`"
              >
                <td :id="`0-${program.uuid}`">{{ program.name }}</td>
                <td :id="`1-${program.uuid}`">{{ program.typicalArea }}</td>
                <td :id="`2-${program.uuid}`">{{ program.targetQuantity }}</td>
                <td :id="`3-${program.uuid}`">
                  {{ program.targetQuantity * program.typicalArea }}
                </td>
              </tr>
            </table>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.program-data-table {
  width: 100%;
}
.program-table-row {
}
.program-table-header-row {
}
</style>
