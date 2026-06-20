<template>
  <g
    ref="axisGroup"
    class="adi-charts__x-axis"
  />
</template>

<script setup>
import { ref, watch, defineProps, inject, unref, nextTick, useTemplateRef } from 'vue'
import { select, axisBottom } from 'd3'
import createScales from '../helpers/scales'


const props = defineProps({
  ticks: {
    type: Number,
    default: 1,
  },
})

const adiChartData = inject('adiChartData', ref({
  width: 0,
  height: 0,
  marginBottom: 0,
  xMin: 0,
  xMax: 1, 
}))

const axisGroup = useTemplateRef('axisGroup')

const renderAxis = async () => {
  await nextTick()

  const chartData = unref(adiChartData)

  const { xScale } = createScales(chartData)

  select(axisGroup.value)
  .attr("transform", `translate(0,${chartData.height - chartData.marginBottom})`)
  .call(
    axisBottom(xScale)
    .ticks(chartData.width / 80)
  //.tickValues(chartData.data.map(d => d.date))
    .tickSizeOuter(0));
}

watch(
  () => [
    axisGroup.value,
    unref(adiChartData).width,
    unref(adiChartData).height,
    unref(adiChartData).marginBottom,
    props.ticks,
  ],
  renderAxis,
  { immediate: true, flush: 'post' }
)
</script>  