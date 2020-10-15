import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import * as React from "react";
import "./App.css";
import AllPosts from "./components/guest/AllPosts";
import Auth from "./components/guest/Authenticate";
import Entrance from "./components/user/Entrance";
import Radium from "radium";

/* STYLING */

const style = {
	color: "rgba(7, 34, 121, 0.913)",
	fontSize: "2em",
	backgroundColor: "rgba(246, 246, 255, 0.744)",
	border: "thin solid transparent",
	marginBottom: "3em",
	triobox: {
		margin: "-5%",
		paddingRight: "5em",
		paddingLeft: "5em",
	},
};

/* APP FUNCTION */

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface State {
	auth: boolean;
	currentuser: string;
	coin: string | undefined;
	admin: boolean;
	snackbarToggle: boolean;
	snackbarMessage: string;
	snackbarSeverity: "success" | "info" | "warning" | "error" | undefined;
}
interface Props {}

class App extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			coin: undefined,
			currentuser: "",
			admin: false,
			auth: false,
			snackbarToggle: false,
			snackbarMessage:
				"egyptian mummies are only rare because europeans ate them.",
			snackbarSeverity: "success",
		};
	}

	setCoin = (newCoin: string | undefined) => {
		this.setState({ coin: newCoin });
	};

	setCoinName = (name: string) => {
		this.setState({ currentuser: name });
	};

	setAdmin = (status: boolean) => {
		this.setState({ admin: status });
	};

	toggleAuth = () => {
		let opposite = this.state.auth;
		this.setState({ auth: !opposite });
	};
	setSnackBar = (
		value: boolean,
		message: string,
		severity: "success" | "info" | "warning" | "error" | undefined
	) => {
		this.setState({ snackbarSeverity: severity });
		this.setState({ snackbarMessage: message });
		this.setState({ snackbarToggle: value });
	};

	render() {
		return (
			<div className="App">
				{/* <StyleTest /> */}
				<div>
					<Snackbar
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						open={this.state.snackbarToggle}
						autoHideDuration={6000}
						onClose={() => this.setState({ snackbarToggle: false })}
						message={this.state.snackbarMessage}
						action={
							<React.Fragment>
								<IconButton
									size="small"
									aria-label="close"
									color="inherit"
									onClick={() => this.setState({ snackbarToggle: false })}
								>
									<CloseIcon fontSize="small" />
								</IconButton>
							</React.Fragment>
						}
					>
						<Alert
							onClose={() => this.setState({ snackbarToggle: false })}
							severity={this.state.snackbarSeverity}
						>
							{this.state.snackbarMessage}
						</Alert>
					</Snackbar>
				</div>
				{this.state.coin === undefined ? (
					<div className="authenticate-outer-container">
						{this.state.auth ? (
							<Auth
								snackbarSeverity={this.state.snackbarSeverity}
								snackbarToggle={this.state.snackbarToggle}
								snackbarMessage={this.state.snackbarMessage}
								setSnackBar={this.setSnackBar}
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
						<div className="landing-auth-div">
							<img
								alt="wesch logo"
								className="landing-logo-img"
								src="https://user-images.githubusercontent.com/68344211/95797523-bc27a880-0cbd-11eb-9ced-9d845c6bc9a8.png"
							/>
							<br />
							<Button
								style={style}
								/* className="landing-logo-button" */
								onClick={() => this.toggleAuth()}
								variant="outlined"
								color="inherit"
							>
								click to login
							</Button>
						</div>
						<div className="landing-box-trio" style={style.triobox}>
							<Grid
								container
								spacing={8}
								justify="space-around"
								className="landing-box-trio-grid"
							>
								<Grid item xs={4}>
									<Paper className="box-trio" elevation={22}>
										<p className="landing-box-trio-title">CURRENT</p>
										<hr />
										reach out for help on tough concepts & engage with other
										coding students facing similar struggles.
									</Paper>
								</Grid>
								<Grid item xs={4}>
									<Paper className="box-trio" elevation={22}>
										<p className="landing-box-trio-title">PROSPECT</p>
										<hr />
										receive insight to the unique challenges in learning to
										code, and view challenges & completed projects by alumni.
									</Paper>
								</Grid>
								<Grid item xs={4}>
									<Paper className="box-trio" elevation={22}>
										<p className="landing-box-trio-title">ALUMNI</p>
										<hr />
										assist others to reinforce & deepen personal knowledge,
										shares current ongoing & completed projects.
									</Paper>
								</Grid>
							</Grid>
						</div>
						<AllPosts />
					</div>
				) : (
					<div className="entrance-container">
						<Entrance
							currentuser={this.state.currentuser}
							setCoinName={this.setCoinName}
							coin={this.state.coin}
							setCoin={this.setCoin}
							adminStatus={this.state.admin}
						/>
					</div>
				)}
			</div>
		);
	}
}
export default Radium(App);
