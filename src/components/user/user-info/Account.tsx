import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from "@material-ui/core";
import "date-fns";
import React, { Component } from "react";
import { Profile, User } from "../../InterfaceExports";
import DeleteAcct from "./DeleteAcct";
import EditAcct from "./EditAcct";

interface Props {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	currentuser: string;
	coin: string | undefined;
	userAccount: User;
	userProfile: Profile;
}

interface State {
	profileReady: boolean;
	edit: boolean;
	delete: boolean;
	date: Date | null;
}

export default class Account extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			profileReady: true,
			edit: false,
			delete: false,
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
	toggleEdit = () => {
		let opposite = this.state.edit;
		this.setState({ edit: !opposite });
	};
	toggleDelete = (value: boolean) => {
		this.setState({ delete: !value });
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
					<EditAcct
						currentuser={this.props.currentuser}
						setCoinName={this.props.setCoinName}
						coin={this.props.coin}
						setCoin={this.props.setCoin}
						userAccount={this.props.userAccount}
						userProfile={this.props.userProfile}
						toggleEdit={this.toggleEdit}
						toggleDelete={this.toggleDelete}
					/>
				) : (
					/* ----------------- !!  DEFAULT ACCOUNT VIEW  !! ----------------- */
					<div>
						<h1>Account Display</h1>

						<Card>
							<CardActionArea>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										Name: {this.props.currentuser}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										<ul>
											<li>
												email -
												{this.props.userAccount === undefined
													? "n/a"
													: this.props.userAccount.email}
												<Button
													onClick={() =>
														console.log(this.props.userAccount.email)
													}
												>
													show
												</Button>
											</li>
											<li>
												joined -{" "}
												{this.props.userAccount === undefined
													? "n/a"
													: this.reformatDate(this.props.userAccount.createdAt)}
												<Button
													onClick={() =>
														console.log(this.props.userAccount.createdAt)
													}
												>
													show
												</Button>
											</li>
											<li>
												status -{" "}
												{this.props.userProfile !== undefined
													? this.props.userProfile.grad_status
													: "not available"}
												<Button
													onClick={() =>
														console.log(this.props.userProfile.grad_status)
													}
												>
													show
												</Button>
											</li>
											<li>
												graduated -{" "}
												{this.props.userProfile !== undefined
													? this.props.userProfile.date_graduated
													: "not available"}
												<Button
													onClick={() =>
														console.log(this.props.userProfile.date_graduated)
													}
												>
													show
												</Button>
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
