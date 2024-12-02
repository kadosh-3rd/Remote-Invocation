import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AddUserForm } from './components/AddUserForm';

interface User {
	id: number;
	name: string;
	email: string;
}

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await axios.get<User[]>(
				`${import.meta.env.VITE_API_URL}`
			);
			setUsers(response.data);
			setLoading(false);
		} catch (err) {
			setError('Error fetching users');
			setLoading(false);
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
			// Refresh the page after successful deletion
			// window.location.reload();
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	};

	if (loading) return <div className='text-center mt-8'>Loading...</div>;
	if (error)
		return <div className='text-center mt-8 text-red-500'>{error}</div>;

	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-4xl font-bold mb-8 text-center text-yellow-600 border-b-2 border-yellow-200 pb-4'>
				Demonstrating Remote Invocation : Traditional Way
			</h1>
			<AddUserForm />
			<h2 className='text-3xl font-bold mb-6 text-center'>User List</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{users.map(user => (
					<div
						key={user.id}
						className='bg-white shadow-md rounded-lg p-6 relative'
					>
						<h3 className='text-xl font-semibold mb-2'>{user.name}</h3>
						<p className='text-gray-600 mb-4'>{user.email}</p>
						<button
							onClick={() => handleDelete(user.id)}
							className='absolute bottom-2 right-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center space-x-1'
							aria-label={`Delete ${user.name}`}
						>
							<Trash2 size={16} />
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
