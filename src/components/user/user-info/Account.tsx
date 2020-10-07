import classes from "*.module.css";
import {
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
	FormGroup,
	TextField,
	FormControl,
	FormHelperText,
	MenuItem,
	Select,
	InputLabel,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Formik, Form } from "formik";
import React, { Component } from "react";
import APIURL from "../../../helpers/environment";
import DeleteAcct from "./DeleteAcct";

interface Props {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	currentuser: string | undefined;
	coin: string | undefined;
}

interface State {
	profileReady: boolean;
	edit: boolean;
	delete: boolean;
	grad_status: unknown;
	user: User;
	profile: Profile;
}

interface User {
	createdAt: string;
	email: string;
	id: number;
	password: string;
	role: string;
	updatedAt: string;
	username: string;
}

interface Profile {
	avatar: string;
	challenges_completed: number;
	createdAt: string;
	date_graduated: string;
	grad_status: string;
	id: number;
	updatedAt: string;
	userId: number;
}

export default class Account extends Component<Props, State> {
	componentDidMount() {
		this.accountFetch();
	}
	constructor(props: Props) {
		super(props);
		this.state = {
			grad_status: "",
			profileReady: true,
			edit: false,
			delete: false,
			user: {
				createdAt: "string",
				email: "string",
				id: 999999999999,
				password: "string",
				role: "string",
				updatedAt: "string",
				username: "string",
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
	reformatDate(rawDate: string) {
		let month = rawDate.slice(5, 7);
		let day = rawDate.slice(8, 10);
		let year = rawDate.slice(0, 4);
		let formatDate = `${month}/${day}/${year}`;
		return formatDate;
	}
	toggleEdit = () => {
		let opposite = this.state.edit;
		this.setState({ edit: !opposite });
	};
	toggleDelete = (value: any) => {
		this.setState({ delete: !value });
	};

	accountFetch = () => {
		fetch(`${APIURL}/user/view/${this.props.currentuser}`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				//console.log(json);
				this.setState({ user: json.user });
				//this.setViewCard();
			});
		//.then(() => this.profileFetch());
	};

	setViewCard = () => {
		this.setState({ profileReady: true });
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
	}

	profileCreate() {
		console.log("profile create start");
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
	}

	dualUpdate = (updates: {
		age: number;
		email: string;
		avatar: string;
		date_graduated: string;
		grad_status: string;
	}) => {
		console.log("profile/account update", updates);
		fetch(`${APIURL}/user/update`, {
			method: "PUT",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
			body: JSON.stringify({
				user: {
					mail: updates.email,
				},
			}),
		})
			.then((response) => response.json())
			.then((json) => console.log(json));
	};

	render() {
		return (
			<div>
				{this.state.delete ? (
					<DeleteAcct
						coin={this.props.coin}
						setCoin={this.props.setCoin}
						delete={this.state.delete}
						toggleDelete={this.toggleDelete}
					/>
				) : (
					<span></span>
				)}
				{this.state.edit ? (
					<div>
						<h1>EDIT</h1>
						<Card>
							<CardActionArea>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										{this.state.user.username}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										<FormGroup>
											<Formik
												initialValues={{
													age: 0,
													email: "",
													avatar: "",
													date_graduated: "",
													grad_status: "",
												}}
												onSubmit={(values) => {
													console.log(values);
													this.dualUpdate(values);
												}}
											>
												{({ values, handleChange, handleBlur }) => (
													<Form>
														<div>
															<TextField
																name="email"
																placeholder={this.state.user.email}
																value={values.email}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
														</div>
														{/* <FormControl variant="outlined">
															<InputLabel id="demo-simple-select-outlined-label">
																Age
															</InputLabel>
															<Select
																labelId="demo-simple-select-outlined-label"
																id="demo-simple-select-outlined"
																value={values.age}
																onChange={(e) => {
																	console.log(e.target);
																	this.setState({
																		grad_status: e.target.value,
																	});
																}}
																label="Age"
															>
																<MenuItem value="">
																	<em>None</em>
																</MenuItem>
																<MenuItem value={10}>Ten</MenuItem>
																<MenuItem value={20}>Twenty</MenuItem>
																<MenuItem value={30}>Thirty</MenuItem>
															</Select>
														</FormControl> */}
														<br />
														<Button type="submit">submit</Button>
														<Button
															size="small"
															color="primary"
															onClick={() => this.setState({ edit: false })}
														>
															cancel
														</Button>
													</Form>
												)}
											</Formik>
										</FormGroup>
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Button
									size="small"
									color="primary"
									onClick={() => this.toggleEdit()}
								>
									Edit
								</Button>
								<Button
									onClick={() => this.toggleDelete(this.state.delete)}
									size="small"
									color="primary"
								>
									Delete
								</Button>
							</CardActions>
						</Card>
					</div>
				) : (
					/* ----------------- !!  DEFAULT ACCOUNT VIEW  !! ----------------- */
					<div>
						<h1>Account Display</h1>

						<Card>
							<CardActionArea>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										Name: {this.state.user.username}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										<ul>
											<li>
												email -{" "}
												{this.state.user === undefined
													? "n/a"
													: this.state.user.email}
											</li>
											<li>
												joined -{" "}
												{this.state.user === undefined
													? "n/a"
													: this.reformatDate(this.state.user.createdAt)}
											</li>
											<li>
												status -{" "}
												{this.state.profile.grad_status !== ""
													? this.state.profile.grad_status
													: "not available"}
											</li>
											<li>
												graduated -{" "}
												{this.state.profile.date_graduated !== ""
													? this.state.profile.date_graduated
													: "not available"}
											</li>
										</ul>
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Button
									size="small"
									color="primary"
									onClick={() => this.toggleEdit()}
								>
									Edit
								</Button>
								<Button
									size="small"
									color="primary"
									onClick={() => this.toggleDelete(this.state.delete)}
								>
									Delete
								</Button>
							</CardActions>
						</Card>
					</div>
				)}
			</div>
		);
	}
}
