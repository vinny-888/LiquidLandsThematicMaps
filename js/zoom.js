function zoomIn(){
    let zoomer = document.getElementById('MapZoomer');
    let scale = parseFloat(zoomer.style.transform.replace('scale(', '').replace(')', ''));
    let ratio = 1.2;
    scale*=ratio;
    state.zoom = scale;
    zoomer.style.transform = 'scale('+scale+')';

    let mapOuter = document.getElementById('MapOuter');
    mapOuter.scrollLeft = ((mapOuter.scrollLeft+mapOuter.clientWidth/2)*ratio)-(mapOuter.clientWidth/2);
    mapOuter.scrollTop = ((mapOuter.scrollTop+mapOuter.clientHeight/2)*ratio)-(mapOuter.clientHeight/2);
    updateUrlState();
}

function zoomOut(){
    let zoomer = document.getElementById('MapZoomer');
    let scale = parseFloat(zoomer.style.transform.replace('scale(', '').replace(')', ''));
    let ratio = 0.8;
    scale*=ratio;
    state.zoom = scale;
    zoomer.style.transform = 'scale('+scale+')';

    let mapOuter = document.getElementById('MapOuter');
    mapOuter.scrollLeft = ((mapOuter.scrollLeft+mapOuter.clientWidth/2)*ratio)-(mapOuter.clientWidth/2);
    mapOuter.scrollTop = ((mapOuter.scrollTop+mapOuter.clientHeight/2)*ratio)-(mapOuter.clientHeight/2);
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