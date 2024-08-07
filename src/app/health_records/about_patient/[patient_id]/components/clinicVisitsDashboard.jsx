import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
import ViewClinicVisit from "./sub_components/viewClinicVisit";
// import AddObservation from "./sub_components/sub_sub_components/addObservation";
import AddClinicVisit from "./sub_components/addClinicVisit";
import * as React from "react";
import BackButton from "./sub_components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useClinicVisitStore from "@/app/clinicVisitStore";

import { getEncounters } from "@/backend/health_records/getEncounter";
export default function ClinicVisits({ patientId }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [lastClicked, setLastClicked] = useState(null);
  const [encounters, setEncounters] = useState([]);
  const [renderingOptions, setRenderingOptions] = useState(5);
  const [selectedEncounterId, setSelectedEncounterId] = useState("");
  const [clinicVisitNumber, setClinicVisitNumber] = useState(0);
  const [sortOptionDate, setSortOptionDate] = React.useState("Recent");
  const resetClinicVisitStore = useClinicVisitStore((state) => state.reset);

  const fetchEncounters = async () => {
    try {
      const encountersData = await getEncounters();
      // Filter encounters by patientId
      const filteredEncounters = encountersData.filter(
        (encounter) => encounter.resource.subject.reference === patientId
      );
      setEncounters(filteredEncounters);
    } catch (error) {
      console.error("Error fetching encounters:", error);
    }
  };

  React.useEffect(() => {
    resetClinicVisitStore(); // Reset the Zustand store when the component is rendered
    async function fetchEncounters() {
      try {
        const encountersData = await getEncounters();
        // Filter encounters by patientId
        const filteredEncounters = encountersData.filter(
          (encounter) => encounter.resource.subject.reference === patientId
        );

        console.log("Encounters Data:", encountersData);

        setEncounters(filteredEncounters);
        console.log("Filtered Encounters:", filteredEncounters);
      } catch (error) {
        console.error("Error fetching encounters:", error);
      }
    }
    fetchEncounters();
  }, [patientId, currentPage]);

  const handleEncounterClick = (id) => {
    setSelectedEncounterId(id); // Set the selected encounter ID
    console.log(selectedEncounterId);
    setCurrentPage(1);
  };

  const handleVisitClick = () => {
    // Increment the currentPage when the user clicks the div
    setCurrentPage(10);
  };

  const addHandleVisitClick = (id, clinicVisitNumber) => {
    // Update lastOpened for the clicked encounter
    const updatedEncounters = encounters?.map((encounter) =>
      encounter.id === id
        ? { ...encounter, lastOpened: new Date().toLocaleString() }
        : encounter
    );

    // Update state with the modified encounters array
    setEncounters(updatedEncounters);

    // Set lastClicked
    setLastClicked(new Date().toLocaleString());

    setClinicVisitNumber(clinicVisitNumber);

    // Pass the encounter ID and clinic visit number to another component or perform any other action
    console.log(id, clinicVisitNumber);
    handleEncounterClick(id);
  };

  const handleDateSort = (value) => {
    setSortOptionDate(value); // Update the sort option

    // Sort encounters based on the selected value without mutating the original state
    const sortedEncounters = [...encounters]?.sort((a, b) => {
      // Convert dates to Date objects
      const dateA = new Date(a.resource.period.start);
      const dateB = new Date(b.resource.period.start);

      // Compare dates based on the selected option
      if (value === "Recent") {
        return dateA - dateB; // Sort from recent to oldest
      } else if (value === "") {
        return dateB - dateA; // Sort from oldest to recent
      }
    });

    // Update the encounters state with sorted encounters
    setEncounters(sortedEncounters);
  };

  return (
    <>
      {currentPage === 0 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-3 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            CLINIC VISIT
            <Button variant="outline" onClick={handleVisitClick}>
              {" "}
              {/* current page = 1 */}
              Add
            </Button>
          </div>
          <div className="mb-8">
            <Tabs defaultValue="all" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="endocrinologist">
                  Endocrinologist
                </TabsTrigger>
                <TabsTrigger value="cardiologist">Cardiologist</TabsTrigger>
                <TabsTrigger value="gastroenterologist">
                  Gastroenterologist
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                {/* Add contents here */}
              </TabsContent>
              <TabsContent value="endocrinologist">
                {/* Add contents here */}
              </TabsContent>
              <TabsContent value="cardiologist">
                {/* Add contents here */}
              </TabsContent>
              <TabsContent value="gastroenterologist">
                {/* Add contents here */}
              </TabsContent>
            </Tabs>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <span className="text-black text-base font-bold leading-5">
                Rendering Options:
              </span>

              <select
                className="ml-2 w-9 h-8 rounded-md border border-gray-500 text-black text-sm  font-normal"
                onChange={(e) => setRenderingOptions(parseInt(e.target.value))}
                defaultValue="5"
              >
                <option value="5" disabled hidden>
                  5
                </option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="10">10</option>
              </select>
              <span className="ml-2 text-black text-base leading-5 font-normal">
                Appointments
              </span>
            </div>

            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="flex items-center py-1 rounded-md">
                    <Button variant="sortfilter">SORT</Button>
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort By Date</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={sortOptionDate}
                    onValueChange={handleDateSort}
                  >
                    <DropdownMenuRadioItem value="Recent">
                      Sort by Most Recent
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Oldest">
                      Sort By Oldest
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {sortOptionDate === "Recent"
            ? encounters
                .slice()
                .reverse()
                .slice(0, renderingOptions)
                ?.map((encounter, index) => (
                  <button
                    key={encounter.id}
                    className="flex mt-4 mb-4 text-sm text-black"
                    onClick={() =>
                      addHandleVisitClick(
                        encounter.id,
                        encounters.length - index
                      )
                    }
                  >
                    <div className="flex justify-between w-full">
                      <Image
                        alt="image"
                        height={0}
                        width={0}
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                        className="self-start aspect-square fill-black w-[15px]"
                      />
                      {/* Display encounter data */}
                      <div className="flex flex-col flex-1 px-3.5 text-left">
                        <div className="font-semibold whitespace-nowrap">
                          Clinic Visit{" "}
                          {
                            new Date(encounter.resource.period.start)
                              .toISOString()
                              .split("T")[0]
                          }
                        </div>
                        <div className="flex justify-between w-fit">
                          <Image
                            alt="picture"
                            height={0}
                            width={0}
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?"
                            className="aspect-[0.86] object-contain object-center w-3 overflow-hidden"
                          />
                          <div className="ml-2 mr-10">
                            Dr.{" "}
                            {encounter.resource.participant &&
                              encounter.resource.participant.actor &&
                              encounter.resource.participant.actor}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))
            : encounters.slice(0, renderingOptions)?.map((encounter, index) => (
                <button
                  key={encounter.id}
                  className="flex mt-4 mb-4 text-sm text-black"
                  onClick={() => addHandleVisitClick(encounter.id, index + 1)}
                >
                  <div className="flex justify-between w-full">
                    <Image
                      alt="image"
                      height={0}
                      width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                      className="self-start aspect-square fill-black w-[15px]"
                    />
                    {/* Display encounter data */}
                    <div className="flex flex-col flex-1 px-3.5 text-left">
                      <div className="font-semibold whitespace-nowrap">
                        Clinic Visit {encounter.resource.period.start}
                      </div>
                      <div className="flex justify-between w-fit">
                        <Image
                          alt="picture"
                          height={0}
                          width={0}
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?"
                          className="aspect-[0.86] object-contain object-center w-3 overflow-hidden"
                        />
                        <div className="ml-2 mr-10">
                          {encounter.resource.participant &&
                            encounter.resource.participant.actor &&
                            encounter.resource.participant.actor}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}

          <BackButton
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        ""
      )}

      {currentPage === 1 ? (
        <>
          <ViewClinicVisit
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            patientId={patientId}
            encounterId={selectedEncounterId}
            clinicVisitNumber={clinicVisitNumber} // Pass clinic visit number here
          />
        </>
      ) : currentPage === 10 ? (
        <>
          <AddClinicVisit
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            patientId={patientId}
            fetchEncounters={fetchEncounters}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
}
