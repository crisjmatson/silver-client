import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@material-ui/core";
import * as React from "react";
import APIURL from "../../helpers/environment";

export interface PublicPost {
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

export interface PublicComment {
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

export interface State {
	list: PublicPost[];
	comments: PublicComment[];
	test: any;
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
		currentPost: 99999999,
		commentToggle: false,
		test: "starter",
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

	/* getName(num: number): string {
		let nameReturn;
		const gone: string = "d-e-l-e-t-e-d";
		if (num === null) {
			return (nameReturn = gone);
		} else {
			fetch(`${APIURL}/user/${num}`, {
				method: "GET",
				headers: new Headers({
					"Content-Type": "application/json",
				}),
			})
				.then((response) => response.json())
				.then((name) => {
					//console.log(name);
					if (name.error) {
						return (nameReturn = gone);
					} else {
						return (nameReturn = name);
					}
				});
			//return nameReturn;
		}
		//return nameReturn;
	} */

	sortRecent(arr: PublicPost[]) {
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
		console.log(json.comments);
		this.setState({ comments: json.comments });
		this.setState({ commentToggle: true });
	};

	render() {
		// should probably move this out to another class component - not sure how to keep ALL elements from displaying ALL comments & toggling together
		return (
			<div>
				{this.state.list.map((post: PublicPost) => {
					/* let postAuthor = this.getName(post.userId);
					console.log(postAuthor); */
					return (
						<Card key={post.id}>
							<CardContent>
								<Typography color="textSecondary" gutterBottom>
									userId: {post.author}
								</Typography>
								<Typography variant="h5" component="h2">
									{post.title}
								</Typography>
								<Typography color="textSecondary">
									{this.reformatDate(post.createdAt)}
								</Typography>
								<Typography variant="body2" component="p">
									{post.body}
								</Typography>
								{this.state.commentToggle &&
								this.state.currentPost === post.id ? (
									<div>
										{this.state.comments.length > 0 ? (
											this.state.comments.map((comment: PublicComment) => {
												return (
													<span key={comment.id}>
														<p>
															{comment.body},{" "}
															{this.reformatDate(comment.createdAt)},{" "}
															{comment.author}
														</p>
													</span>
												);
											})
										) : (
											<p>no comments</p>
										)}
									</div>
								) : (
									<div></div>
								)}
							</CardContent>
							<CardActions>
								{this.state.commentToggle &&
								this.state.currentPost === post.id ? (
									<Button
										size="small"
										key={post.id}
										onClick={() => {
											this.setState({ commentToggle: false });
										}}
									>
										<p>hide comments</p>
									</Button>
								) : (
									<Button
										size="small"
										key={post.id}
										onClick={() => {
											this.fetchComments(post.id);
										}}
									>
										<p>show comments</p>
									</Button>
								)}
							</CardActions>
						</Card>
					);
				})}
			</div>
		);
	}
}
