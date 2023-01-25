<script setup lang="ts">
import { useUiStateStore } from "@/stores/uiState.store";
import { computed } from "vue";

import BuildingProgramModularInterface from "@/components/BuildingProgram/BuildingProgramModularInterface.vue";

import {
  useWindowWidth,
  useWindowHeight,
  useDrawerWidth,
  useMainAppBarHeight,
} from "@/composables/resizeComposables";

const { windowWidth } = useWindowWidth();
const { windowHeight } = useWindowHeight();
const { mainDrawerWidth } = useDrawerWidth();
const { mainAppBarHeight } = useMainAppBarHeight();

const workPaneHeight = computed(
  () => windowHeight.value - mainAppBarHeight.value
);
const workPaneWidth = computed(() => windowWidth.value - mainDrawerWidth.value);

const uiState = useUiStateStore();
const iconFill = uiState.typicalIconFill;
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
