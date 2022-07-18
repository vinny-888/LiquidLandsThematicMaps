function getSortedKeys(obj) {
    var keys = Object.keys(obj);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
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

function heatMapColorforValue(value){
    var h = (1.0 - value) * 240
    return "hsl(" + h + ", 100%, 50%)";
}

function rotatePoly(poly){
    let newPoly = [];
    for(let i=0; i<poly.length-1; i+=2){
        newPoly.push(poly[i+1]);
        newPoly.push(poly[i]*realmHeightRatio);
    }
    return newPoly;
}

function layerUpdate(){
    const radios = document.querySelectorAll('input[name="layer"]')
    radios.forEach((radio, index)=> {
        if (radio.checked) {
            state.selectedLayer = index;
            let factionDiv = document.getElementById('factionsDiv');
            if(state.selectedLayer == 0){
                factionDiv.style.display = 'block';
            } else {
                factionDiv.style.display = 'none';
            }
        }
    });

    let table = document.getElementById('factionRows');
    getSortedKeys(state.factionCounts).forEach((faction, index)=>{
        let count = state.factionCounts[faction];
        table.innerHTML += `<tr>
        <td>${index+1}</td>
        <td style="max-width: 140px;">${state.factionNames[faction]}</td>
        <td><div class="colorSquare" style="background-color: ${getUniqueColor(faction)}"></div></td>
        <td>${count}</td>
    </tr>`;
    })
}

function updateUrlState(){
    let mapOuter = document.getElementById('MapOuter');
    let thisPage = new URL(window.location.href);
    /*
    var zoomParam = thisPage.searchParams.get('z');
    if(!zoomParam){
        thisPage.searchParams.append('z', state.zoom);
    } else {
        thisPage.searchParams.set('z', state.zoom);
    }

    var leftParam = thisPage.searchParams.get('l');
    if(!leftParam){
        thisPage.searchParams.append('l', mapOuter.scrollLeft);
    } else {
        thisPage.searchParams.set('l', mapOuter.scrollLeft);
    }

    var topParam = thisPage.searchParams.get('t');
    if(!topParam){
        thisPage.searchParams.append('t', mapOuter.scrollTop);
    } else {
        thisPage.searchParams.set('t', mapOuter.scrollTop);
    }
    */

    var realmParam = thisPage.searchParams.get('realm');
    if(state.realmIso){
        if(!realmParam){
            thisPage.searchParams.append('realm', state.realmIso);
        } else {
            thisPage.searchParams.set('realm', state.realmIso);
        }
    }

    if(state.layer){
        var layerParam = thisPage.searchParams.get('layer');
        if(!layerParam){
            thisPage.searchParams.append('layer', state.layer);
        } else {
            thisPage.searchParams.set('layer', state.layer);
        }
    }

    history.pushState({}, null, thisPage);
}

function setSelectedLayer(layer){
    const radios = document.querySelectorAll('input[name="layer"]');
    radios.forEach((radio)=> {
        radio.checked = false;
    });
    document.getElementById(layer).checked = true;
}