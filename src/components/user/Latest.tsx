import * as React from "react";
import APIURL from "../../helpers/environment";
import LatestDisplay from "./LatestDisplay";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export interface latestProps {
	coin: string | undefined;
}

export interface latestState {
	recent: userPost[];
}

export interface userPost {
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

export default class Latest extends React.Component<latestProps, latestState> {
	state = {
		recent: [
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
    };
    
    componentDidMount() {
        this.latestPosts();
    }

	latestPosts = async () => {
		let response = await fetch(`${APIURL}/post/all`, {
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		});
		let json = await response.json();
		console.log(json);
		this.setState({ recent: json.posts });
		console.log(this.state.recent);
	};

	render() {
		return (
			<div>
				<h3>
					<u>Latest Posts    </u>
					<button onClick={() => this.latestPosts()}>refresh</button>
					<LatestDisplay recent={this.state.recent}/>
				</h3>
			</div>
		);
	}
}
