import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

dotenv.config();

// Setup Express
const app = express();
const port = process.env.PORT || 5001;
const host = process.env.HOST || 'localhost';

// Setup CORS
app.use(cors());
app.use(express.json({ limit: '50mb' }));

interface User {
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

// Get all users
app.get('/api/users', (req: Request, res: Response) => {
	res.json(users);
});

// Create a new user
app.post('/api/users', (req: Request, res: Response) => {
	const { name, email } = req.body;

	const newUser: User = {
		id: users.length + 1,
		name,
		email,
	};
	users.push(newUser);
	res.status(201).json(newUser);
});

// Delete a user
app.delete('/api/users/:id', (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	users = users.filter(user => user.id !== id);
	res.sendStatus(204);
});

// Listen for requests
app.listen(port, () => {
	console.log(`Server running at http://${host}:${port}`);
});
