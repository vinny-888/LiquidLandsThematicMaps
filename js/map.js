const width = 7200;
const height = 4200;
let zoom = 0.2;
let canvas = null;
let tileStates = null;
let allTiles = null;
let factionLookup = {};
let factionCounts = {};
let yieldLookup = {};
let guardedLookup = {};
let guardedYieldLookup = {};
let realmShapes = {};
let tileShapes = {};
let realmTileLookup = {};
let realmTilesLookup = {};
let css_width = 0;
let css_height = 0;
let tile_width = 0;
let tile_height = 0;
let offsetX = 0;
let offsetY = 0;
let poly1 = null;
let mapOuter = null;
let selectedLayer = 0;
let activeRealm = null;
let realmIso = null;
let zoomReset = {
    zoom: 0.2,
    scrollLeft: 0,
    scrollTop: 0
};
let HOUR = 1000*60*60;
let guarded_hours = HOUR*120;
let guarded_yield_hours = HOUR*24;
const realmHeightRatio = 1.142;

window.addEventListener('load', async function(event) {
    mapOuter = document.getElementById('MapOuter');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const layer = urlParams.get('layer');
    canvas = document.getElementById('mapCanvas');  
    realmIso = urlParams.get('realm');
    if(!layer || layer == 'faction'){
        selectedLayer = 0;
    } else if(layer == 'guarded'){
        selectedLayer = 1;
    } else if(layer == 'yield'){
        selectedLayer = 2;
    } else if(layer == 'guarded_yield'){
        selectedLayer = 3;
    }

    new inrt.scroller({elementId: "MapOuter", defaultDrag: 0.94, maxScrollSpeed: 50});
    mapOuter.addEventListener('mousedown', mouseDownHandler);
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
    
    // draw the snapshot
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = css_width + "px";
    canvas.style.height = css_height + "px";

    addEventListeners();

    fetch("https://liquidlands.io/raw/land")
    .then((res)=>{
        return res.json();
    }).then((res)=>{
        allTiles = res;
        tileStates = getTileStates(res);
        layerUpdate();
        if(realmIso){
            let realm = realms.find((realm)=>realmIso == realm.country.iso);
            enterRealm(realm);
        }
    });
});

function enterRealm(realm){
    activeRealm = realm.tile_id;
    snapshot();

    zoomReset.zoom = zoom;
    zoomReset.scrollLeft = mapOuter.scrollLeft;
    zoomReset.scrollTop = mapOuter.scrollTop;

    let zoomer = document.getElementById('MapZoomer');
    zoomer.style.transform = 'scale('+0.75+')';
    zoom = 0.75;
    mapOuter.scrollLeft = 0;
    mapOuter.scrollTop = 0;
    realmIso = realm.country.iso;

    let thisPage = new URL(window.location.href);
    var realmParam = thisPage.searchParams.get('realm');
    if(!realmParam){
        thisPage.searchParams.append('realm', realm.country.iso);
    } else {
        thisPage.searchParams.set('realm', realm.country.iso);
    }
    // window.location.href = thisPage;
    history.pushState({}, null, thisPage);
    let viewRealms = document.getElementById('viewRealms');
    viewRealms.innerHTML = 'Hide Realms';
    mapOuter.style.cursor = 'zoom-out';
}

