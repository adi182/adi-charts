<template>
  <g
    ref="labelGroup"
    class="adi-charts__label"
  />
</template>

<script setup>
import { ref, watch, defineProps, inject, unref, nextTick, useTemplateRef } from 'vue'
import { select } from 'd3'

const props = defineProps({
  text: {
    type: String,
    default: null,
  },
  position: {
    type: String,
    default: "top",
  },
  rotation: {
    type: [Number, String],
    default: 0,
  },
})

const adiChartData = inject('adiChartData', ref({
  width: 0,
  height: 0,
  marginBottom: 0,
  yMin: 0,
  yMax: 1, 
}))

const labelGroup = useTemplateRef('labelGroup')

const renderLabel = async () => {
    await nextTick()

    const chartData = unref(adiChartData)

    if (!labelGroup.value || !props.text) return

    let xLocation = 0;
    let yLocation = 0;

    if (props.position === "top") {
      xLocation = chartData.width / 2;
      yLocation = 20;
    } else if (props.position === "bottom") {
      xLocation = chartData.width / 2;
      yLocation = chartData.height - chartData.marginBottom + 30;
    } else if (props.position === "left") {
      xLocation = 30;
      yLocation = (chartData.height / 2) - chartData.marginBottom;
    } else if (props.position === "right") {
      xLocation = chartData.width - chartData.marginRight + 20;
      yLocation = (chartData.height / 2) - chartData.marginBottom;
    }

    select(labelGroup.value)
        .call(g => g.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .attr("transform", `translate(${xLocation},${yLocation}) rotate(-${props.rotation})`)
        .text(props.text));
}

watch(
  () => [
    labelGroup.value,
    unref(adiChartData).width,
    unref(adiChartData).height,
    unref(adiChartData).marginBottom,
    props.ticks,
  ],
  renderLabel,
  { immediate: true, flush: 'post' }
)
</script>  