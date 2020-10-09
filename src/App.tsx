import { Button, Container } from "@material-ui/core";
import * as React from "react";
import "./App.css";
import Auth from "./components/guest/Authenticate";
import AllPosts from "./components/guest/AllPosts";
import Entrance from "./components/user/Entrance";

/* class weschProvider extends React.Component {
	state = {
		token: undefined,
	};
	render() {
		return (
			<weschContext.Provider value={this.state}>
				{this.props.children}
			</weschContext.Provider>
		);
	}
}
*/
export default class App extends React.Component {
	weschContext = React.createContext(this.state);
	state = {
		coin: "",
		currentuser: "",
		admin: false,
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

	render() {
		return (
			<div className="ultimateContainer">
				<this.weschContext.Provider value={this.state}>
					<div className="App">
						{this.state.coin === "" ? (
							<Container className="app-dual">
								<Container className="authenticate-maindiv">
									<Auth
										coin={this.state.coin}
										setCoin={this.setCoin}
										currentuser={this.state.currentuser}
										setCoinName={this.setCoinName}
										setAdmin={this.setAdmin}
									/>
								</Container>
								<AllPosts />
							</Container>
						) : (
							<Container className="app-dual">
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
				</this.weschContext.Provider>
			</div>
		);
	}
}
