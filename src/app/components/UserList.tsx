'use client';

import { useState } from 'react';
import { User, deleteUser } from '../actions/users';
import { Trash2 } from 'lucide-react';

import AddUserForm from './AddUserForm';

export default function UserList({ initialUsers }: { initialUsers: User[] }) {
	const [users, setUsers] = useState<User[]>(initialUsers);

	const handleDelete = async (id: number) => {
		await deleteUser(id);
		setUsers(users.filter(user => user.id !== id));
	};

	const handleUserAdded = (newUser: User) => {
		setUsers([...users, newUser]);
	};

	return (
		<div>
			<div className='mb-8'>
				<AddUserForm onUserAdded={handleUserAdded} />
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{users.map(user => (
					<div key={user.id} className='bg-white shadow-md rounded-lg p-6'>
						<h3 className='text-xl font-semibold mb-2 text-yellow-500'>
							{user.name}
						</h3>
						<p className='text-gray-600'>{user.email}</p>

						<div className='flex justify-end space-x-2'>
							<button
								onClick={() => handleDelete(user.id)}
								className='px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center space-x-1'
								aria-label={`Delete ${user.name}`}
							>
								<Trash2 size={16} />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
