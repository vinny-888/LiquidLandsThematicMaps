window.addEventListener('load', async function(event) {
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

    state.blankTilePoly = get_tile_canvas('#2a3339', state.tile_width - 3, state.tile_height-3, '', '');
    
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

async function getMapHistory(){
    let url = 'https://LiquidLandsHistory.damo1884.repl.co/history';
    let response = await fetch(url);
    let json = await response.json();
    return json;
}

function getTileStates(tiles){
    let tempTiles = {};
    // [0] = tile_id
    // [1] = map_id
    // [2] = faction_id
    // [3] = guarded
    // [4] = game_bricks_per_day

    // Cache the Realm Tiles
    state.realms.forEach((realm)=>{
        state.realmTileLookup[realm.tile_id] = get_tile_canvas('#BF40BF', state.tile_width - 3, state.tile_height-3, '  '+realm.country.iso, '');
        realm.map.forEach((tile)=>{
            state.realmTilesLookup[tile.tile_id] = true;
        })
    })
    // Calculate the counts for factions
    if(!state.layer || state.layer == 'faction'){
        tiles.forEach((tile)=>{
            let faction_id = tile[2];
            if(!state.factionCounts[faction_id]){
                state.factionCounts[faction_id] = 1;
            } else {
                state.factionCounts[faction_id]++;
            }
        });
    }
    tiles.forEach((tile)=>{
        if(tile){
            let tile_id = tile[0];
            let faction_id = tile[2];
            let guarded = tile[3];
            let game_bricks_per_day = tile[4];

            tempTiles[tile_id] = {
                faction_id: faction_id,
                guarded: guarded,
                game_bricks_per_day: game_bricks_per_day
            };

            if(!state.layer || state.layer == 'faction'){
                if(!state.factionLookup[faction_id]){
                    state.factionLookup[faction_id] = createFaction(tile_id, faction_id);
                } 
                if(state.realmTilesLookup[tile_id] && !state.factionLookup[faction_id+'_realm']){
                    state.factionLookup[faction_id+'_realm'] = createFaction(tile_id, faction_id);
                }
            } else if(state.layer == 'guarded'){
                state.guardedLookup[tile_id] = createGuardedTile(tile_id, guarded);
            } else if(state.layer == 'yield'){
                state.yieldLookup[tile_id] = createYieldTile(tile_id, game_bricks_per_day)
            } else if(state.layer == 'guarded_yield'){
                state.guardedYieldLookup[tile_id] = createProtected(tile_id, guarded, game_bricks_per_day);
            }
        }
    })
    return tempTiles;
}

function createFaction(tile_id, faction_id){
    let color = getUniqueColor(faction_id);
    let rank = getSortedKeys(state.factionCounts).indexOf(''+faction_id)+1;
    return get_tile_canvas(color, state.tile_width - 3, state.tile_height-3, '#'+rank, '', state.realmTilesLookup[tile_id] ? true : false);
}

function createProtected(tile_id, guarded, game_bricks_per_day){
    let dateStr = guarded.indexOf('Z') == -1 ? guarded + 'Z' : guarded;
    let guardedSince = new Date(dateStr);
    let now = new Date();
    let duration = now.getTime() - guardedSince.getTime();
    let guardedHours = Math.max(duration/guarded_yield_hours, 0);
    let guardedYield = (game_bricks_per_day*guardedHours);
    color = heatMapColorforValue(Math.min(guardedYield, 1));
    return get_tile_canvas(color, state.tile_width - 3, state.tile_height-3, guardedYield.toFixed(2),'', state.realmTilesLookup[tile_id] ? true : false);
}

function createYieldTile(tile_id, game_bricks_per_day){
    let value = (Math.log(game_bricks_per_day) + 2)/2;
    color = heatMapColorforValue(value);
    return get_tile_canvas(color, state.tile_width - 3, state.tile_height-3, game_bricks_per_day.toFixed(2),'', state.realmTilesLookup[tile_id] ? true : false);
}

function createGuardedTile(tile_id, guarded){
    let dateStr = guarded.indexOf('Z') == -1 ? guarded + 'Z' : guarded;
    let guardedSince = new Date(dateStr);
    let now = new Date();
    let duration = now.getTime() - guardedSince.getTime();
    let val = duration/guarded_hours;
    color = heatMapColorforValue(Math.min(val, 1));
    return get_tile_canvas(color, state.tile_width - 3, state.tile_height-3, (duration/HOUR).toFixed(0),'h', state.realmTilesLookup[tile_id] ? true : false);       
}
