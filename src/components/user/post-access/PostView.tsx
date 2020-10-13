import React, { Component } from "react";
import Latest from "./Latest";

export default class PostView extends Component<any, any> {
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
