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
	refresh: () => void;
	currentuser: string;
	coin: string | undefined;
	account: User;
	profile: Profile;
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
	componentDidUpdate() {
		//this.props.refresh();
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
						account={this.props.account}
						profile={this.props.profile}
						toggleEdit={this.toggleEdit}
						toggleDelete={this.toggleDelete}
						refresh={this.props.refresh}
					/>
				) : (
					/* ----------------- !!  DEFAULT ACCOUNT VIEW  !! ----------------- */
					<div>
						<h1>Account Display</h1>

						<Card>
							<CardActionArea>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										Name: {this.props.currentuser}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="div"
									>
										<div>
											<ul>
												<li>email -{this.props.account.email}</li>
												<li>
													joined -{" "}
													{this.reformatDate(this.props.account.createdAt)}
												</li>
												<li>
													status -
													{this.props.profile.grad_status === ""
														? "not available"
														: this.props.profile.grad_status}
												</li>
												<li>graduated - {this.props.profile.date_graduated}</li>
											</ul>
										</div>
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
