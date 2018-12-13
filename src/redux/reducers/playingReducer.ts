/**
 * Estado inicial de la aplicación, para controlar turno y casillas marcadas.
 */
const initialState = {
  xIsNext: true,
  squares: ["", "", "", "", "", "", "", "", ""]
};
/**
 * Reducer encargado de modificar el estado de la aplicación.
 * @param state Estado actual de la aplicación
 * @param action Acción que modificará el estado de la aplicación
 */
export const playingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "CHECK":
      const squares = state.squares.slice();
      squares[action.payload.position] = state.xIsNext ? "X" : "O";
      return {
        ...state,
        xIsNext: !state.xIsNext,
        squares
      };
    default:
      return state;
  }
};
