<template>
  <g ref="pointGroup" class="adi-charts__points" d="" />
</template>

<script setup>
import { ref, watch, defineProps, inject, unref, nextTick, useTemplateRef } from 'vue';
import { select } from 'd3';
import createScales from '../helpers/scales';
import colorGenerator from '../helpers/color';
const props = defineProps({
  dataKey: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  legendKey: {
    type: String,
    default: null,
  },
});

const adiChartData = inject(
  'adiChartData',
  ref({
    data: [],
    width: 0,
    height: 0,
    marginBottom: 0,
    xMin: 0,
    xMax: 1,
    yMin: 0,
    yMax: 1,
  })
);

const pointGroup = useTemplateRef('pointGroup');

const renderPoints = async () => {
  await nextTick();
  const chartData = unref(adiChartData);

  if (!pointGroup.value || !props.dataKey || !chartData.data) return;

  const { xScale, yScale } = createScales(chartData, props.legendKey);

  select(pointGroup.value)
    .selectAll('.point')
    .data(chartData.data)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('cx', d => xScale(d[props.legendKey]))
    .attr('cy', d => yScale(d[props.dataKey]))
    .attr('r', 5)
    .attr('fill', props.color ? props.color : colorGenerator(chartData.data));
};

watch(
  () => [
    pointGroup.value,
    unref(adiChartData).data,
    unref(adiChartData).width,
    unref(adiChartData).height,
    unref(adiChartData).marginBottom,
    props.dataKey,
  ],
  renderPoints,
  { immediate: true, flush: 'post' }
);
</script>
