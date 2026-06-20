<template>
  <g
    ref="lineGroup"
    class="adi-charts__bar"
  /> 
</template>

<script setup>
import { ref, watch, defineProps, inject, unref, nextTick, useTemplateRef } from 'vue'
import { select, scaleBand,  scaleLinear } from 'd3'


const props = defineProps({
  dataKey: {
    type: String,
    default: null,
  },
})

const adiChartData = inject('adiChartData', ref({
  data: [],
  width: 0,
  height: 0,
  marginBottom: 0,
  xStart: 0,
  xEnd: 1,
  yStart: 0,
  yEnd: 1, 
}))

const lineGroup = useTemplateRef('lineGroup')

const renderLine = async () => {
  await nextTick()
  const chartData = unref(adiChartData)

  if (!lineGroup.value || !props.dataKey) return

const x = scaleBand()
  .domain(chartData.data.map(d => d.date))
  .range([chartData.marginLeft, chartData.width - chartData.marginRight])
  .padding(0.1)
// Y-axis scale for the count
const y = scaleLinear()
    .domain([chartData.yStart, chartData.yEnd])
    .range([chartData.height - chartData.marginBottom, chartData.marginTop])

    
    select(lineGroup.value).
    selectAll("rect")
    .data(chartData.data)
    .join("rect")
    .attr("x", d => x(d.date))
    .attr("y", d => y(d[props.dataKey]))
    .attr("ex", d => (d.date))
    .attr("wi", d => (d[props.dataKey]))
    .attr("width", x.bandwidth()) // 
    .attr("height", d => chartData.height - y(d[props.dataKey]) - chartData.marginBottom) // Adjust for top and bottom margins
    .attr("fill", "steelblue");
}

watch(
  () => [
    lineGroup.value,
    unref(adiChartData).data,
    unref(adiChartData).width,
    unref(adiChartData).height,
    unref(adiChartData).marginBottom,
    props.dataKey
  ],
  renderLine,
  { immediate: true, flush: 'post' }
)
</script>  