'use client';

import { useState } from 'react';
import { addUser, User } from '../actions/users';

interface AddUserFormProps {
	onUserAdded: (user: User) => void;
}

export default function AddUserForm({ onUserAdded }: AddUserFormProps) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (name && email) {
			const newUser = await addUser(name, email);
			onUserAdded(newUser);
			setName('');
			setEmail('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex space-x-4'>
			<input
				type='text'
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder='Name'
				className='flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black'
				required
			/>
			<input
				type='email'
				value={email}
				onChange={e => setEmail(e.target.value)}
				placeholder='Email'
				className='flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black'
				required
			/>
			<button
				type='submit'
				className='px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors'
			>
				Add User
			</button>
		</form>
	);
}
