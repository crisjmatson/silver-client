import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip/Chip";
import * as React from "react";
import APIURL from "../../../helpers/environment";
import CreatePost from "./CreatePost";
import ExpandPost from "./ExpandPost";
import "./Latest.css";
import { Post } from "../../InterfaceExports";

interface Props {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName?: (name: string) => void;
	currentuser: string | undefined;
	coin: string | undefined;
	adminStatus: boolean;
}

interface State {
	recent: Post[];
	expandToggle: boolean;
	expandPostId: number | undefined;
}
/* 
interface userPost {
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
} */

export default class Latest extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			expandPostId: undefined,
			expandToggle: false,
			recent: [
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
		};
	}
	componentDidMount() {
		this.latestPosts();
	}

	reformatDate(rawDate: string) {
		let month = rawDate.slice(5, 7);
		let day = rawDate.slice(8, 10);
		let year = rawDate.slice(0, 4);
		let formatDate = `${month}/${day}/${year}`;
		return formatDate;
	}

	latestPosts = async () => {
		let response = await fetch(`${APIURL}/post/all`, {
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		});
		let json = await response.json();
		let sorted = this.sortRecent(json.posts);
		this.setState({ recent: sorted });
		console.log(this.state.recent);
	};

	sortRecent(arr: Post[]) {
		arr.sort((a, b) => a.id - b.id);
		arr.reverse();
		return arr;
	}

	setExpand = (expandValue: boolean, value?: number | undefined) => {
		this.setState({ expandPostId: value });
		this.setState({ expandToggle: expandValue });
	};

	render() {
		return (
			<div>
				<div>
					<CreatePost
						currentuser={this.props.currentuser}
						setCoinName={this.props.setCoinName}
						coin={this.props.coin}
						setCoin={this.props.setCoin}
						adminStatus={this.props.adminStatus}
						latestPosts={this.latestPosts}
					/>
				</div>
				{this.state.expandToggle ? (
					<span>
						<ExpandPost
							expandPostId={this.state.expandPostId}
							setExpand={this.setExpand}
							setCoin={this.props.setCoin}
							coin={this.props.coin}
							currentuser={this.props.currentuser}
							refresh={this.latestPosts}
							adminStatus={this.props.adminStatus}
						/>
					</span>
				) : (
					<span></span>
				)}
				<h3>
					<u>Latest Posts </u>
					<Button onClick={() => this.latestPosts()}>refresh</Button>
				</h3>
				<div>
					{this.state.recent.map((post) => {
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
								</CardContent>
								<CardActions>
									<Button onClick={() => this.setExpand(true, post.id)}>
										view full post
									</Button>
								</CardActions>
							</Card>
						);
					})}
				</div>
			</div>
		);
	}
}
