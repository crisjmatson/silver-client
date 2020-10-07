import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogProps,
	DialogTitle,
	Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Formik, Form, Field } from "formik";
import React, { Component } from "react";
import APIURL from "../../../helpers/environment";
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
	post: SelectedPost;
	comments: Comment[];
}
interface Props {
	coin: string | undefined;
	expandPostId: number | undefined;
	currentuser: string | undefined;
	setExpand: (expandValue: boolean, value?: number | undefined) => void;
	setCoin: (newCoin: string | undefined) => void;
	setCoinName?: (name: string) => void;
	refresh: () => Promise<void>;
}

interface SelectedPost {
	author: string;
	body: string;
	createdAt: string;
	edited: boolean;
	id: number;
	private: boolean;
	tags: string[];
	title: string;
	updatedAt: string;
	userId: number;
}

interface Comment {
	author: string;
	body: string;
	createdAt: string;
	edited: boolean;
	id: number;
	postId: number;
	private: boolean;
	updatedAt: string;
	userId: number;
}

export default class ExpandPost extends Component<Props, State> {
	componentDidMount() {
		this.postFetch();
	}
	constructor(props: Props) {
		super(props);
		this.state = {
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

	setResults = (post: SelectedPost, comments: Comment[]) => {
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
			.then(() => this.setState({ commentEdit: false }));
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
				<Dialog
					TransitionComponent={Transition}
					keepMounted
					open={true}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					{this.state.edit ? (
						<span>
							<EditPost post={this.state.post} coin={this.props.coin} />
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
								{this.state.post.title} - from user {this.state.post.author}
							</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-slide-description">
									{this.state.post.body}
								</DialogContentText>
								<Formik
									initialValues={{ entry: "" }}
									onSubmit={(values, actions) => {
										console.log({ values, actions });
										this.commentPost(values);
									}}
								>
									<Form>
										<label htmlFor="entry">comment</label>
										<br />
										<Field id="entry" name="entry" placeholder="comment" />
										<button type="submit">Submit</button>
									</Form>
								</Formik>
								<hr />
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
														<button type="submit">Submit</button>
														<button
															onClick={() =>
																this.setState({ commentEdit: false })
															}
														>
															cancel
														</button>
														<button
															onClick={() =>
																this.deleteCommentFetch(comment.id)
															}
														>
															delete
														</button>
													</Form>
												</Formik>
											) : (
												<p key={comment.id}>{comment.body}</p>
											)}
											<p>
												{comment.author}, {comment.createdAt}
											</p>
											{comment.author === this.props.currentuser ? (
												<Button
													onClick={() =>
														this.setState({
															commentEdit: true,
															selectedComment: comment.id,
														})
													}
												>
													Edit
												</Button>
											) : (
												<span></span>
											)}
										</div>
									);
								})}
							</DialogContent>
							<DialogActions>
								{this.props.currentuser === this.state.post.author ? (
									<span>
										<Button
											onClick={() => this.setState({ edit: true })}
											color="primary"
										>
											edit
										</Button>
										<Button
											onClick={() => this.setState({ delete: true })}
											color="primary"
										>
											delete post
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
			</div>
		);
	}
}
