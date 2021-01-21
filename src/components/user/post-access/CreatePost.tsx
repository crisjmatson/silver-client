import {
	Box,
	Button,
	Chip,
	FormControlLabel,
	Switch,
	TextField,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Form, Formik } from "formik";
import * as React from "react";
import APIURL from "../../../helpers/environment";
import { Tag } from "../../InterfaceExports";
import "./CreatePost.css";

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
	snackBarToggle: boolean;
	snackBarMessage: string;
	snackBarSeverity: "success" | "info" | "warning" | "error" | undefined;
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
			snackBarToggle: false,
			snackBarMessage: "",
			snackBarSeverity: "success",
		};
	}
	handleSnackClose = (
		event: React.SyntheticEvent | React.MouseEvent,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		this.setState({ snackBarToggle: false });
	};

	handleSwitchChange = () => {
		let opposite = this.state.postPrivacy;
		this.setState({ postPrivacy: !opposite });
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
		if ((values.title.length || values.body.length) === 0) {
			this.setSnackBar(
				true,
				"Please complete both title & body of post.",
				"error"
			);
		} else {
			let tagSubmit: string[] = [];
			let tags: Tag[] = [
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
				return "  ";
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
			if (json.error) {
				this.setSnackBar(true, "Error publishing post", "error");
			} else {
				this.clearForm();
				this.setSnackBar(true, "Post created!", "success");
			}
			this.props.latestPosts();
		}
	};

	setSnackBar = (
		value: boolean,
		message: string,
		severity: "success" | "info" | "warning" | "error" | undefined
	) => {
		this.setState({ snackBarSeverity: severity });
		this.setState({ snackBarMessage: message });
		this.setState({ snackBarToggle: value });
	};

	clearForm = () => {
		this.setState({
			challenge: false,
			solution: false,
			personal: false,
			work: false,
			study: false,
		});
	};

	render() {
		return (
			<Box>
				<div>
					<Snackbar
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						open={this.state.snackBarToggle}
						autoHideDuration={6000}
						onClose={() => this.setState({ snackBarToggle: false })}
						message={this.state.snackBarMessage}
						action={
							<React.Fragment>
								<IconButton
									size="small"
									aria-label="close"
									color="inherit"
									onClick={() => this.setState({ snackBarToggle: false })}
								>
									<CloseIcon fontSize="small" />
								</IconButton>
							</React.Fragment>
						}
					>
						<Alert
							onClose={() => this.setState({ snackBarToggle: false })}
							severity={this.state.snackBarSeverity}
						>
							{this.state.snackBarMessage}
						</Alert>
					</Snackbar>
				</div>
				<Formik
					initialValues={{ title: "", body: "", privacy: false }}
					onSubmit={(
						values,
						{ setSubmitting, setErrors, setStatus, resetForm }
					) => {
						this.postPost(values);
					}}
				>
					{({
						errors,
						handleSubmit,
						handleChange,
						handleBlur,
						isSubmitting,
						isValid,
						status,
						values,
					}) => (
						<Form className="post-form-box">
							<TextField
								id="title"
								name="title"
								placeholder="Title"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.title || ""}
								fullWidth={true}
							/>
							<br />
							<br />
							<TextField
								fullWidth={true}
								multiline
								rows={4}
								variant="outlined"
								id="body"
								name="body"
								placeholder="enter post here..."
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.body || ""}
							/>
							<br />
							<span>
								<span className="createpost-tags-span">
									<span className="createpost-tags-tag">
										<Chip
											clickable={true}
											label="challenge"
											onClick={() => this.addChip("challenge")}
											deleteIcon={<DoneIcon />}
											color={this.state.challenge ? "primary" : "default"}
										/>
									</span>
									<span className="createpost-tags-tag">
										<Chip
											clickable={true}
											className="createpost-tags-tag"
											label="solution"
											onClick={() => this.addChip("solution")}
											deleteIcon={<DoneIcon />}
											color={this.state.solution ? "primary" : "default"}
										/>
									</span>
									<span className="createpost-tags-tag">
										<Chip
											clickable={true}
											className="createpost-tags-tag"
											label="personal"
											onClick={() => this.addChip("personal")}
											deleteIcon={<DoneIcon />}
											color={this.state.personal ? "primary" : "default"}
										/>
									</span>
									<span className="createpost-tags-tag">
										<Chip
											clickable={true}
											className="createpost-tags-tag"
											label="work"
											onClick={() => this.addChip("work")}
											deleteIcon={<DoneIcon />}
											color={this.state.work ? "primary" : "default"}
										/>
									</span>
									<span className="createpost-tags-tag">
										<Chip
											clickable={true}
											className="createpost-tags-tag"
											label="study"
											onClick={() => this.addChip("study")}
											deleteIcon={<DoneIcon />}
											color={this.state.study ? "primary" : "default"}
										/>
									</span>
								</span>
								<FormControlLabel
									control={
										<Switch
											className="createpost-switch"
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
							</span>
							<span className="createpost-submit">
								<Button type="submit">Submit</Button>
							</span>
						</Form>
					)}
				</Formik>
			</Box>
		);
	}
}
