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
  xStart: {
    type: [Number, Date, String],
    default: 0,
  },
  xEnd: {
    type: [Number, Date, String],
    default: null,
  },
  yStart: {
    type: [Number, Date, String],
    default: 0,
  },
  yEnd: {
    type: [Number, Date, String],
    default: null,
  },
})

const parsedData = props.data.map(d => ({
  ...d,
  date: new Date(d.date)
}));

const adiChartData = ref({
  data: parsedData,
  width: props.width,
  height: props.height,
  marginTop: props.marginTop,
  marginRight: props.marginRight,
  marginBottom: props.marginBottom,
  marginLeft: props.marginLeft,
  xStart: props.xStart,
  xEnd: props.xEnd,
  yStart: props.yStart,
  yEnd: props.yEnd, 
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