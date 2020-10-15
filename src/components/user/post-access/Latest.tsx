import {
	Button,
	Card,
	CardContent,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@material-ui/core";
import Radium from "radium";
import * as React from "react";
import APIURL from "../../../helpers/environment";
import { Post } from "../../InterfaceExports";
import CreatePost from "./CreatePost";
import ExpandPost from "./ExpandPost";
import "./Latest.css";
import PostDisplay from "./PostDisplay";

const style = {
	filterSelect: { paddingTop: "1em", width: "4em", marginLeft: "80%" },
	filterButton: { paddingTop: "3em" },
};

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

class Latest extends React.Component<Props, State> {
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

	TagList: string[] = [
		"challenge",
		"solution",
		"personal",
		"work",
		"study",
		"view all",
	];

	componentDidMount() {
		this.latestPosts();
	}

	reformatDate = (rawDate: string) => {
		let month = rawDate.slice(5, 7);
		let day = rawDate.slice(8, 10);
		let year = rawDate.slice(0, 4);
		let formatDate = `${month}/${day}/${year}`;
		return formatDate;
	};

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
		if (this.state.filter === "view all") {
			this.setState({ recent: posts });
		} else {
			let tagged: Post[] = [];
			posts.map((tag: Post) => {
				if (tag.tags.includes(`${this.state.filter}`) === true) {
					tagged.push(tag);
				}
			});
			this.setState({ recent: tagged });
		}
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
				<span className="latest-filter-span">
					<Button
						className="latest-filter-refreshbutton"
						onClick={() => this.latestPosts()}
					>
						refresh
					</Button>
					{/* <h3 className="latest-filter-heading">Latest Posts</h3> */}
					<span style={style.filterSelect}>
						<FormControl>
							<InputLabel id="filter-posts">filter</InputLabel>
							<Select
								labelId="filter-posts"
								id="select-filter-posts"
								value={this.state.filter}
								onChange={this.handleFilterChange}
								autoWidth={true}
							>
								{this.TagList.map((tag) => {
									return <MenuItem value={`${tag}`}>{tag}</MenuItem>;
								})}
							</Select>
						</FormControl>
					</span>

					<Button style={style.filterButton} onClick={() => this.filterPosts()}>
						search
					</Button>
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
export default Radium(Latest);
