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
import "./Post.css";
import Latest from "./Latest";
import {
	Box,
	Button,
	TextField,
	FormControlLabel,
	Switch,
} from "@material-ui/core";

interface MyFormValues {
	title: string;
	body: string;
	privacy: boolean;
}
interface Props {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName?: (name: string) => void;
	currentuser?: string | undefined;
	coin: string | undefined;
	adminStatus: boolean;
}
interface State {
	postPrivacy: boolean;
}

export default class Post extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			postPrivacy: false,
		};
	}

	componentWillUnmount() {
		this.setState({ postPrivacy: false });
	}

	handleSwitchChange = () => {
		let opposite = this.state.postPrivacy;
		this.setState({ postPrivacy: !opposite });
		console.log(this.state.postPrivacy);
	};

	/* initialValues: MyFormValues = {
		title: "",
		body: "",
		privacy: false,
	}; */

	postPost = async (values: {
		title: string;
		body: string;
		privacy: boolean;
	}) => {
		let postBody = {
			post: {
				title: values.title,
				body: values.body,
				private: this.state.postPrivacy,
			},
		};
		//console.log(postBody);

		let result = await fetch(`${APIURL}/post`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
			body: JSON.stringify(postBody),
		});
		let json = await result.json();
		//console.log(json);
	};

	render() {
		return (
			<Box>
				<Formik
					initialValues={{ title: "", body: "", privacy: false }}
					onSubmit={(values, actions) => {
						//console.log({ values, actions });
						this.postPost(values);
					}}
				>
					{({ values, handleChange, handleBlur }) => (
						<Form className="post-form-box">
							<label htmlFor="title">Title</label>
							<TextField
								id="title"
								name="title"
								placeholder="Title"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<br />
							<label htmlFor="body">Post </label>
							<TextField
								id="body"
								name="body"
								placeholder="enter post here..."
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<br />
							<FormControlLabel
								control={
									<Switch
										id="privacy"
										name="privacy"
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="false"
									/>
								}
								label="Private?"
							/>
							{/* <TextField id="privacy" name="privacy" placeholder="false" /> */}
							<br />
							<Button type="submit">Submit</Button>
						</Form>
					)}
				</Formik>
				<Latest
					currentuser={this.props.currentuser}
					setCoinName={this.props.setCoinName}
					coin={this.props.coin}
					setCoin={this.props.setCoin}
					adminStatus={this.props.adminStatus}
				/>
			</Box>
		);
	}
}
