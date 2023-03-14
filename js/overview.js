// get the id part from url
const id = window.location.hash.slice(1);
const placeName = document.getElementById('place-name');
const chart = document.getElementById('chart');

placeName.innerHTML = id;

// get the api data from online json, filter using id and get the data
const getData = async () => {
    const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson');
    const data = await response.json();
    const eq = data.features.filter((eq) => eq.id === id);
    console.log(eq);

    createChart(eq);
    return eq;
}


// create the chart using p5js library
const createChart = (eq) => {
    const myChart = new Chart(chart, {
        type: 'bar',
        data: {
            labels: ['mag', 'sig', 'tsunami'],
            datasets: [{
                label: 'Earthquake Data',
                data: [eq[0].properties.mag, eq[0].properties.sig, eq[0].properties.tsunami],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}





// get data into UI
getData()