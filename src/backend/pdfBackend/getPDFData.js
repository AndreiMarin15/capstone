import { client } from "../initSupabase";
import { currentUser } from "@/app/store";
import { useRecordValidity } from "@/app/store";

const supabase = client("public");
const project = client("project");

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate;
};

export const getPatient = async () => {
  const patient = await project
    .from("patients")
    .select("*")
    .eq("id", currentUser.getState().info.id);

  return patient.data[0];
};

export const getFamilyMemberHistory = async (patientId) => {
  const { data, error } = await supabase
    .from("familymemberhistory")
    .select()
    .eq("resource->>patient", patientId);

  return data;
};

export const getMedicalHistory = async (patientId) => {
  let query = supabase
    .from("observation")
    .select("*")
    .eq("resource->subject->>reference", patientId)
    .or(
      `resource->>id.eq.${"initialDiagnosis"},resource->>id.eq.${"finalDiagnosis"}`
    );
  
   
  // Check if both start and end dates are not null
  console.log(useRecordValidity.getState().start);
  console.log(useRecordValidity.getState().end);
  if (
    useRecordValidity.getState().start !== null &&
    useRecordValidity.getState().end !== null
  ) {
    console.log("triggered");
    query = query
      .gte("ts", useRecordValidity.getState().start)
      .lte("ts", useRecordValidity.getState().end);
  }

  console.log(query);
  const { data, error } = await query
    .order("ts", { ascending: false })
    console.log("MEDICALHIST", data);

  console.log(data);
  console.log(error);

  return data;
};

export const getMedications = async (patientId) => {
  const { data, error } = await supabase
    .from("medicationrequest")
    .select()
    .eq(
      "resource->subject->>reference",
      patientId ?? currentUser.getState().info.id
    )
    .gte(
      "resource->dispenseRequest->validityPeriod->>end",
      new Date().toISOString().slice(0, 10)
    )
    .lte(
      "resource->dispenseRequest->validityPeriod->>start",
      new Date().toISOString().slice(0, 10)
    );
  console.log(data);
  return data;
};

export const getPrescriptions = async (patientId) => {
  const { data, error } = await project
    .from("prescriptions")
    .select()
    .eq("resource->subject->>reference", patientId)
    .order("created_at", { ascending: false })
    .limit(1);

  console.log(data);
  console.log(error);
  return data[0]?.resource?.medicationData;
};

export const getCarePlan = async (patientId) => {
  let query = supabase
    .from("careplan")
    .select()
    .eq("resource->subject->>reference", patientId);

  // Check if both start and end dates are not null
  if (
    useRecordValidity.getState().start !== null &&
    useRecordValidity.getState().end !== null
  ) {
    query = query
      .gte(
        "resource->validityPeriod->>start",
        useRecordValidity.getState().start
      )
      .lte("resource->validityPeriod->>end", useRecordValidity.getState().end);
  }

  const { data, error } = await query;

  return data;
};

export const getLabTests = async (patientId) => {
  let query = supabase
    .from("observation")
    .select()
    .eq(
      "resource->subject->>reference",
      patientId ?? currentUser.getState().info.id
    )
    .eq("resource->>id", "labtest");

  // Check if both start and end dates are not null
  console.log(useRecordValidity.getState().start);
  console.log(useRecordValidity.getState().end);
  if (
    useRecordValidity.getState().start !== null &&
    useRecordValidity.getState().end !== null
  ) {
    query = query
      .gte("ts", useRecordValidity.getState().start)
      .lte("ts", useRecordValidity.getState().end);
  }

  const { data, error } = await query;
  return data;
};

export const getRequestedLabTests = async () => {
  const { data, error } = await supabase
    .from("observation")
    .select()
    .eq("resource->subject->>reference", currentUser.getState().info.id)
    .eq("resource->>id", "labtest");
  // .eq("resource->>status", "requested");

  return data;
};
export const getReferralHistory = async (patientId) => {
  const { data, error } = await project
    .from("referrals")
    .select()
    .eq("patient_id", patientId);

  const doctorIds = data.map((referral) => referral.referred_to);

  const { data: doctors, error: doctorsError } = await project
    .from("doctors")
    .select()
    .in("id", doctorIds);

  const { data: specializations, error: specializationsError } = await project
    .from("specializations")
    .select();

  const referralHistory = doctors.map((doctor, index) => {
    const specialization = specializations.find(
      (specialization) => specialization.id === doctor.specialization_id
    );
    const referral = data.find(
      (referral) => referral.referred_to === doctor.id
    );

    return {
      number: index + 1,
      referredto: doctor.first_name + " " + doctor.last_name,
      specialization: specialization.doctor_specialization_name,
      date: formatTimestamp(referral.created_at),
    };
  });

  return referralHistory;
};

