import PageHeader from "@/components/ui/pageheader/PageHeader";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import TableThead from "@/components/ui/table/TableThead";
import { blackMarketActions } from "@/constants/actions/blackmarketactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import useResponseHandler from "@/lib/useResponseHandler";
import { Weapon } from "@/pages/api/user/blackmarketActions";
import UserContext from "@/store/user-context";
import { useContext, useRef } from "react";
import ActiveWeapons from "./ActiveWeapons";
import styles from "./BlackmarketContent.module.scss";
import WeaponDetails from "./WeaponDetails";

const BlackmarketContent: React.FC = () => {
  const pageData = pageDescriptions.blackmarket;
  const { user } = useContext(UserContext);
  const messageRef = useRef<HTMLDivElement>(null);
  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const activeWeaponsTheads = [
    "Weapon",
    "Count",
    "Respect / per item",
    "Manage",
  ];
  const allWeaponsTheads = ["Weapon", "Cost", "Respect", "Buy"];

  const handleWeaponAction = async (weapon: Weapon, action: string) => {
    await handleAction("/api/user/blackmarketActions", { weapon, action });
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
