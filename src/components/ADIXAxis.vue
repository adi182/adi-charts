<template>
  <g
    ref="axisGroup"
    class="adi-charts__x-axis"
    :transform="`translate(0,${adiChartData.height - adiChartData.marginBottom})`"
  ></g>
</template>

<script setup>
import { ref, watch, defineProps, inject, unref, nextTick, useTemplateRef } from 'vue'
import { select, axisBottom } from 'd3'

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
  x: null,
}))

const axisGroup = useTemplateRef('axisGroup')

const renderAxis = async () => {
  await nextTick()

  const chartData = unref(adiChartData)
  const xScale = chartData.x ? unref(chartData.x) : null
  if (!axisGroup.value || !xScale) return

  const axis = axisBottom(xScale)
    .ticks(props.ticks ?? Math.max(1, Math.floor(chartData.width / 80)))
    .tickSizeOuter(0)

  select(axisGroup.value).call(axis)
}

watch(
  () => [
    axisGroup.value,
    unref(adiChartData).x ? unref(unref(adiChartData).x) : null,
    unref(adiChartData).width,
    unref(adiChartData).height,
    unref(adiChartData).marginBottom,
    props.ticks,
  ],
  renderAxis,
  { immediate: true, flush: 'post' }
)
</script>  