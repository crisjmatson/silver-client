import {
	Card,
	CardContent,
	Typography,
	Chip,
	CardActions,
	Button,
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@material-ui/core";
import React, { Component } from "react";
import { Post } from "../../InterfaceExports";
import "./PostDisplay.css";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

interface Props {
	recent: Post[];
	setExpand: (expandValue: boolean, value?: number | undefined) => void;
}

export default class PostDisplay extends Component<Props> {
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
								<span>
									<h4 className="postdisplay-title">{post.title}</h4>
									{post.edited ? (
										<p className="edited-indicator">edited</p>
									) : (
										""
									)}
								</span>

								<List>
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<SupervisedUserCircleIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={post.author}
											secondary={this.reformatDate(post.createdAt)}
										/>
									</ListItem>
								</List>

								<br />
								<Typography variant="body2" component="p">
									{post.body}
								</Typography>
							</CardContent>
							<CardActions className="postdisplay-cardactions">
								<Button onClick={() => this.props.setExpand(true, post.id)}>
									view full post
								</Button>
								<span className="latest-taglist">
									<p>
										{post.tags.map((tag) => {
											return (
												<span key={tag} className="postTags">
													<Chip label={tag} />
												</span>
											);
										})}
									</p>
								</span>
							</CardActions>
						</Card>
					);
				})}
			</div>
		);
	}
}
