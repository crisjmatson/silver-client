import {
	Button,
	ButtonGroup,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	List,
	ListItem,
	ListItemText,
	Slide,
	TextField,
	Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Grid from "@material-ui/core/Grid/Grid";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import { Field, Form, Formik } from "formik";
import React, { Component } from "react";
import APIURL from "../../../helpers/environment";
import { Comment, Post } from "../../InterfaceExports";
import AdminPost from "./admin-post/AdminPost";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface State {
	selectedComment: number;
	delete: boolean;
	edit: boolean;
	commentEdit: boolean;
	post: Post;
	comments: Comment[];
	adminToggle: boolean;
}
interface Props {
	coin: string | undefined;
	expandPostId: number | undefined;
	currentuser: string | undefined;
	adminStatus: boolean;
	setExpand: (expandValue: boolean, value?: number | undefined) => void;
	setCoin: (newCoin: string | undefined) => void;
	setCoinName?: (name: string) => void;
	refresh: () => Promise<void>;
}

export default class ExpandPost extends Component<Props, State> {
	componentDidMount() {
		this.postFetch();
	}
	constructor(props: Props) {
		super(props);
		this.state = {
			adminToggle: false,
			selectedComment: 0,
			delete: false,
			edit: false,
			commentEdit: false,
			post: {
				author: "",
				body: "",
				createdAt: "",
				edited: false,
				id: 0,
				private: false,
				tags: [],
				title: "",
				updatedAt: "",
				userId: 0,
			},
			comments: [
				{
					author: "",
					body: "",
					createdAt: "",
					edited: false,
					id: 0,
					postId: 0,
					private: false,
					updatedAt: "",
					userId: 0,
				},
			],
		};
	}

	HomeIcon(props: SvgIconProps) {
		return (
			<SvgIcon {...props}>
				<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
			</SvgIcon>
		);
	}

	reformatDate(rawDate: string) {
		let month = rawDate.slice(5, 7);
		let day = rawDate.slice(8, 10);
		let year = rawDate.slice(0, 4);
		let formatDate = `${month}/${day}/${year}`;
		return formatDate;
	}

	setEdit = (status: boolean) => {
		this.setState({ edit: status });
	};

	postFetch = () => {
		fetch(`${APIURL}/post/full/${this.props.expandPostId}`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		})
			.then((response) => response.json())
			.then((json) => this.setResults(json.post, json.comments));
	};

	setResults = (post: Post, comments: Comment[]) => {
		this.setState({ post: post });
		this.setState({ comments: comments });
		console.log(this.state);
	};

	commentPost = (entry: { entry: string }) => {
		console.log(entry.entry);
		let submission = {
			comment: {
				postId: this.state.post.id,
				body: entry.entry,
				private: false,
			},
		};
		fetch(`${APIURL}/comment`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
			body: JSON.stringify(submission),
		}).then(() => this.postFetch());
	};
	commentEditFetch = (entry: { entry: string }, commentSelect: number) => {
		console.log(entry.entry);
		let submission = {
			comment: {
				body: entry.entry,
			},
		};
		fetch(`${APIURL}/comment/update/${commentSelect}`, {
			method: "PUT",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
			body: JSON.stringify(submission),
		})
			.then(() => this.postFetch())
			.then(() => this.setState({ commentEdit: false, selectedComment: 0 }));
	};

	deleteCommentFetch = (num: number) => {
		fetch(`${APIURL}/comment/delete/${num}`, {
			method: "DELETE",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		}).then((response) => console.log(response));
	};

	render() {
		return (
			<div>
				{this.state.post ? (
					<Dialog
						TransitionComponent={Transition}
						keepMounted
						open={true}
						aria-labelledby="alert-dialog-slide-title"
						aria-describedby="alert-dialog-slide-description"
					>
						{this.state.adminToggle ? (
							<span>
								<AdminPost
									post={this.state.post}
									comments={this.state.comments}
									coin={this.props.coin}
									postFetch={this.postFetch}
									refresh={this.props.refresh}
									setExpand={this.props.setExpand}
								/>
								<DialogActions>
									<Button onClick={() => this.setState({ adminToggle: false })}>
										close
									</Button>
								</DialogActions>
							</span>
						) : this.state.edit ? (
							<span>
								<EditPost
									post={this.state.post}
									coin={this.props.coin}
									refresh={this.props.refresh}
									setEdit={this.setEdit}
								/>
								<br />
								<Button
									onClick={() => this.setState({ edit: false })}
									color="primary"
								>
									close
								</Button>
							</span>
						) : this.state.delete ? (
							<span>
								<DeletePost
									post={this.state.post}
									coin={this.props.coin}
									setExpand={this.props.setExpand}
									refresh={this.props.refresh}
								/>
								<br />
								<Button
									onClick={() => this.setState({ delete: false })}
									color="primary"
								>
									close
								</Button>
							</span>
						) : (
							<span>
								<DialogTitle id="alert-dialog-slide-title">
									{this.state.post.title} - from user {this.state.post.author}{" "}
									{this.props.adminStatus ? (
										<Button
											onClick={() => this.setState({ adminToggle: true })}
										>
											admin
										</Button>
									) : (
										<span></span>
									)}
								</DialogTitle>
								<DialogContent>
									<DialogContentText id="alert-dialog-slide-description">
										{this.state.post.body}
									</DialogContentText>
									<Formik
										initialValues={{ entry: "" }}
										onSubmit={(values, actions) => {
											//console.log({ values, actions });
											this.commentPost(values);
										}}
									>
										<Form noValidate autoComplete="off">
											<TextField
												id="entry"
												name="entry"
												placeholder="comment"
												label="comment"
											/>

											<Button type="submit">Submit</Button>
										</Form>
									</Formik>
									<hr />

									<List>
										{this.state.comments.map((comment) => {
											return (
												<div>
													{this.state.commentEdit &&
													comment.author === this.props.currentuser &&
													this.state.selectedComment === comment.id ? (
														<Formik
															initialValues={{ entry: "" }}
															onSubmit={(values, actions) => {
																console.log({ values, actions });
																this.commentEditFetch(values, comment.id);
															}}
														>
															<Form>
																<label htmlFor="entry">edit comment</label>
																<br />
																<Field
																	id="entry"
																	name="entry"
																	placeholder={comment.body}
																/>
																<ButtonGroup
																	variant="contained"
																	color="primary"
																	aria-label="contained primary button group"
																>
																	<Button type="submit">Submit</Button>
																	<Button
																		onClick={() =>
																			this.setState({
																				commentEdit: false,
																				selectedComment: 9999999999,
																			})
																		}
																	>
																		cancel
																	</Button>
																	<Button
																		onClick={() =>
																			this.deleteCommentFetch(comment.id)
																		}
																	>
																		delete
																	</Button>
																</ButtonGroup>
															</Form>
														</Formik>
													) : (
														<ListItem key={comment.id} alignItems="flex-start">
															{comment.author === this.props.currentuser &&
															this.state.selectedComment !== comment.id ? (
																<span className="comment-icon">
																	<Button
																		onClick={() =>
																			this.setState({
																				commentEdit: true,
																				selectedComment: comment.id,
																			})
																		}
																	>
																		<EditOutlinedIcon />
																	</Button>
																</span>
															) : (
																<span className="comment-icon">
																	<PersonOutlineRoundedIcon />
																</span>
															)}
															<ListItemText
																className="comment-text"
																primary={comment.body}
																secondary={
																	<React.Fragment>
																		<Typography
																			component="span"
																			variant="body2"
																			color="textPrimary"
																		>
																			{comment.author}
																		</Typography>
																		{" -- "}
																		{this.reformatDate(comment.updatedAt)}
																	</React.Fragment>
																}
															/>
														</ListItem>
													)}
												</div>
											);
										})}{" "}
									</List>
								</DialogContent>
								<DialogActions>
									{this.props.currentuser === this.state.post.author ? (
										<span>
											<Button
												onClick={() => this.setState({ edit: true })}
												variant="contained"
												color="primary"
												startIcon={<EditIcon />}
											>
												edit
											</Button>
											{"      			"}
											<Button
												onClick={() => this.setState({ delete: true })}
												variant="contained"
												color="primary"
												startIcon={<DeleteIcon />}
											>
												delete
											</Button>
										</span>
									) : (
										<span></span>
									)}
									<Button
										onClick={() => this.props.setExpand(false)}
										color="primary"
									>
										close
									</Button>
								</DialogActions>
							</span>
						)}
					</Dialog>
				) : (
					<Dialog
						TransitionComponent={Transition}
						keepMounted
						open={true}
						aria-labelledby="loading slide"
						aria-describedby="spinning circle"
					>
						<CircularProgress />
					</Dialog>
				)}
			</div>
		);
	}
}
