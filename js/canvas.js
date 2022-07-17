function snapshot() {
    let canvas = document.getElementById('mapCanvas');  
    if (canvas.getContext) {
        canvas.style.opacity = 0.5;

        // Hack to clear the canvas while redrawing so it feels more responsive
        setTimeout(()=>{
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let tiles = [];
            if(state.activeRealm){
                state.realms.forEach((realm)=>{
                    tiles = tiles.concat(realm.map);
                });
            } else {
                tiles = state.mapTiles;
            }

            for (let [index, hexagon] of tiles.entries()) {
                let shape = state.blankTilePoly;
                let isRealm = false;
                if (hexagon.enabled || state.activeRealm) {
                    if(state.tileStates[hexagon.tile_id]){
                        if(state.selectedLayer == 0){
                            let key = state.tileStates[hexagon.tile_id].faction_id;
                            if(state.activeRealm){
                                key = state.tileStates[hexagon.tile_id].faction_id + '_realm';
                            }
                            shape = state.factionLookup[key];
                        } else if(state.selectedLayer == 1){
                            shape = state.guardedLookup[hexagon.tile_id];
                        } else if(state.selectedLayer == 2){
                            shape = state.yieldLookup[hexagon.tile_id];
                        } else if(state.selectedLayer == 3){
                            shape = state.guardedYieldLookup[hexagon.tile_id];
                        }
                    } 
                    if(!state.activeRealm && !state.tileStates[hexagon.tile_id]){
                        if(state.realms.find((realm)=>hexagon.tile_id==realm.tile_id)){
                            isRealm = true;
                            shape = state.realmTileLookup[hexagon.tile_id];
                        }
                    }
                }
                if(shape){
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
                    imageObj.onload = function() {
                        ctx.drawImage(shape, left+1+offsetX, top-1+offsetY); 
                    };
                    imageObj.src = shape.toDataURL();
                }
            }
            
            canvas.style.opacity = 1;
        }, 0 );
    }
}

function get_tile_canvas(color, width, height, value, suffix, isRealm) {
    var poly = [23, 4, 25.5, 1.25, 29, 0, 71, 0, 74.5, 1.25, 77, 4, 98, 46, 98.75, 50, 98, 54, 77, 96, 74.5, 98.75, 71, 100, 29, 100, 25.5, 98.75, 23, 96, 2, 54, 1.25, 50, 2, 46];
    let realm_poly = rotatePoly(poly);
    let tileCanvas = document.createElement('canvas');
    let widthRatio = width/100;
    let heightRatio = height/100;
    tileCanvas.width = width;
    tileCanvas.height = height;

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
        tileCanvas.height = height*realmHeightRatio;
        offsetY = 10;
    }

    let ctx = tileCanvas.getContext('2d');
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
    return tileCanvas;
}