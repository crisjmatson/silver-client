import { Button, Dialog, FormGroup, TextField, Slide } from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import { Form, Formik } from "formik";
import * as React from "react";
import APIURL from "../../helpers/environment";
import AdminAuth from "./AdminAuth";
import "./Authenticate.css";
import { TransitionProps } from "@material-ui/core/transitions/transition";

interface Props {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	setAdmin: (status: boolean) => void;
	toggleAuth: () => void;
	auth: boolean;
	currentuser: string | undefined;
	coin: string | undefined;
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
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default class Authenticate extends React.Component<Props, State> {
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
		console.log(APIURL, user);
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
			console.log("sign in: ", json);
		} else {
			console.log("log in failed");
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
		console.log(APIURL, user);
		let response = await fetch(`${APIURL}/user/start`, {
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
			console.log("sign up: ", this.props.coin, json);
		} else {
			console.log("sign up failed");
		}
	};

	closeAdmin = () => {
		this.setState({ admin: false });
	};

	render() {
		return (
			<div className="authenticate-div">
				<Dialog
					className="authenticate-dialog"
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
						/>
					) : (
						<div className="authenticate-formik">
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
										<Form>
											{this.state.toggle ? (
												<div>
													<TextField
														className="authenticate-formik-input"
														fullWidth={true}
														name="email"
														placeholder="email"
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
													className="authenticate-formik-input"
													name="username"
													placeholder="username"
													value={values.username}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
											</div>
											<div>
												<TextField
													className="authenticate-formik-input"
													name="password"
													placeholder="password"
													value={values.password}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
											</div>
											<Button type="submit">
												{this.state.toggle ? "--sign up--" : "--sign in--"}
											</Button>
											<br />
											<br />
											<br />
											<span>
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
