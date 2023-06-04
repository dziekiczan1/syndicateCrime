import InputField from "@/components/auth/InputField";
import Button from "@/components/ui/button/Button";
import { Place } from "@/constants/places";
import styles from "./PlaceItem.module.scss";

interface IPlaceItemProps {
  place: Place;
  index: number;
  selectedPlace: Place | null;
  handlePlaceSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRobbery: () => void;
}

const PlaceItem: React.FC<IPlaceItemProps> = ({
  place,
  index,
  selectedPlace,
  handlePlaceSelect,
  handleRobbery,
}) => {
  return (
    <div key={index} className={styles.placeContainer}>
      <InputField
        type="radio"
        id={`place-${index}`}
        name="selectedPlace"
        value={place.name}
        checked={selectedPlace?.name === place.name}
        onChange={handlePlaceSelect}
        checkbox
        label={place.name}
      />
      <div className={styles.detailsContainer}>
        <div className={styles.robberyInfo}>
          <p>
            Energy Cost: <span>{place.energyCost}</span>
          </p>
          <p>
            Price reward:{" "}
            <span>
              ${place.minPrice.toLocaleString()} - $
              {place.maxPrice.toLocaleString()}
            </span>
          </p>
          <p>
            Success Probability: <span>{place.successProbability}%</span>
          </p>
        </div>
        <div className={styles.robberyAction}>
          {selectedPlace?.name === place.name && (
            <Button onClick={handleRobbery} secondary fullSize>
              Execute the robbery!
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceItem;
