import { PUBLIC } from "../public/db";
import { PROJECT } from "../project/db";
import { client } from "../initSupabase";
import { authentication } from "../auth";
import { currentUser } from "@/app/store";
import { newChat } from "../message/getMessages";
const supabase = client("project");
export const PatientSignUp = {
  getDoctors: async () => {
    const doctors = await PROJECT.selectAllFrom("doctors");

    const toReturn = doctors.filter(
      (doctor) => parseInt(doctor.specialization_id) === 1,
    );

    console.log(toReturn);
    return toReturn;
  },
  signUpAsPatient: async (userData, patientData) => {
    const account = await authentication.signUpNewUser(
      userData.email,
      userData.password,
    );

    if (account.user != null) {
      const fhirResources = {
        account: {
          id: account.user.id,
          status: "created",
          resource: {
            identifier: account.user.id,
            name:
              patientData.personal_information.first_name +
              " " +
              patientData.personal_information.last_name,
            descripton: "Patient",
          },
        },

        person: {
          status: "created",
          resource: {
            identifier: account.user.id,
            name:
              patientData.personal_information.first_name +
              " " +
              patientData.personal_information.last_name,
            telecom: {
              email: userData.email,
            },
            gender: patientData.personal_information.gender,
            birthdate: patientData.personal_information.birthdate,
            deceased: false,
            address: {
              street_address: patientData.personal_information.street_address,
            },
            photo: patientData.personal_information.photo,
          },
        },

        patient: {
          status: "created",
          resource: {
            philhealth_id: patientData.personal_information.philhealth_id,
            identifier: account.user.id,
            active: true,
            name:
              patientData.personal_information.first_name +
              " " +
              patientData.personal_information.last_name,
            telecom: {
              email: userData.email,
            },
            gender: patientData.personal_information.gender,
            birthdate: patientData.personal_information.birthdate,
            deceased: false,
            address: {
              street_address: patientData.personal_information.street_address,
            },
            photo: patientData.personal_information.photo,
          },
        },

        allergyintolerance: {
          status: "created",
          resource: {
            id: "",
            type: "", // yung allergen
            category: "",
            reaction: {
              substance: "", // id
              description: "", // disease
            },
            note: "",
            patient: "", // id
            severity: "", // mild moderate severe
          }, // mag for each na loop to populate and isa isa ilagay sa db
        },

        familymemberhistory: {
          status: "created",
          resource: {
            identifier: "",
            patient: account.user.id,
            name: "",
            relationship: "",
            sex: "",
            age: "",
            condition: {
              code: "",
              outcome: "",
              onset: "",
            },
            procedure: [],
          }, // mag for each na loop to populate and isa isa ilagay sa db
        },
      };

      const patientInfo = {
        id: account.user.id,
        ...patientData,
      };
      console.log("account.user.id", account.user.id);
      if (account.user.id) {
        const addResource = await PUBLIC.insertIntoNoSelect(
          "patient",
          fhirResources.patient,
        );
        console.log(addResource);
        const addPerson = await PUBLIC.insertIntoNoSelect(
          "person",
          fhirResources.person,
        );
        console.log(addPerson);
        if (addResource === null && addPerson === null) {
          const addAccount = await PUBLIC.insertIntoNoSelect(
            "account",
            fhirResources.account,
          );
          console.log(addAccount);
          if (addAccount === null) {
            const addPatient = await PROJECT.insertIntoNoSelect(
              "patients",
              patientInfo,
            );
            console.log(addPatient);

            //TODO: UPDATE
            // const addAllergiIntolerance = await PUBLIC.insertInto("allergyintolerance", fhirResources.allergyintolerance)

            await patientData.allergies.forEach(async (allergy) => {
              const aller = {
                status: "created",
                resource: {
                  id: account.user.id,
                  type: allergy.allergen, // yung allergen
                  category: allergy.category_of_allergen,
                  reaction: allergy.reactions,
                  note: allergy.comments,
                  patient: account.user.id, // id
                  severity: allergy.severity_of_allergy, // mild moderate severe
                  onset: allergy.date_of_onset,
                }, // mag for each na loop to populate and isa isa ilagay sa db
              };

            await PUBLIC.insertIntoNoSelect("allergyintolerance", aller);
            });

            // const addFamilyMemberHistory = await PUBLIC.insertInto("familymemberhistory", fhirResources.familymemberhistory)

            await patientData.family_history.forEach(async (family) => {
              const fam = {
                status: "created",
                resource: {
                  identifier: account.user.id,
                  patient: account.user.id,
                  name: `${family.first_name} ${family.last_name}`,
                  relationship: family.relationship,
                  sex: family.gender,
                  age: family.age,
                  condition: {
                    code: family.medical_condition,
                    outcome: family.medical_condition_outcome,
                    onset: family.medical_condition_date,
                  },
                  procedure: family.medical_procedures,
                }, // mag for each na loop to populate and isa isa ilagay sa db
              };

              await PUBLIC.insertIntoNoSelect("familymemberhistory", fam);
            });

            if (addPatient === null) {
              await authentication.mountUser();
              await currentUser.getState().setUser({
                ...patientInfo,
                fullName:
                  patientData.personal_information.first_name +
                  " " +
                  patientData.personal_information.last_name,
                type: "patient",
              });
              await newChat(patientData.personal_information.attendingDoctor);
              console.log("1");
              return account;
            }

            return {
              message:
                "Server Side Error. Please contact support and try again.",
            };
          }

          return {
            message: "Server Side Error. Please contact support and try again.",
          };
        }
      }

      return {
        message: "Server Side Error. Please contact support and try again.",
      };
    } else {
      await newChat(patientData.personal_information.attendingDoctor);
      return account;
    }
  },

  retrieveReactions: async (codes) => {
    let results = [];

    for (let code of codes) {
      const { data, error } = await supabase
        .from("icd10")
        .select("*")
        .like("id", `%${code}%`);

      if (error) {
        console.error("Error: ", error);
      } else {
        results.push(...data);
      }
    }

    const reactions = results;

    return reactions;
  },

  retrieveMedications: async () => {
    const drugs = await PROJECT.selectAllFrom("doh-drug");

    return drugs;
  },
};
