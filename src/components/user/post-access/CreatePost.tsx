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
import "./CreatePost.css";
import {
	Box,
	Button,
	TextField,
	FormControlLabel,
	Switch,
	Chip,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

interface Props {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName?: (name: string) => void;
	latestPosts: () => void;
	currentuser?: string | undefined;
	coin: string | undefined;
	adminStatus: boolean;
}
interface State {
	postPrivacy: boolean;
	challenge: boolean;
	solution: boolean;
	personal: boolean;
	work: boolean;
	study: boolean;
}

export default class CreatePost extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			postPrivacy: false,
			challenge: false,
			solution: false,
			personal: false,
			work: false,
			study: false,
		};
	}

	handleSwitchChange = () => {
		let opposite = this.state.postPrivacy;
		this.setState({ postPrivacy: !opposite });
		console.log(this.state.postPrivacy);
	};

	addChip = (chip: string) => {
		if (chip === "challenge") {
			this.state.challenge
				? this.setState({ challenge: false })
				: this.setState({ challenge: true });
		} else if (chip === "solution") {
			this.state.solution
				? this.setState({ solution: false })
				: this.setState({ solution: true });
		} else if (chip === "personal") {
			this.state.personal
				? this.setState({ personal: false })
				: this.setState({ personal: true });
		} else if (chip === "work") {
			this.state.work
				? this.setState({ work: false })
				: this.setState({ work: true });
		} else if (chip === "study") {
			this.state.study
				? this.setState({ study: false })
				: this.setState({ study: true });
		}
	};

	postPost = async (values: {
		title: string;
		body: string;
		privacy: boolean;
	}) => {
		let tagSubmit: any[] = [];
		let tags = [
			{ value: this.state.challenge, tagName: "challenge" },
			{ value: this.state.solution, tagName: "solution" },
			{ value: this.state.personal, tagName: "personal" },
			{ value: this.state.work, tagName: "work" },
			{ value: this.state.study, tagName: "study" },
		];
		tags.map((tag) => {
			if (tag.value === true) {
				tagSubmit.push(tag.tagName);
			}
		});
		let postBody = {
			post: {
				title: values.title,
				body: values.body,
				private: this.state.postPrivacy,
				tags: tagSubmit,
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
		this.props.latestPosts();
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
							<div>
								<Chip
									label="challenge"
									onClick={() => this.addChip("challenge")}
									deleteIcon={<DoneIcon />}
									color={this.state.challenge ? "primary" : "default"}
								/>
								<Chip
									label="solution"
									onClick={() => this.addChip("solution")}
									deleteIcon={<DoneIcon />}
									color={this.state.solution ? "primary" : "default"}
								/>
								<Chip
									label="personal"
									onClick={() => this.addChip("personal")}
									deleteIcon={<DoneIcon />}
									color={this.state.personal ? "primary" : "default"}
								/>
								<Chip
									label="work"
									onClick={() => this.addChip("work")}
									deleteIcon={<DoneIcon />}
									color={this.state.work ? "primary" : "default"}
								/>
								<Chip
									label="study"
									onClick={() => this.addChip("study")}
									deleteIcon={<DoneIcon />}
									color={this.state.study ? "primary" : "default"}
								/>
							</div>
							<br />
							<FormControlLabel
								control={
									<Switch
										id="privacy"
										name="privacy"
										color="primary"
										onChange={this.handleSwitchChange}
										onBlur={handleBlur}
										placeholder="false"
									/>
								}
								label="Private?"
							/>
							<br />
							<Button type="submit">Submit</Button>
						</Form>
					)}
				</Formik>
			</Box>
		);
	}
}
