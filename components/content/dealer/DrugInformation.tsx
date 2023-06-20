import Image from "next/image";

import { drugDetails, drugStatNames } from "@/constants/dealerdrugs";
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
      <div className={styles.drugInformation}>
        <p className={styles.drugName}>{drug}</p>
        {Object.entries(drugDetails[drug]).map(([stat, value]) => (
          <div key={stat}>
            <p className={styles.drugStats}>
              {drugStatNames[stat]}
              {stat === "cost" && <span>$</span>}
              <span>{value}</span>
              {stat === "addictionPoints" && <span>%</span>}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default DrugInformation;
