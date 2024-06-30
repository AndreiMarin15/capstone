import { currentUser } from "@/app/store";
import { PROJECT } from "../project/db"; // Adjust the import path as necessary

export const doctor = {
    getDoctorByCurrentUser: async () => {
        const { user } = currentUser.getState();
        console.log(user);
        if (user && user.fullName) {
            const fullName = user.fullName;
            const type = user.type;
            const license = user.license_id;

            // Fetch specialization name from the database
            const specializationData = await PROJECT.selectAllFrom('specializations');

            if (!specializationData || specializationData.length === 0) {
                console.error("Error fetching specializations or no specializations found");
                return null;
            }

            // Find the specialization name that matches the user's specialization_id
            const specialization = specializationData.find(spec => spec.id === user.specialization_id)?.doctor_specialization_name;

            if (!specialization) {
                console.error("Specialization not found for the user's specialization_id");
                return null;
            }

            console.log("Full Name:", fullName);
            console.log("Type:", type);
            console.log("License:", license);
            console.log("Specialization:", specialization);

            return { fullName, type, license, specialization };
        } else {
            console.log("Full name not available for current user.");
            return null;
        }
    },
};

export default doctor;
