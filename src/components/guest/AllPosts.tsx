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
		commentToggle: false,
		test: "starter",
		list: [
			{
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
				body: "string",
				createdAt: "string",
				edited: false,
				id: 0,
				postId: 0,
				private: false,
				updatedAt: "string",
				userId: 0,
			},
		],
	};

	componentDidMount() {
		fetch(`${APIURL}/post/public`)
			.then((res) => res.json())
			.then((json) => json.posts)
			.then((posts) => this.setState({ list: posts }))
			.then(() => this.removeBlank());
	}

	removeBlank() {
		this.setState({
			list: this.state.list.filter(function (post) {
				return post.createdAt !== "string";
			}),
		});
	}

	fetchComments = async (postId: number) => {
		this.setState({ commentToggle: !this.state.commentToggle });
		console.log(this.state.commentToggle);
		let response = await fetch(`${APIURL}/post/public_full/${postId}`, {
			method: "GET",
		});
		let json = await response.json();
		console.log(json.comments);
		this.setState({ comments: json.comments });
	};

	render() {
		// should probably move this out to another class component - not sure how to keep ALL elements from displaying ALL comments & toggling together
		return (
			<div>
				{this.state.list.map((post: PublicPost) => {
					return (
						<Card key={post.id}>
							<CardContent>
								<Typography color="textSecondary" gutterBottom>
									userId: {post.userId}
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
								{this.state.commentToggle ? (
									<div>
										{this.state.comments.length > 0 ? (
											this.state.comments.map((comment: PublicComment) => {
												return (
													<span key={comment.id}>
														<p>
															{comment.body},{" "}
															{this.reformatDate(comment.createdAt)},{" "}
															{comment.id}
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
								<Button
									size="small"
									key={post.id}
									onClick={() => {
										this.fetchComments(post.id);
									}}
								>
									{this.state.commentToggle ? (
										<p>hide comments</p>
									) : (
										<p>show comments</p>
									)}
								</Button>
							</CardActions>
						</Card>
					);
				})}
			</div>
		);
	}
}
