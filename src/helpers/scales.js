import { scaleTime, scaleLinear, scaleBand } from 'd3';

function createScales(chartData, xKey = 'date') {
  const {
    width,
    height,
    xMin,
    xMax,
    yMin,
    yMax,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    data,
  } = chartData;

  let xScale;

  if (xKey === 'date') {
    xScale = scaleTime()
      .domain([xMin, xMax])
      .range([marginLeft, width - marginRight]);
  } else {
    xScale = scaleBand()
      .domain(data.map(d => d[xKey]))
      .range([marginLeft, width - marginRight])
      .padding(0.2);
  }

  const yScale = scaleLinear()
    .domain([yMin, yMax])
    .nice()
    .range([height - marginBottom, marginTop]);

  return { xScale, yScale };
}

export default createScales;
