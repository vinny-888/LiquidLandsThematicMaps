let zoom = 1;
let tileStates = null;
let factionLookup = {};
let factionCounts = {};
let yieldLookup = {};
let guardedLookup = {};
let width = 0;
let height = 0;
let css_width = 0;
let css_height = 0;
let tile_width = 0;
let tile_height = 0;
let offsetX = 0;
let offsetY = 0;
let poly1 = null;
let ele = null;
let selectedLayer = 0;

window.addEventListener('load', async function(event) {
    const radios = document.querySelectorAll('input[name="layer"]')
    radios.forEach((radio)=> {
        radio.addEventListener('change', function() {
            layerUpdate();
        });
    });

    ele = document.getElementById('MapOuter');
    new inrt.scroller({elementId: "MapOuter", defaultDrag: 0.94, maxScrollSpeed: 50});
    ele.addEventListener('mousedown', mouseDownHandler);
    let map = document.getElementById('Map');
    width = map.clientWidth;
    height = map.clientHeight;
    // get the map and dimensions
    let ratio = 1;
    css_width = width;
    css_height = height;

    col_size = width / 451,
    row_size = height / 151;

    tile_width = col_size * 4;
    tile_height = row_size * 2;  

    // if canvas is too big then set to max size and ratio instead
    if (width > 10000) {
        ratio = 10000 / width;

        width = 10000;
        height = Math.floor(height * ratio);

        tile_width = Math.floor(tile_width * ratio);
        tile_height = Math.floor(tile_height * ratio);
    }

    poly1 = get_tile_canvas('#2a3339', tile_width - 3, tile_height-3, '', '');
    //, (canvas)=>{
    //     poly1 = canvas;
    // });

    let canvas = document.getElementById('mapCanvas');  
    // draw the snapshot
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = css_width + "px";
    canvas.style.height = css_height + "px";

    fetch("https://liquidlands.io/raw/land")
    .then((res)=>{
        return res.json();
    }).then((res)=>{
        tileStates = getTileStates(res);
        layerUpdate();
    });
});

function heatMapColorforValue(value){
    var h = (1.0 - value) * 240
    return "hsl(" + h + ", 100%, 50%)";
}

async function getMapHistory(){
    let url = 'https://LiquidLandsHistory.damo1884.repl.co/history';
    let response = await fetch(url);
    let json = await response.json();
    return json;
}

function zoomIn(){
    let zoomer = document.getElementById('MapZoomer');
    let scale = parseFloat(zoomer.style.transform.replace('scale(', '').replace(')', ''));
    scale*=1.1;
    zoom = scale;
    zoomer.style.transform = 'scale('+scale+')';
    // snapshot();
}
function zoomOut(){
    let zoomer = document.getElementById('MapZoomer');
    let scale = parseFloat(zoomer.style.transform.replace('scale(', '').replace(')', ''));
    scale*=0.9;
    zoom = scale;
    zoomer.style.transform = 'scale('+scale+')';
    // snapshot();
}

function get_tile_canvas(color, width, height, value, suffix, callback) {
    var poly = [23, 4, 25.5, 1.25, 29, 0, 71, 0, 74.5, 1.25, 77, 4, 98, 46, 98.75, 50, 98, 54, 77, 96, 74.5, 98.75, 71, 100, 29, 100, 25.5, 98.75, 23, 96, 2, 54, 1.25, 50, 2, 46];

    let canvas = document.createElement('canvas');
    let widthRatio = width/100;
    let heightRatio = height/100;
    canvas.width = width;
    canvas.height = height;

    let ctx1 = canvas.getContext('2d');
    ctx1.fillStyle = color;
    ctx1.beginPath();
    ctx1.moveTo(poly[0]*widthRatio, poly[1]*heightRatio);
    for (let i = 2; i < poly.length - 1; i += 2) { 
        ctx1.lineTo(poly[i]*widthRatio, poly[i + 1]*heightRatio) 
    }
    ctx1.closePath();
    ctx1.fill();

    ctx1.font="12px verdana";
    ctx1.shadowColor="black";
    ctx1.shadowBlur=1;
    ctx1.lineWidth=2;

    let offsetY = 5;
    let offsetX = 0;
    if(value.length < 2){
        offsetX = 8;
    } else if(value.length < 3){
        offsetX = 12;
    } else if(value.length < 5){
        offsetX = 16;
    }
    ctx1.strokeText(value+suffix,width/2-offsetX,height/2+offsetY);
    ctx1.shadowBlur=0;
    ctx1.fillStyle="white";
    ctx1.fillText(value+suffix,width/2-offsetX,height/2+offsetY);
    return canvas;
}

