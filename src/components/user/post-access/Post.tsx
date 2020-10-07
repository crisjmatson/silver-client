import * as React from "react";
import {
	Formik,
	FormikHelpers,
	FormikProps,
	Form,
	Field,
	FieldProps,
} from "formik";
import APIURL from "../../../helpers/environment";
import Latest from "./Latest";
import { Box } from "@material-ui/core";

interface MyFormValues {
	title: string;
	body: string;
	privacy: boolean;
}
export interface postProps {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName?: (name: string) => void;
	currentuser?: string | undefined;
	coin: string | undefined;
}

export default class Post extends React.Component<any, postProps> {
	initialValues: MyFormValues = {
		title: "",
		body: "",
		privacy: false,
	};

	postPost = async ({ title, body, privacy }: MyFormValues) => {
		console.log("post called");
		let postBody = {
			post: {
				title: title,
				body: body,
				private: privacy,
			},
		};
		let result = await fetch(`${APIURL}/post`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
			body: JSON.stringify(postBody),
		});
		let json = await result.json();
		console.log(json);
	};

	render() {
		return (
			<Box className="post-form-box">
				<Formik
					initialValues={this.initialValues}
					onSubmit={(values, actions) => {
						console.log({ values, actions });
						this.postPost(values);
					}}
				>
					<Form>
						<label htmlFor="title">Title</label>
						<Field id="title" name="title" placeholder="Title" />

						<label htmlFor="body">Post </label>
						<Field id="body" name="body" placeholder="enter post here..." />

						<label htmlFor="privacy">Private?</label>
						<Field id="privacy" name="privacy" placeholder={false} />
						<button type="submit">Submit</button>
					</Form>
				</Formik>
				<Latest
					currentuser={this.props.currentuser}
					setCoinName={this.props.setCoinName}
					coin={this.props.coin}
					setCoin={this.props.setCoin}
				/>
			</Box>
		);
	}
}
