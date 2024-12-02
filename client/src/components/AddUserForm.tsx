import axios from 'axios';
import React, { useState } from 'react';

export function AddUserForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (name && email) {
			try {
				await axios.post(`${import.meta.env.VITE_API_URL}`, { name, email });
				// Refresh the page after successful addition
				// window.location.reload();
			} catch (error) {
				console.error('Error adding user:', error);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex space-x-4 mb-8'>
			<input
				type='text'
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder='Name'
				className='flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
				required
			/>
			<input
				type='email'
				value={email}
				onChange={e => setEmail(e.target.value)}
				placeholder='Email'
				className='flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
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
