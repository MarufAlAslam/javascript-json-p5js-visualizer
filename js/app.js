// dom elements
const dataTable = document.getElementById('data-table');
let eqData = {}
//function to fetch and return data from online json
const getData = async () => {
    const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson');
    const data = await response.json();
    console.log(data);
    tableRows = createTableRows(data);
    dataTable.innerHTML = tableRows;
    return data;
}




// function to create table rows
const createTableRows = (data) => {
    let tableRows = '';
    data.features.map((eq) => {
        tableRows += `<tr>
            <td>
                <a href="overview.html#${eq.id}" target="_blank">${eq.properties.place}</a>
            </td>
            <td>${eq.properties.sig}</td>
        </tr>`;
    });
    return tableRows;
}


// get data to UI
getData();