let offscreenCanvas = null;
function snapshot() {
    const canvasEl = document.getElementById('mapCanvas');
    if(!offscreenCanvas){
        offscreenCanvas =
        'OffscreenCanvas' in window
            ? canvasEl.transferControlToOffscreen()
            : canvasEl;
    }
    if (offscreenCanvas.getContext) {
        // canvasEl.style.opacity = 0.5;

        // Hack to clear the canvas while redrawing so it feels more responsive
        // setTimeout(()=>{
            var ctx = offscreenCanvas.getContext('2d');
            if(!ctx){
                alert('out of memory');
                // window.location.reload();
            }
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

            let tiles = [];
            if(state.activeRealm){
                state.realms.forEach((realm)=>{
                    tiles = tiles.concat(realm.map);
                });
            } else {
                tiles = state.mapTiles;
                console.log('mapTiles:', tiles.length);
            }

            for (let [index, hexagon] of tiles.entries()) {
                let shape = null;
                let isRealm = false;
                if(state.historyPlaying){
                    if(hexagon.enabled && state.tileHistoryStates[state.mapHistoryIndex]){
                        let faction = state.tileHistoryStates[state.mapHistoryIndex][hexagon.tile_id];
                        shape = state.factionHistoryLookup[state.mapHistoryIndex][faction];
                    }
                } else if (hexagon.enabled || state.activeRealm) {
                    if(state.tileStates[hexagon.tile_id]){
                        if(state.selectedLayer == 0){
                            let key = state.tileStates[hexagon.tile_id].faction_id;
                            if(state.activeRealm){
                                isRealm = true;
                                key = 'faction_'+state.tileStates[hexagon.tile_id].faction_id + '_realm';
                            }
                            shape = state.factionLookup[key];
                        } else if(state.selectedLayer == 1){
                            let durationHours = state.guardedColorLookup[hexagon.tile_id];
                            shape = state.guardedLookup[durationHours];
                            if(state.activeRealm){
                                isRealm = true;
                                shape = state.guardedLookup['duration_'+durationHours+'_realm'];
                            }
                        } else if(state.selectedLayer == 2){
                            let game_bricks_per_day = state.yieldBricksLookup[hexagon.tile_id];
                            shape = state.yieldLookup[game_bricks_per_day];
                            if(state.activeRealm){
                                isRealm = true;
                                shape = state.yieldLookup['yield_'+game_bricks_per_day+'_realm'];
                            }
                        } else if(state.selectedLayer == 3){
                            let guardedYield = state.guardedYieldValLookup[hexagon.tile_id];
                            shape = state.guardedYieldLookup[guardedYield];
                            if(state.activeRealm){
                                isRealm = true;
                                shape = state.guardedYieldLookup['guardedYield_'+guardedYield+'_realm'];
                            }
                        }
                    } 
                    if(!state.activeRealm && !state.tileStates[hexagon.tile_id]){
                        if(state.realms.find((realm)=>hexagon.tile_id==realm.tile_id)){
                            isRealm = true;
                            shape = state.realmTileLookup[hexagon.tile_id];
                        }
                    }
                }
                if(!shape){
                    shape = hexagon.tile ? state.blankTileRealmPoly : state.blankTilePoly;
                }
                let offsetX = 0;
                let offsetY = 0;
                let left = (hexagon.x-1) * col_size*3,
                    top = (hexagon.y-1) * row_size;

                if(state.activeRealm) {
                    let realmIndex = Math.floor(index/37);
                    let realm = state.realms[realmIndex];
                    top = (hexagon.tile.y+5) * row_size*1.5*realmHeightRatio + (Math.floor(index/(37*3)) * 9*row_size*1.5*realmHeightRatio);
                    if(index < (37*3)){
                        left = ((hexagon.tile.x+20) * col_size*2) + (Math.floor(index/37)*15*col_size*2);
                    } else {
                        left = ((hexagon.tile.x+20) * col_size*2) + (Math.floor((index-(37*3))/37)*15*col_size*2)
                    }
                    state.tileShapes[hexagon.tile_id] = {
                        left,
                        top,
                        isRealm: true
                    };
                    if(index % 37 == 0){
                        ctx.font="24px Helvetica";
                        ctx.shadowColor="black";
                        ctx.shadowBlur=2;
                        ctx.lineWidth=2;
                        ctx.strokeText(realm.country.name,left, top - 20);
                        ctx.shadowBlur=0;
                        ctx.fillStyle="white";
                        if(realm.tile_id == state.activeRealm){
                            ctx.fillStyle="red";
                        } 
                        ctx.fillText(  realm.country.name,left, top - 20);
                    }
                }
                if(isRealm){
                    state.realmShapes[hexagon.tile_id] = {
                        left,
                        top
                    };
                } else if (!state.tileShapes[hexagon.tile_id]){
                    state.tileShapes[hexagon.tile_id] = {
                        left,
                        top,
                        isRealm: false
                    };
                }
                var imageObj = new Image();
                imageObj.width = shape.width;
                imageObj.height = shape.height;
                ctx.drawImage(shape, left+1+offsetX, top-1+offsetY); 
            }
            
            // canvasEl.style.opacity = 1;
        // }, 0 );
    }
}

