<template>
  <path
    ref="lineGroup"
    class="adi-charts__line"
    d=""
  />
</template>

<script setup>
import { ref, watch, defineProps, inject, unref, nextTick, useTemplateRef } from 'vue'
import { select, line } from 'd3'
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

  if (!lineGroup.value || !props.dataKey || !chartData.data) return

  const { xScale, yScale } = createScales(chartData)

  // const y = scaleLinear([chartData.yMin, chartData.yMax],
  //   [chartData.height - chartData.marginBottom, chartData.marginTop]
  // )

   const Renderline = line()
      .x(d => xScale(d.date))
      .y(d => yScale(d[props.dataKey]));

     select(lineGroup.value).attr("fill", "none")
       .attr("stroke", "steelblue")
       .attr("stroke-width", 1.5)
       .attr("d", Renderline(chartData.data));
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