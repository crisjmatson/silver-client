import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import EventIcon from "@material-ui/icons/Event";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SchoolIcon from "@material-ui/icons/School";
import "date-fns";
import Radium from "radium";
import React, { Component } from "react";
import { Profile, User } from "../../InterfaceExports";
import DeleteAcct from "./DeleteAcct";
import EditAcct from "./EditAcct";

/* STYLING */

const style = {
	heading: {
		fontFamily: "'Staatliches', cursive",
	},
};
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
class Account extends Component<Props, State> {
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
						<h1 style={style.heading}>
							Account Display : {this.props.currentuser}
						</h1>
						<Card>
							<CardActionArea>
								<CardContent>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										<List>
											<ListItem>
												<ListItemAvatar>
													<Avatar>
														<MailOutlineIcon />
													</Avatar>
												</ListItemAvatar>
												<ListItemText
													primary={this.props.account.email}
													secondary="email address"
												/>
											</ListItem>
											<ListItem>
												<ListItemAvatar>
													<Avatar>
														<EventIcon />
													</Avatar>
												</ListItemAvatar>
												<ListItemText
													primary={this.reformatDate(
														this.props.account.createdAt
													)}
													secondary="date joined"
												/>
											</ListItem>
											<ListItem>
												<ListItemAvatar>
													<Avatar>
														<EventIcon />
													</Avatar>
												</ListItemAvatar>
												<ListItemText
													primary={this.reformatDate(
														this.props.account.createdAt
													)}
													secondary="date joined"
												/>
											</ListItem>
											<ListItem>
												<ListItemAvatar>
													<Avatar>
														<SchoolIcon />
													</Avatar>
												</ListItemAvatar>
												<ListItemText
													primary={
														this.props.profile.grad_status !== null
															? this.props.profile.grad_status
															: "not available"
													}
													secondary="status"
												/>
											</ListItem>
											<ListItem>
												<ListItemAvatar>
													<Avatar>
														<SchoolIcon />
													</Avatar>
												</ListItemAvatar>
												<ListItemText
													primary={
														this.props.profile.date_graduated !== null
															? this.props.profile.date_graduated
															: "not available"
													}
													secondary="status"
												/>
											</ListItem>
										</List>
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
export default Radium(Account);
