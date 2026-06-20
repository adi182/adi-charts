<template>
  <g
    ref="lineGroup"
    class="adi-charts__bar"
  /> 
</template>

<script setup>
import { ref, watch, defineProps, inject, unref, nextTick, useTemplateRef } from 'vue'
import { select,  scaleLinear } from 'd3'
import createScales from '../helpers/scales'


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
  xMin: 0,
  xMax: 1,
  yMin: 0,
  yMax: 1, 
}))

const lineGroup = useTemplateRef('lineGroup')

const renderLine = async () => {
  await nextTick()
  const chartData = unref(adiChartData)

  if (!lineGroup.value || !props.dataKey) return

const { xScale, yScale } = createScales(chartData)

  // const y = scaleLinear()
  //   .domain([chartData.yMin, chartData.yMax])
  //   .range([chartData.height - chartData.marginBottom, chartData.marginTop])



    const barWidth = chartData.width / chartData.data.length  - 1;

    select(lineGroup.value).
    selectAll("rect")
    .data(chartData.data)
    .join("rect")
    .attr("x", d => xScale(d.date) ) // Center the bar on the date
    .attr("y", d => yScale(d[props.dataKey]))
     .attr("ex", d => (d.date))
     .attr("wi", d => (d[props.dataKey]))
   // .attr("width", x.bandwidth() / 2)
   .attr("width", barWidth)
    .attr("height", d => chartData.height - yScale(d[props.dataKey]) - chartData.marginBottom) // Adjust for top and bottom margins
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