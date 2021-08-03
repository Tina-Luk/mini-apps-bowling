import React from 'react';

class Bowl extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h3>Click to Bowl (Pins Hit)</h3>
				<table className="bowl-table">
					<tr>
						<td onClick={this.props.updateScore}>1</td>
						<td onClick={this.props.updateScore}>2</td>
						<td onClick={this.props.updateScore}>3</td>
					</tr>
					<tr>
						<td onClick={this.props.updateScore}>4</td>
						<td onClick={this.props.updateScore}>5</td>
						<td onClick={this.props.updateScore}>6</td>
					</tr>
					<tr>
						<td onClick={this.props.updateScore}>7</td>
						<td onClick={this.props.updateScore}>8</td>
						<td onClick={this.props.updateScore}>9</td>
					</tr>
					<tr>
						<td onClick={this.props.updateScore}>-</td>
						<td onClick={this.props.updateScore}>10</td>
						<td onClick={this.props.updateScore}>-</td>
					</tr>
				</table>
			</div>
		);
	}
}
export default Bowl;
