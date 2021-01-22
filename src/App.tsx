import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import * as React from "react";
import AllPosts from "./components/guest/AllPosts";
import Auth from "./components/guest/Authenticate";
import Entrance from "./components/user/Entrance";
import Radium from "radium";

/* STYLING */

const styles = {
	app: {
		minWidth: "100vw",
		backgroundColor: "blue",
		margin: "0",
	},
	logoDiv: {
		backgroundImage:
			'url("https://images.unsplash.com/photo-1531498860502-7c67cf02f657?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")',
		backgroundSize: "cover",
		display: "flex",
		flexFlow: "column wrap",
		justifyContent: "center",
		alignItems: "center",
		minWidth: "100vw",
	},
	logoImg: {
		paddingTop: "5em",
		width: "80%",
	},
	logoBtn: {
		margin: "1em 5em 5em 5em",
		width: "48vw",
		backgroundColor: "rgba(40, 40, 250, 0.8)",
		border: "thick solid white",
		color: "white",
	},
	boxGridContainer: {
		padding: "0px",
		height: "250px",
		margin: "0",
		display: "flex",
		alignItems: "center",
	},
	boxGrid: {
		maxWidth: "100vw",
		margin: "0",
		padding: "1vw",
	},
	userBox: {
		height: "auto",
		minHeight: "40vh",
		display: "flex",
		flexFlow: "column wrap",
		justifyContent: "center",
		alignItems: "center",
		padding: "1vw",
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
			<div className="App" style={styles.app}>
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
					<div>
						{this.state.auth ? (
							<Auth
								/* all props */
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
						<div style={styles.logoDiv}>
							<img
								alt="wesch logo"
								style={styles.logoImg}
								src="https://user-images.githubusercontent.com/68344211/95797523-bc27a880-0cbd-11eb-9ced-9d845c6bc9a8.png"
							/>
							<br />
							<Button
								style={styles.logoBtn}
								onClick={() => this.toggleAuth()}
								variant="outlined"
								color="inherit"
							>
								click to login
							</Button>
						</div>
						<Grid container spacing={4} justify="center" style={styles.boxGrid}>
							<Grid item xs={4}>
								<Paper style={styles.userBox} elevation={22}>
									<p>CURRENT</p>
									<hr style={{ width: "100%", maxWidth: "275px" }} />
									<p style={{ maxWidth: "300px" }}>
										reach out for help on tough concepts & engage with other
										coding students facing similar struggles.
									</p>
								</Paper>
							</Grid>
							<Grid item xs={4}>
								<Paper style={styles.userBox} elevation={22}>
									<p>PROSPECT</p>
									<hr style={{ width: "100%", maxWidth: "275px" }} />
									<p style={{ maxWidth: "300px" }}>
										receive insight to the unique challenges in learning to
										code, and view challenges & completed projects by alumni.
									</p>
								</Paper>
							</Grid>
							<Grid item xs={4}>
								<Paper style={styles.userBox} elevation={22}>
									<p>ALUMNI</p>
									<hr style={{ width: "100%", maxWidth: "275px" }} />
									<p style={{ maxWidth: "300px" }}>
										assist others to reinforce & deepen personal knowledge,
										shares current ongoing & completed projects.
									</p>
								</Paper>
							</Grid>
						</Grid>
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
