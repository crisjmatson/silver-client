import {
	AccordionSummary,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip/Chip";
import PersonIcon from "@material-ui/icons/Person";
import Radium from "radium";
import * as React from "react";
import APIURL from "../../helpers/environment";
import { Comment, Post } from "../InterfaceExports";
import "./AllPosts.css";

const style = {
	backgroundImage:
		'url("https://images.unsplash.com/photo-1494067329533-4385a4867cd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")',
	card: {
		margin: "8%",
	},
	latestHeading: {
		fontSize: "90px",
		padding: ".5em .5em .5em 2em",
		marginBottom: "-1em",
		textShadow: "10px 10px black",
	},
};

interface State {
	panel: string;
	expanded: string;
	list: Post[];
	comments: Comment[];
	commentToggle: boolean;
	currentPost: number;
}

class AllPosts extends React.Component {
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
			<div className="guestpost-main" style={style}>
				<h1 className="guestpost-heading" style={style.latestHeading}>
					LATEST POSTS:{" "}
				</h1>
				{this.state.list.map((post: Post) => {
					return (
						<Card key={post.id} className="guestpost-Card" style={style.card}>
							<CardContent>
								<List>
									<Typography>
										<h1 className="allpost-title">{post.title}</h1>{" "}
									</Typography>
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
										<span className="allpost-emptyComment">
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
			</div>
		);
	}
}

export default Radium(AllPosts);
