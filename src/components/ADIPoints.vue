<template>
  <g
    ref="lineGroup"
    class="adi-charts__points"
    d=""
  />
</template>

<script setup>
import { ref, watch, defineProps, inject, unref, nextTick, useTemplateRef } from 'vue'
import { select, scaleTime, scaleLinear} from 'd3'
import createScales from '../helpers/scales'

const props = defineProps({
  dataKey: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: "steelblue",
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

  if (!lineGroup.value || !props.dataKey || !chartData.data) return

 const { xScale, yScale } = createScales(chartData)
  
  // const x = scaleTime()
  // .domain([chartData.xMin, chartData.xMax])
  // .range([chartData.marginLeft, chartData.width - chartData.marginRight])

  // const y = scaleLinear([chartData.yMin, chartData.yMax],
  //   [chartData.height - chartData.marginBottom, chartData.marginTop]
  // )
     select(lineGroup.value).
     selectAll(".point")
    .data(chartData.data)
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("cx", d => xScale(d.date))
    .attr("cy", d => yScale(d[props.dataKey]))
    .attr("r", 5)
    .attr("fill", props.color);

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