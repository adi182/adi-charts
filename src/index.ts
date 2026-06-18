import { App } from "vue";
import LineChart from "./components/LineChart.vue";

export { LineChart };

export function install(app: App) {
  app.component("ADILineChart", LineChart);
}

export const AdiCharts = { install };