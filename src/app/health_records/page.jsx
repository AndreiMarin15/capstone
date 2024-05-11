"use client";
import * as React from "react";
import Navbar from "../navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { healthRecords } from "../lib/backend/health_records/health_records";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function MyComponent() {
	const [navigation, setNavigation] = React.useState([]);
	const [originalPatients, setOriginalPatients] = React.useState([]);
	const [sortOptionName, setSortOptionName] = React.useState("asc");
	const [sortOptionAge, setSortOptionAge] = React.useState("youngest");
	const [selectedGenders, setSelectedGenders] = React.useState([]);

	function computeAge(birthdate) {
		const dob = new Date(birthdate);
		const today = new Date();
		let age = today.getFullYear() - dob.getFullYear();
		const m = today.getMonth() - dob.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
			age--;
		}
		return age;
	}

	const fetchData = async () => {
		const patients = await healthRecords.getPatients();
		setOriginalPatients(patients);

		const nameSortFunction = (a, b) => {
			const nameA = `${a.personal_information.first_name} ${a.personal_information.last_name}`.toLowerCase();
			const nameB = `${b.personal_information.first_name} ${b.personal_information.last_name}`.toLowerCase();

			if (sortOptionName === "asc") {
				return nameA.localeCompare(nameB);
			} else if (sortOptionName === "desc") {
				return nameB.localeCompare(nameA);
			}
		};

		patients.sort(nameSortFunction);

		const ageSortFunction = (a, b) => {
			if (sortOptionAge === "youngest") {
				return computeAge(a.personal_information.birthdate) - computeAge(b.personal_information.birthdate);
			} else if (sortOptionAge === "oldest") {
				return computeAge(b.personal_information.birthdate) - computeAge(a.personal_information.birthdate);
			}
		};

		patients.sort(ageSortFunction);

		setNavigation(
			patients.map((patient) => ({
				name: `${patient.personal_information.first_name} ${patient.personal_information.last_name}`,
				age: computeAge(patient.personal_information.birthdate),
				href: `/health_records/about_patient/${patient.id}`,
				src: patient.personal_information.photo,
				gender: patient.personal_information.gender,
			}))
		);
	};

	React.useEffect(() => {
		fetchData();
	}, [sortOptionName, sortOptionAge]);

	React.useEffect(() => {
		console.log(navigation);
	}, [navigation]);

	const router = useRouter();

	const handleGenderFilter = (gender) => {
		setSelectedGenders((prevSelectedGenders) => {
			if (prevSelectedGenders.includes(gender)) {
				return prevSelectedGenders.filter((selectedGender) => selectedGender !== gender);
			} else {
				return [...prevSelectedGenders, gender];
			}
		});
	};

	React.useEffect(() => {
		const filterAndSortPatients = () => {
			if (selectedGenders.length === 0) {
				// If no filters are applied, show original patients
				setNavigation(
					originalPatients.map((patient) => ({
						name: `${patient.personal_information.first_name} ${patient.personal_information.last_name}`,
						age: computeAge(patient.personal_information.birthdate),
						href: `/health_records/about_patient/${patient.id}`,
						src: patient.personal_information.photo,
						gender: patient.personal_information.gender,
					}))
				);
				return; // Exit early to prevent further processing
			}

			let filteredPatients = [...originalPatients];

			filteredPatients = filteredPatients.filter((patient) =>
				selectedGenders.includes(patient.personal_information.gender.toLowerCase())
			);

			const sortedPatients = filteredPatients.sort((a, b) => {
				const nameA = `${a.personal_information.first_name} ${a.personal_information.last_name}`.toLowerCase();
				const nameB = `${b.personal_information.first_name} ${b.personal_information.last_name}`.toLowerCase();
				if (sortOptionName === "asc") {
					return nameA.localeCompare(nameB);
				} else if (sortOptionName === "desc") {
					return nameB.localeCompare(nameA);
				}
				return 0;
			});

			setNavigation(
				sortedPatients.map((patient) => ({
					name: `${patient.personal_information.first_name} ${patient.personal_information.last_name}`,
					age: computeAge(patient.personal_information.birthdate),
					href: `/health_records/about_patient/${patient.id}`,
					src: patient.personal_information.photo,
					gender: patient.personal_information.gender,
				}))
			);
		};

		filterAndSortPatients();
	}, [selectedGenders, sortOptionName, originalPatients]);

	const handleNameSort = (option) => {
		setSortOptionName(option);
		if (option === "asc" || option === "desc") {
			setSortOptionAge(null);
		}
	};

	const handleAgeSort = (option) => {
		setSortOptionAge(option);
		if (option === "youngest" || option === "oldest") {
			setSortOptionName(null);
		}
	};

	return (
		<div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 min-h-screen w-full">
			<div className="w-full max-md:max-w-full h-full">
				<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0 h-full">
					<div className="flex flex-col items-stretch w-[70%] ml-5 max-md:w-full max-md:ml-0">
						<span className="flex flex-col items-stretch mt-8 ml-5 w-full max-md:max-w-full max-md:mt-10">
							<div className="text-black text-xl font-semibold leading-8 max-md:max-w-full mb-10">Health Records</div>
							<span className="flex w-full items-center justify-between gap-5 mt-8 mb-8 max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-md:pr-5">
								<div className="text-black text-base font-medium leading-6 my-auto">PATIENTS</div>
								<div className="self-stretch flex items-stretch justify-between gap-2.5">
									<span className="flex items-stretch justify-between gap-2 py-2 rounded-md border-[0.5px] border-solid border-black">
										<Image
											alt="picture"
											height={0}
											width={0}
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?"
											className="aspect-square object-contain object-center w-[13px] fill-stone-300 overflow-hidden shrink-0 max-w-full"
										/>
										<div className="text-stone-300 text-xs leading-5 my-auto" style={{ paddingRight: "300px" }}>
											SEARCH
										</div>
									</span>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<button className="flex gap-1 px-5 py-2 text-xs rounded-md border border-black border-solid">
												<Image
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/1815063a9248e003b79041a817235f1997954e6c1ef9ef5b1f105c020315d455?"
													width="100"
													height="100"
													className="shrink-0 w-3 aspect-[0.85]"
													alt="img"
												/>
												<div className="self-start">FILTER</div>
											</button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="w-56">
											<DropdownMenuLabel>Gender</DropdownMenuLabel>
											<DropdownMenuSeparator />

											<DropdownMenuCheckboxItem
												checked={selectedGenders.includes("male")}
												onCheckedChange={() => handleGenderFilter("male")}
											>
												Male
											</DropdownMenuCheckboxItem>
											<DropdownMenuCheckboxItem
												checked={selectedGenders.includes("female")}
												onCheckedChange={() => handleGenderFilter("female")}
											>
												Female
											</DropdownMenuCheckboxItem>
										</DropdownMenuContent>
									</DropdownMenu>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<button className="grow justify-center text-xs px-6 py-2 rounded-md border border-black border-solid">
												SORT
											</button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="w-56">
											<DropdownMenuLabel>Sort By Name</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuRadioGroup value={sortOptionName} onValueChange={handleNameSort}>
												<DropdownMenuRadioItem value="asc">A-Z</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value="desc">Z-A</DropdownMenuRadioItem>
											</DropdownMenuRadioGroup>
											<DropdownMenuLabel>Sort By Age</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuRadioGroup value={sortOptionAge} onValueChange={handleAgeSort}>
												<DropdownMenuRadioItem value="youngest">Youngest</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
											</DropdownMenuRadioGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</span>
						</span>

						{navigation.map((item) => (
							<div key={item.name} className="ml-5 flex w-full flex-col">
								<button
									className="flex w-full items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap"
									onClick={() => {
										router.push(item.href);
									}}
								>
									<div className="flex items-center gap-5">
										<Image
											alt="picture"
											height={0}
											width={0}
											loading="lazy"
											src={
												item.src
													? item.src
													: "https://cdn.builder.io/api/v1/image/assets/TEMP/5fee24394139ee09d61af596b82e9174ea8a73c2e68f5ff59e2c793c7b2e08ee?"
											}
											className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
										/>
										<div className="flex flex-col items-start">
											<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">{item.name}</div>
											<div className="text-black text-xs mt-2">AGE: {item.age}</div>
										</div>
									</div>
								</button>
								<div className="border-b border-gray-300 w-full mb-2 mt-2"></div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
