import { useUserInfo } from "../../store";

const middleware = {
	signUp: async () => {
		const data = await fetch(
			(process.env.NEXT_PUBLIC_MIDDLEWARE_API_CALLS ?? "https://cap-middleware.onrender.com/user") + "/newUser",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					
					email: useUserInfo.getState().email,
					password: useUserInfo.getState().password,
				}),
			}
		);

		console.log(data);

		return data;
	},

	logIn: async () => {
		const data = await fetch(
			(process.env.NEXT_PUBLIC_MIDDLEWARE_API_CALLS ?? "https://cap-middleware.onrender.com/user") + "/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: useUserInfo.getState().email,
					password: useUserInfo.getState().password,
				}),
			}
		);

		console.log("data", data);

		return data.json();
	},
};

export default middleware;
