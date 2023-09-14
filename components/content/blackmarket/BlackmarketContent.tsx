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

  const isAlleyEscape = user?.alley?.escape;
  const isAlleyRespect = user?.alley?.respect;
  const isUserBlackmarket = user?.university?.blackmarket;

  let weaponMaxLimit = 5;

  if (isUserBlackmarket) {
    weaponMaxLimit = 10;
  }

  if (isAlleyEscape) {
    weaponMaxLimit += 1;
  }

  if (isAlleyRespect) {
    weaponMaxLimit += 2;
  }

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
        <p className="tableHeading">
          You don&apos;t have any active weapons at the moment.
        </p>
      ) : (
        <>
          <p className="tableHeading">Your active weapons:</p>
          <table className="table activeTable">
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
        <p className="maxLimit">
          Your current maximum limit for weapons is:{" "}
          <span>{user && weaponMaxLimit}</span>
        </p>
      }
      <p className="tableHeading">All weapons:</p>
      <table className="table activeTable">
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
