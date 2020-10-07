import { Button } from "@material-ui/core";
import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Navigation";

export interface entranceProps {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	currentuser: string | undefined;
	coin: string | undefined;
}
export default class Entrance extends React.Component<entranceProps> {
	render() {
		return (
			<div>
				<Router>
					<Navigation
						currentuser={this.props.currentuser}
						setCoinName={this.props.setCoinName}
						coin={this.props.coin}
						setCoin={this.props.setCoin}
					/>
				</Router>
			</div>
		);
	}
}
