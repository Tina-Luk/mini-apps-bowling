import React from 'react';

class Round extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <td>{this.props.showFrame ? this.props.score : ''}</td>;
	}
}
export default Round;
