<script setup>
import { provide, ref } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  width: {
    type: Number,
    default: 640,
  },
  height: {
    type: Number,
    default: 400,
  },
  marginTop: {
    type: Number,
    default: 20,
  },
  marginRight: {
    type: Number,
    default: 20,
  },
  marginBottom: {
    type: Number,
    default: 30,
  },
  marginLeft: {
    type: Number,
    default: 40,
  },
})

const adiChartData = ref({
  data: props.data || [],
})

provide('adiChartData', adiChartData)
</script>

<template class="adi-charts__chart">
  <slot />
</template>