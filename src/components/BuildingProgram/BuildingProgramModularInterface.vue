<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

import { useUiStateStore } from "@/stores/uiStateStore";

import BuildDepartments from "@/components/BuildingProgram/BuildDepartments.vue";
import BuildPrograms from "@/components/BuildingProgram/BuildPrograms.vue";
import BuildTypes from "@/components/BuildingProgram/BuildTypes.vue";

import DepartmentIcon from "@/components/icons/DepartmentIcon.vue";
import TypeIcon from "@/components/icons/TypeIcon.vue";
import ProgramIcon from "@/components/icons/ProgramIcon.vue";

enum CurrentViewType {
  DepartmentView,
  TypeView,
  ProgramView,
}
const currentViewType = ref(CurrentViewType.DepartmentView);

const uiStore = useUiStateStore();
const toggleSplitScreen = function () {
  uiStore.toggleSplitScreen();
};
function activateView(viewType: CurrentViewType) {
  if (currentViewType.value != viewType) {
    currentViewType.value = viewType;
  }
}
const { xlAndUp } = useDisplay();
</script>

<template>
  <div>
    <BuildDepartments
      v-if="currentViewType == CurrentViewType.DepartmentView"
    ></BuildDepartments>
    <BuildTypes v-if="currentViewType == CurrentViewType.TypeView"></BuildTypes>
    <BuildPrograms
      v-if="currentViewType == CurrentViewType.ProgramView"
    ></BuildPrograms>

    <div class="rounded elevation-2 view-type-picker">
      <div
        class="pa-2 pt-1 pointer rounded"
        style="width: 100%; height: 33%"
        @click="activateView(CurrentViewType.DepartmentView)"
        :style="
          currentViewType == CurrentViewType.DepartmentView
            ? { backgroundColor: '#E0E0E0' }
            : {}
        "
      >
        <department-icon fill="#616161"></department-icon>
        <v-tooltip activator="parent" location="end"
          >Departments View</v-tooltip
        >
      </div>

      <v-divider></v-divider>

      <div
        class="pa-2 pt-1 pointer rounded"
        style="width: 100%; height: 33%"
        @click="activateView(CurrentViewType.TypeView)"
        :style="
          currentViewType == CurrentViewType.TypeView
            ? { backgroundColor: '#E0E0E0' }
            : {}
        "
      >
        <type-icon fill="#616161"></type-icon>
        <v-tooltip activator="parent" location="end"
          >Program Types View</v-tooltip
        >
      </div>

      <v-divider></v-divider>

      <div
        class="pa-2 pt-1 pointer rounded"
        style="width: 100%; height: 33%"
        @click="activateView(CurrentViewType.ProgramView)"
        :style="
          currentViewType == CurrentViewType.ProgramView
            ? { backgroundColor: '#E0E0E0' }
            : {}
        "
      >
        <program-icon fill="#616161"></program-icon>
        <v-tooltip activator="parent" location="end"
          >Program Definitions View</v-tooltip
        >
      </div>
    </div>

    <div class="split-screen-control-position" v-if="xlAndUp">
      <v-btn
        class="px-n5 split-screen-control"
        size="x-small"
        style=""
        @click="toggleSplitScreen()"
      >
        <v-icon size="x-large" color="grey darken-4" class="mx-n10 px-n10"
          >mdi-view-split-vertical</v-icon
        >
        <v-tooltip activator="parent" location="end"
          >Toggle Split Screen View</v-tooltip
        >
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.view-type-picker {
  position: fixed;
  margin-left: 8px;
  margin-top: 6px;
  width: 30px;
  height: 90px;
  background-color: white;
}
.split-screen-control {
  width: 30px;
  min-width: 30px;
  height: 30px;
  min-height: 30px;
}
.split-screen-control-position {
  position: fixed;
  margin-left: 8px;
  margin-top: 110px;
}
</style>
