// zoom in at position x,y. If omitted, zoom in at the center.
function zoomIn(x=0, y=0) {
    let zoomer = document.getElementById('MapZoomer');
    let scale = parseFloat(zoomer.style.transform.replace('scale(', '').replace(')', ''));
    let ratio = 1.2;
    scale*=ratio;
    state.zoom = scale;
    zoomer.style.transform = 'scale('+scale+')';

    let mapOuter = document.getElementById('MapOuter');
    if (x==0)
        x = mapOuter.clientWidth/2
    if (y==0)
        y = mapOuter.clientHeight/2
    mapOuter.scrollLeft = ((mapOuter.scrollLeft + x) * ratio) - x;
    mapOuter.scrollTop = ((mapOuter.scrollTop + y) * ratio) - y;
    updateUrlState();
}

// zoom out at position x,y. If omitted, zoom out from the center.
function zoomOut(x=0, y=0){
    let zoomer = document.getElementById('MapZoomer');
    let scale = parseFloat(zoomer.style.transform.replace('scale(', '').replace(')', ''));
    let ratio = 0.8;
    scale*=ratio;
    state.zoom = scale;
    zoomer.style.transform = 'scale('+scale+')';

    let mapOuter = document.getElementById('MapOuter');
    if (x==0)
        x = mapOuter.clientWidth/2
    if (y==0)
        y = mapOuter.clientHeight/2
    mapOuter.scrollLeft = ((mapOuter.scrollLeft + x) * ratio) - x;
    mapOuter.scrollTop = ((mapOuter.scrollTop + y) * ratio) - y;
    updateUrlState();
}

function zoomToRealm(){
    let mapOuter = document.getElementById('MapOuter');
    state.zoomReset = {
        zoom: state.zoom,
        scrollLeft: mapOuter.scrollLeft,
        scrollTop: mapOuter.scrollTop
    };

    let zoomer = document.getElementById('MapZoomer');
    zoomer.style.transform = 'scale('+0.75+')';
    state.zoom = 0.75;
    mapOuter.scrollLeft = 0;
    mapOuter.scrollTop = 0;
    updateUrlState();
}

function zoomFromRealm(){
    let zoomer = document.getElementById('MapZoomer');
    zoomer.style.transform = 'scale('+state.zoomReset.zoom+')';
    state.zoom = state.zoomReset.zoom;
    
    let mapOuter = document.getElementById('MapOuter');
    mapOuter.scrollLeft = state.zoomReset.scrollLeft;
    mapOuter.scrollTop = state.zoomReset.scrollTop;
    updateUrlState();
}

function loadZoom(){
    let mapOuter = document.getElementById('MapOuter');
    mapOuter.scrollLeft = 1000;//parseInt(state.pos.left);
    mapOuter.scrollTop = 1000;//parseInt(state.pos.top);
    let zoomer = document.getElementById('MapZoomer');
    zoomer.style.transform = 'scale('+state.zoom+')';
}

function zoomToTile(evt){
    let zoomer = document.getElementById('MapZoomer');
    let mapOuter = document.getElementById('MapOuter');
    let scale = parseFloat(zoomer.style.transform.replace('scale(', '').replace(')', ''));
    let ratio = 1/scale;
    if(state.zoom != 1){
        state.zoom = 1;
        zoomer.style.transform = 'scale('+state.zoom+')';
        let x = evt.clientX;
        let y = evt.clientY;
        if(isSafariMobile() || isMobile()){
            x = evt.pageX;
            y = evt.pageY;
        }
        mapOuter.scrollLeft = ((mapOuter.scrollLeft+x)*ratio)-(mapOuter.clientWidth/2);
        mapOuter.scrollTop = ((mapOuter.scrollTop+y)*ratio)-(mapOuter.clientHeight/2);
    } else {
        state.zoom = 0.2;
        zoomer.style.transform = 'scale('+state.zoom+')';
        mapOuter.scrollLeft = 0;
        mapOuter.scrollTop = 0;
    }
    updateUrlState();
}