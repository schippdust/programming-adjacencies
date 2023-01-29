<script setup lang="ts">
import { RouterView } from "vue-router";
import NavigationDrawer from "./components/Navigation/NavigationDrawer.vue";
import MainAppBar from "./components/Navigation/MainAppBar.vue";

import { useUiStateStore } from "@/stores/uiState.store";
const uiState = useUiStateStore();
</script>

<template>
  <v-layout>
    <MainAppBar :id="uiState.mainAppBarId" />
    <NavigationDrawer :id="uiState.mainDrawerId" />

    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style>
.pointer {
  cursor: pointer;
}
.pointer:hover {
  background-color: #f5f5f5;
  transition: 0.2s;
}
</style>
