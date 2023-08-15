import Image from "next/image";

import { drugDetails, drugStatNames } from "@/constants/sections/dealerdrugs";
import styles from "./DrugInformation.module.scss";

export interface IDrugInformation {
  drug: keyof typeof drugDetails;
}

const DrugInformation: React.FC<IDrugInformation> = ({ drug }) => {
  return (
    <>
      <div className={styles.drugImage}>
        <Image
          src={`/assets/dealer/${drug}.webp`}
          width={65}
          height={65}
          alt={drug as string}
        />
      </div>
      <div className={styles.drugInformationWrapper}>
        <p className={styles.drugName}>{drug}</p>
        <div className={styles.drugsInformation}>
          <div className={styles.drugsCost}>
            <p className="custom-label">Cost:</p>
            {Object.entries(drugDetails[drug]).map(
              ([stat, value]) =>
                (stat === "cost" || stat === "addictionPoints") && (
                  <div key={stat}>
                    <p className={styles.drugStats}>
                      {drugStatNames[stat]}
                      {stat === "cost" && <span>$</span>}
                      <span>{value}</span>
                      {stat === "addictionPoints" && <span>%</span>}
                    </p>
                  </div>
                )
            )}
          </div>
          <div className={styles.drugsBonus}>
            <p className="custom-label">Bonus:</p>
            {Object.entries(drugDetails[drug]).map(
              ([stat, value]) =>
                stat !== "cost" &&
                stat !== "addictionPoints" && (
                  <div key={stat}>
                    <p className={styles.drugStats}>
                      {drugStatNames[stat]}
                      <span>{value}</span>
                    </p>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DrugInformation;
