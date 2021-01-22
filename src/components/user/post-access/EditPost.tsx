import {
	Button,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormGroup,
	TextField,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import Radium from "radium";
import React, { Component } from "react";
import APIURL from "../../../helpers/environment";
import "./EditPost.css";

const style = {
	username: { fontFamily: "'Oleo Script Swash Caps', cursive" },
	form: {
		margin: "1em",
		width: "30em",
	},
	submit: {
		marginLeft: "80%",
	},
	main: {
		width: "100%",
	},
};

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
	refresh: () => void;
	setEdit: (status: boolean) => void;
	postFetch: () => void;
}

class EditPost extends Component<Props> {
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
			.then((json) => console.log(json))
			.then(() => {
				this.props.setEdit(false);
				this.props.postFetch();
			});
	};

	render() {
		return (
			<div className="editpost-dialog" style={style.main}>
				<DialogTitle>
					edit: {this.props.post.title} - -
					<span style={style.username}>{this.props.post.author}</span>{" "}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{this.props.post.body}
					</DialogContentText>
					<FormGroup>
						<Formik
							initialValues={{ title: "", body: "" }}
							onSubmit={(values) => {
								this.postEditFetch(values);
							}}
						>
							{({ values, handleChange, handleBlur }) => (
								<Form style={style.form}>
									<div>
										<TextField
											style={style.form}
											name="title"
											placeholder={this.props.post.title}
											value={values.title}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</div>
									<div>
										<TextField
											style={style.form}
											name="body"
											placeholder={this.props.post.body}
											value={values.body}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</div>
									<Button style={style.submit} type="submit">
										post edit
									</Button>
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
export default Radium(EditPost);
