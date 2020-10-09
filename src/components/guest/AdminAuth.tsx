import { Button, FormGroup, TextField } from "@material-ui/core";
import { Formik, Form, FormikValues } from "formik";
import React, { Component } from "react";
import APIURL from "../../helpers/environment";

interface Props {
	closeAdmin: () => void;
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	setAdmin: (status: boolean) => void;
	currentuser: string | undefined;
	coin: string | undefined;
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
				console.log("sign up: ", this.props.coin, json);
			} else {
				console.log("sign up failed");
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
			console.log("sign in: ", json);
		} else {
			this.setState({ denial: true });
		}
	};

	render() {
		return (
			<div>
				<h1>ADMIN AUTH</h1>
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
							<Form>
								{this.state.denial ? <p>access denied</p> : <p></p>}
								{this.state.signToggle ? (
									<div>
										<TextField
											name="authorization"
											placeholder="authorization"
											value={values.authorization}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										<br />
										<TextField
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
										name="username"
										placeholder="username"
										value={values.username}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
								<div>
									<TextField
										name="password"
										placeholder="password"
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
								<Button
									type="submit"
									onClick={() => this.setState({ denial: false })}
								>
									{this.state.signToggle ? "--sign up--" : "--sign in--"}
								</Button>
								<br />
								<Button onClick={() => this.props.closeAdmin()}>cancel</Button>
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
								{"		"}
							</Form>
						)}
					</Formik>
				</FormGroup>
			</div>
		);
	}
}
