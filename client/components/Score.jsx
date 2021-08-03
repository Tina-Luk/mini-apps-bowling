import React from 'react';
import Round from './Round.jsx';

class Score extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			frames: [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
			],
			totalScore: 0,
		};
		this.calculateTotal = this.calculateTotal.bind(this);
	}
	componentDidUpdate(prevProps) {
		if (this.props.update !== prevProps.update) {
			let currentFrame = this.state.frames.slice();
			if (this.props.frame === 10) {
				currentFrame[9][this.props.round] = this.props.score;
			} else {
				let score = this.props.gutter ? '-' : this.props.score;
				currentFrame[this.props.frame - 1][0] = this.props.round === 1 ? score : currentFrame[this.props.frame - 1][0];
				currentFrame[this.props.frame - 1][1] = this.props.round === 0 ? score : 0;
				for (let i = 0; i < currentFrame.length; i++) {
					let round1 = currentFrame[i][0] === '-' ? 0 : currentFrame[i][0];
					let round2 = currentFrame[i][1] === '-' ? 0 : currentFrame[i][1];
					currentFrame[i][2] = round1 + round2;
				}
			}
			this.setState(
				{
					frames: currentFrame,
				},
				() => {
					this.calculateTotal();
				}
			);
		}
	}
	calculateTotal() {
		let framesCopy = this.state.frames.slice();
		let total = 0;
		for (let i = 0; i < framesCopy.length; i++) {
			if (framesCopy[i][2] < 10 || framesCopy[i][0] === '-' || framesCopy[i][1] === '-') {
				framesCopy[i][3] = framesCopy[i][2];
			} else if (framesCopy[i][2] === 10 && framesCopy[i][1] !== 10 && i !== 9) {
				framesCopy[i][3] = framesCopy[i][2] + (framesCopy[i + 1][0] === 0 && framesCopy[i + 1][1] === 10 ? 10 : framesCopy[i + 1][0] === '-' ? 0 : framesCopy[i + 1][0]);
			} else if (framesCopy[i][0] !== '-' && framesCopy[i][2] === 10 && framesCopy[i][1] === 10) {
				if (i < 7) {
					let nextStrike = framesCopy[i + 1][0] === 0 && framesCopy[i + 1][1] === 10;
					let followingStrike = framesCopy[i + 2][0] === 0 && framesCopy[i + 2][1] === 10;
					framesCopy[i][3] = framesCopy[i][2] + (nextStrike && followingStrike ? 20 : nextStrike ? (10 + framesCopy[i + 2][0] === '-' ? 0 : framesCopy[i + 2][0]) : framesCopy[i + 1][2]);
				} else if (i === 7) {
					let nextStrike = framesCopy[i + 1][0] === 0 && framesCopy[i + 1][1] === 10;
					framesCopy[i][3] = framesCopy[i][2] + (nextStrike ? 10 + framesCopy[i + 2][0] : framesCopy[i + 1][0] + framesCopy[i + 1][1]);
				} else if (i === 8) {
					framesCopy[i][3] = framesCopy[i + 1][0] + framesCopy[i + 1][1] + framesCopy[i + 1][2];
				} else if (i === 9) {
					framesCopy[i][3] = this.props.score;
					total += framesCopy[i][0] + framesCopy[i][1];
				}
			}
			total += framesCopy[i][3];
		}
		this.setState({
			totalScore: total,
		});
	}
	render() {
		return (
			<div>
				<h1>Score</h1>
				<table className="score-board">
					<tr>
						<th>Frame</th>
						{this.state.frames.map((frame, i) => (
							<th>{i + 1}</th>
						))}
						<th>TOTAL</th>
					</tr>
					<tr>
						<td>Round1</td>
						{this.state.frames.map((frame, i) => (
							<Round score={frame[0] === 0 && frame[1] === 10 ? '' : frame[0]} showFrame={this.props.frame > i} />
						))}
					</tr>
					<tr>
						<td>Round2</td>
						{this.state.frames.map((frame, i) => (
							<Round score={frame[0] + frame[1] === 10 && frame[1] === 10 ? 'X' : frame[0] + frame[1] === 10 && i !== 9 ? '/' : frame[1]} showFrame={this.props.frame > i} />
						))}
					</tr>
					<tr>
						<td>Score</td>
						{this.state.frames.map((frame, i) => (
							<Round score={frame[3]} showFrame={this.props.frame > i} />
						))}
						<td>{this.state.totalScore}</td>
					</tr>
				</table>
			</div>
		);
	}
}
export default Score;
