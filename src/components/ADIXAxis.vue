<template>
  <g
    ref="axisGroup"
    class="adi-charts__x-axis"
  />
</template>

<script setup>
import { ref, watch, defineProps, inject, unref, nextTick, useTemplateRef } from 'vue'
import { select, axisBottom, scaleTime } from 'd3'

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
  xStart: 0,
  xEnd: 1, 
}))

const axisGroup = useTemplateRef('axisGroup')

const renderAxis = async () => {
  await nextTick()

  const chartData = unref(adiChartData)

  const x = scaleTime()
  .domain([chartData.xStart, chartData.xEnd])
  .range([chartData.marginLeft, chartData.width - chartData.marginRight])
  
  select(axisGroup.value).attr("transform", `translate(0,${chartData.height - chartData.marginBottom})`)
      .call(axisBottom(x).ticks(chartData.width / 80).tickSizeOuter(0));
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