import Image from "next/image";
import { useContext, useState } from "react";

import Loading from "@/components/ui/loading/Loading";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import { drugDetails, drugStatNames } from "@/constants/dealerdrugs";
import pageDescriptions from "@/constants/pagedescriptions";
import UserContext from "@/store/user-context";
import styles from "./DealerContent.module.scss";

const DealerContent = () => {
  const { title, description } = pageDescriptions.dealer;
  const { setUser } = useContext(UserContext);
  const [quantities, setQuantities] = useState({
    Marijuana: 0,
    Cocaine: 0,
    Heroin: 0,
    Meth: 0,
    LSD: 0,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [isLoadingRobbery, setIsLoadingRobbery] = useState(false);

  type Drug = keyof typeof quantities;

  const handleQuantityChange = (
    drug: Drug,
    action: "increase" | "decrease"
  ) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };

      if (action === "increase") {
        updatedQuantities[drug] += 1;
      } else if (action === "decrease" && updatedQuantities[drug] > 0) {
        updatedQuantities[drug] -= 1;
      }

      return updatedQuantities;
    });
  };

  const handleBuy = async () => {
    const requestData = {
      drugs: Object.entries(quantities).map(([name, quantity]) => {
        const drugDetail = drugDetails[name as Drug];
        const { cost, ...rest } = drugDetail;
        return {
          name,
          quantity,
          cost,
          ...rest,
        };
      }),
    };

    try {
      setIsLoadingRobbery(true);
      const response = await fetch("/api/user/buyDrugs", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedUser = await response.json();
        if (setUser) {
          setUser(updatedUser);
          setQuantities({
            Marijuana: 0,
            Cocaine: 0,
            Heroin: 0,
            Meth: 0,
            LSD: 0,
          });
        }
        setIsLoadingRobbery(false);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error);

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        const newTimeoutId = window.setTimeout(() => {
          setErrorMessage(null);
        }, 3000);

        setTimeoutId(newTimeoutId);
        setIsLoadingRobbery(false);
      }
    } catch (error) {
      console.error("Error updating stats:", error);
      setIsLoadingRobbery(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader title={title} description={description} />
      {isLoadingRobbery && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {errorMessage && (
        <div className={styles.error}>
          <p>{errorMessage}</p>
        </div>
      )}
      <div className={styles.drugsContainer}>
        {Object.entries(quantities).map(([drug, quantity]) => (
          <div key={drug} className={styles.drugContent}>
            <div className={styles.drugImage}>
              <Image
                src={`/assets/dealer/${drug}.webp`}
                width={65}
                height={65}
                alt={drug}
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
                  </p>
                </div>
              ))}
            </div>
            <div className={styles.inputContainer}>
              <button
                onClick={() => handleQuantityChange(drug as Drug, "decrease")}
                className={styles.minusBtn}
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className={styles.input}
              />
              <button
                onClick={() => handleQuantityChange(drug as Drug, "increase")}
                className={styles.plusBtn}
              >
                +
              </button>
            </div>
          </div>
        ))}
        <button onClick={handleBuy}>Buy</button>
      </div>
    </div>
  );
};

export default DealerContent;