function exitRealm(){
    activeRealm = null;
    realmIso = null;
    snapshot();
    let zoomer = document.getElementById('MapZoomer');
    zoomer.style.transform = 'scale('+zoomReset.zoom+')';
    zoom = zoomReset.zoom;
    mapOuter.scrollLeft = zoomReset.scrollLeft;
    mapOuter.scrollTop = zoomReset.scrollTop;

    let thisPage = new URL(window.location.href);
    var realmParam = thisPage.searchParams.get('realm');
    if(realmParam){
        thisPage.searchParams.delete('realm');
    }
    // window.location.href = thisPage;
    history.pushState({}, null, thisPage);

    let viewRealms = document.getElementById('viewRealms');
    viewRealms.innerHTML = 'View Realms';
    mapOuter.style.cursor = 'grab';
}
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
    let ratio = 1.2;
    scale*=ratio;
    zoom = scale;
    zoomer.style.transform = 'scale('+scale+')';

    mapOuter.scrollLeft = ((mapOuter.scrollLeft+mapOuter.clientWidth/2)*ratio)-(mapOuter.clientWidth/2);
    mapOuter.scrollTop = ((mapOuter.scrollTop+mapOuter.clientHeight/2)*ratio)-(mapOuter.clientHeight/2);
}
function zoomOut(){
    let zoomer = document.getElementById('MapZoomer');
    let scale = parseFloat(zoomer.style.transform.replace('scale(', '').replace(')', ''));
    let ratio = 0.8;
    scale*=ratio;
    zoom = scale;
    zoomer.style.transform = 'scale('+scale+')';

    mapOuter.scrollLeft = ((mapOuter.scrollLeft+mapOuter.clientWidth/2)*ratio)-(mapOuter.clientWidth/2);
    mapOuter.scrollTop = ((mapOuter.scrollTop+mapOuter.clientHeight/2)*ratio)-(mapOuter.clientHeight/2);
}

function get_tile_canvas(color, width, height, value, suffix, isRealm) {
    var poly = [23, 4, 25.5, 1.25, 29, 0, 71, 0, 74.5, 1.25, 77, 4, 98, 46, 98.75, 50, 98, 54, 77, 96, 74.5, 98.75, 71, 100, 29, 100, 25.5, 98.75, 23, 96, 2, 54, 1.25, 50, 2, 46];
    let realm_poly = rotatePoly(poly);
    let canvas = document.createElement('canvas');
    let widthRatio = width/100;
    let heightRatio = height/100;
    canvas.width = width;
    canvas.height = height;

    let offsetY = 5;
    let offsetX = 0;
    if(value.length < 2){
        offsetX = 10;
    } else if(value.length < 3){
        offsetX = 15;
    } else if(value.length < 5){
        offsetX = 20;
    }

    if(isRealm){
        poly = realm_poly;
        canvas.height = height*realmHeightRatio;
        offsetY = 10;
    }

    let ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(poly[0]*widthRatio, poly[1]*heightRatio);
    for (let i = 2; i < poly.length - 1; i += 2) { 
        ctx.lineTo(poly[i]*widthRatio, poly[i + 1]*heightRatio) 
    }
    ctx.closePath();
    ctx.fill();

    ctx.font="18px Helvetica";
    ctx.shadowColor="black";
    ctx.shadowBlur=2;
    ctx.lineWidth=2;
    ctx.strokeText(value+suffix,width/2-offsetX,height/2+offsetY);
    ctx.shadowBlur=0;
    ctx.fillStyle="white";
    ctx.fillText(value+suffix,width/2-offsetX,height/2+offsetY);
    return canvas;
}

