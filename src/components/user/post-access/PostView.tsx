import React, { Component } from "react";
import Latest from "./Latest";

interface Props {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName?: (name: string) => void;
	currentuser: string | undefined;
	coin: string | undefined;
	adminStatus: boolean;
}

export default class PostView extends Component<Props> {
	render() {
		return (
			<div>
				<Latest
					currentuser={this.props.currentuser}
					setCoinName={this.props.setCoinName}
					coin={this.props.coin}
					setCoin={this.props.setCoin}
					adminStatus={this.props.adminStatus}
				/>
			</div>
		);
	}
}
