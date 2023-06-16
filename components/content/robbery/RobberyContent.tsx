import { useContext, useEffect, useRef, useState } from "react";

import Loading from "@/components/ui/loading/Loading";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import { Place } from "@/constants/places";
import { calculatePlaceInformation, fetchUpdatedStats } from "@/lib/robbery";
import UserContext from "@/store/user-context";
import PlaceItem from "./PlaceItem";
import styles from "./RobberyContent.module.scss";
import RobberyResultInfo from "./RobberyResultInfo";

const RobberyContent: React.FC = () => {
  const { title, description } = pageDescriptions.robbery;
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedPlaceInformation, setSelectedPlaceInformation] = useState<
    Place[]
  >([]);
  const [isRobberySuccessfull, setIsRobberySuccessfull] = useState<
    boolean | null
  >(null);
  const [userLastRobbery, setUserLastRobbery] = useState<any>(null);
  const [animateRobberyResult, setAnimateRobberyResult] = useState(false);
  const [isLoadingRobbery, setIsLoadingRobbery] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const respect = user?.defaultParams.respect ?? 1;
    const placeInformationData = calculatePlaceInformation(respect);
    setSelectedPlaceInformation(placeInformationData);
  }, [user?.defaultParams.respect]);

  const handlePlaceSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const selected = selectedPlaceInformation.find(
      (place) => place.name === value
    );
    setSelectedPlace(selected || null);
  };

  const handleRobbery = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (selectedPlace) {
      try {
        setIsLoadingRobbery(true);

        const updatedUser = await fetchUpdatedStats(selectedPlace.name);

        setIsLoadingRobbery(false);
        if (updatedUser) {
          setIsRobberySuccessfull(true);

          if (setUser) {
            setUser(updatedUser);
          }

          setUserLastRobbery(updatedUser.lastRobbery);
          setAnimateRobberyResult(true);

          timeoutRef.current = window.setTimeout(() => {
            setIsRobberySuccessfull(null);
            setAnimateRobberyResult(false);
          }, 10000);
        }
      } catch (error) {
        console.error("Error updating user stats:", error);
        setIsLoadingRobbery(false);
      }
    }
  };

  return (
    <section className={styles.container}>
      <PageHeader title={title} description={description} />
      {isLoadingRobbery && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {isRobberySuccessfull && (
        <RobberyResultInfo
          userLastRobbery={userLastRobbery}
          animateRobberyResult={animateRobberyResult}
        />
      )}
      <div className={styles.robberyContainer}>
        {selectedPlaceInformation.map((place, index) => (
          <PlaceItem
            key={index}
            place={place}
            index={index}
            selectedPlace={selectedPlace}
            handlePlaceSelect={handlePlaceSelect}
            handleRobbery={handleRobbery}
          />
        ))}
      </div>
    </section>
  );
};

export default RobberyContent;