function rotatePoly(poly){
    let newPoly = [];
    for(let i=0; i<poly.length-1; i+=2){
        newPoly.push(poly[i+1]);
        newPoly.push(poly[i]*realmHeightRatio);
    }
    return newPoly;
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
        <td style="max-width: 140px;">${factionNames[faction]}</td>
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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const layer = urlParams.get('layer');
    let tilesLookup = {};
    // [0] = tile_id
    // [1] = map_id
    // [2] = faction_id
    // [3] = guarded
    // [4] = game_bricks_per_day
    realms.forEach((realm)=>{
        realmTileLookup[realm.tile_id] = get_tile_canvas('#BF40BF', tile_width - 3, tile_height-3, '  '+realm.country.iso, '');

        realm.map.forEach((tile)=>{
            realmTilesLookup[tile.tile_id] = true;
        })
    })
    tiles.forEach((tile)=>{
        let faction_id = tile[2];
        if(!layer || layer == 'faction'){
            if(!factionCounts[faction_id]){
                factionCounts[faction_id] = 1;
            } else {
                factionCounts[faction_id]++;
            }
        }
    });
    tiles.forEach((tile)=>{
        if(tile){
            let tile_id = tile[0];
            let faction_id = tile[2];
            let guarded = tile[3];
            let game_bricks_per_day = tile[4];
            tilesLookup[tile_id] = {
                faction_id: faction_id,
                guarded: guarded,
                game_bricks_per_day: game_bricks_per_day
            };

            let isRealm = false;
            if(realmTilesLookup[tile_id]){
                isRealm = true;
            }

            if(!layer || layer == 'faction'){
                let color = null;
                if(!factionLookup[faction_id]){
                    color = getUniqueColor(faction_id);
                    let rank = getSortedKeys(factionCounts).indexOf(''+faction_id)+1;
                    
                    factionLookup[faction_id] = get_tile_canvas(color, tile_width - 3, tile_height-3, '#'+rank, '', isRealm);
                } 
                
                if(isRealm && !factionLookup[faction_id+'_realm']){
                    color = getUniqueColor(faction_id);
                    let rank = getSortedKeys(factionCounts).indexOf(''+faction_id)+1;
                    
                    factionLookup[faction_id+'_realm'] = get_tile_canvas(color, tile_width - 3, tile_height-3, '#'+rank, '', isRealm);
                }
            } else if(layer == 'guarded'){
                let dateStr = guarded+'Z';
                let guardedSince = new Date(dateStr);
                let now = new Date();
                let duration = now.getTime() - guardedSince.getTime();
                let val = duration/guarded_hours;
                color = heatMapColorforValue(Math.min(val, 1));
                guardedLookup[tile_id] = get_tile_canvas(color, tile_width - 3, tile_height-3, (duration/HOUR).toFixed(0),'h', isRealm);
            } else if(layer == 'yield'){
                let value = (Math.log(game_bricks_per_day) + 2)/2;
                color = heatMapColorforValue(value);
                yieldLookup[tile_id] = get_tile_canvas(color, tile_width - 3, tile_height-3, (tile[4]).toFixed(2),'', isRealm);
            } else if(layer == 'guarded_yield'){
                let dateStr = guarded+'Z';
                let guardedSince = new Date(dateStr);
                let now = new Date();
                let duration = now.getTime() - guardedSince.getTime();
                let guardedHours = Math.max(duration/guarded_yield_hours, 0);
                let guardedYield = (game_bricks_per_day*guardedHours);
                color = heatMapColorforValue(Math.min(guardedYield, 1));
                guardedYieldLookup[tile_id] = get_tile_canvas(color, tile_width - 3, tile_height-3, guardedYield.toFixed(2),'', isRealm);
            }
        }
    })
    return tilesLookup;
}

