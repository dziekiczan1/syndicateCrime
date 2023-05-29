import InputField from "@/components/auth/InputField";
import { useState } from "react";
import styles from "./RobberyContent.module.scss";

interface Place {
  name: string;
  energyCost: number;
  successProbability: number;
}

const RobberyContent: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // const handlePlaceSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedPlaceName = event.target.value;
  //   const place = places.find((p) => p.name === selectedPlaceName) || null;
  //   setSelectedPlace(place);
  // };

  const handlePlaceSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const selected = places.find((place) => place.name === value);
    setSelectedPlace(selected);
  };

  const places: Place[] = [
    { name: "Warehouse", energyCost: 5, successProbability: 100 },
    { name: "Antique Store", energyCost: 8, successProbability: 37 },
    { name: "Hotel", energyCost: 10, successProbability: 18 },
    { name: "Train Station", energyCost: 12, successProbability: 7 },
    { name: "Art Gallery", energyCost: 15, successProbability: 3 },
    { name: "Penthouse", energyCost: 20, successProbability: 1 },
    { name: "Museum", energyCost: 25, successProbability: 0 },
    { name: "Mall", energyCost: 30, successProbability: 0 },
    { name: "Mansion", energyCost: 35, successProbability: 0 },
    { name: "Amusement Park", energyCost: 40, successProbability: 0 },
    { name: "Jewelry Store", energyCost: 40, successProbability: 0 },
    { name: "Diamond Exchange", energyCost: 45, successProbability: 0 },
    { name: "Sports Stadium", energyCost: 45, successProbability: 0 },
    { name: "Bank", energyCost: 50, successProbability: 0 },
    { name: "Government Building", energyCost: 50, successProbability: 0 },
    { name: "Corporate Office", energyCost: 50, successProbability: 0 },
    { name: "Yacht", energyCost: 50, successProbability: 0 },
    { name: "Luxury Car Dealership", energyCost: 50, successProbability: 0 },
    { name: "Casino", energyCost: 50, successProbability: 0 },
    { name: "Airport Vault", energyCost: 50, successProbability: 0 },
  ];

  return (
    <section className={styles.container}>
      <div>
        <p>
          Experience the thrill of high-stakes robberies. Plan, execute, and
          reap the rewards as you embark on daring heists in pursuit of wealth
          and notoriety. Test your skills, outsmart security systems, and leave
          your mark as a master thief. Are you ready to step into the world of
          crime and become a legend?
        </p>
      </div>
      {/* <div>
        <h2>Select a place for robbery</h2>
        <select value={selectedPlace?.name || ""} onChange={handlePlaceSelect}>
          <option value="">Select a place</option>
          {places.map((place, index) => (
            <option key={index} value={place.name}>
              {place.name}
            </option>
          ))}
        </select>
        {selectedPlace && (
          <div>
            <p>Energy Cost: {selectedPlace.energyCost}</p>
            <p>Success Probability: {selectedPlace.successProbability}%</p>
          </div>
        )}
      </div> */}
      <div>
        <h2>Select a place for robbery</h2>
        {places.map((place, index) => (
          <div key={index}>
            <InputField
              type="radio"
              id={`place-${index}`}
              name="selectedPlace"
              value={place.name}
              checked={selectedPlace?.name === place.name}
              onChange={handlePlaceSelect}
            />
            <label htmlFor={`place-${index}`}>{place.name}</label>
          </div>
        ))}
        {selectedPlace && (
          <div>
            <p>Energy Cost: {selectedPlace.energyCost}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RobberyContent;
