import React, { Component } from "react";
import {
	createMuiTheme,
	createStyles,
	withStyles,
	makeStyles,
	Theme,
	ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green, purple } from "@material-ui/core/colors";

const styles = {
	root: {
		boxShadow: "none",
		textTransform: "none",
		fontSize: 16,
		padding: "6px 12px",
		border: "1px solid",
		lineHeight: 1.5,
		backgroundColor: "#0063cc",
		borderColor: "#0063cc",
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
		"&:hover": {
			backgroundColor: "#0069d9",
			borderColor: "#0062cc",
			boxShadow: "none",
		},
		"&:active": {
			boxShadow: "none",
			backgroundColor: "#0062cc",
			borderColor: "#005cbf",
		},
		"&:focus": {
			boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
		},
	},
};

export default class StyleTest extends Component /* <any, any> */ {
	//class StyleTest extends Component /* <any, any> */ {
	//classes = useStyles();

	render() {
	
		return (
			<div>
				<div>
					<Button></Button>
					{/* <ColorButton
						variant="contained"
						color="primary"
						className={this.classes.margin}
					>
						Custom CSS
					</ColorButton>
					<ThemeProvider theme={theme}>
						<Button
							variant="contained"
							color="primary"
							className={this.classes.margin}
						>
							Theme Provider
						</Button>
					</ThemeProvider>
					<BootstrapButton
						variant="contained"
						color="primary"
						disableRipple
						className={this.classes.margin}
					>
						Bootstrap
					</BootstrapButton> */}
				</div>
			</div>
		);
	}
}

//export default withStyles(styles)(StyleTest)