function getUniqueColor(n) {
  const rgb = [0, 0, 0];
  
  for (let i = 0; i < 24; i++) {
    rgb[i%3] <<= 1;
    rgb[i%3] |= n & 0x01;
    n >>= 1;
  }
  
  return '#' + rgb.reduce((a, c) => (c > 0x0f ? c.toString(16) : '0' + c.toString(16)) + a, '')
}

function layerUpdate(){
    const radios = document.querySelectorAll('input[name="layer"]')
    radios.forEach((radio, index)=> {
        if (radio.checked) {
            selectedLayer = index;
            let factionDiv = document.getElementById('factionsDiv');
            if(selectedLayer == 0){
                factionDiv.style.display = 'block';
            } else {
                factionDiv.style.display = 'none';
            }
        }
    });

    let table = document.getElementById('factionRows');
    getSortedKeys(factionCounts).forEach((faction, index)=>{
        let count = factionCounts[faction];
        table.innerHTML += `<tr>
        <td>${index+1}</td>
        <td><div class="colorSquare" style="background-color: ${getUniqueColor(faction)}"></div></td>
        <td>${count}</td>
    </tr>`;
    })

    snapshot();
}

function getSortedKeys(obj) {
    var keys = Object.keys(obj);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}

function getTileStates(tiles){
    let tilesLookup = {};
    // [0] = tile_id
    // [1] = map_id
    // [2] = faction_id
    // [3] = guarded
    // [4] = game_bricks_per_day
    tiles.forEach((tile)=>{
        if(tile){
            let tile_id = tile[2]
            tilesLookup[tile[0]] = {
                faction_id: tile_id,
                guarded: tile[3],
                game_bricks_per_day: tile[4]
            };
            let color = null;
            if(!factionLookup[tile_id]){
                color = getUniqueColor(tile_id);
                // factionLookup[tile_id] = 
                factionLookup[tile_id] = get_tile_canvas(color, tile_width - 3, tile_height-3, '', '');
                // , (canvas)=>{
                //     factionLookup[tile_id] = canvas;
                // });
                factionCounts[tile_id] = 1;
            } else {
                factionCounts[tile_id]++;
            }

            let guardedSince = new Date(tile[3]);
            let now = new Date();
            let HOUR = 1000*60*60;
            let hours = HOUR*120;
            let duration = now.getTime() - guardedSince.getTime();
            let val = duration/hours;
            color = heatMapColorforValue(Math.min(val, 1));
            // guardedLookup[tile[0]] = 
            tile_id = tile[0];
            guardedLookup[tile_id] = get_tile_canvas(color, tile_width - 3, tile_height-3, (duration/HOUR).toFixed(0),'h');
            // , (canvas)=>{
            //     guardedLookup[tile_id] = canvas;
            // });

            let bricks = tile[4];
            let value = (Math.log(bricks) + 2)/2;
            color = heatMapColorforValue(value);
            // yieldLookup[tile[0]] = 
            yieldLookup[tile_id] = get_tile_canvas(color, tile_width - 3, tile_height-3, (tile[4]).toFixed(2),'');
            // , (canvas)=>{
            //     yieldLookup[tile_id] = canvas;
            // });
        }
    })
    return tilesLookup;
}

function snapshot() {
    let canvas = document.getElementById('mapCanvas');  
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let hexagon of mapTiles) {
            let shape = poly1;

            if (hexagon.enabled) {
                if(tileStates[hexagon.tile_id]){
                    if(selectedLayer == 0){
                        let key = tileStates[hexagon.tile_id].faction_id;
                        shape = factionLookup[key];
                    } else if(selectedLayer == 1){
                        let key = hexagon.tile_id;
                        shape = yieldLookup[key];
                    } else if(selectedLayer == 2){
                        let key = hexagon.tile_id;
                        shape = guardedLookup[key];
                    }
                } else {
                    // console.log('Missing tile_id:', hexagon.tile_id);
                }
            }
            if(shape){
                let offsetX = 0;
                let offsetY = 0;
                let left = (hexagon.x-1) * col_size*3,
                    top = (hexagon.y-1) * row_size;
                ctx.drawImage(shape, left+1+offsetX, top-1+offsetY); 
            }
        }                              
    }
}

let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseDownHandler = function (e) {
    pos = {
        // The current scroll
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
    };

    ele.style.cursor = 'grabbing';
    ele.style.userSelect = 'none';

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');
};
