import * as React from "react";
import {
	AppBar,
	Button,
	Fade,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@material-ui/core";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import Account from "./user-info/Account";
import Post from "./post-access/Post";

interface Props {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	currentuser: string | undefined;
	coin: string | undefined;
}
interface State {
	anchorEl: boolean;
}
export default class Navigation extends React.Component<Props, State> {
	state = {
		anchorEl: false,
	};

	handleClick = (event: React.MouseEvent<HTMLElement>) => {
		this.setState({ anchorEl: true });
	};

	handleClose = () => {
		this.setState({ anchorEl: false });
	};

	render() {
		return (
			<div>
				<div>
					<AppBar position="static">
						<Toolbar>
							<Button
								aria-controls="fade-menu"
								aria-haspopup="true"
								onClick={(e) => this.handleClick(e)}
							>
								MENU
							</Button>
							<Menu
								id="fade-menu"
								anchorEl={null}
								keepMounted
								open={this.state.anchorEl}
								onClose={() => this.handleClose()}
								TransitionComponent={Fade}
							>
								<MenuItem onClick={() => this.handleClose()}>
									<Link to="/post">Posts</Link>
								</MenuItem>
								<MenuItem onClick={() => this.handleClose()}>
									<Link to="/account">Account</Link>
								</MenuItem>
								{/* <MenuItem onClick={() => this.handleClose()}>
									<Link to="/profile">Profile</Link>
								</MenuItem> */}
							</Menu>
							<Typography variant="h6">Wesch</Typography>
							<Button
								color="inherit"
								onClick={() => this.props.setCoin(undefined)}
							>
								Logout
							</Button>
						</Toolbar>
					</AppBar>
					<Switch>
						<Route exact path="/post">
							<span>
								<Post
									currentuser={this.props.currentuser}
									setCoinName={this.props.setCoinName}
									coin={this.props.coin}
									setCoin={this.props.setCoin}
								/>
							</span>
						</Route>
						<Route exact path="/account">
							<Account
								currentuser={this.props.currentuser}
								setCoinName={this.props.setCoinName}
								coin={this.props.coin}
								setCoin={this.props.setCoin}
							/>
						</Route>
					</Switch>
				</div>
			</div>
		);
	}
}
