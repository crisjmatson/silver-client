import { Button, FormGroup, TextField } from "@material-ui/core";
import { Formik, Form } from "formik";
import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import "./Authenticate.css";

interface Props {
	closeAdmin: () => void;
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	setAdmin: (status: boolean) => void;
	currentuser: string | undefined;
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
	signToggle: boolean;
	denial: boolean;
}

export default class AdminAuth extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			signToggle: false,
			denial: false,
		};
	}

	toggleSign = () => {
		let opposite = this.state.signToggle;
		this.setState({ signToggle: !opposite });
	};

	submitHandler = (values: {
		authorization: string;
		email: string;
		username: string;
		password: string;
	}) => {
		this.state.signToggle ? this.signupFetch(values) : this.signInFetch(values);
	};

	signupFetch = async (values: {
		authorization: string;
		email: string;
		username: string;
		password: string;
	}) => {
		if (values.authorization === "wentworthprisonsystem") {
			console.log("sign up: ", values);
			let user = {
				user: {
					name: values.username,
					mail: values.email,
					pass: values.password,
					role: "admin",
				},
			};
			console.log(user);
			let response = await fetch(`${APIURL}/user/start`, {
				method: "POST",
				headers: new Headers({
					"Content-Type": "application/json",
				}),
				body: JSON.stringify(user),
			});
			if (response.ok === true) {
				let json = await response.json();
				this.props.setAdmin(true);
				this.props.setCoin(json.sessionToken);
				this.props.setCoinName(json.user.username);
				this.props.setSnackBar(
					true,
					"sign up complete! welcome admin!",
					"success"
				);
			} else {
				this.props.setSnackBar(
					true,
					"sign up failed. are you sure you're an admin...?",
					"error"
				);
			}
		} else {
			this.setState({ denial: true });
		}
	};
	signInFetch = async (values: {
		authorization: string;
		email: string;
		username: string;
		password: string;
	}) => {
		console.log("sign in: ", values);
		let user = {
			user: {
				name: values.username,
				pass: values.password,
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
			this.props.setAdmin(true);
			this.props.setCoin(json.sessionToken);
			this.props.setCoinName(json.user.username);
			this.props.setSnackBar(true, "sign in success!", "success");
		} else {
			this.setState({ denial: true });
			this.props.setSnackBar(true, "sign in failed", "error");
		}
	};

	render() {
		return (
			<div className="authenticate-formik">
				<FormGroup>
					<Formik
						initialValues={{
							authorization: "",
							email: "",
							username: "",
							password: "",
						}}
						onSubmit={(values) => {
							this.submitHandler(values);
						}}
					>
						{({ values, handleChange, handleBlur }) => (
							<Form className="authenticate-formik-form">
								{this.state.denial ? <p>access denied</p> : <p></p>}
								{this.state.signToggle ? (
									<div>
										<TextField
											label="authorization"
											className="authenticate-formik-input"
											name="authorization"
											value={values.authorization}
											onChange={handleChange}
											onBlur={handleBlur}
											fullWidth={true}
										/>
										<br />
										<TextField
											label="email"
											className="authenticate-formik-input"
											name="email"
											value={values.email}
											onChange={handleChange}
											onBlur={handleBlur}
											fullWidth={true}
										/>
									</div>
								) : (
									<span></span>
								)}
								<div>
									<TextField
										label="username"
										className="authenticate-formik-input"
										name="username"
										value={values.username}
										onChange={handleChange}
										onBlur={handleBlur}
										fullWidth={true}
									/>
								</div>
								<div>
									<TextField
										label="password"
										className="authenticate-formik-input"
										name="password"
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
										fullWidth={true}
									/>
								</div>
								<Button
									type="submit"
									onClick={() => this.setState({ denial: false })}
								>
									{this.state.signToggle ? "--sign up--" : "--sign in--"}
								</Button>
								<br />
								<br />
								<br />
								<Button
									onClick={() => {
										this.setState({ denial: false });
										this.toggleSign();
									}}
								>
									{this.state.signToggle ? "back to sign in" : "sign up"}
								</Button>
								<Button onClick={() => this.props.closeAdmin()}>cancel</Button>
								{"		"}
							</Form>
						)}
					</Formik>
				</FormGroup>
			</div>
		);
	}
}
