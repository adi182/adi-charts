import { App } from "vue";
import LineChart from "./components/LineChart.vue";
import ADIChart from "./components/ADIChart.vue";
import ADIXAxis from "./components/ADIXAxis.vue";
import ADILine from "./components/ADILine.vue";
import ADIBar from "./components/ADIBar.vue";
import ADIYAxis from "./components/ADIYAxis.vue";

export { LineChart, LineChart as AdiLineChart, ADIChart, ADIXAxis, ADILine, ADIYAxis, ADIBar};

export function install(app: App) {
  app.component("ADILineChart", LineChart);
  app.component("ADIChart", ADIChart);
  app.component("ADIXAxis", ADIXAxis);
  app.component("ADILine", ADILine);
  app.component("ADIYAxis", ADIYAxis);
  app.component("ADIBar", ADIBar);
}

export const AdiCharts = { install };