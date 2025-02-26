// Function to toggle WiFi usage table visibility
function toggleExpand() {
    const wifiTable = document.querySelector(".wifi-usage-table");
    if (wifiTable) {
        let currentDisplay = getComputedStyle(wifiTable).display;
        wifiTable.style.display = (currentDisplay === "none" ? "table" : "none");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Ensure WiFi table is hidden on page load
    const wifiTable = document.querySelector(".wifi-usage-table");
    if (wifiTable) {
        wifiTable.style.display = "none";
    }

    // Ensure the toggle header is clickable
    const toggleHeader = document.query


// Fetch Data from Google Apps Script
const scriptUrl = "https://script.google.com/macros/s/AKfycbyx1IqpTfoPthjePqdlxDFFAaMyTYEzDTiYxIR1R2CG2W75wOOqx8f1-U0cSXDc1m7D/exec";

fetch(scriptUrl)
  .then(response => {
      if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
      return response.json();
  })
  .then(data => {
      console.log("Fetched Data:", data);

      const tableBody = document.querySelector('#electricity-meter-table tbody');
      if (tableBody) {
          tableBody.innerHTML = ""; // Clear existing table data

          data.slice(1).forEach(row => {
              const tr = document.createElement("tr");
              row.forEach(cellData => {
                  const td = document.createElement("td");
                  td.textContent = cellData;
                  tr.appendChild(td);
              });
              tableBody.appendChild(tr);
          });
      }
  })
  .catch(error => console.error("Error fetching data:", error));

// Chart.js - Doughnut Chart with Tooltip & Persistent Center Text
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("canvas").forEach(canvas => {
      let used = parseFloat(canvas.getAttribute("data-used"));
      let total = parseFloat(canvas.getAttribute("data-total")) || 100;
      let remaining = total - used;

      var ctx = canvas.getContext("2d");

      // ✅ Destroy existing chart before creating a new one
      if (canvas.chartInstance) {
          canvas.chartInstance.destroy();
      }

      // ✅ Store new chart instance in the canvas
      canvas.chartInstance = new Chart(ctx, {
          type: "doughnut",
          data: {
              labels: ["Used", "Remaining"],
              datasets: [{
                  data: [used, remaining],
                  backgroundColor: ["#4CAF50", "#1E3A8A"]
              }]
          },
          options: {
              cutout: "70%",
              responsive: false,
              maintainAspectRatio: false,
              plugins: {
                  legend: { display: false },
                  tooltip: {
                      enabled: true,
                      callbacks: {
                          label: function (context) {
                              let label = context.label || '';
                              let value = context.raw || 0;
                              return `${label}: ${value} GB`;
                          }
                      }
                  }
              },
              animation: {
                  onComplete: function () {
                      drawText(canvas.chartInstance, remaining);
                  }
              },
              hover: {
                  mode: 'nearest',
                  onHover: function () {
                      drawText(canvas.chartInstance, remaining);
                  }
              }
          },
          plugins: [{
              afterDraw: function (chart) {
                  drawText(chart, remaining);
              }
          }]
      });

      function drawText(chart, remaining) {
          let width = chart.width,
              height = chart.height,
              ctx = chart.ctx;

          ctx.restore();
          ctx.font = "bold 18px Arial";
          ctx.fillStyle = "#000"; // Dark text color
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          ctx.fillText(`${remaining}GB`, width / 2, height / 2 - 5);
          ctx.fillText(`Remaining`, width / 2, height / 2 + 15);
          ctx.save();
      }
  });
});
});
