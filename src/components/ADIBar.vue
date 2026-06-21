<template>
  <g
    ref="barGroup"
    class="adi-charts__bar"
  /> 
</template>

<script setup>
import { ref, watch, defineProps, inject, unref, nextTick, useTemplateRef } from 'vue'
import { select } from 'd3'
import createScales from '../helpers/scales'
import color from '../helpers/color'

const props = defineProps({
  dataKey: {
    type: String,
    default: null,
  },
  legendKey: {
    type: String,
    default: null,
  },
})

const adiChartData = inject('adiChartData', ref({
  data: [],
  width: 0,
  height: 0,
  marginBottom: 0,
  xMin: 0,
  xMax: 1,
  yMin: 0,
  yMax: 1, 
}))

const barGroup = useTemplateRef('barGroup')

const renderBar = async () => {
  await nextTick()
  const chartData = unref(adiChartData)

  if (!barGroup.value || !props.dataKey || !props.legendKey) return

  const { xScale, yScale } = createScales(chartData, props.legendKey)

  const barWidth = props.legendKey === 'date' ? (
    chartData.width - chartData.marginLeft - chartData.marginRight
  ) / chartData.data.length : xScale.bandwidth();

    select(barGroup.value).
    selectAll("rect")
    .data(chartData.data)
    .join("rect")
    .attr("x", d => xScale(d[props.legendKey]))
    .attr("y", d => yScale(d[props.dataKey]))
    .attr("width",barWidth )
    .attr("height", d => chartData.height - yScale(d[props.dataKey]) - chartData.marginBottom) // Adjust for top and bottom margins
    .attr("fill", color(chartData.data));
}

watch(
  () => [
    barGroup.value,
    unref(adiChartData).data,
    unref(adiChartData).width,
    unref(adiChartData).height,
    unref(adiChartData).marginBottom,
    props.dataKey
  ],
  renderBar,
  { immediate: true, flush: 'post' }
)
</script>  