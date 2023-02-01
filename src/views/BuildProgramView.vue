<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useDisplay } from "vuetify/lib/framework.mjs";

import { useUiStateStore } from "@/stores/uiState.store";

import {
  useWindowWidth,
  useWindowHeight,
  useDrawerWidth,
  useMainAppBarHeight,
} from "@/composables/resizeComposables";

import BuildingProgramModularInterface from "@/components/BuildingProgram/BuildingProgramModularInterface.vue";

const { windowWidth } = useWindowWidth();
const { windowHeight } = useWindowHeight();
const { mainDrawerWidth } = useDrawerWidth();
const { mainAppBarHeight } = useMainAppBarHeight();

const workPaneHeight = computed(
  () => windowHeight.value - mainAppBarHeight.value
);
const workPaneWidth = computed(() => windowWidth.value - mainDrawerWidth.value);

const uiState = useUiStateStore();
const { programCreationSplitScreen } = storeToRefs(uiState);
const { xlAndUp } = useDisplay();
</script>

<template>
  <div>
    <div>
      <div
        style="position: fixed; display: inline"
        :style="{ height: workPaneHeight + 'px', width: workPaneWidth + 'px' }"
      >
        <div
          style="position: fixed; border-right: solid #bdbdbd 1px"
          :style="{
            //the -8 / 16 is sloppy, it's due to the scroll bar and avoiding overlap between the two
            width:
              programCreationSplitScreen && xlAndUp
                ? workPaneWidth / 2 - 8 + 'px'
                : workPaneWidth - 16 + 'px',
            height: workPaneHeight + 'px',
          }"
        >
          <BuildingProgramModularInterface />
        </div>
        <div
          style="position: fixed; right: 0%"
          v-if="programCreationSplitScreen && xlAndUp"
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
