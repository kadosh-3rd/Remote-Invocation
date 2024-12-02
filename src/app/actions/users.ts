'use server';

import { revalidatePath } from 'next/cache';

export interface User {
	id: number;
	name: string;
	email: string;
}

let users: User[] = [
	{ id: 1, name: 'John Doe', email: 'john@example.com' },
	{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
	{ id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
	{ id: 4, name: 'Alice Brown', email: 'alice@example.com' },
];

export async function getUsers(): Promise<User[]> {
	// Simulate a delay to mimic a real API call
	await new Promise(resolve => setTimeout(resolve, 1000));
	return users;
}

export async function addUser(name: string, email: string): Promise<User> {
	const newUser: User = {
		id: users.length + 1,
		name,
		email,
	};
	users.push(newUser);
	revalidatePath('/');
	return newUser;
}

export async function deleteUser(id: number): Promise<void> {
	users = users.filter(user => user.id !== id);
	revalidatePath('/');
}
