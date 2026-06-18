import LineChart from "./components/LineChart.vue";

export { LineChart };

export default {
  install(app: any) {
    app.component("LineChart", LineChart);
  },
};