function snapshot() {
    if (canvas.getContext) {
        canvas.style.display = 'none';

        setTimeout(()=>{
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let tiles = mapTiles;
            if(activeRealm){
                tiles = [];
                realms.forEach((realm)=>{
                    tiles = tiles.concat(realm.map);
                })
                // tiles = realms.find((realm)=>realm.tile_id == activeRealm).map;
            }

            for (let [index, hexagon] of tiles.entries()) {
                let shape = poly1;
                let isRealm = false;
                if (hexagon.enabled || activeRealm) {
                    if(tileStates[hexagon.tile_id]){
                        if(selectedLayer == 0){
                            let key = tileStates[hexagon.tile_id].faction_id;
                            if(activeRealm){
                                key = tileStates[hexagon.tile_id].faction_id + '_realm';
                            }
                            shape = factionLookup[key];
                        } else if(selectedLayer == 1){
                            shape = guardedLookup[hexagon.tile_id];
                        } else if(selectedLayer == 2){
                            shape = yieldLookup[hexagon.tile_id];
                        } else if(selectedLayer == 3){
                            shape = guardedYieldLookup[hexagon.tile_id];
                        }
                    } 
                    if(!activeRealm && !tileStates[hexagon.tile_id]){
                        if(realms.find((realm)=>hexagon.tile_id==realm.tile_id)){
                            isRealm = true;
                            shape = realmTileLookup[hexagon.tile_id];
                        }
                    }
                }
                if(shape){
                    let offsetX = 0;
                    let offsetY = 0;
                    let left = (hexagon.x-1) * col_size*3,
                        top = (hexagon.y-1) * row_size;

                    if(activeRealm) {
                        let realmIndex = Math.floor(index/37);
                        let realm = realms[realmIndex];
                        top = (hexagon.tile.y+5) * row_size*1.5*realmHeightRatio + (Math.floor(index/(37*3)) * 9*row_size*1.5*realmHeightRatio);
                        if(index < (37*3)){
                            left = ((hexagon.tile.x+20) * col_size*2) + (Math.floor(index/37)*15*col_size*2);
                        } else {
                            left = ((hexagon.tile.x+20) * col_size*2) + (Math.floor((index-(37*3))/37)*15*col_size*2)
                        }
                        tileShapes[hexagon.tile_id] = {
                            left,
                            top,
                            isRealm: true
                        };
                        if(index % 37 == 0){
                            ctx.font="24px Helvetica";
                            ctx.shadowColor="black";
                            ctx.shadowBlur=2;
                            ctx.lineWidth=2;
                            // col 15.96
                            // row 25

                            ctx.strokeText(realm.country.name,left, top - 20);
                            ctx.shadowBlur=0;
                            ctx.fillStyle="white";
                            if(realm.tile_id == activeRealm){
                                ctx.fillStyle="red";
                            } 
                            ctx.fillText(  realm.country.name,left, top - 20);
                        }
                        
                    }
                    if(isRealm){
                        realmShapes[hexagon.tile_id] = {
                            left,
                            top
                        };
                    } else if (!tileShapes[hexagon.tile_id]){
                        tileShapes[hexagon.tile_id] = {
                            left,
                            top,
                            isRealm: false
                        };
                    }
                    var imageObj = new Image();
                    imageObj.width = shape.width;
                    imageObj.height = shape.height;
                    imageObj.onload = function() {
                        ctx.drawImage(shape, left+1+offsetX, top-1+offsetY); 
                    };
                    imageObj.src = shape.toDataURL();
                }
            }
            canvas.style.display = 'block';
        }, 0 );
    }
}

let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseDownHandler = function (e) {
    pos = {
        // The current scroll
        left: mapOuter.scrollLeft,
        top: mapOuter.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
    };

    mapOuter.style.cursor = 'grabbing';
    mapOuter.style.userSelect = 'none';

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    mapOuter.scrollTop = pos.top - dy;
    mapOuter.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    mapOuter.style.cursor = 'grab';
    mapOuter.style.removeProperty('user-select');
};

const getMouse = function(e) {
    var mx, my;
    mx = (e.pageX + mapOuter.scrollLeft)/zoom;
    my = (e.pageY + mapOuter.scrollTop)/zoom;
    return {x: mx, y: my};
}

