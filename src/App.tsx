import * as React from "react";
import "./App.css";
import Auth from "./components/Authenticate";
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
	};

	setCoin = (newCoin: string | undefined) => {
		this.setState({ coin: newCoin });
	};

	setCoinName = (name: string | undefined) => {
		this.setState({ currentuser: name });
	};

	render() {
		return (
			<div className="ultimateContainer">
				<this.weschContext.Provider value={this.state}>
					<div className="App">
						{this.state.coin === "" ? (
							<div className="authenticate-maindiv">
								<Auth
									coin={this.state.coin}
									setCoin={this.setCoin}
									currentuser={this.state.currentuser}
									setCoinName={this.setCoinName}
								/>
								<hr />
								<AllPosts />
							</div>
						) : (
							<Entrance
								currentuser={this.state.currentuser}
								setCoinName={this.setCoinName}
								coin={this.state.coin}
								setCoin={this.setCoin}
							/>
						)}
					</div>
				</this.weschContext.Provider>
			</div>
		);
	}
}
