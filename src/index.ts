import { App } from "vue";
import LineChart from "./components/LineChart.vue";
import ADIChart from "./components/ADIChart.vue";
import ADIXAxis from "./components/ADIXAxis.vue";
export { LineChart, LineChart as AdiLineChart, ADIChart, ADIXAxis};

export function install(app: App) {
  app.component("ADILineChart", LineChart);
  app.component("ADIChart", ADIChart);
  app.component("ADIXAxis", ADIXAxis);
}

export const AdiCharts = { install };