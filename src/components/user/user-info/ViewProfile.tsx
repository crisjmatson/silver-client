import React, { Component } from "react";
import Account from "./Account";

export default class ViewProfile extends Component<any, any> {
	render() {
		return (
			<div>
				<Account
					currentuser={this.props.currentuser}
					setCoinName={this.props.setCoinName}
					coin={this.props.coin}
					setCoin={this.props.setCoin}
					userAccount={this.props.user}
					userProfile={this.props.profile}
				/>
			</div>
		);
	}
}
