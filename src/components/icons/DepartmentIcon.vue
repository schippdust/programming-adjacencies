<script setup lang="ts">
const props = defineProps(["fill", "dim"]);
</script>

<template>
  <svg
    :width="props.dim"
    :height="props.dim"
    viewBox="0 0 500 500"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Department">
      <rect
        x="5"
        y="5"
        width="490"
        height="490"
        :style="{ fill: props.fill }"
      />
    </g>
  </svg>
</template>
