<script setup lang="ts">
import { useUiStateStore } from "@/stores/uiState.store";
import { computed } from "vue";
import { storeToRefs } from "pinia";

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
const { typicalIconFill, programCreationSplitScreen } = storeToRefs(uiState);
</script>

<template>
  <div>
    <div>
      <div
        style="position: fixed; display: inline; background-color: lightblue"
        :style="{ height: workPaneHeight + 'px', width: workPaneWidth + 'px' }"
      >
        <div
          style="position: fixed; background-color: lightsalmon"
          :style="{
            //the -8 / 16 is sloppy, it's due to the scroll bar and avoiding overlap between the two
            width: programCreationSplitScreen
              ? workPaneWidth / 2 - 8 + 'px'
              : workPaneWidth - 16 + 'px',
            height: workPaneHeight + 'px',
          }"
        >
          <BuildingProgramModularInterface />
        </div>
        <div
          style="position: fixed; right: 0%; background-color: lightgreen"
          v-if="programCreationSplitScreen"
          :style="{
            //the -8 is sloppy, it's due to the scroll bar and avoiding overlap between the two
            width: workPaneWidth / 2 - 8 + 'px',
            height: workPaneHeight + 'px',
          }"
        >
          <BuildingProgramModularInterface />
        </div>
      </div>
    </div>
  </div>
</template>
