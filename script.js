const scriptUrl = "https://script.google.com/macros/s/AKfycbylUZ3ZgbCV0DzHc40zEjny2ti3Q_4dHeoQv7WsvT3nBbBlBUQEPOiaOVRzi-3UDN97/exec";

fetch(scriptUrl)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    console.log("Fetched Data:", data);

    const tableBody = document.querySelector('#electricity-meter-table tbody');
    tableBody.innerHTML = ""; // Clear existing table data

    // Assuming the first row is headers, start from index 1
    data.slice(1).forEach(row => {
      const tr = document.createElement("tr");

      row.forEach(cellData => {
        const td = document.createElement("td");
        td.textContent = cellData;
        tr.appendChild(td);
      });

      tableBody.appendChild(tr);
    });
  })
  .catch(error => console.error("Error fetching data:", error));