function addEventListeners(){

    const radios = document.querySelectorAll('input[name="layer"]');
    radios.forEach((radio, index)=> {
        if(index == selectedLayer){
            radio.checked = true;
        } else {
            radio.checked = false;
        }
        radio.addEventListener('change', function() {
            selectedLayer = parseInt(this.value);
            let realm = realms.find((realm)=>realmIso == realm.country.iso);
            if(selectedLayer == 0){
                window.location.href = window.location.href.split('?')[0] + '?layer=faction' + (realm && realm.country.iso ? '&realm='+realm.country.iso : '');
            } else if(selectedLayer == 1){
                window.location.href = window.location.href.split('?')[0] + '?layer=guarded' + (realm && realm.country.iso ? '&realm='+realm.country.iso : '');
            } else if(selectedLayer == 2){
                window.location.href = window.location.href.split('?')[0] + '?layer=yield' + (realm && realm.country.iso ? '&realm='+realm.country.iso : '');
            } else if(selectedLayer == 3){
                window.location.href = window.location.href.split('?')[0] + '?layer=guarded_yield' + (realm && realm.country.iso ? '&realm='+realm.country.iso : '');
            }
        });
    });


    let viewRealms = document.getElementById('viewRealms');
    viewRealms.addEventListener("click", (evt)=>{
        if(activeRealm){
            exitRealm();
        } else {
            enterRealm({tile_id:8787, country: {iso: 'mc'}});
        }
    });


    
    let factionToggle = document.getElementById('factionToggle');
    factionToggle.addEventListener("click", (evt)=>{
        let factionDiv = document.getElementById('factions');
        if(factionDiv.style.display == 'block'){
            factionDiv.style.display = 'none';
            factionToggle.innerHTML = 'show';
        } else {
            factionDiv.style.display = 'block';
            factionToggle.innerHTML = 'hide';
        }
    });
    // Handle double click and zoom better
    mapOuter.addEventListener("dblclick", (evt)=>{
        console.log('evt: ', evt);
        let zoomer = document.getElementById('MapZoomer');
        let scale = parseFloat(zoomer.style.transform.replace('scale(', '').replace(')', ''));
        let ratio = 1/scale;
        if(zoom != 1){
            zoom = 1;
            zoomer.style.transform = 'scale('+zoom+')';
            mapOuter.scrollLeft = ((mapOuter.scrollLeft+evt.clientX)*ratio)-(mapOuter.clientWidth/2);
            mapOuter.scrollTop = ((mapOuter.scrollTop+evt.clientY)*ratio)-(mapOuter.clientHeight/2);
        } else {
            zoom = 0.2;
            zoomer.style.transform = 'scale('+zoom+')';
            mapOuter.scrollLeft = 0;
            mapOuter.scrollTop = 0;
        }
    });

    document.addEventListener('click', function (e) {
        if (e.ctrlKey || e.metaKey) {
          console.log('Ctrl | Cmnd clicked');
          return;
        }
    });

    canvas.addEventListener("click", (e) => {
        var mouse = getMouse(e);
        var mx = mouse.x;
        var my = mouse.y;
        let hit = false;
        realms.forEach((realm)=>{
            let shape = realmShapes[realm.tile_id];
            if(shape){
                let x1 = shape.left;
                let y1 = shape.top;
                let x2 = x1+tile_width;
                let y2 = y1+tile_height;
                if(mx >= x1 && mx <= x2 && my >= y1 && my <= y2){
                    console.log("Clicked Realm: ", realm.country.name, realm);
                    hit = true;
                    enterRealm(realm);
                    let tileHitTest = false;
                    if(tileHitTest){
                        let tileId = realm.tile_id;
                        window.open('https://liquidlands.io/land/'+tileId, '_blank');
                    }
                    // break;
                }
            }
        });
        
        let tileHitTest = e.ctrlKey || e.metaKey;
        if(tileHitTest){
            for (let tile of allTiles) {
                let tile_id = tile[0];
                let shape = tileShapes[tile_id];
                if(shape && (
                    (activeRealm && shape.isRealm) || 
                    (!activeRealm && !shape.isRealm))){
                    let x1 = shape.left;
                    let y1 = shape.top;
                    let x2 = x1+tile_width;
                    let y2 = y1+tile_height;
                    if(mx >= x1 && mx <= x2 && my >= y1 && my <= y2){
                        console.log("Clicked Tile: ", tile_id);
                        window.open('https://liquidlands.io/land/'+tile_id, '_blank');
                        // break;
                    }
                }
            };
        } else if(!hit && activeRealm){
            console.log("Exit Realm: ");
            exitRealm();
        } 
    });
}
