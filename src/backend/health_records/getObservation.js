import { PUBLIC } from "../public/db";
import { client } from "../initSupabase";
export const supabase = client("public");

export async function getObservation() {
	try {
		// Assuming "observation" is the table name in your backend database
		const observationsData = await PUBLIC.selectFrom("observation");
		console.log(observationsData);
		return observationsData;
	} catch (error) {
		console.error("Error fetching observations:", error);
		throw error;
	}
}

export async function getObservationsWithLabTest() {
	try {
		// Fetch observations where the resource column contains JSON with id set to "labtest"
		const { data: observations, error } = await supabase
			.from("observation")
			.select("*")
			.contains("resource", { id: "labtest" });

		if (error) {
			console.error("Error fetching observations with labtest ID:", error);
			throw error;
		}

		console.log(observations);
		return observations;
	} catch (error) {
		console.error("Error fetching observations with labtest ID:", error);
		throw error;
	}
}

export async function getObservationsByPatientId(patientId) {
	try {
		if (!patientId) {
			throw new Error("Patient ID is required");
		}

		const { data: observations, error } = await supabase
			.from("observation")
			.select("*")
			.contains("resource", { subject: { reference: patientId } });

		if (error) {
			console.error("Error fetching observations by patient ID:", error);
			throw error;
		}

		console.log(observations);
		return observations;
	} catch (error) {
		console.error("Error fetching observations by patient ID:", error);
		throw error;
	}
}

export async function getFinalDiagnosisObservations(patientId) {
	try {
		console.log(patientId);
		// Fetch observations where the resource column contains JSON with id set to "Final Diagnosis"
		const { data: observations, error } = await supabase
			.from("observation")
			.select("*")
			.contains("resource", { id: "finalDiagnosis" })
			// .order("created_at", { ascending: false })
			// .limit(1);
			.eq("resource->subject->>reference", patientId);
		// .order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching observations with Final Diagnosis ID:", error);
			throw error;
		}

		console.log(observations);
		return observations;
	} catch (error) {
		console.error("Error fetching observations with Final Diagnosis ID:", error);
		throw error;
	}
}

export async function getSpecificMeasurementsObservations(patientId) {
	try {
		const measurementIds = [
			"height",
			"weight",
			"bmi",
			"systolic",
			"diastolic",
			"heartRate"
		];

		const { data: observations, error } = await supabase
				.from("observation")
				.select("*")
				.eq("resource->subject->>reference", patientId)
				.or(
					measurementIds
						.map(id => `resource->>id.eq.${id}`)
						.join(',')
				);

		if (error) {
			console.error("Error fetching observations with specified measurement IDs:", error);
			throw error;
		}

		console.log(observations);
		return observations;
	} catch (error) {
		console.error("Error fetching observations with specified measurement IDs:", error);
		throw error;
	}
}




export async function getMostRecentConditionObservations(patientId) {
    try {
        // Fetch observations where the resource column contains JSON with id set to "condition"
        const { data: observations, error } = await supabase
            .from("observation")
            .select("*")
            .contains("resource", { id: "condition" })
            .order("ts", { ascending: false })
            .limit(1)
            .eq("resource->subject->>reference", patientId);

        if (error) {
            console.error("Error fetching observations with Condition ID:", error);
            throw error;
        }

        console.log(observations);
        return observations;
    } catch (error) {
        console.error("Error fetching observations with Condition ID:", error);
        throw error;
    }
}
export async function getObservationById(observationId) {
	try {
		if (!observationId) {
			throw new Error("Observation ID is required");
		}

		const { data: observation, error } = await supabase
			.from("observation")
			.select("*")
			.eq("id", observationId)
			.single();

		if (error) {
			console.error("Error fetching observation by ID:", error);
			throw error;
		}

		console.log(observation);
		return observation;
	} catch (error) {
		console.error("Error fetching observation by ID:", error);
		throw error;
	}
}

export async function getSelfPrickObservations(patientId) {
    try {
        if (!patientId) {
            throw new Error("Patient ID is required");
        }

        const { data: observations, error } = await supabase
		.from("observation")
		.select("*")
		.contains("resource", { id: "selfprick" })
		.eq("resource->subject->>reference", patientId);

        if (error) {
            console.error("Error fetching selfprick observations by patient ID:", error);
            throw error;
        }

        console.log(observations);
        return observations;
    } catch (error) {
        console.error("Error fetching selfprick observations by patient ID:", error);
        throw error;
    }
}


export async function updateObservation(observationId, updatedObservationData) {
	try {
		// Update the observation with the provided observationId
		const { data: updatedObservation, error } = await supabase
			.from("observation")
			.update(updatedObservationData)
			.eq("id", observationId);

		// Check for errors
		if (error) {
			console.error("Error updating observation:", error.message);
			throw error;
		}

		// Return the updated observation data
		return updatedObservation;
	} catch (error) {
		console.error("Error updating observation:", error.message);
		throw error;
	}
}

export async function getObservationsByEncounterId(encounterId) {
    try {
        if (!encounterId) {
            throw new Error("Encounter ID is required");
        }

        const { data: observations, error } = await supabase
            .from("observation")
            .select("*")
            .contains("resource", { encounter: { reference: encounterId } });

        if (error) {
            console.error("Error fetching observations by encounter ID:", error);
            throw error;
        }

        console.log(observations);
        return observations;
    } catch (error) {
        console.error("Error fetching observations by encounter ID:", error);
        throw error;
    }
}