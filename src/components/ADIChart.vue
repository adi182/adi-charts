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
  xMin: {
    type: [Number, Date, String],
    default: 0,
  },
  xMax: {
    type: [Number, Date, String],
    default: null,
  },
  yMin: {
    type: [Number, Date, String],
    default: 0,
  },
  yMax: {
    type: [Number, Date, String],
    default: null,
  },
})

const parsedData = props.data.map(d => ({
  ...d,
  ...(d.date !== undefined && {
    date: new Date(d.date)
  })
}));

const adiChartData = ref({
  data: parsedData,
  width: props.width,
  height: props.height,
  marginTop: props.marginTop,
  marginRight: props.marginRight,
  marginBottom: props.marginBottom,
  marginLeft: props.marginLeft,
  xMin: props.xMin,
  xMax: props.xMax,
  yMin: props.yMin,
  yMax: props.yMax, 
})

provide('adiChartData', adiChartData)

</script>

<template>
  <svg
    class="adi-charts__chart"
    :width="props.width"
    :height="props.height"
  >
    <slot />
  </svg>
  props <pre> {{ props }} </pre>
</template>

<style scoped>
.adi-charts__chart {

}
</style>