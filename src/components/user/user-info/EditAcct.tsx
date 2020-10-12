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
    Typography
} from "@material-ui/core";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
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
	currentuser: string;
	coin: string | undefined;
	userAccount: User;
	userProfile: Profile;
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
	handleDateChange = (date: Date | null) => {
		this.setState({ date: date });
	};

	accountUpdate = (updates: { email: string }) => {
		console.log("account update", updates);
		let date = this.state.date;
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
											console.log(values);
											//this.dualUpdate(values);
										}}
									>
										{({ values, handleChange, handleBlur }) => (
											<Form>
												<FormControl>
													<TextField
														name="email"
														placeholder={this.props.userAccount.email}
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
														placeholder={this.props.userProfile.grad_status}
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
												{this.props.userProfile.grad_status === "alumni" ? (
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
															value={this.state.date}
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
