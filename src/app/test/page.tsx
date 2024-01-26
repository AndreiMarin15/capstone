
import { db } from "../../../lib/backend/db";
export default async function Notes() {
	const database = db;

	const notes = await database.selectAllFrom("notes");

	return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
