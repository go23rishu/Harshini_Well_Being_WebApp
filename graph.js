const { Chart } = SingleDivUI;

const options = {
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    series: {
      points: [15, 9, 25, 18, 31, 25],
    },
  },
  height: 200,
  width: 400,
};

new Chart("#chart1", {
  type: "line",
  ...options,
});

new Chart("#chart2", {
  type: "bar",
  ...options,
});

new Chart("#chart3", {
  type: "area",
  ...options,
});
