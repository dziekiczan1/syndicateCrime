import PageHeader from "@/components/ui/pageheader/PageHeader";
import { drugDetails, drugStatNames } from "@/constants/dealerdrugs";
import pageDescriptions from "@/constants/pagedescriptions";
import UserContext from "@/store/user-context";
import { useContext, useState } from "react";
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
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error);

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        const newTimeoutId = window.setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

        setTimeoutId(newTimeoutId);
      }
    } catch (error: any) {
      console.error("Error updating stats:", error);
      if (error && error.error) {
        console.error("Error message:", error.error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader title={title} description={description} />
      {errorMessage}
      <div>
        {Object.entries(quantities).map(([drug, quantity]) => (
          <div key={drug}>
            <span>{drug}</span>
            {Object.entries(drugDetails[drug]).map(([stat, value]) => (
              <div key={stat}>
                <span>{drugStatNames[stat]}</span>
                <span>{value}</span>
              </div>
            ))}
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
