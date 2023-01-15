let state = {
    // Map Dimensions
    width: 7200,
    height: 4200,
    fontSize: 18,
    offsetX: 5,
    offsetY: 5,

    minHours: 0,
    maxHours: 48,

    minDefense: 0,
    maxDefense: 50,

    minYield: 0.0,
    maxYield: 3.0,

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

    // Blank Tiles
    blankTilePoly: null,
    blankTileRealmPoly: null,

    // States
    tileStates: null,
    allTiles: null,

    // Canvas Tile Lookups
    factionLookup: {},
    factionCounts: {},
    yieldLookup: {},
    yieldBricksLookup: {},
    guardedLookup: {},
    guardedColorLookup: {},
    guardedYieldLookup: {},
    defenseLookup: {},
    guardedYieldValLookup: {},
    defenseValLookup: {},

    realmShapes: {},
    tileShapes: {},

    realmTileLookup: {},
    realmTilesLookup: {},

    // Data
    realms: realms,
    mapTiles: mapTiles,
    factionNames: factionNames,

    // Map History
    mapHistory: null,
    mapHistoryIndex: 0,
    factionHistoryLookup: {},
    tileHistoryStates: {},
    historyPlaying: false,
    mapHistoryInterval: null,
    factionHistoryCounts: [],
};
