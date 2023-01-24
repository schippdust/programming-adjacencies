<script setup lang="ts">
import BuildingProgramModularInterface from "@/components/BuildingProgram/BuildingProgramModularInterface.vue";
import { useUiStateStore } from "@/stores/uiState.store";
import { createVuetify } from "vuetify/lib/framework.mjs";
const uiState = useUiStateStore();
const iconFill = uiState.typicalIconFill;
const mainAppBarElement = document.getElementById(uiState.mainAppBarId);
let mainAppBarHeight = mainAppBarElement?.clientHeight;
mainAppBarHeight = mainAppBarHeight ? mainAppBarHeight : 0;
const workPaneHeight = window.innerHeight - mainAppBarHeight;

const mainDrawerElement = document.getElementById(uiState.mainDrawerId);
let mainDrawerWidth = mainDrawerElement?.clientWidth;
mainDrawerWidth = mainDrawerWidth ? mainDrawerWidth : 0;
const workPaneWidth = window.innerWidth - mainDrawerWidth;
const splitScreen = uiState.programCreationSplitScreen;
</script>

<template>
  <div>
    <div v-if="splitScreen">
      <div
        style="position: fixed; display: inline; background-color: lightblue"
        :style="{ height: workPaneHeight + 'px', width: workPaneWidth + 'px' }"
      >
        <div
          style="position: fixed; background-color: lightsalmon"
          :style="{
            width: workPaneWidth / 2 + 'px',
            height: workPaneHeight + 'px',
          }"
        >
          <BuildingProgramModularInterface />
        </div>
        <div
          style="position: fixed; right: 0%; background-color: lightgreen"
          :style="{
            width: workPaneWidth / 2 + 'px',
            height: workPaneHeight + 'px',
          }"
        >
          <BuildingProgramModularInterface />
        </div>
      </div>
    </div>
    <div v-if="!splitScreen">
      <div
        style="position: fixed; background-color: lightblue"
        :style="{ height: workPaneHeight + 'px', width: workPaneWidth + 'px' }"
      >
        <div
          style="position: fixed; background-color: lightseagreen"
          :style="{
            height: workPaneHeight + 'px',
            width: workPaneWidth + 'px',
          }"
        >
          <BuildingProgramModularInterface />
        </div>
      </div>
    </div>
  </div>
</template>
