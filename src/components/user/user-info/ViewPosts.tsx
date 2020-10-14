import {
	Card,
	CardContent,
	Typography,
	Chip,
	CardActions,
	Button,
	Divider,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@material-ui/core";
import React, { Component } from "react";
import APIURL from "../../../helpers/environment";
import { Post, Comment } from "../../InterfaceExports";
import PersonIcon from "@material-ui/icons/Person";

export default class ViewPosts extends Component<any, any> {
	componentDidMount() {
		this.userPostsFetch();
	}
	constructor(props: any) {
		super(props);
		this.state = {
			currentPost: 999999999,
			commentToggle: false,
			posts: [
				{
					author: "",
					body: "string",
					createdAt: "string",
					edited: false,
					id: 0,
					private: false,
					tags: ["code"],
					title: "string",
					updatedAt: "string",
					userId: 0,
				},
			],
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
	reformatDate(rawDate: string) {
		let month = rawDate.slice(5, 7);
		let day = rawDate.slice(8, 10);
		let year = rawDate.slice(0, 4);
		let formatDate = `${month}/${day}/${year}`;
		return formatDate;
	}

	userPostsFetch = () => {
		fetch(`${APIURL}/post/yours`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				this.setState({ posts: json.posts });
			});
	};
	fetchComments = async (postId: number) => {
		this.setState({ currentPost: postId });
		fetch(`${APIURL}/post/public_full/${postId}`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((json) => this.setState({ comments: json.comments }))
			.then(() => this.setState({ commentToggle: true }));
		/* let json = await response.json();
		console.log(json.comments);
		this.setState({ comments: json.comments });
		this.setState({ commentToggle: true }); */
	};

	closeComments = () => {
		this.setState({ commentToggle: false });
	};

	render() {
		return (
			<div>
				{this.state.posts.length > 0 ? (
					this.state.posts.map((post: Post) => {
						return (
							<Card key={post.id} className="latest-card">
								<CardContent>
									<Typography variant="h5" component="h2">
										{post.title}
										{"   "}
										{post.edited ? "(edited)" : ""}
									</Typography>
									<Typography color="textSecondary">
										{post.author}, {this.reformatDate(post.createdAt)}
									</Typography>
									<Typography variant="body2" component="p">
										{post.body}
									</Typography>
									<Typography variant="body2" component="p">
										{post.tags.map((tag) => {
											return (
												<span key={tag}>
													<Chip label={tag} />
												</span>
											);
										})}
									</Typography>
									{this.state.comments !== undefined ? (
										this.state.commentToggle &&
										this.state.currentPost === post.id &&
										this.state.comments.length > 0 ? (
											this.state.comments.map((comment: Comment) => {
												return (
													<span>
														<div key={comment.id}>
															<ListItemAvatar>
																<PersonIcon />
															</ListItemAvatar>
															<ListItemText
																className="comment-text"
																primary={comment.body}
																secondary={
																	<React.Fragment>
																		<Typography component="span">
																			{comment.author}
																		</Typography>
																		{" -- "}
																		{this.reformatDate(comment.updatedAt)}
																	</React.Fragment>
																}
															/>
														</div>
														<Divider variant="inset" component="li" />
													</span>
												);
											})
										) : this.state.commentToggle &&
										  this.state.currentPost === post.id &&
										  this.state.comments === (undefined || null) ? (
											<span>no comments</span>
										) : (
											<span></span>
										)
									) : (
										<span>no comments</span>
									)}
								</CardContent>
								<CardActions>
									{this.state.commentToggle &&
									this.state.currentPost === post.id ? (
										<Button onClick={() => this.closeComments()}>
											close comments
										</Button>
									) : (
										<Button onClick={() => this.fetchComments(post.id)}>
											view comments
										</Button>
									)}
								</CardActions>
							</Card>
						);
					})
				) : (
					<span></span>
				)}
			</div>
		);
	}
}
