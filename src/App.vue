<script setup lang="ts">
import { RouterView } from "vue-router";
import NavigationDrawer from "./components/Navigation/NavigationDrawer.vue";
import MainAppBar from "./components/Navigation/MainAppBar.vue";
</script>

<template>
  <v-layout>
    <MainAppBar />
    <NavigationDrawer />

    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>
