import { useContext, useEffect, useRef, useState } from "react";

import Loading from "@/components/ui/loading/Loading";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import { Place } from "@/constants/sections/places";
import { calculatePlaceInformation, fetchUpdatedStats } from "@/lib/robbery";
import UserContext from "@/store/user-context";
import { useRouter } from "next/router";
import PlaceItem from "./PlaceItem";
import styles from "./RobberyContent.module.scss";
import RobberyResultInfo from "./RobberyResultInfo";

const RobberyContent: React.FC = () => {
  const pageData = pageDescriptions.robbery;
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedPlaceInformation, setSelectedPlaceInformation] = useState<
    Place[]
  >([]);
  const [isRobberySuccessfull, setIsRobberySuccessfull] = useState<
    boolean | null
  >(null);
  const [userLastRobbery, setUserLastRobbery] = useState<any>(null);
  const [isLoadingRobbery, setIsLoadingRobbery] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const respect = user?.defaultParams.respect ?? 1;
    const addiction = user?.defaultParams.addiction ?? 1;
    const placeInformationData = calculatePlaceInformation(respect, addiction);
    setSelectedPlaceInformation(placeInformationData);
  }, [user?.defaultParams.respect, user?.defaultParams.addiction]);

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

          if (updatedUser.prison?.isPrisoner) {
            router.push("/actions/prison");
          }

          setUserLastRobbery(updatedUser.lastRobbery);

          timeoutRef.current = window.setTimeout(() => {
            setIsRobberySuccessfull(null);
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
      <PageHeader pageData={pageData} />
      {isLoadingRobbery ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
        isRobberySuccessfull && (
          <RobberyResultInfo userLastRobbery={userLastRobbery} />
        )
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
