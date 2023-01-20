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
    <g id="Programs">
      <g transform="matrix(1,0,0,1.78832,0,122.602)">
        <rect
          x="5"
          y="5"
          width="490"
          height="60.833"
          :style="{ fill: props.fill }"
        />
      </g>
      <g transform="matrix(1,0,0,1.78832,0,-57.06)">
        <rect
          x="5"
          y="176.667"
          width="490"
          height="60.833"
          :style="{ fill: props.fill }"
        />
      </g>
      <g transform="matrix(1,0,0,1.78832,0,-310.937)">
        <rect
          x="5"
          y="176.667"
          width="490"
          height="60.833"
          :style="{ fill: props.fill }"
        />
      </g>
      <g transform="matrix(1,0,0,1.78832,0,-236.722)">
        <rect
          x="5"
          y="348.333"
          width="490"
          height="60.833"
          :style="{ fill: props.fill }"
        />
      </g>
    </g>
  </svg>
</template>
