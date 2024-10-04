import axios from "axios";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card.tsx";

export default function SignUpPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = () => {
		const newUser = {
			email: email,
			password: password,
		};
		console.log(newUser);
		console.log("Getting tokens...");
		axios.post("http://localhost:3000/authentication/signup", newUser, {
			withCredentials: true,
		});
	};
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Sign Up</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="m5">
						<label>Email:</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label>Password:</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button onClick={handleSubmit}>Submit</button>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
