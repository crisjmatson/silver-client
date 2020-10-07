import { Button, FormGroup, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as React from "react";
import APIURL from "../helpers/environment";

interface authProps {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	currentuser: string | undefined;
	coin: string | undefined;
}
interface authState {
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
			this.props.setCoin(json.sessionToken);
			this.props.setCoinName(json.user.username);
			console.log("sign up: ", this.props.coin, json);
		} else {
			console.log("sign up failed");
		}
	};

	render() {
		return (
			<div>
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
									{this.state.toggle ? "back to signup" : "first time?"}
								</Button>
								{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
							</Form>
						)}
					</Formik>
				</FormGroup>
			</div>
		);
	}
}
