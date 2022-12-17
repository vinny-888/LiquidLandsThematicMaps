window.addEventListener('load', async function(event) {
    let timeout = null;
    let settings = {
        min: 0,
        max: 47,
        unit: 'Hrs'
    };
    document.getElementById('inputPieces').addEventListener('rangechange', function(e) {
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            state.guardedYieldLookup = {};
            state.factionLookup = {};
            state.yieldLookup = {};
            state.guardedLookup = {};
            state.minHours = e.detail[0];
            state.maxHours = e.detail[1];
            state.tileStates = getTileStates(state.allTiles);
            layerUpdate();
            snapshot();
        },1000)
    }, true);

    let timeout2 = null;
    let settings2 = {
        min: 0,
        max: 47,
        unit: 'Def'
    };
    document.getElementById('inputPieces2').addEventListener('rangechange', function(e) {
        clearTimeout(timeout2);
        timeout2 = setTimeout(()=>{
            state.guardedYieldLookup = {};
            state.factionLookup = {};
            state.yieldLookup = {};
            state.guardedLookup = {};
            state.minDefense = e.detail[0];
            state.maxDefense = e.detail[1];
            state.tileStates = getTileStates(state.allTiles);
            layerUpdate();
            snapshot();
        },1000)
    }, true);

    let timeout3 = null;
    let settings3 = {
        min: 0.0,
        max: 3.0,
        unit: 'Yld',
        isFloat: true
    };
    document.getElementById('inputPieces3').addEventListener('rangechange', function(e) {
        clearTimeout(timeout3);
        timeout3 = setTimeout(()=>{
            state.guardedYieldLookup = {};
            state.factionLookup = {};
            state.yieldLookup = {};
            state.guardedLookup = {};
            state.minYield = parseFloat(e.detail[0]);
            state.maxYield = parseFloat(e.detail[1]);
            state.tileStates = getTileStates(state.allTiles);
            layerUpdate();
            snapshot();
        },1000)
    }, true);


    OmRangeSlider.init([settings, settings2, settings3]);

    if(isSafariMobile() || isMobile()){
        state.width = 4096;
        state.height = 2389;
        state.fontSize = 12;
        state.offsetX = 2;
        state.offsetY = 4;

        let mapOuter = document.getElementById('MapOuter');
        //mapOuter.addEventListener("touchstart", doubleTapHandler);
    }
    state.realmIso = urlParams.get('realm');
    state.layer = urlParams.get('layer');
    state.zoom = urlParams.get('z');
    state.pos.left = urlParams.get('l');
    state.pos.top = urlParams.get('t');
    if(!state.layer || state.layer == 'faction'){
        state.selectedLayer = 0;
    } else if(state.layer == 'guarded'){
        state.selectedLayer = 1;
    } else if(state.layer == 'yield'){
        state.selectedLayer = 2;
    } else if(state.layer == 'guarded_yield'){
        state.selectedLayer = 3;
    }

    new inrt.scroller({elementId: "MapOuter", defaultDrag: 0.94, maxScrollSpeed: 50});
    // get the map and dimensions
    let ratio = 1;

    col_size = state.width / 451,
    row_size = state.height / 151;

    state.tile_width = col_size * 4;
    state.tile_height = row_size * 2;  

    // if canvas is too big then set to max size and ratio instead
    if (state.width > 10000) {
        ratio = 10000 / state.width;

        state.width = 10000;
        state.height = Math.floor(state.height * ratio);

        state.tile_width = Math.floor(state.tile_width * ratio);
        state.tile_height = Math.floor(state.tile_height * ratio);
    }

    state.blankTilePoly = get_tile_canvas('#2a3339', state.tile_width - 3, state.tile_height-3, '', '', false);
    state.blankTileRealmPoly = get_tile_canvas('#2a3339', state.tile_width - 3, state.tile_height-3, '', '', true);
    // draw the snapshot
    let canvas = document.getElementById('mapCanvas');  
    canvas.width = state.width;
    canvas.height = state.height;
    canvas.style.width = state.width + "px";
    canvas.style.height = state.height + "px";

    addEventListeners();

    fetch("https://liquidlands.io/raw/land")
    .then((res)=>{
        return res.json();
    }).then((res)=>{
        state.allTiles = res;
        state.tileStates = getTileStates(res);
        layerUpdate();
        if( state.realmIso){
            let realm = state.realms.find((realm)=> state.realmIso == realm.country.iso);
            enterRealm(realm);
        } else {
            snapshot();
        }
        // setTimeout(()=>{
        //     loadZoom();
        // }, 1000);
    });
});

