import axios from "axios";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.tsx";

export default function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const getUserData = async () => {
		try {
			const { data } = await axios.get("http://localhost:3000/users/getInfo", {
				withCredentials: true,
			});
			console.log("User data fetched:", data);
			return data;
		} catch (error) {
			console.error("Failed to fetch user data:", error);
			return null;
		}
	};
	const [, setStoredValue] = useLocalStorage("userData", {});
	const handleSubmit = async () => {
		const newUser = {
			email: email,
			password: password,
		};
		console.log(newUser);
		try {
			const response = await axios.post(
				"http://localhost:3000/authentication/signin",
				newUser,
				{
					withCredentials: true,
				},
			);
			if (response.status === 200) {
				const data = await getUserData();
				if (data) {
					setStoredValue(data);
				}
			}
		} catch (error) {
			console.error("Sign in failed:", error);
		}
	};

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
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