export const getDoctorByLicense = async (doctor_license) => {
  const { data, error } = await project
    .from("doctors")
    .select()
    .eq("license_id", doctor_license);
  console.log(data[0]);
  console.log(doctor_license);
  console.log(error);
  return data[0];
};

export const getPatientById = async (patientId) => {
  const { data, error } = await project
    .from("patients")
    .select()
    .eq("id", patientId);

  return data[0];
};

export const getDoctorSpecialization = async (doctor_license) => {
  const { data, error } = await project
    .from("doctors")
    .select()
    .eq("license_id", doctor_license);

  const { data: specializations, error: specializationsError } = await project
    .from("specializations")
    .select();

  const specialization = specializations.find(
    (specialization) => specialization.id === data[0]?.specialization_id
  );

  console.log(specialization?.doctor_specialization_name);
  return specialization?.doctor_specialization_name;
};

export const getDoctorHospital = async (doctor_license) => {
  const { data, error } = await project
    .from("doctors")
    .select()
    .eq("license_id", doctor_license);

  console.log(data[0]?.hospital?.name);
  return data[0]?.hospital?.name;
};

export const getAttendingDoctors = async (patientId) => {
  const { data, error } = await project
    .from("attending_doctors")
    .select()
    .eq("patient_id", patientId);

  if (error) {
    // Handle the error appropriately
    console.error(error);
    return [];
  }

  // Filter out duplicates based on license_id
  const uniqueDoctors = data.reduce((acc, current) => {
    const x = acc.find((item) => item.license_id === current.license_id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  return uniqueDoctors;
};

function generateSystemsString(systems) {
  let systemsString = "";
  Object.entries(systems).forEach(([key, value]) => {
    if (value) {
      systemsString += `${key}, `;
    }
  });

  if (systemsString === "") {
    systemsString = "No Symptoms Reported";
  } else {
    // Remove the last comma and space
    systemsString = systemsString.slice(0, -2);
  }

  return systemsString;
}

export const getClinicVisits = async (patientId) => {
  try {
    console.log(patientId);
    const { data, error } = await supabase
      .from("encounter")
      .select("*")
      .eq("resource->subject->patient->>id", patientId);

    if (error) throw error;

    console.log(data);
    const observationObjects = data.map((encounter) => ({
      date: formatTimestamp(encounter.ts),
      doctor: encounter.resource?.participant,
      observations: encounter.resource?.contained,
    }));

    console.log(observationObjects);

    const clinicVisits = [];
    for (const observationObject of observationObjects) {
      const observationsData = await fetchObservationsData(
        observationObject.observations
      );
      const doctorSpecialization = await getDoctorSpecialization(
        observationObject.doctor.license
      );

      const visitObject = {
        date: observationObject.date ?? "",
        provider: observationObject.doctor.actor ?? "",
        specialization: doctorSpecialization ?? "",
        signsandsymptoms: observationsData.signsAndSymptoms ?? "",
        ros: observationsData.reviewOfSystems ?? "",
        otherconcerns: observationsData.otherConcerns ?? "",
      };

      clinicVisits.push(visitObject);
    }

    console.log(clinicVisits);
    return clinicVisits;
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
};

async function fetchObservationsData(observations) {
  const observationsData = {
    signsAndSymptoms: "",
    reviewOfSystems: "",
    otherConcerns: "",
  };

  for (const observationType of Object.keys(observationsData)) {
    const { data, error } = await supabase
      .from("observation")
      .select("*")
      .eq("resource->>id", observationType)
      .in("id", observations);

    if (error) throw error;

    if (data.length > 0) {
      const observationValue = data[0].resource.valueString;
      observationsData[observationType] =
        observationType === "reviewOfSystems"
          ? generateSystemsString(JSON.parse(observationValue))
          : observationValue;
    }
  }

  return observationsData;
}
