//import { Button, Container } from "@material-ui/core";
import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
//import Navigation from "./Navigation";
import Nav from './Nav'

interface Props {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	currentuser: string;
	coin: string | undefined;
	adminStatus: boolean;
}

export default class Entrance extends React.Component<Props> {
	render() {
		return (
			<div>
				{/* <Router>
					<Navigation
						currentuser={this.props.currentuser}
						setCoinName={this.props.setCoinName}
						coin={this.props.coin}
						setCoin={this.props.setCoin}
						adminStatus={this.props.adminStatus}
					/>
				</Router> */}
				<Router>
					<Nav
						currentuser={this.props.currentuser}
						setCoinName={this.props.setCoinName}
						coin={this.props.coin}
						setCoin={this.props.setCoin}
						adminStatus={this.props.adminStatus}
					/>
				</Router>
			</div>
		);
	}
}
