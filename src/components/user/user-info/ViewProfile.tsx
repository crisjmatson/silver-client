import React, { Component } from "react";
import Account from "./Account";
import APIURL from "../../../helpers/environment";
import { User, Profile } from "../../InterfaceExports";
import ViewPosts from "./ViewPosts";

interface Props {
	setCoin: (newCoin: string | undefined) => void;
	setCoinName: (name: string) => void;
	currentuser: string;
	coin: string | undefined;
}
interface State {
	user: User;
	profile: Profile;
}

export default class ViewProfile extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			user: {
				createdAt: "",
				email: "",
				id: 999999999999,
				password: "",
				role: "",
				updatedAt: "",
				username: "",
			},
			profile: {
				avatar: "",
				challenges_completed: 0,
				createdAt: "",
				date_graduated: "",
				grad_status: "",
				id: 999999999999,
				updatedAt: "",
				userId: 999999999999,
			},
		};
	}
	componentDidMount() {
		this.profileFetch();
		this.accountFetch();
	}
	dualRefresh = () => {
		this.profileFetch();
		this.accountFetch();
	};
	accountFetch = async () => {
		let response = await fetch(`${APIURL}/user/view`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		});
		let json = await response.json();
		this.setState({ user: json.user });
		//console.log("user set: ", json.user);
	};
	profileFetch = async () => {
		let response = await fetch(`${APIURL}/profile/view`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: `${this.props.coin}`,
			}),
		});
		let json = await response.json();
		//console.log("profile: ", json);
		this.setState({ profile: json.profile });
	};
	render() {
		return (
			<div>
				<Account
					currentuser={this.props.currentuser}
					setCoinName={this.props.setCoinName}
					coin={this.props.coin}
					setCoin={this.props.setCoin}
					account={this.state.user}
					profile={this.state.profile}
					refresh={this.dualRefresh}
				/>
				<ViewPosts
					coin={this.props.coin}
					currentuser={this.props.currentuser}
				/>
			</div>
		);
	}
}
