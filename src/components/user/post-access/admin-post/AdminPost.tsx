import {
	Button,
	DialogContent,
	DialogContentText,
	DialogTitle,
	ListItem,
	ListItemText,
	Typography,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { Component } from "react";
import Radium from "radium";
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

class AdminPost extends Component<Props, State> {
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
	reformatDate(rawDate: string) {
		let month = rawDate.slice(5, 7);
		let day = rawDate.slice(8, 10);
		let year = rawDate.slice(0, 4);
		let formatDate = `${month}/${day}/${year}`;
		return formatDate;
	}

	render() {
		return (
			<div>
				<h1 /* style={style.adminheader} */>ADMIN POST EDITING</h1>
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
									<Button type="submit">Submit</Button>
									<Button
										onClick={() => this.setState({ adminedit_post: false })}
									>
										cancel
									</Button>
								</Form>
							</Formik>
						</span>
					) : (
						<span>
							<DialogTitle id="alert-dialog-slide-title">
								{this.props.post.title} -
								<span /* style={style.username} */>
									{this.props.post.author}
								</span>{" "}
								{/* <Button onClick={() => this.setState({ adminedit_post: true })}>
									edit
								</Button> */}
								<Button
									onClick={() => this.setState({ admindelete_post: true })}
								>
									delete
								</Button>
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
								<ListItem>
									{this.state.admindelete_comment &&
									this.state.currentComment === commentID ? (
										<span>
											<p /* style={style.admindelete} */>Delete?</p>
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
												<Button type="submit">Submit</Button>
												<Button
													onClick={() =>
														this.setState({ adminedit_comment: false })
													}
												>
													cancel
												</Button>
											</Form>
										</Formik>
									) : (
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
									)}
									<p>
										{/* <Button onClick={() => this.selectEditComment(commentID)}>
											edit
										</Button> */}
										{this.state.admindelete_comment ? (
											<span></span>
										) : (
											<Button
												onClick={() => this.selectDeleteComment(commentID)}
											>
												delete
											</Button>
										)}
									</p>
								</ListItem>
							);
						})}
					</DialogContent>
				</span>
			</div>
		);
	}
}
export default Radium(AdminPost);
