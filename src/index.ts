import { App } from "vue";
import LineChart from "./components/LineChart.vue";

export { LineChart, LineChart as AdiLineChart };

export function install(app: App) {
  app.component("ADILineChart", LineChart);
}

export const AdiCharts = { install };