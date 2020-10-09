export interface User {
	createdAt: string;
	email: string;
	id: number;
	password: string;
	role: string;
	updatedAt: string;
	username: string;
}

export interface Profile {
	avatar: string;
	challenges_completed: number;
	createdAt: string;
	date_graduated: string;
	grad_status: string;
	id: number;
	updatedAt: string;
	userId: number;
}

export interface Post {
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

export interface Comment {
	author: string;
	body: string;
	createdAt: string;
	edited: boolean;
	id: number;
	postId: number;
	private: boolean;
	updatedAt: string;
	userId: number;
}