function enterRealm(realm){
    state.activeRealm = realm.tile_id;
    snapshot();

    zoomToRealm();

    state.realmIso = realm.country.iso;
    updateUrlState();
    
    let viewRealms = document.getElementById('viewRealms');
    viewRealms.innerHTML = 'Hide Realms';

    let mapOuter = document.getElementById('MapOuter');
    mapOuter.style.cursor = 'zoom-out';
}

function exitRealm(){
    state.activeRealm = null;
    state.realmIso = null;
    snapshot();
    
    zoomFromRealm();

    // TODO test this
    //updateUrlState();

    let thisPage = new URL(window.location.href);
    var realmParam = thisPage.searchParams.get('realm');
    if(realmParam){
        thisPage.searchParams.delete('realm');
    }
    history.pushState({}, null, thisPage);

    let viewRealms = document.getElementById('viewRealms');
    viewRealms.innerHTML = 'View Realms';

    let mapOuter = document.getElementById('MapOuter');
    mapOuter.style.cursor = 'grab';
}

async function stopMapHistory(){
    let viewMapHistory = document.getElementById('viewMapHistory');
    viewMapHistory.innerHTML = 'Play History';
    state.historyPlaying = false;
    let mapTimestamp = document.getElementById('mapTimestamp');
    mapTimestamp.style.display = 'none';
    clearInterval(state.mapHistoryInterval);
    state.selectedLayer = 0;
    state.layer = 'faction';
    state.tileStates = getTileStates(state.allTiles);
    layerUpdate();
    snapshot();
    updateUrlState();
}
async function playMapHistory(){
    setSelectedLayer('faction');
    let viewMapHistory = document.getElementById('viewMapHistory');
    viewMapHistory.innerHTML = 'Stop History';
    getMapHistory().then((data)=>{
        state.mapHistory = data;
        state.tileHistoryStates = getMapHistoryTileStates();
        layerUpdate();
        console.log('mapHistory:', state.mapHistory.length);
        snapshot();
        state.mapHistoryInterval = setInterval(()=>{
            state.mapHistoryIndex++;
            if(state.mapHistoryIndex >= state.mapHistory.length){
                state.mapHistoryIndex = 0;
            }

            let table = document.getElementById('factionRows');
            table.innerHTML = '';
            getSortedKeys(state.factionHistoryCounts[state.mapHistoryIndex]).forEach((faction, index)=>{
                let count = state.factionHistoryCounts[state.mapHistoryIndex][faction];
                table.innerHTML += `<tr>
                    <td>${index+1}</td>
                    <td style="max-width: 140px;">${state.factionNames[faction]}</td>
                    <td><div class="colorSquare" style="background-color: ${getUniqueColor(faction)}"></div></td>
                    <td>${count}</td>
                </tr>`;
            })

            let mapTimestamp = document.getElementById('mapTimestamp');
            mapTimestamp.style.display = 'block';
            let date = new Date(state.mapHistory[state.mapHistoryIndex].timestamp);
            mapTimestamp.innerHTML = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            snapshot();
        }, 300);
        state.historyPlaying = true;
    });
}

async function getMapHistory(){
    let url = 'https://liquidlands-history.glitch.me/history';
    let response = await fetch(url);
    let json = await response.json();
    return json;
}

function getMapHistoryTileStates(){
    if(Object.keys(state.factionCounts).length == 0){
        getFactionCounts();
    }
    getFactionHistoryCounts();
    let tilesLookup = [];
    // mapHistory[0]
    // [0] = tile
    // [1] = map
    // [2] = faction   
    state.mapHistory.forEach((map, index)=>{
        if(map){
            tilesLookup[index] = {};
            state.factionHistoryLookup[index] = {};
            map.mapState.forEach((tile)=>{
                let tile_id = tile[0];
                let faction_id = tile[2];
                tilesLookup[index][tile_id] = faction_id;
                if(!state.factionHistoryLookup[index][faction_id]){
                    state.factionHistoryLookup[index][faction_id] = createHistoryFaction(faction_id, false, index);
                }
            });
        }
    })
    return tilesLookup;
}

