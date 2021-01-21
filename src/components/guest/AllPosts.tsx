import {
	AccordionSummary,
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Divider,
} from "@material-ui/core";
import * as React from "react";
import APIURL from "../../helpers/environment";
import { Comment, Post } from "../InterfaceExports";
import "./AllPosts.css";
import PersonIcon from "@material-ui/icons/Person";
import Chip from "@material-ui/core/Chip/Chip";
import "./AllPosts.css";

interface State {
	panel: string;
	expanded: string;
	list: Post[];
	comments: Comment[];
	commentToggle: boolean;
	currentPost: number;
}

export default class AllPosts extends React.Component {
	reformatDate(rawDate: string) {
		let month = rawDate.slice(5, 7);
		let day = rawDate.slice(8, 10);
		let year = rawDate.slice(0, 4);
		let formatDate = `${month}/${day}/${year}`;
		return formatDate;
	}

	state: State = {
		panel: "false",
		expanded: "",
		currentPost: 99999999,
		commentToggle: false,
		list: [
			{
				author: "",
				body: "",
				createdAt: "",
				edited: false,
				id: 0,
				private: false,
				tags: ["code"],
				title: "",
				updatedAt: "",
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

	componentDidMount() {
		fetch(`${APIURL}/post/public`)
			.then((res) => res.json())
			.then((json) => json.posts)
			.then((arr) => this.sortRecent(arr));
	}
	sortRecent(arr: Post[]) {
		arr.sort((a, b) => a.id - b.id);
		arr.reverse();
		this.setState({
			list: arr.filter(function (post) {
				return post.createdAt !== "string";
			}),
		});
	}

	fetchComments = async (postId: number) => {
		this.setState({ currentPost: postId });
		let response = await fetch(`${APIURL}/post/public_full/${postId}`, {
			method: "GET",
		});
		let json = await response.json();
		this.setState({ comments: json.comments });
		this.setState({ commentToggle: true });
	};

	handleChange = (panel: string) => (
		event: React.ChangeEvent<{}>,
		newExpanded: boolean
	) => {
		if (newExpanded) {
			this.setState({ panel: false });
		}
	};

	render() {
		return (
			<Container className="guestpost-main">
				<h1 className="guestpost-heading">LATEST POSTS: </h1>
				{this.state.list.map((post: Post) => {
					return (
						<Card key={post.id} className="guestpost-Card">
							<CardContent>
								<List>
									<div>
										<p className="allpost-title">{post.title}</p>{" "}
									</div>
									<Typography color="textSecondary">
										{post.author}
										{" - "}
										{this.reformatDate(post.createdAt)}
									</Typography>
									<br />
									<Typography variant="body2" component="p">
										{post.body}
									</Typography>
									<br />
									<br />
									<Divider variant="inset" component="li" />
									{this.state.commentToggle &&
									this.state.currentPost === post.id &&
									this.state.comments.length > 0 ? (
										this.state.comments.map((comment: Comment) => {
											return (
												<span>
													<ListItem key={comment.id}>
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
													</ListItem>
													<Divider variant="inset" component="li" />
												</span>
											);
										})
									) : this.state.commentToggle &&
									  this.state.currentPost === post.id &&
									  this.state.comments.length === 0 ? (
										<span>
											<br />
											no comments
										</span>
									) : (
										<span></span>
									)}
								</List>
							</CardContent>
							<CardActions>
								{this.state.commentToggle &&
								this.state.currentPost === post.id ? (
									<AccordionSummary>
										<Button
											size="small"
											key={post.id}
											onClick={() => {
												this.setState({ commentToggle: false });
											}}
										>
											<Typography>hide comments</Typography>
										</Button>
									</AccordionSummary>
								) : (
									<AccordionSummary
										aria-controls="comment-content"
										id="comment-header"
									>
										<Button
											size="small"
											key={post.id}
											onClick={() => {
												this.fetchComments(post.id);
											}}
										>
											<Typography>show comments</Typography>
										</Button>
										<span className="allpost-tag-span">
											{post.tags.map((tag) => {
												return (
													<span key={tag} className="allpost-tag">
														<Chip label={tag}></Chip>
													</span>
												);
											})}
										</span>
									</AccordionSummary>
								)}
							</CardActions>
						</Card>
					);
				})}
			</Container>
		);
	}
}
