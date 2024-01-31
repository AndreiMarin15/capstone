import { PROJECT } from "../../../lib/backend/project/db";
import { PUBLIC } from "../../../lib/backend/public/db";
export default async function Notes() {
	const database = PROJECT;

	const fhir = {
		
	}

	const test = await database.selectAllFrom("specializations");
	console.log(test);

	return <pre>{JSON.stringify(test, null, 2)}</pre>;
}
