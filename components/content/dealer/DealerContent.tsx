import { useContext, useState } from "react";

import Button from "@/components/ui/button/Button";
import ErrorMessage from "@/components/ui/error/ErrorMessage";
import Loading from "@/components/ui/loading/Loading";
import Message from "@/components/ui/message/Message";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import { drugDetails } from "@/constants/sections/dealerdrugs";
import { handleErrorResponse, handlePositiveResponse } from "@/lib/responses";
import UserContext from "@/store/user-context";
import styles from "./DealerContent.module.scss";
import DrugInformation from "./DrugInformation";
import QuantityInput from "./QuantityInput";

const DealerContent = () => {
  const pageData = pageDescriptions.dealer;
  const { setUser } = useContext(UserContext);
  const [quantities, setQuantities] = useState({
    Marijuana: 0,
    Heroin: 0,
    Cocaine: 0,
    Meth: 0,
    LSD: 0,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [isLoadingDealer, setIsLoadingDealer] = useState(false);

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
      setIsLoadingDealer(true);
      const response = await fetch("/api/user/buyDrugs", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (setUser && response.ok) {
        await handlePositiveResponse(
          response,
          setUser,
          setIsLoadingDealer,
          setActionMessage,
          timeoutId,
          setTimeoutId
        );
        setQuantities({
          Marijuana: 0,
          Heroin: 0,
          Cocaine: 0,
          Meth: 0,
          LSD: 0,
        });
      } else {
        await handleErrorResponse(
          response,
          setErrorMessage,
          timeoutId,
          setTimeoutId,
          setIsLoadingDealer
        );
      }
    } catch (error) {
      console.error("Error updating stats:", error);
      setIsLoadingDealer(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      {isLoadingDealer && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {actionMessage && <Message message={actionMessage} />}
      <div className={styles.drugsContainer}>
        {Object.entries(quantities).map(([drug, quantity]) => (
          <div key={drug} className={styles.drugContent}>
            <DrugInformation drug={drug} />
            <QuantityInput
              drug={drug}
              quantity={quantity}
              handleQuantityChange={handleQuantityChange}
            />
          </div>
        ))}
        <div className={styles.action}>
          <Button onClick={handleBuy} fullSize secondary>
            Fuel your desires!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DealerContent;
