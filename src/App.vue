<script setup lang="ts">
import { RouterView } from "vue-router";
import NavigationDrawer from "./components/NavigationDrawer.vue";
</script>

<template>
  <v-layout>
    <v-app-bar color=""></v-app-bar>
    <NavigationDrawer />
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>
