import { authentication } from "../auth";
import { currentUser, useUserInfo } from "@/app/store";
import { PROJECT } from "../project/db";

export const login = {
  loginUser: async () => {
    const user = await authentication.signInWithEmail(
      useUserInfo.getState().email,
      useUserInfo.getState().password
    );

    authentication.mountUser();

    const userType = await login.getUserType();
	console.log(userType);
    if (userType === "patient") {
      await login.setPatient();
    } else if (userType === "doctor") {
      await login.setDoctor();
    }

    console.log(currentUser.getState());
    return { user, userType };
  },

  getUserType: async () => {
    let query = {};

    console.log("info", currentUser.getState().info);
    console.log("user", currentUser.getState().user);
    if (currentUser.getState().info.id) {
      query = await PROJECT.selectFrom("doctors", {
        column: "id",
        value: currentUser.getState().info.id,
      });
      console.log(query);

      if (!query.length) {
        query = await PROJECT.selectFrom("patients", {
          column: "id",
          value: currentUser.getState().info.id,
        });
        console.log(query);
        if (!query.length) {
          return null;
        }

        return "patient";
      }

      return "doctor";
    }

    return null;
  },

  getDoctorSpecialization: () => {
    return currentUser.getState().user.specialization_id;
  },

  setPatient: async () => {
    const patient = await PROJECT.selectFrom("patients", {
      column: "id",
      value: currentUser.getState().info.id,
    });

    // Parse the personal_information jsonb data into a JSON object
    const personalInformation = patient[0].personal_information;

    const firstName = personalInformation.first_name;
    const lastName = personalInformation.last_name;

    currentUser.getState().setUser({
      ...patient[0],
      fullName: `${firstName} ${lastName}`,
      type: "patient",
    });

    return currentUser.getState();
  },

  setDoctor: async () => {
    const doctor = await PROJECT.selectFrom("doctors", {
      column: "id",
      value: currentUser.getState().info.id,
    });

    const firstName = doctor[0].first_name;
    const lastName = doctor[0].last_name;

    currentUser.getState().setUser({
      ...doctor[0],
      fullName: `${firstName} ${lastName}`,
      type: "doctor",
    });

    console.log(currentUser.getState());
    return currentUser.getState();
  },
};
