import {
	Slide,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import React from "react";
import APIURL from "../../../helpers/environment";

interface DeleteProps {
	delete: boolean;
	coin: string | undefined;
	setCoin: (newCoin: string | undefined) => void;
	toggleDelete: (value: any) => void;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default class DeleteAcct extends React.Component<DeleteProps> {
	deleteFetch() {
		console.log("deleteFetch");
		fetch(`${APIURL}/user/delete`, {
			method: "DELETE",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		})
			.then((response) => response.json())
			.then((json) =>
				json.message === "user deleted"
					? () => this.finalDelete()
					: alert("Error deleting Account. please try again in a few moments.")
			);
	}

	finalDelete = () => {
		this.props.setCoin(undefined);
		window.location.reload(false);
	};

	deleteToggleDelete() {
		let opposite = this.props.delete;
		this.props.toggleDelete(opposite);
	}

	render() {
		return (
			<div>
				<Dialog
					TransitionComponent={Transition}
					keepMounted
					open={true}
					onClose={this.props.toggleDelete}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle id="alert-dialog-slide-title">
						{"f i n a l  d e l e t e"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">
							Are you sure you'd like to delete your account? Your email &
							username access will be permanently removed.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.deleteToggleDelete()} color="primary">
							cancel
						</Button>
						<Button onClick={() => this.deleteFetch()} color="primary">
							DELETE
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
