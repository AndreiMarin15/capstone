import { PUBLIC } from "../public/db";
import { PROJECT } from "../project/db";
import { authentication } from "../auth";
import { currentUser } from "@/app/store";
export const DoctorSignUp = {
  // TODO: ADD SESSION HANDLING
  selectSpecializations: async () => {
    const specializationQuery = await PROJECT.selectAllFrom("specializations");

    return specializationQuery;
  },

  signUpAsDoctor: async (doctorData) => {
    const account = await authentication.signUpNewUser(
      doctorData.email,
      doctorData.password
    );

    console.log(account);
    console.log(account.user.id);
    const doctorInfo = {
      id: account.user.id,
      first_name: doctorData.first_name,
      last_name: doctorData.last_name,
      email: doctorData.email,
      license_id: doctorData.license_id,
      specialization_id: doctorData.specialization_id,
      gender: doctorData.gender,
      birthdate: doctorData.birthdate,
      years_of_practice: doctorData.years_of_practice,
      about: doctorData.about,
      photo: doctorData.photo,
      hospital: doctorData.hospital,
      ptr: doctorData.ptr,
    };

    const practitionerResource = {
      status: "created",
      resource: {
        identifier: account.user.id,
        active: true,
        name: doctorData.first_name + " " + doctorData.last_name,
        telecom: doctorData.email,
        gender: doctorData.gender,
        birthdate: doctorData.birthdate,
        specialization: doctorData.specialization_name,
        qualification: {
          identifier: doctorData.license_id,
        },
      },
    };

    const accountResource = {
      id: account.user.id,
      status: "created",
      resource: {
        identifier: account.user.id,
        description: "Practitioner",
        status: "active",
        name: doctorData.first_name + " " + doctorData.last_name,
        specialization: doctorData.specialization_name,
      },
    };

    const personResource = {
      status: "created",
      resource: {
        identifier: account.user.id,
        description: "Practitioner",
        status: "active",
        name: doctorData.first_name + " " + doctorData.last_name,
        telecom: {
          email: doctorData.email,
        },
        gender: doctorData.gender,
        // birthdate: doctorData.birthdate,
        specialization: doctorData.specialization_name,
      },
    };

    if (account.user.id) {
      const addResource = await PUBLIC.insertIntoNoSelect(
        "practitioner",
        practitionerResource
      );

      fetch("http://localhost:6001/endotracker/doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorData),
      });

      const addPerson = await PUBLIC.insertIntoNoSelect(
        "person",
        personResource
      );
      if (addResource === null && addPerson === null) {
        const addAccount = await PUBLIC.insertIntoNoSelect(
          "account",
          accountResource
        );

        if (addAccount === null) {
          const addDoctor = await PROJECT.insertIntoNoSelect(
            "doctors",
            doctorInfo
          );
          console.log("add", addDoctor);
          if (addDoctor === null) {
            await authentication.mountUser();
            await currentUser.getState().setUser({
              ...doctorInfo,
              fullName: doctorData.first_name + " " + doctorData.last_name,
              type: "doctor",
            });

            return account;
          }
          return {
            message:
              "Server Side Error. Please contact support and try again. 1",
          };
        }

        return {
          message: "Server Side Error. Please contact support and try again. 2",
        };
      }
    }

    return {
      message: "Server Side Error. Please contact support and try again. 3",
    };
  },
};
