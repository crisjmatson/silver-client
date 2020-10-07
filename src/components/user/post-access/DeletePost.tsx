import { Button, DialogTitle } from "@material-ui/core";
import React, { Component } from "react";
import APIURL from "../../../helpers/environment";

interface SelectedPost {
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

interface Props {
	setExpand: (expandValue: boolean, value?: number | undefined) => void;
	refresh: () => Promise<void>;
	post: SelectedPost;
	coin: string | undefined;
}

export default class DeletePost extends Component<Props> {
	deleteFetch = () => {
		fetch(`${APIURL}/post/delete/${this.props.post.id}`, {
			method: "DELETE",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		})
			.then(() => this.props.refresh())
			.then(() => this.props.setExpand(false));
	};

	render() {
		return (
			<div>
				<DialogTitle>Delete Post?</DialogTitle>
				<Button onClick={() => this.deleteFetch()}>confirm</Button>
			</div>
		);
	}
}
