// get the id part from url
const id = window.location.hash.slice(1);
const placeName = document.getElementById('place-name');
const chart = document.getElementById('chart');
const defaultCanvas = document.getElementById('defaultCanvas0');
const loader = document.getElementById('loader');
const placeInfo = document.getElementById('place-info');


var dataArray = [];


placeName.innerHTML = id;

// get the api data from online json, filter using id and get the data
const getData = async () => {
    const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson');
    const data = await response.json();
    const eq = data.features.filter((eq) => eq.id === id);

    const total = eq[0].properties.sig + eq[0].properties.nst + eq[0].properties.gap
    dataUpdater(total, eq[0].properties.sig, eq[0].properties.nst, eq[0].properties.gap);
    // console.log(eq);
    createChart(eq);


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