function get_tile_canvas(color, width, height, value, suffix, isRealm) {
    var poly = [23, 4, 25.5, 1.25, 29, 0, 71, 0, 74.5, 1.25, 77, 4, 98, 46, 98.75, 50, 98, 54, 77, 96, 74.5, 98.75, 71, 100, 29, 100, 25.5, 98.75, 23, 96, 2, 54, 1.25, 50, 2, 46];
    let realm_poly = rotatePoly(poly);
    // Use an offscreen canvas to speed everything up
    let tileCanvas = null;
    if(typeof OffscreenCanvas !== "undefined"){
        tileCanvas = new OffscreenCanvas(width, height);
    } else {
        tileCanvas = document.createElement('canvas');
    }
    let widthRatio = width/100;
    let heightRatio = height/100;

    let offsetY = state.offsetY;
    let offsetX = state.offsetX*value.length;

    if(isRealm){
        poly = realm_poly;
        tileCanvas.height = height*realmHeightRatio;
        offsetY = 10;
    }

    let ctx = tileCanvas.getContext('2d');
    if(!ctx){
        alert('out of memory');
        // window.location.reload();
    }
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(poly[0]*widthRatio, poly[1]*heightRatio);
    for (let i = 2; i < poly.length - 1; i += 2) { 
        ctx.lineTo(poly[i]*widthRatio, poly[i + 1]*heightRatio) 
    }
    ctx.closePath();
    ctx.fill();

    ctx.font=state.fontSize+"px Helvetica";
    ctx.shadowColor="black";
    ctx.shadowBlur=2;
    ctx.lineWidth=2;
    ctx.strokeText(value+suffix,width/2-offsetX,height/2+offsetY);
    ctx.shadowBlur=0;
    ctx.fillStyle="white";
    ctx.fillText(value+suffix,width/2-offsetX,height/2+offsetY);
    return tileCanvas;
}

function freeMemory(layer){
    if(layer != 'faction'){
        Object.keys(state.factionLookup).forEach((key)=>{
            state.factionLookup[key].width = 0;
            state.factionLookup[key].height = 0;
            delete state.factionLookup[key];
        });
    }
    if(layer != 'guarded'){
        Object.keys(state.guardedLookup).forEach((key)=>{
            state.guardedLookup[key].width = 0;
            state.guardedLookup[key].height = 0;
            delete state.guardedLookup[key];
        });
    }
    if(layer != 'yield'){
        Object.keys(state.yieldLookup).forEach((key)=>{
            state.yieldLookup[key].width = 0;
            state.yieldLookup[key].height = 0;
            delete state.yieldLookup[key];
        });
    }
    if(layer != 'guarded_yield'){
        Object.keys(state.guardedYieldLookup).forEach((key)=>{
            state.guardedYieldLookup[key].width = 0;
            state.guardedYieldLookup[key].height = 0;
            delete state.guardedYieldLookup[key];
        });
    }
}
