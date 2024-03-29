// WILL CONTAIN GLOBAL VARIABLES

// DO NOT USE ANY OF THE VARIABLE NAMES HERE IN ANY OTHER FILES

/* 
IF YOUR PAGE SHOULD NOT HAVE A NAV BAR, ADD THE ROOT PATH HERE ("/patient_form" will remove the navbar in /patient_form and its subpages)
*/
export const noNavPaths = [
	"/personal_information",
	"/patient_form",
	"/doctor_form",
	"/login",
	"/require_auth",
	"/test",
	"/legal",
	"/middleware",
];

// DO NOT USE => ONE TIME USE ONLY UNDER navbar.tsx
export function pathIncluded(str) {
	return noNavPaths.some((st) => str.includes(st));
}

export const fetchFrom = async (route, body) => {
	console.log(route, body);
	const data = await fetch(
		(process.env.NEXT_PUBLIC_MIDDLEWARE_API_CALLS ?? "https://cap-middleware-1.vercel.app") + route,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}
	);
	console.log(data);
	const fetched = await data.json();
	console.log(fetched);
	return fetched;
};
