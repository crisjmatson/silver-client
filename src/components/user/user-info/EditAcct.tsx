import DateFnsUtils from "@date-io/date-fns";
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	FormControl,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@material-ui/core";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import "date-fns";
import { Form, Formik } from "formik";
import React, { Component } from "react";
import APIURL from "../../../helpers/environment";
import { Profile, User } from "../../InterfaceExports";

interface Props {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	toggleEdit: () => void;
	toggleDelete: (value: boolean) => void;
	refresh: () => void;
	currentuser: string;
	coin: string | undefined;
	account: User;
	profile: Profile;
}
interface State {
	date: Date | null;
}

export default class EditAcct extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			date: null,
		};
	}
	reformatDate(rawDate: string) {
		let month = rawDate.slice(5, 7);
		let day = rawDate.slice(8, 10);
		let year = rawDate.slice(0, 4);
		let formatDate = `${month}/${day}/${year}`;
		return formatDate;
	}
	handleDateChange = (
		date: MaterialUiPickersDate,
		value?: string | null | undefined
	) => {
		this.setState({ date: date });
	};
	accountUpdate = (updates: { email: string; grad_status: string }) => {
		console.log("account update: ", updates);
		if (updates.email.length > 0) {
			console.log("email update called");
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
				.then(() => {
					this.props.refresh();
					this.props.toggleEdit();
				});
		}
		if (updates.grad_status.length > 0 && this.state.date !== null) {
			console.log("dual profile update called");
			fetch(`${APIURL}/profile/update`, {
				method: "PUT",
				headers: new Headers({
					"Content-Type": "application/json",
					Authorization: `${this.props.coin}`,
				}),
				body: JSON.stringify({
					profile: {
						grad_status: updates.grad_status,
						date_graduated: this.state.date,
					},
				}),
			})
				.then((response) => response.json())
				.then(() => {
					this.props.refresh();
					this.props.toggleEdit();
				});
		} else if (updates.grad_status.length > 0 && this.state.date === null) {
			fetch(`${APIURL}/profile/update`, {
				method: "PUT",
				headers: new Headers({
					"Content-Type": "application/json",
					Authorization: `${this.props.coin}`,
				}),
				body: JSON.stringify({
					profile: {
						grad_status: updates.grad_status,
					},
				}),
			})
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					this.props.refresh();
					this.props.toggleEdit();
				});
		} else if (updates.grad_status.length === 0 && this.state.date !== null) {
			fetch(`${APIURL}/profile/update`, {
				method: "PUT",
				headers: new Headers({
					"Content-Type": "application/json",
					Authorization: `${this.props.coin}`,
				}),
				body: JSON.stringify({
					profile: {
						date_graduated: this.state.date,
					},
				}),
			})
				.then((response) => response.json())
				.then(() => {
					this.props.toggleEdit();
					this.props.refresh();
				});
		}
	};

	render() {
		return (
			<div>
				<h1>EDIT</h1>
				<Card>
					<CardActionArea>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{this.props.currentuser}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								<FormGroup>
									<Formik
										initialValues={{
											email: "",
											avatar: "",
											date_graduated: null,
											grad_status: "",
										}}
										onSubmit={(values) => {
											this.accountUpdate(values);
										}}
									>
										{({ values, handleChange, handleBlur }) => (
											<Form>
												<FormControl>
													<TextField
														name="email"
														placeholder={this.props.account.email}
														value={values.email}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
												</FormControl>
												<br />
												<FormControl variant="outlined">
													<InputLabel id="status-label">Status</InputLabel>
													<Select
														name="grad_status"
														labelId="status-label"
														id="status"
														placeholder={this.props.profile.grad_status}
														value={values.grad_status}
														onChange={handleChange}
														label="Status"
													>
														<MenuItem value="">
															<em>
																{"---"}None{"---"}
															</em>
														</MenuItem>
														<MenuItem value={"prospect"}>
															Prospective Student
														</MenuItem>
														<MenuItem value={"current"}>
															Current Student
														</MenuItem>
														<MenuItem value={"alumni"}>Alumni</MenuItem>
													</Select>
												</FormControl>
												<br />
												{this.props.profile.grad_status === "alumni" ? (
													<MuiPickersUtilsProvider utils={DateFnsUtils}>
														<InputLabel id="date_graduated-label">
															Date Graduated
														</InputLabel>
														<KeyboardDatePicker
															name="date_graduated"
															id="date_graduated"
															margin="normal"
															label="Date-Graduated"
															format="MM/dd/yyyy"
															value={this.state.date || null}
															onChange={this.handleDateChange}
															KeyboardButtonProps={{
																"aria-label": "change date",
															}}
														/>
													</MuiPickersUtilsProvider>
												) : (
													<span></span>
												)}

												<br />
												<Button type="submit">submit</Button>
												<Button
													size="small"
													color="primary"
													onClick={() => this.props.toggleEdit()}
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
							onClick={() => this.props.toggleEdit()}
						>
							Edit
						</Button>
						<Button
							onClick={() => this.props.toggleDelete(false)}
							size="small"
							color="primary"
						>
							Delete
						</Button>
					</CardActions>
				</Card>
			</div>
		);
	}
}
