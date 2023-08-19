import { useContext, useRef, useState } from "react";

import Button from "@/components/ui/button/Button";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import { drugDetails } from "@/constants/sections/dealerdrugs";
import useResponseHandler from "@/lib/useResponseHandler";
import UserContext from "@/store/user-context";
import styles from "./DealerContent.module.scss";
import DrugInformation from "./DrugInformation";
import QuantityInput from "./QuantityInput";

const DealerContent = () => {
  const pageData = pageDescriptions.dealer;
  const messageRef = useRef<HTMLDivElement>(null);
  const { setUser } = useContext(UserContext);
  const [quantities, setQuantities] = useState({
    Marijuana: 0,
    Heroin: 0,
    Cocaine: 0,
    Meth: 0,
    LSD: 0,
  });

  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

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

    const response = await handleAction("/api/user/buyDrugs", requestData);

    if (setUser && response?.ok) {
      setQuantities({
        Marijuana: 0,
        Heroin: 0,
        Cocaine: 0,
        Meth: 0,
        LSD: 0,
      });
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      <ResponseHandler
        isLoading={isLoading}
        errorMessage={errorMessage}
        actionMessage={actionMessage}
        messageRef={messageRef}
      />
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
