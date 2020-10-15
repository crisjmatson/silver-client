import {
	AppBar,
	Button,
	Container,
	Toolbar,
	Typography,
} from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import React, { Component } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import "./Nav.css";
import PostView from "./post-access/PostView";
import ViewProfile from "./user-info/ViewProfile";

interface Props {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	currentuser: string;
	coin: string | undefined;
	adminStatus: boolean;
}
interface State {
	anchorEl: boolean;
	profileReady: boolean;
	edit: boolean;
	delete: boolean;
	grad_status: unknown;
	menuClick: boolean;
}

export default class Nav extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			anchorEl: false,
			grad_status: "",
			profileReady: true,
			edit: false,
			delete: false,
			menuClick: false,
		};
	}

	handleClick = (event: React.MouseEvent<HTMLElement>) => {
		this.setState({ anchorEl: true });
	};

	handleClose = () => {
		this.setState({ anchorEl: false });
	};

	refreshPage() {
		window.location.reload(false);
	}
	handleClickAway = () => {
		this.setState({ menuClick: false });
	};

	render() {
		return (
			<Container>
				<div>
					<ClickAwayListener onClickAway={this.handleClickAway}>
						<AppBar position="static">
							{this.state.menuClick ? (
								<Toolbar className="navlink-clicked">
									<span className="navlink-clicked-home">
										<Link to="/home" color="inherit">
											<Button>
												<HomeIcon />
												{"Home"}
											</Button>
										</Link>
									</span>
									<span className="navlink-clicked-account">
										<Link to="/viewprofile" color="inherit">
											<Button>
												<PermIdentityIcon />
												{"Account"}
											</Button>
										</Link>
									</span>
									<span className="navlink-clicked-posts">
										<Link to="/postview" color="inherit" href="/">
											<Button>
												<SpeakerNotesIcon />
												Posts
											</Button>
										</Link>
									</span>
									<span className="navlink-clicked-logout">
										<Typography color="textPrimary">
											<Button
												onClick={() => {
													this.props.setCoin(undefined);
													this.refreshPage();
												}}
											>
												<ExitToAppIcon />
												Logout
											</Button>
										</Typography>
									</span>
								</Toolbar>
							) : (
								<Toolbar>
									<Button
										onClick={() => {
											this.setState({ menuClick: true });
										}}
									>
										<MenuIcon />
										Menu
									</Button>
								</Toolbar>
							)}
						</AppBar>
					</ClickAwayListener>
					<Switch>
						<Route
							exact
							path="/"
							render={() => {
								return this.props.coin !== undefined ? (
									<Redirect to="/home" />
								) : (
									<Redirect to="/" />
								);
							}}
						/>
						<Route exact path="/home">
							<span>
								<Home
								/* currentuser={this.props.currentuser}
									setCoinName={this.props.setCoinName}
									coin={this.props.coin}
									setCoin={this.props.setCoin}
									adminStatus={this.props.adminStatus} */
								/>
							</span>
						</Route>
						<Route exact path="/postview">
							<span>
								<PostView
									currentuser={this.props.currentuser}
									setCoinName={this.props.setCoinName}
									coin={this.props.coin}
									setCoin={this.props.setCoin}
									adminStatus={this.props.adminStatus}
								/>
							</span>
						</Route>
						<Route exact path="/viewprofile">
							<ViewProfile
								currentuser={this.props.currentuser}
								setCoinName={this.props.setCoinName}
								coin={this.props.coin}
								setCoin={this.props.setCoin}
							/>
						</Route>
					</Switch>
				</div>
			</Container>
		);
	}
}
