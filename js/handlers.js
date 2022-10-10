const mouseDownHandler = function (e) {
    let mapOuter = document.getElementById('MapOuter');
    state.pos = {
        // The current scroll
        left: mapOuter.scrollLeft,
        top: mapOuter.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
    };

    mapOuter.style.cursor = 'grabbing';
    mapOuter.style.userSelect = 'none';

    if(isSafariMobile() || isMobile()){
        document.addEventListener('touchmove', touchMoveHandler);
        document.addEventListener('touchend', touchEndHandler);
    } else {
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }

};

var mylatesttap;
function doubleTapHandler(evt) {
   var now = new Date().getTime();
   var timesince = now - mylatesttap;
   if((timesince < 600) && (timesince > 0)){
    zoomToTile(evt);
   }
   mylatesttap = new Date().getTime();
}
const dblClickHandler = function (evt){
    zoomToTile(evt);
}

const touchMoveHandler = function(e) {    
  // How far the mouse has been moved
  const dx = e.touches[0].clientX - state.pos.x;
  const dy = e.touches[0].clientY - state.pos.y;

    // Scroll the element
  let mapOuter = document.getElementById('MapOuter');
  mapOuter.scrollTop = state.pos.top - dy;
  mapOuter.scrollLeft = state.pos.left - dx;
}

const touchEndHandler = function(e) {
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);

  let mapOuter = document.getElementById('MapOuter');
  mapOuter.style.cursor = 'grab';
  mapOuter.style.removeProperty('user-select');
  updateUrlState();
}

const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - state.pos.x;
    const dy = e.clientY - state.pos.y;

    // Scroll the element
    let mapOuter = document.getElementById('MapOuter');
    mapOuter.scrollTop = state.pos.top - dy;
    mapOuter.scrollLeft = state.pos.left - dx;
};

const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    let mapOuter = document.getElementById('MapOuter');
    mapOuter.style.cursor = 'grab';
    mapOuter.style.removeProperty('user-select');
    updateUrlState();
};

const getMouse = function(e) {
    let mapOuter = document.getElementById('MapOuter');
    var mx, my;
    mx = (e.pageX + mapOuter.scrollLeft)/state.zoom;
    my = (e.pageY + mapOuter.scrollTop)/state.zoom;
    return {x: mx, y: my};
}

function addEventListeners(){
    let mapOuter = document.getElementById('MapOuter');
    if(isSafariMobile() || isMobile()){
        mapOuter.addEventListener('ondragstart', mouseDownHandler);
    } else {
        mapOuter.addEventListener('mousedown', mouseDownHandler);
        mapOuter.addEventListener("dblclick", dblClickHandler);
    }
   
    // mapOuter.addEventListener("click", doubleTapHandler);

    const radios = document.querySelectorAll('input[name="layer"]');
    radios.forEach((radio, index)=> {
        if(index == state.selectedLayer){
            radio.checked = true;
        } else {
            radio.checked = false;
        }
        radio.addEventListener('change', function() {
            // stopMapHistory();
            state.selectedLayer = parseInt(this.value);
            if(state.selectedLayer == 0){
                state.layer = 'faction';
            } else if(state.selectedLayer == 1){
                state.layer = 'guarded';
            } else if(state.selectedLayer == 2){
                state.layer = 'yield';
            } else if(state.selectedLayer == 3){
                state.layer = 'guarded_yield';
            }
            state.tileStates = getTileStates(state.allTiles);
            layerUpdate();
            snapshot();
            updateUrlState();
        });
    });
    
    let viewRealms = document.getElementById('viewRealms');
    viewRealms.addEventListener("click", (evt)=>{
        if(state.activeRealm){
            exitRealm();
        } else {
            enterRealm({tile_id:8787, country: {iso: 'mc'}});
        }
    });

    let viewMapHistory = document.getElementById('viewMapHistory');
    viewMapHistory.addEventListener("click", (evt)=>{
        let play = document.getElementById('viewMapHistory').innerHTML == 'Play History' ? true : false;
        if(play){
            playMapHistory();
        } else {
            stopMapHistory();
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

    document.addEventListener('click', function (e) {
        if (e.ctrlKey || e.metaKey) {
          console.log('Ctrl | Cmnd clicked');
          return;
        }
    });

    let canvas = document.getElementById('mapCanvas');  
    canvas.addEventListener("click", (e) => {
        var mouse = getMouse(e);
        var mx = mouse.x;
        var my = mouse.y;
        let hit = false;
        state.realms.forEach((realm)=>{
            let shape = state.realmShapes[realm.tile_id];
            if(shape){
                let x1 = shape.left;
                let y1 = shape.top;
                let x2 = x1 + state.tile_width;
                let y2 = y1 + state.tile_height;
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
            for (let tile of state.allTiles) {
                let tile_id = tile[0];
                let shape = state.tileShapes[tile_id];
                if(shape && (
                    (state.activeRealm && shape.isRealm) || 
                    (!state.activeRealm && !shape.isRealm))){
                    let x1 = shape.left;
                    let y1 = shape.top;
                    let x2 = x1 + state.tile_width;
                    let y2 = y1 + state.tile_height;
                    if(mx >= x1 && mx <= x2 && my >= y1 && my <= y2){
                        console.log("Clicked Tile: ", tile_id);
                        window.open('https://liquidlands.io/land/'+tile_id, '_blank');
                        // break;
                    }
                }
            };
        } else if(!hit && state.activeRealm){
            console.log("Exit Realm: ");
            exitRealm();
        } 
    });
}
