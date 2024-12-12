// Function to generate initial data
function generateInitialData() {
  var data = [];
  var lastDate = new Date().getTime();
  var XAXISRANGE = 10000; // 10 seconds range

  for (var i = 0; i < 10; i++) {
    data.push({
      x: lastDate - XAXISRANGE + i * 1000,
      y: Math.floor(Math.random() * (90 - 10 + 1)) + 10,
    });
  }

  return { data, lastDate };
}

// Function to get new series
function getNewSeries(baseval, range, data, xaxisRange) {
  var newDate = baseval + 1000; // Increment by 1 second
  var newDataPoint = {
    x: newDate,
    y: Math.floor(Math.random() * (range.max - range.min + 1)) + range.min,
  };

  data.push(newDataPoint);

  // Remove data points that are out of range
  return data.filter((d) => d.x >= newDate - xaxisRange);
}

// Function to create and render a chart
function createChart(containerId, xaxisRange) {
  var { data, lastDate } = generateInitialData();

  var options = {
    series: [
      {
        data: data.slice(),
      },
    ],
    chart: {
      id: `realtime-${containerId}`,
      height: 80,
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2, // Thin line width
    },
    colors: ["#17ffe3", "#17ffe3"], // Set gradient stops
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal", // "horizontal" or "vertical"
        gradientToColors: ["#933ffe"], // The color the line transitions to
        stops: [0, 100], // Gradient stops
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      type: "datetime",
      range: xaxisRange,
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      max: 100,
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    title: {
      text: undefined,
    },
    legend: {
      show: false,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      enabled: false,
    },
  };

  var chart = new ApexCharts(
    document.querySelector(`#${containerId}`),
    options
  );
  chart.render();

  // Update the chart data every second
  setInterval(function () {
    data = getNewSeries(lastDate, { min: 10, max: 90 }, data, xaxisRange);
    lastDate = data[data.length - 1].x;

    chart.updateSeries([
      {
        data: data,
      },
    ]);
  }, 1000);
}

// Create multiple charts
createChart("chart1", 10000); // Chart 1 with 10 seconds range
createChart("chart2", 15000); // Chart 2 with 15 seconds range
createChart("chart3", 20000); // Chart 3 with 20 seconds range
createChart("chart4", 25000); // Chart 3 with 20 seconds range
createChart("chart5", 30000); // Chart 3 with 20 seconds range