function getFactionHistoryCounts(){
    state.mapHistory.forEach((map, index)=>{
        if(map){
            state.factionHistoryCounts[index] = {};
            map.mapState.forEach((tile)=>{
                let faction_id = tile[2];
                if(!state.factionHistoryCounts[index][faction_id]){
                    state.factionHistoryCounts[index][faction_id] = 1;
                } else {
                    state.factionHistoryCounts[index][faction_id]++;
                }
            });
        }
    });
}

function getFactionCounts(){
    state.allTiles.forEach((tile)=>{
        let faction_id = tile[2];
        if(!state.factionCounts[faction_id]){
            state.factionCounts[faction_id] = 1;
        } else {
            state.factionCounts[faction_id]++;
        }
    });
}

function getTileStates(tiles){
    let tempTiles = {};
    // [0] = tile_id
    // [1] = map_id
    // [2] = faction_id
    // [3] = guarded
    // [4] = game_bricks_per_day
    // [5] = defence

    // Cache the Realm Tiles
    state.realms.forEach((realm)=>{
        state.realmTileLookup[realm.tile_id] = get_tile_canvas('#BF40BF', state.tile_width - 3, state.tile_height-3, '  '+realm.country.iso, '', false);
        realm.map.forEach((tile)=>{
            state.realmTilesLookup[tile.tile_id] = true;
        })
    })
    // Calculate the counts for factions
    getFactionCounts();

    freeMemory(state.layer ? state.layer : 'faction');

    tiles.forEach((tile)=>{
        if(tile){
            let tile_id = tile[0];
            let faction_id = tile[2];
            let guarded = tile[3];
            let game_bricks_per_day = tile[4];
            let defense = tile[5];

            tempTiles[tile_id] = {
                faction_id: faction_id,
                guarded: guarded,
                defense: defense,
                game_bricks_per_day: game_bricks_per_day
            };


            let dateStr = guarded && guarded.indexOf('Z') == -1 ? guarded + 'Z' : guarded;
            let guardedSince = new Date(dateStr);
            let now = new Date();
            let duration = now.getTime() - guardedSince.getTime();

            if(!state.layer || state.layer == 'faction'){
                if(!state.factionLookup[faction_id]){
                    state.factionLookup[faction_id] = createFaction(faction_id, state.realmTilesLookup[tile_id] ? true : false, duration/HOUR, defense, game_bricks_per_day);
                } 
                if(state.realmTilesLookup[tile_id] && !state.factionLookup[faction_id+'_realm']){
                    state.factionLookup['faction_'+faction_id+'_realm'] = createFaction(faction_id, state.realmTilesLookup[tile_id] ? true : false, duration/HOUR, defense, game_bricks_per_day);
                }
            } else if(state.layer == 'guarded'){
                let durationHours = 0;
                let color = '#666';
                if(guarded){
                    let dateStr = guarded && guarded.indexOf('Z') == -1 ? guarded + 'Z' : guarded;
                    let guardedSince = new Date(dateStr);
                    let now = new Date();
                    let duration = now.getTime() - guardedSince.getTime();
                    durationHours = (duration/HOUR).toFixed(0);
                    let val = duration/guarded_hours;
                    color = heatMapColorforValue(Math.min(val, 1));
                    if(durationHours > 48){
                        color = '#888888';
                    }
                }
                let key = durationHours+'_'+defense+'_'+game_bricks_per_day;
                state.guardedColorLookup[tile_id] = key;
                if(!state.guardedLookup[key]){
                    state.guardedLookup[key] = createGuardedTile(tile_id, durationHours, color, duration/HOUR, defense, game_bricks_per_day);
                }
                if(state.realmTilesLookup[tile_id] && !state.guardedLookup[durationHours+'_realm']){
                    state.guardedLookup['duration_'+durationHours+'_realm'] = createGuardedTile(tile_id, durationHours, color, duration/HOUR, defense, game_bricks_per_day);
                }
            } else if(state.layer == 'yield'){
                if(game_bricks_per_day > 2.2){
                    game_bricks_per_day = 2.2;
                }
                let value = ((Math.log(game_bricks_per_day)+2)/2).toFixed(2);
                color = heatMapColorforValue(value);
                // if(game_bricks_per_day > 3){
                //     color = '#888888';
                // }
                let key = value+'_'+duration+'_'+defense;
                state.yieldBricksLookup[tile_id] = key;
                if(!state.yieldLookup[key]){
                    state.yieldLookup[key] = createYieldTile(tile_id, game_bricks_per_day.toFixed(2), color, duration/HOUR, defense, game_bricks_per_day);
                }
                if(state.realmTilesLookup[tile_id] && !state.yieldLookup[value+'_realm']){
                    state.yieldLookup['yield_'+value+'_realm'] = createYieldTile(tile_id, game_bricks_per_day.toFixed(2), color, duration/HOUR, defense, game_bricks_per_day);
                }
            } else if(state.layer == 'guarded_yield'){
                let guardedHours = Math.min(duration/(guarded_yield_hours/2), 1);
                let guardedYield = ((game_bricks_per_day*Math.min(guardedHours, 1)) * (Math.min(guardedHours*12, 12)/12)).toFixed(2);
                color = heatMapColorforValue(Math.min(guardedYield, 1));

                let key = guardedYield+'_'+duration+'_'+defense+'_'+game_bricks_per_day;
                state.guardedYieldValLookup[tile_id] = key;
                if(!state.guardedYieldLookup[key]){
                    state.guardedYieldLookup[key] = createProtected(tile_id, guardedYield, color, duration/HOUR, defense, game_bricks_per_day);
                }
                if(state.realmTilesLookup[tile_id] && !state.guardedYieldLookup[guardedYield+'_realm']){
                    state.guardedYieldLookup['guardedYield_'+guardedYield+'_realm'] = createProtected(tile_id, guardedYield, color, duration/HOUR, defense, game_bricks_per_day);
                }
            }
        }
    })
    return tempTiles;
}

