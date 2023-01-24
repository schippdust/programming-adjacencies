<script setup lang="ts">
// import DepartmentIcon from "../components/icons/DepartmentIcon.vue";
// import TypeIcon from "../components/icons/TypeIcon.vue";
// import ProgramIcon from "../components/icons/ProgramIcon.vue";
// import SpaceIcon from "../components/icons/SpaceIcon.vue";

import { useUiStateStore } from "@/stores/uiState.store";
const uiState = useUiStateStore();
</script>

<template>
  <div class="pr-10 pl-14">
    <v-container fluid class="mx-0 px-0">
      <v-row class="border rounded mt-3 mb-1">
        <v-col> Some data</v-col>
        <v-col> Some More Data</v-col>
      </v-row>
      <v-row class="border rounded mt-3 mb-1">
        <v-col> Some data</v-col>
        <v-col> Some More Data</v-col>
      </v-row>
    </v-container>

    <div
      style="
        position: absolute;
        left: 8px;
        top: 6px;
        width: 30px;
        height: 60px;
        background-color: blue;
      "
    ></div>
    <div style="position: absolute; left: 8px; top: 80px">
      <v-btn
        class="px-n5"
        size="x-small"
        style="width: 30px; min-width: 30px; height: 30px; min-height: 30px"
      >
        <v-icon size="x-large" class="mx-n10 px-n10"
          >mdi-view-split-vertical</v-icon
        >
      </v-btn>
    </div>
  </div>
</template>
