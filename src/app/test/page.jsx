import { db } from "../../../lib/backend/db";
export default async function Notes() {
	const database = db;

	const notes = await database.selectAllFrom("notes-test");
	console.log(notes);

	const specials = await database.selectAllFrom("doctor-specialization");
	console.log(specials);

	return <pre>{JSON.stringify(specials, null, 2)}</pre>;
}
