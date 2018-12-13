import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addCheck } from "../../redux/actions/playingAction";

const mapStateToProps = state => ({
  squares: state.squares,
  xIsNext: state.xIsNext
});

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
    const status = `Next player: ${this.props.xIsNext ? "X" : "O"}`;
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
}

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
