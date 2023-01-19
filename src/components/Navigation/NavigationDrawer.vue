<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
</script>

<template>
  <v-navigation-drawer rail color="" permanent>
    <v-list class="mt-0 pt-0">
      <v-divider />
      <div>
        <v-list-item
          prepend-icon="mdi-table-multiple"
          value="build-program"
          :active="route.name == 'build-program'"
          @click="router.push('/')"
        >
        </v-list-item>
        <v-tooltip activator="parent" location="end">
          Create Program
        </v-tooltip>
      </div>
      <v-divider />
      <div>
        <v-list-item
          prepend-icon="mdi-circle"
          value="adjacency"
          :active="route.name == 'adjacency'"
          @click="router.push('adjacency')"
        >
        </v-list-item>
        <v-tooltip activator="parent" location="end">
          Manage Adjacencies
        </v-tooltip>
      </div>
      <v-divider />
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn variant="plain" block>
          <v-icon size="x-large">mdi-cog</v-icon>
          <v-tooltip activator="parent" location="end"> Settings </v-tooltip>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
