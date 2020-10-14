import { Button, Container } from "@material-ui/core";
import * as React from "react";
import "./App.css";
import Auth from "./components/guest/Authenticate";
import AllPosts from "./components/guest/AllPosts";
import Entrance from "./components/user/Entrance";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Card from "@material-ui/core/Card/Card";
import {
	Image,
	Video,
	Transformation,
	CloudinaryContext,
} from "./components/CloudinaryTypes";

export default class App extends React.Component {
	//weschContext = React.createContext(this.state);
	state = {
		coin: "",
		currentuser: "",
		admin: false,
		auth: false,
	};

	setCoin = (newCoin: string | undefined) => {
		this.setState({ coin: newCoin });
	};

	setCoinName = (name: string | undefined) => {
		this.setState({ currentuser: name });
	};

	setAdmin = (status: boolean) => {
		this.setState({ admin: status });
	};

	toggleAuth = () => {
		let opposite = this.state.auth;
		this.setState({ auth: !opposite });
	};

	render() {
		return (
			<div className="App">
				{this.state.coin === "" ? (
					<Container className="authenticate-outer-container">
						<div className="landing-logo-div">
							<img
								className="landing-logo-img"
								src="https://user-images.githubusercontent.com/68344211/95797523-bc27a880-0cbd-11eb-9ced-9d845c6bc9a8.png"
							/>
							<br />
						</div>
						<Container className="landing-auth-div" maxWidth="sm">
							{this.state.auth ? (
								<Auth
									coin={this.state.coin}
									setCoin={this.setCoin}
									currentuser={this.state.currentuser}
									setCoinName={this.setCoinName}
									setAdmin={this.setAdmin}
									toggleAuth={this.toggleAuth}
									auth={this.state.auth}
								/>
							) : (
								<span></span>
							)}
							<Button
								className="landing-logo-button"
								onClick={() => this.toggleAuth()}
								variant="contained"
							>
								click to login
							</Button>
						</Container>
						<div className="landing-box-trio">
							<Grid
								container
								spacing={8}
								justify="space-around"
								className="landing-box-trio-grid"
							>
								<Grid item xs={4}>
									<Paper className="box-trio">
										There are many variations of passages of Lorem Ipsum
										available, but the majority have suffered alteration in some
										form, by injected humour, or randomised words which don't
										look even slightly believable.
									</Paper>
								</Grid>
								<Grid item xs={4}>
									<Paper className="box-trio">
										There are many variations of passages of Lorem Ipsum
										available, but the majority have suffered alteration in some
										form, by injected humour, or randomised words which don't
										look even slightly believable.
									</Paper>
								</Grid>
								<Grid item xs={4}>
									<Paper className="box-trio">
										There are many variations of passages of Lorem Ipsum
										available, but the majority have suffered alteration in some
										form, by injected humour, or randomised words which don't
										look even slightly believable.
									</Paper>
								</Grid>
							</Grid>
						</div>
						<AllPosts />
					</Container>
				) : (
					<Container className="entrance-container">
						<Entrance
							currentuser={this.state.currentuser}
							setCoinName={this.setCoinName}
							coin={this.state.coin}
							setCoin={this.setCoin}
							adminStatus={this.state.admin}
						/>
					</Container>
				)}
			</div>
		);
	}
}
