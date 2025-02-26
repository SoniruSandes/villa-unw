document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("canvas").forEach(canvas => {
        let used = parseFloat(canvas.getAttribute("data-used"));
        let total = parseFloat(canvas.getAttribute("data-total")) || 100;
        let remaining = total - used;

        var ctx = canvas.getContext("2d");
        let chart = new Chart(ctx, {
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
                        drawText(chart, remaining);
                    }
                },
                hover: {
                    mode: 'nearest',
                    onHover: function () {
                        drawText(chart, remaining); // Ensures text stays even when hovering
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
