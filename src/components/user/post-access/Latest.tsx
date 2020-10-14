import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip/Chip";
import * as React from "react";
import APIURL from "../../../helpers/environment";
import CreatePost from "./CreatePost";
import ExpandPost from "./ExpandPost";
import "./Latest.css";
import { Post } from "../../InterfaceExports";
import PostDisplay from "./PostDisplay";
import { addSyntheticLeadingComment } from "typescript";

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
	filter: string;
}
/* interface Tags {
	tags: string[];
} */

export default class Latest extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			expandPostId: undefined,
			expandToggle: false,
			filter: "",
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

	TagList: string[] = ["challenge", "solution", "personal", "work", "study"];

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
		this.setState({ filter: "" });
		console.log("latest posts pulled", sorted);
	};

	filterPosts = async () => {
		let response = await fetch(`${APIURL}/post/all`, {
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		});
		let json = await response.json();
		let posts = json.posts;
		let tagged: Post[] = [];
		posts.map((tag: Post) => {
			if (tag.tags.includes(`${this.state.filter}`) === true) {
				tagged.push(tag);
			}
		});
		this.setState({ recent: tagged });
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
	handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		this.setState({ filter: event.target.value as string });
		console.log(event.target.value as string);
	};
	/* 
	renderPosts() {
		if (this.state.recent.length !== (undefined || 0)) {
			this.state.recent.map((post) => {
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
			});
		} else {
			return <h1>no results!</h1>;
		}
	} */

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
				</h3>
				<span>
					<Button onClick={() => this.latestPosts()}>refresh</Button>

					<FormControl>
						<InputLabel id="filter-posts">filter</InputLabel>
						<Select
							labelId="filter-posts"
							id="select-filter-posts"
							value={this.state.filter}
							onChange={this.handleFilterChange}
							labelWidth={20}
						>
							{this.TagList.map((tag) => {
								return <MenuItem value={`${tag}`}>{tag}</MenuItem>;
							})}
						</Select>
					</FormControl>
					<Button onClick={() => this.filterPosts()}>search</Button>
				</span>

				<div>
					{this.state.recent.length !== (undefined || 0) ? (
						<PostDisplay
							recent={this.state.recent}
							setExpand={this.setExpand}
						/>
					) : (
						<Card>
							<CardContent>
								<Typography variant="h5" component="h2">
									{" "}
									no posts to show.{" "}
								</Typography>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		);
	}
}
