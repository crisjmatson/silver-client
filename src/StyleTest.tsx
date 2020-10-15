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
		fontSize: 136,
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
