<template>

        <path 
            ref="lineGroup"
    class="adi-charts__line"
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" :d="lineData" />

</template>

<script setup>
import { ref, watch, defineProps, inject, unref, nextTick, useTemplateRef } from 'vue'
import { select, line} from 'd3'

let lineData = ref(null)

const adiChartData = inject('adiChartData', ref({
  data: [],
  width: 0,
  height: 0,
  marginBottom: 0,
  x: null,
  y: null,
}))

const lineGroup = useTemplateRef('lineGroup')

const renderLine = async () => {
  await nextTick()
  const chartData = unref(adiChartData)
  console.log('line chartData', chartData)

  const xScale = chartData.x ? unref(chartData.x) : null
  const yScale = chartData.y ? unref(chartData.y) : null
  console.log(xScale(chartData.data[0]?.date), yScale(chartData.data[0]?.count), chartData.data?.length)
  
  if (!xScale || !yScale || !chartData.data?.length) return

  const lineCalc = line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.count))
  console.log('lineCalc(chartData.data)', lineCalc(chartData.data))
  lineData.value = lineCalc(chartData.data)
}

watch(
  () => [
    lineGroup.value,
    unref(adiChartData).x ? unref(unref(adiChartData).x) : null,
    unref(adiChartData).data,
    unref(adiChartData).width,
    unref(adiChartData).height,
    unref(adiChartData).marginBottom,
  ],
  renderLine,
  { immediate: true, flush: 'post' }
)
</script>  