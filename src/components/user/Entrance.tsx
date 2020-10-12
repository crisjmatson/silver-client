import { Button, Container } from "@material-ui/core";
import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Navigation";

interface Props {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	currentuser: string;
	coin: string | undefined;
	adminStatus: boolean;
}

export default class Entrance extends React.Component<Props> {
	affirmation() {
		fetch(
			"https://www.affirmations.dev"
		).then((res) => {
			console.log(res);
		});
		//.catch(console.error);
		//console.log("response: ", response);
	}

	render() {
		return (
			<div>
				<Router>
					<Navigation
						currentuser={this.props.currentuser}
						setCoinName={this.props.setCoinName}
						coin={this.props.coin}
						setCoin={this.props.setCoin}
						adminStatus={this.props.adminStatus}
					/>
				</Router>
				<Container>
					<Button onClick={() => this.affirmation()}>affirm!!</Button>
				</Container>
			</div>
		);
	}
}
