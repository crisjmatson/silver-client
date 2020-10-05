import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import Latest from "./Latest";
import Post from "./Post";

export interface entranceProps {
	setCoin: (newCoin: string) => void;
	coin: string | undefined;
}

export default class Entrance extends React.Component<any, entranceProps> {
	useStyles = makeStyles((theme: Theme) =>
		createStyles({
			root: {
				flexGrow: 1,
			},
			menuButton: {
				marginRight: theme.spacing(2),
			},
			title: {
				flexGrow: 1,
			},
		})
	);

	//classes = this.useStyles();

	render() {
		return (
			<div>
				<div>
					<AppBar position="static">
						<Toolbar>
							<IconButton
								edge="start"
								/* className={this.classes.menuButton} */
								color="inherit"
								aria-label="menu"
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" /*  className={this.classes.title} */>
								News
							</Typography>
							<Button color="inherit">Login</Button>
						</Toolbar>
					</AppBar>
				</div>
				<h1>enter new post here:</h1>
				<Post coin={this.props.coin}/>
                <Latest coin={this.props.coin}/>
			</div>
		);
	}
}
