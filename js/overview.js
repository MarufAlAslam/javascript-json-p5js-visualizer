// get the id part from url
const id = window.location.hash.slice(1);
const chart = document.getElementById('chart');
const defaultCanvas = document.getElementById('defaultCanvas0');
const loader = document.getElementById('loader');
const placeInfo = document.getElementById('place-info');
const chartInfo = document.getElementById('chart-info');
const colors = document.getElementById('colors');


var dataArray = [];


// placeName.innerHTML = id;

// get the api data from online json, filter using id and get the data
const getData = async () => {
    const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson');
    const data = await response.json();
    const eq = data.features.filter((eq) => eq.id === id);

    const total = eq[0].properties.sig + eq[0].properties.nst + eq[0].properties.gap
    dataUpdater(total, eq[0].properties.sig, eq[0].properties.nst, eq[0].properties.gap);
    // console.log(eq);
    createChart(eq);


    placeInfo.innerHTML = `
        <h3 class="subtitle">${eq[0].properties.place}</h3>
        <p>Mag: ${eq[0].properties.mag}</p>
        <p>Alert: ${eq[0].properties.alert}</p>
        <p>Status: ${eq[0].properties.status}</p>
        <p>Tsunami: ${eq[0].properties.tsunami}</p>
        <p>Type: ${eq[0].properties.type}</p>
    `;

    chartInfo.innerHTML = `
        <h3 class="subtitle mt-5">Chart Info</h3>
        <p>Significance: ${eq[0].properties.sig}</p>
        <p>Number of Stations: ${eq[0].properties.nst}</p>
        <p>Gap: ${eq[0].properties.gap}</p>
    `;
    colors.innerHTML = `
        <div class="colors">
            <div class="color">
                <div class="color-box" style="background-color: #C4C6F1;"></div>
                <p>Significance</p>
            </div>
            <div class="color">
                <div class="color-box" style="background-color: #CDF1C4;"></div>
                <p>Number of Stations</p>
            </div>
            <div class="color">
                <div class="color-box" style="background-color: #F1D4C4;"></div>
                <p>Gap</p>
            </div>
        </div>
    `;



    return eq;
}

function dataUpdater(totalValue, sigValue, nstValue, gapValue) {
    dataArray.push(totalValue, sigValue, nstValue, gapValue);
    // console.log(total, nst, dmin, rms, gap);
}

setTimeout(function () {
    console.log(dataArray.length);
}, 4000);



// console.log(getTotal());


// create the chart using p5js library
const createChart = (eq) => {
}





// get data into UI
getData()



// p5js

function setup() {
    const canvas = createCanvas(800, 400);
    canvas.parent('chart');
    colorMode(HSB);
    angleMode(DEGREES);

    //vars for color wheel center point
    let x = width / 2;
    let y = height / 2 + 100;

    noStroke();
    pieChartPop(400, 200);
}







function pieChartPop(x, y) {
    let [total, sig, nst, gap] = [dataArray[0], dataArray[1], dataArray[2], dataArray[3]];
    setTimeout(function () {
        console.log(dataArray.length);
        total = dataArray[0];
        sig = dataArray[1];
        nst = dataArray[2];
        gap = dataArray[3];

        // console.log(dataArray[0], dataArray[1], dataArray[2], dataArray[3], dataArray[4]);
        let startValue = 0;
        let range = 0;
        // [total, nst, dmin, rms, gap]
        //sig slice
        range = sig / total;
        drawSlice("#C4C6F1", x, y, 300, startValue, startValue + range);
        startValue += range;
        //nst slice
        range = nst / total;
        drawSlice("#CDF1C4", x, y, 300, startValue, startValue + range);
        startValue += range;
        //gap slice
        range = gap / total;
        drawSlice("#F1D4C4", x, y, 300, startValue, startValue + range);
        startValue += range;

        loader.style.display = 'none';
    }, 2000);



}

function drawSlice(fColor, x, y, d, percent1, percent2) {
    fill(fColor);
    arc(x, y, d, d, -90 + percent1 * 360, -90 + percent2 * 360);
}
