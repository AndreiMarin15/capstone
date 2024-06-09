import { currentUser } from "@/app/store";
import { client } from "../initSupabase";
const supabase = client("public");
const project = client("project");

export const getOverduePatients = async () => {
	// Calculate the date two weeks ago
	const twoWeeksAgo = new Date();
	twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14); // Subtract 14 days
	const formattedDate = twoWeeksAgo.toISOString().split("T")[0]; // Format to "YYYY-MM-DD"
	console.log("FORMATTED DATE", formattedDate);
	// Fetch all observations before two weeks ago
	let { data: observations, error } = await supabase
		.from("observation")
		.select("*")
		.eq("resource->>id", "suggestedNextVisit")
		.lte("resource->>valueString", formattedDate);

	if (error) {
		console.error("Error fetching observations:", error);
		console.log("ERROR", error);
		return;
	}

	console.log("OBSERVATIONS", observations);

	// Group observations by `resource.subject.reference`
	const groupedObservations = observations.reduce((acc, observation) => {
		const reference = observation.resource.subject.reference;
		if (!acc[reference]) {
			acc[reference] = [];
		}
		acc[reference].push(observation);
		return acc;
	}, {});

	console.log("GROUPED OBSERVATIONS", groupedObservations);

	// For each group, find the most recent observation
	const mostRecentObservations = Object.values(groupedObservations).map((group) => {
		return group.reduce((mostRecent, current) => {
			const currentDate = new Date(current.resource.valueString);
			if (!mostRecent || currentDate > new Date(mostRecent.resource.valueString)) {
				return current;
			}
			return mostRecent;
		}, null);
	});

	console.log("MOST RECENT OBSERVATIONS", mostRecentObservations);

	// Assuming getCurrentUser is a function that retrieves the current user's details
	const user = currentUser.getState().user;
	console.log("USER", user);

	const currentUserFullName = `${user.first_name} ${user.last_name}`;
	console.log("FULL NAME", currentUserFullName);

	console.log("FNAME", currentUserFullName);
	// Filter mostRecentObservations based on resource.participant.actor
	const filteredObservations = mostRecentObservations.filter((observation) => {
		// Assuming resource.participant is an array of participants
		// and we're looking for any match of actor with currentUserFullName
		console.log(observation.resource.participant);
		console.log(currentUserFullName === observation.resource.participant.actor);

		return currentUserFullName === observation.resource.participant.actor;
		// return observation.resource.participant.some((participant) => participant.actor === currentUserFullName);
	});
	console.log("FILTERED OBSERVATIONS", filteredObservations);

	return filteredObservations;
};

export const getPatientAndFinalDiagnosis = async (patientId) => {
	console.log("PATIENT ID", patientId);
	const { data: patient, error } = await project.from("patients").select("*").eq("id", patientId);

	if (error) {
		console.error("Error fetching patient:", error);
		return;
	}
	console.log("PATIENT", patient);

	const { data: diagnosis, error: diagnosisError } = await supabase
		.from("observation")
		.select("*")
		.eq("resource->subject->>reference", `${patientId}`)
		.eq("resource->>id", "finalDiagnosis")
		.order("ts", { ascending: false })
		.limit(1);

	if (diagnosisError) {
		console.error("Error fetching diagnosis:", diagnosisError);
		return;
	}
	console.log("DIAGNOSIS", diagnosis);

	console.log("PATIENT", patient);
	console.log("DIAGNOSIS", diagnosis);
	return { patient, diagnosis };
};

export const getCriticalPatients = async () => {
	const { data: observations, error } = await supabase
		.from("observation")
		.select("*")
		.eq("resource->>id", "condition")
		.eq("resource->>valueString", "Patient’s condition is critical and requires immediate attention or intervention.")
		.eq(
			"resource->participant->>actor",
			`${currentUser.getState().user.first_name} ${currentUser.getState().user.last_name}`
		);
	console.log("OBSERVATIONS", observations);
	if (error) {
		console.error("Error fetching observations:", error);
		return;
	}

	// Assuming there's a timestamp field in your observation data to sort by
	const latestObservations = observations.reduce((acc, observation) => {
		const reference = observation.resource.subject.reference;
		if (!acc[reference]) {
			acc[reference] = observation;
		} else {
			// Replace if the current observation is more recent
			const existingTimestamp = new Date(acc[reference].resource.timestamp).getTime();
			const currentTimestamp = new Date(observation.resource.timestamp).getTime();
			if (currentTimestamp > existingTimestamp) {
				acc[reference] = observation;
			}
		}
		return acc;
	}, {});

	// Convert the object back to an array of observations
	return Object.values(latestObservations);
};