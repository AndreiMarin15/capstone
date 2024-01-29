export {};

declare global {
	type StatusProps = {
		statusText: string;
	};
	type ProgressBarProps = {
		currentStep: 1 | 2 | 3 | 4;
	};

	type DoctorInfo = {
		email: string,
		password: string,
		doctor_license: {
			license_number: string;
		};
		setDoctor_license: (item: { license_number: string }) => void;
	
		last_name: string;
		setLast_name: (item: string) => void;
	
		first_name: string;
		setFirst_name: (item: string) => void;
	
		specialization_id: number;
		setSpecialization_id: (item: number) => void;
	}

	
}
