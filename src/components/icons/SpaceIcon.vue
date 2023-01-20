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
    <g id="Spaces">
      <rect
        x="5"
        y="5"
        width="146.667"
        height="146.667"
        :style="{ fill: props.fill }"
      />
      <g transform="matrix(1,0,0,1,0,171.667)">
        <rect
          x="5"
          y="5"
          width="146.667"
          height="146.667"
          :style="{ fill: props.fill }"
        />
      </g>
      <g transform="matrix(1,0,0,1,0,343.333)">
        <rect
          x="5"
          y="5"
          width="146.667"
          height="146.667"
          :style="{ fill: props.fill }"
        />
      </g>
      <g transform="matrix(1,0,0,1,171.667,0)">
        <rect
          x="5"
          y="5"
          width="146.667"
          height="146.667"
          :style="{ fill: props.fill }"
        />
      </g>
      <g transform="matrix(1,0,0,1,171.667,171.667)">
        <rect
          x="5"
          y="5"
          width="146.667"
          height="146.667"
          :style="{ fill: props.fill }"
        />
      </g>
      <g transform="matrix(1,0,0,1,171.667,343.333)">
        <rect
          x="5"
          y="5"
          width="146.667"
          height="146.667"
          :style="{ fill: props.fill }"
        />
      </g>
      <g transform="matrix(1,0,0,1,343.333,0)">
        <rect
          x="5"
          y="5"
          width="146.667"
          height="146.667"
          :style="{ fill: props.fill }"
        />
      </g>
      <g transform="matrix(1,0,0,1,343.333,171.667)">
        <rect
          x="5"
          y="5"
          width="146.667"
          height="146.667"
          :style="{ fill: props.fill }"
        />
      </g>
      <g transform="matrix(1,0,0,1,343.333,343.333)">
        <rect
          x="5"
          y="5"
          width="146.667"
          height="146.667"
          :style="{ fill: props.fill }"
        />
      </g>
    </g>
  </svg>
</template>
