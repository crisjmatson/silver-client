import React, { Component } from "react";
import {
	AppBar,
	Button,
	Container,
	Fade,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import GrainIcon from "@material-ui/icons/Grain";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import PostView from "./post-access/PostView";
import ViewProfile from "./user-info/ViewProfile";
import Home from "./home/Home";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import "./Nav.css";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';

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
