import { scaleTime, scaleLinear } from 'd3'

function createScales(chartData) {
const { width, height,xMin,xMax, yMin, yMax, marginBottom , marginTop, marginLeft, marginRight} = chartData
// const xScale = scaleTime()
//     .domain(extent(data, d => d.date))
//     .range([0, width]);

const xScale = scaleTime()
    .domain([xMin, xMax])
    .range([marginLeft, width - marginRight]);

// const minY = scaleLinear().domain(extent(data, d => Math.min(d.count, d.countTwo))).range([0, 1]).domain()[0];
// const maxY = scaleLinear().domain(extent(data, d => Math.max(d.count, d.countTwo))).range([0, 1]).domain()[1];
// const padding = (yMax - yMin) * 0.1;

const yScale = scaleLinear()
    .domain([yMin, yMax])
    .nice()
    .range([height - marginBottom,  marginTop]);

    return {xScale, yScale}
}

export default createScales 

