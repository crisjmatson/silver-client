import * as React from "react";
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
import { User, Profile } from "../InterfaceExports";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import ViewProfile from "./user-info/ViewProfile";
import PostView from "./post-access/PostView";
import APIURL from "../../helpers/environment";

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
	user: User;
	profile: Profile;
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
			user: {
				createdAt: "",
				email: "",
				id: 999999999999,
				password: "",
				role: "",
				updatedAt: "",
				username: "",
			},
			profile: {
				avatar: "",
				challenges_completed: 0,
				createdAt: "",
				date_graduated: "",
				grad_status: "",
				id: 999999999999,
				updatedAt: "",
				userId: 999999999999,
			},
		};
	}

	componentDidMount() {
		this.accountFetch();
	}

	accountFetch = () => {
		fetch(`${APIURL}/user/view`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				this.setState({ user: json.user });
				console.log("user set");
			})
			.then(() => this.profileFetch());
	};
	profileFetch() {
		fetch(`${APIURL}/profile/view`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		})
			.then((response) => response.json())
			.then((json) =>
				json.error
					? this.profileCreate()
					: this.setState({ profile: json.user })
			);
		console.log("profile set");
	}
	profileCreate() {
		let blank = {
			profile: {
				avatar: "",
				grad_status: "",
				date_graduated: "",
			},
		};
		fetch(`${APIURL}/profile`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
			body: JSON.stringify(blank),
		})
			.then((response) => response.json())
			.then((json) => this.setState({ profile: json.user }));
		console.log("profile set");
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
								{/* <MenuItem onClick={() => this.handleClose()}>
									<Link to="/profile">Profile</Link>
								</MenuItem> */}
							</Menu>
							<Typography variant="h6">
								{this.props.adminStatus ? "ADMIN" : "Wesch"}
							</Typography>
							<Button
								color="inherit"
								onClick={() => {
									this.props.setCoin(undefined);
									this.refreshPage(); //  reload(true);
								}}
							>
								Logout
							</Button>
						</Toolbar>
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
								userAccount={this.state.user}
								userProfile={this.state.profile}
							/>
						</Route>
					</Switch>
				</div>
			</Container>
		);
	}
}
