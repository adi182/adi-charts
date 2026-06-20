import { scaleOrdinal, schemeTableau10 } from 'd3'

const color =  (data) => {
   return scaleOrdinal()
    .domain(data.map(d => d.date))   // stable key per point
    .range(schemeTableau10);      // or d3.schemeCategory10
}

export default color