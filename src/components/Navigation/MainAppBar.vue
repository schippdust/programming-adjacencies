<script setup lang="ts">
import { useIoStore } from '@/stores/ioStore';
const ioStore = useIoStore();

function saveStateAsJson() {
  console.log("trying to save state");
  console.log(ioStore.getSaveDataAsJson());
}
</script>

<template>
  <v-app-bar
    color=""
    density="compact"
    flat
    style="border-bottom: solid 0.5px lightgrey"
  >
    <v-toolbar-title>Programming and Adjacencies</v-toolbar-title>

    <p class="text-caption mb-n3 mr-4">v0.1</p>

    <v-btn variant="outlined" class="mx-1" @click="saveStateAsJson()">
      <v-icon size="x-large" class="mx-n5 px-n4"
        >mdi-content-save-outline</v-icon
      >
    </v-btn>
    <v-btn variant="outlined" class="mx-1">
      <v-icon size="x-large">mdi-folder-open-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>
