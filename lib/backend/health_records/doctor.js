import { currentUser } from "../../../src/app/store";
import { login } from "../../backend/login/login";

export const doctor = {
    getDoctorByCurrentUser: async () => {
        // Get current user's information
        const { user } = currentUser.getState();

        // Check if the user is a doctor
        if (user && user.fullName) {
            // If the user has a full name, assume they are a doctor
            // You can proceed to use the full name directly
            const fullName = user.fullName;

            // Now you can use fullName as needed
            console.log("Full Name:", fullName);

            // Return the doctor's full name
            return fullName;
        } else {
            // If the current user does not have a full name, handle accordingly
            console.log("Full name not available for current user.");
            return null;
        }
    },
};


  export default doctor;