import { Button, Dialog, FormGroup, Slide, TextField } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Form, Formik } from "formik";
import Radium from "radium";
import React from "react";
import APIURL from "../../helpers/environment";
import AdminAuth from "./AdminAuth";
//import "./Authenticate.css";

const styles = {
	authDialog: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
	},
	formDialog: {
		height: "70vh",
		width: "100%",
		display: "flex",
		flexFlow: "column wrap",
		justifyContent: "center",
		alignContent: "center",
	},
	formCont: {
		/* width: "80vw", */
		padding: '5vw',
		height: "100%",
		display: "flex",
		flexFlow: "column wrap",
		justifyContent: "center",
		alignContent: "center",
	},
	formInput: {
		width: "60vw",
		maxWidth: '500px',
	},
	denial: {
		fontFamily: "'Staatliches', cursive",
	},
	authBtnTogg: {
		display: "flex",
		flexFlow: "col no-wrap",
		justifyContent: "center",
		alignContent: "center",
	},
};

interface Props {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	setAdmin: (status: boolean) => void;
	toggleAuth: () => void;
	auth: boolean;
	currentuser: string;
	coin: string | undefined;
	setSnackBar: (
		value: boolean,
		message: string,
		severity: "success" | "info" | "warning" | "error" | undefined
	) => void;
	snackbarToggle: boolean;
	snackbarMessage: string;
	snackbarSeverity: "success" | "info" | "warning" | "error" | undefined;
}
interface State {
	admin: boolean;
	toggle: boolean;
}
interface authValues {
	email?: string;
	username: string;
	password: string;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children?: React.ReactElement<BigInteger, string>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

class Authenticate extends React.Component<Props, State> {
	state: State = {
		admin: false,
		toggle: false,
	};

	toggleSign = () => {
		let opposite: boolean = this.state.toggle;
		this.setState({ toggle: !opposite });
	};

	signInFetch = async ({ username, email, password }: authValues) => {
		let user = {
			user: {
				name: username,
				pass: password,
			},
		};
		let response = await fetch(`${APIURL}/user/enter`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
			body: JSON.stringify(user),
		});
		if (response.ok === true) {
			let json = await response.json();
			this.props.setCoin(json.sessionToken);
			this.props.setCoinName(json.user.username);
			this.props.setSnackBar(true, "you're logged in!", "success");
		} else {
			this.props.setSnackBar(true, "login failed", "error");
		}
	};

	signUpFetch = async ({ username, email, password }: authValues) => {
		let user = {
			user: {
				name: username,
				mail: email,
				pass: password,
			},
		};
		let response = await fetch(`${APIURL}/user/start`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
			body: JSON.stringify(user),
		});
		if (response.ok === true) {
			let json = await response.json();
			this.props.setSnackBar(
				true,
				"sign up complete! you're logged in.",
				"success"
			);
			this.props.setCoin(json.sessionToken);
			this.props.setCoinName(json.user.username);
		} else {
			this.props.setSnackBar(true, "sign up failed", "error");
		}
	};

	closeAdmin = () => {
		this.setState({ admin: false });
	};

	render() {
		return (
			<div>
				<Dialog
					style={styles.authDialog}
					TransitionComponent={Transition}
					open={this.props.auth}
					onBackdropClick={() => this.props.toggleAuth()}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					{this.state.admin ? (
						<AdminAuth
							closeAdmin={this.closeAdmin}
							coin={this.props.coin}
							setCoin={this.props.setCoin}
							currentuser={this.props.currentuser}
							setCoinName={this.props.setCoinName}
							setAdmin={this.props.setAdmin}
							snackbarToggle={this.props.snackbarToggle}
							snackbarMessage={this.props.snackbarMessage}
							snackbarSeverity={this.props.snackbarSeverity}
							setSnackBar={this.props.setSnackBar}
						/>
					) : (
						<div style={styles.formDialog}>
							<FormGroup>
								<Formik
									initialValues={{ email: "", username: "", password: "" }}
									onSubmit={(values) => {
										this.state.toggle
											? this.signUpFetch(values)
											: this.signInFetch(values);
									}}
								>
									{({ values, handleChange, handleBlur }) => (
										<Form style={styles.formCont}>
											{this.state.toggle ? (
												<div>
													<TextField
														required
														label="email"
														style={styles.formInput}
														fullWidth={true}
														name="email"
														type="email"
														value={values.email}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
												</div>
											) : (
												<span></span>
											)}
											<div>
												<TextField
													required
													label="username"
													style={styles.formInput}
													name="username"
													value={values.username}
													onChange={handleChange}
													onBlur={handleBlur}
													fullWidth={true}
												/>
											</div>
											<div>
												<TextField
													required
													label="password"
													style={styles.formInput}
													name="password"
													type="password"
													value={values.password}
													onChange={handleChange}
													onBlur={handleBlur}
													fullWidth={true}
												/>
											</div>
											<Button type="submit">
												{this.state.toggle ? "--sign up--" : "--sign in--"}
											</Button>
											<br />
											<br />
											<br />
											<span style={styles.authBtnTogg}>
												<Button onClick={() => this.toggleSign()}>
													{this.state.toggle
														? "back to sign in"
														: "first time?"}
												</Button>
												{"		"}
												<Button onClick={() => this.setState({ admin: true })}>
													ADMIN
												</Button>
											</span>
											{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
										</Form>
									)}
								</Formik>
							</FormGroup>
						</div>
					)}
				</Dialog>
			</div>
		);
	}
}
export default Radium(Authenticate);
