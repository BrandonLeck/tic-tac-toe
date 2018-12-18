import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addCheck } from "../../redux/actions/playingAction";
/**
 * Función encargada de definir que parte del estado global de la aplicación se va a requerir en el componente 'Board'.
 * @param {Object} state Estado global de la aplicación sobre el cual se desean capturar propiedades.
 */
const mapStateToProps = state => ({
  squares: state.squares,
  xIsNext: state.xIsNext,
  completedGame: state.completedGame,
  winnerFound: state.winnerFound
});
/**
 * Función encargada de definir que acciones utilizará el componente 'Board' para modificar el estado global de la aplicación.
 * @param {Object} dispatch 
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addCheck
    },
    dispatch
  );

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        changePlayer={() => this.handleClick(i)}
      />
    );
  }

  handleClick = i => {
    this.props.addCheck(i);
  };

  render() {
    const status = this.props.winnerFound === true ? `The winner is: ${this.props.xIsNext ? 'O' : 'X'}` : `Next player: ${this.props.xIsNext ? "X" : "O"}`;
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
  /**
   * Método encargado de ejecutar el turno del robot, siempre y cuando el juego no este completo y no exista un ganador.
   */
  componentDidUpdate= () => {
    if (this.props.xIsNext === false && !this.props.completedGame && this.props.winnerFound === false) {
      this.getRandomShift();
    }      
  }
  /**
   * Método encargado de realizar una petición a 'random.org' para simular el turno del contrincante.
   */
  getRandomShift = () => {
    let me = this;
    fetch('https://www.random.org/integers/?num=1&min=0&max=8&col=5&base=10&format=plain&rnd=new').then(function(response) {
      return response.json();	
    }).then(function(position) {
      if (me.props.squares[position] === "") {
        me.props.addCheck(position);
      } else {
        console.log("La posición ya está marcada!");
        me.getRandomShift();
      }
    }).catch(function(error) {
      console.log(error);
    })
  }
}
/**
 * Función encargada de construir el componente Square, cada uno de los cuadrados en el interior de Board.
 * @param {Object} props Propiedades del componente funcional Square
 */
const Square = function(props) {
  return (
    <button className="square" onClick={props.changePlayer}>
      {props.value}
    </button>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
