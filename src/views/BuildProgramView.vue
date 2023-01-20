<script setup lang="ts">
import DepartmentIcon from "../components/icons/DepartmentIcon.vue";
import TypeIcon from "../components/icons/TypeIcon.vue";
import ProgramIcon from "../components/icons/ProgramIcon.vue";
import SpaceIcon from "../components/icons/SpaceIcon.vue";

const iconFill = "#8a8a8a";
const dim = 30;
</script>

<template>
  <div>
    <DepartmentIcon :dim="dim" :fill="iconFill" />
    <TypeIcon :dim="dim" :fill="iconFill" />
    <ProgramIcon :dim="dim" :fill="iconFill" />
    <SpaceIcon :dim="dim" :fill="iconFill" />
  </div>
</template>
