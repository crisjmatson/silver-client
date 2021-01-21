import {
	Button,
	DialogContent,
	DialogContentText,
	DialogTitle
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { Component } from "react";
import APIURL from "../../../../helpers/environment";
import { Comment, Post } from "../../../InterfaceExports";

interface Props {
	post: Post;
	comments: Comment[];
	coin: string | undefined;
	postFetch: () => void;
	refresh: () => Promise<void>;
	setExpand: (expandValue: boolean, value?: number | undefined) => void;
}
interface State {
	adminedit_post: boolean;
	admindelete_post: boolean;
	adminedit_comment: boolean;
	admindelete_comment: boolean;
	currentComment: number;
}

export default class AdminPost extends Component<Props, State> {
	state: State = {
		adminedit_post: false,
		admindelete_post: false,
		adminedit_comment: false,
		admindelete_comment: false,
		currentComment: 999999999999,
	};

	selectEditComment = (num: number) => {
		this.setState({ currentComment: num });
		this.setState({ adminedit_comment: true });
	};
	selectDeleteComment = (num: number) => {
		this.setState({ currentComment: num });
		this.setState({ admindelete_comment: true });
	};

	editCommentAdmin = (value: string, commentId: number) => {
		let commentEditSubmission = {
			comment: { body: value },
		};
		console.log("edit comment admin called: ", commentEditSubmission);
		fetch(`${APIURL}/comment/adminupdate/${commentId}`, {
			method: "PUT",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
				body: JSON.stringify(commentEditSubmission),
			}),
		})
			//console.log(response);
			.then((response) => console.log(response));
		//.then((response) => response.json())
		//.then((json) => console.log(json));
	};

	deleteCommentAdmin = () => {
		console.log("delete comment admin");
		fetch(`${APIURL}/comment/admin_delete/${this.state.currentComment}`, {
			method: "DELETE",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		})
			.then((response) => response.json())
			.then((json) => console.log(json))
			.then(() => this.props.postFetch());
	};

	editPostAdmin = (post: { title: string; body: string }) => {
		console.log(post);
	};

	deletePostAdmin = () => {
		console.log("delete post admin");
		fetch(`${APIURL}/post/admin_delete/${this.props.post.id}`, {
			method: "DELETE",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		})
			.then((response) => response.json())
			.then((json) => console.log(json))
			.then(() => this.props.setExpand(false));
	};

	render() {
		return (
			<div>
				<h1>ADMIN POST EDITING</h1>
				<span>
					{this.state.admindelete_post ? (
						<span>
							Delete?
							<Button onClick={() => this.deletePostAdmin()}>confirm</Button>
							<Button
								onClick={() => this.setState({ admindelete_post: false })}
							>
								cancel
							</Button>
						</span>
					) : this.state.adminedit_post ? (
						<span>
							<Formik
								initialValues={{
									title: `${this.props.post.title}`,
									body: `${this.props.post.body}`,
								}}
								onSubmit={(values, actions) => {
									this.editPostAdmin(values);
								}}
							>
								<Form>
									<label htmlFor="title">edit comment</label>
									<br />
									<Field
										id="title"
										name="title"
										placeholder={this.props.post.title}
									/>
									<Field
										id="body"
										name="body"
										placeholder={this.props.post.body}
									/>
									<button type="submit">Submit</button>
									<button
										onClick={() => this.setState({ adminedit_post: false })}
									>
										cancel
									</button>
								</Form>
							</Formik>
						</span>
					) : (
						<span>
							<DialogTitle id="alert-dialog-slide-title">
								{this.props.post.title} - from user {this.props.post.author}{" "}
								<button onClick={() => this.setState({ adminedit_post: true })}>
									edit
								</button>
								<button
									onClick={() => this.setState({ admindelete_post: true })}
								>
									X
								</button>
							</DialogTitle>

							<DialogContent>
								<DialogContentText id="alert-dialog-slide-description">
									{this.props.post.body}
								</DialogContentText>
							</DialogContent>
						</span>
					)}
					<hr />{" "}
					{/* ---------------------------------------------------------- COMMENT EDIT START */}
					<DialogContent>
						{this.props.comments.map((comment) => {
							let commentID = comment.id;
							return (
								<div>
									{this.state.admindelete_comment &&
									this.state.currentComment === commentID ? (
										<span>
											Delete?
											<Button onClick={() => this.deleteCommentAdmin()}>
												confirm
											</Button>
											<Button
												onClick={() =>
													this.setState({ admindelete_comment: false })
												}
											>
												cancel
											</Button>
										</span>
									) : this.state.adminedit_comment &&
									  this.state.currentComment === commentID ? (
										<Formik
											initialValues={{ entry: `${comment.body}` }}
											onSubmit={(values, actions) => {
												this.editCommentAdmin(values.entry, commentID);
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
														this.setState({ adminedit_comment: false })
													}
												>
													cancel
												</button>
											</Form>
										</Formik>
									) : (
										<p key={comment.id}>{comment.body}</p>
									)}
									<p>
										{comment.author}, {comment.createdAt}
										<button onClick={() => this.selectEditComment(commentID)}>
											edit
										</button>
										<button onClick={() => this.selectDeleteComment(commentID)}>
											X
										</button>
									</p>
								</div>
							);
						})}
					</DialogContent>
				</span>
			</div>
		);
	}
}
