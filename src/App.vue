<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
// import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <v-layout>
    <v-app-bar color="grey-lighten-2"></v-app-bar>
    <v-navigation-drawer color="grey-darken-2" permanent> </v-navigation-drawer>
    <v-main>
      <v-btn class="ma-2">
        Accept
        <v-icon icon="mdi-vuetify"></v-icon>
      </v-btn>
      <v-icon icon="mdi-vuetify"></v-icon>
      <v-card height="200px"></v-card>
      <!-- <RouterView /> -->
    </v-main>
  </v-layout>
</template>
