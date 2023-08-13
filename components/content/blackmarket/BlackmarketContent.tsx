import ErrorMessage from "@/components/ui/error/ErrorMessage";
import Loading from "@/components/ui/loading/Loading";
import Message from "@/components/ui/message/Message";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import TableThead from "@/components/ui/table/TableThead";
import { blackMarketActions } from "@/constants/actions/blackmarketactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import { handleErrorResponse, handlePositiveResponse } from "@/lib/responses";
import { Weapon } from "@/pages/api/user/blackmarketActions";
import UserContext from "@/store/user-context";
import { useContext, useState } from "react";
import ActiveWeapons from "./ActiveWeapons";
import styles from "./BlackmarketContent.module.scss";
import WeaponDetails from "./WeaponDetails";

const BlackmarketContent: React.FC = () => {
  const pageData = pageDescriptions.blackmarket;
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [positiveTimeoutId, setPositiveTimeoutId] = useState<number | null>(
    null
  );
  const [isLoadingBlackMarket, setIsLoadingBlackMarket] = useState(false);

  const activeWeaponsTheads = [
    "Weapon",
    "Count",
    "Respect / per item",
    "Manage",
  ];
  const allWeaponsTheads = ["Weapon", "Cost", "Respect", "Buy"];

  const handleWeaponAction = async (weapon: Weapon, action: string) => {
    try {
      setIsLoadingBlackMarket(true);

      const response = await fetch("/api/user/blackmarketActions", {
        method: "POST",
        body: JSON.stringify({ weapon, action }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (setUser && response.ok) {
        await handlePositiveResponse(
          response,
          setUser,
          setIsLoadingBlackMarket,
          setActionMessage,
          positiveTimeoutId,
          setPositiveTimeoutId
        );
      } else {
        await handleErrorResponse(
          response,
          setErrorMessage,
          timeoutId,
          setTimeoutId,
          setIsLoadingBlackMarket
        );
      }
    } catch (error) {
      console.error("Error processing black market action.", error);
      setIsLoadingBlackMarket(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      {isLoadingBlackMarket && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}

      {errorMessage ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : (
        actionMessage && <Message message={actionMessage} />
      )}
      {user && !user.weapons?.length ? (
        <p className={styles.tableHeading}>
          You don&apos;t have any active weapons at the moment.
        </p>
      ) : (
        <>
          <p className={styles.tableHeading}>Your active weapons:</p>
          <table className={`table ${styles.activeTable}`}>
            <TableThead columns={activeWeaponsTheads} />
            <tbody>
              {user &&
                user.weapons?.map((active, index) => (
                  <ActiveWeapons
                    key={index}
                    active={active}
                    handleWeaponAction={handleWeaponAction}
                  />
                ))}
            </tbody>
          </table>
        </>
      )}
      {
        <p className={styles.maxLimit}>
          Your current maximum limit for weapons is:{" "}
          <span>
            {user?.university && user.university.blackmarket ? 10 : 5}
          </span>
        </p>
      }
      <p className={styles.tableHeading}>All weapons:</p>
      <table className={`table ${styles.activeTable}`}>
        <TableThead columns={allWeaponsTheads} />
        <tbody>
          {blackMarketActions.map((weapon, index) => (
            <WeaponDetails
              key={index}
              weapon={weapon}
              handleWeaponAction={handleWeaponAction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default BlackmarketContent;
