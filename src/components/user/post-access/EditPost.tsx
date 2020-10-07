import {
	FormGroup,
	TextField,
	Button,
	DialogContent,
	DialogTitle,
} from "@material-ui/core";
import { Formik, Form } from "formik";
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
	post: SelectedPost;
	coin: string | undefined;
	/* {
		author: string;
		body: string;
		createdAt: string;
		edited: false;
		id: number;
		private: false;
		tags: string[];
		title: string;
		updatedAt: string;
		userId: number;
	}; */
}

export default class EditPost extends Component<Props> {
	constructor(props: Props) {
		super(props);
		/* post = {
			author: "",
			body: "",
			createdAt: "",
			edited: false,
			id: 0,
			private: false,
			tags: [],
			title: "",
			updatedAt: "",
			userId: 0,
		}; */
	}

	postEditFetch = (postValues: { title: string; body: string }) => {
		let title;
		let body;
		postValues.title.length > 0
			? (title = postValues.title)
			: (title = this.props.post.title);
		postValues.body.length > 0
			? (body = postValues.body)
			: (body = this.props.post.body);
		let postSubmission = {
			post: {
				id: this.props.post.id,
				title: title,
				body: body,
				private: this.props.post.private,
			},
		};
		console.log(postSubmission);
		fetch(`${APIURL}/post/update`, {
			method: "PUT",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
			body: JSON.stringify(postSubmission),
		})
			.then((response) => response.json())
			.then((json) => console.log(json));
	};

	render() {
		return (
			<div>
				<h1>Edit Post</h1>
				<DialogTitle>edit: {this.props.post.title}</DialogTitle>
				<DialogContent>
					<FormGroup>
						<Formik
							initialValues={{ title: "", body: "" }}
							onSubmit={(values) => {
								this.postEditFetch(values);
							}}
						>
							{({ values, handleChange, handleBlur }) => (
								<Form>
									<div>
										<TextField
											name="title"
											placeholder={this.props.post.title}
											value={values.title}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</div>
									<div>
										<TextField
											name="body"
											placeholder={this.props.post.body}
											value={values.body}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</div>
									<Button type="submit">post edit</Button>
									<br />
									<br />
								</Form>
							)}
						</Formik>
					</FormGroup>
				</DialogContent>
			</div>
		);
	}
}
