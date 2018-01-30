// Action Type
const GET_ALL_PLAYER_TILES = "GET_ALL_PLAYER_TILES";
const REMOVE_TILE_FROM_POUCH = "REMOVE_TILE_FROM_POUCH";
const ADD_TILE_TO_POUCH = "ADD_TILE_TO_POUCH";

// Action
export const getAllPlayerTiles = tiles => {
  return {
    type: GET_ALL_PLAYER_TILES,
    tiles
  };
};

export const removeTileFromPouch = id => {
  return {
    type: REMOVE_TILE_FROM_POUCH,
    id
  };
};

export const addTileToPouch = tile => {
  return {
    type: ADD_TILE_TO_POUCH,
    tile
  };
};

// Reducer
function playersPouch(state = [], action) {
  switch (action.type) {
    case GET_ALL_PLAYER_TILES:
      return action.tiles;
    case REMOVE_TILE_FROM_POUCH:
      return state.filter(tile => tile.id !== action.id);
    case ADD_TILE_TO_POUCH:
      return [action.tile, ...state]
    default:
      return state;
  }
}

export default playersPouch;
