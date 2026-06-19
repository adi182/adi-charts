import { App } from "vue";
import LineChart from "./components/LineChart.vue";
import ADIChart from "./components/ADIChart.vue";
export { LineChart, LineChart as AdiLineChart, ADIChart};

export function install(app: App) {
  app.component("ADILineChart", LineChart);
  app.component("ADIChart", ADIChart);
}

export const AdiCharts = { install };