function applyTimeRage(hours, color){
    let newColor = color;
    let adjustedMaxHours = state.maxHours;
    if(adjustedMaxHours >= 46){
        adjustedMaxHours = 999;
    }
    if(hours > state.minHours && hours <= adjustedMaxHours){
        // Do nothing
    } else {
        newColor = '#999999';
    }
    return newColor;
}

function applyDefense(defense, color){
    let newColor = color;
    let adjustedMaxDefense = state.maxDefense;
    if(adjustedMaxDefense >= 46){
        adjustedMaxDefense = 999;
    }
    if(defense >= state.minDefense && defense <= adjustedMaxDefense){
        // Do nothing
    } else {
        newColor = '#999999';
    }
    return newColor;
}

function applyYield(bricks_per_day, color){
    let newColor = color;
    let adjustedMaxYield = state.maxYield;
    if(adjustedMaxYield >= 3){
        adjustedMaxYield = 999;
    }
    if(bricks_per_day >= state.minYield && bricks_per_day <= adjustedMaxYield){
        // Do nothing
    } else {
        newColor = '#999999';
    }
    return newColor;
}

function createFaction(faction_id, isRealm, hours, defense, bricks_per_day){
    let color = getUniqueColor(faction_id);
    color = applyTimeRage(hours, color);
    color = applyDefense(defense, color);
    color = applyYield(bricks_per_day, color);
    let rank = getSortedKeys(state.factionCounts).indexOf(''+faction_id)+1;
    return get_tile_canvas(color, state.tile_width - 3, state.tile_height-3, '#'+rank, '', isRealm);
}

function createHistoryFaction(faction_id, isRealm, index){
    let color = getUniqueColor(faction_id);
    let rank = getSortedKeys(state.factionHistoryCounts[index]).indexOf(''+faction_id)+1;
    return get_tile_canvas(color, state.tile_width - 3, state.tile_height-3, '#'+rank, '', isRealm);
}

function createProtected(tile_id, guardedYield, color, hours, defense, bricks_per_day){
    color = applyTimeRage(hours, color);
    color = applyDefense(defense, color);
    color = applyYield(bricks_per_day, color);
    return get_tile_canvas(color, state.tile_width - 3, state.tile_height-3, guardedYield,'', state.realmTilesLookup[tile_id] ? true : false);
}

function createYieldTile(tile_id, game_bricks_per_day, color, hours, defense, bricks_per_day){
    color = applyTimeRage(hours, color);
    color = applyDefense(defense, color);
    color = applyYield(bricks_per_day, color);
    return get_tile_canvas(color, state.tile_width - 3, state.tile_height-3, game_bricks_per_day,'', state.realmTilesLookup[tile_id] ? true : false);
}

function createGuardedTile(tile_id, duration, color, hours, defense, bricks_per_day){
    color = applyTimeRage(hours, color);
    color = applyDefense(defense, color);
    color = applyYield(bricks_per_day, color);
    return get_tile_canvas(color, state.tile_width - 3, state.tile_height-3, duration,'h', state.realmTilesLookup[tile_id] ? true : false);       
}
