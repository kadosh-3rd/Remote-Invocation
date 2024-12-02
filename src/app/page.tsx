import { getUsers } from './actions/users';
import UserList from './components/UserList';

export default async function Home() {
	const users = await getUsers();

	return (
		<main className='container mx-auto px-4 py-8'>
			<h1 className='text-4xl font-bold mb-8 text-center text-yellow-600 border-b-2 border-yellow-200 pb-4'>
				Demonstrating Remote Invocation : Remote Invocation Way
			</h1>

			<h2 className='text-3xl font-bold mb-6 text-center'>User List</h2>
			<UserList initialUsers={users} />
		</main>
	);
}
