import {
	Card,
	CardContent,
	Typography,
	Chip,
	CardActions,
	Button,
} from "@material-ui/core";
import React, { Component } from "react";
import { Post } from "../../InterfaceExports";

interface Props {
	recent: Post[];
	setExpand: (expandValue: boolean, value?: number | undefined) => void;
}

export default class PostDisplay extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}
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
								<Button onClick={() => this.props.setExpand(true, post.id)}>
									view full post
								</Button>
							</CardActions>
						</Card>
					);
				})}
			</div>
		);
	}
}
