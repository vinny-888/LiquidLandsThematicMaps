let state = {
    // Map Dimensions
    width: 7200,
    height: 4200,

    // URL Params
    realmIso: null,
    selectedLayer: null,

    // Active Real Tile ID
    activeRealm: null,

    // Drag Handler State
    pos: {
        top: 0,
        left: 0,
        x: 0,
        y: 0
    },

    // Zoom Handler State
    zoom: 0.2,
    zoomReset: {
        zoom: 0.2,
        scrollLeft: 0,
        scrollTop: 0
    },

    // Tile Dimensions
    tile_width: 0,
    tile_height: 0,

    // Blank Tile
    blankTilePoly: null,

    // States
    tileStates: null,
    allTiles: null,

    // Canvas Tile Lookups
    factionLookup: {},
    factionCounts: {},

    yieldLookup: {},

    guardedLookup: {},
    guardedYieldLookup: {},

    realmShapes: {},
    tileShapes: {},

    realmTileLookup: {},
    realmTilesLookup: {},

    // Data
    realms: realms,
    mapTiles: mapTiles,
    factionNames: factionNames,


};