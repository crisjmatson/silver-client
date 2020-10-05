import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export interface latestDisplayProps {
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

export default class LatestDisplay extends React.Component<latestDisplayProps> {
    
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
				{this.props.recent.map((post) => {
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
							</CardContent>
							<CardActions>
								<Button size="small" key={post.id}>
									show comments
								</Button>
							</CardActions>
						</Card>
					);
				})}
			</div>
		);
	}
}
