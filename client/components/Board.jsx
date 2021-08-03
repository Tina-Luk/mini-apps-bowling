import React from 'react';
import Score from './Score.jsx';
import Bowl from './Bowl.jsx';

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			frameScore: 0,
			score: 0,
			round: 0,
			frame: 0,
			valid: true,
			lastStrike: false,
			update: 0,
			gutter: false,
			done: false,
		};
		this.updateScore = this.updateScore.bind(this);
	}

	updateScore(pinsHit) {
		if (!this.state.done) {
			if (pinsHit.target.innerText === '-') {
				this.setState({
					gutter: true,
				});
			} else {
				this.setState({
					gutter: false,
				});
			}
			pinsHit = pinsHit.target.innerText === '-' ? 0 : Number(pinsHit.target.innerText);
			if (this.state.frameScore + pinsHit > 10 && this.state.round !== 0) {
				this.setState({
					valid: false,
				});
			} else if (this.state.frame === 10) {
				this.setState({
					round: this.state.round + 1,
					score: pinsHit,
				});
			} else if (this.state.round === 0 && pinsHit === 10) {
				this.setState({
					score: pinsHit,
					frameScore: 0,
					frame: this.state.frame + 1,
					valid: true,
				});
			} else if (this.state.round === 0 && pinsHit <= 10) {
				this.setState({
					score: pinsHit,
					round: 1,
					frameScore: pinsHit,
					frame: this.state.frame + 1,
					valid: true,
				});
			} else if (this.state.round === 1 && this.state.frameScore + pinsHit <= 10) {
				this.setState({
					score: pinsHit,
					round: 0,
					frameScore: pinsHit + this.state.frameScore,
					valid: true,
				});
			}
			this.setState({
				update: this.state.update + 1,
				done: this.state.frame === 10 && this.state.round === 1,
			});
		}
	}
	render() {
		console.log(this.state);
		return (
			<div>
				<h1>Bowling Score Tracker</h1>
				<h2 style={{ backgroundColor: 'yellow' }}>{this.state.done ? 'Thanks for Playing!' : ''}</h2>
				<Score frame={this.state.frame} round={this.state.round} score={this.state.score} update={this.state.update} gutter={this.state.gutter} done={this.state.isDone} />
				<h2 style={{ color: 'red' }}>{this.state.valid ? '' : 'NOT VALID BOWL - needs to be less than 10'}</h2>
				<Bowl updateScore={this.updateScore} />
			</div>
		);
	}
}
export default Board;
