<template>
  <g
    ref="axisGroup"
    class="adi-charts__y-axis"
  />
</template>

<script setup>
import { ref, watch, defineProps, inject, unref, nextTick, useTemplateRef } from 'vue'
import { select, axisLeft, scaleLinear } from 'd3'

const props = defineProps({
  ticks: {
    type: Number,
    default: 1,
  },
  showLines: {
    type: Boolean,
    default: false,
  },
  labelTop: {
    type: String,
    default: null,
  },
})

const adiChartData = inject('adiChartData', ref({
  width: 0,
  height: 0,
  marginBottom: 0,
  yStart: 0,
  yEnd: 1, 
}))

const axisGroup = useTemplateRef('axisGroup')

const renderAxis = async () => {
  await nextTick()

  const chartData = unref(adiChartData)

  const y = scaleLinear([chartData.yStart, chartData.yEnd],
    [chartData.height - chartData.marginBottom, chartData.marginTop]
  )

    select(axisGroup.value)
    .attr("transform", `translate(${chartData.marginLeft},0)`)
    .call(axisLeft(y).ticks(chartData.height / 40))

     if (props.showLines) {
      select(axisGroup.value).call(g => g.selectAll(".tick line").clone()
          .attr("x2", chartData.width - chartData.marginLeft - chartData.marginRight)
          .attr("stroke-opacity", 0.1))
     }

     if (props.labelTop && props.labelTop.trim() !== "") {
      select(axisGroup.value).call(g => g.append("text")
          .attr("x", -chartData.marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(props.labelTop));
     }
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