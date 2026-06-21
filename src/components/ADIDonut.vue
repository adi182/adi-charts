<template>
  <g ref="donutGroup" class="adi-charts__donut" />
</template>

<script setup>
import { ref, watch, defineProps, inject, unref, nextTick, useTemplateRef } from 'vue';
import { select, scaleOrdinal, schemeTableau10, pie, arc, sum } from 'd3';

const props = defineProps({
  dataKey: {
    type: String,
    default: null,
  },
  legendKey: {
    type: String,
    default: null,
  },
  ringRadius: {
    type: [Number, String],
    default: 0,
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

const donutGroup = useTemplateRef('donutGroup');

const renderDonut = async () => {
  await nextTick();
  const chartData = unref(adiChartData);

  if (!donutGroup.value || !props.dataKey || !chartData.data) return;

  const radius = Math.min(chartData.width, chartData.height) / 2 - 80;

  select(donutGroup.value).attr(
    'transform',
    `translate(${chartData.width / 2},${chartData.height / 2})`
  );

  const colour = scaleOrdinal(schemeTableau10);

  const pieGenerator = pie()
    .sort(null)
    .value(d => d[props.dataKey]);

  const arcGenerator = arc()
  .innerRadius(props.ringRadius)
  .outerRadius(radius);

  const outerArc = arc()
    .innerRadius(radius * 1.15)
    .outerRadius(radius * 1.15);

  const pieData = pieGenerator(chartData.data);

  const total = sum(chartData.data, d => d[props.dataKey]);

  //Draw slices
  select(donutGroup.value)
    .selectAll('path.slice')
    .data(pieData)
    .enter()
    .append('path')
    .attr('class', 'slice')
    .attr('stroke', 'white')
    .attr('stroke-width', 2)
    .attr('d', arcGenerator)
    .attr('fill', (d, i) => colour(i));

  // Draw leader lines
  select(donutGroup.value)
    .selectAll('polyline')
    .data(pieData)
    .enter()
    .append('polyline')
    .attr('class', 'line')
    .attr('fill', 'none')
    .attr('stroke', '#888')
    .attr('stroke-width', 1.5)
    .attr('points', d => {
      const posA = arcGenerator.centroid(d);
      const posB = outerArc.centroid(d);
      const posC = [...posB];
      const midAngle = (d.startAngle + d.endAngle) / 2;
      posC[0] = radius * 1.35 * (midAngle < Math.PI ? 1 : -1);
      return [posA, posB, posC];
    });

  // Draw labels
  select(donutGroup.value)
    .selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('dy', '0.35em')
    .text(d => {
      const pct = ((d.data.count / total) * 100).toFixed(1);
      return `${d.data.name} (${pct}%)`;
    })
    .attr('transform', d => {
      const pos = outerArc.centroid(d);
      const midAngle = (d.startAngle + d.endAngle) / 2;
      pos[0] = radius * 1.42 * (midAngle < Math.PI ? 1 : -1);
      return `translate(${pos})`;
    })
    .style('text-anchor', d => {
      const midAngle = (d.startAngle + d.endAngle) / 2;
      return midAngle < Math.PI ? 'start' : 'end';
    });
};

watch(
  () => [
    donutGroup.value,
    unref(adiChartData).data,
    unref(adiChartData).width,
    unref(adiChartData).height,
    unref(adiChartData).marginBottom,
    props.dataKey,
  ],
  renderDonut,
  { immediate: true, flush: 'post' }
);
</script>
