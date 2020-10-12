import { Button, FormGroup, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as React from "react";
import APIURL from "../../helpers/environment";
import AdminAuth from "./AdminAuth";

interface authProps {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	setAdmin: (status: boolean) => void;
	currentuser: string | undefined;
	coin: string | undefined;
}
interface authState {
	admin: boolean;
	toggle: boolean;
}
interface authValues {
	email?: string;
	username: string;
	password: string;
}

export default class Authenticate extends React.Component<
	authProps,
	authState
> {
	state: authState = {
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
			<div>
				<h1>{"App Title"}</h1>
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
									<Button type="submit">
										{this.state.toggle ? "--sign up--" : "--sign in--"}
									</Button>
									<br />
									<br />
									<br />
									<br />
									<Button onClick={() => this.toggleSign()}>
										{this.state.toggle ? "back to sign in" : "first time?"}
									</Button>
									{"		"}
									<Button onClick={() => this.setState({ admin: true })}>
										ADMIN
									</Button>
									{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
								</Form>
							)}
						</Formik>
					</FormGroup>
				)}
			</div>
		);
	}
}
