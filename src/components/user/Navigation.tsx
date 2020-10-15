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
import * as React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import PostView from "./post-access/PostView";
import ViewProfile from "./user-info/ViewProfile";
import Home from "./home/Home";

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
	/* 	user: User;
	profile: Profile; */
}
export default class Navigation extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			anchorEl: false,
			grad_status: "",
			profileReady: true,
			edit: false,
			delete: false,
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

	render() {
		return (
			<Container>
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
									<Link to="/postview">Posts</Link>
								</MenuItem>
								<MenuItem onClick={() => this.handleClose()}>
									<Link to="/viewprofile">Account</Link>
								</MenuItem>
							</Menu>
							<Typography variant="h6">
								{this.props.adminStatus ? "ADMIN" : "Wesch"}
							</Typography>
							<Button
								color="inherit"
								onClick={() => {
									this.props.setCoin(undefined);
									this.refreshPage();
								}}
							>
								Logout
							</Button>
						</Toolbar>
						<Breadcrumbs aria-label="breadcrumb">
							<Link to="/" color="inherit" href="/" /* onClick={handleClick} */>
								<HomeIcon />
								Material-UI
							</Link>
							<Link
								to="/"
								color="inherit"
								href="/getting-started/installation/"
								/* onClick={handleClick} */
							>
								<WhatshotIcon />
								Core
							</Link>
							<Typography color="textPrimary">
								<GrainIcon />
								Breadcrumb
							</Typography>
						</Breadcrumbs>
					</AppBar>
					<Switch>
						
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
