<script setup lang="ts">
import { RouterView, useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<template>
  <v-layout>
    <v-app-bar color=""></v-app-bar>
    <v-navigation-drawer rail color="" permanent>
      <v-list>
        <v-divider />
        <v-list-item
          prepend-icon="mdi-table-multiple"
          value="build-program"
          :active="route.name == 'build-program'"
          @click="router.push('/')"
        />
        <v-divider />
        <v-list-item
          prepend-icon="mdi-circle"
          value="adjacency"
          :active="route.name == 'adjacency'"
          @click="router.push('adjacency')"
        />
        <v-divider />
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn variant="plain" block>
            <v-icon size="x-large">mdi-cog</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>
