<template>

        <path 
            ref="lineGroup"
    class="adi-charts__line"
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" :d="line(adiChartData.data)" />

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
}))

const lineGroup = useTemplateRef('lineGroup')

const renderLine = async () => {
  await nextTick()

  const line = line((d, i) => x(i), y);

}

watch(
  () => [
    axisGroup.value,
    unref(adiChartData).x ? unref(unref(adiChartData).x) : null,
    unref(adiChartData).data,
    unref(adiChartData).width,
    unref(adiChartData).height,
    unref(adiChartData).marginBottom,
    props.ticks,
  ],
  renderAxis,
  { immediate: true, flush: 'post' }
)
</script>  