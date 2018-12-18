/**
 * Estado inicial de la aplicación, para controlar turno y casillas marcadas.
 */
const initialState = {
  xIsNext: true,
  squares: ["", "", "", "", "", "", "", "", ""],
  completedGame: false,
  winnerFound: false
};
/**
 * Reducer encargado de modificar el estado de la aplicación cada vez que alguien ha realizado un turno.
 * @param state Estado actual de la aplicación
 * @param action Acción que modificará el estado de la aplicación
 */
export const playingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "CHECK":
      const squares = state.squares.slice();
      let completedGame = null,
        winnerFound = null;

      squares[action.payload.position] = state.xIsNext ? "X" : "O";
      completedGame = squares.indexOf("") === -1 ? true : false;
      winnerFound = calculateWinner(squares) === null? false : true;

      return {
        ...state,
        xIsNext: !state.xIsNext,
        squares,
        completedGame,
        winnerFound
      };
    default:
      return state;
  }
}
/**
 * Función encargada de evaluar si en el juego ya existe un ganador.
 * @param squares Estado de los cuadrados del tablero
 */
const calculateWinner = (squares: any) =>  {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
