import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/pagedescriptions";
import UserContext from "@/store/user-context";
import { useContext, useState } from "react";
import styles from "./DealerContent.module.scss";

export interface DrugDetails {
  cost: number;
  energyPoints?: number;
  charismaPoints?: number;
  strengthPoints?: number;
  endurancePoints?: number;
}

const DealerContent = () => {
  const { title, description } = pageDescriptions.dealer;
  const { setUser } = useContext(UserContext);
  const [quantities, setQuantities] = useState({
    marijuana: 0,
    cocaine: 0,
    heroin: 0,
    meth: 0,
    lsd: 0,
  });

  type Drug = keyof typeof quantities;

  const drugDetails: { [key: string]: DrugDetails } = {
    marijuana: { cost: 20, energyPoints: 10 },
    cocaine: { cost: 50, charismaPoints: 20 },
    heroin: { cost: 30, strengthPoints: 15, energyPoints: 10 },
    meth: { cost: 100, energyPoints: 30 },
    lsd: { cost: 940, energyPoints: 5, endurancePoints: 10 },
  };

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
            marijuana: 0,
            cocaine: 0,
            heroin: 0,
            meth: 0,
            lsd: 0,
          });
        }
      } else {
        const errorData = await response.json();
        console.error("Error updating stats:", errorData);
        if (errorData && errorData.error) {
          console.error("Error message:", errorData.error);
        }
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
      <div>
        {Object.entries(quantities).map(([drug, quantity]) => (
          <div key={drug}>
            <span>{drug}</span>
            <button
              onClick={() => handleQuantityChange(drug as Drug, "decrease")}
            >
              -
            </button>
            <input type="number" value={quantity} readOnly />
            <button
              onClick={() => handleQuantityChange(drug as Drug, "increase")}
            >
              +
            </button>
          </div>
        ))}
        <button onClick={handleBuy}>Buy</button>
      </div>
    </div>
  );
};

export default DealerContent;
