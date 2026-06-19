<script setup>
import { provide, ref, computed } from 'vue'
import { scaleUtc, scaleLinear, extent, max } from 'd3'
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

// const x = computed(() =>

// )

// const y = computed(() =>

// )

const adiChartData = ref({
  data: props.data,
  x:  scaleUtc(
    extent(props.data, (d) => d.date),
    [props.marginLeft, props.width - props.marginRight]
  ),
  y: scaleLinear(
    [0, max(props.data, (d) => d.close) ?? 0],
    [props.height - props.marginBottom, props.marginTop]
  ),
  width: props.width,
  height: props.height,
  marginTop: props.marginTop,
  marginRight: props.marginRight,
  marginBottom: props.marginBottom,
  marginLeft: props.marginLeft,
})

provide('adiChartData', adiChartData)

</script>

<template>
    <svg class="adi-charts__chart" :width="props.width" :height="props.height">
        <slot />
    </svg>
    {{ adiChartData }}

</template>

<style scoped>
.adi-charts__chart {

}
</style>