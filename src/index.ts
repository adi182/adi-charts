import { App } from "vue";
import ADIChart from "./components/ADIChart.vue";
import ADIXAxis from "./components/ADIXAxis.vue";
import ADILine from "./components/ADILine.vue";
import ADIPoints from "./components/ADIPoints.vue";
import ADIBar from "./components/ADIBar.vue";
import ADIYAxis from "./components/ADIYAxis.vue";
import ADILabel from "./components/ADILabel.vue";

export { 
  ADIChart, 
  ADIXAxis, 
  ADILine, 
  ADIYAxis, 
  ADIBar, ADIPoints, ADILabel
};

export function install(app: App) {
  app.component("ADIChart", ADIChart);
  app.component("ADIXAxis", ADIXAxis);
  app.component("ADILine", ADILine);
  app.component("ADIYAxis", ADIYAxis);
  app.component("ADIBar", ADIBar);
  app.component("ADIPoints", ADIPoints);
  app.component("ADILabel", ADILabel);
}

export const AdiCharts = { install };