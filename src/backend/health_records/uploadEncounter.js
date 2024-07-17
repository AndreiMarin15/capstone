import { PUBLIC } from "../public/db";
import { doctor } from "./doctor";

// FChecking if 6001 is running
const checkPort6001 = async () => {
  try {
    const response = await fetch("http://localhost:6001", {
      method: "GET",
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Functions to Fetch if there is 6001
const makeFetchRequests = async (resource, encounter) => {
  try {
    const patientGetPromise = fetch("http://localhost:6001/endotracker/patient-get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        last_name: resource.resource.subject.patient.personal_information.last_name,
        first_name: resource.resource.subject.patient.personal_information.first_name,
        middle_name: null,
        birthdate: resource.resource.subject.patient.personal_information.birthdate,
        gender: resource.resource.subject.patient.personal_information.gender,
        contact_number: resource.resource.subject.patient.personal_information.contact_number,
        postal_code: resource.resource.subject.patient.personal_information.postal_code,
        state: resource.resource.subject.patient.personal_information.state,
        city: resource.resource.subject.patient.personal_information.city,
        street_address: resource.resource.subject.patient.personal_information.street_address,
      }),
    });

    delete resource.resource.subject.patient.personal_information.photo;

    const encounterPromise = fetch("http://localhost:6001/endotracker/encounter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resource: resource.resource,
        initialDiagnosis: encounter.contained,
      }),
    });

    const signsAndSymptomsPromise = fetch("http://localhost:6001/endotracker/signs-and-symptoms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resource: resource,
        ros: {
          ...encounter.contained[0].values,
          weight_loss: encounter.contained[0].values["Weight Loss"],
          poor_appetite: encounter.contained[0].values["Poor Appetite"],
          heart_palpitation: encounter.contained[0].values["Heart Palpitations"],
          shortness_of_breath: encounter.contained[0].values["Shortness of Breath"],
          abdominal_pain: encounter.contained[0].values["Abdominal Pain"],
          chest_pain: encounter.contained[0].values["Chest Pain"],
        },
      }),
    });

    const vitalsAndBiometricsPromise = fetch("http://localhost:6001/endotracker/vitals-and-biometrics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resource: resource,
        observation: {
          height: {
            value: encounter.contained[7].valueQuantity.value,
            unit: encounter.contained[7].valueQuantity.unit,
          },
          weight: {
            value: encounter.contained[8].valueQuantity.value,
            unit: encounter.contained[8].valueQuantity.unit,
          },
          bmi: {
            value: encounter.contained[9].valueQuantity.value,
            unit: encounter.contained[9].valueQuantity.unit,
          },
          systolic: {
            value: encounter.contained[10].valueQuantity.value,
            unit: encounter.contained[10].valueQuantity.unit,
          },
          diastolic: {
            value: encounter.contained[11].valueQuantity.value,
            unit: encounter.contained[11].valueQuantity.unit,
          },
          heartrate: {
            value: encounter.contained[12].valueQuantity.value,
            unit: encounter.contained[12].valueQuantity.unit,
          },
        },
      }),
    });

    await Promise.all([
      patientGetPromise,
      encounterPromise,
      signsAndSymptomsPromise,
      vitalsAndBiometricsPromise,
    ]);
  } catch (error) {
    console.error("Error in fetch requests:", error);
  }
};

const uploadEncounter = async (encounter) => {
  try {
    const contained = [];

    await Promise.all(
      encounter.contained?.map(async (element) => {
        const fhir = {
          status: "created",
          resource: element,
        };

        const inserted = await PUBLIC.insertInto(
          element.resource_type.toLowerCase(),
          fhir
        );
        contained.push(inserted[0].id);
        if (inserted.status !== 201) {
          return;
        }
      })
    );

    const doctorInfo = await doctor.getDoctorByCurrentUser();
    const data = {
      status: "created",
      resource: {
        id: encounter.id,
        period: encounter.period,
        participant: {
          type: doctorInfo.type,
          actor: doctorInfo.fullName,
          license: doctorInfo.license,
        },
        subject: {
          type: encounter.subject.type,
          reference: encounter.subject.reference,
          patient: encounter.subject.patient,
        },
        contained: contained,
        resource_type: encounter.resource_type,
      },
      resource_type: encounter.resource_type,
    };
    const enc = await PUBLIC.insertInto(data.resource_type.toLowerCase(), data);

    const resource = data;

    const portAvailable = await checkPort6001();

    if (portAvailable) {
      await makeFetchRequests(resource, encounter);
    }

    return { enc, containedIDs: contained };
  } catch (error) {
    throw error;
  }
};

// Export the uploadEncounter function
export default uploadEncounter;
